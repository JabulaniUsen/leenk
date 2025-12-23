"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChatBubble } from "@/components/chat-bubble"
import { MessageInput } from "@/components/message-input"
import { ConversationList } from "@/components/conversation-list"
import { TypingIndicator } from "@/components/typing-indicator"
import { motion } from "framer-motion"
import { db } from "@/lib/supabase/db"
import { storage } from "@/lib/storage"
import type { Message, Conversation, AuthUser } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"
import { FaChevronLeft, FaEllipsisV, FaBars } from "react-icons/fa"
import { NavDrawer } from "@/components/nav-drawer"
import Link from "next/link"
import { Wallpaper } from "@/components/wallpaper"
import { Avatar } from "@/components/avatar"
import { ConversationSkeleton } from "@/components/conversation-skeleton"
import { ChatSkeleton } from "@/components/chat-skeleton"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { useAuth } from "@/lib/hooks/use-auth"
import { useConversation } from "@/lib/hooks/use-conversation"
import { useConversations } from "@/lib/hooks/use-conversations"
import { useRealtime } from "@/lib/hooks/use-realtime"
import { createClient } from "@/lib/supabase/client"
import type { Business } from "@/lib/types"

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const conversationId = params.conversationId as string

  const { user, isLoading: authLoading, mutate: mutateAuth } = useAuth()
  const { conversation: currentConversation, isLoading: conversationLoading, mutate: mutateConversation } = useConversation(conversationId)
  const { conversations, mutate: mutateConversations } = useConversations(user?.id)
  const { connectionStatus, setupConversationChannel, broadcastTyping, setupBusinessChannel } = useRealtime()

  // Track previous conversationId to detect navigation
  const previousConversationIdRef = useRef<string | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)

  // Detect when conversationId changes (navigation)
  useEffect(() => {
    if (conversationId && conversationId !== previousConversationIdRef.current) {
      setIsNavigating(true)
      previousConversationIdRef.current = conversationId
      // Reset navigation state when data loads
      if (currentConversation) {
        setIsNavigating(false)
      }
    } else if (!conversationId) {
      previousConversationIdRef.current = null
      setIsNavigating(false)
    }
  }, [conversationId, currentConversation])

  const [isTyping, setIsTyping] = useState(false)
  const [otherUserTyping, setOtherUserTyping] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [replyTo, setReplyTo] = useState<Message | null>(null)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoadingOlder, setIsLoadingOlder] = useState(false)
  const [hasMoreMessages, setHasMoreMessages] = useState(true)
  const [editingMessage, setEditingMessage] = useState<Message | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const otherUserTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Helper function to check if onboarding is complete
  const isOnboardingComplete = (business: Business | undefined): boolean => {
    if (!business) return false
    return !!(business.businessName && business.phone && business.address)
  }


  // Set up real-time subscription - use SWR mutate for cache updates
  useEffect(() => {
    if (!conversationId || !user) return

    const handleTyping = (senderType: "business" | "customer") => {
      if (senderType === "customer") {
        setOtherUserTyping(true)
        if (otherUserTypingTimeoutRef.current) {
          clearTimeout(otherUserTypingTimeoutRef.current)
        }
        otherUserTypingTimeoutRef.current = setTimeout(() => {
          setOtherUserTyping(false)
        }, 3000)
      }
    }

    const handleMessageUpdate = (message: Message) => {
      console.log("📨 Real-time message update received:", message)
      
      // Update SWR cache optimistically - use true to trigger re-render
      mutateConversation((current: Conversation | null | undefined) => {
        if (!current) return current
        
        const existingIndex = current.messages.findIndex((m: Message) => m.id === message.id)
        let updatedMessages: Message[]
        
        if (existingIndex >= 0) {
          updatedMessages = [...current.messages]
          updatedMessages[existingIndex] = message
        } else {
          updatedMessages = [...current.messages, message]
        }
        
        return {
          ...current,
          messages: updatedMessages.sort(
            (a: Message, b: Message) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          ),
          lastMessageAt: message.createdAt,
        }
      }, true) // true = trigger re-render immediately
      
      // Also update conversations list cache
      mutateConversations((current: Conversation[] | undefined) => {
        if (!current) return current
        
        const conversationIndex = current.findIndex((c: Conversation) => c.id === message.conversationId)
        if (conversationIndex >= 0) {
          const updated = [...current]
          const conv = updated[conversationIndex]
          const existingMessageIndex = conv.messages.findIndex((m: Message) => m.id === message.id)
          
          let updatedMessages: Message[]
          if (existingMessageIndex >= 0) {
            updatedMessages = [...conv.messages]
            updatedMessages[existingMessageIndex] = message
          } else {
            updatedMessages = [...conv.messages, message]
          }
          
          updated[conversationIndex] = {
            ...conv,
            messages: updatedMessages.sort(
              (a: Message, b: Message) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            ),
            lastMessageAt: message.createdAt,
          }
          updated.sort(
            (a: Conversation, b: Conversation) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
          )
          return updated
        }
        return current
      }, true) // true = trigger re-render immediately
    }

    const handleMessageDelete = (messageId: string) => {
      console.log("🗑️ Real-time message delete received:", messageId)
      
      // Update SWR cache - use true to trigger re-render
      mutateConversation((current: Conversation | null | undefined) => {
        if (!current) return current
        return {
          ...current,
          messages: current.messages.filter((m: Message) => m.id !== messageId),
        }
      }, true)
      
      mutateConversations((current: Conversation[] | undefined) => {
        if (!current) return current
        return current.map((conv: Conversation) => ({
          ...conv,
          messages: conv.messages.filter((m: Message) => m.id !== messageId),
        }))
      }, true)
    }

    const handleConversationUpdate = () => {
      // Silently update without revalidation to avoid loading states
      // Real-time updates already handle message changes
      mutateConversation(undefined, { revalidate: false })
    }

    const cleanup = setupConversationChannel(
      conversationId,
      "business",
      user.id,
      handleTyping,
      handleMessageUpdate,
      handleMessageDelete,
      handleConversationUpdate
    )
    return cleanup
  }, [conversationId, user?.id, setupConversationChannel, mutateConversation, mutateConversations, currentConversation?.id])

  // Set up business channel for conversations list updates via realtime
  useEffect(() => {
    if (!user?.id) return

    const handleConversationsUpdate = () => {
      // Use delta syncing: only fetch conversations updated after last timestamp
      // This is handled by the useConversations hook with delta syncing
      // Just trigger a revalidation to fetch new conversations
      mutateConversations(undefined, { revalidate: true })
    }

    const cleanup = setupBusinessChannel(user.id, handleConversationsUpdate)
    return cleanup
  }, [user?.id, setupBusinessChannel, mutateConversations])

  // Removed aggressive polling - rely on real-time updates only
  // Real-time connection handles all updates efficiently

  // Auto-scroll to bottom when new messages arrive (not when loading older)
  useEffect(() => {
    if (!messagesEndRef.current || isLoadingOlder) return
    
    // Only auto-scroll if we're near the bottom (within 100px)
    const container = messagesContainerRef.current
    if (container) {
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100
      if (isNearBottom) {
        const scrollTimeout = setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }, 50)
        return () => clearTimeout(scrollTimeout)
      }
    }
  }, [currentConversation?.messages.length, isLoadingOlder]) // Only trigger on length change, not content

  // Infinite scroll: Load older messages when scrolling to top
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container || !currentConversation || isLoadingOlder || !hasMoreMessages) return

    const handleScroll = async () => {
      // Check if user scrolled near the top (within 200px)
      if (container.scrollTop < 200) {
        const oldestMessage = currentConversation.messages[0]
        if (!oldestMessage) return

        setIsLoadingOlder(true)
        try {
          const olderMessages = await storage.getMessagesPaginated(
            currentConversation.id,
            oldestMessage.id,
            25
          )

          if (olderMessages.length === 0) {
            setHasMoreMessages(false)
          } else {
            // Preserve scroll position
            const scrollHeightBefore = container.scrollHeight
            const scrollTop = container.scrollTop

            // Add older messages to the beginning
            mutateConversation((current) => {
              if (!current) return current
              const combined = [...olderMessages, ...current.messages]
              // Remove duplicates
              const unique = combined.filter((msg, idx, arr) => 
                arr.findIndex(m => m.id === msg.id) === idx
              )
              return {
                ...current,
                messages: unique.sort(
                  (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                ),
              }
            }, false)

            // Restore scroll position after DOM update
            requestAnimationFrame(() => {
              const scrollHeightAfter = container.scrollHeight
              const heightDiff = scrollHeightAfter - scrollHeightBefore
              container.scrollTop = scrollTop + heightDiff
            })
          }
        } catch (error) {
          console.error("Error loading older messages:", error)
        } finally {
          setIsLoadingOlder(false)
        }
      }
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [currentConversation, isLoadingOlder, hasMoreMessages, mutateConversation])

  // Mark messages as read when conversation is viewed - silent update
  useEffect(() => {
    if (!conversationId || !user) return

    const markAsRead = async () => {
      try {
        await db.markMessagesAsRead(conversationId, "customer")
        // Update cache silently without revalidation to avoid loading states
        mutateConversation((current) => {
          if (!current) return current
          return {
            ...current,
            messages: current.messages.map(m => 
              m.senderType === "customer" && m.status !== "read" 
                ? { ...m, status: "read" as const }
                : m
            )
          }
        }, false)
        mutateConversations(undefined, { revalidate: false })
      } catch (error) {
        console.error("Error marking messages as read:", error)
      }
    }

    const timeout = setTimeout(markAsRead, 500)
    return () => clearTimeout(timeout)
  }, [conversationId, user?.id, mutateConversation, mutateConversations])

  // Cleanup typing timeouts
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      if (otherUserTypingTimeoutRef.current) {
        clearTimeout(otherUserTypingTimeoutRef.current)
      }
    }
  }, [])

  const handleSendMessage = async (text: string, replyToId?: string) => {
    if (!currentConversation || !user) return
    if (isSending) return

    setIsSending(true)

    // If editing a message, update it instead of creating a new one
    if (editingMessage) {
      try {
        // Optimistically update UI
        mutateConversation((current: Conversation | null | undefined) => {
          if (!current) return current
          return {
            ...current,
            messages: current.messages.map((m: Message) => 
              m.id === editingMessage.id ? { ...m, text } : m
            ),
          }
        }, false)

        // Update in database
        await db.updateMessage(editingMessage.id, { text })
        
        // Update conversations list cache silently
        mutateConversations(undefined, { revalidate: false })
        setEditingMessage(null)
      } catch (error) {
        console.error("Failed to update message:", error)
        // Rollback on error
        mutateConversation(undefined, { revalidate: true })
        alert("Failed to update message. Please try again.")
      } finally {
        setIsSending(false)
      }
      return
    }

    const tempId = uuidv4()
    const newMessage: Message = {
      id: tempId,
      conversationId: currentConversation.id,
      senderType: "business",
      senderId: user.id,
      text,
      status: "sent",
      createdAt: new Date().toISOString(),
      replyToId: replyToId || undefined,
    }

    // Optimistically update UI using SWR
    mutateConversation((current: Conversation | null | undefined) => {
      if (!current) return current
      const updatedMessages = [...current.messages, newMessage].sort(
        (a: Message, b: Message) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      return {
        ...current,
        messages: updatedMessages,
        lastMessageAt: newMessage.createdAt,
      }
    }, false) // false = don't revalidate yet
    setIsTyping(false)

    try {
      const createdMessage = await db.createMessage(newMessage)
      
      // Update with real message ID
      mutateConversation((current: Conversation | null | undefined) => {
        if (!current) return current
        const updatedMessages = current.messages.map((m: Message) => 
          m.id === tempId ? createdMessage : m
        ).sort(
          (a: Message, b: Message) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        return {
          ...current,
          messages: updatedMessages,
          lastMessageAt: createdMessage.createdAt,
        }
      }, false)
      
      // Send email notification to customer (fire and forget - don't block UI)
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: currentConversation.id,
          messageId: createdMessage.id,
        }),
      }).catch((emailError) => {
        console.error("Failed to send email notification:", emailError)
        // Don't fail the message send if email fails
      })
      
      // Update conversations list cache silently
      mutateConversations(undefined, { revalidate: false })
      // Clear reply state
      setReplyTo(null)
    } catch (error) {
      console.error("Failed to send message:", error)
      // Remove optimistic message on error
      mutateConversation((current: Conversation | null | undefined) => {
        if (!current) return current
        return {
          ...current,
          messages: current.messages.filter((m: Message) => m.id !== tempId),
        }
      }, false)
    } finally {
      setIsSending(false)
    }
  }

  const handleSendImage = async (imageUrl: string, replyToId?: string) => {
    if (!currentConversation || !user) return
    if (isSending) return

    setIsSending(true)

    const tempId = uuidv4()
    const newMessage: Message = {
      id: tempId,
      conversationId: currentConversation.id,
      senderType: "business",
      senderId: user.id,
      imageUrl,
      status: "sent",
      createdAt: new Date().toISOString(),
      replyToId: replyToId || undefined,
    }

    // Optimistically update UI using SWR
    mutateConversation((current: Conversation | null | undefined) => {
      if (!current) return current
      const updatedMessages = [...current.messages, newMessage].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      return {
        ...current,
        messages: updatedMessages,
        lastMessageAt: newMessage.createdAt,
      }
    }, false)
    setIsTyping(false)

    try {
      const createdMessage = await db.createMessage(newMessage)
      
      // Update with real message ID
      mutateConversation((current: Conversation | null | undefined) => {
        if (!current) return current
        const updatedMessages = current.messages.map((m: Message) => 
          m.id === tempId ? createdMessage : m
        ).sort(
          (a: Message, b: Message) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        return {
          ...current,
          messages: updatedMessages,
          lastMessageAt: createdMessage.createdAt,
        }
      }, false)
      
      // Send email notification to customer (fire and forget - don't block UI)
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: currentConversation.id,
          messageId: createdMessage.id,
        }),
      }).catch((emailError) => {
        console.error("Failed to send email notification:", emailError)
        // Don't fail the message send if email fails
      })
      
      // Update conversations list cache silently
      mutateConversations(undefined, { revalidate: false })
      // Clear reply state
      setReplyTo(null)
    } catch (error) {
      console.error("Failed to send image:", error)
      mutateConversation((current: Conversation | null | undefined) => {
        if (!current) return current
        return {
          ...current,
          messages: current.messages.filter((m: Message) => m.id !== tempId),
        }
      }, false)
    } finally {
      setIsSending(false)
    }
  }

  const handleTyping = () => {
    setIsTyping(true)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
    }, 3000)

    // Broadcast typing status
    if (conversationId) {
      broadcastTyping(conversationId, "business")
    }
  }


  const handlePin = async (conversationId: string, pinned: boolean) => {
    try {
      // Optimistic update
      mutateConversations((current) => {
        if (!current) return current
        return current.map(conv => 
          conv.id === conversationId ? { ...conv, pinned } : conv
        )
      }, false)
      
      await storage.updateConversation(conversationId, { pinned })
      // Silent revalidation in background
      mutateConversations(undefined, { revalidate: false })
      
      if (conversationId === currentConversation?.id) {
        mutateConversation((current) => {
          if (!current) return current
          return { ...current, pinned }
        }, false)
      }
    } catch (error) {
      console.error("Failed to pin/unpin conversation:", error)
      // Rollback on error
      mutateConversations(undefined, { revalidate: true })
      alert("Failed to update conversation. Please try again.")
    }
  }

  const handleEditMessage = (message: Message) => {
    if (!message.text) return
    // Set the editing message - MessageInput will handle populating the field
    setEditingMessage(message)
    // Clear reply if any
    setReplyTo(null)
  }

  const handleCancelEdit = () => {
    setEditingMessage(null)
  }

  const handleDeleteMessage = async (messageId: string) => {
    if (!currentConversation) return

    try {
      // Optimistic update - remove message from UI
      mutateConversation((current: Conversation | null | undefined) => {
        if (!current) return current
        return {
          ...current,
          messages: current.messages.filter((m: Message) => m.id !== messageId),
        }
      }, false)

      // Delete from database
      await db.deleteMessage(messageId)
      
      // Update conversations list cache silently
      mutateConversations(undefined, { revalidate: false })
    } catch (error) {
      console.error("Failed to delete message:", error)
      // Rollback on error - revalidate to get fresh data
      mutateConversation(undefined, { revalidate: true })
      alert("Failed to delete message. Please try again.")
    }
  }

  const handleDelete = async (conversationId: string) => {
    try {
      // Optimistic update
      mutateConversations((current) => {
        if (!current) return current
        return current.filter(conv => conv.id !== conversationId)
      }, false)
      
      await storage.deleteConversation(conversationId)
      // Silent revalidation in background
      mutateConversations(undefined, { revalidate: false })
      
      // If we're viewing the deleted conversation, redirect to dashboard
      if (conversationId === currentConversation?.id) {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error)
      // Rollback on error
      mutateConversations(undefined, { revalidate: true })
      alert("Failed to delete conversation. Please try again.")
    }
  }

  // Memoize sidebar to prevent re-renders when conversation changes
  const sidebarContent = useMemo(() => (
    <>
      <div className="p-3 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <Link href="/dashboard">
            <Image src="/logo.png" alt="Leenk" width={80} height={80} className="object-contain" />
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsNavOpen(true)}
            aria-label="Open menu"
          >
            <FaBars className="w-5 h-5" />
          </Button>
        </div>
        {user ? (
          <div className="flex items-center gap-3 text-sm">
            <Avatar 
              src={user.business?.businessLogo} 
              name={user.business?.businessName} 
              size="md"
            />
            <div>
              <p className="font-medium text-foreground">{user.business?.businessName}</p>
              <p className="text-muted-foreground text-xs">{user.email}</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex-1 overflow-y-auto bg-background">
        <ConversationList 
          conversations={conversations} 
          selectedId={conversationId}
          onPin={handlePin}
          onDelete={handleDelete}
        />
      </div>
    </>
  ), [conversations, conversationId, user, handlePin, handleDelete])

  // Only show skeleton in conversation area, not whole page
  // Show skeleton if: loading, navigating to new conversation, or no data yet
  const showConversationSkeleton = (conversationLoading || isNavigating) && !currentConversation && !authLoading

  // If no conversation but not loading and not navigating, show empty state
  // Only show "not found" if we've actually finished loading and there's no data
  // This prevents showing "not found" during initial load or navigation
  if (!currentConversation && !conversationLoading && !isNavigating && conversationId && !authLoading) {
    return (
      <main className="h-screen flex flex-col bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative">
        <Wallpaper />
        {/* Empty state - Full screen (mobile view) */}
        <div className="flex-1 flex flex-col w-full">
          <div className="sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur-sm p-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <FaChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Conversation not found</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Type guard: ensure currentConversation exists before rendering
  if (!currentConversation) {
    return null
  }

  return (
    <main className="h-screen flex flex-col bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative">
      <Wallpaper businessLogo={user?.business?.businessLogo} />
      {/* Chat Area - Always full screen (mobile view) */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative z-10 w-full">
        {showConversationSkeleton ? (
          <>
            {/* Chat Header Skeleton */}
            <div className="sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur-sm p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <FaChevronLeft className="w-5 h-5" />
                  </Button>
                </Link>
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
            {/* Messages Skeleton */}
            <div className="flex-1 overflow-y-auto p-3">
              <ChatSkeleton />
            </div>
            {/* Input Skeleton */}
            <div className="bg-card/80 backdrop-blur-sm border-t border-border p-4">
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </>
        ) : currentConversation ? (
          <>
            {/* Chat Header - Fixed at top with back button on mobile */}
            <div className="sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur-sm p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <FaChevronLeft className="w-5 h-5" />
                  </Button>
                </Link>
                <Avatar name={currentConversation.customerName || currentConversation.customerEmail} size="md" />
                <div>
                  <h2 className="font-semibold text-foreground">{currentConversation.customerName || currentConversation.customerEmail}</h2>
                  <p className="text-xs text-muted-foreground">
                    {currentConversation.customerEmail}
                    {connectionStatus === "connected" && (
                      <span className="ml-2 text-primary" title="Real-time connected">●</span>
                    )}
                    {connectionStatus === "disconnected" && (
                      <span className="ml-2 text-yellow-500" title="Reconnecting...">●</span>
                    )}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <FaEllipsisV className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-3 space-y-2 relative z-0"
            >
              {isLoadingOlder && (
                <div className="flex justify-center py-2">
                  <div className="text-sm text-muted-foreground">Loading older messages...</div>
                </div>
              )}
              {currentConversation.messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                <>
                  {currentConversation.messages.map((msg: Message, idx: number) => (
                    <ChatBubble 
                      key={msg.id} 
                      message={msg} 
                      isOwn={msg.senderType === "business"} 
                      index={idx}
                      onReply={setReplyTo}
                      onEdit={handleEditMessage}
                      onDelete={handleDeleteMessage}
                    />
                  ))}
                  {otherUserTyping && <TypingIndicator isOwn={false} />}
                  {otherUserTyping && <TypingIndicator isOwn={false} />}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input - Fixed at bottom */}
            <div className="sticky bottom-0 z-20 bg-card/80 backdrop-blur-sm border-t border-border">
              <MessageInput 
                onSendMessage={handleSendMessage} 
                onSendImage={handleSendImage} 
                onTyping={handleTyping}
                disabled={isSending}
                replyTo={replyTo}
                onCancelReply={() => setReplyTo(null)}
                editingMessage={editingMessage}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </>
        ) : null}
      </motion.div>

      {/* Navigation Drawer */}
      <NavDrawer
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </main>
  )
}


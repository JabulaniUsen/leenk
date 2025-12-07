"use client"

import { useEffect, useState, useRef } from "react"
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
import { ChevronLeft, MoreVertical } from "lucide-react"
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
import { ThemeToggle } from "@/components/theme-toggle"
import { LogOut, Settings } from "lucide-react"
import type { Business } from "@/lib/types"

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const conversationId = params.conversationId as string

  const { user, isLoading: authLoading, mutate: mutateAuth } = useAuth()
  const { conversation: currentConversation, isLoading: conversationLoading, mutate: mutateConversation } = useConversation(conversationId)
  const { conversations, mutate: mutateConversations } = useConversations(user?.id)
  const { connectionStatus, setupConversationChannel, broadcastTyping } = useRealtime()

  const [isTyping, setIsTyping] = useState(false)
  const [otherUserTyping, setOtherUserTyping] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
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
      // Revalidate conversation cache
      mutateConversation()
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

  // Fallback: Poll for new messages if WebSocket fails
  const lastMessageCountRef = useRef(0)
  useEffect(() => {
    if (!currentConversation?.id || connectionStatus === "connected") {
      lastMessageCountRef.current = currentConversation?.messages.length || 0
      return
    }

    const pollInterval = setInterval(async () => {
      if (!currentConversation.id || !user) return
      try {
        // Use SWR mutate to refresh cache
        mutateConversation()
        mutateConversations()
      } catch (error) {
        console.error("Error polling for messages:", error)
      }
    }, 5000)

    return () => {
      clearInterval(pollInterval)
    }
  }, [currentConversation?.id, connectionStatus, user])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentConversation?.messages])

  // Mark messages as read when conversation is viewed
  useEffect(() => {
    if (!conversationId || !user) return

    const markAsRead = async () => {
      try {
        await db.markMessagesAsRead(conversationId, "customer")
        // Refresh conversation cache and conversations list to update unread counts
        mutateConversation()
        mutateConversations()
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

  const handleSendMessage = async (text: string) => {
    if (!currentConversation || !user) return
    if (isSending) return

    setIsSending(true)

    const tempId = uuidv4()
    const newMessage: Message = {
      id: tempId,
      conversationId: currentConversation.id,
      senderType: "business",
      senderId: user.id,
      text,
      status: "sent",
      createdAt: new Date().toISOString(),
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
      
      // Send email notification to customer
      try {
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationId: currentConversation.id,
            messageId: createdMessage.id,
          }),
        })
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError)
        // Don't fail the message send if email fails
      }
      
      // Update conversations list cache
      mutateConversations()
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

  const handleSendImage = async (imageUrl: string) => {
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
      
      // Send email notification to customer
      try {
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationId: currentConversation.id,
            messageId: createdMessage.id,
          }),
        })
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError)
        // Don't fail the message send if email fails
      }
      
      // Update conversations list cache
      mutateConversations()
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

  const handleLogout = async () => {
    // Set business as offline before logging out
    if (user?.business?.id) {
      try {
        await storage.updateBusiness(user.business.id, { online: false })
      } catch (error) {
        console.error("Failed to update online status:", error)
      }
    }
    await storage.clearAuth()
    mutateAuth(null, false) // Clear auth cache
    router.push("/")
  }

  // Render UI immediately - show skeleton for loading parts
  // This makes the app feel instant even while data loads
  if (authLoading || conversationLoading) {
    return (
      <main className="h-screen flex flex-col md:flex-row bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative">
        <Wallpaper />
        <div className="hidden md:flex w-80 border-r border-border flex-col bg-card/80 backdrop-blur-sm z-10">
          <div className="p-4 border-b border-border">
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="flex-1 overflow-y-auto">
            <ConversationSkeleton />
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative z-10">
          <div className="border-b border-border bg-card/80 backdrop-blur-sm p-3 md:p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 md:p-4">
            <ChatSkeleton />
          </div>
          <div className="bg-card/80 backdrop-blur-sm border-t border-border p-4">
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </main>
    )
  }

  if (!currentConversation) {
    return (
      <main className="h-screen flex flex-col md:flex-row bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative">
        <Wallpaper />
        <div className="hidden md:flex w-80 border-r border-border flex-col bg-card/80 backdrop-blur-sm z-10">
          <div className="p-4 border-b border-border">
            <Link href="/dashboard">
              <h1 className="text-2xl font-bold text-primary cursor-pointer hover:opacity-80">Leenk</h1>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ConversationList conversations={conversations} selectedId={conversationId} />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Loading conversation...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen flex flex-col md:flex-row bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative">
      <Wallpaper businessLogo={user?.business?.businessLogo} />
      {/* Sidebar - Same structure as dashboard */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-80 border-r border-[#313d45] md:border-border flex flex-col bg-[#111b21] md:bg-card/80 backdrop-blur-sm z-10"
      >
        {/* Header - Same as dashboard */}
        <div className="p-3 md:p-4 border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3 md:mb-4">
          <Link href="/dashboard">
              <Image src="/logo.png" alt="Leenk" width={80} height={80} className="object-contain" />
            </Link>
            <div className="flex gap-1 md:gap-2">
              <ThemeToggle />
              <Link href="/dashboard/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
          </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
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

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto bg-background">
          <ConversationList conversations={conversations} selectedId={conversationId} />
        </div>
      </motion.aside>

      {/* Chat Area */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative z-10">
        {/* Chat Header - Fixed at top */}
        <div className="sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur-sm p-3 md:p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="md:hidden">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4" />
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
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2 relative z-0">
          {currentConversation.messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            <>
              {currentConversation.messages.map((msg: Message, idx: number) => (
                <ChatBubble key={msg.id} message={msg} isOwn={msg.senderType === "business"} index={idx} />
              ))}
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
          />
        </div>
      </motion.div>
    </main>
  )
}

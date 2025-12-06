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
import type { Message } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"
import { ChevronLeft, MoreVertical } from "lucide-react"
import Link from "next/link"
import { Wallpaper } from "@/components/wallpaper"
import { Avatar } from "@/components/avatar"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useConversationsStore } from "@/lib/stores/conversations-store"
import { useRealtimeStore } from "@/lib/stores/realtime-store"

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const conversationId = params.conversationId as string

  const { user, initialized, loadAuth } = useAuthStore()
  const { 
    currentConversation, 
    conversations, 
    loading, 
    loadConversation, 
    loadConversations,
    addMessage 
  } = useConversationsStore()
  const { connectionStatus, setupConversationChannel, broadcastTyping } = useRealtimeStore()

  const [isTyping, setIsTyping] = useState(false)
  const [otherUserTyping, setOtherUserTyping] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const otherUserTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Load auth and conversation data
  useEffect(() => {
    if (!initialized) {
      loadAuth().then((authUser) => {
        if (!authUser) {
          router.push("/login")
        }
      })
    } else if (user && conversationId) {
      loadConversation(conversationId).then((conv) => {
        if (!conv) {
          router.push("/dashboard")
        } else {
          loadConversations(user.id)
        }
      })
    } else if (!user) {
      router.push("/login")
    }
  }, [initialized, user, conversationId, loadAuth, loadConversation, loadConversations, router])

  // Set up real-time subscription
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

    const cleanup = setupConversationChannel(conversationId, "business", user.id, handleTyping)
    return cleanup
  }, [conversationId, user?.id, setupConversationChannel])

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
        const { loadConversation } = useConversationsStore.getState()
        const updated = await loadConversation(currentConversation.id)
        if (updated && updated.messages.length > lastMessageCountRef.current) {
          lastMessageCountRef.current = updated.messages.length
          if (user) {
            loadConversations(user.id)
          }
        }
      } catch (error) {
        console.error("Error polling for messages:", error)
      }
    }, 5000)

    return () => {
      clearInterval(pollInterval)
    }
  }, [currentConversation?.id, connectionStatus, user, loadConversations])

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
        const { loadConversation } = useConversationsStore.getState()
        await loadConversation(conversationId)
      } catch (error) {
        console.error("Error marking messages as read:", error)
      }
    }

    const timeout = setTimeout(markAsRead, 500)
    return () => clearTimeout(timeout)
  }, [conversationId, user?.id])

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

    // Optimistically update UI
    addMessage(newMessage)
    setIsTyping(false)

    try {
      const createdMessage = await db.createMessage(newMessage)
      
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
      
      // Refresh conversations list
      setTimeout(() => {
        loadConversations(user.id)
      }, 500)
    } catch (error) {
      console.error("Failed to send message:", error)
      // Remove optimistic message on error
      const { removeMessage } = useConversationsStore.getState()
      removeMessage(tempId)
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

    // Optimistically update UI
    addMessage(newMessage)
    setIsTyping(false)

    try {
      const createdMessage = await db.createMessage(newMessage)
      
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
      
      setTimeout(() => {
        loadConversations(user.id)
      }, 500)
    } catch (error) {
      console.error("Failed to send image:", error)
      const { removeMessage } = useConversationsStore.getState()
      removeMessage(tempId)
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

  if (!initialized || !user) return null

  if (!currentConversation) {
    return null
  }

  return (
    <main className="h-screen flex flex-col md:flex-row bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative">
      <Wallpaper businessLogo={user?.business?.businessLogo} />
      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden md:flex w-80 border-r border-border flex-col bg-card/80 backdrop-blur-sm z-10"
      >
        <div className="p-4 border-b border-border">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-primary cursor-pointer hover:opacity-80">Leenk</h1>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ConversationList conversations={conversations} selectedId={conversationId} />
        </div>
      </motion.aside>

      {/* Chat Area */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative z-10">
        {/* Chat Header */}
        <div className="border-b border-border bg-card/80 backdrop-blur-sm p-3 md:p-4 flex items-center justify-between">
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
              {currentConversation.messages.map((msg, idx) => (
                <ChatBubble key={msg.id} message={msg} isOwn={msg.senderType === "business"} index={idx} />
              ))}
              {otherUserTyping && <TypingIndicator isOwn={false} />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-card/80 backdrop-blur-sm border-t border-border relative z-10">
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

"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChatBubble } from "@/components/chat-bubble"
import { MessageInput } from "@/components/message-input"
import { TypingIndicator } from "@/components/typing-indicator"
import { motion } from "framer-motion"
import { storage } from "@/lib/storage"
import { db } from "@/lib/supabase/db"
import type { Business, Message } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"
import { AlertCircle } from "lucide-react"
import { Wallpaper } from "@/components/wallpaper"
import { Avatar } from "@/components/avatar"
import { useConversationsStore } from "@/lib/stores/conversations-store"
import { useRealtimeStore } from "@/lib/stores/realtime-store"
import Image from "next/image"

const CUSTOMER_EMAIL_STORAGE_KEY = "leenk_customer_email"

export default function CustomerChatPage() {
  const params = useParams()
  const phone = params.phone as string

  const [business, setBusiness] = useState<Business | null>(null)
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [showEmailPrompt, setShowEmailPrompt] = useState(true)
  const [showNameInput, setShowNameInput] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [otherUserTyping, setOtherUserTyping] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const otherUserTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { 
    currentConversation, 
    setCurrentConversation, 
    loadConversation,
    addMessage,
    updateConversation
  } = useConversationsStore()
  const { connectionStatus, setupConversationChannel, broadcastTyping } = useRealtimeStore()

  // Load email from localStorage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem(CUSTOMER_EMAIL_STORAGE_KEY)
    if (savedEmail) {
      setCustomerEmail(savedEmail)
    }
  }, [])

  // Save email to localStorage when it changes
  useEffect(() => {
    if (customerEmail) {
      localStorage.setItem(CUSTOMER_EMAIL_STORAGE_KEY, customerEmail)
    }
  }, [customerEmail])

  useEffect(() => {
    const loadBusiness = async () => {
      const biz = await storage.getBusinessByPhone(phone)
      if (!biz) {
        setError("Business not found")
        setLoading(false)
        return
      }
      setBusiness(biz)
      setLoading(false)
    }
    loadBusiness()
  }, [phone])

  // Search for existing conversation when email is entered
  const handleEmailSearch = async (email: string) => {
    if (!business) return

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setError("")
    setIsSearching(true)

    try {
      const existingConversation = await db.getConversationByBusinessAndEmail(business.id, email.trim())

      if (existingConversation) {
        if (existingConversation.customerName) {
          setCustomerName(existingConversation.customerName)
        }
        setCurrentConversation(existingConversation)
        setShowEmailPrompt(false)
        setShowNameInput(false)
      } else {
        setShowNameInput(true)
      }
    } catch (err) {
      console.error("Error searching for conversation:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  const handleStartChat = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    if (!business) return

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail.trim())) {
      setError("Please enter a valid email address")
      return
    }

    if (!showNameInput && !currentConversation) {
      await handleEmailSearch(customerEmail)
      return
    }

    if (showNameInput && !customerName.trim()) {
      setError("Please provide your name")
      return
    }

    setError("")

    if (currentConversation) {
      if (customerName.trim() && currentConversation.customerName !== customerName.trim()) {
        await storage.updateConversation(currentConversation.id, {
          customerName: customerName.trim(),
        })
        const updated = await storage.getConversationById(currentConversation.id)
        if (updated) {
          setCurrentConversation(updated)
        }
      }
      setShowEmailPrompt(false)
      return
    }

    // New user - create conversation
    const newConversation = {
      id: uuidv4(),
      businessId: business.id,
      customerEmail: customerEmail.trim(),
      customerName: customerName.trim(),
      createdAt: new Date().toISOString(),
      lastMessageAt: new Date().toISOString(),
      messages: [],
    }
    
    try {
      await storage.createConversation(newConversation)
      const created = await storage.getConversationById(newConversation.id)
      if (created) {
        setCurrentConversation(created)
        setShowEmailPrompt(false)
        setShowNameInput(false)
      }
    } catch (err) {
      console.error("Error creating conversation:", err)
      setError("Failed to start chat. Please try again.")
    }
  }

  // Set up real-time subscription when conversation is loaded
  useEffect(() => {
    if (!currentConversation?.id) return

    const handleTyping = (senderType: "business" | "customer") => {
      if (senderType === "business") {
        setOtherUserTyping(true)
        if (otherUserTypingTimeoutRef.current) {
          clearTimeout(otherUserTypingTimeoutRef.current)
        }
        otherUserTypingTimeoutRef.current = setTimeout(() => {
          setOtherUserTyping(false)
        }, 3000)
      }
    }

    const cleanup = setupConversationChannel(
      currentConversation.id,
      "customer",
      "customer",
      handleTyping
    )
    return cleanup
  }, [currentConversation?.id, setupConversationChannel])

  // Fallback: Poll for new messages if WebSocket fails
  const lastMessageCountRef = useRef(0)
  useEffect(() => {
    if (!currentConversation?.id || connectionStatus === "connected") {
      lastMessageCountRef.current = currentConversation?.messages.length || 0
      return
    }

    const pollInterval = setInterval(async () => {
      if (!currentConversation.id) return
      try {
        const { loadConversation } = useConversationsStore.getState()
        const updated = await loadConversation(currentConversation.id)
        if (updated && updated.messages.length > lastMessageCountRef.current) {
          lastMessageCountRef.current = updated.messages.length
        }
      } catch (error) {
        console.error("Error polling for messages:", error)
      }
    }, 5000)

    return () => {
      clearInterval(pollInterval)
    }
  }, [currentConversation?.id, connectionStatus])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentConversation?.messages])

  // Mark messages as read when conversation is viewed
  useEffect(() => {
    if (!currentConversation?.id || !business) return

    const markAsRead = async () => {
      try {
        await db.markMessagesAsRead(currentConversation.id, "business")
        const { loadConversation } = useConversationsStore.getState()
        await loadConversation(currentConversation.id)
      } catch (error) {
        console.error("Error marking messages as read:", error)
      }
    }

    const timeout = setTimeout(markAsRead, 500)
    return () => clearTimeout(timeout)
  }, [currentConversation?.id, business?.id])

  // Cleanup typing timeout on unmount
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
    if (!currentConversation) return
    if (isSending) return

    setIsSending(true)

    const tempId = uuidv4()
    const newMessage: Message = {
      id: tempId,
      conversationId: currentConversation.id,
      senderType: "customer",
      senderId: "customer",
      text,
      status: "sent",
      createdAt: new Date().toISOString(),
    }

    // Optimistically update UI
    addMessage(newMessage)
    setIsTyping(false)

    try {
      await db.createMessage(newMessage)
    } catch (error) {
      console.error("Failed to send message:", error)
      const { removeMessage } = useConversationsStore.getState()
      removeMessage(tempId)
    } finally {
      setIsSending(false)
    }
  }

  const handleSendImage = async (imageUrl: string) => {
    if (!currentConversation) return
    if (isSending) return

    setIsSending(true)

    const tempId = uuidv4()
    const newMessage: Message = {
      id: tempId,
      conversationId: currentConversation.id,
      senderType: "customer",
      senderId: "customer",
      imageUrl,
      status: "sent",
      createdAt: new Date().toISOString(),
    }

    // Optimistically update UI
    addMessage(newMessage)
    setIsTyping(false)

    try {
      await db.createMessage(newMessage)
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
    if (currentConversation?.id) {
      broadcastTyping(currentConversation.id, "customer")
    }
  }

  if (loading) {
    return null
  }

  if (error || !business) {
    return (
      <main className="h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </main>
    )
  }

  if (showEmailPrompt) {
    return (
      <main className="h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-background p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="bg-card rounded-xl border border-border p-8 shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <Image src="/logo.png" alt="Leenk" width={120} height={120} className="object-contain" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{business.businessName}</h2>
            <p className="text-muted-foreground mb-8">{business.online ? "🟢 Online" : "🔴 Offline"}</p>

            <form onSubmit={handleStartChat} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => {
                    setCustomerEmail(e.target.value)
                    setError("")
                  }}
                  onBlur={(e) => {
                    if (e.target.value.trim()) {
                      handleEmailSearch(e.target.value)
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && customerEmail.trim() && !showNameInput) {
                      e.preventDefault()
                      handleEmailSearch(customerEmail)
                    }
                  }}
                  placeholder="your@email.com"
                  className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  disabled={isSearching}
                />
                {isSearching && (
                  <p className="text-xs text-muted-foreground mt-1">Searching...</p>
                )}
              </div>

              {showNameInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium mb-2">
                    Your Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value)
                      setError("")
                    }}
                    placeholder="John Doe"
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    autoFocus
                  />
                </motion.div>
              )}

              <Button 
                type="submit" 
                className="w-full"
                disabled={isSearching || !customerEmail.trim() || (showNameInput && !customerName.trim())}
              >
                {showNameInput ? "Start Chat" : "Continue"}
              </Button>
            </form>
          </div>
        </motion.div>
      </main>
    )
  }

  if (!currentConversation) {
    return (
      <main className="h-screen flex flex-col bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative">
        <Wallpaper businessLogo={business.businessLogo} />
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-border bg-card/80 backdrop-blur-sm p-3 md:p-4"
          >
            <div className="flex items-center gap-3">
              <Avatar src={business.businessLogo} name={business.businessName} size="md" />
              <div>
                <h2 className="font-semibold text-lg text-foreground">{business.businessName}</h2>
                <p className="text-xs text-muted-foreground">{business.online ? "🟢 Online" : "🔴 Offline"}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen flex flex-col bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative">
      <Wallpaper businessLogo={business.businessLogo} />
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-card/80 backdrop-blur-sm p-3 md:p-4 relative z-10"
      >
        <div className="flex items-center gap-3">
          <Avatar src={business.businessLogo} name={business.businessName} size="md" />
          <div>
            <h2 className="font-semibold text-lg text-foreground">{business.businessName}</h2>
            <p className="text-xs text-muted-foreground">
              {business.online ? "🟢 Online" : "🔴 Offline"}
              {connectionStatus === "connected" && (
                <span className="ml-2 text-primary" title="Real-time connected">●</span>
              )}
              {connectionStatus === "disconnected" && (
                <span className="ml-2 text-yellow-500" title="Reconnecting...">●</span>
              )}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2 relative z-0"
      >
        {!currentConversation || currentConversation.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-center">
            <p>Start a conversation with {business.businessName}</p>
          </div>
        ) : (
          <>
            {currentConversation.messages.map((msg, idx) => (
              <ChatBubble key={msg.id} message={msg} isOwn={msg.senderType === "customer"} index={idx} />
            ))}
            {otherUserTyping && <TypingIndicator isOwn={false} />}
          </>
        )}
        <div ref={messagesEndRef} />
      </motion.div>

      {/* Message Input */}
      <div className="bg-card/80 backdrop-blur-sm border-t border-border relative z-10">
        <MessageInput 
          onSendMessage={handleSendMessage} 
          onSendImage={handleSendImage}
          onTyping={handleTyping}
          disabled={isSending || !currentConversation}
        />
      </div>
    </main>
  )
}

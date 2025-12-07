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
import type { Business, Message, Conversation } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"
import { AlertCircle, Mail, User, Loader2 } from "lucide-react"
import { Wallpaper } from "@/components/wallpaper"
import { Avatar } from "@/components/avatar"
import { useRealtime } from "@/lib/hooks/use-realtime"
import { useBusinessByPhone } from "@/lib/hooks/use-business"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"

const CUSTOMER_EMAIL_STORAGE_KEY = "leenk_customer_email"

export default function CustomerChatPage() {
  const params = useParams()
  const phone = params.phone as string

  const { business, isLoading: businessLoading, mutate: mutateBusiness } = useBusinessByPhone(phone)
  
  // Debug: Log business online status
  useEffect(() => {
    if (business) {
      console.log("Business online status:", { 
        id: business.id, 
        online: business.online, 
        onlineType: typeof business.online,
        businessName: business.businessName 
      })
    }
  }, [business])

  const [customerEmail, setCustomerEmail] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [showEmailPrompt, setShowEmailPrompt] = useState(true)
  const [showNameInput, setShowNameInput] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [otherUserTyping, setOtherUserTyping] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [replyTo, setReplyTo] = useState<Message | null>(null)
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const otherUserTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { connectionStatus, setupConversationChannel, broadcastTyping } = useRealtime()

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

  // Business is now loaded via SWR hook, handle errors
  useEffect(() => {
    if (!businessLoading && !business && phone) {
        setError("Business not found")
    }
  }, [businessLoading, business, phone])

  // Set up real-time subscription for business online status updates
  useEffect(() => {
    if (!business?.id) return

    const supabase = createClient()
    const channel = supabase
      .channel(`business-status:${business.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "businesses",
          filter: `id=eq.${business.id}`,
        },
        (payload) => {
          console.log("🟢 Business status update received:", payload)
          // Update business data when online status changes
          const updatedBusiness = payload.new as any
          if (updatedBusiness) {
            console.log("📊 Updating business online status:", updatedBusiness.online)
            // Update the cached business data - use functional update to get latest state
            mutateBusiness(
              (current) => {
                if (!current) return current
                return {
                  ...current,
                  online: updatedBusiness.online ?? false,
                }
              },
              true // Revalidate to ensure UI updates
            )
          }
        }
      )
      .subscribe((status) => {
        console.log(`Business status channel subscription: ${status}`)
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [business?.id, mutateBusiness])

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

    const handleMessageUpdate = (message: Message) => {
      console.log("📨 Real-time message update received (customer):", message)
      
      // Use functional update to always work with latest state
      setCurrentConversation((prev) => {
        if (!prev) return prev
        
        // Check if message already exists (might be from optimistic update)
        const existingIndex = prev.messages.findIndex((m) => m.id === message.id)
        
        let updatedMessages: Message[]
        if (existingIndex >= 0) {
          // Update existing message (replace optimistic with real)
          updatedMessages = [...prev.messages]
          updatedMessages[existingIndex] = message
        } else {
          // Add new message (from other user or real-time sync)
          updatedMessages = [...prev.messages, message]
        }
        
        // Sort by creation time
        updatedMessages.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        
        return {
          ...prev,
          messages: updatedMessages,
          lastMessageAt: message.createdAt,
        }
      })
    }

    const handleMessageDelete = (messageId: string) => {
      console.log("🗑️ Real-time message delete received (customer):", messageId)
      
      setCurrentConversation((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          messages: prev.messages.filter((m) => m.id !== messageId),
        }
      })
    }

    const handleConversationUpdate = async () => {
      if (!currentConversation?.id) return
      const updated = await storage.getConversationById(currentConversation.id)
      if (updated) {
        setCurrentConversation(updated)
      }
    }

    const cleanup = setupConversationChannel(
      currentConversation.id,
      "customer",
      "customer",
      handleTyping,
      handleMessageUpdate,
      handleMessageDelete,
      handleConversationUpdate
    )
    return cleanup
  }, [currentConversation?.id, setupConversationChannel])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (currentConversation?.messages) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [currentConversation?.messages])

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
        const updated = await storage.getConversationById(currentConversation.id)
        if (updated && updated.messages.length > lastMessageCountRef.current) {
          lastMessageCountRef.current = updated.messages.length
          setCurrentConversation(updated)
        }
      } catch (error) {
        console.error("Error polling for messages:", error)
      }
    }, 2000) // Poll every 2 seconds as fallback

    return () => {
      clearInterval(pollInterval)
    }
  }, [currentConversation?.id, connectionStatus, currentConversation?.messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentConversation?.messages])

  // Mark messages as read when conversation is viewed
  useEffect(() => {
    if (!currentConversation?.id || !business) return

    const markAsRead = async () => {
      try {
        await db.markMessagesAsRead(currentConversation.id, "business")
        const updated = await storage.getConversationById(currentConversation.id)
        if (updated) {
          setCurrentConversation(updated)
        }
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

  const handleSendMessage = async (text: string, replyToId?: string) => {
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
      replyToId: replyToId || undefined,
    }

    // Optimistic update: Show message immediately using functional update
    setCurrentConversation((prev) => {
      if (!prev) return prev
      const updatedMessages = [...prev.messages, newMessage].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      return {
        ...prev,
        messages: updatedMessages,
        lastMessageAt: newMessage.createdAt,
      }
    })
    setIsTyping(false)

    try {
      // Send message to server
      const createdMessage = await db.createMessage(newMessage)
      console.log("✅ Message created on server:", createdMessage)
      
      // Replace temp message with real message (with server ID) using functional update
      // The real-time handler will also receive this, but we update immediately to avoid flicker
      setCurrentConversation((prev) => {
        if (!prev) return prev
        const updatedMessages = prev.messages.map(m => 
          m.id === tempId ? createdMessage : m
        ).sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        return {
          ...prev,
          messages: updatedMessages,
          lastMessageAt: createdMessage.createdAt,
        }
      })
    } catch (error) {
      console.error("❌ Failed to send message:", error)
      // Rollback optimistic update on error using functional update
      setCurrentConversation((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          messages: prev.messages.filter(m => m.id !== tempId),
        }
      })
      // Show error to user
      setError("Failed to send message. Please try again.")
      setTimeout(() => setError(""), 3000)
    } finally {
      setIsSending(false)
      setReplyTo(null)
    }
  }

  const handleSendImage = async (imageUrl: string, replyToId?: string) => {
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
      replyToId: replyToId || undefined,
    }

    // Optimistic update: Show image immediately using functional update
    setCurrentConversation((prev) => {
      if (!prev) return prev
      const updatedMessages = [...prev.messages, newMessage].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      return {
        ...prev,
        messages: updatedMessages,
        lastMessageAt: newMessage.createdAt,
      }
    })
    setIsTyping(false)

    try {
      const createdMessage = await db.createMessage(newMessage)
      console.log("✅ Image message created on server:", createdMessage)
      
      // Replace temp message with real message (with server ID) using functional update
      setCurrentConversation((prev) => {
        if (!prev) return prev
        const updatedMessages = prev.messages.map(m => 
          m.id === tempId ? createdMessage : m
        ).sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        return {
          ...prev,
          messages: updatedMessages,
          lastMessageAt: createdMessage.createdAt,
        }
      })
    } catch (error) {
      console.error("❌ Failed to send image:", error)
      // Rollback optimistic update on error using functional update
      setCurrentConversation((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          messages: prev.messages.filter(m => m.id !== tempId),
        }
      })
      setError("Failed to send image. Please try again.")
      setTimeout(() => setError(""), 3000)
    } finally {
      setIsSending(false)
      setReplyTo(null)
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

  if (businessLoading) {
    return (
      <main className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </div>
      </main>
    )
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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 p-6 text-center border-b border-slate-200 dark:border-slate-800">
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex justify-center mb-4"
              >
                <div className="relative">
                  <Image 
                    src="/logo.png" 
                    alt="Leenk" 
                    width={80} 
                    height={80} 
                    className="object-contain drop-shadow-lg" 
                  />
                </div>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-slate-900 dark:text-white mb-3"
              >
                {business.businessName}
              </motion.h2>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-2"
              >
                <div className={`w-2 h-2 rounded-full ${(business.online ?? false) ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {(business.online ?? false) ? "Online" : "Offline"}
                </span>
              </motion.div>
            </div>

            {/* Form Section */}
            <div className="p-6 md:p-8">
              <form onSubmit={handleStartChat} className="space-y-5">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
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
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 pl-11 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                      disabled={isSearching}
                    />
                  </div>
                  {isSearching && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Searching for existing conversations...</span>
                    </div>
                  )}
                </div>

                {/* Name Input - Animated */}
                {showNameInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value)
                          setError("")
                        }}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 pl-11 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        required
                        autoFocus
                      />
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSearching || !customerEmail.trim() || (showNameInput && !customerName.trim())}
                >
                  {isSearching ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Searching...
                    </span>
                  ) : (
                    <span>{showNameInput ? "Start Chat" : "Continue"}</span>
                  )}
                </Button>
              </form>

              {/* Footer Note */}
              <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-6">
                By continuing, you agree to start a conversation with {business.businessName}
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    )
  }

  if (!currentConversation) {
    return (
      <main className="h-screen flex flex-col bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative">
        <Wallpaper/>
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
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${(business.online ?? false) ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                  <p className="text-xs text-muted-foreground">{(business.online ?? false) ? "Online" : "Offline"}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen flex flex-col bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)] relative">
      <Wallpaper />
      {/* Header - Fixed at top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur-sm p-3 md:p-4"
      >
        <div className="flex items-center gap-3">
          <Avatar src={business.businessLogo} name={business.businessName} size="md" />
          <div>
            <h2 className="font-semibold text-lg text-foreground">{business.businessName}</h2>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${(business.online ?? false) ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <p className="text-xs text-muted-foreground">
                {(business.online ?? false) ? "Online" : "Offline"}
                {connectionStatus === "connected" && (
                  <span className="ml-2 text-primary" title="Real-time connected">●</span>
                )}
                {connectionStatus === "disconnected" && (
                  <span className="ml-2 text-yellow-500" title="Reconnecting...">●</span>
                )}
              </p>
            </div>
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
              <ChatBubble 
                key={msg.id} 
                message={msg} 
                isOwn={msg.senderType === "customer"} 
                index={idx}
                onReply={setReplyTo}
              />
            ))}
            {otherUserTyping && <TypingIndicator isOwn={false} />}
          </>
        )}
        <div ref={messagesEndRef} />
      </motion.div>

      {/* Message Input - Fixed at bottom */}
      <div className="sticky bottom-0 z-20 bg-card/80 backdrop-blur-sm border-t border-border">
        <MessageInput 
          onSendMessage={handleSendMessage} 
          onSendImage={handleSendImage}
          onTyping={handleTyping}
          disabled={isSending || !currentConversation}
          replyTo={replyTo}
          onCancelReply={() => setReplyTo(null)}
        />
      </div>
    </main>
  )
}

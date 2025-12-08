import { useEffect, useRef, useState, useCallback } from "react"
import { createClient } from "../supabase/client"
import { db } from "../supabase/db"
import type { Message, Conversation } from "../types"
import { storage } from "../storage"
import { sendAwayMessageIfEnabled } from "../away-message"

type TypingCallback = (senderType: "business" | "customer") => void
type RealtimeChannel = Parameters<ReturnType<typeof createClient>["removeChannel"]>[0]

const maxReconnectAttempts = 5

export function useRealtime() {
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "connecting">("connecting")
  const channelsRef = useRef<Map<string, RealtimeChannel>>(new Map())
  const typingCallbacksRef = useRef<Map<string, TypingCallback>>(new Map())
  const reconnectAttemptsRef = useRef<Map<string, number>>(new Map())
  const heartbeatIntervalsRef = useRef<Map<string, NodeJS.Timeout>>(new Map())
  const reconnectTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map())
  const typingBroadcastThrottlesRef = useRef<Map<string, NodeJS.Timeout>>(new Map())

  const cleanupChannel = useCallback((channelName: string) => {
    const supabase = createClient()
    const channel = channelsRef.current.get(channelName)
    if (channel) {
      supabase.removeChannel(channel)
      channelsRef.current.delete(channelName)
    }
    
    const interval = heartbeatIntervalsRef.current.get(channelName)
    if (interval) {
      clearInterval(interval)
      heartbeatIntervalsRef.current.delete(channelName)
    }
    
    const timer = reconnectTimersRef.current.get(channelName)
    if (timer) {
      clearTimeout(timer)
      reconnectTimersRef.current.delete(channelName)
    }
    
    reconnectAttemptsRef.current.delete(channelName)
  }, [])

  const setupConversationChannel = useCallback((
    conversationId: string,
    senderType: "business" | "customer",
    senderId: string,
    onTyping?: TypingCallback,
    onMessageUpdate?: (message: Message) => void,
    onMessageDelete?: (messageId: string) => void,
    onConversationUpdate?: () => void
  ) => {
    const supabase = createClient()
    const channelName = `conversation:${conversationId}`
    
    // Clean up existing channel if any
    cleanupChannel(channelName)
    
    const channel = supabase
      .channel(channelName, {
        config: {
          broadcast: { self: true },
          presence: { key: senderId },
        },
      })
      .on("broadcast", { event: "typing" }, (payload) => {
        // Only trigger callback if it's from the other user
        const otherSenderType = senderType === "business" ? "customer" : "business"
        if (payload.payload.senderType === otherSenderType && onTyping) {
          onTyping(payload.payload.senderType)
        }
      })
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          console.log("🔔 Real-time event received:", payload.eventType, payload)
          
          if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
            try {
              const dbMessage = payload.new as any
              const newMessage: Message = {
                id: dbMessage.id,
                conversationId: dbMessage.conversation_id,
                senderType: dbMessage.sender_type,
                senderId: dbMessage.sender_id,
                text: dbMessage.content || undefined,
                imageUrl: dbMessage.image_url || undefined,
                status: (dbMessage.status || "sent") as "sent" | "delivered" | "read",
                createdAt: dbMessage.created_at,
                replyToId: dbMessage.reply_to_id || undefined,
              }

              // If this message is a reply, fetch the original message (only needed fields)
              if (dbMessage.reply_to_id) {
                try {
                  const { data: replyToMessage, error: replyError } = await supabase
                    .from("messages")
                    .select("id, conversation_id, sender_type, sender_id, content, image_url, status, created_at")
                    .eq("id", dbMessage.reply_to_id)
                    .maybeSingle() // Use maybeSingle() to handle missing messages gracefully

                  if (!replyError && replyToMessage) {
                    newMessage.replyTo = {
                      id: replyToMessage.id,
                      conversationId: replyToMessage.conversation_id,
                      senderType: replyToMessage.sender_type,
                      senderId: replyToMessage.sender_id,
                      text: replyToMessage.content || undefined,
                      imageUrl: replyToMessage.image_url || undefined,
                      status: (replyToMessage.status || "sent") as "sent" | "delivered" | "read",
                      createdAt: replyToMessage.created_at,
                    }
                  }
                } catch (replyError) {
                  console.error("Error fetching reply message:", replyError)
                  // Continue without reply info if fetch fails
                }
              }

              console.log("📨 Processed message:", newMessage)

              // Mark as delivered if it's a new message from the other user
              const otherSenderType = senderType === "business" ? "customer" : "business"
              if (payload.eventType === "INSERT" && newMessage.senderType === otherSenderType) {
                try {
                  await db.updateMessageStatus(newMessage.id, "delivered")
                  // Update the message status after marking as delivered
                  newMessage.status = "delivered"
                  
                  // If this is a customer message, check and send away message if enabled
                  if (newMessage.senderType === "customer" && senderType === "business") {
                    // Get business ID from the conversation
                    const { data: convData, error: convError } = await supabase
                      .from("conversations")
                      .select("business_id")
                      .eq("id", newMessage.conversationId)
                      .maybeSingle() // Use maybeSingle() to handle missing conversations gracefully
                    
                    if (!convError && convData?.business_id) {
                      // Send away message asynchronously (don't block)
                      sendAwayMessageIfEnabled(newMessage.conversationId, convData.business_id)
                        .catch((err) => console.error("Error in away message:", err))
                    }
                  }
                } catch (error) {
                  console.error("Error updating message status:", error)
                }
              }

              // Only call update if message has required fields
              if (newMessage.id && newMessage.conversationId && onMessageUpdate) {
                console.log("✅ Calling onMessageUpdate callback with message:", newMessage.id)
                onMessageUpdate(newMessage)
              } else {
                console.warn("⚠️ onMessageUpdate callback not provided or message missing required fields", {
                  hasId: !!newMessage.id,
                  hasConversationId: !!newMessage.conversationId,
                  hasCallback: !!onMessageUpdate
                })
              }
            } catch (error) {
              console.error("❌ Error processing real-time message:", error)
            }
          } else if (payload.eventType === "DELETE") {
            const deletedId = payload.old?.id
            console.log("🗑️ Message deleted:", deletedId)
            if (deletedId && onMessageDelete) {
              onMessageDelete(deletedId)
            }
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "conversations",
          filter: `id=eq.${conversationId}`,
        },
        async () => {
          if (onConversationUpdate) {
            onConversationUpdate()
          }
        }
      )
      .subscribe((status, err) => {
        if (status === "SUBSCRIBED") {
          setConnectionStatus("connected")
          reconnectAttemptsRef.current.set(channelName, 0)
          channelsRef.current.set(channelName, channel)
          if (onTyping) {
            typingCallbacksRef.current.set(channelName, onTyping)
          }

          console.log(`✅ Real-time connected: ${channelName}`)

          // Set up heartbeat to keep connection alive
          const interval = setInterval(() => {
            try {
              channel.send({
                type: "presence",
                event: "heartbeat",
                payload: { user_id: senderId, timestamp: Date.now() },
              })
            } catch (error) {
              console.error("Heartbeat error:", error)
            }
          }, 30000)
          heartbeatIntervalsRef.current.set(channelName, interval)
        } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
          console.warn(`⚠️ Real-time disconnected: ${channelName}`, err)
          setConnectionStatus("disconnected")
          
          const interval = heartbeatIntervalsRef.current.get(channelName)
          if (interval) {
            clearInterval(interval)
            heartbeatIntervalsRef.current.delete(channelName)
          }

          // Attempt reconnection with exponential backoff
          const attempts = reconnectAttemptsRef.current.get(channelName) || 0
          if (attempts < maxReconnectAttempts) {
            reconnectAttemptsRef.current.set(channelName, attempts + 1)
            const delay = Math.min(1000 * Math.pow(2, attempts + 1), 30000)
            
            console.log(`🔄 Reconnecting ${channelName} (attempt ${attempts + 1}/${maxReconnectAttempts}) in ${delay}ms`)
            
            const timer = setTimeout(() => {
              setupConversationChannel(conversationId, senderType, senderId, onTyping, onMessageUpdate, onMessageDelete, onConversationUpdate)
            }, delay)
            reconnectTimersRef.current.set(channelName, timer)
          } else {
            console.error(`❌ Max reconnection attempts reached for ${channelName}`)
          }
        }
      })

    return () => {
      typingCallbacksRef.current.delete(channelName)
      cleanupChannel(channelName)
    }
  }, [cleanupChannel])

  const broadcastTyping = useCallback((conversationId: string, senderType: "business" | "customer") => {
    const channelName = `conversation:${conversationId}`
    const channel = channelsRef.current.get(channelName)
    
    if (!channel) return
    
    // Throttle broadcasts to once per second
    const throttleKey = `${channelName}:${senderType}`
    if (typingBroadcastThrottlesRef.current.has(throttleKey)) {
      return
    }
    
    channel.send({
      type: "broadcast",
      event: "typing",
      payload: {
        senderType,
        conversationId,
      },
    })
    
    const timer = setTimeout(() => {
      typingBroadcastThrottlesRef.current.delete(throttleKey)
    }, 1000)
    typingBroadcastThrottlesRef.current.set(throttleKey, timer)
  }, [])

  const setupBusinessChannel = useCallback((businessId: string, onConversationsUpdate?: () => void) => {
    const supabase = createClient()
    const channelName = `business:${businessId}`
    
    // Clean up existing channel if any
    cleanupChannel(channelName)
    
    const channel = supabase
      .channel(channelName, {
        config: {
          broadcast: { self: true },
        },
      })
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        async () => {
          // Refresh conversations list when new messages arrive
          if (onConversationsUpdate) {
            onConversationsUpdate()
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
        },
        async () => {
          // Refresh conversations list when message status changes (e.g., marked as read)
          if (onConversationsUpdate) {
            onConversationsUpdate()
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "conversations",
        },
        async () => {
          // Refresh conversations list when conversations are updated
          if (onConversationsUpdate) {
            onConversationsUpdate()
          }
        }
      )
      .subscribe((status) => {
        console.log("Business channel subscription status:", status)
      })

    channelsRef.current.set(channelName, channel)
    
    return () => {
      cleanupChannel(channelName)
    }
  }, [cleanupChannel])

  const cleanup = useCallback(() => {
    channelsRef.current.forEach((_, channelName) => {
      typingCallbacksRef.current.delete(channelName)
      cleanupChannel(channelName)
    })
    typingBroadcastThrottlesRef.current.forEach((timer) => clearTimeout(timer))
    typingBroadcastThrottlesRef.current.clear()
    setConnectionStatus("disconnected")
  }, [cleanupChannel])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [cleanup])

  return {
    connectionStatus,
    setupConversationChannel,
    broadcastTyping,
    setupBusinessChannel,
    cleanup,
  }
}


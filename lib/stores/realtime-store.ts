import { create } from "zustand"
import { createClient } from "../supabase/client"
import { db } from "../supabase/db"
import type { Message } from "../types"
import { useConversationsStore } from "./conversations-store"

type TypingCallback = (senderType: "business" | "customer") => void

type RealtimeChannel = Parameters<ReturnType<typeof createClient>["removeChannel"]>[0]

interface RealtimeState {
  connectionStatus: "connected" | "disconnected" | "connecting"
  channels: Map<string, RealtimeChannel>
  typingCallbacks: Map<string, TypingCallback>
  setupConversationChannel: (
    conversationId: string,
    senderType: "business" | "customer",
    senderId: string,
    onTyping?: TypingCallback
  ) => () => void
  setupBusinessChannel: (businessId: string) => () => void
  broadcastTyping: (conversationId: string, senderType: "business" | "customer") => void
  cleanup: () => void
}

const maxReconnectAttempts = 5

export const useRealtimeStore = create<RealtimeState>((set, get) => {
  const supabase = createClient()
  const channels = new Map<string, RealtimeChannel>()
  const typingCallbacks = new Map<string, TypingCallback>()
  const reconnectAttempts = new Map<string, number>()
  const heartbeatIntervals = new Map<string, NodeJS.Timeout>()
  const reconnectTimers = new Map<string, NodeJS.Timeout>()
  const typingBroadcastThrottles = new Map<string, NodeJS.Timeout>()

  const cleanupChannel = (channelName: string) => {
    const channel = channels.get(channelName)
    if (channel) {
      supabase.removeChannel(channel)
      channels.delete(channelName)
    }
    
    const interval = heartbeatIntervals.get(channelName)
    if (interval) {
      clearInterval(interval)
      heartbeatIntervals.delete(channelName)
    }
    
    const timer = reconnectTimers.get(channelName)
    if (timer) {
      clearTimeout(timer)
      reconnectTimers.delete(channelName)
    }
    
    reconnectAttempts.delete(channelName)
  }

  return {
    connectionStatus: "connecting",
    channels,
    typingCallbacks,
    
    setupConversationChannel: (conversationId: string, senderType: "business" | "customer", senderId: string, onTyping?: TypingCallback) => {
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
                }

                // Mark as delivered if it's a new message from the other user
                const otherSenderType = senderType === "business" ? "customer" : "business"
                if (payload.eventType === "INSERT" && newMessage.senderType === otherSenderType) {
                  db.updateMessageStatus(newMessage.id, "delivered")
                }

                // Update store - addMessage now handles duplicates by updating existing messages
                const { addMessage, updateMessage } = useConversationsStore.getState()
                if (payload.eventType === "INSERT") {
                  // addMessage will check for duplicates and update if message already exists
                  addMessage(newMessage)
                } else {
                  updateMessage(newMessage.id, newMessage)
                }
              } catch (error) {
                console.error("Error processing real-time message:", error)
              }
            } else if (payload.eventType === "DELETE") {
              const deletedId = payload.old?.id
              if (deletedId) {
                const { removeMessage } = useConversationsStore.getState()
                removeMessage(deletedId)
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
          async (payload) => {
            const { loadConversation } = useConversationsStore.getState()
            await loadConversation(conversationId)
          }
        )
        .subscribe((status, err) => {
          if (status === "SUBSCRIBED") {
            set({ connectionStatus: "connected" })
            reconnectAttempts.set(channelName, 0)
            channels.set(channelName, channel)
            if (onTyping) {
              typingCallbacks.set(channelName, onTyping)
            }

            // Set up heartbeat
            const interval = setInterval(() => {
              channel.send({
                type: "presence",
                event: "heartbeat",
                payload: { user_id: senderId, timestamp: Date.now() },
              })
            }, 30000)
            heartbeatIntervals.set(channelName, interval)
          } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
            set({ connectionStatus: "disconnected" })
            
            const interval = heartbeatIntervals.get(channelName)
            if (interval) {
              clearInterval(interval)
              heartbeatIntervals.delete(channelName)
            }

            // Attempt reconnection
            const attempts = reconnectAttempts.get(channelName) || 0
            if (attempts < maxReconnectAttempts) {
              reconnectAttempts.set(channelName, attempts + 1)
              const delay = Math.min(1000 * Math.pow(2, attempts + 1), 30000)
              
              const timer = setTimeout(() => {
                get().setupConversationChannel(conversationId, senderType, senderId)
              }, delay)
              reconnectTimers.set(channelName, timer)
            }
          }
        })

      return () => {
        typingCallbacks.delete(channelName)
        cleanupChannel(channelName)
      }
    },
    
    broadcastTyping: (conversationId: string, senderType: "business" | "customer") => {
      const channelName = `conversation:${conversationId}`
      const channel = channels.get(channelName)
      
      if (!channel) return
      
      // Throttle broadcasts to once per second
      const throttleKey = `${channelName}:${senderType}`
      if (typingBroadcastThrottles.has(throttleKey)) {
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
        typingBroadcastThrottles.delete(throttleKey)
      }, 1000)
      typingBroadcastThrottles.set(throttleKey, timer)
    },
    
    setupBusinessChannel: (businessId: string) => {
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
          async (payload) => {
            // Refresh conversations list when new messages arrive
            const { refreshConversations } = useConversationsStore.getState()
            await refreshConversations(businessId)
          }
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "conversations",
          },
          async (payload) => {
            // Refresh conversations list when conversations are updated
            const { refreshConversations } = useConversationsStore.getState()
            await refreshConversations(businessId)
          }
        )
        .subscribe((status) => {
          console.log("Business channel subscription status:", status)
        })

      channels.set(channelName, channel)
      
      return () => {
        cleanupChannel(channelName)
      }
    },
    
    cleanup: () => {
      channels.forEach((_, channelName) => {
        typingCallbacks.delete(channelName)
        cleanupChannel(channelName)
      })
      typingBroadcastThrottles.forEach((timer) => clearTimeout(timer))
      typingBroadcastThrottles.clear()
      set({ connectionStatus: "disconnected" })
    },
  }
})


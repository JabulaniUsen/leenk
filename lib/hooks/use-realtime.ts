import { useRef, useState, useCallback } from "react"
import { createClient } from "../supabase/client"
import { db } from "../supabase/db"
import type { Message } from "../types"
import { sendAwayMessageIfEnabled } from "../away-message"

type TypingCallback = (senderType: "business" | "customer") => void
type RealtimeChannel = Parameters<ReturnType<typeof createClient>["removeChannel"]>[0]

// Cache for reply-to messages to avoid repeated queries
const replyToCache = new Map<string, Message>()

/**
 * CORRECT REALTIME PATTERNS:
 * 
 * 1. One channel = one purpose (immutable bindings)
 * 2. Channel names must be unique per binding set
 * 3. Never retry binding mismatch errors (fatal config issue)
 * 4. Stable channel creation (only conversationId in deps)
 * 5. Realtime = invalidation signal, not source of truth
 */
export function useRealtime() {
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "connecting">("connecting")
  const channelsRef = useRef<Map<string, RealtimeChannel>>(new Map())

  /**
   * Clean up a channel completely
   * Must unsubscribe before removing to prevent binding conflicts
   */
  const cleanupChannel = useCallback((channelName: string) => {
    const channel = channelsRef.current.get(channelName)
    if (channel) {
      try {
        channel.unsubscribe()
        const supabase = createClient()
      supabase.removeChannel(channel)
      } catch (error) {
        console.warn(`Error cleaning up channel ${channelName}:`, error)
      }
      channelsRef.current.delete(channelName)
    }
  }, [])

  /**
   * Clean up ALL channels for a conversation (including old naming patterns)
   * This prevents binding mismatches from old channel names
   */
  const cleanupAllConversationChannels = useCallback((conversationId: string) => {
    const supabase = createClient()
    const oldChannelName = `conversation:${conversationId}`
    const newChannelNames = [
      `conversation:${conversationId}:messages`,
      `conversation:${conversationId}:meta`,
      `conversation:${conversationId}:typing`,
    ]

    // Clean up old channel name (backward compatibility)
    const oldChannel = channelsRef.current.get(oldChannelName)
    if (oldChannel) {
      try {
        oldChannel.unsubscribe()
        supabase.removeChannel(oldChannel)
        channelsRef.current.delete(oldChannelName)
        console.log(`🧹 Cleaned up old channel: ${oldChannelName}`)
      } catch (error) {
        console.warn(`Error cleaning up old channel ${oldChannelName}:`, error)
      }
    }

    // Also try to remove from Supabase's internal registry if it exists
    try {
      // Get all channels from Supabase client and remove any matching
      const allChannels = supabase.getChannels()
      allChannels.forEach((ch: any) => {
        const chName = ch.topic?.replace('realtime:', '') || ''
        if (chName === oldChannelName || newChannelNames.includes(chName)) {
          try {
            ch.unsubscribe()
            supabase.removeChannel(ch)
          } catch (e) {
            // Ignore errors - channel might not exist
          }
        }
      })
    } catch (error) {
      // Supabase client might not expose getChannels, ignore
    }

    // Clean up new channel names
    newChannelNames.forEach(name => cleanupChannel(name))
  }, [cleanupChannel])

  /**
   * Setup messages channel for a conversation
   * Channel name: conversation:{id}:messages
   * Purpose: Listen to message INSERT/UPDATE/DELETE events
   */
  const setupMessagesChannel = useCallback((
    conversationId: string,
    onMessageUpdate?: (message: Message) => void,
    onMessageDelete?: (messageId: string) => void
  ) => {
    const supabase = createClient()
    const channelName = `conversation:${conversationId}:messages`
    
    // Clean up ALL conversation channels first (including old naming)
    // This prevents binding mismatches from old channel names
    cleanupAllConversationChannels(conversationId)
    
    // Now create the new channel
    const channel = supabase
      .channel(channelName, {
        config: {
          broadcast: { self: true },
            },
          })
          // Single binding: all message events for this conversation
      .on(
        "postgres_changes",
        {
              event: "*", // INSERT, UPDATE, DELETE
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
              // REALTIME AS INVALIDATION: Fetch authoritative data from DB
              if (payload.eventType === "DELETE") {
                const deletedId = payload.old?.id
                if (deletedId && onMessageDelete) {
                  onMessageDelete(deletedId)
                }
                return
              }

              // For INSERT/UPDATE, fetch from database (source of truth)
              const messageId = payload.new?.id || payload.old?.id
              if (!messageId) return

              try {
                const { data: dbMessage, error: fetchError } = await supabase
                  .from("messages")
                  .select("id, conversation_id, sender_type, sender_id, content, image_url, status, read_at, created_at, reply_to_id")
                  .eq("id", messageId)
                  .maybeSingle()

                if (fetchError || !dbMessage) {
                  console.warn("Could not fetch message after realtime event:", fetchError)
                  return
                }

                const message: Message = {
                id: dbMessage.id,
                conversationId: dbMessage.conversation_id,
                senderType: dbMessage.sender_type,
                senderId: dbMessage.sender_id,
                text: dbMessage.content || undefined,
                imageUrl: dbMessage.image_url || undefined,
                status: (dbMessage.status || "sent") as "sent" | "delivered" | "read",
                  readAt: dbMessage.read_at || undefined,
                createdAt: dbMessage.created_at,
                replyToId: dbMessage.reply_to_id || undefined,
              }

                // Fetch reply-to message if needed
              if (dbMessage.reply_to_id) {
                const cached = replyToCache.get(dbMessage.reply_to_id)
                if (cached) {
                    message.replyTo = cached
                } else {
                  try {
                      const { data: replyToMessage } = await supabase
                      .from("messages")
                        .select("id, conversation_id, sender_type, sender_id, content, image_url, status, read_at, created_at")
                      .eq("id", dbMessage.reply_to_id)
                      .maybeSingle()

                      if (replyToMessage) {
                      const replyMsg: Message = {
                        id: replyToMessage.id,
                        conversationId: replyToMessage.conversation_id,
                        senderType: replyToMessage.sender_type,
                        senderId: replyToMessage.sender_id,
                        text: replyToMessage.content || undefined,
                        imageUrl: replyToMessage.image_url || undefined,
                        status: (replyToMessage.status || "sent") as "sent" | "delivered" | "read",
                          readAt: replyToMessage.read_at || undefined,
                        createdAt: replyToMessage.created_at,
                        }
                        replyToCache.set(dbMessage.reply_to_id, replyMsg)
                        message.replyTo = replyMsg
                      }
                    } catch (error) {
                      console.error("Error fetching reply message:", error)
                    }
                  }
                }

                // Mark as delivered if from other user
                if (message.senderType === "customer") {
                  try {
                    await db.updateMessageStatus(message.id, "delivered")
                    message.status = "delivered"
                    
                    // Check if business should receive away message
                    const { data: convData } = await supabase
                      .from("conversations")
                      .select("business_id")
                      .eq("id", message.conversationId)
                      .maybeSingle()
                    
                    if (convData?.business_id) {
                      sendAwayMessageIfEnabled(message.conversationId, convData.business_id)
                        .catch((err) => console.error("Error in away message:", err))
                  }
                } catch (error) {
                  console.error("Error updating message status:", error)
                }
              }

                if (onMessageUpdate) {
                  onMessageUpdate(message)
              }
            } catch (error) {
              console.error("❌ Error processing real-time message:", error)
              }
            }
          )
          .subscribe((status, err) => {
            if (status === "SUBSCRIBED") {
              setConnectionStatus("connected")
              channelsRef.current.set(channelName, channel)
              console.log(`✅ Messages channel connected: ${channelName}`)
            } else if (status === "CHANNEL_ERROR") {
              const errorMessage = err?.message || String(err || "")
              const isBindingMismatch = errorMessage?.includes("mismatch") || 
                                       errorMessage?.includes("binding")
              
              if (isBindingMismatch) {
                console.error(`❌ Fatal binding mismatch for ${channelName}. This is a configuration error - not retrying.`)
                cleanupChannel(channelName)
                return // DO NOT retry - this is a developer bug
              }
              
              console.warn(`⚠️ Messages channel error: ${channelName}`, err)
              setConnectionStatus("disconnected")
            } else if (status === "CLOSED" || status === "TIMED_OUT") {
              console.warn(`⚠️ Messages channel closed: ${channelName}`)
              setConnectionStatus("disconnected")
            }
          })

    return () => {
      cleanupChannel(channelName)
    }
  }, [cleanupChannel, cleanupAllConversationChannels])

  /**
   * Setup conversation metadata channel
   * Channel name: conversation:{id}:meta
   * Purpose: Listen to conversation UPDATE events
   */
  const setupConversationMetaChannel = useCallback((
    conversationId: string,
    onConversationUpdate?: () => void
  ) => {
    const supabase = createClient()
    const channelName = `conversation:${conversationId}:meta`
    
    // Clean up old channels first
    cleanupAllConversationChannels(conversationId)
    
    const channel = supabase
      .channel(channelName, {
        config: {
          broadcast: { self: true },
        },
      })
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "conversations",
          filter: `id=eq.${conversationId}`,
        },
        () => {
          if (onConversationUpdate) {
            onConversationUpdate()
          }
        }
      )
      .subscribe((status, err) => {
        if (status === "SUBSCRIBED") {
          channelsRef.current.set(channelName, channel)
          console.log(`✅ Conversation meta channel connected: ${channelName}`)
        } else if (status === "CHANNEL_ERROR") {
          const errorMessage = err?.message || String(err || "")
          const isBindingMismatch = errorMessage?.includes("mismatch") || 
                                   errorMessage?.includes("binding")
          
          if (isBindingMismatch) {
            console.error(`❌ Fatal binding mismatch for ${channelName}. Not retrying.`)
            cleanupChannel(channelName)
            return
          }
          console.warn(`⚠️ Conversation meta channel error: ${channelName}`, err)
        }
      })

    return () => {
      cleanupChannel(channelName)
    }
  }, [cleanupChannel, cleanupAllConversationChannels])

  /**
   * Setup typing broadcast channel
   * Channel name: conversation:{id}:typing
   * Purpose: Broadcast-only (no postgres_changes) for typing indicators
   */
  const setupTypingChannel = useCallback((
    conversationId: string,
    senderType: "business" | "customer",
    senderId: string,
    onTyping?: TypingCallback
  ) => {
    const supabase = createClient()
    const channelName = `conversation:${conversationId}:typing`
    
    // Clean up old channels first
    cleanupAllConversationChannels(conversationId)
    
    const channel = supabase
      .channel(channelName, {
        config: {
          broadcast: { self: true },
          presence: { key: senderId },
        },
      })
      .on("broadcast", { event: "typing" }, (payload) => {
        const otherSenderType = senderType === "business" ? "customer" : "business"
        if (payload.payload.senderType === otherSenderType && onTyping) {
          onTyping(payload.payload.senderType)
        }
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          channelsRef.current.set(channelName, channel)
          console.log(`✅ Typing channel connected: ${channelName}`)
        }
      })

    return () => {
      cleanupChannel(channelName)
    }
  }, [cleanupChannel, cleanupAllConversationChannels])

  /**
   * Convenience function that sets up all channels for a conversation
   * This maintains backward compatibility while using split channels internally
   */
  const setupConversationChannel = useCallback((
    conversationId: string,
    senderType: "business" | "customer",
    senderId: string,
    onTyping?: TypingCallback,
    onMessageUpdate?: (message: Message) => void,
    onMessageDelete?: (messageId: string) => void,
    onConversationUpdate?: () => void
  ) => {
    // Setup all three channels separately
    const cleanupMessages = setupMessagesChannel(conversationId, onMessageUpdate, onMessageDelete)
    const cleanupMeta = setupConversationMetaChannel(conversationId, onConversationUpdate)
    const cleanupTyping = setupTypingChannel(conversationId, senderType, senderId, onTyping)

    // Return combined cleanup function
    return () => {
      cleanupMessages()
      cleanupMeta()
      cleanupTyping()
    }
  }, [setupMessagesChannel, setupConversationMetaChannel, setupTypingChannel])

  /**
   * Broadcast typing indicator
   */
  const broadcastTyping = useCallback((conversationId: string, senderType: "business" | "customer") => {
    const channelName = `conversation:${conversationId}:typing`
    const channel = channelsRef.current.get(channelName)
    
    if (!channel) return
    
    channel.send({
      type: "broadcast",
      event: "typing",
      payload: {
        senderType,
        conversationId,
      },
    })
  }, [])

  /**
   * Setup business-wide channel for conversation list updates
   * Channel name: business:{id}
   * Purpose: Listen to conversation metadata changes for the business
   */
  const setupBusinessChannel = useCallback((businessId: string, onConversationsUpdate?: () => void) => {
    const supabase = createClient()
    const channelName = `business:${businessId}`
    
    cleanupChannel(channelName)
    
    let updateTimeout: NodeJS.Timeout | null = null
    let pendingUpdate = false
    
    const throttledUpdate = () => {
      pendingUpdate = true
      if (updateTimeout) return
      
      updateTimeout = setTimeout(() => {
        if (pendingUpdate && onConversationsUpdate) {
          onConversationsUpdate()
        }
        pendingUpdate = false
        updateTimeout = null
      }, 2000)
    }
    
    const channel = supabase
      .channel(channelName, {
        config: {
          broadcast: { self: true },
        },
      })
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "conversations",
          filter: `business_id=eq.${businessId}`,
        },
        throttledUpdate
      )
      .subscribe((status, err) => {
        if (status === "SUBSCRIBED") {
          channelsRef.current.set(channelName, channel)
          console.log(`✅ Business channel connected: ${channelName}`)
        } else if (status === "CHANNEL_ERROR") {
          const errorMessage = err?.message || String(err || "")
          const isBindingMismatch = errorMessage?.includes("mismatch") || 
                                   errorMessage?.includes("binding")
          
          if (isBindingMismatch) {
            console.error(`❌ Fatal binding mismatch for ${channelName}. Not retrying.`)
            cleanupChannel(channelName)
            return
          }
          console.warn(`⚠️ Business channel error: ${channelName}`, err)
        }
      })
    
    return () => {
      if (updateTimeout) clearTimeout(updateTimeout)
      cleanupChannel(channelName)
    }
  }, [cleanupChannel])

  /**
   * Cleanup all channels
   */
  const cleanup = useCallback(() => {
    channelsRef.current.forEach((_, channelName) => {
      cleanupChannel(channelName)
    })
    setConnectionStatus("disconnected")
  }, [cleanupChannel])

  return {
    connectionStatus,
    setupConversationChannel,
    setupMessagesChannel,
    setupConversationMetaChannel,
    setupTypingChannel,
    broadcastTyping,
    setupBusinessChannel,
    cleanup,
  }
}

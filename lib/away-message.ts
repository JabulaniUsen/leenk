import { db } from "./supabase/db"
import type { Message } from "./types"
import { v4 as uuidv4 } from "uuid"

/**
 * Automatically send away message when a customer sends a message
 * This should be called after a customer message is created
 */
export async function sendAwayMessageIfEnabled(
  conversationId: string,
  businessId: string
): Promise<void> {
  try {
    // Get business to check away message settings
    const business = await db.getBusinessById(businessId)
    
    if (!business) {
      console.warn("Business not found for away message:", businessId)
      return
    }

    // Check if away message is enabled and message exists
    if (!business.awayMessageEnabled || !business.awayMessage?.trim()) {
      return // Away message not enabled or no message set
    }

    // Check if we've already sent an away message in this conversation recently
    // (to avoid spamming if customer sends multiple messages)
    const conversation = await db.getConversationById(conversationId)
    if (!conversation) {
      console.warn("Conversation not found for away message:", conversationId)
      return
    }

    // Check if we've sent an away message in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    const recentAwayMessage = conversation.messages
      .filter((m) => m.senderType === "business")
      .find((m) => {
        const messageTime = new Date(m.createdAt)
        return messageTime > fiveMinutesAgo && m.text === business.awayMessage
      })

    if (recentAwayMessage) {
      // Already sent away message recently, don't send again
      return
    }

    // Create and send the away message
    const awayMessage: Message = {
      id: uuidv4(),
      conversationId: conversationId,
      senderType: "business",
      senderId: businessId,
      text: business.awayMessage.trim(),
      status: "sent",
      createdAt: new Date().toISOString(),
    }

    await db.createMessage(awayMessage)
    console.log("✅ Away message sent automatically to conversation:", conversationId)
  } catch (error) {
    console.error("❌ Error sending away message:", error)
    // Don't throw - we don't want to fail the original message if away message fails
  }
}


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

    // Get conversation to check if this is the first interaction
    const conversation = await db.getConversationById(conversationId)
    if (!conversation) {
      console.warn("Conversation not found for away message:", conversationId)
      return
    }

    // Only send away message if this is the customer's first time messaging
    // Check if there are any previous business messages in this conversation
    // If there are any business messages, it means they've interacted before
    const businessMessages = conversation.messages.filter(
      (m) => m.senderType === "business"
    )

    if (businessMessages.length > 0) {
      // Business has already messaged this customer before, don't send away message
      return
    }

    // Also check if we've already sent an away message (to prevent duplicates in race conditions)
    // This handles the case where multiple customer messages arrive before the away message is created
    const hasAwayMessage = conversation.messages.some(
      (m) => m.senderType === "business" && m.text === business.awayMessage?.trim()
    )

    if (hasAwayMessage) {
      // Away message already exists, don't send again
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


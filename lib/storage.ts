import type { Business, Conversation, AuthUser, Message } from "./types"
import { db } from "./supabase/db"
import { auth } from "./auth"
import { monitorRequest } from "./egress-monitor"

export const storage = {
  // Businesses
  getAllBusinesses: async (): Promise<Business[]> => {
    // Note: This is not ideal for Supabase as it would return all businesses
    // In a real app, you'd only get businesses the user has access to
    // For now, return empty array - this method might not be needed
    return []
  },

  getBusinessByPhone: async (phone: string): Promise<Business | null> => {
    return await db.getBusinessByPhone(phone)
  },

  getBusinessById: async (id: string): Promise<Business | null> => {
    return await db.getBusinessById(id)
  },

  createBusiness: async (business: Business): Promise<void> => {
    // Note: This should typically be called through auth.signUp
    // Password hash would be handled by Supabase Auth
    await db.createBusiness(business, "")
  },

  updateBusiness: async (id: string, updates: Partial<Business>): Promise<Business> => {
    const result = await db.updateBusiness(id, updates)
    if (!result) {
      throw new Error("Failed to update business")
    }
    return result
  },

  // Conversations - Realtime-first with delta syncing
  // Only fetch conversations updated after last timestamp (stored in localStorage)
  getConversationsByBusinessId: async (
    businessId: string,
    afterTimestamp?: string
  ): Promise<Conversation[]> => {
    // Direct DB call - no caching, rely on realtime for updates
    const conversations = await db.getConversationsByBusinessId(businessId, afterTimestamp)
    monitorRequest("getConversationsByBusinessId", conversations)
    return conversations
  },

  getConversationById: async (id: string): Promise<Conversation | null> => {
    // Realtime-first: Fetch initial 25 messages once, then rely on realtime for updates
    // No caching - realtime handles all new messages
    const conversation = await db.getConversationById(id)
    if (conversation) {
      monitorRequest("getConversationById", conversation)
    }
    return conversation
  },

  getMessagesPaginated: async (
    conversationId: string,
    beforeMessageId?: string,
    limit: number = 25
  ): Promise<Message[]> => {
    // On-demand pagination: only fetch when user scrolls up
    // No caching - realtime handles new messages
    const messages = await db.getMessagesPaginated(conversationId, beforeMessageId, limit)
    monitorRequest("getMessagesPaginated", messages)
    return messages
  },

  createConversation: async (conversation: Conversation): Promise<void> => {
    if (!conversation.customerEmail) {
      throw new Error("customerEmail is required to create a conversation")
    }
    try {
      await db.createConversation(conversation)
    } catch (error: any) {
      // Re-throw with better error information
      const enhancedError = new Error(error?.message || "Failed to create conversation")
      ;(enhancedError as any).code = error?.code
      ;(enhancedError as any).details = error?.details
      ;(enhancedError as any).hint = error?.hint
      throw enhancedError
    }
  },

  updateConversation: async (id: string, updates: Partial<Conversation>): Promise<Conversation | null> => {
    return await db.updateConversation(id, updates)
  },

  deleteConversation: async (id: string): Promise<void> => {
    await db.deleteConversation(id)
  },

  // Auth
  getAuth: async (): Promise<AuthUser | null> => {
    return await auth.getCurrentUser()
  },

  setAuth: async (user: AuthUser): Promise<void> => {
    // Auth is managed by Supabase sessions
    // This method is kept for compatibility but doesn't need to do anything
    // The session is automatically managed by Supabase
  },

  clearAuth: async (): Promise<void> => {
    await auth.signOut()
  },
}

import type { Business, Conversation, AuthUser, Message } from "./types"
import { db } from "./supabase/db"
import { auth } from "./auth"
import { messageCache, conversationCache } from "./indexeddb-cache"
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

  // Conversations
  getConversationsByBusinessId: async (businessId: string): Promise<Conversation[]> => {
    // Always fetch from server to ensure we have the latest data
    // Cache is used for instant display while fetching, but we always want fresh data
    try {
      const conversations = await db.getConversationsByBusinessId(businessId)
      
      // Save to cache for next time (async, don't block)
      conversationCache.saveConversations(conversations).catch(console.error)
      
      monitorRequest("getConversationsByBusinessId", conversations)
      return conversations
    } catch (error) {
      console.error("Error fetching conversations:", error)
      // If server fetch fails, try cache as fallback
      const cached = await conversationCache.getConversations(businessId)
      if (cached.length > 0) {
        console.log("Using cached conversations as fallback")
        return cached
      }
      // If both fail, return empty array
      return []
    }
  },

  getConversationById: async (id: string): Promise<Conversation | null> => {
    // Always fetch from server to ensure we have the latest conversation data
    // Cache is used for instant display while fetching, but we always want fresh data
    try {
      const conversation = await db.getConversationById(id)
      
      if (conversation) {
        // Save to cache for next time (async, don't block)
        messageCache.saveMessages(id, conversation.messages).catch(console.error)
        monitorRequest("getConversationById", conversation)
      }
      
      return conversation
    } catch (error) {
      console.error("Error fetching conversation:", error)
      // If server fetch fails, try cache as fallback
      const cachedMessages = await messageCache.getMessages(id, 25)
      if (cachedMessages.length > 0) {
        console.log("Using cached messages as fallback")
        // Still need to fetch conversation metadata
        try {
          const conversation = await db.getConversationById(id)
          if (conversation) {
            return {
              ...conversation,
              messages: cachedMessages,
            }
          }
        } catch (err) {
          console.error("Error fetching conversation metadata:", err)
        }
      }
      // If both fail, return null
      return null
    }
  },

  getMessagesPaginated: async (
    conversationId: string,
    beforeMessageId?: string,
    limit: number = 25
  ): Promise<Message[]> => {
    // For pagination, always fetch from server (cache is for initial load)
    const messages = await db.getMessagesPaginated(conversationId, beforeMessageId, limit)
    
    // Save to cache
    if (messages.length > 0) {
      await messageCache.saveMessages(conversationId, messages)
    }
    
    monitorRequest("getMessagesPaginated", messages)
    return messages
  },

  createConversation: async (conversation: Conversation): Promise<void> => {
    if (!conversation.customerEmail) {
      throw new Error("customerEmail is required to create a conversation")
    }
    await db.createConversation(conversation)
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

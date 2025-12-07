import type { Business, Conversation, AuthUser } from "./types"
import { db } from "./supabase/db"
import { auth } from "./auth"

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
    return await db.getConversationsByBusinessId(businessId)
  },

  getConversationById: async (id: string): Promise<Conversation | null> => {
    return await db.getConversationById(id)
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

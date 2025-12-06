import { createClient } from "./supabase/client"
import { db } from "./supabase/db"
import type { AuthUser, Business } from "./types"

export const auth = {
  // Sign up with email and password
  async signUp(email: string, password: string): Promise<{ user: AuthUser | null; error: Error | null }> {
    try {
      const supabase = createClient()

      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) {
        return { user: null, error: authError as Error }
      }

      if (!authData.user) {
        return { user: null, error: new Error("Failed to create user") }
      }

      // Create business record in database
      const business: Business = {
        id: authData.user.id,
        email,
        phone: "",
        businessName: "",
        address: "",
        online: false,
        createdAt: new Date().toISOString(),
      }

      // Create business record in database (no password hash needed, Supabase handles auth)
      try {
        await db.createBusiness(business, "")
      } catch (dbError) {
        // If business creation fails, the auth user is still created
        // This should be handled by a database trigger or cleanup job
        return { user: null, error: new Error("Failed to create business profile") }
      }

      const createdBusiness = await db.getBusinessById(authData.user.id)
      if (!createdBusiness) {
        return { user: null, error: new Error("Failed to retrieve business profile") }
      }

      const authUser: AuthUser = {
        id: authData.user.id,
        email,
        business: createdBusiness,
      }

      return { user: authUser, error: null }
    } catch (error) {
      return { user: null, error: error as Error }
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: Error | null }> {
    try {
      const supabase = createClient()

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError || !authData.user) {
        return { user: null, error: authError as Error || new Error("Invalid credentials") }
      }

      // Get business data
      const business = await db.getBusinessById(authData.user.id)

      if (!business) {
        return { user: null, error: new Error("Business profile not found") }
      }

      const authUser: AuthUser = {
        id: authData.user.id,
        email: authData.user.email!,
        business,
      }

      return { user: authUser, error: null }
    } catch (error) {
      return { user: null, error: error as Error }
    }
  },

  // Sign out
  async signOut(): Promise<{ error: Error | null }> {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()
      return { error: error as Error | null }
    } catch (error) {
      return { error: error as Error }
    }
  },

  // Get current user
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const supabase = createClient()
      const {
        data: { user: authUser },
        error,
      } = await supabase.auth.getUser()

      if (error || !authUser) {
        return null
      }

      const business = await db.getBusinessById(authUser.id)

      if (!business) {
        return null
      }

      return {
        id: authUser.id,
        email: authUser.email!,
        business,
      }
    } catch (error) {
      return null
    }
  },

  // Get session
  async getSession() {
    const supabase = createClient()
    return await supabase.auth.getSession()
  },
}


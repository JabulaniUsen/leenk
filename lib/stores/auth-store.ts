import { create } from "zustand"
import type { AuthUser } from "../types"
import { storage } from "../storage"

interface AuthState {
  user: AuthUser | null
  loading: boolean
  initialized: boolean
  loadAuth: () => Promise<AuthUser | null>
  setUser: (user: AuthUser | null) => void
  clearAuth: () => Promise<void>
  updateBusiness: (business: AuthUser["business"]) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  initialized: false,
  
  loadAuth: async () => {
    set({ loading: true })
    try {
      const authUser = await storage.getAuth()
      set({ user: authUser, loading: false, initialized: true })
      return authUser
    } catch (error) {
      console.error("Error loading auth:", error)
      set({ user: null, loading: false, initialized: true })
      return null
    }
  },
  
  setUser: (user) => set({ user }),
  
  clearAuth: async () => {
    await storage.clearAuth()
    set({ user: null })
  },
  
  updateBusiness: (business) => {
    set((state) => ({
      user: state.user ? { ...state.user, business } : null,
    }))
  },
}))


import useSWR from "swr"
import { storage } from "../storage"
import type { AuthUser } from "../types"

// Fetcher function for SWR
const authFetcher = async (): Promise<AuthUser | null> => {
  return await storage.getAuth()
}

export function useAuth() {
  const { data, error, isLoading, mutate } = useSWR<AuthUser | null>(
    "auth",
    authFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5000,
      refreshInterval: 10000, // Refresh every 10 seconds to update online status
      // Don't set fallbackData - let it be undefined initially
    }
  )

  return {
    user: data,
    isLoading,
    error,
    mutate, // For manual cache updates
  }
}


import useSWR from "swr"
import { storage } from "../storage"
import type { Conversation } from "../types"

// Fetcher function for SWR
const conversationsFetcher = async (businessId: string): Promise<Conversation[]> => {
  return await storage.getConversationsByBusinessId(businessId)
}

export function useConversations(businessId: string | null | undefined) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<Conversation[]>(
    businessId ? [`conversations`, businessId] : null,
    ([, id]: [string, string]) => conversationsFetcher(id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false, // Disable auto-reconnect to reduce loading
      dedupingInterval: 5000, // Increase deduping to reduce requests
      // SWR v2 keeps previous data by default during revalidation
      // Don't use fallbackData - let it be undefined initially so we can show skeleton
    }
  )

  // isLoading is true on initial load, isValidating is true when revalidating
  // We want to show skeleton if we're loading for the first time (data is undefined)
  // Don't show loading if we have cached data
  const isInitialLoading = isLoading && data === undefined

  return {
    conversations: data || [],
    isLoading: isInitialLoading,
    error,
    mutate, // For manual cache updates
  }
}


import useSWR from "swr"
import { storage } from "../storage"
import type { Conversation } from "../types"

// Fetcher function for SWR
const conversationFetcher = async (conversationId: string): Promise<Conversation | null> => {
  return await storage.getConversationById(conversationId)
}

export function useConversation(conversationId: string | null | undefined) {
  const { data, error, isLoading, mutate } = useSWR<Conversation | null>(
    conversationId ? [`conversation`, conversationId] : null,
    ([, id]: [string, string]) => conversationFetcher(id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false, // Disable auto-reconnect to reduce loading
      dedupingInterval: 5000, // Increase deduping to reduce requests
      // SWR v2 keeps previous data by default during revalidation
      // Don't set fallbackData to null - let it be undefined so we can show skeleton
    }
  )

  return {
    conversation: data,
    isLoading,
    error,
    mutate, // For manual cache updates
  }
}


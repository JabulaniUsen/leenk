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
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
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


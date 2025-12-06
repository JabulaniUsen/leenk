import useSWR from "swr"
import { storage } from "../storage"
import type { Conversation } from "../types"

// Fetcher function for SWR
const conversationsFetcher = async (businessId: string): Promise<Conversation[]> => {
  return await storage.getConversationsByBusinessId(businessId)
}

export function useConversations(businessId: string | null | undefined) {
  const { data, error, isLoading, mutate } = useSWR<Conversation[]>(
    businessId ? [`conversations`, businessId] : null,
    ([, id]: [string, string]) => conversationsFetcher(id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 2000, // Dedupe requests within 2 seconds
      fallbackData: [], // Show empty array immediately
    }
  )

  return {
    conversations: data || [],
    isLoading,
    error,
    mutate, // For manual cache updates
  }
}


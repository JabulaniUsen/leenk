import { useRef } from "react"
import useSWR from "swr"
import { storage } from "../storage"
import type { Conversation } from "../types"

// Fetcher function for SWR
const conversationFetcher = async (conversationId: string): Promise<Conversation | null> => {
  return await storage.getConversationById(conversationId)
}

export function useConversation(conversationId: string | null | undefined) {
  // Keep a ref to preserve data across key changes
  const previousDataRef = useRef<Conversation | null>(null)
  
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

  // Update ref when we have new data
  if (data !== undefined && data !== null) {
    previousDataRef.current = data
  }

  // Use current data or previous data to prevent "not found" when navigating or after sending messages
  // Only use previous data if we have a valid conversationId (don't show stale data for different conversations)
  const conversation = data ?? (conversationId && previousDataRef.current?.id === conversationId ? previousDataRef.current : null)

  // Wrap mutate to prevent clearing data when undefined is passed
  const safeMutate = (updater?: any, options?: any) => {
    if (updater === undefined && options?.revalidate === false) {
      // Don't mutate if undefined is passed with revalidate: false
      // This prevents clearing the cache
      return Promise.resolve(conversation)
    }
    return mutate(updater, options)
  }

  return {
    conversation,
    isLoading: isLoading && conversation === null && previousDataRef.current === null,
    error,
    mutate: safeMutate, // Wrapped mutate to prevent clearing
  }
}


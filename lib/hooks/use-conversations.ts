import { useRef } from "react"
import useSWR from "swr"
import { storage } from "../storage"
import type { Conversation } from "../types"

// Fetcher function for SWR
const conversationsFetcher = async (businessId: string): Promise<Conversation[]> => {
  return await storage.getConversationsByBusinessId(businessId)
}

export function useConversations(businessId: string | null | undefined) {
  // Keep a ref to preserve data across key changes
  const previousDataRef = useRef<Conversation[]>([])
  
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

  // Update ref when we have new data
  if (data !== undefined) {
    previousDataRef.current = data
  }

  // Use current data or previous data to prevent empty list when navigating
  const conversations = data ?? previousDataRef.current

  // isLoading is true on initial load, isValidating is true when revalidating
  // We want to show skeleton if we're loading for the first time (data is undefined and no previous data)
  const isInitialLoading = isLoading && data === undefined && previousDataRef.current.length === 0

  // Wrap mutate to prevent clearing data when undefined is passed
  const safeMutate = (updater?: any, options?: any) => {
    if (updater === undefined && options?.revalidate === false) {
      // Don't mutate if undefined is passed with revalidate: false
      // This prevents clearing the cache
      return Promise.resolve(conversations)
    }
    return mutate(updater, options)
  }

  return {
    conversations,
    isLoading: isInitialLoading,
    error,
    mutate: safeMutate, // Wrapped mutate to prevent clearing
  }
}


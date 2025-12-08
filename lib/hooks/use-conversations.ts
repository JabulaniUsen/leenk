import { useRef, useEffect } from "react"
import useSWR from "swr"
import { storage } from "../storage"
import type { Conversation } from "../types"

// Delta syncing: Store last conversation timestamp in localStorage
const LAST_CONVERSATIONS_TIMESTAMP_KEY = "last_conversations_timestamp"

function getLastConversationsTimestamp(businessId: string): string | undefined {
  if (typeof window === "undefined") return undefined
  const key = `${LAST_CONVERSATIONS_TIMESTAMP_KEY}_${businessId}`
  return localStorage.getItem(key) || undefined
}

function setLastConversationsTimestamp(businessId: string, timestamp: string): void {
  if (typeof window === "undefined") return
  const key = `${LAST_CONVERSATIONS_TIMESTAMP_KEY}_${businessId}`
  localStorage.setItem(key, timestamp)
}

// Fetcher function for SWR with delta syncing
const conversationsFetcher = async (
  businessId: string,
  isInitialLoad: boolean
): Promise<Conversation[]> => {
  // On initial load, fetch all conversations
  // On subsequent loads, only fetch conversations updated after last timestamp
  const afterTimestamp = isInitialLoad ? undefined : getLastConversationsTimestamp(businessId)
  const conversations = await storage.getConversationsByBusinessId(businessId, afterTimestamp)
  
  // Update timestamp to the most recent conversation's updated_at
  if (conversations.length > 0) {
    const mostRecent = conversations.reduce((latest, conv) => 
      new Date(conv.lastMessageAt) > new Date(latest.lastMessageAt) ? conv : latest
    )
    setLastConversationsTimestamp(businessId, mostRecent.lastMessageAt)
  }
  
  return conversations
}

export function useConversations(businessId: string | null | undefined) {
  // Keep a ref to preserve data across key changes
  const previousDataRef = useRef<Conversation[]>([])
  const isInitialLoadRef = useRef<boolean>(true)
  
  // Track if this is the first load for delta syncing
  const isInitialLoad = isInitialLoadRef.current
  
  const { data, error, isLoading, isValidating, mutate } = useSWR<Conversation[]>(
    businessId ? [`conversations`, businessId, isInitialLoad] : null,
    ([, id, initial]: [string, string, boolean]) => conversationsFetcher(id, initial),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false, // Disable auto-reconnect - rely on realtime
      dedupingInterval: 10000, // Increase deduping to reduce requests
      // After initial load, only fetch deltas via realtime updates
      revalidateIfStale: false, // Don't revalidate stale data automatically
    }
  )

  // Mark initial load as complete after first successful fetch
  useEffect(() => {
    if (data !== undefined && isInitialLoadRef.current) {
      isInitialLoadRef.current = false
    }
  }, [data])

  // Update ref when we have new data
  if (data !== undefined) {
    if (isInitialLoad) {
      // On initial load, replace all conversations
      previousDataRef.current = data
    } else {
      // On delta updates, merge: update existing conversations and add new ones
      const existingMap = new Map(previousDataRef.current.map(c => [c.id, c]))
      
      // Update existing conversations or add new ones
      data.forEach(conv => {
        existingMap.set(conv.id, conv)
      })
      
      // Convert back to array and sort by lastMessageAt
      const merged = Array.from(existingMap.values())
        .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime())
      
      previousDataRef.current = merged
    }
  }

  // Use current data or previous data to prevent empty list when navigating
  const conversations = data ?? previousDataRef.current

  // isLoading is true on initial load only
  const isInitialLoading = isLoading && data === undefined && previousDataRef.current.length === 0

  // Wrap mutate to handle realtime updates
  const safeMutate = (updater?: any, options?: any) => {
    if (updater === undefined && options?.revalidate === false) {
      // Don't mutate if undefined is passed with revalidate: false
      return Promise.resolve(conversations)
    }
    // If updater is a function, it's a realtime update - merge with existing
    if (typeof updater === "function") {
      return mutate((current: Conversation[] | undefined) => {
        const updated = updater(current ?? previousDataRef.current)
        previousDataRef.current = updated
        return updated
      }, options)
    }
    return mutate(updater, options)
  }

  return {
    conversations,
    isLoading: isInitialLoading,
    error,
    mutate: safeMutate, // Wrapped mutate to handle realtime updates
  }
}


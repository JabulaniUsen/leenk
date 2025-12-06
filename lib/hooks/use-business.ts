import useSWR from "swr"
import { storage } from "../storage"
import type { Business } from "../types"

// Fetcher function for SWR
const businessFetcher = async (key: string): Promise<Business | null> => {
  if (key.startsWith("phone:")) {
    const phone = key.replace("phone:", "")
    return await storage.getBusinessByPhone(phone)
  }
  if (key.startsWith("id:")) {
    const id = key.replace("id:", "")
    return await storage.getBusinessById(id)
  }
  return null
}

export function useBusinessByPhone(phone: string | null | undefined) {
  const { data, error, isLoading, mutate } = useSWR<Business | null>(
    phone ? `phone:${phone}` : null,
    businessFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 10000, // Cache for 10 seconds
      refreshInterval: 5000, // Refresh every 5 seconds to update online status
    }
  )

  return {
    business: data,
    isLoading,
    error,
    mutate,
  }
}

export function useBusinessById(id: string | null | undefined) {
  const { data, error, isLoading, mutate } = useSWR<Business | null>(
    id ? `id:${id}` : null,
    businessFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 10000, // Cache for 10 seconds
    }
  )

  return {
    business: data,
    isLoading,
    error,
    mutate,
  }
}


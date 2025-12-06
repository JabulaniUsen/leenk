"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ConversationList } from "@/components/conversation-list"
import { motion } from "framer-motion"
import Link from "next/link"
import { LogOut, Settings } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar } from "@/components/avatar"
import { ConversationSkeleton } from "@/components/conversation-skeleton"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/lib/hooks/use-auth"
import { useConversations } from "@/lib/hooks/use-conversations"
import { useRealtime } from "@/lib/hooks/use-realtime"
import { createClient } from "@/lib/supabase/client"
import { storage } from "@/lib/storage"
import Image from "next/image"
import type { Business } from "@/lib/types"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading: authLoading, mutate: mutateAuth } = useAuth()
  const { conversations, isLoading: conversationsLoading, mutate: mutateConversations } = useConversations(user?.id)
  const { setupBusinessChannel } = useRealtime()

  // Helper function to check if onboarding is complete
  const isOnboardingComplete = (business: Business | undefined): boolean => {
    if (!business) return false
    return !!(business.businessName && business.phone && business.address)
  }

  // Handle auth redirects
  useEffect(() => {
    if (!authLoading && !user) {
          router.push("/login")
    } else if (!authLoading && user && !isOnboardingComplete(user.business)) {
          router.push("/onboarding")
    }
  }, [authLoading, user, router])

  // Set business as online when dashboard loads
  useEffect(() => {
    if (user?.business?.id) {
      // Always set as online when dashboard is active
      storage.updateBusiness(user.business.id, { online: true }).then(() => {
        // Refresh auth to get updated online status
        mutateAuth()
      }).catch((error) => {
        console.error("Failed to update online status:", error)
      })
    }

    // Set as offline when page unloads (user closes tab/navigates away)
    const handleBeforeUnload = () => {
      if (user?.business?.id) {
        // Use sendBeacon for reliable offline status update even if page is closing
        const blob = new Blob([JSON.stringify({ businessId: user.business.id, online: false })], {
          type: 'application/json'
        })
        navigator.sendBeacon('/api/update-online-status', blob)
    }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      // Also set offline when component unmounts (navigation)
      if (user?.business?.id) {
        storage.updateBusiness(user.business.id, { online: false }).catch(console.error)
      }
    }
  }, [user?.business?.id, mutateAuth])

  // Set up real-time WebSocket subscription for conversation updates
  useEffect(() => {
    if (!user?.id) return

    // Use SWR mutate to update cache when realtime events occur
    const refreshConversations = () => {
      mutateConversations() // SWR will re-fetch and update cache
    }

    const cleanup = setupBusinessChannel(user.id, refreshConversations)
    return cleanup
  }, [user?.id, setupBusinessChannel, mutateConversations])

  // Set up real-time subscription for business online status updates
  useEffect(() => {
    if (!user?.business?.id) return

    const supabase = createClient()
    const channel = supabase
      .channel(`business-status:${user.business.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "businesses",
          filter: `id=eq.${user.business.id}`,
        },
        (payload) => {
          // Update auth user data when online status changes
          const updatedBusiness = payload.new as any
          if (updatedBusiness && user) {
            mutateAuth(
              {
                ...user,
                business: {
                  ...user.business!,
                  online: updatedBusiness.online ?? false,
                },
              },
              false
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user?.business?.id, user, mutateAuth])

  const handleLogout = async () => {
    // Set business as offline before logging out
    if (user?.business?.id) {
      try {
        await storage.updateBusiness(user.business.id, { online: false })
      } catch (error) {
        console.error("Failed to update online status:", error)
      }
    }
    await storage.clearAuth()
    mutateAuth(null, false) // Clear auth cache
    router.push("/")
  }

  // Render UI immediately - show skeleton for loading parts
  // This makes the app feel instant even while data loads

  return (
    <main className="h-screen flex flex-col md:flex-row bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)]">
      {/* Sidebar - Render immediately */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-80 border-r border-[#313d45] md:border-border flex flex-col bg-[#111b21] md:bg-card"
      >
        {/* Header - Render immediately, show skeleton if user not loaded */}
        <div className="p-3 md:p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <Image src="/logo.png" alt="Leenk" width={80} height={80} className="object-contain" />
            <div className="flex gap-1 md:gap-2">
              <ThemeToggle />
              <Link href="/dashboard/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {authLoading ? (
            <div className="flex items-center gap-3 text-sm">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ) : user ? (
          <div className="flex items-center gap-3 text-sm">
              <Avatar 
                src={user.business?.businessLogo} 
                name={user.business?.businessName} 
                size="md"
              />
            <div>
              <p className="font-medium text-foreground">{user.business?.businessName}</p>
              <p className="text-muted-foreground text-xs">{user.email}</p>
            </div>
          </div>
          ) : null}
        </div>

        {/* Conversations List - Render immediately, show skeleton while loading */}
        <div className="flex-1 overflow-y-auto bg-background">
          {conversationsLoading ? (
            <ConversationSkeleton />
          ) : (
            <ConversationList conversations={conversations} />
          )}
        </div>
      </motion.aside>

      {/* Main Content - Render immediately */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden md:flex flex-1 items-center justify-center p-4"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Select a Conversation</h2>
          <p className="text-muted-foreground">Click on a conversation to start chatting with your customers</p>
        </div>
      </motion.div>
    </main>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ConversationList } from "@/components/conversation-list"
import { motion } from "framer-motion"
import Link from "next/link"
import { FaBars } from "react-icons/fa"
import { NavDrawer } from "@/components/nav-drawer"
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
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

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

  // Business is always online - no need to update status

  // Set up real-time WebSocket subscription for conversation updates
  useEffect(() => {
    if (!user?.id) return

    // Use SWR mutate to update cache when realtime events occur
    const refreshConversations = () => {
      // Revalidate to ensure unread counts are updated in real-time
      mutateConversations(undefined, { revalidate: true })
    }

    const cleanup = setupBusinessChannel(user.id, refreshConversations)
    return cleanup
  }, [user?.id, setupBusinessChannel, mutateConversations])

  // Business is always online - no real-time status updates needed


  const handlePin = async (conversationId: string, pinned: boolean) => {
    try {
      await storage.updateConversation(conversationId, { pinned })
      // Refresh conversations list to show updated pin status
      mutateConversations(undefined, { revalidate: true })
    } catch (error) {
      console.error("Failed to pin/unpin conversation:", error)
      alert("Failed to update conversation. Please try again.")
    }
  }

  const handleDelete = async (conversationId: string) => {
    try {
      await storage.deleteConversation(conversationId)
      // Refresh conversations list to remove deleted conversation
      mutateConversations(undefined, { revalidate: true })
      // If we're viewing the deleted conversation, redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Failed to delete conversation:", error)
      alert("Failed to delete conversation. Please try again.")
    }
  }

  // Render UI immediately - show skeleton for loading parts
  // This makes the app feel instant even while data loads

  return (
    <main className="h-screen max-w-3xl mx-auto flex flex-col bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)]">
      {/* Sidebar - Always full screen (mobile view) */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full border-r border-[#313d45] flex flex-col bg-[#111b21] relative z-10"
      >
        {/* Header - Render immediately, show skeleton if user not loaded */}
        <div className="p-3 border-b border-border bg-card">
          <div className="flex items-center justify-between mb-3">
            <Image src="/logo.png" alt="Leenk" width={80} height={80} className="object-contain" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsNavOpen(true)}
              aria-label="Open menu"
            >
              <FaBars className="w-5 h-5" />
            </Button>
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
            <ConversationList 
              conversations={conversations || []} 
              onPin={handlePin}
              onDelete={handleDelete}
            />
          )}
        </div>
      </motion.aside>

      {/* Navigation Drawer */}
      <NavDrawer
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </main>
  )
}

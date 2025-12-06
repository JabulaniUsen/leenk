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
import { useAuthStore } from "@/lib/stores/auth-store"
import { useConversationsStore } from "@/lib/stores/conversations-store"
import { useRealtimeStore } from "@/lib/stores/realtime-store"
import Image from "next/image"
import type { Business } from "@/lib/types"

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading, loadAuth, clearAuth, initialized } = useAuthStore()
  const { conversations, loading: conversationsLoading, loadConversations } = useConversationsStore()
  const { setupBusinessChannel } = useRealtimeStore()

  // Helper function to check if onboarding is complete
  const isOnboardingComplete = (business: Business | undefined): boolean => {
    if (!business) return false
    return !!(business.businessName && business.phone && business.address)
  }

  useEffect(() => {
    if (!initialized) {
      loadAuth().then((authUser) => {
        if (!authUser) {
          router.push("/login")
        } else if (!isOnboardingComplete(authUser.business)) {
          // Redirect to onboarding if profile is incomplete
          router.push("/onboarding")
        } else if (authUser.business) {
          loadConversations(authUser.id)
        }
      })
      return
    }
    
    if (!user) {
      router.push("/login")
      return
    }

    // Check if onboarding is complete
    if (!isOnboardingComplete(user.business)) {
      router.push("/onboarding")
      return
    }

    // Only load conversations if we don't have any yet
    if (user.business && conversations.length === 0 && !conversationsLoading) {
      loadConversations(user.id)
    }
  }, [initialized, loadAuth, loadConversations, router, user, conversations.length, conversationsLoading])

  // Set up real-time WebSocket subscription for conversation updates
  useEffect(() => {
    if (!user?.id) return

    const cleanup = setupBusinessChannel(user.id)
    return cleanup
  }, [user?.id, setupBusinessChannel])

  const handleLogout = async () => {
    await clearAuth()
    router.push("/")
  }

  const loading = authLoading || conversationsLoading

  if (!initialized || authLoading) return null
  if (!user) return null

  return (
    <main className="h-screen flex flex-col md:flex-row bg-[var(--chat-bg)] dark:bg-[var(--chat-bg)]">
      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-80 border-r border-[#313d45] md:border-border flex flex-col bg-[#111b21] md:bg-card"
      >
        {/* Header */}
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
          <div className="flex items-center gap-3 text-sm">
            <Avatar src={user.business?.businessLogo} name={user.business?.businessName} size="md" />
            <div>
              <p className="font-medium text-foreground">{user.business?.businessName}</p>
              <p className="text-muted-foreground text-xs">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto bg-background">
          {loading ? (
            <ConversationSkeleton />
          ) : (
            <ConversationList conversations={conversations} />
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
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

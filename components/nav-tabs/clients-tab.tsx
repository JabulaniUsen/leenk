"use client"

import { memo } from "react"
import { useAuth } from "@/lib/hooks/use-auth"
import { useConversations } from "@/lib/hooks/use-conversations"
import { Avatar } from "@/components/avatar"
import { ConversationSkeleton } from "@/components/conversation-skeleton"
import { FaUser, FaEnvelope, FaClock } from "react-icons/fa"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { useRouter } from "next/navigation"

function ClientsTabComponent() {
  const { user } = useAuth()
  const { conversations, isLoading } = useConversations(user?.id)
  const router = useRouter()

  const handleClientClick = (conversationId: string) => {
    router.push(`/dashboard/${conversationId}`)
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Clients</h2>
          <p className="text-sm text-muted-foreground">All your chat conversations</p>
        </div>
        <ConversationSkeleton />
      </div>
    )
  }

  if (conversations.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Clients</h2>
          <p className="text-sm text-muted-foreground">All your chat conversations</p>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FaUser className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No clients yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Start a conversation to see clients here
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-4 overflow-y-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Clients</h2>
        <p className="text-sm text-muted-foreground">
          {conversations.length} {conversations.length === 1 ? "client" : "clients"}
        </p>
      </div>

      <div className="space-y-2">
        {conversations.map((conversation) => {
          const lastMessage = conversation.messages[conversation.messages.length - 1]
          const unreadCount = conversation.messages.filter(
            (m) => m.senderType === "customer" && m.status !== "read"
          ).length

          return (
            <button
              key={conversation.id}
              onClick={() => handleClientClick(conversation.id)}
              className="w-full p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors text-left"
            >
              <div className="flex items-start gap-3">
                <Avatar
                  name={conversation.customerName || conversation.customerEmail}
                  size="md"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground truncate">
                      {conversation.customerName || conversation.customerEmail}
                    </h3>
                    {unreadCount > 0 && (
                      <span className="ml-2 bg-primary text-primary-foreground text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <FaEnvelope className="w-3 h-3" />
                    <span className="truncate">{conversation.customerEmail}</span>
                  </div>
                  {lastMessage && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <FaClock className="w-3 h-3" />
                      <span>
                        {formatDistanceToNow(new Date(conversation.lastMessageAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Memoize to prevent unnecessary re-renders
export const ClientsTab = memo(ClientsTabComponent)


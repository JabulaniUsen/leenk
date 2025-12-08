"use client"

import type { Conversation, Message } from "@/lib/types"
import { motion } from "framer-motion"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Avatar } from "@/components/avatar"
import { FaThumbtack, FaTrash } from "react-icons/fa"
import { useState, memo } from "react"

interface ConversationListProps {
  conversations: Conversation[]
  selectedId?: string
  onPin?: (conversationId: string, pinned: boolean) => void
  onDelete?: (conversationId: string) => void
}

// Calculate unread message count for a conversation
// Use unreadCount if available (from optimized query), otherwise calculate from messages
function getUnreadCount(conversation: Conversation): number {
  // Use pre-calculated unreadCount if available (from optimized database query)
  if (conversation.unreadCount !== undefined) {
    return conversation.unreadCount
  }
  // Fallback: calculate from messages (for backwards compatibility)
  return conversation.messages.filter(
    (msg: Message) => 
      msg.senderType === "customer" && 
      msg.status !== "read"
  ).length
}

export const ConversationList = memo(function ConversationList({ conversations, selectedId, onPin, onDelete }: ConversationListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const sorted = [...conversations].sort((a, b) => {
    // Sort by: pinned first, then unread conversations, then by last message time
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    
    const aUnread = getUnreadCount(a)
    const bUnread = getUnreadCount(b)
    
    if (aUnread > 0 && bUnread === 0) return -1
    if (aUnread === 0 && bUnread > 0) return 1
    
    return new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
  })

  const handlePin = (e: React.MouseEvent, conversationId: string, currentPinned: boolean) => {
    e.preventDefault()
    e.stopPropagation()
    if (onPin) {
      onPin(conversationId, !currentPinned)
    }
  }

  const handleDelete = async (e: React.MouseEvent, conversationId: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (window.confirm("Are you sure you want to delete this conversation? This action cannot be undone.")) {
      setDeletingId(conversationId)
      if (onDelete) {
        try {
          await onDelete(conversationId)
        } finally {
          setDeletingId(null)
        }
      }
    }
  }

  return (
    <motion.div className="flex flex-col overflow-y-auto">
      {sorted.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground p-4 text-center">
          <p>No conversations yet. Start a new chat to begin.</p>
        </div>
      ) : (
        sorted.map((conv, index) => {
          const unreadCount = getUnreadCount(conv)
          const hasUnread = unreadCount > 0
          const lastMessage = conv.messages[conv.messages.length - 1]
          
          return (
          <motion.div
            key={conv.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onMouseEnter={() => setHoveredId(conv.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative"
          >
            <Link href={`/dashboard/${conv.id}`}>
              <div
                className={`p-3 md:p-4 border-b border-border hover:bg-secondary transition-colors cursor-pointer active:bg-secondary/50 ${
                  selectedId === conv.id ? "bg-secondary" : ""
                  } ${
                    hasUnread ? "bg-primary/10 hover:bg-primary/20 border-l-4 border-l-primary" : ""
                } ${conv.pinned ? "bg-primary/5" : ""}`}
              >
                <div className="flex gap-3 items-start">
                  <div className="relative">
                  <Avatar name={conv.customerName || conv.customerEmail} size="md" />
                    {conv.pinned && (
                      <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                        <FaThumbtack className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-1 flex-1 min-w-0">
                          {conv.pinned && (
                            <FaThumbtack className="w-3 h-3 text-primary flex-shrink-0" />
                          )}
                          <p className={`font-medium truncate ${hasUnread ? "font-semibold text-foreground" : "text-foreground"}`}>
                            {conv.customerName || conv.customerEmail}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          {hasUnread && (
                            <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                              {unreadCount > 99 ? "99+" : unreadCount}
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(conv.lastMessageAt), { addSuffix: true })}
                      </span>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mb-1">{conv.customerEmail}</p>
                      <p className={`text-sm truncate ${hasUnread ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                        {lastMessage?.text || (lastMessage?.imageUrl ? "📷 Image" : "No messages")}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Action buttons - show on hover */}
            {hoveredId === conv.id && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-background/95 backdrop-blur-sm rounded-lg p-1 shadow-lg border border-border">
                <button
                  onClick={(e) => handlePin(e, conv.id, conv.pinned || false)}
                  className="p-1.5 hover:bg-secondary rounded transition-colors"
                  title={conv.pinned ? "Unpin conversation" : "Pin conversation"}
                >
                  <FaThumbtack className={`w-4 h-4 text-muted-foreground ${conv.pinned ? "opacity-50" : ""}`} />
                </button>
                <button
                  onClick={(e) => handleDelete(e, conv.id)}
                  disabled={deletingId === conv.id}
                  className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded transition-colors disabled:opacity-50"
                  title="Delete conversation"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
          )
        })
      )}
    </motion.div>
  )
})

"use client"

import type { Conversation, Message } from "@/lib/types"
import { motion } from "framer-motion"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Avatar } from "@/components/avatar"

interface ConversationListProps {
  conversations: Conversation[]
  selectedId?: string
}

// Calculate unread message count for a conversation
// Unread = messages from customer that are not "read"
function getUnreadCount(conversation: Conversation): number {
  return conversation.messages.filter(
    (msg: Message) => 
      msg.senderType === "customer" && 
      msg.status !== "read"
  ).length
}

export function ConversationList({ conversations, selectedId }: ConversationListProps) {
  const sorted = [...conversations].sort((a, b) => {
    // Sort by: unread conversations first, then by last message time
    const aUnread = getUnreadCount(a)
    const bUnread = getUnreadCount(b)
    
    if (aUnread > 0 && bUnread === 0) return -1
    if (aUnread === 0 && bUnread > 0) return 1
    
    return new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
  })

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
          >
            <Link href={`/dashboard/${conv.id}`}>
              <div
                className={`p-3 md:p-4 border-b border-border hover:bg-secondary transition-colors cursor-pointer active:bg-secondary/50 ${
                  selectedId === conv.id ? "bg-secondary" : ""
                  } ${
                    hasUnread ? "bg-primary/10 hover:bg-primary/20 border-l-4 border-l-primary" : ""
                }`}
              >
                <div className="flex gap-3 items-start">
                  <Avatar name={conv.customerName || conv.customerEmail} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                        <p className={`font-medium truncate ${hasUnread ? "font-semibold text-foreground" : "text-foreground"}`}>
                          {conv.customerName || conv.customerEmail}
                        </p>
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
          </motion.div>
          )
        })
      )}
    </motion.div>
  )
}

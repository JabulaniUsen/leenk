"use client"

import type { Conversation } from "@/lib/types"
import { motion } from "framer-motion"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Avatar } from "@/components/avatar"

interface ConversationListProps {
  conversations: Conversation[]
  selectedId?: string
}

export function ConversationList({ conversations, selectedId }: ConversationListProps) {
  const sorted = [...conversations].sort(
    (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime(),
  )

  return (
    <motion.div className="flex flex-col overflow-y-auto">
      {sorted.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground p-4 text-center">
          <p>No conversations yet. Start a new chat to begin.</p>
        </div>
      ) : (
        sorted.map((conv, index) => (
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
                }`}
              >
                <div className="flex gap-3 items-start">
                  <Avatar name={conv.customerName || conv.customerEmail} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-foreground truncate">{conv.customerName || conv.customerEmail}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {formatDistanceToNow(new Date(conv.lastMessageAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mb-1">{conv.customerEmail}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.messages[conv.messages.length - 1]?.text || "No messages"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))
      )}
    </motion.div>
  )
}

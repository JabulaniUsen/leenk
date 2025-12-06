"use client"

import type { Message } from "@/lib/types"
import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle2, CircleCheck,  } from "lucide-react"

interface ChatBubbleProps {
  message: Message
  isOwn: boolean
  index: number
}

export function ChatBubble({ message, isOwn, index }: ChatBubbleProps) {
  const getStatusIcon = () => {
    if (!isOwn) return null

    switch (message.status) {
      case "sent":
        return <CircleCheck className="w-3 h-3 opacity-70" />
      case "delivered":
        return <CheckCircle2 className="w-3.5 h-3.5 opacity-70" />
      case "read":
        return <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
      default:
        return <CircleCheck className="w-3 h-3 opacity-70" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-3`}
    >
      <div
        className={`max-w-[80%] md:max-w-md lg:max-w-lg px-3 md:px-4 py-2 rounded-lg ${
          isOwn
            ? "bg-[var(--chat-sent)] text-[var(--chat-sent-text)] rounded-br-none ml-auto dark:bg-[var(--chat-sent)] dark:text-[var(--chat-sent-text)]"
            : "bg-[var(--chat-received)] text-[var(--chat-received-text)] rounded-bl-none dark:bg-[var(--chat-received)] dark:text-[var(--chat-received-text)]"
        }`}
      >
        {message.text && <p className="text-sm md:text-base break-words">{message.text}</p>}
        {message.imageUrl && (
          <div className="relative w-48 h-48 rounded-lg overflow-hidden mb-2">
            <Image src={message.imageUrl || "/placeholder.svg"} alt="Chat image" fill className="object-cover" />
          </div>
        )}
        <div className="flex items-center gap-1.5 mt-1 justify-end">
          <p className={`text-xs opacity-70`}>
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {getStatusIcon()}
        </div>
      </div>
    </motion.div>
  )
}

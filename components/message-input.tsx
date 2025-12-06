"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface MessageInputProps {
  onSendMessage: (text: string) => void
  onSendImage: (imageUrl: string) => void
  onTyping?: () => void
  disabled?: boolean
}

export function MessageInput({ onSendMessage, onSendImage, onTyping, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    if (onTyping && e.target.value.trim()) {
      onTyping()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        onSendImage(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-2 md:p-4 flex gap-2"
    >
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        className="p-2 hover:bg-secondary rounded-lg transition-colors disabled:opacity-50 text-muted-foreground"
        aria-label="Upload image"
      >
        <ImageIcon className="w-5 h-5" />
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
      <textarea
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={disabled}
        className="flex-1 bg-input border border-border rounded-lg px-3 md:px-4 py-2 md:py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 text-foreground placeholder:text-muted-foreground text-sm md:text-base"
        rows={1}
      />
      <Button 
        onClick={handleSend} 
        disabled={!message.trim() || disabled} 
        size="sm" 
        className="self-end bg-primary hover:opacity-90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed rounded-full aspect-square p-2.5"
      >
        <ArrowRight className="w-4 h-4" />
      </Button>
    </motion.div>
  )
}

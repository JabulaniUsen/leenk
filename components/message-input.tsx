"use client"

import type React from "react"
import type { Message } from "@/lib/types"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FaImage, FaArrowRight, FaTimes } from "react-icons/fa"
import { motion } from "framer-motion"
import { ImagePreviewModal } from "@/components/image-preview-modal"

interface MessageInputProps {
  onSendMessage: (text: string, replyToId?: string) => void
  onSendImage: (imageUrl: string, replyToId?: string) => void
  onTyping?: () => void
  disabled?: boolean
  replyTo?: Message | null
  onCancelReply?: () => void
  editingMessage?: Message | null
  onCancelEdit?: () => void
}

export function MessageInput({ 
  onSendMessage, 
  onSendImage, 
  onTyping, 
  disabled,
  replyTo,
  onCancelReply,
  editingMessage,
  onCancelEdit
}: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [previewFile, setPreviewFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-focus input when reply is selected
  useEffect(() => {
    if (replyTo && textareaRef.current) {
      // Small delay to ensure the reply preview is rendered
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 100)
    }
  }, [replyTo])

  // Set message text when editing
  useEffect(() => {
    if (editingMessage?.text && textareaRef.current) {
      setMessage(editingMessage.text)
      // Small delay to ensure the edit preview is rendered
      setTimeout(() => {
        textareaRef.current?.focus()
        // Move cursor to end
        textareaRef.current?.setSelectionRange(
          editingMessage.text.length,
          editingMessage.text.length
        )
      }, 100)
    } else if (!editingMessage) {
      // Clear message when not editing
      setMessage("")
    }
  }, [editingMessage])

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
      onSendMessage(message, replyTo?.id)
      setMessage("")
      if (onCancelReply) {
        onCancelReply()
      }
      if (onCancelEdit) {
        onCancelEdit()
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    // If user clears the input while editing, cancel edit mode
    if (editingMessage && !e.target.value.trim() && onCancelEdit) {
      onCancelEdit()
    }
    if (onTyping && e.target.value.trim()) {
      onTyping()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Allow Enter for new lines, Shift+Enter also works
    // Removed auto-send on Enter key
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("Image size must be less than 10MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setPreviewImage(imageUrl) // Show preview instead of sending immediately
        setPreviewFile(file) // Store the file for upload
      }
      reader.readAsDataURL(file)
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSendPreview = () => {
    if (previewImage) {
      onSendImage(previewImage)
      setPreviewImage(null)
    }
  }

  const handleRemovePreview = () => {
    setPreviewImage(null)
    setPreviewFile(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-2 md:p-4 flex flex-col gap-2"
    >
      {/* Edit Message Preview */}
      {editingMessage && (
        <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-lg border-l-4 border-l-yellow-500">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-yellow-600 dark:text-yellow-400 mb-1">
              Editing message
            </p>
            {editingMessage.text && (
              <p className="text-xs text-muted-foreground truncate line-through opacity-70">
                {editingMessage.text}
              </p>
            )}
          </div>
          {onCancelEdit && (
            <button
              onClick={onCancelEdit}
              className="p-1 hover:bg-secondary-foreground/10 rounded-full transition-colors"
              aria-label="Cancel edit"
            >
              <FaTimes className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      )}

      {/* Reply Preview */}
      {replyTo && !editingMessage && (
        <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg border-l-4 border-l-primary">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-primary mb-1">
              Replying to {replyTo.senderType === "business" ? "Business" : "You"}
            </p>
            {replyTo.text && (
              <p className="text-xs text-muted-foreground truncate">{replyTo.text}</p>
            )}
            {replyTo.imageUrl && (
              <p className="text-xs text-muted-foreground">📷 Image</p>
            )}
          </div>
          {onCancelReply && (
            <button
              onClick={onCancelReply}
              className="p-1 hover:bg-secondary-foreground/10 rounded-full transition-colors"
              aria-label="Cancel reply"
            >
              <FaTimes className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      )}

      <div className="flex gap-2">
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        className="p-2 hover:bg-secondary rounded-lg transition-colors disabled:opacity-50 text-muted-foreground"
        aria-label="Upload image"
      >
        <FaImage className="w-5 h-5" />
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
      <textarea
          ref={textareaRef}
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
        <FaArrowRight className="w-4 h-4" />
      </Button>
      </div>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        imageUrl={previewImage}
        onClose={handleRemovePreview}
        onSend={(annotatedImageUrl) => {
          // Use annotated image if provided, otherwise use original preview
          if (annotatedImageUrl) {
            setPreviewImage(annotatedImageUrl)
            onSendImage(annotatedImageUrl, replyTo?.id)
            setPreviewImage(null)
            setPreviewFile(null)
            if (onCancelReply) {
              onCancelReply()
            }
          } else {
            handleSendPreview()
          }
        }}
        onRemove={handleRemovePreview}
        isSending={disabled}
      />
    </motion.div>
  )
}

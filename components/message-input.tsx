"use client"

import type React from "react"
import type { Message } from "@/lib/types"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FaImage, FaArrowRight, FaTimes, FaSpinner } from "react-icons/fa"
import { motion } from "framer-motion"
import { ImagePreviewModal } from "@/components/image-preview-modal"
import { compressImage, blobToDataURL } from "@/lib/image-compression"

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
  const [isCompressing, setIsCompressing] = useState(false)
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [messageSent, setMessageSent] = useState(false)
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
    if (message.trim() && !disabled) {
      // Call the send handler
      onSendMessage(message, replyTo?.id)
      
      // Clear message and state
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
  
  // Track sending state based on disabled prop
  useEffect(() => {
    if (disabled) {
      setIsSendingMessage(true)
      setMessageSent(false)
    } else if (isSendingMessage) {
      // Message was sent, show confirmation
      setIsSendingMessage(false)
      setMessageSent(true)
      setTimeout(() => {
        setMessageSent(false)
      }, 2000) // Show for 2 seconds
    }
  }, [disabled, isSendingMessage])

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

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }

      // Validate file size (max 10MB before compression)
      if (file.size > 10 * 1024 * 1024) {
        alert("Image size must be less than 10MB")
        return
      }

      setIsCompressing(true)

      try {
        // Compress the image
        const compressedBlob = await compressImage(file)

        // Convert compressed blob to data URL for preview
        const imageUrl = await blobToDataURL(compressedBlob)
        setPreviewImage(imageUrl)
        
        // Store the compressed blob as a File for potential upload
        const compressedFile = new File([compressedBlob], file.name, {
          type: "image/jpeg",
          lastModified: Date.now(),
        })
        setPreviewFile(compressedFile)
      } catch (error) {
        console.error("Error compressing image:", error)
        // Fallback to original file if compression fails
        const reader = new FileReader()
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string
          setPreviewImage(imageUrl)
          setPreviewFile(file)
        }
        reader.readAsDataURL(file)
      } finally {
        setIsCompressing(false)
      }
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

      {isCompressing && (
        <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
          <FaSpinner className="w-4 h-4 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground">Compressing image...</p>
        </div>
      )}
      {isSendingMessage && (
        <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 dark:bg-primary/20 rounded-lg border-l-4 border-l-primary">
          <FaSpinner className="w-4 h-4 animate-spin text-primary" />
          <p className="text-xs text-primary">Sending message...</p>
        </div>
      )}
      {messageSent && !isSendingMessage && (
        <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 dark:bg-green-500/20 rounded-lg border-l-4 border-l-green-500">
          <FaArrowRight className="w-4 h-4 text-green-600 dark:text-green-400" />
          <p className="text-xs text-green-600 dark:text-green-400">Message sent!</p>
        </div>
      )}
      <div className="flex gap-2">
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled || isCompressing}
        className="p-2 hover:bg-secondary rounded-lg transition-colors disabled:opacity-50 text-muted-foreground"
        aria-label="Upload image"
      >
        {isCompressing ? (
          <FaSpinner className="w-5 h-5 animate-spin" />
        ) : (
          <FaImage className="w-5 h-5" />
        )}
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
        disabled={!message.trim() || disabled || isSendingMessage} 
        size="sm" 
        className="self-end bg-primary hover:opacity-90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed rounded-full aspect-square p-2.5"
      >
        {isSendingMessage ? (
          <FaSpinner className="w-4 h-4 animate-spin" />
        ) : messageSent ? (
          <FaArrowRight className="w-4 h-4" />
        ) : (
          <FaArrowRight className="w-4 h-4" />
        )}
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

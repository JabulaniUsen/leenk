"use client"

import type { Message } from "@/lib/types"
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion"
import Image from "next/image"
import { FaCheckCircle, FaReply, FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa"
import { useState, useRef, useEffect } from "react"
import { ImageViewerModal } from "@/components/image-viewer-modal"
import { linkifyText } from "@/lib/utils"

interface ChatBubbleProps {
  message: Message
  isOwn: boolean
  index: number
  onReply?: (message: Message) => void
  onEdit?: (message: Message) => void
  onDelete?: (messageId: string) => void
}

export function ChatBubble({ message, isOwn, index, onReply, onEdit, onDelete }: ChatBubbleProps) {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const x = useMotionValue(0)
  // Make reply indicator appear with just a slight swipe (15px)
  const opacity = useTransform(x, [-15, 0], [1, 0])
  const scale = useTransform(x, [-15, 0], [1, 0.8])
  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Trigger reply with just a slight swipe (15px instead of 50px)
    if (info.offset.x < -15 && onReply) {
      onReply(message)
    }
    x.set(0)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showMenu])

  const getStatusIndicator = () => {
    if (!isOwn) return null

    switch (message.status) {
      case "sent":
        return <FaCheckCircle className="w-3 h-3 opacity-70" />
      case "delivered":
        return <FaCheckCircle className="w-3.5 h-3.5 opacity-70" />
      case "read":
        return <span className="text-xs opacity-70 text-primary">Seen</span>
      default:
        return <FaCheckCircle className="w-3 h-3 opacity-70" />
    }
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-3 relative group`}
      onMouseEnter={() => isOwn && setShowMenu(true)}
      onMouseLeave={() => isOwn && setShowMenu(false)}
      onClick={(e) => {
        // On mobile, toggle menu on click
        if (isOwn && (onEdit || onDelete) && window.innerWidth < 768) {
          e.stopPropagation()
          setShowMenu(!showMenu)
        }
      }}
    >
      {/* Swipe indicator */}
      {!isOwn && onReply && (
        <motion.div
          style={{ opacity, scale, x }}
          className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-primary z-10"
        >
          <FaReply className="w-5 h-5" />
          <span className="text-sm font-medium">Reply</span>
        </motion.div>
      )}

      {/* Edit/Delete Menu for own messages */}
      {isOwn && (onEdit || onDelete) && showMenu && (
        <div
          ref={menuRef}
          className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 flex flex-col min-w-[100px]"
          onClick={(e) => e.stopPropagation()}
        >
          {onEdit && message.text && (
            <button
              onClick={() => {
                onEdit(message)
                setShowMenu(false)
              }}
              className="px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 rounded-t-lg"
            >
              <FaEdit className="w-3 h-3" />
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this message?")) {
                  onDelete(message.id)
                }
                setShowMenu(false)
              }}
              className="px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-red-600 dark:text-red-400 rounded-b-lg"
            >
              <FaTrash className="w-3 h-3" />
              Delete
            </button>
          )}
        </div>
      )}

      <motion.div
        drag={!isOwn && onReply ? "x" : false}
        dragConstraints={{ left: -30, right: 0 }} // Reduced max drag distance
        dragElastic={0} // No elastic - stiff feel
        dragMomentum={false} // No momentum - stops immediately when released
        onDragEnd={handleDragEnd}
        style={{ x }}
        className={`max-w-[80%] md:max-w-md lg:max-w-lg px-3 md:px-4 py-2 rounded-lg cursor-pointer relative ${
          isOwn
            ? "bg-[var(--chat-sent)] text-[var(--chat-sent-text)] rounded-br-none ml-auto dark:bg-[var(--chat-sent)] dark:text-[var(--chat-sent-text)]"
            : "bg-[var(--chat-received)] text-[var(--chat-received-text)] rounded-bl-none dark:bg-[var(--chat-received)] dark:text-[var(--chat-received-text)]"
        }`}
        onClick={() => !isOwn && onReply && onReply(message)}
      >
        {/* Reply preview */}
        {message.replyTo && (
          <div
            className={`mb-2 pl-3 border-l-2 ${
              isOwn ? "border-[var(--chat-sent-text)]/30" : "border-[var(--chat-received-text)]/30"
            }`}
          >
            <p className="text-xs opacity-70 mb-1">
              {message.replyTo.senderType === "business" ? "Business" : "You"}
            </p>
            {message.replyTo.text && (
              <p className="text-xs truncate opacity-80">{message.replyTo.text}</p>
            )}
            {message.replyTo.imageUrl && (
              <p className="text-xs opacity-80">📷 Image</p>
            )}
          </div>
        )}

        {message.text && (
          <p className="text-sm md:text-base break-words">
            {linkifyText(message.text)}
          </p>
        )}
        {message.imageUrl && (
          <div 
            className="relative w-48 h-48 rounded-lg overflow-hidden mb-2 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <Image 
              src={message.imageUrl || "/placeholder.svg"} 
              alt="Chat image" 
              fill 
              className="object-cover"
              priority={index < 3} // Priority for first 3 images (above fold)
              loading={index < 3 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 192px, 256px"
            />
          </div>
        )}
        <div className="flex items-center gap-1.5 mt-1 justify-end">
          <p className={`text-xs opacity-70`}>
            {(() => {
              const messageDate = new Date(message.createdAt)
              const today = new Date()
              const isToday = 
                messageDate.getDate() === today.getDate() &&
                messageDate.getMonth() === today.getMonth() &&
                messageDate.getFullYear() === today.getFullYear()
              
              if (isToday) {
                // Show only time if message is from today
                return messageDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              } else {
                // Show date and time if message is from a different day
                return messageDate.toLocaleString([], {
                  month: "short",
                  day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
                })
              }
            })()}
          </p>
          {getStatusIndicator()}
        </div>
      </motion.div>

      {/* Full-size Image Viewer */}
      <ImageViewerModal
        imageUrl={isImageViewerOpen ? (message.imageUrl || null) : null}
        onClose={() => setIsImageViewerOpen(false)}
        alt={`Image from ${isOwn ? "you" : "chat"}`}
      />
    </motion.div>
  )
}

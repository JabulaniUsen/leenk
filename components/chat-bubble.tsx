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
  const [isMobile, setIsMobile] = useState(false)
  const x = useMotionValue(0)
  // Make reply indicator appear with just a slight swipe (15px)
  // For own messages, show when dragging right (positive x), for others when dragging left (negative x)
  const opacity = useTransform(x, isOwn ? [15, 0] : [-15, 0], [1, 0])
  const scale = useTransform(x, isOwn ? [15, 0] : [-15, 0], [1, 0.8])
  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Trigger reply with just a slight swipe
    // For own messages, swipe right (positive x), for others swipe left (negative x)
    if (onReply) {
      if (isOwn && info.offset.x > 15) {
        onReply(message)
      } else if (!isOwn && info.offset.x < -15) {
        onReply(message)
      }
    }
    x.set(0)
  }

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("touchstart", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        document.removeEventListener("touchstart", handleClickOutside)
      }
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

  const handleMessageClick = (e: React.MouseEvent | React.TouchEvent) => {
    // On mobile, toggle menu on click/touch for own messages
    if (isOwn && (onEdit || onDelete || onReply) && isMobile) {
      e.stopPropagation()
      setShowMenu(!showMenu)
    }
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-3 relative group`}
      onMouseEnter={() => !isMobile && isOwn && (onEdit || onDelete || onReply) && setShowMenu(true)}
      onMouseLeave={() => !isMobile && isOwn && setShowMenu(false)}
      onClick={handleMessageClick}
      onTouchEnd={handleMessageClick}
    >
      {/* Swipe indicator */}
      {onReply && (
        <motion.div
          style={{ opacity, scale, x }}
          className={`absolute ${isOwn ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 flex items-center gap-2 text-primary z-10`}
        >
          <FaReply className="w-5 h-5" />
          <span className="text-sm font-medium">Reply</span>
        </motion.div>
      )}

      {/* Edit/Delete/Reply Menu for own messages */}
      {isOwn && (onEdit || onDelete || onReply) && showMenu && (
        <div
          ref={menuRef}
          className={`absolute ${
            isMobile 
              ? 'right-0 top-full mt-2' 
              : 'right-full mr-2 top-1/2 -translate-y-1/2'
          } bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 flex flex-col min-w-[120px]`}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {onReply && (
            <button
              onClick={() => {
                onReply(message)
                setShowMenu(false)
              }}
              onTouchEnd={(e) => {
                e.preventDefault()
                onReply(message)
                setShowMenu(false)
              }}
              className="px-4 py-3 text-sm text-left active:bg-gray-100 dark:active:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 rounded-t-lg touch-manipulation"
            >
              <FaReply className="w-3 h-3" />
              Reply
            </button>
          )}
          {onEdit && message.text && (
            <button
              onClick={() => {
                onEdit(message)
                setShowMenu(false)
              }}
              onTouchEnd={(e) => {
                e.preventDefault()
                onEdit(message)
                setShowMenu(false)
              }}
              className={`px-4 py-3 text-sm text-left active:bg-gray-100 dark:active:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 touch-manipulation ${
                !onReply ? 'rounded-t-lg' : ''
              }`}
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
              onTouchEnd={(e) => {
                e.preventDefault()
                if (confirm("Are you sure you want to delete this message?")) {
                  onDelete(message.id)
                }
                setShowMenu(false)
              }}
              className="px-4 py-3 text-sm text-left active:bg-gray-100 dark:active:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-red-600 dark:text-red-400 rounded-b-lg touch-manipulation"
            >
              <FaTrash className="w-3 h-3" />
              Delete
            </button>
          )}
        </div>
      )}

      <motion.div
        drag={onReply ? "x" : false}
        dragConstraints={isOwn ? { left: 0, right: 30 } : { left: -30, right: 0 }} // For own messages, drag right; for others, drag left
        dragElastic={0} // No elastic - stiff feel
        dragMomentum={false} // No momentum - stops immediately when released
        onDragEnd={handleDragEnd}
        style={{ x }}
        className={`max-w-[80%] md:max-w-md lg:max-w-lg px-3 md:px-4 py-2 rounded-lg cursor-pointer relative ${
          isOwn
            ? "bg-[var(--chat-sent)] text-[var(--chat-sent-text)] rounded-br-none ml-auto dark:bg-[var(--chat-sent)] dark:text-[var(--chat-sent-text)]"
            : "bg-[var(--chat-received)] text-[var(--chat-received-text)] rounded-bl-none dark:bg-[var(--chat-received)] dark:text-[var(--chat-received-text)]"
        }`}
        onClick={(e) => {
          // Trigger reply if menu is not shown and onReply is available
          if (onReply && !(isMobile && isOwn && showMenu)) {
            // For own messages on mobile, don't reply if menu is showing
            if (!isOwn || !isMobile || !showMenu) {
              onReply(message)
            }
          }
        }}
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

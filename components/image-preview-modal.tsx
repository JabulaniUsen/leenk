"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Send, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

interface ImagePreviewModalProps {
  imageUrl: string | null
  onClose: () => void
  onSend: () => void
  onRemove: () => void
  isSending?: boolean
}

export function ImagePreviewModal({ 
  imageUrl, 
  onClose, 
  onSend, 
  onRemove,
  isSending = false 
}: ImagePreviewModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])
  
  if (!imageUrl || !mounted) return null

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center p-4"
        >
          {/* Close button - top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[10000] p-3 bg-black/70 hover:bg-black/90 rounded-full transition-colors shadow-lg"
            aria-label="Close preview"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Image Preview - Centered */}
          <div className="relative w-full h-full flex items-center justify-center">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
            <Image
              src={imageUrl}
              alt="Preview"
              fill
              className="object-contain"
              priority
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
          </div>

          {/* Action buttons - Fixed at bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-[10000]">
            <Button
              variant="outline"
              onClick={onRemove}
              disabled={isSending}
              className="bg-black/70 hover:bg-black/90 text-white border-white/20"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Remove
            </Button>
            <Button
              onClick={onSend}
              disabled={isSending}
              className="bg-primary hover:opacity-90"
            >
              {isSending ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}


"use client"

import { motion, AnimatePresence } from "framer-motion"
import { FaTimes, FaDownload } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

interface ImageViewerModalProps {
  imageUrl: string | null
  onClose: () => void
  alt?: string
}

export function ImageViewerModal({ imageUrl, onClose, alt = "Chat image" }: ImageViewerModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!imageUrl || !mounted) return null

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = `image-${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close button - More prominent */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute top-4 right-4 z-[10000] p-3 bg-black/70 hover:bg-black/90 rounded-full transition-colors shadow-lg"
          aria-label="Close viewer"
        >
          <FaTimes className="w-6 h-6 text-white" />
        </button>

        {/* Download button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleDownload()
          }}
          className="absolute top-4 left-4 z-[10000] p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          aria-label="Download image"
        >
          <FaDownload className="w-6 h-6 text-white" />
        </button>

        {/* Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center p-4"
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-contain"
            priority
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}


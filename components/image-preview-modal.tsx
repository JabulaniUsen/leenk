"use client"

import { motion, AnimatePresence } from "framer-motion"
import { FaTimes, FaPaperPlane, FaTimesCircle, FaPen, FaCrop } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { ImageAnnotation } from "@/components/image-annotation"
import { ImageCrop } from "@/components/image-crop"

interface ImagePreviewModalProps {
  imageUrl: string | null
  onClose: () => void
  onSend: (imageUrl?: string) => void
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
  const [showAnnotation, setShowAnnotation] = useState(false)
  const [showCrop, setShowCrop] = useState(false)
  const [annotatedImageUrl, setAnnotatedImageUrl] = useState<string | null>(null)
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Reset annotated/cropped image when imageUrl changes (new image selected)
  useEffect(() => {
    setAnnotatedImageUrl(null)
    setCroppedImageUrl(null)
    setShowAnnotation(false)
    setShowCrop(false)
    setIsLoading(true)
  }, [imageUrl])

  useEffect(() => {
    if (annotatedImageUrl) {
      // Update the image URL when annotation is done
      setShowAnnotation(false)
    }
  }, [annotatedImageUrl])

  useEffect(() => {
    if (croppedImageUrl) {
      // Update the image URL when crop is done
      setShowCrop(false)
    }
  }, [croppedImageUrl])
  
  if (!imageUrl || !mounted) return null

  const currentImageUrl = croppedImageUrl || annotatedImageUrl || imageUrl

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
            <FaTimes className="w-6 h-6 text-white" />
          </button>

          {/* Image Preview - Centered */}
          <div className="relative w-full h-full flex items-center justify-center" id="preview-image-container">
            {isLoading && !showAnnotation && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
            {!showAnnotation && (
              <Image
                src={currentImageUrl}
                alt="Preview"
                fill
                className="object-contain"
                priority
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            )}
            
            {/* Annotation overlay */}
            {showAnnotation && (
              <ImageAnnotation
                imageUrl={currentImageUrl}
                onImageUpdate={(annotatedUrl) => {
                  setAnnotatedImageUrl(annotatedUrl)
                }}
                onClose={() => setShowAnnotation(false)}
              />
            )}

            {/* Crop overlay */}
            {showCrop && (
              <ImageCrop
                imageUrl={croppedImageUrl || annotatedImageUrl || imageUrl}
                onImageUpdate={(croppedUrl) => {
                  setCroppedImageUrl(croppedUrl)
                }}
                onClose={() => setShowCrop(false)}
              />
            )}
          </div>

          {/* Action buttons - Fixed at bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-[10000]">
            <Button
              variant="outline"
              onClick={() => {
                onRemove()
                onClose()
              }}
              disabled={isSending || showAnnotation || showCrop}
              className="bg-black/70 hover:bg-black/90 text-white border-white/20 p-3"
              size="icon"
              aria-label="Remove"
            >
              <FaTimesCircle className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowCrop(true)}
              disabled={isSending || showAnnotation || showCrop}
              className="bg-black/70 hover:bg-black/90 text-white border-white/20 p-3"
              size="icon"
              aria-label="Crop"
            >
              <FaCrop className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAnnotation(true)}
              disabled={isSending || showAnnotation || showCrop}
              className="bg-black/70 hover:bg-black/90 text-white border-white/20 p-3"
              size="icon"
              aria-label="Draw"
            >
              <FaPen className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => {
                // Send the cropped/annotated image if available, otherwise send the original
                onSend(currentImageUrl)
              }}
              disabled={isSending || showAnnotation || showCrop}
              className="bg-primary hover:opacity-90 p-3"
              size="icon"
              aria-label={isSending ? "Sending..." : "Send"}
            >
              {isSending ? (
                <span className="w-5 h-5 flex items-center justify-center">...</span>
              ) : (
                <FaPaperPlane className="w-5 h-5" />
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}


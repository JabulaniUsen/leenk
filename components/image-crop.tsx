"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { FaCheck, FaTimes } from "react-icons/fa"
import { Button } from "@/components/ui/button"

interface ImageCropProps {
  imageUrl: string
  onImageUpdate: (croppedImageUrl: string) => void
  onClose: () => void
}

export function ImageCrop({ imageUrl, onImageUpdate, onClose }: ImageCropProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isResizing, setIsResizing] = useState<string | null>(null)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 })

  // Initialize image and crop area
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      imageRef.current = img
      
      const containerRect = container.getBoundingClientRect()
      const containerWidth = containerRect.width
      const containerHeight = containerRect.height
      
      // Calculate display size (fit to container)
      const imageAspect = img.width / img.height
      const containerAspect = containerWidth / containerHeight
      
      let displayWidth: number
      let displayHeight: number
      
      if (imageAspect > containerAspect) {
        displayWidth = containerWidth
        displayHeight = containerWidth / imageAspect
      } else {
        displayHeight = containerHeight
        displayWidth = containerHeight * imageAspect
      }

      setImageSize({ width: img.width, height: img.height })
      setDisplaySize({ width: displayWidth, height: displayHeight })

      // Initialize crop area to 80% of image, centered
      const cropWidth = displayWidth * 0.8
      const cropHeight = displayHeight * 0.8
      setCropArea({
        x: (displayWidth - cropWidth) / 2,
        y: (displayHeight - cropHeight) / 2,
        width: cropWidth,
        height: cropHeight,
      })

      drawCanvas()
    }
    img.src = imageUrl
  }, [imageUrl])

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const img = imageRef.current
    if (!canvas || !img) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = displaySize.width
    canvas.height = displaySize.height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw image
    ctx.drawImage(img, 0, 0, displaySize.width, displaySize.height)

    // Draw overlay (darken outside crop area)
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Clear crop area
    ctx.globalCompositeOperation = "destination-out"
    ctx.fillRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height)
    
    // Draw crop border
    ctx.globalCompositeOperation = "source-over"
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height)
    ctx.setLineDash([])

    // Draw resize handles
    const handleSize = 12
    const handles = [
      { x: cropArea.x, y: cropArea.y }, // top-left
      { x: cropArea.x + cropArea.width, y: cropArea.y }, // top-right
      { x: cropArea.x, y: cropArea.y + cropArea.height }, // bottom-left
      { x: cropArea.x + cropArea.width, y: cropArea.y + cropArea.height }, // bottom-right
      { x: cropArea.x + cropArea.width / 2, y: cropArea.y }, // top
      { x: cropArea.x + cropArea.width / 2, y: cropArea.y + cropArea.height }, // bottom
      { x: cropArea.x, y: cropArea.y + cropArea.height / 2 }, // left
      { x: cropArea.x + cropArea.width, y: cropArea.y + cropArea.height / 2 }, // right
    ]

    ctx.fillStyle = "#fff"
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    handles.forEach((handle) => {
      ctx.beginPath()
      ctx.arc(handle.x, handle.y, handleSize / 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    })
  }, [cropArea, displaySize])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  const getCoordinates = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
  }, [])

  const getHandleAt = useCallback((x: number, y: number) => {
    const handleSize = 12
    const handles = [
      { id: "tl", x: cropArea.x, y: cropArea.y },
      { id: "tr", x: cropArea.x + cropArea.width, y: cropArea.y },
      { id: "bl", x: cropArea.x, y: cropArea.y + cropArea.height },
      { id: "br", x: cropArea.x + cropArea.width, y: cropArea.y + cropArea.height },
      { id: "t", x: cropArea.x + cropArea.width / 2, y: cropArea.y },
      { id: "b", x: cropArea.x + cropArea.width / 2, y: cropArea.y + cropArea.height },
      { id: "l", x: cropArea.x, y: cropArea.y + cropArea.height / 2 },
      { id: "r", x: cropArea.x + cropArea.width, y: cropArea.y + cropArea.height / 2 },
    ]

    for (const handle of handles) {
      const distance = Math.sqrt(Math.pow(x - handle.x, 2) + Math.pow(y - handle.y, 2))
      if (distance <= handleSize) {
        return handle.id
      }
    }

    // Check if clicking inside crop area (for dragging)
    if (
      x >= cropArea.x &&
      x <= cropArea.x + cropArea.width &&
      y >= cropArea.y &&
      y <= cropArea.y + cropArea.height
    ) {
      return "move"
    }

    return null
  }, [cropArea])

  const handleStart = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const coords = getCoordinates(e)
    const handle = getHandleAt(coords.x, coords.y)

    if (handle) {
      setIsResizing(handle)
      setIsDragging(handle === "move")
      setDragStart(coords)
    }
  }, [getCoordinates, getHandleAt])

  const handleMove = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging && !isResizing) return
    e.preventDefault()

    const coords = getCoordinates(e)
    const deltaX = coords.x - dragStart.x
    const deltaY = coords.y - dragStart.y

    if (isDragging) {
      // Move crop area
      setCropArea((prev) => ({
        ...prev,
        x: Math.max(0, Math.min(displaySize.width - prev.width, prev.x + deltaX)),
        y: Math.max(0, Math.min(displaySize.height - prev.height, prev.y + deltaY)),
      }))
    } else if (isResizing) {
      // Resize crop area
      setCropArea((prev) => {
        let newCrop = { ...prev }
        const minSize = 50

        switch (isResizing) {
          case "tl":
            newCrop.x = Math.max(0, prev.x + deltaX)
            newCrop.y = Math.max(0, prev.y + deltaY)
            newCrop.width = Math.max(minSize, prev.width - deltaX)
            newCrop.height = Math.max(minSize, prev.height - deltaY)
            break
          case "tr":
            newCrop.y = Math.max(0, prev.y + deltaY)
            newCrop.width = Math.max(minSize, prev.width + deltaX)
            newCrop.height = Math.max(minSize, prev.height - deltaY)
            break
          case "bl":
            newCrop.x = Math.max(0, prev.x + deltaX)
            newCrop.width = Math.max(minSize, prev.width - deltaX)
            newCrop.height = Math.max(minSize, prev.height + deltaY)
            break
          case "br":
            newCrop.width = Math.max(minSize, prev.width + deltaX)
            newCrop.height = Math.max(minSize, prev.height + deltaY)
            break
          case "t":
            newCrop.y = Math.max(0, prev.y + deltaY)
            newCrop.height = Math.max(minSize, prev.height - deltaY)
            break
          case "b":
            newCrop.height = Math.max(minSize, prev.height + deltaY)
            break
          case "l":
            newCrop.x = Math.max(0, prev.x + deltaX)
            newCrop.width = Math.max(minSize, prev.width - deltaX)
            break
          case "r":
            newCrop.width = Math.max(minSize, prev.width + deltaX)
            break
        }

        // Ensure crop area stays within bounds
        if (newCrop.x + newCrop.width > displaySize.width) {
          newCrop.width = displaySize.width - newCrop.x
        }
        if (newCrop.y + newCrop.height > displaySize.height) {
          newCrop.height = displaySize.height - newCrop.y
        }

        return newCrop
      })
    }

    setDragStart(coords)
  }, [isDragging, isResizing, dragStart, getCoordinates, displaySize])

  const handleEnd = useCallback(() => {
    setIsDragging(false)
    setIsResizing(null)
  }, [])

  const applyCrop = useCallback(() => {
    const canvas = canvasRef.current
    const img = imageRef.current
    if (!canvas || !img) return

    // Calculate scale from display size to original image size
    const scaleX = imageSize.width / displaySize.width
    const scaleY = imageSize.height / displaySize.height

    // Create new canvas with cropped dimensions
    const croppedCanvas = document.createElement("canvas")
    const croppedWidth = cropArea.width * scaleX
    const croppedHeight = cropArea.height * scaleY
    croppedCanvas.width = croppedWidth
    croppedCanvas.height = croppedHeight

    const ctx = croppedCanvas.getContext("2d")
    if (!ctx) return

    // Draw cropped portion of image
    ctx.drawImage(
      img,
      cropArea.x * scaleX,
      cropArea.y * scaleY,
      croppedWidth,
      croppedHeight,
      0,
      0,
      croppedWidth,
      croppedHeight
    )

    const dataUrl = croppedCanvas.toDataURL("image/jpeg", 0.9)
    onImageUpdate(dataUrl)
    onClose()
  }, [cropArea, imageSize, displaySize, onImageUpdate, onClose])

  return (
    <div className="absolute inset-0 bg-black/90 flex flex-col z-[10001]">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-3 bg-black/90 border-b border-white/10">
        <div className="flex items-center gap-3">
          <h3 className="text-white font-medium">Crop Image</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Cancel"
          >
            <FaTimes className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Canvas Container */}
      <div ref={containerRef} className="flex-1 flex items-center justify-center overflow-hidden relative">
        <canvas
          ref={canvasRef}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          className="max-w-full max-h-full cursor-move"
          style={{ touchAction: "none" }}
        />
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        <Button
          onClick={onClose}
          variant="outline"
          className="bg-black/70 hover:bg-black/90 text-white border-white/20"
        >
          Cancel
        </Button>
        <Button
          onClick={applyCrop}
          className="bg-primary hover:opacity-90 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg"
        >
          <FaCheck className="w-4 h-4 mr-2" />
          Apply Crop
        </Button>
      </div>
    </div>
  )
}


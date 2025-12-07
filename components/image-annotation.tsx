"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { FaUndo, FaRedo, FaTimes } from "react-icons/fa"
import { Button } from "@/components/ui/button"

interface ImageAnnotationProps {
  imageUrl: string
  onImageUpdate: (annotatedImageUrl: string) => void
  onClose: () => void
}

// Limited to 4 colors
const PRESET_COLORS = [
  "#000000", // Black
  "#FF0000", // Red
  "#0000FF", // Blue
  "#FFFFFF", // White
]

export function ImageAnnotation({ imageUrl, onImageUpdate, onClose }: ImageAnnotationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lineWidth, setLineWidth] = useState(3)
  const [color, setColor] = useState("#000000")
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Save state to history
  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    
    // Use functional updates to ensure we have the latest state
    setHistoryIndex((prevIndex) => {
      setHistory((prevHistory) => {
        // Remove any future history if we're not at the end
        const newHistory = prevHistory.slice(0, prevIndex + 1)
        newHistory.push(imageData)
        
        // Limit history to 50 states
        if (newHistory.length > 50) {
          newHistory.shift()
          // If we removed the first item, adjust index
          return newHistory
        }
        
        return newHistory
      })
      // Return the new index
      return prevIndex + 1
    })
  }, [])

  // Load image and setup canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Get the preview image container to match its size
    const previewContainer = document.getElementById("preview-image-container")
    if (!previewContainer) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      imageRef.current = img
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Get the actual displayed size of the preview image
      const containerRect = previewContainer.getBoundingClientRect()
      const containerWidth = containerRect.width
      const containerHeight = containerRect.height
      
      // Calculate the aspect ratio of the image
      const imageAspect = img.width / img.height
      const containerAspect = containerWidth / containerHeight
      
      // Calculate display size to match the preview (object-contain behavior)
      let displayWidth: number
      let displayHeight: number
      
      if (imageAspect > containerAspect) {
        // Image is wider - fit to width
        displayWidth = containerWidth
        displayHeight = containerWidth / imageAspect
      } else {
        // Image is taller - fit to height
        displayHeight = containerHeight
        displayWidth = containerHeight * imageAspect
      }

      // Set canvas display size (CSS) to match preview
      canvas.style.width = `${displayWidth}px`
      canvas.style.height = `${displayHeight}px`
      
      // Set canvas internal size to match display size (for drawing)
      canvas.width = displayWidth
      canvas.height = displayHeight

      // Draw image scaled to display size
      ctx.drawImage(img, 0, 0, displayWidth, displayHeight)
      
      // Save initial state to history
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      setHistory([imageData])
      setHistoryIndex(0)
    }
    img.src = imageUrl
  }, [imageUrl])

  const getCoordinates = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    // Canvas internal size matches display size, so coordinates are direct
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      }
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      }
    }
  }, [])

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Save state BEFORE starting to draw (so undo goes back to before this stroke)
    if (!isDrawing) {
      saveToHistory()
    }

    setIsDrawing(true)
    const { x, y } = getCoordinates(e)

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }, [color, lineWidth, getCoordinates, isDrawing, saveToHistory])

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    e.preventDefault()

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { x, y } = getCoordinates(e)

    ctx.globalCompositeOperation = "source-over"
    ctx.strokeStyle = color

    ctx.lineTo(x, y)
    ctx.stroke()
  }, [isDrawing, color, getCoordinates])

  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.globalCompositeOperation = "source-over"
    // Don't save here - we already saved at the start of drawing
  }, [])

  const undo = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    setHistory((prevHistory) => {
      setHistoryIndex((prevIndex) => {
        if (prevIndex <= 0) return prevIndex

        const ctx = canvas.getContext("2d")
        if (!ctx) return prevIndex

        const prevIndexValue = prevIndex - 1
        ctx.putImageData(prevHistory[prevIndexValue], 0, 0)
        return prevIndexValue
      })
      return prevHistory
    })
  }, [])

  const redo = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    setHistory((prevHistory) => {
      setHistoryIndex((prevIndex) => {
        if (prevIndex >= prevHistory.length - 1) return prevIndex

        const ctx = canvas.getContext("2d")
        if (!ctx) return prevIndex

        const nextIndex = prevIndex + 1
        ctx.putImageData(prevHistory[nextIndex], 0, 0)
        return nextIndex
      })
      return prevHistory
    })
  }, [])


  const saveImage = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !imageRef.current) return

    // Create a new canvas with the original image size for export
    const exportCanvas = document.createElement("canvas")
    exportCanvas.width = imageRef.current.width
    exportCanvas.height = imageRef.current.height
    const exportCtx = exportCanvas.getContext("2d")
    if (!exportCtx) return

    // Draw the original image
    exportCtx.drawImage(imageRef.current, 0, 0)
    
    // Calculate scale to map from display canvas to original image
    const displayWidth = canvas.width
    const displayHeight = canvas.height
    const scaleX = imageRef.current.width / displayWidth
    const scaleY = imageRef.current.height / displayHeight
    
    // Draw the annotations scaled to original size
    exportCtx.save()
    exportCtx.scale(scaleX, scaleY)
    exportCtx.drawImage(canvas, 0, 0)
    exportCtx.restore()

    const dataUrl = exportCanvas.toDataURL("image/png")
    onImageUpdate(dataUrl)
    onClose()
  }, [onImageUpdate, onClose])

  return (
    <div className="absolute inset-0 bg-black/90 flex flex-col z-[10001]">
      {/* Top Toolbar - WhatsApp style */}
      <div className="flex items-center justify-between p-3 bg-black/90 border-b border-white/10">
        <div className="flex items-center gap-3">
          {/* Undo/Redo */}
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Undo"
          >
            <FaUndo className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Redo"
          >
            <FaRedo className="w-5 h-5 text-white" />
          </button>

          {/* Color Picker - 4 colors only */}
          <div className="flex items-center gap-2 ml-2">
            {PRESET_COLORS.map((presetColor) => (
              <button
                key={presetColor}
                onClick={() => setColor(presetColor)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  color === presetColor
                    ? "border-white scale-110 shadow-lg"
                    : "border-white/30 hover:border-white/60"
                }`}
                style={{
                  backgroundColor: presetColor,
                  boxShadow: presetColor === "#FFFFFF" ? "inset 0 0 0 1px rgba(0,0,0,0.2)" : "none",
                }}
                aria-label={`Select ${presetColor} color`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <FaTimes className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>


      {/* Size Slider */}
      <div className="flex items-center justify-center gap-3 p-2 bg-black/80 border-b border-white/10">
        <span className="text-xs text-white/70">Size</span>
        <input
          type="range"
          min="1"
          max="10"
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
          className="flex-1 max-w-xs"
        />
        <span className="text-xs text-white/70 w-6">{lineWidth}</span>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center overflow-hidden relative">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="max-w-full max-h-full cursor-crosshair"
          style={{ touchAction: "none" }}
        />
        
        {/* Floating Done Button - Inside image at bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <Button
            onClick={saveImage}
            className="bg-primary hover:opacity-90 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}


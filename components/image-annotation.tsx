"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { Eraser, Undo2, Redo2, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageAnnotationProps {
  imageUrl: string
  onImageUpdate: (annotatedImageUrl: string) => void
  onClose: () => void
}

type DrawingTool = "pen" | "eraser"

// WhatsApp-style preset colors
const PRESET_COLORS = [
  "#000000", // Black
  "#FF0000", // Red
  "#FF8C00", // Orange
  "#FFD700", // Gold
  "#32CD32", // Green
  "#00CED1", // Cyan
  "#0000FF", // Blue
  "#8A2BE2", // Blue Violet
  "#FF1493", // Deep Pink
  "#FFFFFF", // White
]

export function ImageAnnotation({ imageUrl, onImageUpdate, onClose }: ImageAnnotationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<DrawingTool>("pen")
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

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      imageRef.current = img
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Calculate display size (max 90vh/90vw)
      const maxWidth = window.innerWidth * 0.9
      const maxHeight = window.innerHeight * 0.7 // Leave room for toolbar
      
      let displayWidth = img.width
      let displayHeight = img.height
      
      // Scale to fit
      if (displayWidth > maxWidth) {
        displayHeight = (displayHeight * maxWidth) / displayWidth
        displayWidth = maxWidth
      }
      if (displayHeight > maxHeight) {
        displayWidth = (displayWidth * maxHeight) / displayHeight
        displayHeight = maxHeight
      }

      // Set canvas display size (CSS)
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

    if (tool === "pen") {
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
    } else {
      // Eraser
      ctx.globalCompositeOperation = "destination-out"
      ctx.lineWidth = lineWidth * 2
    }
  }, [tool, color, lineWidth, getCoordinates, isDrawing, saveToHistory])

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    e.preventDefault()

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { x, y } = getCoordinates(e)

    if (tool === "pen") {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = color
    } else {
      ctx.globalCompositeOperation = "destination-out"
    }

    ctx.lineTo(x, y)
    ctx.stroke()
  }, [isDrawing, tool, color, getCoordinates])

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
    <div className="absolute inset-0 bg-black/50 flex flex-col z-[10001]">
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
            <Undo2 className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Redo"
          >
            <Redo2 className="w-5 h-5 text-white" />
          </button>

          {/* Pen/Eraser Toggle */}
          <div className="flex items-center gap-1 bg-white/10 rounded-full p-1">
            <button
              onClick={() => setTool("pen")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                tool === "pen"
                  ? "bg-white text-black"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Pen
            </button>
            <button
              onClick={() => setTool("eraser")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                tool === "eraser"
                  ? "bg-white text-black"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Eraser className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Color Picker - WhatsApp style */}
      {tool === "pen" && (
        <div className="flex items-center justify-center gap-3 p-3 bg-black/80 border-b border-white/10">
          <div className="flex items-center gap-2">
            {PRESET_COLORS.map((presetColor) => (
              <button
                key={presetColor}
                onClick={() => setColor(presetColor)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
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
      )}

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
      <div className="flex-1 flex items-center justify-center overflow-hidden">
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
      </div>

      {/* Bottom Done Button - WhatsApp style */}
      <div className="p-4 bg-black/90 border-t border-white/10">
        <Button
          onClick={saveImage}
          className="w-full bg-primary hover:opacity-90 text-white font-semibold py-3 rounded-lg"
        >
          Done
        </Button>
      </div>
    </div>
  )
}


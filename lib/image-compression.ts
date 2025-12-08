/**
 * Compress and optimize an image file before sending
 * @param file The original image file
 * @param maxWidth Maximum width in pixels (default: 1920)
 * @param maxHeight Maximum height in pixels (default: 1920)
 * @param quality JPEG quality 0-1 (default: 0.8)
 * @param maxSizeMB Maximum file size in MB (default: 2)
 * @returns Compressed image as Blob
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1920,
  quality: number = 0.8,
  maxSizeMB: number = 2
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      const img = new Image()
      
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width
        let height = img.height
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width = width * ratio
          height = height * ratio
        }
        
        // Create canvas
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        
        // Draw and compress
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(new Error("Could not get canvas context"))
          return
        }
        
        // Use high-quality image rendering
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = "high"
        
        // Draw image to canvas
        ctx.drawImage(img, 0, 0, width, height)
        
        // Convert to blob with compression
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to compress image"))
              return
            }
            
            // If the compressed image is still too large, compress more aggressively
            const sizeMB = blob.size / (1024 * 1024)
            if (sizeMB > maxSizeMB) {
              // Recursively compress with lower quality
              const newQuality = Math.max(0.3, quality - 0.2)
              canvas.toBlob(
                (smallerBlob) => {
                  if (!smallerBlob) {
                    resolve(blob) // Return original compressed blob if further compression fails
                    return
                  }
                  resolve(smallerBlob)
                },
                "image/jpeg",
                newQuality
              )
            } else {
              resolve(blob)
            }
          },
          "image/jpeg", // Always convert to JPEG for better compression
          quality
        )
      }
      
      img.onerror = () => {
        reject(new Error("Failed to load image"))
      }
      
      img.src = e.target?.result as string
    }
    
    reader.onerror = () => {
      reject(new Error("Failed to read file"))
    }
    
    reader.readAsDataURL(file)
  })
}

/**
 * Convert a Blob to a data URL string
 * @param blob The blob to convert
 * @returns Data URL string
 */
export function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error("Failed to convert blob to data URL"))
    reader.readAsDataURL(blob)
  })
}

/**
 * Get the file size in a human-readable format
 * @param bytes File size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
}


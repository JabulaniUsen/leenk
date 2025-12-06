"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface AvatarProps {
  src?: string
  name?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

function getInitials(name?: string): string {
  if (!name) return "?"
  
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

function getSizeClasses(size: "sm" | "md" | "lg" | "xl"): string {
  switch (size) {
    case "sm":
      return "w-8 h-8 text-xs"
    case "md":
      return "w-10 h-10 text-sm"
    case "lg":
      return "w-12 h-12 text-base"
    case "xl":
      return "w-16 h-16 text-xl"
    default:
      return "w-10 h-10 text-sm"
  }
}

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const initials = getInitials(name)
  const sizeClasses = getSizeClasses(size)

  if (src) {
    return (
      <div className={cn("relative rounded-full overflow-hidden bg-muted flex items-center justify-center", sizeClasses, className)}>
        <Image
          src={src}
          alt={name || "Avatar"}
          fill
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium",
        sizeClasses,
        className
      )}
    >
      {initials}
    </div>
  )
}


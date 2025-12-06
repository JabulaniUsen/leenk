"use client"

import Image from "next/image"

interface WallpaperProps {
  businessLogo?: string
  className?: string
}

export function Wallpaper({ businessLogo, className = "" }: WallpaperProps) {
  if (!businessLogo) return null

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none ${className}`}>
      <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay for readability */}
      <Image
        src={businessLogo}
        alt="Wallpaper"
        fill
        className="object-cover opacity-10"
        priority={false}
      />
    </div>
  )
}


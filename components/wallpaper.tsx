"use client"

import Image from "next/image"

interface WallpaperProps {
  businessLogo?: string
  className?: string
}

export function Wallpaper({ businessLogo, className = "" }: WallpaperProps) {
  return (
    <div className={`fixed inset-0 z-0 pointer-events-none ${className}`}>
      <div className="absolute inset-0 bg-black/40" /> 
      <Image
        src="/chat-bg.jpg"
        alt="Wallpaper"
        fill
        className="object-cover opacity-10"
        priority={false}
      />
    </div>
  )
}


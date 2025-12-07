"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    // Register service worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration)
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error)
        })
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowInstallButton(false)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      console.log("User accepted the install prompt")
    } else {
      console.log("User dismissed the install prompt")
    }

    setDeferredPrompt(null)
    setShowInstallButton(false)
  }

  if (!showInstallButton) return null

  return (
    <Button
      onClick={handleInstallClick}
      variant="outline"
      size="sm"
      className="fixed bottom-4 right-4 z-50 shadow-lg"
    >
      <Download className="w-4 h-4 mr-2" />
      Install App
    </Button>
  )
}


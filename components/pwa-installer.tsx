"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const PWA_INSTALL_DISMISSED_KEY = "pwa-install-dismissed"
const PWA_INSTALL_DISMISSED_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

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

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return
    }

    // Check if user previously dismissed the prompt
    const dismissedTimestamp = localStorage.getItem(PWA_INSTALL_DISMISSED_KEY)
    if (dismissedTimestamp) {
      const dismissedTime = parseInt(dismissedTimestamp, 10)
      const now = Date.now()
      // If dismissed less than 7 days ago, don't show again
      if (now - dismissedTime < PWA_INSTALL_DISMISSED_DURATION) {
        return
      }
      // Otherwise, clear the dismissed flag and show again
      localStorage.removeItem(PWA_INSTALL_DISMISSED_KEY)
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // Show prompt after a short delay for better UX
      setTimeout(() => {
        setShowInstallPrompt(true)
      }, 2000) // Show after 2 seconds
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

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
      setShowInstallPrompt(false)
    } else {
      console.log("User dismissed the install prompt")
    }

    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  const handleDismiss = () => {
    // Store dismissal timestamp
    localStorage.setItem(PWA_INSTALL_DISMISSED_KEY, Date.now().toString())
    setShowInstallPrompt(false)
  }

  return (
    <AnimatePresence>
      {showInstallPrompt && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
        >
          <div className="bg-card border border-border rounded-lg shadow-lg p-4 flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Download className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1">Install Leenk App</h3>
              <p className="text-xs text-muted-foreground">
                Get a better experience with our app. Install now or try later.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                onClick={handleInstallClick}
                size="sm"
                className="text-xs"
              >
                Install
              </Button>
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-muted rounded transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


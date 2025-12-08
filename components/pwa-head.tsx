"use client"

import React, { useEffect } from "react"

export function PWAHead() {
  useEffect(() => {
    // Add PWA meta tags dynamically
    const addMetaTag = (name: string, content: string) => {
      if (!document.querySelector(`meta[name="${name}"]`)) {
        const meta = document.createElement("meta")
        meta.name = name
        meta.content = content
        document.head.appendChild(meta)
      }
    }

    const addLinkTag = (rel: string, href: string, attributes?: Record<string, string>) => {
      if (!document.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
        const link = document.createElement("link")
        link.rel = rel
        link.href = href
        if (attributes) {
          Object.entries(attributes).forEach(([key, value]) => {
            link.setAttribute(key, value)
          })
        }
        document.head.appendChild(link)
      }
    }

    // Add manifest link
    addLinkTag("manifest", "/manifest.json")

    // Add Apple-specific meta tags
    addMetaTag("apple-mobile-web-app-capable", "yes")
    addMetaTag("apple-mobile-web-app-status-bar-style", "default")
    addMetaTag("apple-mobile-web-app-title", "Leenk")

    // Add Apple touch icon
    addLinkTag("apple-touch-icon", "/logo.png")
  }, [])

  return null
}


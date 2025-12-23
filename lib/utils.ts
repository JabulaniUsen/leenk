import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import React from 'react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts URLs in text to clickable links
 * @param text The text that may contain URLs
 * @returns React elements with clickable links
 */
export function linkifyText(text: string): React.ReactNode[] {
  // URL regex pattern that matches:
  // - http:// or https:// URLs (with optional www.)
  // - www. URLs (without protocol)
  // More specific pattern to avoid false positives
  const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`\[\]]+|www\.[^\s<>"{}|\\^`\[\]]+)/gi
  
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match
  let keyCounter = 0
  
  // Reset regex lastIndex to avoid issues with global flag
  urlRegex.lastIndex = 0
  
  while ((match = urlRegex.exec(text)) !== null) {
    // Add text before the URL
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    
    // Extract the URL
    let url = match[0]
    let displayText = match[0]
    
    // Add protocol if missing (for www. URLs)
    if (url.toLowerCase().startsWith('www.')) {
      url = 'https://' + url
    }
    
    // Clean up URL (remove trailing punctuation that's not part of the URL)
    const cleanedUrl = url.replace(/[.,;:!?]+$/, '')
    const trailingPunctuation = url.slice(cleanedUrl.length)
    
    // Create clickable link using React.createElement to avoid JSX in .ts file
    parts.push(
      React.createElement(
        'a',
        {
          key: `link-${keyCounter++}`,
          href: cleanedUrl,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'text-primary underline hover:opacity-80 break-all',
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation(),
        },
        displayText.replace(/[.,;:!?]+$/, '')
      )
    )
    
    // Add trailing punctuation if any
    if (trailingPunctuation) {
      parts.push(trailingPunctuation)
    }
    
    lastIndex = match.index + match[0].length
  }
  
  // Add remaining text after the last URL
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }
  
  // If no URLs were found, return the original text
  if (parts.length === 0) {
    return [text]
  }
  
  return parts
}

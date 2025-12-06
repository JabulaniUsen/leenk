"use client"

import { motion } from "framer-motion"

interface TypingIndicatorProps {
  isOwn?: boolean
}

export function TypingIndicator({ isOwn = false }: TypingIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-3`}
    >
      <div
        className={`px-4 py-3 rounded-2xl ${
          isOwn
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-secondary text-secondary-foreground rounded-bl-none"
        }`}
      >
        <div className="flex gap-1.5">
          <motion.div
            className="w-2 h-2 rounded-full bg-current opacity-60"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: 0,
            }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-current opacity-60"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: 0.2,
            }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-current opacity-60"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: 0.4,
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}


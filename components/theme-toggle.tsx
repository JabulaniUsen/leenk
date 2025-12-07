"use client"

import { useTheme } from "@/lib/theme"
import { FaMoon, FaSun } from "react-icons/fa"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="text-foreground hover:bg-secondary"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <FaMoon className="w-4 h-4" />
      ) : (
        <FaSun className="w-4 h-4" />
      )}
    </Button>
  )
}


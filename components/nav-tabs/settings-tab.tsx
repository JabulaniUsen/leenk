"use client"

import { memo } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "@/lib/theme"
import { FaMoon, FaSun, FaPalette } from "react-icons/fa"

function SettingsTabComponent() {
  const { theme } = useTheme()

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Settings</h2>
        <p className="text-sm text-muted-foreground">Customize your app preferences</p>
      </div>

      {/* Theme Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <FaPalette className="w-5 h-5 text-muted-foreground" />
          <div className="flex-1">
            <h3 className="font-semibold">Appearance</h3>
            <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === "light" ? (
              <FaSun className="w-5 h-5 text-yellow-500" />
            ) : (
              <FaMoon className="w-5 h-5 text-blue-400" />
            )}
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-muted-foreground">
                Currently using {theme === "light" ? "Light" : "Dark"} mode
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Additional Settings can be added here */}
      <div className="pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground text-center">
          More settings coming soon...
        </p>
      </div>
    </div>
  )
}

// Memoize to prevent unnecessary re-renders
export const SettingsTab = memo(SettingsTabComponent)


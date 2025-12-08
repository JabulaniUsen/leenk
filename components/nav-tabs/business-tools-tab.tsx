"use client"

import { useState, useEffect, memo } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/hooks/use-auth"
import { storage } from "@/lib/storage"
import { FaRobot, FaCommentDots, FaSave, FaSpinner, FaToggleOn, FaToggleOff } from "react-icons/fa"
import { Skeleton } from "@/components/ui/skeleton"

function BusinessToolsTabComponent() {
  const { user, mutate: mutateAuth } = useAuth()
  const [awayMessage, setAwayMessage] = useState("")
  const [awayMessageEnabled, setAwayMessageEnabled] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (user?.business) {
      // Load away message settings from database
      setAwayMessage(user.business.awayMessage || "")
      setAwayMessageEnabled(user.business.awayMessageEnabled || false)
      
      setLoading(false)
    }
  }, [user])

  const handleSave = async () => {
    if (!user?.business) return

    setSaving(true)
    setSuccess("")

    try {
      // Save away message to database
      await storage.updateBusiness(user.business.id, {
        awayMessage: awayMessage.trim() || undefined,
        awayMessageEnabled,
      })

      // Refresh auth to get updated business data
      await mutateAuth()

      setSuccess("Settings saved successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      console.error("Failed to save settings:", error)
      setSuccess("") // Clear success message
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Business Tools</h2>
        <p className="text-sm text-muted-foreground">Automate and enhance your customer service</p>
      </div>

      {success && (
        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400 text-sm">
          {success}
        </div>
      )}

      {/* Away Message */}
      <div className="space-y-4 p-4 bg-secondary/50 rounded-lg border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaCommentDots className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold">Away Message</h3>
              <p className="text-sm text-muted-foreground">
                Automatically send a message when you're away
              </p>
            </div>
          </div>
          <button
            onClick={() => setAwayMessageEnabled(!awayMessageEnabled)}
            className="text-2xl text-primary"
          >
            {awayMessageEnabled ? <FaToggleOn /> : <FaToggleOff />}
          </button>
        </div>

        {awayMessageEnabled && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Away Message</label>
            <textarea
              value={awayMessage}
              onChange={(e) => setAwayMessage(e.target.value)}
              placeholder="E.g., Thanks for your message! I'm currently away and will respond as soon as possible."
              rows={4}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        )}
      </div>

      {/* AI Automation */}
      <div className="space-y-4 p-4 bg-secondary/50 rounded-lg border border-border opacity-75">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaRobot className="w-5 h-5 text-primary" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">AI Automation</h3>
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                  Coming Soon
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Let AI handle common questions automatically
              </p>
            </div>
          </div>
          <button
            disabled
            className="text-2xl text-primary opacity-50 cursor-not-allowed"
            title="Coming soon"
          >
            <FaToggleOff />
          </button>
        </div>

        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-muted-foreground">
            AI automation will automatically respond to common customer inquiries based on your business information. This feature is coming soon!
          </p>
        </div>
      </div>

      <Button
        onClick={handleSave}
        className="w-full"
        disabled={saving}
      >
        {saving ? (
          <>
            <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <FaSave className="w-4 h-4 mr-2" />
            Save Settings
          </>
        )}
      </Button>
    </div>
  )
}

// Memoize to prevent unnecessary re-renders
export const BusinessToolsTab = memo(BusinessToolsTabComponent)


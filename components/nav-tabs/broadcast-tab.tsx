"use client"

import { memo, useState } from "react"
import { FaBullhorn, FaPaperPlane, FaUsers, FaCheckCircle, FaExclamationCircle, FaSpinner } from "react-icons/fa"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/lib/hooks/use-auth"
import { useConversations } from "@/lib/hooks/use-conversations"
import { toast } from "sonner"

function BroadcastTabComponent() {
  const { user } = useAuth()
  const { conversations, isLoading: isLoadingConversations } = useConversations(user?.business?.id)
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    sentCount: number
    totalCount: number
    failures: number
    message: string
  } | null>(null)

  const conversationCount = conversations.length
  const hasMessage = message.trim().length > 0

  const handleSendBroadcast = async () => {
    if (!hasMessage || isSending) return

    setIsSending(true)
    setResult(null)

    try {
      const response = await fetch("/api/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send broadcast")
      }

      setResult({
        success: true,
        sentCount: data.sentCount,
        totalCount: data.totalCount,
        failures: data.failures || 0,
        message: data.message || "Broadcast sent successfully",
      })

      toast.success("Broadcast sent successfully!", {
        description: `Sent to ${data.sentCount} out of ${data.totalCount} conversations`,
      })

      // Clear message after successful send
      setMessage("")
    } catch (error: any) {
      console.error("Error sending broadcast:", error)
      setResult({
        success: false,
        sentCount: 0,
        totalCount: conversationCount,
        failures: 0,
        message: error.message || "Failed to send broadcast",
      })
      toast.error("Failed to send broadcast", {
        description: error.message || "Please try again later",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <FaBullhorn className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Broadcast Message</h2>
            <p className="text-muted-foreground">
              Send a message to all your clients at once
            </p>
          </div>
        </div>

        {/* Conversation Count Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-sm">
              <FaUsers className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">
                {isLoadingConversations ? (
                  "Loading conversations..."
                ) : (
                  <>
                    This message will be sent to{" "}
                    <span className="font-semibold text-foreground">
                      {conversationCount} conversation{conversationCount !== 1 ? "s" : ""}
                    </span>
                  </>
                )}
              </span>
            </div>
            {conversationCount === 0 && (
              <Alert variant="default" className="mt-4">
                <FaExclamationCircle className="h-4 w-4" />
                <AlertTitle>No conversations found</AlertTitle>
                <AlertDescription>
                  You need to have at least one conversation to send a broadcast.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Message Input Card */}
        <Card>
          <CardHeader>
            <CardTitle>Compose Broadcast Message</CardTitle>
            <CardDescription>
              Write your message below. It will be sent to all your active conversations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your broadcast message here..."
              rows={8}
              disabled={isSending || conversationCount === 0 || isLoadingConversations}
              className="resize-none"
            />
            <div className="mt-2 text-xs text-muted-foreground text-right">
              {message.length} characters
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {conversationCount > 0
                ? `${conversationCount} recipient${conversationCount !== 1 ? "s" : ""} will receive this message`
                : "No recipients available"}
            </div>
            <Button
              onClick={handleSendBroadcast}
              disabled={!hasMessage || isSending || conversationCount === 0}
              className="gap-2"
            >
              {isSending ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="w-4 h-4" />
                  Send Broadcast
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Result Alert */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant={result.success ? "default" : "destructive"}>
              {result.success ? (
                <FaCheckCircle className="h-4 w-4" />
              ) : (
                <FaExclamationCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {result.success ? "Broadcast Sent" : "Broadcast Failed"}
              </AlertTitle>
              <AlertDescription>
                {result.message}
                {result.success && result.failures > 0 && (
                  <span className="block mt-1">
                    Note: {result.failures} message{result.failures !== 1 ? "s" : ""} failed to send.
                  </span>
                )}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

// Memoize to prevent unnecessary re-renders
export const BroadcastTab = memo(BroadcastTabComponent)


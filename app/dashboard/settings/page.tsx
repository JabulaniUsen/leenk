"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { storage } from "@/lib/storage"
import { uploadBusinessLogo, deleteBusinessLogo } from "@/lib/storage-upload"
import Link from "next/link"
import { ChevronLeft, Camera, User, Copy, Check } from "lucide-react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuthStore } from "@/lib/stores/auth-store"
import type { Business } from "@/lib/types"

export default function SettingsPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { user, loading: authLoading, initialized, loadAuth, updateBusiness } = useAuthStore()
  const [businessName, setBusinessName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [online, setOnline] = useState(true)
  const [profilePicture, setProfilePicture] = useState<string>("")
  const [uploadingImage, setUploadingImage] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [copied, setCopied] = useState(false)

  // Helper function to check if onboarding is complete
  const isOnboardingComplete = (business: Business | undefined): boolean => {
    if (!business) return false
    return !!(business.businessName && business.phone && business.address)
  }

  useEffect(() => {
    if (!initialized) {
      loadAuth().then((authUser) => {
        if (!authUser) {
          router.push("/login")
        } else if (!isOnboardingComplete(authUser.business)) {
          router.push("/onboarding")
        }
      })
    } else if (user?.business) {
      // Check if onboarding is complete
      if (!isOnboardingComplete(user.business)) {
        router.push("/onboarding")
        return
      }
      
      setBusinessName(user.business.businessName)
      setPhone(user.business.phone)
      setAddress(user.business.address)
      setOnline(user.business.online)
      setProfilePicture(user.business.businessLogo || "")
    } else if (!user) {
      router.push("/login")
    }
  }, [initialized, user, loadAuth, router])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setSaving(true)

    try {
      if (!user?.business) return

      await storage.updateBusiness(user.business.id, {
        businessName,
        phone,
        address,
        online,
        businessLogo: profilePicture || undefined,
      })

      const updated = await storage.getBusinessById(user.business.id)
      if (updated) {
        updateBusiness(updated)
        setSuccess("Settings saved successfully!")
        setTimeout(() => setSuccess(""), 3000)
      }
    } catch (err) {
      setError("Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user?.business) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB")
      return
    }

    setUploadingImage(true)
    setError("")

    try {
      // Delete old image if exists
      if (profilePicture) {
        await deleteBusinessLogo(profilePicture)
      }

      // Upload new image to business_logo bucket
      const imageUrl = await uploadBusinessLogo(file, user.business.id)
      setProfilePicture(imageUrl)
      setSuccess("Profile picture updated!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err: any) {
      setError(err.message || "Failed to upload image")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleRemoveImage = async () => {
    if (!profilePicture || !user?.business) return

    try {
      await deleteBusinessLogo(profilePicture)
      setProfilePicture("")
      setSuccess("Profile picture removed!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      console.error("Failed to remove image:", err)
    }
  }

  const handleCopyLink = async () => {
    if (!user?.business?.phone) return

    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    const chatUrl = `${baseUrl}/chat/${user.business.phone}`

    try {
      await navigator.clipboard.writeText(chatUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const loading = authLoading || !initialized

  if (loading || !user?.business) {
    return (
      <main className="min-h-screen bg-background md:bg-gradient-to-br md:from-background md:via-card md:to-background">
        <div className="max-w-2xl mx-auto p-4 md:p-6">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="bg-card rounded-xl border border-border p-4 md:p-8 shadow-lg">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64 mb-8" />
            <div className="space-y-6">
              <div className="flex flex-col items-center mb-6 md:mb-8 pb-6 md:pb-8 border-b border-border">
                <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4" />
                <Skeleton className="h-10 w-32" />
              </div>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background md:bg-gradient-to-br md:from-background md:via-card md:to-background">
      <div className="max-w-2xl mx-auto p-4 md:p-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/dashboard" className="inline-block mb-4 md:mb-8">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>

          <div className="bg-card rounded-xl border border-border p-4 md:p-8 shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Business Settings</h1>
            <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">Manage your business profile and preferences</p>

            <form onSubmit={handleSave} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 md:p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-700 dark:text-green-400 text-sm"
                >
                  {success}
                </motion.div>
              )}

              {/* Profile Picture Section */}
              <div className="flex flex-col items-center mb-6 md:mb-8 pb-6 md:pb-8 border-b border-border">
                <div className="relative group">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
                    {profilePicture ? (
                      <Image
                        src={profilePicture}
                        alt="Business logo"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                    aria-label="Upload profile picture"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  {uploadingImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <div className="mt-4 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                  >
                    {profilePicture ? "Change" : "Upload"} Photo
                  </Button>
                  {profilePicture && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveImage}
                      disabled={uploadingImage}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={online}
                    onChange={(e) => setOnline(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Online Status</span>
                </label>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    online ? "bg-green-500/20 text-green-700 dark:text-green-400" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {online ? "Online" : "Offline"}
                </span>
              </div>

              <Button type="submit" disabled={saving || uploadingImage} className="w-full">
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </form>

            {/* Share Link Section */}
            {user?.business?.phone && (
              <div className="mt-8 pt-8 border-t border-border">
                <h2 className="text-lg font-semibold mb-2">Share Chat Link</h2>
                <p className="text-sm text-muted-foreground mb-4">Share this link with customers to start conversations:</p>
                <div className="flex gap-2">
                  <code className="flex-1 text-xs bg-input p-3 rounded block truncate text-foreground">
                    {typeof window !== "undefined" ? `${window.location.origin}/chat/${user.business.phone}` : `/chat/${user.business.phone}`}
                  </code>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    className="shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  )
}

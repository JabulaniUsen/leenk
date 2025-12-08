"use client"

import { useState, useEffect, useRef, memo } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/hooks/use-auth"
import { storage } from "@/lib/storage"
import { uploadBusinessLogo, deleteBusinessLogo } from "@/lib/storage-upload"
import { Avatar } from "@/components/avatar"
import { FaCamera, FaUser, FaPhone, FaMapMarkerAlt, FaSave, FaSpinner, FaLink, FaCopy, FaCheck } from "react-icons/fa"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

function ProfileTabComponent() {
  const { user, isLoading, mutate: mutateAuth } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [businessName, setBusinessName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [profilePicture, setProfilePicture] = useState<string>("")
  const [uploadingImage, setUploadingImage] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [copied, setCopied] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (user?.business && !initialized) {
      setBusinessName(user.business.businessName || "")
      setPhone(user.business.phone || "")
      setAddress(user.business.address || "")
      setProfilePicture(user.business.businessLogo || "")
      setInitialized(true)
    }
  }, [user, initialized])

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB")
      return
    }

    setUploadingImage(true)
    setError("")

    try {
      const imageUrl = await uploadBusinessLogo(file, user?.business?.id || "")
      setProfilePicture(imageUrl)
      setSuccess("Profile picture updated!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to upload image")
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveImage = async () => {
    if (!user?.business?.businessLogo) return

    try {
      await deleteBusinessLogo(user.business.businessLogo)
      setProfilePicture("")
      setSuccess("Profile picture removed!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to remove image")
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
      setError("Failed to copy link")
    }
  }

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
        businessLogo: profilePicture || undefined,
      })

      await mutateAuth()
      setSuccess("Profile updated successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to save profile")
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-32 w-32 rounded-full mx-auto" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Profile</h2>
        <p className="text-sm text-muted-foreground">Manage your business profile information</p>
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Avatar
            src={profilePicture}
            name={businessName}
            size="xl"
            className="w-32 h-32"
          />
          {uploadingImage && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
              <FaSpinner className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingImage}
          >
            <FaCamera className="w-4 h-4 mr-2" />
            {profilePicture ? "Change" : "Upload"}
          </Button>
          {profilePicture && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemoveImage}
              disabled={uploadingImage}
            >
              Remove
            </Button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-4">
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400 text-sm">
            {success}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FaUser className="w-4 h-4" />
            Business Name
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FaPhone className="w-4 h-4" />
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FaMapMarkerAlt className="w-4 h-4" />
            Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            required
          />
        </div>

        {/* Chat URL */}
        {user?.business?.phone && (
          <div className="space-y-2 p-4 bg-secondary/50 rounded-lg border border-border">
            <label className="text-sm font-medium flex items-center gap-2">
              <FaLink className="w-4 h-4" />
              Chat Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={typeof window !== "undefined" ? `${window.location.origin}/chat/${user.business.phone}` : ""}
                readOnly
                className="flex-1 px-4 py-2 bg-input border border-border rounded-lg text-sm text-muted-foreground"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleCopyLink}
                className="flex-shrink-0"
              >
                {copied ? (
                  <>
                    <FaCheck className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <FaCopy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Share this link with your customers to start chatting with them
            </p>
          </div>
        )}

        <Button
          type="submit"
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
              Save Changes
            </>
          )}
        </Button>
      </form>
    </div>
  )
}

// Memoize to prevent unnecessary re-renders
export const ProfileTab = memo(ProfileTabComponent)


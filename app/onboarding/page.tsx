"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { storage } from "@/lib/storage"
import type { AuthUser } from "@/lib/types"

export default function OnboardingPage() {
  const router = useRouter()
  const [auth, setAuth] = useState<AuthUser | null>(null)
  const [businessName, setBusinessName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadAuth = async () => {
      const authUser = await storage.getAuth()
      if (!authUser) {
        router.push("/login")
      } else {
        setAuth(authUser)
      }
    }
    loadAuth()
  }, [router])

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!businessName || !phone || !address) {
        setError("All fields are required")
        setLoading(false)
        return
      }

      // Check if phone is already in use by another business
      const existingBusiness = await storage.getBusinessByPhone(phone)
      if (existingBusiness && existingBusiness.id !== auth?.id) {
        setError("Phone number already in use")
        setLoading(false)
        return
      }

      if (auth?.business) {
        await storage.updateBusiness(auth.business.id, {
          businessName,
          phone,
          address,
        })

        const updated = await storage.getBusinessById(auth.business.id)
        if (updated) {
          setAuth({ ...auth, business: updated })
        }

        router.push("/dashboard")
      }
    } catch (err) {
      setError("Failed to complete onboarding")
      setLoading(false)
    }
  }

  if (!auth) return null

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Complete Your Profile</h1>
            <p className="text-muted-foreground">Tell us about your business</p>
          </div>

          <form onSubmit={handleComplete} className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm"
              >
                {error}
              </motion.div>
            )}

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
                placeholder="+1234567890"
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

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Completing..." : "Complete Setup"}
            </Button>
          </form>
        </div>
      </motion.div>
    </main>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { storage } from "@/lib/storage"
import type { AuthUser } from "@/lib/types"
import Image from "next/image"
import { Building2, Phone, MapPin, Loader2, AlertCircle } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth-store"

// Helper function to check if onboarding is complete
function isOnboardingComplete(business: AuthUser["business"] | null | undefined): boolean {
  if (!business) return false
  return !!(business.businessName && business.phone && business.address)
}

export default function OnboardingPage() {
  const router = useRouter()
  const { user, loadAuth } = useAuthStore()
  const [businessName, setBusinessName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    const initialize = async () => {
      const authUser = await loadAuth()
      if (!authUser) {
        router.push("/login")
        return
      }

      // If onboarding is already complete, redirect to dashboard
      if (isOnboardingComplete(authUser.business)) {
        router.push("/dashboard")
        return
      }

      // Pre-fill form with existing data if available
      if (authUser.business) {
        setBusinessName(authUser.business.businessName || "")
        setPhone(authUser.business.phone || "")
        setAddress(authUser.business.address || "")
      }

      setInitializing(false)
    }
    initialize()
  }, [router, loadAuth])

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validate all fields
      if (!businessName.trim()) {
        setError("Business name is required")
        setLoading(false)
        return
      }

      if (!phone.trim()) {
        setError("Phone number is required")
        setLoading(false)
        return
      }

      if (!address.trim()) {
        setError("Address is required")
        setLoading(false)
        return
      }

      // Validate phone format (basic check)
      const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/
      if (!phoneRegex.test(phone.trim())) {
        setError("Please enter a valid phone number")
        setLoading(false)
        return
      }

      if (!user?.business) {
        setError("User account not found. Please try logging in again.")
        setLoading(false)
        return
      }

      // Check if phone is already in use by another business
      const existingBusiness = await storage.getBusinessByPhone(phone.trim())
      if (existingBusiness && existingBusiness.id !== user.id) {
        setError("This phone number is already in use by another business")
        setLoading(false)
        return
      }

      // Update business with all required information
      await storage.updateBusiness(user.business.id, {
        businessName: businessName.trim(),
        phone: phone.trim(),
        address: address.trim(),
      })

      // Reload auth to get updated business data
      await loadAuth()

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      console.error("Error completing onboarding:", err)
      setError(err instanceof Error ? err.message : "Failed to complete setup. Please try again.")
      setLoading(false)
    }
  }

  if (initializing) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </div>
      </main>
    )
  }

  if (!user) return null

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 p-6 text-center border-b border-slate-200 dark:border-slate-800">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center mb-4"
            >
              <Image 
                src="/logo.png" 
                alt="Leenk" 
                width={80} 
                height={80} 
                className="object-contain drop-shadow-lg" 
              />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-slate-900 dark:text-white mb-2"
            >
              Complete Your Business Profile
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-slate-600 dark:text-slate-400"
            >
              Tell us about your business to get started
            </motion.p>
          </div>

          {/* Form Section */}
          <div className="p-6 md:p-8">
            <form onSubmit={handleComplete} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Business Name Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => {
                      setBusinessName(e.target.value)
                      setError("")
                    }}
                    placeholder="Your Business Name"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 pl-11 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Phone Number Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      setError("")
                    }}
                    placeholder="+1234567890"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 pl-11 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  This will be used for your public chat link
                </p>
              </div>

              {/* Address Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Business Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value)
                      setError("")
                    }}
                    placeholder="123 Main St, City, State, ZIP"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 pl-11 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                disabled={loading || !businessName.trim() || !phone.trim() || !address.trim()}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Completing Setup...
                  </span>
                ) : (
                  <span>Complete Setup</span>
                )}
              </Button>
            </form>

            {/* Footer Note */}
            <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-6">
              All fields are required to complete your business profile
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  )
}

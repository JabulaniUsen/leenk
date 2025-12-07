"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { storage } from "@/lib/storage"
import { useAuth } from "@/lib/hooks/use-auth"
import type { AuthUser } from "@/lib/types"
import Image from "next/image"
import { FaBuilding, FaMapMarkerAlt, FaSpinner, FaExclamationCircle } from "react-icons/fa"
import { FiPhone } from "react-icons/fi"

// Helper function to check if onboarding is complete
function isOnboardingComplete(business: AuthUser["business"] | null | undefined): boolean {
  if (!business) return false
  return !!(business.businessName && business.phone && business.address)
}

export default function OnboardingPage() {
  const router = useRouter()
  const { user, isLoading: authLoading, mutate: mutateAuth } = useAuth()
  const [businessName, setBusinessName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
        router.push("/login")
        return
      }

    if (!authLoading && user) {
      // If onboarding is already complete, redirect to dashboard
      if (isOnboardingComplete(user.business)) {
        router.push("/dashboard")
        return
      }

      // Pre-fill form with existing data if available
      if (user.business && !initialized) {
        setBusinessName(user.business.businessName || "")
        setPhone(user.business.phone || "")
        setAddress(user.business.address || "")
        setInitialized(true)
    }
    }
  }, [authLoading, user, router, initialized])

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
      console.log("Updating business with:", {
        businessName: businessName.trim(),
        phone: phone.trim(),
        address: address.trim(),
      })

      const updatedBusiness = await storage.updateBusiness(user.business.id, {
        businessName: businessName.trim(),
        phone: phone.trim(),
        address: address.trim(),
      })

      console.log("Update result:", updatedBusiness)

      if (!updatedBusiness) {
        throw new Error("Failed to update business details. Please try again.")
      }

      // Verify the update was successful by checking the returned data
      if (!updatedBusiness.businessName || !updatedBusiness.phone || !updatedBusiness.address) {
        console.error("Update verification failed:", updatedBusiness)
        throw new Error("Business details were not saved correctly. Please try again.")
      }

      console.log("Update verified successfully, refreshing cache...")

      // Invalidate and refresh auth cache to get updated business data
      await mutateAuth()

      // Wait a moment for the cache to update
      await new Promise(resolve => setTimeout(resolve, 200))
      
      // Verify the cache was updated before redirecting
      const refreshedUser = await storage.getAuth()
      console.log("Refreshed user after update:", refreshedUser)
      
      if (refreshedUser && isOnboardingComplete(refreshedUser.business)) {
        console.log("Onboarding complete, redirecting to dashboard")
        router.push("/dashboard")
      } else {
        console.warn("Onboarding not complete after update, forcing refresh...")
        // Force another refresh
        await mutateAuth()
        // Redirect anyway - the dashboard will handle the check
      router.push("/dashboard")
      }
    } catch (err) {
      console.error("Error completing onboarding:", err)
      setError(err instanceof Error ? err.message : "Failed to complete setup. Please try again.")
      setLoading(false)
    }
  }

  if (authLoading || !initialized) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <FaSpinner className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </div>
      </main>
    )
  }

  if (!user) {
    return null
  }

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
                  <FaExclamationCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Business Name Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
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
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
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
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
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
                    <FaSpinner className="w-4 h-4 animate-spin" />
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

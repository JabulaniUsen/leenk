"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaComments, FaBolt, FaUsers, FaLock, FaCheck } from "react-icons/fa"
import Image from "next/image"
import { useState, useEffect } from "react"

// African countries that use Naira or similar currencies
const AFRICAN_COUNTRIES = [
  'NG', // Nigeria
  'GH', // Ghana
  'KE', // Kenya
  'ZA', // South Africa
  'EG', // Egypt
  'TZ', // Tanzania
  'UG', // Uganda
  'ET', // Ethiopia
  'MA', // Morocco
  'AO', // Angola
  'SD', // Sudan
  'MZ', // Mozambique
  'MG', // Madagascar
  'CM', // Cameroon
  'CI', // Côte d'Ivoire
  'NE', // Niger
  'BF', // Burkina Faso
  'ML', // Mali
  'MW', // Malawi
  'ZM', // Zambia
  'SN', // Senegal
  'TD', // Chad
  'SO', // Somalia
  'ZW', // Zimbabwe
  'GN', // Guinea
  'RW', // Rwanda
  'BJ', // Benin
  'BI', // Burundi
  'TN', // Tunisia
  'TG', // Togo
  'ER', // Eritrea
  'SL', // Sierra Leone
  'LY', // Libya
  'LR', // Liberia
  'CG', // Republic of the Congo
  'CF', // Central African Republic
  'MR', // Mauritania
  'SS', // South Sudan
  'GM', // Gambia
  'BW', // Botswana
  'GA', // Gabon
  'LS', // Lesotho
  'GW', // Guinea-Bissau
  'EQ', // Equatorial Guinea
  'MU', // Mauritius
  'DJ', // Djibouti
  'RE', // Réunion
  'KM', // Comoros
  'EH', // Western Sahara
  'SH', // Saint Helena
  'SC', // Seychelles
  'CV', // Cape Verde
  'ST', // São Tomé and Príncipe
]

export default function Home() {
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('USD')

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return
    
    try {
      // Try to detect user's country from timezone or browser
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const isAfrican = AFRICAN_COUNTRIES.some(country => 
        timezone.includes(country) || navigator.language.includes(country.toLowerCase())
      )
      
      // Check if browser language suggests African country
      const lang = navigator.language.toLowerCase()
      const isAfricanLang = lang.includes('ng') || lang.includes('gh') || lang.includes('ke')
      
      if (isAfrican || isAfricanLang) {
        setCurrency('NGN')
      }
    } catch (error) {
      // Silently fail if timezone/language detection fails
      console.warn("Failed to detect currency preference:", error)
    }
  }, [])

  const features = [
    {
      icon: FaComments,
      title: "Instant Messaging",
      description: "Real-time chat with customers powered by fast, reliable messaging",
    },
    {
      icon: FaBolt,
      title: "Lightning Fast",
      description: "Optimized for speed with instant message delivery and read receipts",
    },
    {
      icon: FaUsers,
      title: "Customer Focused",
      description: "Public chat links for easy customer access without login",
    },
    {
      icon: FaLock,
      title: "Secure",
      description: "Your business data stays private with encrypted conversations",
    },
  ]

  const pricingPlans = [
    {
      name: "Monthly",
      priceNGN: "N9,000",
      priceUSD: "$20",
      period: "per month",
      popular: false,
    },
    {
      name: "6 Months",
      priceNGN: "N52,000",
      priceUSD: "$90",
      period: "per 6 months",
      popular: true,
      savings: currency === 'NGN' ? "Save N2,000" : "Save $30",
    },
    {
      name: "Yearly",
      priceNGN: "N100,000",
      priceUSD: "$200",
      period: "per year",
      popular: false,
      savings: currency === 'NGN' ? "Save N8,000" : "Save $40",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-card/80 backdrop-blur-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center">
            <Image src="/logo.png" alt="Leenk" width={100} height={100} className="object-contain" />
          </motion.div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
            Connect with Your Customers Instantly
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Leenk is a modern, WhatsApp-like messaging platform designed for businesses to communicate with customers in
            real-time. Fast, simple, and reliable.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link href="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-card border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16"
          >
            Why Choose Leenk?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <Icon className="w-8 h-8 text-primary mb-4" size={32} />
                  <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-card border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground mb-12"
          >
            Choose the plan that works best for your business
          </motion.p>

          {/* Currency Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-border p-1 bg-muted">
              <button
                onClick={() => setCurrency('NGN')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currency === 'NGN'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Naira (₦)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currency === 'USD'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-xl border-2 p-8 ${
                  plan.popular
                    ? 'border-primary bg-primary/5 scale-105'
                    : 'border-border hover:border-primary/50'
                } transition-all`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">
                      {currency === 'NGN' ? plan.priceNGN : plan.priceUSD}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.period}</p>
                  {plan.savings && (
                    <p className="text-sm text-primary font-medium mt-2">{plan.savings}</p>
                  )}
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <FaCheck className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Unlimited conversations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Real-time messaging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Image sharing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Message replies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">Read receipts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">24/7 support</span>
                  </li>
                </ul>
                <Link href="/signup" className="block">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary text-primary-foreground rounded-xl p-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Connect?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Create your business account today and start chatting with customers in minutes.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary">
              Start Your Free Account
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { MessageCircle, Zap, Lock, Users } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const features = [
    {
      icon: MessageCircle,
      title: "Instant Messaging",
      description: "Real-time chat with customers powered by fast, reliable messaging",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with instant message delivery and read receipts",
    },
    {
      icon: Users,
      title: "Customer Focused",
      description: "Public chat links for easy customer access without login",
    },
    {
      icon: Lock,
      title: "Secure",
      description: "Your business data stays private with encrypted conversations",
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
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
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

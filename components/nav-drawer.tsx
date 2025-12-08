"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FaTimes, FaUser, FaCog, FaUsers, FaBullhorn, FaTools, FaSignOutAlt } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { storage } from "@/lib/storage"
import { useAuth } from "@/lib/hooks/use-auth"
import { Avatar } from "@/components/avatar"
import { NavContent } from "@/components/nav-content"

interface NavDrawerProps {
  isOpen: boolean
  onClose: () => void
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function NavDrawer({ isOpen, onClose, activeTab = "profile", onTabChange }: NavDrawerProps) {
  const router = useRouter()
  const { user, mutate: mutateAuth } = useAuth()
  const [selectedTab, setSelectedTab] = useState(activeTab)

  useEffect(() => {
    setSelectedTab(activeTab)
  }, [activeTab])

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab)
    onTabChange?.(tab)
  }

  const handleLogout = async () => {
    await storage.clearAuth()
    mutateAuth(null, false)
    router.push("/")
    onClose()
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "settings", label: "Settings", icon: FaCog },
    { id: "clients", label: "Clients", icon: FaUsers },
    { id: "broadcast", label: "Broadcast Message", icon: FaBullhorn },
    { id: "tools", label: "Business Tools", icon: FaTools },
  ]

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:bg-black/30"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-card border-l border-border z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-card flex-shrink-0">
              <div className="flex items-center gap-3">
                {user && (
                  <>
                    <Avatar 
                      src={user.business?.businessLogo} 
                      name={user.business?.businessName} 
                      size="md"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{user.business?.businessName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="ml-auto"
                aria-label="Close menu"
              >
                <FaTimes className="w-5 h-5" />
              </Button>
            </div>

            {/* Navigation Tabs - Horizontal */}
            <div className="border-b border-border overflow-x-auto flex-shrink-0">
              <nav className="flex px-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = selectedTab === tab.id
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-colors relative whitespace-nowrap ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{tab.label}</span>
                      {tab.id === "broadcast" && (
                        <span className="ml-1 text-xs bg-primary-foreground/20 px-1.5 py-0.5 rounded">
                          Soon
                        </span>
                      )}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-foreground"
                        />
                      )}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              <NavContent activeTab={selectedTab} />
            </div>

            {/* Footer - Logout */}
            <div className="p-4 border-t border-border flex-shrink-0">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-destructive hover:bg-destructive/10"
              >
                <FaSignOutAlt className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


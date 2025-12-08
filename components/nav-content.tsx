"use client"

import { ProfileTab } from "@/components/nav-tabs/profile-tab"
import { SettingsTab } from "@/components/nav-tabs/settings-tab"
import { ClientsTab } from "@/components/nav-tabs/clients-tab"
import { BroadcastTab } from "@/components/nav-tabs/broadcast-tab"
import { BusinessToolsTab } from "@/components/nav-tabs/business-tools-tab"

interface NavContentProps {
  activeTab: string
}

export function NavContent({ activeTab }: NavContentProps) {
  // Keep all tabs mounted but only show the active one
  // This prevents remounting and re-fetching data when switching tabs
  return (
    <div className="relative h-full">
      <div className={activeTab === "profile" ? "block" : "hidden"}>
        <ProfileTab />
      </div>
      <div className={activeTab === "settings" ? "block" : "hidden"}>
        <SettingsTab />
      </div>
      <div className={activeTab === "clients" ? "block" : "hidden"}>
        <ClientsTab />
      </div>
      <div className={activeTab === "broadcast" ? "block" : "hidden"}>
        <BroadcastTab />
      </div>
      <div className={activeTab === "tools" ? "block" : "hidden"}>
        <BusinessToolsTab />
      </div>
    </div>
  )
}


"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { FaUsers, FaComments, FaDatabase, FaSpinner, FaLock } from "react-icons/fa"
import { RefreshCcw } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { egressMonitor } from "@/lib/egress-monitor"

interface Business {
  id: string
  email: string
  business_name: string | null
  phone: string | null
  address: string | null
  online: boolean | null
  is_admin: boolean | null
  created_at: string
  updated_at: string
}

interface Conversation {
  id: string
  business_id: string
  customer_email: string
  customer_name: string | null
  customer_phone: string | null
  created_at: string
  updated_at: string
  pinned: boolean | null
}

interface AdminStats {
  businesses: Business[]
  conversations: Conversation[]
  stats: {
    businessCount: number
    conversationCount: number
    messageCount: number
  }
}

export default function AdminDashboard() {
  const router = useRouter()
  const [data, setData] = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"users" | "conversations" | "egress">("users")

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch("/api/admin/check")
        const result = await response.json()
        
        if (result.isAdmin) {
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            router.push("/dashboard")
          }, 2000)
        }
      } catch (err) {
        setIsAuthorized(false)
        setError("Failed to verify admin access")
      } finally {
        setIsCheckingAuth(false)
      }
    }
    
    checkAdmin()
  }, [router])

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/stats")
      if (!response.ok) throw new Error("Failed to fetch admin data")
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setIsLoading(false)
    }
  }

  // Get egress metrics from client-side monitor
  const getEgressData = () => {
    const metrics = egressMonitor.getMetrics()
    return {
      totalBytes: metrics.totalBytes,
      totalGB: (metrics.totalBytes / (1024 * 1024 * 1024)).toFixed(2),
      totalMB: (metrics.totalBytes / (1024 * 1024)).toFixed(2),
      requestCount: metrics.requestCount,
      byEndpoint: metrics.byEndpoint,
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
  }

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  // Show unauthorized message
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="max-w-md text-center space-y-4">
          <FaLock className="w-16 h-16 mx-auto text-destructive opacity-50" />
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You do not have admin privileges to access this page.
          </p>
          <p className="text-sm text-muted-foreground">
            Redirecting to dashboard...
          </p>
          <Button onClick={() => router.push("/dashboard")} variant="outline">
            Go to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading && !data) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
            <p className="text-destructive">Error: {error}</p>
            <Button onClick={fetchData} className="mt-4">
              Retry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage users, conversations, and monitor egress</p>
          </div>
          <Button onClick={fetchData} disabled={isLoading} variant="outline">
            {isLoading ? (
              <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCcw className="w-4 h-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold mt-1">{data.stats.businessCount}</p>
              </div>
              <FaUsers className="w-8 h-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversations</p>
                <p className="text-2xl font-bold mt-1">{data.stats.conversationCount}</p>
              </div>
              <FaComments className="w-8 h-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Messages</p>
                <p className="text-2xl font-bold mt-1">{data.stats.messageCount.toLocaleString()}</p>
              </div>
              <FaDatabase className="w-8 h-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Egress</p>
                <p className="text-2xl font-bold mt-1">{getEgressData().totalGB} GB</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {getEgressData().requestCount.toLocaleString()} requests
                </p>
              </div>
              <FaDatabase className="w-8 h-8 text-primary opacity-50" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("users")}
              className={`pb-3 px-1 border-b-2 transition-colors ${
                activeTab === "users"
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Users ({data.businesses.length})
            </button>
            <button
              onClick={() => setActiveTab("conversations")}
              className={`pb-3 px-1 border-b-2 transition-colors ${
                activeTab === "conversations"
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Conversations ({data.conversations.length})
            </button>
            <button
              onClick={() => setActiveTab("egress")}
              className={`pb-3 px-1 border-b-2 transition-colors ${
                activeTab === "egress"
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Egress Details
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {activeTab === "users" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold">Email</th>
                    <th className="text-left p-4 font-semibold">Business Name</th>
                    <th className="text-left p-4 font-semibold">Phone</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                    <th className="text-left p-4 font-semibold">Admin</th>
                    <th className="text-left p-4 font-semibold">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {data.businesses.map((business) => (
                    <tr key={business.id} className="border-t border-border hover:bg-muted/50">
                      <td className="p-4">{business.email}</td>
                      <td className="p-4">{business.business_name || "-"}</td>
                      <td className="p-4">{business.phone || "-"}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            business.online
                              ? "bg-green-500/10 text-green-500"
                              : "bg-gray-500/10 text-gray-500"
                          }`}
                        >
                          {business.online ? "Online" : "Offline"}
                        </span>
                      </td>
                      <td className="p-4">
                        {business.is_admin ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            Admin
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(business.created_at), { addSuffix: true })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "conversations" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold">Customer Email</th>
                    <th className="text-left p-4 font-semibold">Customer Name</th>
                    <th className="text-left p-4 font-semibold">Business ID</th>
                    <th className="text-left p-4 font-semibold">Pinned</th>
                    <th className="text-left p-4 font-semibold">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {data.conversations.map((conversation) => (
                    <tr key={conversation.id} className="border-t border-border hover:bg-muted/50">
                      <td className="p-4">{conversation.customer_email}</td>
                      <td className="p-4">{conversation.customer_name || "-"}</td>
                      <td className="p-4 font-mono text-xs">{conversation.business_id.slice(0, 8)}...</td>
                      <td className="p-4">
                        {conversation.pinned ? (
                          <span className="text-primary">✓</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "egress" && (() => {
            const egress = getEgressData()
            return (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Total Egress Usage</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Total Data</p>
                      <p className="text-2xl font-bold mt-1">{egress.totalGB} GB</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {egress.totalMB} MB
                      </p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Total Requests</p>
                      <p className="text-2xl font-bold mt-1">{egress.requestCount.toLocaleString()}</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Avg per Request</p>
                      <p className="text-2xl font-bold mt-1">
                        {egress.requestCount > 0
                          ? formatBytes(egress.totalBytes / egress.requestCount)
                          : "0 B"}
                      </p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Endpoints</p>
                      <p className="text-2xl font-bold mt-1">
                        {Object.keys(egress.byEndpoint).length}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Egress by Endpoint</h3>
                  {Object.keys(egress.byEndpoint).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No egress data available yet.</p>
                      <p className="text-sm mt-2">Egress metrics are tracked as you use the application.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-4 font-semibold">Endpoint</th>
                            <th className="text-left p-4 font-semibold">Data Used</th>
                            <th className="text-left p-4 font-semibold">Requests</th>
                            <th className="text-left p-4 font-semibold">Avg per Request</th>
                            <th className="text-left p-4 font-semibold">% of Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(egress.byEndpoint)
                            .sort((a, b) => b[1].bytes - a[1].bytes)
                            .map(([endpoint, stats]) => (
                              <tr key={endpoint} className="border-t border-border hover:bg-muted/50">
                                <td className="p-4 font-mono text-sm">{endpoint}</td>
                                <td className="p-4 font-semibold">{formatBytes(stats.bytes)}</td>
                                <td className="p-4">{stats.count.toLocaleString()}</td>
                                <td className="p-4 text-muted-foreground">
                                  {formatBytes(stats.bytes / stats.count)}
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-muted rounded-full h-2 max-w-[100px]">
                                      <div
                                        className="bg-primary h-2 rounded-full"
                                        style={{
                                          width: `${egress.totalBytes > 0 ? (stats.bytes / egress.totalBytes) * 100 : 0}%`,
                                        }}
                                      />
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      {egress.totalBytes > 0
                                        ? ((stats.bytes / egress.totalBytes) * 100).toFixed(1)
                                        : "0"}%
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )
          })()}
        </div>
      </div>
    </div>
  )
}


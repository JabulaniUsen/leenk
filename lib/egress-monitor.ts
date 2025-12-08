"use client"

// Egress monitoring utility to track data usage
interface EgressMetrics {
  totalBytes: number
  requestCount: number
  lastUpdated: number
  byEndpoint: Record<string, { bytes: number; count: number }>
}

const STORAGE_KEY = "leenk_egress_metrics"
const MAX_STORAGE_SIZE = 100 * 1024 * 1024 // 100MB max storage

class EgressMonitor {
  private metrics: EgressMetrics = {
    totalBytes: 0,
    requestCount: 0,
    lastUpdated: Date.now(),
    byEndpoint: {},
  }

  constructor() {
    this.loadMetrics()
  }

  // Load metrics from localStorage
  private loadMetrics(): void {
    if (typeof window === "undefined") return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        this.metrics = JSON.parse(stored)
      }
    } catch (error) {
      console.error("Error loading egress metrics:", error)
    }
  }

  // Save metrics to localStorage
  private saveMetrics(): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.metrics))
    } catch (error) {
      console.error("Error saving egress metrics:", error)
    }
  }

  // Estimate response size (rough approximation)
  private estimateSize(data: any): number {
    try {
      const jsonString = JSON.stringify(data)
      // Rough estimate: UTF-8 encoding, each character is ~1-4 bytes
      // We'll use a conservative 2 bytes per character
      return jsonString.length * 2
    } catch {
      // Fallback: estimate based on object keys
      return Object.keys(data || {}).length * 100
    }
  }

  // Record a request
  recordRequest(endpoint: string, responseData: any): void {
    const bytes = this.estimateSize(responseData)
    
    this.metrics.totalBytes += bytes
    this.metrics.requestCount += 1
    this.metrics.lastUpdated = Date.now()

    if (!this.metrics.byEndpoint[endpoint]) {
      this.metrics.byEndpoint[endpoint] = { bytes: 0, count: 0 }
    }
    this.metrics.byEndpoint[endpoint].bytes += bytes
    this.metrics.byEndpoint[endpoint].count += 1

    this.saveMetrics()

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log(`📊 Egress: ${this.formatBytes(bytes)} from ${endpoint}`)
    }
  }

  // Get current metrics
  getMetrics(): EgressMetrics {
    return { ...this.metrics }
  }

  // Get formatted summary
  getSummary(): string {
    const mb = this.metrics.totalBytes / (1024 * 1024)
    const gb = mb / 1024
    
    let size: string
    if (gb >= 1) {
      size = `${gb.toFixed(2)} GB`
    } else {
      size = `${mb.toFixed(2)} MB`
    }

    return `Total: ${size} | Requests: ${this.metrics.requestCount}`
  }

  // Format bytes to human readable
  formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
  }

  // Get top endpoints by usage
  getTopEndpoints(limit: number = 5): Array<{ endpoint: string; bytes: number; count: number }> {
    return Object.entries(this.metrics.byEndpoint)
      .map(([endpoint, data]) => ({
        endpoint,
        bytes: data.bytes,
        count: data.count,
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, limit)
  }

  // Reset metrics
  reset(): void {
    this.metrics = {
      totalBytes: 0,
      requestCount: 0,
      lastUpdated: Date.now(),
      byEndpoint: {},
    }
    this.saveMetrics()
  }

  // Get daily usage (approximate)
  getDailyUsage(): number {
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000
    // This is a simplified version - in production you'd track timestamps per request
    // For now, we'll return total if updated in last 24h, otherwise 0
    if (this.metrics.lastUpdated > oneDayAgo) {
      return this.metrics.totalBytes
    }
    return 0
  }
}

// Singleton instance
export const egressMonitor = new EgressMonitor()

// Helper to wrap fetch/API calls
export function monitorRequest(endpoint: string, responseData: any): void {
  egressMonitor.recordRequest(endpoint, responseData)
}


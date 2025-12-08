"use client"

import { useEffect, useState } from "react"
import { egressMonitor } from "@/lib/egress-monitor"

export function EgressMonitorDisplay() {
  const [metrics, setMetrics] = useState(egressMonitor.getMetrics())
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== "development") return

    const interval = setInterval(() => {
      setMetrics(egressMonitor.getMetrics())
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null

  const mb = metrics.totalBytes / (1024 * 1024)
  const gb = mb / 1024
  const size = gb >= 1 ? `${gb.toFixed(2)} GB` : `${mb.toFixed(2)} MB`

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs font-mono shadow-lg hover:bg-primary/90 transition-colors"
        title="Click to toggle egress metrics"
      >
        📊 {size}
      </button>
      {isVisible && (
        <div className="absolute bottom-12 right-0 bg-card border border-border rounded-lg p-4 shadow-xl min-w-[300px] max-w-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Egress Metrics</h3>
            <button
              onClick={() => egressMonitor.reset()}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Reset
            </button>
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-semibold">{size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Requests:</span>
              <span>{metrics.requestCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg/Request:</span>
              <span>
                {metrics.requestCount > 0
                  ? egressMonitor.formatBytes(metrics.totalBytes / metrics.requestCount)
                  : "0 B"}
              </span>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="text-muted-foreground mb-1">Top Endpoints:</div>
              {egressMonitor.getTopEndpoints(3).map((item) => (
                <div key={item.endpoint} className="flex justify-between text-xs">
                  <span className="truncate mr-2">{item.endpoint}</span>
                  <span>{egressMonitor.formatBytes(item.bytes)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


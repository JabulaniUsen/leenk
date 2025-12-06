"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function ConversationSkeleton() {
  return (
    <div className="space-y-0">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="p-3 md:p-4 border-b border-border">
          <div className="flex gap-3 items-start">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-full max-w-xs" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


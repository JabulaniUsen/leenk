"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function HeaderSkeleton() {
  return (
    <div className="p-3 md:p-4 border-b border-border">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  )
}


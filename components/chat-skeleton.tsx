"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function ChatSkeleton() {
  return (
    <div className="space-y-3 p-3 md:p-4">
      {/* Received message */}
      <div className="flex justify-start">
        <div className="max-w-[80%] md:max-w-md">
          <Skeleton className="h-12 w-48 rounded-lg rounded-bl-none" />
        </div>
      </div>
      
      {/* Sent message */}
      <div className="flex justify-end">
        <div className="max-w-[80%] md:max-w-md">
          <Skeleton className="h-12 w-56 rounded-lg rounded-br-none ml-auto" />
        </div>
      </div>
      
      {/* Received message */}
      <div className="flex justify-start">
        <div className="max-w-[80%] md:max-w-md">
          <Skeleton className="h-10 w-32 rounded-lg rounded-bl-none" />
        </div>
      </div>
      
      {/* Sent message */}
      <div className="flex justify-end">
        <div className="max-w-[80%] md:max-w-md">
          <Skeleton className="h-16 w-64 rounded-lg rounded-br-none ml-auto" />
        </div>
      </div>
    </div>
  )
}


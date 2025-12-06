import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/supabase/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessId, online } = body

    if (!businessId || typeof online !== "boolean") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    await db.updateBusiness(businessId, { online })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating online status:", error)
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 })
  }
}


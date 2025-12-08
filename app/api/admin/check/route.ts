import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/lib/supabase/db"

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ isAdmin: false, error: "Not authenticated" }, { status: 401 })
    }

    // Get business data to check admin status
    const business = await db.getBusinessById(user.id)
    
    if (!business) {
      return NextResponse.json({ isAdmin: false, error: "Business not found" }, { status: 404 })
    }

    return NextResponse.json({ 
      isAdmin: business.isAdmin ?? false,
      businessId: business.id 
    })
  } catch (error) {
    console.error("Error checking admin status:", error)
    return NextResponse.json(
      { isAdmin: false, error: "Failed to check admin status" },
      { status: 500 }
    )
  }
}


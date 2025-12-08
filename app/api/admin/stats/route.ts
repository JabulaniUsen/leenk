import { NextResponse } from "next/server"
import { admin } from "@/lib/supabase/admin"

export async function GET() {
  try {
    const [businesses, conversations, businessCount, conversationCount, messageCount] = await Promise.all([
      admin.getAllBusinesses(),
      admin.getAllConversations(),
      admin.getBusinessCount(),
      admin.getConversationCount(),
      admin.getMessageCount(),
    ])

    return NextResponse.json({
      businesses,
      conversations,
      stats: {
        businessCount,
        conversationCount,
        messageCount,
      },
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json(
      { error: "Failed to fetch admin data" },
      { status: 500 }
    )
  }
}


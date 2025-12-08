import { NextRequest, NextResponse } from "next/server"
import { sendMessageNotificationEmail } from "@/lib/email"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { conversationId, messageId } = body

    if (!conversationId || !messageId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get conversation details
    const { data: conversation, error: convError } = await supabase
      .from("conversations")
      .select("*")
      .eq("id", conversationId)
      .maybeSingle() // Use maybeSingle() to handle missing conversations gracefully

    if (convError || !conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 })
    }

    // Get message details
    const { data: message, error: msgError } = await supabase
      .from("messages")
      .select("*")
      .eq("id", messageId)
      .maybeSingle() // Use maybeSingle() to handle missing messages gracefully

    if (msgError || !message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    // Only send email if message is from business
    if (message.sender_type !== "business") {
      return NextResponse.json({ error: "Only business messages trigger emails" }, { status: 400 })
    }

    // Get business details
    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", conversation.business_id)
      .maybeSingle() // Use maybeSingle() to handle missing businesses gracefully

    if (businessError || !business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    // Build chat URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.headers.get("origin") || "http://localhost:3000"
    const chatUrl = `${baseUrl}/chat/${business.phone}`

    // Send email
    await sendMessageNotificationEmail(
      conversation.customer_email,
      conversation.customer_name || undefined,
      business.business_name || business.email,
      message.content || undefined,
      chatUrl
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}


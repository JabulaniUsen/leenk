import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendMessageNotificationEmail } from "@/lib/email"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's business
    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("*")
      .eq("email", user.email)
      .single()

    if (businessError || !business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    const body = await request.json()
    const { message } = body

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Get all conversations for this business
    const { data: conversations, error: conversationsError } = await supabase
      .from("conversations")
      .select("*")
      .eq("business_id", business.id)

    if (conversationsError) {
      console.error("Error fetching conversations:", conversationsError)
      return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 })
    }

    if (!conversations || conversations.length === 0) {
      return NextResponse.json({ 
        error: "No conversations found", 
        sentCount: 0,
        totalCount: 0 
      }, { status: 400 })
    }

    // Create messages for all conversations
    const messagePromises = conversations.map(async (conversation) => {
      const messageId = uuidv4()
      const dbData = {
        id: messageId,
        conversation_id: conversation.id,
        sender_type: "business",
        sender_id: business.id,
        content: message.trim(),
        image_url: null,
        status: "sent",
        reply_to_id: null,
      }

      try {
        // Insert message
        const { data: createdMessage, error: msgError } = await supabase
          .from("messages")
          .insert(dbData)
          .select()
          .single()

        if (msgError) {
          console.error(`Error creating message for conversation ${conversation.id}:`, msgError)
          return { success: false, conversationId: conversation.id, error: msgError.message }
        }

        // Update conversation's updated_at
        await supabase
          .from("conversations")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", conversation.id)

        // Send email notification (fire and forget - don't block on email failures)
        if (conversation.customer_email) {
          try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.headers.get("origin") || "http://localhost:3000"
            const chatUrl = `${baseUrl}/chat/${business.phone}`

            await sendMessageNotificationEmail(
              conversation.customer_email,
              conversation.customer_name || undefined,
              business.business_name || "Business",
              message.trim(),
              chatUrl
            )
          } catch (emailError) {
            console.error(`Failed to send email to ${conversation.customer_email}:`, emailError)
            // Don't fail the broadcast if email fails
          }
        }

        return { success: true, conversationId: conversation.id, messageId }
      } catch (error: any) {
        console.error(`Error processing conversation ${conversation.id}:`, error)
        return { success: false, conversationId: conversation.id, error: error.message }
      }
    })

    // Wait for all messages to be created
    const results = await Promise.all(messagePromises)
    
    const successCount = results.filter(r => r.success).length
    const failureCount = results.filter(r => !r.success).length

    return NextResponse.json({
      success: true,
      sentCount: successCount,
      totalCount: conversations.length,
      failures: failureCount,
      message: `Broadcast sent to ${successCount} out of ${conversations.length} conversations`
    })

  } catch (error: any) {
    console.error("Error sending broadcast:", error)
    return NextResponse.json(
      { error: error.message || "Failed to send broadcast" },
      { status: 500 }
    )
  }
}


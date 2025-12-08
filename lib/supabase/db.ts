import { createClient } from "./client"
import type { Business, Conversation, Message } from "../types"
import { sendAwayMessageIfEnabled } from "../away-message"

// Database types matching the schema
interface DBBusiness {
  id: string
  email: string
  password_hash: string
  business_name: string | null
  phone: string | null
  address: string | null
  business_logo: string | null
  online: boolean | null
  away_message: string | null
  away_message_enabled: boolean | null
  created_at: string
  updated_at: string
}

interface DBConversation {
  id: string
  business_id: string
  customer_phone: string | null
  customer_name: string | null
  customer_email: string
  created_at: string
  updated_at: string
  pinned: boolean | null
}

interface DBMessage {
  id: string
  conversation_id: string
  sender_type: "business" | "customer"
  sender_id: string
  content: string | null
  image_url: string | null
  status: "sent" | "delivered" | "read" | null
  created_at: string
  reply_to_id: string | null
}

// Convert DB Business to App Business
function dbBusinessToApp(db: DBBusiness): Business {
  return {
    id: db.id,
    email: db.email,
    phone: db.phone || "",
    businessName: db.business_name || "",
    businessLogo: db.business_logo || undefined,
    address: db.address || "",
    online: db.online ?? false, // Read actual online status from database
    createdAt: db.created_at,
    awayMessage: db.away_message || undefined,
    awayMessageEnabled: db.away_message_enabled ?? false,
  }
}

// Convert App Business to DB Business
function appBusinessToDB(business: Partial<Business>, passwordHash?: string): Partial<DBBusiness> {
  const dbData: Partial<DBBusiness> = {}
  
  // Only include fields that are actually provided (not undefined)
  if (business.email !== undefined) {
    dbData.email = business.email
  }
  if (passwordHash !== undefined && passwordHash !== "") {
    dbData.password_hash = passwordHash
  }
  if (business.businessName !== undefined) {
    // Convert empty string to null for database
    dbData.business_name = business.businessName.trim() || null
  }
  if (business.phone !== undefined) {
    // Convert empty string to null for database
    dbData.phone = business.phone.trim() || null
  }
  if (business.address !== undefined) {
    // Convert empty string to null for database
    dbData.address = business.address.trim() || null
  }
  if (business.businessLogo !== undefined) {
    dbData.business_logo = business.businessLogo || null
  }
  if (business.awayMessage !== undefined) {
    dbData.away_message = business.awayMessage.trim() || null
  }
  if (business.awayMessageEnabled !== undefined) {
    dbData.away_message_enabled = business.awayMessageEnabled
  }
  
  return dbData
}

// Convert DB Conversation to App Conversation (with messages)
async function dbConversationToApp(
  db: DBConversation,
  messages: DBMessage[] = []
): Promise<Conversation> {
  // Create a map of messages by ID for quick lookup
  const messagesMap = new Map<string, DBMessage>()
  messages.forEach((m) => messagesMap.set(m.id, m))

  // Convert messages and resolve replyTo references
  const appMessages: Message[] = messages.map((m) => {
    const message: Message = {
    id: m.id,
    conversationId: m.conversation_id,
    senderType: m.sender_type,
    senderId: m.sender_id,
    text: m.content || undefined,
    imageUrl: m.image_url || undefined,
    status: (m.status || "sent") as "sent" | "delivered" | "read",
    createdAt: m.created_at,
      replyToId: m.reply_to_id || undefined,
    }

    // If this message is a reply, find and attach the original message
    if (m.reply_to_id) {
      const replyToMessage = messagesMap.get(m.reply_to_id)
      if (replyToMessage) {
        message.replyTo = {
          id: replyToMessage.id,
          conversationId: replyToMessage.conversation_id,
          senderType: replyToMessage.sender_type,
          senderId: replyToMessage.sender_id,
          text: replyToMessage.content || undefined,
          imageUrl: replyToMessage.image_url || undefined,
          status: (replyToMessage.status || "sent") as "sent" | "delivered" | "read",
          createdAt: replyToMessage.created_at,
        }
      }
    }

    return message
  })

  return {
    id: db.id,
    businessId: db.business_id,
    customerEmail: db.customer_email,
    customerName: db.customer_name || undefined,
    createdAt: db.created_at,
    lastMessageAt: db.updated_at,
    messages: appMessages,
    pinned: db.pinned ?? false,
  }
}

// Convert App Conversation to DB Conversation
function appConversationToDB(
  conversation: Partial<Conversation>,
  customerPhone?: string
): Partial<DBConversation> {
  return {
    business_id: conversation.businessId,
    customer_phone: customerPhone || "",
    customer_email: conversation.customerEmail || undefined,
  }
}

// Convert App Message to DB Message
function appMessageToDB(message: Partial<Message>): Partial<DBMessage> {
  return {
    conversation_id: message.conversationId,
    sender_type: message.senderType,
    sender_id: message.senderId || "",
    content: message.text || null,
    image_url: message.imageUrl || null,
    status: message.status || "sent",
    reply_to_id: message.replyToId || null,
  }
}

export const db = {
  // Businesses
  async getBusinessById(id: string): Promise<Business | null> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !data) return null
    return dbBusinessToApp(data as DBBusiness)
  },

  async getBusinessByEmail(email: string): Promise<Business | null> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("email", email)
      .single()

    if (error || !data) return null
    return dbBusinessToApp(data as DBBusiness)
  },

  async getBusinessByPhone(phone: string): Promise<Business | null> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("phone", phone)
      .single()

    if (error || !data) return null
    return dbBusinessToApp(data as DBBusiness)
  },

  async createBusiness(business: Business, passwordHash: string = ""): Promise<Business> {
    const supabase = createClient()
    const dbData: any = {
      id: business.id,
      email: business.email,
      password_hash: passwordHash, // Empty for Supabase Auth, but required by schema
      business_name: business.businessName || null,
      phone: business.phone || null,
      address: business.address || null,
      business_logo: business.businessLogo || null,
    }

    const { data, error } = await supabase.from("businesses").insert(dbData).select().single()

    if (error) throw error
    return dbBusinessToApp(data as DBBusiness)
  },

  async updateBusiness(id: string, updates: Partial<Business>): Promise<Business | null> {
    const supabase = createClient()
    const dbData: any = appBusinessToDB(updates)
    // Make sure to include business_logo if it's being updated
    if (updates.businessLogo !== undefined) {
      dbData.business_logo = updates.businessLogo || null
    }
    
    // Try to include online status if it's being updated
    // If the column doesn't exist yet, we'll skip it and continue with other updates
    if (updates.online !== undefined) {
      // Check if online column exists by trying a test query first
      // For now, we'll include it and let the error be caught if column doesn't exist
      dbData.online = updates.online
    }
    
    const { data, error } = await supabase
      .from("businesses")
      .update(dbData)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      // If error is about missing 'online' column, try again without it
      if (error.message?.includes("online") && error.code === "PGRST204") {
        console.warn("Online column not found, updating without online status. Please run migration 008_add_online_status.sql")
        delete dbData.online
        const { data: retryData, error: retryError } = await supabase
          .from("businesses")
          .update(dbData)
          .eq("id", id)
          .select()
          .single()
        
        if (retryError) {
          console.error("Error updating business:", retryError)
          throw new Error(retryError.message || "Failed to update business")
        }
        if (!retryData) {
          throw new Error("No data returned from update")
        }
        return dbBusinessToApp(retryData as DBBusiness)
      }
      
      console.error("Error updating business:", error)
      throw new Error(error.message || "Failed to update business")
    }
    if (!data) {
      throw new Error("No data returned from update")
    }
    return dbBusinessToApp(data as DBBusiness)
  },

  // Conversations
  async getConversationsByBusinessId(businessId: string): Promise<Conversation[]> {
    const supabase = createClient()
    const { data: conversations, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("business_id", businessId)
      .order("updated_at", { ascending: false })

    if (error || !conversations || conversations.length === 0) return []

    const conversationIds = conversations.map((c) => c.id)
    
    // Optimized: Fetch only last message per conversation + unread count in parallel
    // This is much faster than fetching all messages
    const [lastMessagesResults, unreadCountsResults] = await Promise.all([
      // Fetch only the last message for preview
      Promise.all(
        conversationIds.map(async (conversationId) => {
          const { data: messages } = await supabase
            .from("messages")
            .select("*")
            .eq("conversation_id", conversationId)
            .order("created_at", { ascending: false })
            .limit(1) // Only get the last message for preview
          
          return { 
            conversationId, 
            lastMessage: messages && messages.length > 0 ? messages[0] as DBMessage : null 
          }
        })
      ),
      // Efficiently calculate unread counts using a count query
      Promise.all(
        conversationIds.map(async (conversationId) => {
          const { count, error } = await supabase
            .from("messages")
            .select("*", { count: "exact", head: true })
            .eq("conversation_id", conversationId)
            .eq("sender_type", "customer")
            .in("status", ["sent", "delivered"]) // Unread = sent or delivered from customer
          
          // If count query fails, fallback to fetching and counting
          if (error || count === null) {
            const { data: unreadMessages } = await supabase
              .from("messages")
              .select("id")
              .eq("conversation_id", conversationId)
              .eq("sender_type", "customer")
              .in("status", ["sent", "delivered"])
              .limit(1000) // Safety limit
            
            return { 
              conversationId, 
              unreadCount: unreadMessages?.length || 0 
            }
          }
          
          return { 
            conversationId, 
            unreadCount: count || 0 
          }
        })
      )
    ])

    // Create maps for quick lookup
    const lastMessageMap = new Map<string, DBMessage>()
    const unreadCountMap = new Map<string, number>()
    
    lastMessagesResults.forEach(({ conversationId, lastMessage }) => {
      if (lastMessage) {
        lastMessageMap.set(conversationId, lastMessage)
      }
    })
    
    unreadCountsResults.forEach(({ conversationId, unreadCount }) => {
      unreadCountMap.set(conversationId, unreadCount)
    })

    // Convert to app format - only include last message, not all messages
    return Promise.all(
      conversations.map(async (conv) => {
        const lastMessage = lastMessageMap.get(conv.id)
        const messages = lastMessage ? [lastMessage] : []
        const conversation = await dbConversationToApp(conv as DBConversation, messages)
        // Add unread count to conversation
        conversation.unreadCount = unreadCountMap.get(conv.id) || 0
        return conversation
      })
    )
  },

  async getConversationById(id: string): Promise<Conversation | null> {
    const supabase = createClient()
    const { data: conversation, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !conversation) return null

    // Limit initial message fetch to 100 most recent messages for performance
    const { data: messages } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", id)
      .order("created_at", { ascending: false })
      .limit(100)

    // Reverse to get chronological order (oldest first)
    const sortedMessages = messages ? [...messages].reverse() : []

    return dbConversationToApp(conversation as DBConversation, (sortedMessages as DBMessage[]) || [])
  },

  async getConversationByBusinessAndEmail(
    businessId: string,
    customerEmail: string
  ): Promise<Conversation | null> {
    const supabase = createClient()
    const { data: conversation, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("business_id", businessId)
      .eq("customer_email", customerEmail)
      .single()

    if (error || !conversation) return null

    const { data: messages } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversation.id)
      .order("created_at", { ascending: true })

    return dbConversationToApp(conversation as DBConversation, (messages as DBMessage[]) || [])
  },

  async createConversation(conversation: Conversation): Promise<Conversation> {
    const supabase = createClient()
    const dbData: any = {
      id: conversation.id,
      business_id: conversation.businessId,
      customer_email: conversation.customerEmail,
      customer_name: conversation.customerName || null,
      customer_phone: null, // Phone is optional now
    }

    const { data, error } = await supabase.from("conversations").insert(dbData).select().single()

    if (error) throw error

    // Create messages if any
    if (conversation.messages && conversation.messages.length > 0) {
      const messagesData = conversation.messages.map((m) => ({
        id: m.id,
        conversation_id: m.conversationId,
        sender_type: m.senderType,
        sender_id: m.senderId || conversation.businessId,
        content: m.text || null,
        image_url: m.imageUrl || null,
      }))

      await supabase.from("messages").insert(messagesData)
    }

    return dbConversationToApp(data as DBConversation, [])
  },

  async updateConversation(id: string, updates: Partial<Conversation>): Promise<Conversation | null> {
    const supabase = createClient()
    const dbData: any = {}
    if (updates.customerEmail !== undefined) {
      dbData.customer_email = updates.customerEmail
    }
    if (updates.customerName !== undefined) {
      dbData.customer_name = updates.customerName || null
    }
    if (updates.pinned !== undefined) {
      dbData.pinned = updates.pinned
    }

    const { data, error } = await supabase
      .from("conversations")
      .update(dbData)
      .eq("id", id)
      .select()
      .single()

    if (error || !data) return null

    // Get messages
    const { data: messages } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true })

    return dbConversationToApp(data as DBConversation, (messages as DBMessage[]) || [])
  },

  async updateMessageStatus(id: string, status: "sent" | "delivered" | "read"): Promise<void> {
    const supabase = createClient()
    await supabase.from("messages").update({ status }).eq("id", id)
  },

  async markMessagesAsDelivered(conversationId: string, senderType: "business" | "customer"): Promise<void> {
    const supabase = createClient()
    // Mark all messages from the other sender as delivered
    await supabase
      .from("messages")
      .update({ status: "delivered" })
      .eq("conversation_id", conversationId)
      .eq("sender_type", senderType)
      .in("status", ["sent"])
  },

  async markMessagesAsRead(conversationId: string, senderType: "business" | "customer"): Promise<void> {
    const supabase = createClient()
    // Mark all messages from the other sender as read
    await supabase
      .from("messages")
      .update({ status: "read" })
      .eq("conversation_id", conversationId)
      .eq("sender_type", senderType)
      .in("status", ["sent", "delivered"])
  },

  // Messages
  async createMessage(message: Message): Promise<Message> {
    const supabase = createClient()
    const dbData: any = {
      id: message.id,
      conversation_id: message.conversationId,
      sender_type: message.senderType,
      sender_id: message.senderId || "",
      content: message.text || null,
      image_url: message.imageUrl || null,
      status: message.status || "sent",
      reply_to_id: message.replyToId || null,
    }

    const { data, error } = await supabase.from("messages").insert(dbData).select().single()

    if (error) throw error

    // Update conversation's updated_at
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", message.conversationId)

    // If this is a customer message, trigger away message check (async, don't block)
    if (message.senderType === "customer") {
      // Get business ID from conversation
      const { data: convData } = await supabase
        .from("conversations")
        .select("business_id")
        .eq("id", message.conversationId)
        .single()
      
      if (convData?.business_id) {
        // Send away message asynchronously (fire and forget - don't block message creation)
        sendAwayMessageIfEnabled(message.conversationId, convData.business_id)
          .catch((err) => console.error("Error sending away message:", err))
      }
    }

    return {
      id: data.id,
      conversationId: data.conversation_id,
      senderType: data.sender_type,
      senderId: data.sender_id,
      text: data.content || undefined,
      imageUrl: data.image_url || undefined,
      status: (data.status || "sent") as "sent" | "delivered" | "read",
      createdAt: data.created_at,
      replyToId: data.reply_to_id || undefined,
    }
  },

  async deleteConversation(id: string): Promise<void> {
    const supabase = createClient()
    const { error } = await supabase
      .from("conversations")
      .delete()
      .eq("id", id)

    if (error) throw error
  },
}


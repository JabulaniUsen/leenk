import { createClient } from "./client"
import type { Business, Conversation, Message } from "../types"

// Database types matching the schema
interface DBBusiness {
  id: string
  email: string
  password_hash: string
  business_name: string | null
  phone: string | null
  address: string | null
  business_logo: string | null
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
    online: false, // This would need to be tracked separately or in another table
    createdAt: db.created_at,
  }
}

// Convert App Business to DB Business
function appBusinessToDB(business: Partial<Business>, passwordHash?: string): Partial<DBBusiness> {
  return {
    email: business.email,
    password_hash: passwordHash || "",
    business_name: business.businessName || null,
    phone: business.phone || null,
    address: business.address || null,
    business_logo: business.businessLogo || null,
  }
}

// Convert DB Conversation to App Conversation (with messages)
async function dbConversationToApp(
  db: DBConversation,
  messages: DBMessage[] = []
): Promise<Conversation> {
  const appMessages: Message[] = messages.map((m) => ({
    id: m.id,
    conversationId: m.conversation_id,
    senderType: m.sender_type,
    senderId: m.sender_id,
    text: m.content || undefined,
    imageUrl: m.image_url || undefined,
    status: (m.status || "sent") as "sent" | "delivered" | "read",
    createdAt: m.created_at,
  }))

  return {
    id: db.id,
    businessId: db.business_id,
    customerEmail: db.customer_email,
    customerName: db.customer_name || undefined,
    createdAt: db.created_at,
    lastMessageAt: db.updated_at,
    messages: appMessages,
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
    const { data, error } = await supabase
      .from("businesses")
      .update(dbData)
      .eq("id", id)
      .select()
      .single()

    if (error || !data) return null
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

    // Performance optimization: Only load the last message per conversation
    // For the conversation list view, we only need the most recent message as a preview
    // This dramatically reduces data transfer and improves load times
    const conversationIds = conversations.map((c) => c.id)
    
    // Batch fetch last messages in parallel for better performance
    // Using Promise.all ensures all queries run concurrently
    const lastMessagesPromises = conversationIds.map(async (conversationId) => {
      const { data: messages, error: msgError } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: false })
        .limit(1)
      
      // Return empty array on error (conversation might have no messages yet)
      if (msgError || !messages) return { conversationId, messages: [] }
      return { conversationId, messages: messages as DBMessage[] }
    })

    const lastMessagesResults = await Promise.all(lastMessagesPromises)
    const messagesMap = new Map<string, DBMessage[]>()
    
    lastMessagesResults.forEach(({ conversationId, messages }) => {
      if (messages.length > 0) {
        messagesMap.set(conversationId, messages)
      }
    })

    return Promise.all(
      conversations.map((conv) =>
        dbConversationToApp(conv as DBConversation, messagesMap.get(conv.id) || [])
      )
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

    const { data: messages } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true })

    return dbConversationToApp(conversation as DBConversation, (messages as DBMessage[]) || [])
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
    }

    const { data, error } = await supabase.from("messages").insert(dbData).select().single()

    if (error) throw error

    // Update conversation's updated_at
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", message.conversationId)

    return {
      id: data.id,
      conversationId: data.conversation_id,
      senderType: data.sender_type,
      senderId: data.sender_id,
      text: data.content || undefined,
      imageUrl: data.image_url || undefined,
      status: (data.status || "sent") as "sent" | "delivered" | "read",
      createdAt: data.created_at,
    }
  },
}


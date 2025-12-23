export interface Business {
  id: string
  email: string
  phone: string
  businessName: string
  businessLogo?: string
  address: string
  online: boolean
  createdAt: string
  awayMessage?: string
  awayMessageEnabled?: boolean
  isAdmin?: boolean
}

export interface Conversation {
  id: string
  businessId: string
  customerEmail: string
  customerName?: string
  createdAt: string
  lastMessageAt: string
  messages: Message[]
  unreadCount?: number
  pinned?: boolean
}

export interface Message {
  id: string
  conversationId: string
  senderType: "business" | "customer"
  senderId?: string
  text?: string
  imageUrl?: string
  status: "sent" | "delivered" | "read" // Keep for backward compatibility
  readAt?: string // New: timestamp when message was read (nullable)
  createdAt: string
  replyToId?: string
  replyTo?: Message // The original message being replied to
}

export interface AuthUser {
  id: string
  email: string
  business?: Business
}

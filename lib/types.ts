export interface Business {
  id: string
  email: string
  phone: string
  businessName: string
  businessLogo?: string
  address: string
  online: boolean
  createdAt: string
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
  status: "sent" | "delivered" | "read"
  createdAt: string
  replyToId?: string
  replyTo?: Message // The original message being replied to
}

export interface AuthUser {
  id: string
  email: string
  business?: Business
}

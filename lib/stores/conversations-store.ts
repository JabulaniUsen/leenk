import { create } from "zustand"
import type { Conversation, Message } from "../types"
import { storage } from "../storage"

interface ConversationsState {
  conversations: Conversation[]
  currentConversation: Conversation | null
  loading: boolean
  setConversations: (conversations: Conversation[]) => void
  setCurrentConversation: (conversation: Conversation | null) => void
  loadConversations: (businessId: string) => Promise<void>
  loadConversation: (conversationId: string) => Promise<Conversation | null>
  addMessage: (message: Message) => void
  updateMessage: (messageId: string, updates: Partial<Message>) => void
  removeMessage: (messageId: string) => void
  updateConversation: (conversationId: string, updates: Partial<Conversation>) => void
  refreshConversations: (businessId: string) => Promise<void>
}

export const useConversationsStore = create<ConversationsState>((set, get) => ({
  conversations: [],
  currentConversation: null,
  loading: false,
  
  setConversations: (conversations) => set({ conversations }),
  
  setCurrentConversation: (conversation) => set({ currentConversation: conversation }),
  
  loadConversations: async (businessId: string) => {
    set({ loading: true })
    try {
      const conversations = await storage.getConversationsByBusinessId(businessId)
      set({ conversations, loading: false })
    } catch (error) {
      console.error("Error loading conversations:", error)
      set({ loading: false })
    }
  },
  
  loadConversation: async (conversationId: string) => {
    set({ loading: true })
    try {
      const conversation = await storage.getConversationById(conversationId)
      set({ currentConversation: conversation, loading: false })
      return conversation
    } catch (error) {
      console.error("Error loading conversation:", error)
      set({ loading: false })
      return null
    }
  },
  
  addMessage: (message: Message) => {
    const { currentConversation, conversations } = get()
    
    // Update current conversation
    if (currentConversation && currentConversation.id === message.conversationId) {
      // Check if message already exists (to avoid duplicates from real-time events)
      const existingIndex = currentConversation.messages.findIndex((m) => m.id === message.id)
      
      if (existingIndex >= 0) {
        // Update existing message
        const updatedMessages = [...currentConversation.messages]
        updatedMessages[existingIndex] = message
        set({
          currentConversation: {
            ...currentConversation,
            messages: updatedMessages.sort(
              (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            ),
            lastMessageAt: message.createdAt,
          },
        })
      } else {
        // Add new message
        const updatedMessages = [...currentConversation.messages, message].sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        set({
          currentConversation: {
            ...currentConversation,
            messages: updatedMessages,
            lastMessageAt: message.createdAt,
          },
        })
      }
    }
    
    // Update conversations list
    const conversationIndex = conversations.findIndex((c) => c.id === message.conversationId)
    if (conversationIndex >= 0) {
      const updatedConversations = [...conversations]
      const conv = updatedConversations[conversationIndex]
      
      // Check if message already exists
      const existingMessageIndex = conv.messages.findIndex((m) => m.id === message.id)
      
      let updatedMessages: Message[]
      if (existingMessageIndex >= 0) {
        // Update existing message
        updatedMessages = [...conv.messages]
        updatedMessages[existingMessageIndex] = message
      } else {
        // Add new message
        updatedMessages = [...conv.messages, message]
      }
      
      updatedConversations[conversationIndex] = {
        ...conv,
        messages: updatedMessages.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ),
        lastMessageAt: message.createdAt,
      }
      // Move to top
      updatedConversations.sort(
        (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
      )
      set({ conversations: updatedConversations })
    }
  },
  
  updateMessage: (messageId: string, updates: Partial<Message>) => {
    const { currentConversation, conversations } = get()
    
    // Update current conversation
    if (currentConversation) {
      const messageIndex = currentConversation.messages.findIndex((m) => m.id === messageId)
      if (messageIndex >= 0) {
        const updatedMessages = [...currentConversation.messages]
        updatedMessages[messageIndex] = { ...updatedMessages[messageIndex], ...updates }
        set({
          currentConversation: {
            ...currentConversation,
            messages: updatedMessages,
          },
        })
      }
    }
    
    // Update conversations list
    const updatedConversations = conversations.map((conv) => {
      const messageIndex = conv.messages.findIndex((m) => m.id === messageId)
      if (messageIndex >= 0) {
        const updatedMessages = [...conv.messages]
        updatedMessages[messageIndex] = { ...updatedMessages[messageIndex], ...updates }
        return { ...conv, messages: updatedMessages }
      }
      return conv
    })
    set({ conversations: updatedConversations })
  },
  
  removeMessage: (messageId: string) => {
    const { currentConversation, conversations } = get()
    
    // Update current conversation
    if (currentConversation) {
      set({
        currentConversation: {
          ...currentConversation,
          messages: currentConversation.messages.filter((m) => m.id !== messageId),
        },
      })
    }
    
    // Update conversations list
    const updatedConversations = conversations.map((conv) => ({
      ...conv,
      messages: conv.messages.filter((m) => m.id !== messageId),
    }))
    set({ conversations: updatedConversations })
  },
  
  updateConversation: (conversationId: string, updates: Partial<Conversation>) => {
    const { currentConversation, conversations } = get()
    
    // Update current conversation
    if (currentConversation && currentConversation.id === conversationId) {
      set({
        currentConversation: {
          ...currentConversation,
          ...updates,
        },
      })
    }
    
    // Update conversations list
    const updatedConversations = conversations.map((conv) =>
      conv.id === conversationId ? { ...conv, ...updates } : conv
    )
    set({ conversations: updatedConversations })
  },
  
  refreshConversations: async (businessId: string) => {
    try {
      const conversations = await storage.getConversationsByBusinessId(businessId)
      set({ conversations })
    } catch (error) {
      console.error("Error refreshing conversations:", error)
    }
  },
}))


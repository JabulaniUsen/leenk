"use client"

import type { Message, Conversation } from "./types"

const DB_NAME = "leenk_cache"
const DB_VERSION = 1
const MESSAGES_STORE = "messages"
const CONVERSATIONS_STORE = "conversations"
const METADATA_STORE = "metadata"

interface DBMetadata {
  key: string
  value: string | number
}

// Initialize IndexedDB
async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      // Messages store - indexed by conversationId and createdAt
      if (!db.objectStoreNames.contains(MESSAGES_STORE)) {
        const messagesStore = db.createObjectStore(MESSAGES_STORE, { keyPath: "id" })
        messagesStore.createIndex("conversationId", "conversationId", { unique: false })
        messagesStore.createIndex("createdAt", "createdAt", { unique: false })
        messagesStore.createIndex("conversation_created", ["conversationId", "createdAt"], { unique: false })
      }

      // Conversations store
      if (!db.objectStoreNames.contains(CONVERSATIONS_STORE)) {
        const conversationsStore = db.createObjectStore(CONVERSATIONS_STORE, { keyPath: "id" })
        conversationsStore.createIndex("businessId", "businessId", { unique: false })
        conversationsStore.createIndex("updatedAt", "lastMessageAt", { unique: false })
      }

      // Metadata store for cache timestamps
      if (!db.objectStoreNames.contains(METADATA_STORE)) {
        const metadataStore = db.createObjectStore(METADATA_STORE, { keyPath: "key" })
      }
    }
  })
}

// Helper function to deeply sanitize values for IndexedDB storage
// Removes Promises and other non-serializable values
function sanitizeValue(value: any): any {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return value
  }

  // Handle Promises - convert to undefined
  if (value instanceof Promise) {
    return undefined
  }

  // Handle primitives
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value
  }

  // Handle Date objects - convert to ISO string
  if (value instanceof Date) {
    return value.toISOString()
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return value.map(item => sanitizeValue(item))
  }

  // Handle objects
  if (typeof value === "object") {
    const sanitized: any = {}
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const sanitizedVal = sanitizeValue(value[key])
        // Only include if not undefined (to skip Promises)
        if (sanitizedVal !== undefined) {
          sanitized[key] = sanitizedVal
        }
      }
    }
    return sanitized
  }

  // For any other type, return undefined
  return undefined
}

// Messages Cache
export const messageCache = {
  // Save messages to cache
  async saveMessages(conversationId: string, messages: Message[]): Promise<void> {
    try {
      const db = await openDB()
      const transaction = db.transaction([MESSAGES_STORE], "readwrite")
      const store = transaction.objectStore(MESSAGES_STORE)

      // Save each message - sanitize to remove Promises and non-serializable values
      for (const message of messages) {
        const sanitizedMessage = sanitizeValue({
          id: message.id,
          conversationId: message.conversationId,
          senderType: message.senderType,
          senderId: message.senderId,
          text: message.text,
          imageUrl: message.imageUrl,
          status: message.status,
          createdAt: message.createdAt,
          replyToId: message.replyToId,
          // Don't include replyTo nested object - it can cause circular references
        }) as Message

        await new Promise<void>((resolve, reject) => {
          const request = store.put(sanitizedMessage)
          request.onsuccess = () => resolve()
          request.onerror = () => reject(request.error)
        })
      }

      // Update cache timestamp
      await this.updateCacheTimestamp(conversationId)
    } catch (error) {
      console.error("Error saving messages to cache:", error)
      // Don't throw - caching is optional
    }
  },

  // Get messages from cache
  async getMessages(conversationId: string, limit?: number): Promise<Message[]> {
    try {
      const db = await openDB()
      const transaction = db.transaction([MESSAGES_STORE], "readonly")
      const store = transaction.objectStore(MESSAGES_STORE)
      const index = store.index("conversation_created")

      return new Promise((resolve, reject) => {
        const messages: Message[] = []
        const request = index.openCursor(
          IDBKeyRange.bound([conversationId, ""], [conversationId, "\uffff"])
        )

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
          if (cursor) {
            messages.push(cursor.value as Message)
            if (!limit || messages.length < limit) {
              cursor.continue()
            } else {
              resolve(messages.sort((a, b) => 
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
              ))
            }
          } else {
            resolve(messages.sort((a, b) => 
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            ))
          }
        }

        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.error("Error getting messages from cache:", error)
      return []
    }
  },

  // Get oldest message timestamp for pagination
  async getOldestMessageTimestamp(conversationId: string): Promise<string | null> {
    try {
      const db = await openDB()
      const transaction = db.transaction([MESSAGES_STORE], "readonly")
      const store = transaction.objectStore(MESSAGES_STORE)
      const index = store.index("conversation_created")

      return new Promise((resolve, reject) => {
        const request = index.openCursor(
          IDBKeyRange.bound([conversationId, ""], [conversationId, "\uffff"]),
          "prev" // Reverse order to get oldest first
        )

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
          if (cursor) {
            resolve((cursor.value as Message).createdAt)
          } else {
            resolve(null)
          }
        }

        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.error("Error getting oldest message timestamp:", error)
      return null
    }
  },

  // Clear messages for a conversation
  async clearMessages(conversationId: string): Promise<void> {
    try {
      const db = await openDB()
      const transaction = db.transaction([MESSAGES_STORE], "readwrite")
      const store = transaction.objectStore(MESSAGES_STORE)
      const index = store.index("conversationId")

      return new Promise((resolve, reject) => {
        const request = index.openCursor(IDBKeyRange.only(conversationId))

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
          if (cursor) {
            cursor.delete()
            cursor.continue()
          } else {
            resolve()
          }
        }

        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.error("Error clearing messages from cache:", error)
    }
  },

  // Update cache timestamp
  async updateCacheTimestamp(conversationId: string): Promise<void> {
    try {
      const db = await openDB()
      const transaction = db.transaction([METADATA_STORE], "readwrite")
      const store = transaction.objectStore(METADATA_STORE)

      await new Promise<void>((resolve, reject) => {
        const request = store.put({
          key: `messages_${conversationId}`,
          value: Date.now(),
        })
        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.error("Error updating cache timestamp:", error)
    }
  },

  // Check if cache is fresh (less than 5 minutes old)
  async isCacheFresh(conversationId: string): Promise<boolean> {
    try {
      const db = await openDB()
      const transaction = db.transaction([METADATA_STORE], "readonly")
      const store = transaction.objectStore(METADATA_STORE)

      return new Promise((resolve, reject) => {
        const request = store.get(`messages_${conversationId}`)

        request.onsuccess = () => {
          const result = request.result as DBMetadata | undefined
          if (!result) {
            resolve(false)
            return
          }

          const cacheAge = Date.now() - (result.value as number)
          resolve(cacheAge < 5 * 60 * 1000) // 5 minutes
        }

        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.error("Error checking cache freshness:", error)
      return false
    }
  },
}

// Conversations Cache
export const conversationCache = {
  // Save conversations to cache
  async saveConversations(conversations: Conversation[]): Promise<void> {
    try {
      const db = await openDB()
      const transaction = db.transaction([CONVERSATIONS_STORE], "readwrite")
      const store = transaction.objectStore(CONVERSATIONS_STORE)

      for (const conversation of conversations) {
        // Deeply sanitize conversation to ensure it's fully serializable
        // This removes Promises, functions, and other non-cloneable values
        const sanitizedConversation = sanitizeValue({
          id: conversation.id,
          businessId: conversation.businessId,
          customerEmail: conversation.customerEmail,
          customerName: conversation.customerName,
          createdAt: conversation.createdAt,
          lastMessageAt: conversation.lastMessageAt,
          messages: (conversation.messages || []).map(msg => ({
            id: msg.id,
            conversationId: msg.conversationId,
            senderType: msg.senderType,
            senderId: msg.senderId,
            text: msg.text,
            imageUrl: msg.imageUrl,
            status: msg.status,
            createdAt: msg.createdAt,
            replyToId: msg.replyToId,
            // Don't include replyTo nested object - it can cause circular references
            // replyTo will be resolved when messages are loaded from cache
          })),
          unreadCount: conversation.unreadCount,
          pinned: conversation.pinned,
        }) as Conversation

        // Ensure messages is always an array (never undefined)
        if (!sanitizedConversation.messages) {
          sanitizedConversation.messages = []
        }

        await new Promise<void>((resolve, reject) => {
          const request = store.put(sanitizedConversation)
          request.onsuccess = () => resolve()
          request.onerror = () => reject(request.error)
        })
      }

      // Update cache timestamp
      await this.updateCacheTimestamp()
    } catch (error) {
      console.error("Error saving conversations to cache:", error)
    }
  },

  // Get conversations from cache
  async getConversations(businessId: string): Promise<Conversation[]> {
    try {
      const db = await openDB()
      const transaction = db.transaction([CONVERSATIONS_STORE], "readonly")
      const store = transaction.objectStore(CONVERSATIONS_STORE)
      const index = store.index("businessId")

      return new Promise((resolve, reject) => {
        const conversations: Conversation[] = []
        const request = index.openCursor(IDBKeyRange.only(businessId))

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result
          if (cursor) {
            conversations.push(cursor.value as Conversation)
            cursor.continue()
          } else {
            resolve(conversations.sort((a, b) => 
              new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
            ))
          }
        }

        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.error("Error getting conversations from cache:", error)
      return []
    }
  },

  // Update cache timestamp
  async updateCacheTimestamp(): Promise<void> {
    try {
      const db = await openDB()
      const transaction = db.transaction([METADATA_STORE], "readwrite")
      const store = transaction.objectStore(METADATA_STORE)

      await new Promise<void>((resolve, reject) => {
        const request = store.put({
          key: "conversations_timestamp",
          value: Date.now(),
        })
        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.error("Error updating cache timestamp:", error)
    }
  },
}


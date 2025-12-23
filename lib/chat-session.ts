import { createClient } from "./supabase/client"

const SESSION_STORAGE_KEY = "leenk_chat_session_id"

export interface ChatSession {
  id: string
  conversationId: string
  customerEmail: string
  expiresAt: string
  createdAt: string
}

/**
 * Create or retrieve a chat session for a customer using database function
 * Sessions are stored in localStorage and validated against the database
 */
export async function getOrCreateChatSession(
  conversationId: string,
  customerEmail: string
): Promise<ChatSession | null> {
  try {
    const supabase = createClient()
    
    // Use database function to get or create session (returns full session data as JSON)
    const { data: sessionData, error: functionError } = await supabase.rpc(
      'get_or_create_chat_session',
      {
        p_conversation_id: conversationId,
        p_customer_email: customerEmail
      }
    )

    if (functionError || !sessionData) {
      console.error("Failed to get or create chat session:", functionError)
      return null
    }

    // sessionData is already a JSON object from the function
    const session = sessionData as any

    // Store session ID in localStorage
    localStorage.setItem(SESSION_STORAGE_KEY, session.id)

    return {
      id: session.id,
      conversationId: session.conversation_id,
      customerEmail: session.customer_email,
      expiresAt: session.expires_at,
      createdAt: session.created_at,
    }
  } catch (error) {
    console.error("Error in getOrCreateChatSession:", error)
    return null
  }
}

/**
 * Get current session ID from localStorage
 */
export function getCurrentSessionId(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(SESSION_STORAGE_KEY)
}

/**
 * Clear session from localStorage (doesn't delete from DB)
 */
export function clearSession(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(SESSION_STORAGE_KEY)
}

/**
 * Validate that a session is valid for a conversation
 * This is called before allowing customer operations
 * Uses database function for validation
 */
export async function validateSession(
  sessionId: string | null,
  conversationId: string,
  customerEmail?: string
): Promise<boolean> {
  if (!sessionId) return false

  try {
    const supabase = createClient()
    
    // Use database function to validate session
    const { data: isValid, error } = await supabase.rpc(
      'is_valid_chat_session',
      {
        p_session_id: sessionId,
        p_conversation_id: conversationId
      }
    )

    if (error || !isValid) {
      return false
    }

    // Extend session on validation
    await supabase.rpc('extend_chat_session', {
      p_session_id: sessionId
    })

    return true
  } catch (error) {
    console.error("Error validating session:", error)
    return false
  }
}


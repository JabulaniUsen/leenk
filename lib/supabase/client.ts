import { createBrowserClient } from "@supabase/ssr"

/**
 * Create Supabase client for browser
 * Note: Session ID is stored in localStorage and validated in application layer
 * For proper RLS enforcement with current_setting('request.session_id'), we would need:
 * - Supabase Edge Function as proxy, OR
 * - Custom middleware to set request context, OR
 * - Service role client with session validation
 * 
 * Current implementation uses application-layer validation as fallback.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your Vercel environment variables."
    )
  }

  const client = createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    }
  )

  // Note: Session ID is read from localStorage in chat-session.ts
  // and validated before operations. For true RLS enforcement,
  // we would need to set request.session_id via middleware/edge function.
  
  return client
}


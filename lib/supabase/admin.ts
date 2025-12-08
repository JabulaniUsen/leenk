import { createClient } from "@supabase/supabase-js"

// Admin client using service role key (bypasses RLS)
function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase admin credentials")
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export const admin = {
  // Get all businesses
  async getAllBusinesses() {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("businesses")
      .select("id, email, business_name, phone, address, business_logo, online, is_admin, created_at, updated_at")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get all conversations
  async getAllConversations() {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("conversations")
      .select("id, business_id, customer_email, customer_name, customer_phone, created_at, updated_at, pinned")
      .order("updated_at", { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get conversation count
  async getConversationCount() {
    const supabase = createAdminClient()
    const { count, error } = await supabase
      .from("conversations")
      .select("*", { count: "exact", head: true })

    if (error) throw error
    return count || 0
  },

  // Get message count
  async getMessageCount() {
    const supabase = createAdminClient()
    const { count, error } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })

    if (error) throw error
    return count || 0
  },

  // Get business count
  async getBusinessCount() {
    const supabase = createAdminClient()
    const { count, error } = await supabase
      .from("businesses")
      .select("*", { count: "exact", head: true })

    if (error) throw error
    return count || 0
  },
}


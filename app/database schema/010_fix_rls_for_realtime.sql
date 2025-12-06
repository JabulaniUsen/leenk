-- Fix RLS Policies for Real-time to work properly
-- Real-time subscriptions need proper SELECT policies

-- Drop existing policies if they exist (optional, for clean setup)
DROP POLICY IF EXISTS "Users can access messages in their conversations" ON messages;
DROP POLICY IF EXISTS "Businesses can access own conversations" ON conversations;

-- Messages: Allow businesses to read messages in their conversations
-- This is the primary use case - businesses viewing customer messages
CREATE POLICY "Businesses can read messages in their conversations"
  ON messages FOR SELECT
  USING (
    conversation_id IN (
      SELECT id FROM conversations 
      WHERE business_id::text = auth.uid()::text
    )
  );

-- Messages: Allow public read for customer chat (customers don't authenticate)
-- This allows customers to receive real-time updates via the public chat page
-- Note: This is more permissive but necessary for customer-facing chat
CREATE POLICY "Enable read for customer chat"
  ON messages FOR SELECT
  USING (true);  -- Allow read for all messages (customers access via phone number, not auth)

-- Conversations: Allow businesses to read their own conversations
CREATE POLICY "Businesses can read own conversations"
  ON conversations FOR SELECT
  USING (business_id::text = auth.uid()::text);

-- Conversations: Allow public read for customer chat
CREATE POLICY "Enable read for customer conversations"
  ON conversations FOR SELECT
  USING (true);  -- Allow read for all conversations (customers access via phone number)


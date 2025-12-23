-- Fix RLS policies to remove over-permissive USING (true) policies
-- This migration replaces the permissive policies with scoped, secure ones
-- Backward compatible: keeps business access working, adds session-based customer access

-- Drop the over-permissive policies
DROP POLICY IF EXISTS "Enable read for customer chat" ON messages;
DROP POLICY IF EXISTS "Enable read for customer conversations" ON conversations;
DROP POLICY IF EXISTS "Businesses can read messages in their conversations" ON messages;
DROP POLICY IF EXISTS "Businesses can read own conversations" ON conversations;

-- Messages: Businesses can read messages in their conversations
CREATE POLICY "Businesses can read messages in their conversations"
  ON messages FOR SELECT
  TO authenticated
  USING (
    conversation_id IN (
      SELECT id FROM conversations 
      WHERE business_id::text = auth.uid()::text
    )
  );

-- Messages: Customers can only read messages in their active session's conversation
CREATE POLICY "Customers can read messages in their session"
  ON messages FOR SELECT
  TO public
  USING (
    conversation_id IN (
      SELECT conversation_id 
      FROM chat_sessions 
      WHERE id = current_setting('request.session_id', true)::uuid
        AND expires_at > NOW()
    )
  );

-- Messages: Customers can only insert into their session's conversation
CREATE POLICY "Customers can insert messages in their session"
  ON messages FOR INSERT
  TO public
  WITH CHECK (
    conversation_id IN (
      SELECT conversation_id 
      FROM chat_sessions 
      WHERE id = current_setting('request.session_id', true)::uuid
        AND expires_at > NOW()
    )
    AND sender_type = 'customer'
  );

-- Messages: Businesses can insert messages into their conversations
CREATE POLICY "Businesses can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    conversation_id IN (
      SELECT id FROM conversations 
      WHERE business_id::text = auth.uid()::text
    )
    AND sender_type = 'business'
  );

-- Messages: Businesses can update their own messages
CREATE POLICY "Businesses can update own messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (
    conversation_id IN (
      SELECT id FROM conversations 
      WHERE business_id::text = auth.uid()::text
    )
    AND sender_type = 'business'
  );

-- Messages: Businesses can delete their own messages
CREATE POLICY "Businesses can delete own messages"
  ON messages FOR DELETE
  TO authenticated
  USING (
    conversation_id IN (
      SELECT id FROM conversations 
      WHERE business_id::text = auth.uid()::text
    )
    AND sender_type = 'business'
  );

-- Conversations: Businesses can read their own conversations
CREATE POLICY "Businesses can read own conversations"
  ON conversations FOR SELECT
  TO authenticated
  USING (business_id::text = auth.uid()::text);

-- Conversations: Customers can only read their session's conversation
CREATE POLICY "Customers can read their session conversation"
  ON conversations FOR SELECT
  TO public
  USING (
    id IN (
      SELECT conversation_id 
      FROM chat_sessions 
      WHERE id = current_setting('request.session_id', true)::uuid
        AND expires_at > NOW()
    )
  );

-- Conversations: Businesses can update their own conversations
CREATE POLICY "Businesses can update own conversations"
  ON conversations FOR UPDATE
  TO authenticated
  USING (business_id::text = auth.uid()::text);

-- Conversations: Businesses can insert their own conversations
CREATE POLICY "Businesses can create conversations"
  ON conversations FOR INSERT
  TO authenticated
  WITH CHECK (business_id::text = auth.uid()::text);

-- Conversations: Businesses can delete their own conversations
CREATE POLICY "Businesses can delete own conversations"
  ON conversations FOR DELETE
  TO authenticated
  USING (business_id::text = auth.uid()::text);


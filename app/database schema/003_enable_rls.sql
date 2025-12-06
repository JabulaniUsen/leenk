-- Enable Row Level Security for all tables

-- Enable RLS on businesses table
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

-- Businesses can only access their own record
CREATE POLICY "Businesses can access own record"
  ON businesses FOR ALL
  USING (auth.uid()::text = id::text);

-- Enable RLS on conversations table
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Businesses can access their own conversations
CREATE POLICY "Businesses can access own conversations"
  ON conversations FOR ALL
  USING (business_id::text = auth.uid()::text);

-- Enable RLS on messages table
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users can access messages in their conversations
CREATE POLICY "Users can access messages in their conversations"
  ON messages FOR ALL
  USING (
    conversation_id IN (
      SELECT id FROM conversations 
      WHERE business_id::text = auth.uid()::text
    )
  );

-- Enable RLS on images table
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Users can access images from their businesses
CREATE POLICY "Users can access their business images"
  ON images FOR ALL
  USING (business_id::text = auth.uid()::text);

-- Create indexes for performance optimization

-- Index on business_id for faster queries
CREATE INDEX IF NOT EXISTS idx_conversations_business_id 
  ON conversations(business_id);

-- Index on conversation_id for message queries
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id 
  ON messages(conversation_id);

-- Index on created_at for sorting messages
CREATE INDEX IF NOT EXISTS idx_messages_created_at 
  ON messages(created_at DESC);

-- Index on business_id for image queries
CREATE INDEX IF NOT EXISTS idx_images_business_id 
  ON images(business_id);

-- Index on conversation_id for message queries
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id_created_at 
  ON messages(conversation_id, created_at DESC);

-- Index for finding conversations by customer phone
CREATE INDEX IF NOT EXISTS idx_conversations_business_customer 
  ON conversations(business_id, customer_phone);

-- Create indexes for performance optimization

-- ============================================
-- CONVERSATIONS TABLE INDEXES
-- ============================================

-- Index on business_id for faster conversation queries
CREATE INDEX IF NOT EXISTS idx_conversations_business_id 
  ON conversations(business_id);

-- Composite index for finding conversations by business and customer
CREATE INDEX IF NOT EXISTS idx_conversations_business_customer 
  ON conversations(business_id, customer_phone);

-- Index for finding conversations by customer email (for email-based lookups)
CREATE INDEX IF NOT EXISTS idx_conversations_customer_email 
  ON conversations(customer_email) 
  WHERE customer_email IS NOT NULL;

-- Index on updated_at for sorting conversations by most recent
CREATE INDEX IF NOT EXISTS idx_conversations_updated_at 
  ON conversations(updated_at DESC);

-- Composite index for business conversations sorted by last update
CREATE INDEX IF NOT EXISTS idx_conversations_business_updated 
  ON conversations(business_id, updated_at DESC);

-- ============================================
-- MESSAGES TABLE INDEXES
-- ============================================

-- Index on conversation_id for message queries
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id 
  ON messages(conversation_id);

-- Index on created_at for sorting messages chronologically
CREATE INDEX IF NOT EXISTS idx_messages_created_at 
  ON messages(created_at DESC);

-- Composite index for conversation messages sorted by time (most common query)
CREATE INDEX IF NOT EXISTS idx_messages_conversation_created 
  ON messages(conversation_id, created_at DESC);

-- Index on sender_type for filtering messages by sender
CREATE INDEX IF NOT EXISTS idx_messages_sender_type 
  ON messages(sender_type);

-- Composite index for unread messages (status + conversation)
CREATE INDEX IF NOT EXISTS idx_messages_status_conversation 
  ON messages(status, conversation_id) 
  WHERE status IN ('sent', 'delivered');

-- Index on sender_id for user-specific message queries
CREATE INDEX IF NOT EXISTS idx_messages_sender_id 
  ON messages(sender_id);

-- ============================================
-- BUSINESSES TABLE INDEXES
-- ============================================

-- Index on email for login lookups (already unique, but explicit index helps)
CREATE INDEX IF NOT EXISTS idx_businesses_email 
  ON businesses(email);

-- Index on phone for business lookups by phone number
CREATE INDEX IF NOT EXISTS idx_businesses_phone 
  ON businesses(phone) 
  WHERE phone IS NOT NULL;

-- Index on created_at for sorting businesses
CREATE INDEX IF NOT EXISTS idx_businesses_created_at 
  ON businesses(created_at DESC);

-- ============================================
-- IMAGES TABLE INDEXES
-- ============================================

-- Index on business_id for image queries
CREATE INDEX IF NOT EXISTS idx_images_business_id 
  ON images(business_id);

-- Index on message_id for linking images to messages
CREATE INDEX IF NOT EXISTS idx_images_message_id 
  ON images(message_id) 
  WHERE message_id IS NOT NULL;

-- Composite index for business images sorted by creation time
CREATE INDEX IF NOT EXISTS idx_images_business_created 
  ON images(business_id, created_at DESC);

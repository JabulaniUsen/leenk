-- Optimize egress: Create indexes for efficient conversation and message queries
-- These indexes significantly reduce query time and data transfer

-- Index for conversation queries by business and updated_at (used in getConversationsByBusinessId)
CREATE INDEX IF NOT EXISTS idx_conversations_business_updated 
ON conversations(business_id, updated_at DESC);

-- Index for last message queries per conversation (used in getConversationsByBusinessId)
CREATE INDEX IF NOT EXISTS idx_messages_conv_created 
ON messages(conversation_id, created_at DESC);

-- Index for unread count queries (used in getConversationsByBusinessId)
CREATE INDEX IF NOT EXISTS idx_messages_unread 
ON messages(conversation_id, sender_type, status) 
WHERE status IN ('sent', 'delivered');

-- Index for message pagination (used in getMessagesPaginated)
CREATE INDEX IF NOT EXISTS idx_messages_conv_created_asc
ON messages(conversation_id, created_at ASC);

-- Index for conversation lookup by business and email (used in getConversationByBusinessAndEmail)
CREATE INDEX IF NOT EXISTS idx_conversations_business_email
ON conversations(business_id, customer_email);

-- Index for realtime message filtering (helps with business channel filtering)
CREATE INDEX IF NOT EXISTS idx_messages_created_at
ON messages(created_at DESC);

-- Composite index for business channel message filtering
-- This helps when checking if messages belong to a business
CREATE INDEX IF NOT EXISTS idx_conversations_id_business
ON conversations(id, business_id);


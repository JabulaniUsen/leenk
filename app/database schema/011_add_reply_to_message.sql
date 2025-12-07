-- Add reply_to_id column to messages table for reply functionality
-- This allows messages to reference other messages they are replying to

ALTER TABLE messages
ADD COLUMN IF NOT EXISTS reply_to_id UUID REFERENCES messages(id) ON DELETE SET NULL;

-- Create index for faster queries on reply relationships
CREATE INDEX IF NOT EXISTS idx_messages_reply_to_id ON messages(reply_to_id);
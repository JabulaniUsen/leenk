-- Add pinned column to conversations table
-- This allows users to pin important conversations to the top of the list

ALTER TABLE conversations
ADD COLUMN IF NOT EXISTS pinned BOOLEAN DEFAULT FALSE;

-- Create index for faster queries on pinned conversations
CREATE INDEX IF NOT EXISTS idx_conversations_pinned ON conversations(pinned) WHERE pinned = true;


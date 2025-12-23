-- Add read_at timestamp to messages table
-- This simplifies the status model: sent -> read_at (nullable)
-- Backward compatible: keep status column, add read_at, migrate gradually

ALTER TABLE messages
ADD COLUMN IF NOT EXISTS read_at TIMESTAMPTZ NULL;

-- Index for faster read status queries
CREATE INDEX IF NOT EXISTS idx_messages_read_at ON messages(read_at) WHERE read_at IS NOT NULL;

-- Migrate existing 'read' status to read_at timestamp
-- Set read_at to created_at for messages that are already marked as 'read'
UPDATE messages 
SET read_at = created_at 
WHERE status = 'read' AND read_at IS NULL;

-- Note: We keep the status column for backward compatibility
-- Future: Can remove status column after full migration to read_at model


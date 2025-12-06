-- Add status column to messages table for read receipts
-- Status values: 'sent', 'delivered', 'read'

ALTER TABLE messages
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read'));

-- Create index for faster queries on status
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);

-- Update existing messages to 'sent' status if they don't have one
UPDATE messages SET status = 'sent' WHERE status IS NULL;


-- Enable Realtime Replication for Messages and Conversations
-- This is REQUIRED for real-time updates to work

-- Add messages table to replication publication
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- Add conversations table to replication publication
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;

-- Verify replication is enabled (run this to check)
-- SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';


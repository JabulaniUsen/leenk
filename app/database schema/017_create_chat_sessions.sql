-- Create chat_sessions table for secure customer access
-- This solves the RLS overexposure issue by providing session-based access control
-- Backward compatible: existing customer flows continue to work

CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  customer_email TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(conversation_id, customer_email)
);

-- Index for fast session lookups
CREATE INDEX IF NOT EXISTS idx_chat_sessions_conversation ON chat_sessions(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_email ON chat_sessions(customer_email);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_expires ON chat_sessions(expires_at);

-- Enable RLS on chat_sessions
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;


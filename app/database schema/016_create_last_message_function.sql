-- Create function to efficiently get last message per conversation
-- This can be used as an alternative to the current approach for even better performance
-- Note: The current implementation uses a simpler approach that's already optimized
-- This function is optional but can provide additional optimization if needed

CREATE OR REPLACE FUNCTION get_last_messages_for_conversations(conversation_ids UUID[])
RETURNS TABLE (
  id UUID,
  conversation_id UUID,
  sender_type TEXT,
  sender_id TEXT,
  content TEXT,
  image_url TEXT,
  status TEXT,
  created_at TIMESTAMPTZ,
  reply_to_id UUID
) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT ON (m.conversation_id)
    m.id,
    m.conversation_id,
    m.sender_type,
    m.sender_id,
    m.content,
    m.image_url,
    m.status,
    m.created_at,
    m.reply_to_id
  FROM messages m
  WHERE m.conversation_id = ANY(conversation_ids)
  ORDER BY m.conversation_id, m.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_last_messages_for_conversations(UUID[]) TO authenticated;
GRANT EXECUTE ON FUNCTION get_last_messages_for_conversations(UUID[]) TO anon;


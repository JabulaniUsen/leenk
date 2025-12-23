-- Session Management Functions
-- Helper functions for creating, validating, and managing chat sessions

-- Drop existing function if it exists (to change return type)
DROP FUNCTION IF EXISTS get_or_create_chat_session(uuid, text);

-- Function to get or create session
-- Returns JSON with session details to avoid RLS issues when fetching
CREATE OR REPLACE FUNCTION get_or_create_chat_session(
  p_conversation_id UUID,
  p_customer_email TEXT
) RETURNS JSON AS $$
DECLARE
  v_session_id UUID;
  v_session JSON;
BEGIN
  -- Try to get existing active session
  SELECT id INTO v_session_id
  FROM chat_sessions
  WHERE conversation_id = p_conversation_id
    AND customer_email = p_customer_email
    AND expires_at > NOW()
  LIMIT 1;
  
  -- Create new session if none exists
  IF v_session_id IS NULL THEN
    INSERT INTO chat_sessions (conversation_id, customer_email, expires_at)
    VALUES (p_conversation_id, p_customer_email, NOW() + INTERVAL '7 days')
    RETURNING id INTO v_session_id;
  ELSE
    -- Extend existing session
    UPDATE chat_sessions
    SET expires_at = NOW() + INTERVAL '7 days'
    WHERE id = v_session_id;
  END IF;
  
  -- Return session as JSON to avoid RLS issues
  SELECT json_build_object(
    'id', id,
    'conversation_id', conversation_id,
    'customer_email', customer_email,
    'expires_at', expires_at,
    'created_at', created_at
  ) INTO v_session
  FROM chat_sessions
  WHERE id = v_session_id;
  
  RETURN v_session;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to validate session
CREATE OR REPLACE FUNCTION is_valid_chat_session(
  p_session_id UUID,
  p_conversation_id UUID
) RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM chat_sessions 
    WHERE id = p_session_id
      AND conversation_id = p_conversation_id
      AND expires_at > NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to extend session expiry
CREATE OR REPLACE FUNCTION extend_chat_session(
  p_session_id UUID
) RETURNS BOOLEAN AS $$
BEGIN
  UPDATE chat_sessions
  SET expires_at = NOW() + INTERVAL '7 days'
  WHERE id = p_session_id
    AND expires_at > NOW();
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up expired sessions (can be called by cron)
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM chat_sessions WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


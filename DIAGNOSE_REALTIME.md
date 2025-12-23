# Diagnose and Fix Realtime Binding Mismatch Error

## Quick Diagnosis

Run this SQL in your Supabase SQL Editor to check if replication is properly configured:

```sql
-- Check if tables are in the replication publication
SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';

-- Expected output should show:
-- - messages
-- - conversations
```

## Common Causes and Fixes

### 1. Tables Not in Replication Publication

**Fix:** Run this SQL:

```sql
-- Add messages table to replication publication
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- Add conversations table to replication publication
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
```

### 2. Replication Not Enabled in Dashboard

1. Go to **Supabase Dashboard → Database → Replication**
2. Enable replication for:
   - ✅ `messages` table
   - ✅ `conversations` table

### 3. Multiple Conflicting Subscriptions

The binding mismatch can occur when:
- `setupConversationChannel` subscribes to `messages` with filter `conversation_id=eq.X`
- `setupBusinessChannel` subscribes to `messages` without a filter

**Current Status:** The code now stops reconnection attempts for binding mismatch errors, but you still need to fix the root cause.

## Step-by-Step Fix

1. **Verify replication is enabled:**
   ```sql
   SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';
   ```

2. **If tables are missing, add them:**
   ```sql
   ALTER PUBLICATION supabase_realtime ADD TABLE messages;
   ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
   ```

3. **Check RLS policies allow SELECT:**
   ```sql
   -- Should return policies for messages and conversations
   SELECT * FROM pg_policies WHERE tablename IN ('messages', 'conversations');
   ```

4. **Restart your application** after making changes

5. **Check browser console** - the error should stop appearing once replication is properly configured

## Verification

After fixing, you should see in the console:
- ✅ `Real-time connected: conversation:...` (without errors)
- ✅ Messages appear in real-time without page refresh
- ❌ No more "binding mismatch" errors



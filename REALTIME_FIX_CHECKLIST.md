# Real-time Setup Checklist ✅

## What's Already Done ✅

1. ✅ **Using New Channels API** - We're using `supabase.channel().on("postgres_changes")` (not the deprecated `.from().on()`)
2. ✅ **Proper Cleanup** - All subscriptions are cleaned up in `useEffect` return functions
3. ✅ **created_at Column** - Messages table has `created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()`
4. ✅ **Real-time Config** - Client configured with `eventsPerSecond: 10` in `lib/supabase/client.ts`

## What You Need to Do 🔧

### Step 1: Enable Replication in Supabase Dashboard

1. Go to **Supabase Dashboard → Database → Replication**
2. Enable replication for:
   - ✅ `messages` table
   - ✅ `conversations` table

### Step 2: Add Tables to Replication Publication (CRITICAL!)

**This is the most common issue!** Even if you enable replication in the UI, you MUST run this SQL:

```sql
-- Run this in Supabase SQL Editor
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
```

**Or use the migration file:** `app/database schema/009_enable_realtime_replication.sql`

### Step 3: Fix RLS Policies

Run the SQL in: `app/database schema/010_fix_rls_for_realtime.sql`

This ensures:
- Businesses can read messages in their conversations
- Customers can read messages (for public chat access)
- Real-time subscriptions work properly

### Step 4: Verify It's Working

1. Open chat in **two different devices/browsers**
2. Send a message from one device
3. Message should appear **instantly** on the other device (no refresh needed)
4. Check browser console for:
   - ✅ `Real-time connected: conversation:...`
   - ✅ `Real-time event received: INSERT`
   - ✅ `Calling onMessageUpdate callback`

## Current Implementation Status

- ✅ Using Channels API correctly
- ✅ Proper subscription cleanup
- ✅ Functional state updates (prevents message disappearing)
- ✅ Auto-scroll on new messages
- ✅ Polling fallback if WebSocket fails
- ⚠️ **Need to run SQL migrations** (Steps 2 & 3 above)

## Troubleshooting

If messages still don't update in real-time:

1. **Check Replication Status:**
   ```sql
   SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';
   ```
   Should show `messages` and `conversations`

2. **Check RLS Policies:**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'messages';
   ```
   Should have SELECT policies enabled

3. **Check Browser Console:**
   - Look for WebSocket connection errors
   - Check for RLS policy violations
   - Verify subscription status

4. **Test with Simple Policy (if needed):**
   ```sql
   -- Temporary test policy (remove after testing)
   CREATE POLICY "Test read" ON messages FOR SELECT USING (true);
   ```


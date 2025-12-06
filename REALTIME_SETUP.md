# Real-time Setup Guide

## Why Messages Need Refresh (Common Issue)

If messages require a page refresh to appear, it's likely because **Supabase Real-time replication is not enabled** for your tables.

## ✅ Complete Setup Steps

### 1. Enable Real-time Replication in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Database → Replication**
3. Find the `messages` table
4. Click the toggle to **enable replication** for the `messages` table
5. Also enable replication for the `conversations` table

### 2. Add Tables to Replication Publication (REQUIRED)

**This is the most common missing step!** Even if you enable replication in the UI, you must add tables to the publication.

Run this SQL in your Supabase SQL Editor:

```sql
-- Add messages table to replication publication
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- Add conversations table to replication publication
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
```

**Or use the migration file:** `app/database schema/009_enable_realtime_replication.sql`

### 3. Fix RLS Policies for Real-time

Real-time subscriptions require proper SELECT policies. Run:

```sql
-- See: app/database schema/010_fix_rls_for_realtime.sql
```

This ensures both businesses and customers can receive real-time updates.

### Verify Real-time is Working

After enabling replication:
1. Open your browser's Developer Console (F12)
2. Look for these log messages:
   - ✅ `Successfully subscribed to real-time updates` (WebSocket is working)
   - ❌ `WebSocket subscription error` (Real-time not enabled)
   - ⏱️ `WebSocket subscription timed out` (Connection issue)

## How It Works

The application uses two methods to ensure messages update automatically:

### 1. WebSocket (Primary Method)
- Real-time subscription via Supabase Realtime
- Messages appear instantly when inserted
- No page refresh needed
- Works automatically once replication is enabled

### 2. Polling (Fallback Method)
- Checks for new messages every 2 seconds
- Automatically activates if WebSocket fails
- Ensures messages update even if real-time is disabled
- Less efficient but more reliable as fallback

## Troubleshooting

### Messages Still Require Refresh

**Check 1: Replication Status**
- Go to Supabase Dashboard → Database → Replication
- Ensure `messages` table shows "Replication Enabled"
- If not enabled, click to enable it

**Check 2: Browser Console**
- Open Developer Tools (F12)
- Look for subscription status messages
- Check for any error messages

**Check 3: RLS Policies**
- Real-time subscriptions respect Row Level Security (RLS)
- Ensure your RLS policies allow the user to read messages
- Check `app/database schema/003_enable_rls.sql` for policy setup

**Check 4: Network/Firewall**
- Some networks block WebSocket connections
- Check if your network/firewall allows WebSocket (ws:// or wss://)
- Try from a different network to test

### WebSocket Connection Issues

If you see connection errors:
1. Verify your `NEXT_PUBLIC_SUPABASE_URL` is correct
2. Check that your Supabase project is not paused
3. Ensure you're using HTTPS in production (WebSockets require secure connection in most browsers)

### Testing Real-time

To test if real-time is working:
1. Open the chat in two browser windows/tabs
2. Send a message from one window
3. The message should appear in the other window **immediately** without refresh
4. If it doesn't, check the console for errors and verify replication is enabled

## Fallback Polling

If WebSocket doesn't work, the app automatically falls back to polling:
- Checks for new messages every 2 seconds
- Updates the UI when new messages are detected
- Less instant than WebSocket but ensures messages appear

## Production Recommendations

1. **Always enable real-time replication** for production
2. Monitor WebSocket connection status in logs
3. Set up alerts for connection failures
4. Consider implementing exponential backoff for polling if WebSocket fails


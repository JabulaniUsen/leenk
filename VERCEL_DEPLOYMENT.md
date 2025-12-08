# Vercel Deployment Guide

## Required Environment Variables

Make sure to set these environment variables in your Vercel project settings:

### Required Variables

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Your Supabase project URL
   - Format: `https://xxxxx.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Your Supabase anonymous/public key
   - Found in Supabase Dashboard → Settings → API

3. **SUPABASE_SERVICE_ROLE_KEY** (for admin functions)
   - Your Supabase service role key (server-side only)
   - Found in Supabase Dashboard → Settings → API
   - ⚠️ Never expose this to the client

4. **SMTP_USER** (for email notifications)
   - Your email address for sending notifications
   - Example: `your-email@gmail.com`

5. **SMTP_PASSWORD** (for email notifications)
   - Your email app password (not your regular password)
   - For Gmail: Generate an App Password in Google Account settings

6. **NEXT_PUBLIC_BASE_URL** (optional but recommended)
   - Your production URL
   - Example: `https://your-app.vercel.app`
   - Used for email links and redirects

## How to Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Add each variable:
   - **Name**: The variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - **Value**: The actual value
   - **Environment**: Select all environments (Production, Preview, Development)
4. Click **Save**
5. **Redeploy** your application for changes to take effect

## Common Deployment Issues

### "Application error: a client-side exception has occurred"

This usually means:
1. **Missing environment variables** - Check that all `NEXT_PUBLIC_*` variables are set
2. **Incorrect variable values** - Verify the values are correct (no extra spaces, correct format)
3. **Variables not applied** - You may need to redeploy after adding variables

### Fix Steps:

1. **Verify Environment Variables**:
   ```bash
   # In Vercel dashboard, check Settings → Environment Variables
   # Make sure these are set:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

2. **Check Build Logs**:
   - Go to Vercel Dashboard → Deployments
   - Click on the latest deployment
   - Check the build logs for any errors

3. **Redeploy**:
   - After adding/changing environment variables, trigger a new deployment
   - Go to Deployments → Click "..." → Redeploy

4. **Check Runtime Logs**:
   - Go to Vercel Dashboard → Logs
   - Look for any client-side errors

## Build Configuration

The project should build automatically with default Next.js settings. No special build configuration needed.

## Post-Deployment Checklist

- [ ] All environment variables are set in Vercel
- [ ] Application builds successfully
- [ ] No client-side errors in browser console
- [ ] Supabase connection works (check network tab)
- [ ] Real-time features work (test sending a message)
- [ ] Email notifications work (test sending a message)

## Troubleshooting

### Still Getting Client-Side Errors?

1. **Clear browser cache** and hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
2. **Check browser console** for specific error messages
3. **Check Vercel function logs** for server-side errors
4. **Verify Supabase connection** - Test in Supabase dashboard
5. **Check network tab** - Look for failed API requests

### Environment Variables Not Working?

- Make sure variable names match exactly (case-sensitive)
- Variables starting with `NEXT_PUBLIC_` are exposed to the client
- Variables without `NEXT_PUBLIC_` are server-side only
- After adding variables, you MUST redeploy

### Real-time Not Working?

1. Ensure Realtime is enabled in Supabase:
   - Go to Supabase Dashboard → Database → Replication
   - Enable replication for `messages` and `conversations` tables
2. Run the SQL migration:
   ```sql
   ALTER PUBLICATION supabase_realtime ADD TABLE messages;
   ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
   ```


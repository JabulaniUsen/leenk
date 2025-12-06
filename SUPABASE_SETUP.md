# Supabase Integration Setup Guide

This application is integrated with Supabase for authentication and database operations.

## Prerequisites

1. A Supabase account and project
2. The database schema files in `app/database schema/` should be run in your Supabase SQL editor

## Setup Steps

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for your project to be fully provisioned

### 2. Set Up Database Schema

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL files in this order:
   - `app/database schema/001_create_tables.sql`
   - `app/database schema/002_create_indexes.sql`
   - `app/database schema/003_enable_rls.sql`
   - `app/database schema/004_update_conversations_email_based.sql` (Updates conversations to be email-based)

### 3. Configure Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

To find these values:
- Go to your Supabase project dashboard
- Navigate to Settings → API
- Copy the Project URL and anon/public key
- Copy the service_role key (keep this secret!)

### 4. Update Row Level Security (RLS) Policies

The RLS policies in `003_enable_rls.sql` use `auth.uid()` which should match the business ID. However, you may need to adjust the policies based on your authentication flow.

**Important**: The current RLS policies assume that:
- The business ID matches the Supabase Auth user ID
- Users authenticate through Supabase Auth

If you need to adjust RLS policies, you can do so in the Supabase dashboard under Authentication → Policies.

### 5. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Try signing up a new user at `/signup`
3. Complete onboarding at `/onboarding`
4. Test the dashboard and conversation features

## Key Integration Points

### Authentication
- Uses Supabase Auth for user authentication
- User signup creates both an Auth user and a business record
- Sessions are managed by Supabase automatically

### Conversations
- Conversations are based on customer email (not phone number)
- Customers must provide their name and email before starting a chat
- Each email address can have one conversation per business
- Conversations are identified by the combination of `business_id` and `customer_email`

### Database Operations
- All database operations go through `lib/supabase/db.ts`
- The `storage` object in `lib/storage.ts` now uses Supabase instead of localStorage
- All operations are asynchronous

### Middleware
- `middleware.ts` handles session refresh automatically
- Protects routes that require authentication

## Troubleshooting

### "Row Level Security Policy" Errors
- Check that RLS policies are correctly set up
- Verify that the business ID matches the authenticated user ID
- Ensure the policies allow the operations you're trying to perform

### Authentication Issues
- Verify your environment variables are set correctly
- Check that the Supabase project is active
- Ensure email confirmation is disabled in Supabase Auth settings (for development)

### Database Connection Errors
- Verify your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check that the database tables were created successfully
- Ensure your Supabase project is not paused

### Real-time WebSocket Subscriptions

The application uses Supabase real-time (WebSockets) for automatic message updates:
- Messages appear instantly when sent or received
- No page refresh needed
- Real-time subscriptions are automatically set up when conversations load
- **Automatic polling fallback** if WebSocket connection fails

**CRITICAL SETUP STEP**: To enable real-time features:
1. Go to your Supabase project dashboard
2. Navigate to **Database → Replication**
3. **Enable replication** for:
   - `messages` table ✅
   - `conversations` table ✅

**Without enabling replication, messages will require manual refresh.**

See `REALTIME_SETUP.md` for detailed troubleshooting guide.

## Additional Notes

- The `password_hash` field in the businesses table is kept for schema compatibility but is not used since authentication is handled by Supabase Auth
- The service role key should only be used server-side and never exposed to the client
- Consider setting up database backups in Supabase for production use
- Real-time subscriptions automatically reconnect if the connection is lost


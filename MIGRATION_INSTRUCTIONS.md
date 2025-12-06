# Database Migration Instructions

## Missing Column: `online` in `businesses` table

You're seeing this error because the `online` column hasn't been added to your Supabase database yet:

```
"Could not find the 'online' column of 'businesses' in the schema cache"
```

## How to Fix

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the following migration file:

**File:** `app/database schema/008_add_online_status.sql`

Or copy and paste this SQL directly:

```sql
-- Add online status column to businesses table
ALTER TABLE businesses
ADD COLUMN IF NOT EXISTS online BOOLEAN DEFAULT false;

-- Create index for faster online status queries
CREATE INDEX IF NOT EXISTS idx_businesses_online ON businesses(online) WHERE online = true;
```

4. Click **Run** to execute the migration
5. The `online` column will be added to your `businesses` table
6. Try saving your settings again - it should work now!

## Note

The code has been updated to handle this gracefully - if the column doesn't exist, it will skip updating the online status and continue with other updates. However, you should still run the migration to enable the full online/offline functionality.


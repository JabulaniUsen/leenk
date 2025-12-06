-- Add online status column to businesses table
ALTER TABLE businesses
ADD COLUMN IF NOT EXISTS online BOOLEAN DEFAULT false;

-- Create index for faster online status queries
CREATE INDEX IF NOT EXISTS idx_businesses_online ON businesses(online) WHERE online = true;


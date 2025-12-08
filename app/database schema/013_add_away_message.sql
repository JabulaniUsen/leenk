-- Add away message columns to businesses table
ALTER TABLE businesses
ADD COLUMN IF NOT EXISTS away_message TEXT,
ADD COLUMN IF NOT EXISTS away_message_enabled BOOLEAN DEFAULT false;

-- Create index for faster away message queries
CREATE INDEX IF NOT EXISTS idx_businesses_away_enabled ON businesses(away_message_enabled) WHERE away_message_enabled = true;


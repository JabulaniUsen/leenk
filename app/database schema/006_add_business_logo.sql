-- Add business_logo column to businesses table
ALTER TABLE businesses
ADD COLUMN IF NOT EXISTS business_logo TEXT;


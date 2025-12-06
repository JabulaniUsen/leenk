-- Update conversations table to be email-based instead of phone-based
-- This migration script should be run after the initial schema setup

-- First, drop the existing unique constraint on phone
ALTER TABLE conversations 
DROP CONSTRAINT IF EXISTS conversations_business_id_customer_phone_key;

-- Add a new unique constraint on email (email is now required and unique per business)
ALTER TABLE conversations
ADD CONSTRAINT conversations_business_id_customer_email_key 
UNIQUE(business_id, customer_email);

-- Make customer_email NOT NULL (it's now required)
ALTER TABLE conversations
ALTER COLUMN customer_email SET NOT NULL;

-- Make customer_phone nullable (it's now optional)
ALTER TABLE conversations
ALTER COLUMN customer_phone DROP NOT NULL;

-- Update the index to be based on email instead of phone
DROP INDEX IF EXISTS idx_conversations_business_customer;
CREATE INDEX IF NOT EXISTS idx_conversations_business_email 
ON conversations(business_id, customer_email);


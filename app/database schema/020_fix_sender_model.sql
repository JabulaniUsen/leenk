-- Fix sender model: Replace sender_type + sender_id TEXT with cleaner structure
-- Backward compatible: Add new columns, keep old ones, migrate gradually

-- Create enum type if it doesn't exist
DO $$ BEGIN
  CREATE TYPE sender_type_enum AS ENUM ('business', 'customer');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add new sender columns
ALTER TABLE messages
ADD COLUMN IF NOT EXISTS sender sender_type_enum NULL,
ADD COLUMN IF NOT EXISTS business_id UUID NULL REFERENCES businesses(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS customer_email TEXT NULL;

-- Migrate existing data: populate new columns from old ones
UPDATE messages m
SET 
  sender = CASE 
    WHEN m.sender_type = 'business' THEN 'business'::sender_type_enum
    WHEN m.sender_type = 'customer' THEN 'customer'::sender_type_enum
    ELSE NULL
  END,
  business_id = CASE 
    WHEN m.sender_type = 'business' AND m.sender_id != 'customer' THEN m.sender_id::uuid
    ELSE NULL
  END,
  customer_email = CASE 
    WHEN m.sender_type = 'customer' THEN 
      (SELECT customer_email FROM conversations WHERE id = m.conversation_id)
    ELSE NULL
  END
WHERE sender IS NULL;

-- Add indexes for new columns
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender);
CREATE INDEX IF NOT EXISTS idx_messages_business_id ON messages(business_id) WHERE business_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_messages_customer_email ON messages(customer_email) WHERE customer_email IS NOT NULL;

-- Note: We keep sender_type and sender_id for backward compatibility
-- Future: Can remove old columns after full migration


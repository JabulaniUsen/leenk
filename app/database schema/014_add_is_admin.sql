-- Add is_admin column to businesses table
ALTER TABLE businesses 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Create index for faster admin queries
CREATE INDEX IF NOT EXISTS idx_businesses_is_admin 
ON businesses(is_admin) 
WHERE is_admin = TRUE;

-- Add comment
COMMENT ON COLUMN businesses.is_admin IS 'Indicates if the business user has admin privileges';


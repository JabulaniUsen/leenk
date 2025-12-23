-- Fix storage policies to prevent cross-business access
-- Backward compatible: existing uploads continue to work

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Businesses can upload their own logo" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read business logos" ON storage.objects;
DROP POLICY IF EXISTS "Businesses can update their own logo" ON storage.objects;
DROP POLICY IF EXISTS "Businesses can delete their own logo" ON storage.objects;

-- Allow authenticated users to upload their own business logo
CREATE POLICY "Businesses can upload their own logo"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'business_logo' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public to read business logos (needed for displaying logos)
CREATE POLICY "Anyone can read business logos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'business_logo');

-- Allow authenticated users to update their own business logo only
CREATE POLICY "Businesses can update their own logo"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'business_logo' AND
  (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'business_logo' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to delete their own business logo only
CREATE POLICY "Businesses can delete their own logo"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'business_logo' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Add policies for message images bucket (if it exists or will exist)
-- Prevent cross-business access to message images
CREATE POLICY "Businesses can upload message images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'message_images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Anyone can read message images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'message_images');

CREATE POLICY "Businesses can delete own message images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'message_images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);


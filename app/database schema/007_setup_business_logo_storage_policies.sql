-- Storage policies for business_logo bucket
-- These policies allow businesses to manage their own logos
-- Note: The business ID matches the Supabase Auth user ID (auth.uid())

-- Drop existing policies if they exist (for re-running the migration)
DROP POLICY IF EXISTS "Businesses can upload their own logo" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read business logos" ON storage.objects;
DROP POLICY IF EXISTS "Businesses can update their own logo" ON storage.objects;
DROP POLICY IF EXISTS "Businesses can delete their own logo" ON storage.objects;

-- Allow authenticated users to upload their own business logo
-- The folder structure is: {businessId}/{filename}
CREATE POLICY "Businesses can upload their own logo"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'business_logo' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow anyone to read business logos (public access for displaying logos)
CREATE POLICY "Anyone can read business logos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'business_logo');

-- Allow authenticated users to update their own business logo
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

-- Allow authenticated users to delete their own business logo
CREATE POLICY "Businesses can delete their own logo"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'business_logo' AND
  (storage.foldername(name))[1] = auth.uid()::text
);


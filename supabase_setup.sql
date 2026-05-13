-- 1. Create Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies
-- Allow anyone to view the gallery
CREATE POLICY "Public Access" ON gallery
  FOR SELECT USING (true);

-- Allow authenticated users (Bakery Owner) to manage the gallery
CREATE POLICY "Admin Manage" ON gallery
  FOR ALL TO authenticated
  USING (true);

-- 4. Storage Setup
-- Note: You must manually create a bucket named 'images' in the Supabase Storage dashboard.
-- Set the bucket to 'Public'.

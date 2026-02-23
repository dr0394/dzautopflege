/*
  # Ensure admin users exist

  1. Admin Users
    - Creates admin users if they don't exist
    - Sets up proper credentials
  
  2. Security
    - Ensures RLS is enabled
    - Maintains existing policies
*/

-- First, ensure the admin_users table exists with proper structure
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  is_active boolean DEFAULT true
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'admin_users' 
    AND policyname = 'Authenticated users can read admin_users'
  ) THEN
    CREATE POLICY "Authenticated users can read admin_users"
      ON admin_users
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Insert admin users (only if they don't exist)
INSERT INTO admin_users (email, password_hash, name, is_active)
VALUES 
  ('admin@autopflege-profi.de', 'admin123', 'AutoPflege Admin', true),
  ('admin@autopflege-chouman.de', 'Chouman2025!', 'Chouman Admin', true)
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  name = EXCLUDED.name,
  is_active = EXCLUDED.is_active;
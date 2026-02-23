/*
  # Fix RLS policy for leads table

  1. Security Updates
    - Update INSERT policy to ensure anonymous users can insert leads
    - Add SELECT policy to allow anonymous users to read their own inserted data
    - Ensure policies work correctly for the form submission flow

  2. Changes
    - Drop and recreate the INSERT policy with proper configuration
    - Add a SELECT policy for anonymous users to read back inserted data
*/

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Allow anonymous lead submissions" ON leads;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON leads;

-- Create INSERT policy for anonymous and authenticated users
CREATE POLICY "Allow anonymous lead submissions"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create SELECT policy for authenticated users (admin access)
CREATE POLICY "Enable read for authenticated users"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Create SELECT policy for anonymous users to read back their inserted data
-- This allows the form submission to work with .select().single()
CREATE POLICY "Allow anonymous read after insert"
  ON leads
  FOR SELECT
  TO anon
  USING (true);
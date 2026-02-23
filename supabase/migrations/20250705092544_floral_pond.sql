/*
  # Fix RLS policy for leads table

  1. Security Updates
    - Drop existing INSERT policy for leads table
    - Create new INSERT policy that properly allows anonymous users to insert leads
    - Ensure the policy works with both authenticated and anonymous users

  2. Changes
    - Remove restrictive INSERT policy
    - Add comprehensive INSERT policy for public access
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Allow public to insert leads" ON leads;

-- Create a new INSERT policy that allows both anonymous and authenticated users
CREATE POLICY "Enable insert for anonymous and authenticated users"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Ensure the SELECT policy also works for anonymous users (for any potential reads)
DROP POLICY IF EXISTS "Allow authenticated users to read leads" ON leads;

CREATE POLICY "Enable read for authenticated users"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);
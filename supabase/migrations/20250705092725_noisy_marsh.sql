/*
  # Fix leads table insert policy

  1. Security Changes
    - Drop the existing restrictive insert policy for leads table
    - Create a new policy that properly allows anonymous users to insert leads
    - Ensure customers can submit the form without authentication

  This fixes the "new row violates row-level security policy" error when customers
  try to submit the contact form on the /anfrage page.
*/

-- Drop the existing insert policy that's causing issues
DROP POLICY IF EXISTS "Enable insert for anonymous and authenticated users" ON leads;

-- Create a new policy that allows anonymous users to insert leads
CREATE POLICY "Allow anonymous lead submissions"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
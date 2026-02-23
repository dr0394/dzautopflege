/*
  # Update leads table for Auto Cleaning service

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `postal_code` (text)
      - `services` (text array)
      - `vehicle_type` (text) - changed from garden_size
      - `urgency` (text)
      - `photo_url` (text, nullable)
      - `first_name` (text)
      - `last_name` (text)
      - `phone` (text)
      - `email` (text, nullable)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for public insert access (form submissions)
    - Add policy for authenticated read access (admin dashboard)
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  postal_code text NOT NULL,
  services text[] NOT NULL DEFAULT '{}',
  vehicle_type text NOT NULL DEFAULT '',
  urgency text NOT NULL DEFAULT 'später',
  photo_url text,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  email text
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow public to insert leads (form submissions)
CREATE POLICY "Allow public to insert leads"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to read leads (admin access)
CREATE POLICY "Allow authenticated users to read leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);
/*
  # Update admin authentication and RLS policies

  1. Security Updates
    - Update RLS policies for admin operations
    - Ensure proper authentication flow
    - Add policies for authenticated admin users

  2. Changes
    - Update leads table policies for authenticated users
    - Update quotes table policies for authenticated users
    - Update email_logs table policies for authenticated users
*/

-- Update leads table policies
DROP POLICY IF EXISTS "Admins can update leads" ON leads;
CREATE POLICY "Authenticated users can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Update quotes table policies
DROP POLICY IF EXISTS "Admins can update quotes" ON quotes;
CREATE POLICY "Authenticated users can update quotes"
  ON quotes
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Update email_logs table policies
DROP POLICY IF EXISTS "Admins can insert email_logs" ON email_logs;
CREATE POLICY "Authenticated users can insert email_logs"
  ON email_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read all email_logs" ON email_logs;
CREATE POLICY "Authenticated users can read all email_logs"
  ON email_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- Update admin_users table policies
DROP POLICY IF EXISTS "Admins can read all admin_users" ON admin_users;
CREATE POLICY "Authenticated users can read admin_users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);
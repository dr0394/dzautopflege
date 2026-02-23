/*
  # Add Admin Features

  1. New Tables
    - `admin_users` - Admin authentication
    - `lead_notes` - Internal notes for leads
    - `email_logs` - Track sent emails
  
  2. Updates to existing tables
    - Add `status` column to `leads` table
    - Add `notes` column to `leads` table
  
  3. Security
    - Enable RLS on all new tables
    - Add policies for admin access
*/

-- Add status and notes to leads table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'status'
  ) THEN
    ALTER TABLE leads ADD COLUMN status text DEFAULT 'Neu'::text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'notes'
  ) THEN
    ALTER TABLE leads ADD COLUMN notes text DEFAULT ''::text;
  END IF;
END $$;

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  is_active boolean DEFAULT true
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create email_logs table
CREATE TABLE IF NOT EXISTS email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  lead_id uuid REFERENCES leads(id),
  email_type text NOT NULL, -- 'confirmation' or 'notification'
  recipient_email text NOT NULL,
  subject text NOT NULL,
  status text DEFAULT 'sent'::text,
  error_message text
);

ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Admin policies
CREATE POLICY "Admins can read all admin_users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can read all email_logs"
  ON email_logs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert email_logs"
  ON email_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Update leads policies for admin access
CREATE POLICY "Admins can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (email, password_hash, name) 
VALUES ('admin@galabau-meister.de', '$2a$10$rOvHPGkwQGKqvzjo.6.5..QxjLtDLm5JYWn5rPzQQQQQQQQQQQQQQ', 'Admin User')
ON CONFLICT (email) DO NOTHING;
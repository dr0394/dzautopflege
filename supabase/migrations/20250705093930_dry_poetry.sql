/*
  # Add quotes table for storing quote data

  1. New Tables
    - `quotes`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `lead_id` (uuid, foreign key to leads)
      - `quote_number` (text, unique)
      - `items` (jsonb, array of quote items)
      - `subtotal` (decimal)
      - `tax` (decimal)
      - `total` (decimal)
      - `valid_until` (date)
      - `notes` (text, nullable)
      - `status` (text, default 'sent')
      - `pdf_url` (text, nullable)

  2. Security
    - Enable RLS on `quotes` table
    - Add policies for admin access
*/

CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  lead_id uuid REFERENCES leads(id) ON DELETE CASCADE,
  quote_number text UNIQUE NOT NULL,
  items jsonb NOT NULL DEFAULT '[]',
  subtotal decimal(10,2) NOT NULL DEFAULT 0,
  tax decimal(10,2) NOT NULL DEFAULT 0,
  total decimal(10,2) NOT NULL DEFAULT 0,
  valid_until date NOT NULL,
  notes text,
  status text DEFAULT 'sent',
  pdf_url text
);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Admin policies for quotes
CREATE POLICY "Admins can read all quotes"
  ON quotes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert quotes"
  ON quotes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update quotes"
  ON quotes
  FOR UPDATE
  TO authenticated
  USING (true);

-- Update email_logs to support quote emails
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'email_logs' AND column_name = 'quote_id'
  ) THEN
    ALTER TABLE email_logs ADD COLUMN quote_id uuid REFERENCES quotes(id);
  END IF;
END $$;
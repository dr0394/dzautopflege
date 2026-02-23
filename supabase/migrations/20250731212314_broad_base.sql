/*
  # Add answers column to leads table

  1. Changes
    - Add `answers` column to `leads` table
    - Column type: JSONB for storing form responses
    - Default value: empty JSON object
    - Allow null values for backward compatibility

  2. Purpose
    - Store detailed form responses from the vehicle cleaning request form
    - Enable better lead qualification and analysis
    - Support complex nested data structures
*/

-- Add answers column to leads table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'answers'
  ) THEN
    ALTER TABLE leads ADD COLUMN answers jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;
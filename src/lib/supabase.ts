import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://0ec90b57d6e95fcbda19832f.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNzM2MDAsImV4cCI6MjA1NTY0OTYwMH0.kQZ0n3h9y3qQ7yP_B0pGx8xK4f5dR6jT9vW2nN5oM8g'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type LeadData = {
  id?: string
  created_at?: string
  postal_code: string
  services?: string[]
  vehicle_type?: string
  urgency?: string
  photo_url?: string
  first_name: string
  last_name: string
  phone: string
  email?: string
  status?: string
  notes?: string
  answers?: {
    service_type?: string
    vehicle_type?: string
    vehicle_condition?: string
    frequency?: string
    cleaning_location?: string
    budget?: string
    timeframe?: string
    qualification_score?: number
    ready_to_book?: boolean
    [key: string]: any
  }
}
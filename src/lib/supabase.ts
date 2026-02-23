import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

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
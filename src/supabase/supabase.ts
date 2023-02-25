import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  (import.meta as any).env.VITE_SUPABASE_URL || 'https://vkddekyjmknkhymzqmva.supabase.co'
const supabaseAnonKey =
  (import.meta as any).env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrZGRla3lqbWtua2h5bXpxbXZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUxNjIyMDcsImV4cCI6MTk5MDczODIwN30.K3LV0GwZLo_mz1cWNvhv_n2P98jQQOAHkn6ah8qHmpA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

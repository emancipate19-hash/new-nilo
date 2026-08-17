import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve Supabase environment variables
const supabaseUrl: string = 
  (import.meta.env.VITE_SUPABASE_URL as string) || 
  (import.meta.env.VITE_PUBLIC_SUPABASE_URL as string) || 
  '';

const supabaseAnonKey: string = 
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string) || 
  (import.meta.env.VITE_SUPABASE_KEY as string) || 
  '';

// Create a singleton Supabase client instance
// If credentials are not configured yet, use safe fallback to avoid throwing at startup
export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

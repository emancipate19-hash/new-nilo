import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Deployed project URL
export const DEFAULT_SUPABASE_URL = 'https://eyzsdftddznlmonfpnko.supabase.co';

// Retrieve Supabase environment variables with explicit fallback to deployed project
export const supabaseUrl: string = 
  (import.meta.env.VITE_SUPABASE_URL as string) || 
  (import.meta.env.VITE_PUBLIC_SUPABASE_URL as string) || 
  DEFAULT_SUPABASE_URL;

export const supabaseAnonKey: string = 
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string) || 
  (import.meta.env.VITE_SUPABASE_KEY as string) || 
  '';


// Create a singleton Supabase client instance pointing directly to your Supabase project
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey || 'anon-key-placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  }
);

export const isSupabaseConfigured: boolean = Boolean(supabaseAnonKey && supabaseAnonKey !== 'anon-key-placeholder');
export const checkIsSupabaseConfigured = (): boolean => Boolean(supabaseAnonKey && supabaseAnonKey !== 'anon-key-placeholder');


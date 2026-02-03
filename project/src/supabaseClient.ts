import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Load Supabase credentials from Vite environment variables
const supabaseUrl: string | undefined = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey: string | undefined = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Safe checks to ensure credentials are defined
if (!supabaseUrl) {
	console.error('VITE_SUPABASE_URL is not defined. Please set it in your .env file.');
}
if (!supabaseAnonKey) {
	console.error('VITE_SUPABASE_ANON_KEY is not defined. Please set it in your .env file.');
}

// Only create the client if both variables are present
export const supabase: SupabaseClient | undefined =
	supabaseUrl && supabaseAnonKey
		? createClient(supabaseUrl, supabaseAnonKey)
		: undefined;

// Usage: Always check if supabase is defined before using it
// Example: if (!supabase) throw new Error('Supabase client not initialized');
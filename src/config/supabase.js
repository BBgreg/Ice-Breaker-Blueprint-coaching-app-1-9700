import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'example-key';

// Create a mock supabase client if credentials aren't valid
let supabase;

try {
  supabase = createClient(supabaseUrl, supabaseKey);
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  
  // Mock implementation for development
  supabase = {
    from: () => ({
      insert: () => Promise.resolve({ data: [{ id: 'mock-id' }], error: null }),
      select: () => Promise.resolve({ data: [], error: null }),
    }),
    auth: {
      signUp: () => Promise.resolve({ data: { user: { id: 'mock-user' } }, error: null }),
      signIn: () => Promise.resolve({ data: { user: { id: 'mock-user' } }, error: null }),
    }
  };
}

export { supabase };
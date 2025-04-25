
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dalogwbqgjmfegchykcs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbG9nd2JxZ2ptZmVnY2h5a2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NzA2MDgsImV4cCI6MjA2MTE0NjYwOH0.ZPtD5zAXbq72UMj_qAU07mk8s8jlqDiZZ0vcVZ4ZrnY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});

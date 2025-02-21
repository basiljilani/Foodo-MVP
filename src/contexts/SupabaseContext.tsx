import React, { createContext, useContext } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SupabaseContext = createContext<SupabaseClient | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabaseClient() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabaseClient must be used within a SupabaseProvider');
  }
  return context;
}

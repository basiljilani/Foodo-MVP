import React, { createContext, useContext } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

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

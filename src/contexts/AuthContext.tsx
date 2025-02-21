import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { Tables } from '../lib/supabase';

interface AuthUser {
  id: string;
  role: 'customer' | 'vendor' | 'admin';
  email: string;
  profile: {
    full_name: string;
    avatar_url?: string;
    phone_number?: string;
    bio?: string;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, role: 'customer' | 'vendor') => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isVendor: () => boolean;
  isCustomer: () => boolean;
  updateProfile: (data: Partial<AuthUser['profile']>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUser(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUser(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUser = async (authUser: User) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', authUser.id)
        .single();

      if (error) throw error;

      if (data) {
        setUser({
          id: data.id,
          role: data.role,
          email: data.email,
          profile: {
            full_name: data.full_name,
            avatar_url: data.avatar_url,
            phone_number: data.phone_number,
            bio: data.bio,
          }
        });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, role: 'customer' | 'vendor') => {
    const { data: { user: authUser }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          full_name: email.split('@')[0] // temporary name until profile is updated
        }
      }
    });

    if (error) throw error;
    if (!authUser) throw new Error('No user returned from sign up');
  };

  const signIn = async (email: string, password: string) => {
    const { data: { user: authUser }, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    if (!authUser) throw new Error('No user returned from sign in');
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const isVendor = () => user?.role === 'vendor';
  const isCustomer = () => user?.role === 'customer';

  const updateProfile = async (data: Partial<AuthUser['profile']>) => {
    if (!user) throw new Error('No user logged in');

    const { error } = await supabase
      .from('users')
      .update({
        full_name: data.full_name,
        avatar_url: data.avatar_url,
        phone_number: data.phone_number,
        bio: data.bio,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) throw error;

    setUser(prev => prev ? {
      ...prev,
      profile: { ...prev.profile, ...data }
    } : null);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    isVendor,
    isCustomer,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

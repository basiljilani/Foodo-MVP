import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'foodo-auth-token', // Use a unique storage key
    storage: window.localStorage,
  },
});

// Type definitions for our database tables
export type Tables = {
  users: {
    id: string;
    auth_id: string;
    email: string;
    full_name: string;
    role: 'customer' | 'vendor' | 'admin';
    avatar_url?: string;
    phone_number?: string;
    bio?: string;
    created_at: string;
    updated_at: string;
  };
  user_preferences: {
    id: string;
    user_id: string;
    dietary_preferences: string[];
    food_allergies: string[];
    favorite_cuisines: string[];
    favorite_restaurants: string[];
    meal_preferences: string[];
    spice_level: 'low' | 'medium' | 'high';
    price_range: 'low' | 'medium' | 'high';
    ordering_time: string[];
    cravings: string[];
    created_at: string;
    updated_at: string;
  };
  user_addresses: {
    id: string;
    user_id: string;
    type: 'home' | 'work' | 'other';
    name: string;
    address: string;
    is_default: boolean;
    created_at: string;
    updated_at: string;
  };
  user_payment_methods: {
    id: string;
    user_id: string;
    type: 'credit_card' | 'debit_card';
    last4: string;
    expiry: string;
    is_default: boolean;
    created_at: string;
    updated_at: string;
  };
  user_notification_settings: {
    id: string;
    user_id: string;
    email_notifications: boolean;
    push_notifications: boolean;
    sms_notifications: boolean;
    order_updates: boolean;
    promotional_emails: boolean;
    special_offers: boolean;
    newsletter: boolean;
    created_at: string;
    updated_at: string;
  };
};

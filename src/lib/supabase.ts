import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rijyjhpfbtqnzzagfown.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpanlqaHBmYnRxbnp6YWdmb3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5OTA4NTgsImV4cCI6MjA1NTU2Njg1OH0.NpmEQds9oV0jokCBOtkrjcV5d2lTYTYbZeWm3ta9eaU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for our database tables
export type Tables = {
  users: {
    id: string;
    full_name: string;
    avatar_url?: string;
    phone_number?: string;
    created_at: string;
    updated_at: string;
  };
  vendors: {
    id: string;
    user_id: string;
    business_name: string;
    business_email: string;
    business_phone: string;
    tax_id?: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
  };
  restaurants: {
    id: string;
    vendor_id: string;
    name: string;
    description?: string;
    cuisine_type?: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    latitude?: number;
    longitude?: number;
    phone_number: string;
    email?: string;
    website_url?: string;
    opening_hours?: Record<string, any>;
    delivery_radius?: number;
    minimum_order_amount?: number;
    is_active: boolean;
    featured_image_url?: string;
    created_at: string;
    updated_at: string;
  };
  menu_categories: {
    id: string;
    restaurant_id: string;
    name: string;
    description?: string;
    display_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
  menu_items: {
    id: string;
    category_id: string;
    name: string;
    description?: string;
    price: number;
    image_url?: string;
    is_vegetarian: boolean;
    is_vegan: boolean;
    is_gluten_free: boolean;
    spice_level?: number;
    preparation_time?: number;
    is_available: boolean;
    created_at: string;
    updated_at: string;
  };
  reviews: {
    id: string;
    restaurant_id: string;
    user_id: string;
    rating: number;
    review_text?: string;
    images?: string[];
    is_verified: boolean;
    created_at: string;
    updated_at: string;
  };
};

export interface RestaurantMoreInfo {
  id: number;
  restaurant_id: number;
  title: string;
  description: string | null;
  icon_name: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Restaurant {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
  banner_image: string | null;
  logo: string | null;
  theme_color: string | null;
  opening_hours: string | null;
  tags: string[] | null;
  category: string | null;
  price_range: string | null;
  featured: boolean;
  rating: number | null;
  contact: any;
  location: any;
  settings: any;
  created_at: string;
  updated_at: string;
  menu_categories?: MenuCategory[];
  more_info?: RestaurantMoreInfo[];
  restaurant_ads?: RestaurantAd[];
}

export interface MenuCategory {
  id: number;
  name: string;
  display_order: number;
  restaurant_id: number;
  menu_items: MenuItem[];
}

export interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category: string;
  menu_category_id: number;
}

export interface RestaurantAd {
  id: number;
  restaurant_id: number;
  title: string;
  description: string | null;
  image_url: string;
  link_url: string | null;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface RestaurantAds {
  Row: {
    id: number;
    restaurant_id: number;
    title: string;
    description: string | null;
    image_url: string;
    link_url: string | null;
    start_date: string;
    end_date: string | null;
    is_active: boolean;
    display_order: number;
    created_at: string;
    updated_at: string;
  }
  Insert: {
    id?: number;
    restaurant_id: number;
    title: string;
    description?: string | null;
    image_url: string;
    link_url?: string | null;
    start_date?: string;
    end_date?: string | null;
    is_active?: boolean;
    display_order?: number;
    created_at?: string;
    updated_at?: string;
  }
  Update: {
    id?: number;
    restaurant_id?: number;
    title?: string;
    description?: string | null;
    image_url?: string;
    link_url?: string | null;
    start_date?: string;
    end_date?: string | null;
    is_active?: boolean;
    display_order?: number;
    created_at?: string;
    updated_at?: string;
  }
}

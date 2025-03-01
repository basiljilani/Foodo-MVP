-- Create a flat, easy-to-use unified restaurants table
CREATE TABLE unified_restaurants (
    -- Primary Key
    id BIGSERIAL PRIMARY KEY,
    
    -- Restaurant ID (to group items by restaurant)
    restaurant_id INTEGER NOT NULL,
    
    -- Category ID (to group items by category within a restaurant)
    category_id INTEGER NOT NULL,
    
    -- Restaurant Info
    restaurant_name TEXT NOT NULL,
    restaurant_description TEXT,
    restaurant_image TEXT,
    restaurant_banner_image TEXT,
    restaurant_logo TEXT,
    restaurant_theme_color TEXT,
    
    -- Location & Contact
    restaurant_address TEXT,
    restaurant_city TEXT,
    restaurant_latitude DECIMAL(10,8),
    restaurant_longitude DECIMAL(11,8),
    restaurant_phone TEXT,
    restaurant_email TEXT,
    restaurant_website TEXT,
    restaurant_delivery_radius DECIMAL(10,2),
    
    -- Social Media
    instagram_link TEXT,
    facebook_link TEXT,
    whatsapp_number TEXT,
    
    -- Business Info
    opening_hours TEXT,
    delivery_time TEXT,
    minimum_order DECIMAL(10,2),
    delivery_fee DECIMAL(10,2),
    price_range TEXT,
    estimated_delivery_time TEXT,
    accepts_online_payment BOOLEAN DEFAULT false,
    
    -- Ratings & Features
    rating DECIMAL(3,2),
    reviews_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_top_restaurant BOOLEAN DEFAULT false,
    has_happy_hours BOOLEAN DEFAULT false,
    is_open BOOLEAN DEFAULT true,
    auto_accept_orders BOOLEAN DEFAULT false,
    
    -- Categories & Tags
    restaurant_categories TEXT,  -- Comma-separated categories
    restaurant_tags TEXT,        -- Comma-separated tags
    
    -- Menu Category Info
    category_name TEXT,
    category_display_order INTEGER,
    
    -- Menu Item Info
    item_name TEXT,
    item_description TEXT,
    item_price DECIMAL(10,2),
    item_image TEXT,
    item_is_available BOOLEAN DEFAULT true,
    item_preparation_time TEXT,
    item_allergens TEXT,         -- Comma-separated allergens
    item_spicy_level TEXT,
    item_is_vegetarian BOOLEAN DEFAULT false,
    item_is_vegan BOOLEAN DEFAULT false,
    
    -- Deals
    deal_title TEXT,
    deal_description TEXT,
    deal_price DECIMAL(10,2),
    deal_is_active BOOLEAN DEFAULT true,
    
    -- Ads
    ad_title TEXT,
    ad_description TEXT,
    ad_image_url TEXT,
    ad_link_url TEXT,
    ad_start_date TIMESTAMP WITH TIME ZONE,
    ad_end_date TIMESTAMP WITH TIME ZONE,
    ad_is_active BOOLEAN DEFAULT true,
    ad_display_order INTEGER,
    
    -- Additional Info
    info_title TEXT,
    info_description TEXT,
    info_icon_name TEXT,
    info_display_order INTEGER,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    
    -- Add unique constraint to prevent duplicates
    UNIQUE(restaurant_id, category_id, item_name)
);

-- Create views to maintain compatibility with existing frontend

-- Main restaurant view (for restaurant cards and basic info)
CREATE OR REPLACE VIEW restaurants_view AS
SELECT DISTINCT
    restaurant_id as id,
    restaurant_name as name,
    restaurant_description as description,
    restaurant_image as image,
    restaurant_banner_image as banner_image,
    restaurant_logo as logo,
    restaurant_theme_color as theme_color,
    opening_hours,
    price_range,
    rating,
    reviews_count,
    is_featured as featured,
    is_top_restaurant,
    has_happy_hours,
    restaurant_categories as categories,
    restaurant_tags as tags,
    jsonb_build_object(
        'phone', restaurant_phone,
        'email', restaurant_email,
        'website', restaurant_website
    ) as contact,
    jsonb_build_object(
        'address', restaurant_address,
        'city', restaurant_city,
        'latitude', restaurant_latitude,
        'longitude', restaurant_longitude,
        'delivery_radius', restaurant_delivery_radius
    ) as location,
    jsonb_build_object(
        'minimum_order', minimum_order,
        'delivery_fee', delivery_fee,
        'delivery_time', delivery_time,
        'accepts_online_payment', accepts_online_payment,
        'is_open', is_open,
        'auto_accept_orders', auto_accept_orders
    ) as settings,
    jsonb_build_object(
        'instagram', instagram_link,
        'facebook', facebook_link,
        'whatsapp', whatsapp_number
    ) as social_media,
    created_at,
    updated_at
FROM unified_restaurants;

-- Menu categories view
CREATE OR REPLACE VIEW menu_categories_view AS
SELECT DISTINCT
    restaurant_id,
    category_id as id,
    category_name as name,
    category_display_order as display_order
FROM unified_restaurants
ORDER BY category_display_order;

-- Menu items view
CREATE OR REPLACE VIEW menu_items_view AS
SELECT
    id,
    category_id,
    item_name as name,
    item_description as description,
    item_price as price,
    item_image as image,
    item_is_available as is_available,
    item_preparation_time as preparation_time,
    item_allergens::text[] as allergens,
    item_spicy_level as spicy_level,
    item_is_vegetarian as is_vegetarian,
    item_is_vegan as is_vegan,
    '[]'::jsonb as customization_groups,
    created_at,
    updated_at
FROM unified_restaurants;

-- Restaurant ads view
CREATE OR REPLACE VIEW restaurant_ads_view AS
SELECT
    id as ad_id,
    restaurant_id,
    ad_title as title,
    ad_description as description,
    ad_image_url as image_url,
    ad_link_url as link_url,
    ad_start_date as start_date,
    ad_end_date as end_date,
    ad_is_active as is_active,
    ad_display_order as display_order,
    created_at,
    updated_at
FROM unified_restaurants
WHERE ad_title IS NOT NULL;

-- Restaurant more info view
CREATE OR REPLACE VIEW restaurant_more_info_view AS
SELECT
    id as info_id,
    restaurant_id,
    info_title as title,
    info_description as description,
    info_icon_name as icon_name,
    info_display_order as display_order,
    created_at,
    updated_at
FROM unified_restaurants
WHERE info_title IS NOT NULL;

-- Add indexes for better query performance
CREATE INDEX idx_unified_restaurants_restaurant_id ON unified_restaurants(restaurant_id);
CREATE INDEX idx_unified_restaurants_category_id ON unified_restaurants(category_id);

-- Add RLS policies
ALTER TABLE unified_restaurants ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
ON unified_restaurants
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to manage restaurants
CREATE POLICY "Allow authenticated users to manage restaurants"
ON unified_restaurants
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create a view for easy CSV export
CREATE VIEW unified_restaurants_export AS 
SELECT * FROM unified_restaurants;

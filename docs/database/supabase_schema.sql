-- Foodo-MVP Supabase Schema
-- Designed to support 50,000+ restaurant entries
-- Maintains exact data structure expected by frontend

-- Enable UUID extension for primary keys
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable PostGIS for location data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Restaurants table - core restaurant information
CREATE TABLE restaurants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    rating DECIMAL(2,1) NOT NULL,
    cuisine TEXT NOT NULL,
    delivery_time TEXT NOT NULL,
    delivery_fee INTEGER NOT NULL,
    minimum_order INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restaurant branding information
CREATE TABLE restaurant_branding (
    restaurant_id TEXT PRIMARY KEY REFERENCES restaurants(id) ON DELETE CASCADE,
    slogan TEXT,
    theme_color TEXT NOT NULL,
    text_color TEXT NOT NULL,
    since INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restaurant contact information
CREATE TABLE restaurant_contact (
    restaurant_id TEXT PRIMARY KEY REFERENCES restaurants(id) ON DELETE CASCADE,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restaurant social media links
CREATE TABLE restaurant_social_media (
    restaurant_id TEXT PRIMARY KEY REFERENCES restaurants(id) ON DELETE CASCADE,
    facebook TEXT,
    instagram TEXT,
    twitter TEXT,
    whatsapp TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restaurant location (using PostGIS for geospatial queries)
CREATE TABLE restaurant_location (
    restaurant_id TEXT PRIMARY KEY REFERENCES restaurants(id) ON DELETE CASCADE,
    lat DECIMAL(10,7) NOT NULL,
    lng DECIMAL(10,7) NOT NULL,
    geom GEOGRAPHY(POINT) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restaurant operating hours
CREATE TABLE restaurant_hours (
    restaurant_id TEXT PRIMARY KEY REFERENCES restaurants(id) ON DELETE CASCADE,
    monday TEXT,
    tuesday TEXT,
    wednesday TEXT,
    thursday TEXT,
    friday TEXT,
    saturday TEXT,
    sunday TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu categories
CREATE TABLE menu_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id TEXT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    category_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(restaurant_id, category_id)
);

-- Menu items
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id TEXT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    item_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    image TEXT,
    popular BOOLEAN DEFAULT false,
    vegan BOOLEAN DEFAULT false,
    vegetarian BOOLEAN DEFAULT false,
    gluten_free BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(restaurant_id, item_id)
);

-- Menu item categories (junction table for many-to-many relationship)
CREATE TABLE menu_item_categories (
    menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
    category_id TEXT NOT NULL,
    restaurant_id TEXT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (menu_item_id, category_id),
    FOREIGN KEY (restaurant_id, category_id) REFERENCES menu_categories(restaurant_id, category_id)
);

-- Restaurant advertisements
CREATE TABLE restaurant_ads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id TEXT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    ad_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(restaurant_id, ad_id)
);

-- Create indexes for performance optimization
CREATE INDEX idx_restaurant_location_geom ON restaurant_location USING GIST(geom);
CREATE INDEX idx_menu_items_restaurant_id ON menu_items(restaurant_id);
CREATE INDEX idx_menu_categories_restaurant_id ON menu_categories(restaurant_id);
CREATE INDEX idx_restaurant_ads_restaurant_id ON restaurant_ads(restaurant_id);
CREATE INDEX idx_menu_item_categories_restaurant_id ON menu_item_categories(restaurant_id);

-- Add RLS (Row Level Security) policies for data protection
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_branding ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_social_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_location ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_item_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_ads ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Public restaurants are viewable by everyone" ON restaurants FOR SELECT USING (true);
CREATE POLICY "Public restaurant branding viewable by everyone" ON restaurant_branding FOR SELECT USING (true);
CREATE POLICY "Public restaurant contact viewable by everyone" ON restaurant_contact FOR SELECT USING (true);
CREATE POLICY "Public restaurant social media viewable by everyone" ON restaurant_social_media FOR SELECT USING (true);
CREATE POLICY "Public restaurant location viewable by everyone" ON restaurant_location FOR SELECT USING (true);
CREATE POLICY "Public restaurant hours viewable by everyone" ON restaurant_hours FOR SELECT USING (true);
CREATE POLICY "Public menu categories viewable by everyone" ON menu_categories FOR SELECT USING (true);
CREATE POLICY "Public menu items viewable by everyone" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Public menu item categories viewable by everyone" ON menu_item_categories FOR SELECT USING (true);
CREATE POLICY "Public restaurant ads viewable by everyone" ON restaurant_ads FOR SELECT USING (true);

-- Create functions for nearby restaurants (for the Near Me feature)
CREATE OR REPLACE FUNCTION nearby_restaurants(
    user_lat DECIMAL,
    user_lng DECIMAL,
    distance_km INTEGER DEFAULT 5
)
RETURNS TABLE (
    id TEXT,
    name TEXT,
    logo TEXT,
    distance_meters DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        r.id,
        r.name,
        r.logo,
        ST_Distance(
            rl.geom,
            ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography
        ) AS distance_meters
    FROM 
        restaurants r
    JOIN 
        restaurant_location rl ON r.id = rl.restaurant_id
    WHERE 
        ST_DWithin(
            rl.geom,
            ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography,
            distance_km * 1000
        )
    ORDER BY 
        distance_meters ASC;
END;
$$ LANGUAGE plpgsql;

-- Create function to get complete restaurant data in the exact format needed by frontend
CREATE OR REPLACE FUNCTION get_restaurant_data(restaurant_id_param TEXT)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT
        jsonb_build_object(
            'id', r.id,
            'name', r.name,
            'logo', r.logo,
            'coverImage', r.cover_image,
            'rating', r.rating,
            'cuisine', r.cuisine,
            'deliveryTime', r.delivery_time,
            'deliveryFee', r.delivery_fee,
            'minimumOrder', r.minimum_order,
            'branding', jsonb_build_object(
                'slogan', rb.slogan,
                'themeColor', rb.theme_color,
                'textColor', rb.text_color,
                'since', rb.since
            ),
            'contact', jsonb_build_object(
                'address', rc.address,
                'phone', rc.phone,
                'email', rc.email,
                'website', rc.website
            ),
            'socialMedia', jsonb_build_object(
                'facebook', rsm.facebook,
                'instagram', rsm.instagram,
                'twitter', rsm.twitter,
                'whatsapp', rsm.whatsapp
            ),
            'location', jsonb_build_object(
                'lat', rl.lat,
                'lng', rl.lng
            ),
            'hours', jsonb_build_object(
                'monday', rh.monday,
                'tuesday', rh.tuesday,
                'wednesday', rh.wednesday,
                'thursday', rh.thursday,
                'friday', rh.friday,
                'saturday', rh.saturday,
                'sunday', rh.sunday
            ),
            'menuCategories', (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'id', mc.category_id,
                        'name', mc.name,
                        'description', mc.description
                    )
                    ORDER BY mc.display_order
                )
                FROM menu_categories mc
                WHERE mc.restaurant_id = r.id
            ),
            'menuItems', (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'id', mi.item_id,
                        'categoryId', (
                            SELECT jsonb_agg(mic.category_id)
                            FROM menu_item_categories mic
                            WHERE mic.menu_item_id = mi.id
                        ),
                        'name', mi.name,
                        'description', mi.description,
                        'price', mi.price,
                        'image', mi.image,
                        'popular', mi.popular,
                        'vegan', mi.vegan,
                        'vegetarian', mi.vegetarian,
                        'glutenFree', mi.gluten_free
                    )
                )
                FROM menu_items mi
                WHERE mi.restaurant_id = r.id
            ),
            'ads', (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'id', ra.ad_id,
                        'title', ra.title,
                        'description', ra.description,
                        'image', ra.image,
                        'startDate', ra.start_date,
                        'endDate', ra.end_date,
                        'url', ra.url
                    )
                )
                FROM restaurant_ads ra
                WHERE ra.restaurant_id = r.id
            )
        ) INTO result
    FROM restaurants r
    LEFT JOIN restaurant_branding rb ON r.id = rb.restaurant_id
    LEFT JOIN restaurant_contact rc ON r.id = rc.restaurant_id
    LEFT JOIN restaurant_social_media rsm ON r.id = rsm.restaurant_id
    LEFT JOIN restaurant_location rl ON r.id = rl.restaurant_id
    LEFT JOIN restaurant_hours rh ON r.id = rh.restaurant_id
    WHERE r.id = restaurant_id_param;

    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- First create the updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    image TEXT,
    banner_image TEXT,
    logo TEXT,
    theme_color TEXT,
    opening_hours TEXT,
    tags TEXT[],
    category TEXT,
    price_range TEXT,
    featured BOOLEAN DEFAULT false,
    rating DECIMAL(3,2),
    contact JSONB NOT NULL DEFAULT '{}'::jsonb,
    location JSONB NOT NULL DEFAULT '{}'::jsonb,
    settings JSONB NOT NULL DEFAULT '{
        "accepts_online_payment": false,
        "is_featured": false,
        "is_open": false,
        "auto_accept_orders": false
    }'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create menu_categories table
CREATE TABLE IF NOT EXISTS menu_categories (
    id BIGSERIAL PRIMARY KEY,
    restaurant_id BIGINT REFERENCES restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT REFERENCES menu_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image TEXT,
    is_available BOOLEAN DEFAULT true,
    preparation_time TEXT,
    allergens TEXT[],
    spicy_level TEXT,
    is_vegetarian BOOLEAN DEFAULT false,
    is_vegan BOOLEAN DEFAULT false,
    customization_groups JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Create policies for restaurants
CREATE POLICY "Restaurants are viewable by everyone"
    ON restaurants FOR SELECT
    USING (true);

-- Create policies for menu_categories
CREATE POLICY "Menu categories are viewable by everyone"
    ON menu_categories FOR SELECT
    USING (true);

-- Create policies for menu_items
CREATE POLICY "Menu items are viewable by everyone"
    ON menu_items FOR SELECT
    USING (true);

-- Create storage bucket for restaurant images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('restaurant-images', 'restaurant-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for restaurant images
CREATE POLICY "Restaurant images are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'restaurant-images');

-- Create triggers for updated_at
CREATE TRIGGER update_restaurants_updated_at
    BEFORE UPDATE ON restaurants
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_categories_updated_at
    BEFORE UPDATE ON menu_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
    BEFORE UPDATE ON menu_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create helpful views
CREATE OR REPLACE VIEW restaurant_full_menu AS
SELECT 
    r.id as restaurant_id,
    r.name as restaurant_name,
    mc.id as category_id,
    mc.name as category_name,
    mc.display_order,
    mi.id as item_id,
    mi.name as item_name,
    mi.price,
    mi.is_available
FROM restaurants r
LEFT JOIN menu_categories mc ON mc.restaurant_id = r.id
LEFT JOIN menu_items mi ON mi.category_id = mc.id
ORDER BY r.id, mc.display_order, mi.name;

-- Insert sample restaurant data
INSERT INTO restaurants (
    name,
    description,
    image,
    banner_image,
    logo,
    opening_hours,
    tags,
    category,
    price_range,
    rating,
    contact,
    location,
    settings
) VALUES (
    'Sample Restaurant',
    'A delightful dining experience',
    'https://example.com/image.jpg',
    'https://example.com/banner.jpg',
    'https://example.com/logo.jpg',
    '9:00 AM - 10:00 PM',
    ARRAY['Italian', 'Pizza', 'Pasta'],
    'Italian',
    '$$',
    4.5,
    '{"phone": "+1234567890", "email": "sample@restaurant.com"}'::jsonb,
    '{"address": "123 Food Street", "latitude": 40.7128, "longitude": -74.0060}'::jsonb,
    '{
        "minimum_order": 10,
        "delivery_fee": 5,
        "estimated_delivery_time": "30-45 min",
        "accepts_online_payment": true,
        "is_featured": true,
        "is_open": true,
        "auto_accept_orders": true
    }'::jsonb
);

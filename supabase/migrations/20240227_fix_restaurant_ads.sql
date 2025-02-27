-- First, let's see what restaurants we have
SELECT id, name FROM restaurants;

-- Then create a restaurant if none exist
INSERT INTO restaurants (
    name,
    description,
    image,
    category,
    price_range,
    rating,
    contact,
    location,
    tags
) 
SELECT
    'Savour Foods',
    'Authentic Pakistani cuisine with a modern twist',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop',
    'Pakistani',
    '$$',
    4.8,
    '{"phone": "+1234567890", "email": "contact@savourfoods.com"}'::jsonb,
    '{"address": "123 Food Street, Karachi", "coordinates": {"lat": 24.8607, "lng": 67.0011}}'::jsonb,
    ARRAY['Pakistani', 'Desi', 'Biryani']
WHERE NOT EXISTS (SELECT 1 FROM restaurants LIMIT 1);

-- Now get the ID of our restaurant
DO $$
DECLARE
    restaurant_id BIGINT;
BEGIN
    SELECT id INTO restaurant_id FROM restaurants LIMIT 1;

    -- Drop existing ads table if it exists
    DROP TABLE IF EXISTS restaurant_ads;

    -- Create restaurant_ads table
    CREATE TABLE restaurant_ads (
        id BIGSERIAL PRIMARY KEY,
        restaurant_id BIGINT REFERENCES restaurants(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT NOT NULL,
        link_url TEXT,
        start_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
        end_date TIMESTAMP WITH TIME ZONE,
        is_active BOOLEAN DEFAULT true,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
    );

    -- Add RLS policies
    ALTER TABLE restaurant_ads ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Enable read access for all users" ON restaurant_ads
        FOR SELECT USING (true);

    -- Insert sample ads with the correct restaurant_id
    INSERT INTO restaurant_ads (restaurant_id, title, description, image_url, display_order)
    VALUES 
        (restaurant_id, 'Special Discount', '20% off on all orders above $50', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop', 1),
        (restaurant_id, 'New Menu Items', 'Try our new spicy biryani', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop', 2),
        (restaurant_id, 'Weekend Special', 'Free delivery on weekends', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop', 3),
        (restaurant_id, 'Happy Hours', '15% off between 3-6 PM', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop', 4),
        (restaurant_id, 'Family Deal', 'Special family package at $99', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop', 5);
END $$;

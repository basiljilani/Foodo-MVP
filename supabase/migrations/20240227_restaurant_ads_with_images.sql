-- Create restaurant_ads table
CREATE TABLE IF NOT EXISTS restaurant_ads (
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

-- Insert sample ads with placeholder images
INSERT INTO restaurant_ads (restaurant_id, title, description, image_url, display_order)
VALUES 
    (1, 'Special Discount', '20% off on all orders above $50', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop', 1),
    (1, 'New Menu Items', 'Try our new spicy biryani', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop', 2),
    (1, 'Weekend Special', 'Free delivery on weekends', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop', 3),
    (1, 'Happy Hours', '15% off between 3-6 PM', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop', 4),
    (1, 'Family Deal', 'Special family package at $99', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop', 5);

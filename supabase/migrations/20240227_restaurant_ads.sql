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

-- Insert sample ads
INSERT INTO restaurant_ads (restaurant_id, title, description, image_url, display_order)
VALUES 
    (1, 'Special Discount', '20% off on all orders above $50', 'https://example.com/ad1.jpg', 1),
    (1, 'New Menu Items', 'Try our new spicy biryani', 'https://example.com/ad2.jpg', 2),
    (1, 'Weekend Special', 'Free delivery on weekends', 'https://example.com/ad3.jpg', 3),
    (1, 'Happy Hours', '15% off between 3-6 PM', 'https://example.com/ad4.jpg', 4),
    (1, 'Family Deal', 'Special family package at $99', 'https://example.com/ad5.jpg', 5);

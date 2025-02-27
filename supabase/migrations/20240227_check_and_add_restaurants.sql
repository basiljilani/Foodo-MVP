-- First let's check existing restaurants
SELECT id, name FROM restaurants;

-- If no restaurants exist, let's add some sample data
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
) VALUES (
    'Savour Foods',
    'Authentic Pakistani cuisine with a modern twist',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop',
    'Pakistani',
    '$$',
    4.8,
    '{"phone": "+1234567890", "email": "contact@savourfoods.com"}'::jsonb,
    '{"address": "123 Food Street, Karachi", "coordinates": {"lat": 24.8607, "lng": 67.0011}}'::jsonb,
    ARRAY['Pakistani', 'Desi', 'Biryani']
);

-- Now let's update the ads to point to the correct restaurant ID
UPDATE restaurant_ads 
SET restaurant_id = (SELECT id FROM restaurants WHERE name = 'Savour Foods')
WHERE restaurant_id = 1;

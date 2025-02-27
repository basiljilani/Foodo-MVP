-- Insert sample restaurant
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
    'Karachi Biryani House',
    'Authentic Pakistani cuisine featuring our signature biryanis and grilled specialties',
    'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2788&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2788&auto=format&fit=crop',
    'https://example.com/logo.jpg',
    '11:00 AM - 11:00 PM',
    ARRAY['Pakistani', 'Biryani', 'BBQ'],
    'Pakistani',
    '$$',
    4.8,
    '{
        "phone": "+1234567890",
        "email": "info@karachibiryani.com",
        "website": "https://karachibiryani.com",
        "social_media": {
            "facebook": "https://facebook.com/karachibiryani",
            "instagram": "https://instagram.com/karachibiryani",
            "twitter": "https://twitter.com/karachibiryani"
        }
    }'::jsonb,
    '{
        "address": "123 Food Street, Karachi",
        "latitude": 24.8607,
        "longitude": 67.0011,
        "delivery_radius": 5
    }'::jsonb,
    '{
        "minimum_order": 349,
        "delivery_fee": 149,
        "estimated_delivery_time": "30-45 min",
        "accepts_online_payment": true,
        "is_featured": true,
        "is_open": true,
        "auto_accept_orders": true
    }'::jsonb
) RETURNING id;

-- Insert menu categories
WITH new_restaurant AS (
    SELECT id FROM restaurants WHERE name = 'Karachi Biryani House' LIMIT 1
)
INSERT INTO menu_categories (restaurant_id, name, description, display_order, is_available)
VALUES 
    ((SELECT id FROM new_restaurant), 'Biryani', 'Our signature biryani dishes', 1, true),
    ((SELECT id FROM new_restaurant), 'BBQ', 'Grilled specialties', 2, true),
    ((SELECT id FROM new_restaurant), 'Curries', 'Traditional curries', 3, true);

-- Insert menu items
WITH categories AS (
    SELECT id, name FROM menu_categories 
    WHERE restaurant_id = (SELECT id FROM restaurants WHERE name = 'Karachi Biryani House' LIMIT 1)
)
INSERT INTO menu_items (
    category_id,
    name,
    description,
    price,
    image,
    is_available,
    preparation_time,
    allergens,
    spicy_level,
    is_vegetarian,
    is_vegan
)
SELECT 
    id,
    CASE 
        WHEN name = 'Biryani' THEN 'Chicken Biryani'
        WHEN name = 'BBQ' THEN 'Seekh Kebab'
        ELSE 'Butter Chicken'
    END,
    CASE 
        WHEN name = 'Biryani' THEN 'Fragrant basmati rice cooked with tender chicken and aromatic spices'
        WHEN name = 'BBQ' THEN 'Minced meat kebabs seasoned with herbs and spices'
        ELSE 'Creamy tomato-based curry with tender chicken pieces'
    END,
    CASE 
        WHEN name = 'Biryani' THEN 350
        WHEN name = 'BBQ' THEN 280
        ELSE 320
    END,
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=60',
    true,
    '15-20 minutes',
    ARRAY['Gluten', 'Dairy'],
    'Medium',
    false,
    false
FROM categories;

-- Create a temporary table for restaurants
CREATE TEMP TABLE temp_restaurants (
    name text,
    description text,
    image text,
    banner_image text,
    logo text,
    opening_hours text,
    tags text[],
    category text,
    price_range text,
    rating decimal,
    contact jsonb,
    location jsonb,
    settings jsonb,
    social_media jsonb
);

-- Import restaurants from CSV
COPY temp_restaurants FROM '/path/to/restaurants.csv' CSV HEADER;

-- Insert into restaurants table
INSERT INTO restaurants (
    name, description, image, banner_image, logo, opening_hours, 
    tags, category, price_range, rating, contact, location, 
    settings, social_media
)
SELECT * FROM temp_restaurants;

-- Create temporary table for menu categories
CREATE TEMP TABLE temp_menu_categories (
    restaurant_name text,
    name text,
    description text,
    display_order integer,
    is_available boolean
);

-- Import menu categories from CSV
COPY temp_menu_categories FROM '/path/to/menu_categories.csv' CSV HEADER;

-- Insert into menu_categories table
INSERT INTO menu_categories (
    restaurant_id, name, description, display_order, is_available
)
SELECT 
    r.id,
    tmc.name,
    tmc.description,
    tmc.display_order,
    tmc.is_available
FROM temp_menu_categories tmc
JOIN restaurants r ON r.name = tmc.restaurant_name;

-- Create temporary table for menu items
CREATE TEMP TABLE temp_menu_items (
    category_name text,
    restaurant_name text,
    name text,
    description text,
    price decimal,
    image_url text,
    is_vegetarian boolean,
    is_spicy boolean,
    is_available boolean,
    display_order integer
);

-- Import menu items from CSV
COPY temp_menu_items FROM '/path/to/menu_items.csv' CSV HEADER;

-- Insert into menu_items table
INSERT INTO menu_items (
    category_id, name, description, price, image_url,
    is_vegetarian, is_spicy, is_available, display_order
)
SELECT 
    mc.id,
    tmi.name,
    tmi.description,
    tmi.price,
    tmi.image_url,
    tmi.is_vegetarian,
    tmi.is_spicy,
    tmi.is_available,
    tmi.display_order
FROM temp_menu_items tmi
JOIN restaurants r ON r.name = tmi.restaurant_name
JOIN menu_categories mc ON mc.restaurant_id = r.id AND mc.name = tmi.category_name;

-- Clean up temporary tables
DROP TABLE temp_restaurants;
DROP TABLE temp_menu_categories;
DROP TABLE temp_menu_items;

-- Create views to maintain compatibility with existing frontend

-- Main restaurant view (for restaurant cards and basic info)
CREATE OR REPLACE VIEW restaurants_view AS
SELECT DISTINCT ON (restaurant_id)
    restaurant_id::text as id,
    restaurant_name as name,
    restaurant_description as description,
    restaurant_image as image,
    restaurant_banner_image as banner_image,
    restaurant_logo as logo,
    restaurant_theme_color as theme_color,
    restaurant_phone as phone,
    restaurant_email as email,
    restaurant_website as website,
    restaurant_address as address,
    restaurant_city as city,
    restaurant_latitude as latitude,
    restaurant_longitude as longitude,
    restaurant_delivery_radius as delivery_radius,
    restaurant_tags as tags,
    opening_hours,
    price_range,
    rating,
    reviews_count,
    minimum_order,
    delivery_fee,
    delivery_time,
    accepts_online_payment,
    is_open,
    auto_accept_orders,
    is_featured as featured,
    is_top_restaurant,
    has_happy_hours,
    created_at,
    updated_at
FROM unified_restaurants
ORDER BY restaurant_id, created_at DESC;

-- Menu categories view
CREATE OR REPLACE VIEW menu_categories_view AS
SELECT DISTINCT ON (restaurant_id, category_name)
    restaurant_id::text as restaurant_id,
    category_id as id,
    category_name as name,
    category_description as description,
    category_image as image,
    category_display_order as display_order
FROM unified_restaurants
WHERE category_name IS NOT NULL
ORDER BY restaurant_id, category_name, created_at DESC;

-- Menu items view
CREATE OR REPLACE VIEW menu_items_view AS
SELECT DISTINCT ON (restaurant_id, item_name)
    restaurant_id::text as restaurant_id,
    category_id,
    category_name,
    item_id as id,
    item_name as name,
    item_description as description,
    item_price as price,
    item_image as image,
    item_is_available as is_available,
    item_preparation_time as preparation_time,
    item_allergens as allergens,
    item_spicy_level as spicy_level,
    item_is_vegetarian as is_vegetarian,
    item_is_vegan as is_vegan,
    '[]'::jsonb as customization_groups,
    created_at,
    updated_at
FROM unified_restaurants
WHERE item_name IS NOT NULL
ORDER BY restaurant_id, item_name, created_at DESC;

-- Restaurant ads view
CREATE OR REPLACE VIEW restaurant_ads_view AS
SELECT DISTINCT ON (restaurant_id, ad_title)
    restaurant_id::text as restaurant_id,
    ad_id as id,
    ad_title as title,
    ad_description as description,
    ad_image as image,
    ad_link_url as link_url,
    ad_start_date as start_date,
    ad_end_date as end_date,
    ad_is_active as is_active,
    ad_display_order as display_order,
    created_at,
    updated_at
FROM unified_restaurants
WHERE ad_title IS NOT NULL AND ad_is_active = true
ORDER BY restaurant_id, ad_title, created_at DESC;

-- Restaurant more info view
CREATE OR REPLACE VIEW restaurant_more_info_view AS
SELECT
    id as info_id,
    restaurant_id::text as restaurant_id,
    info_title as title,
    info_description as description,
    info_icon_name as icon_name,
    info_display_order as display_order,
    created_at,
    updated_at
FROM unified_restaurants
WHERE info_title IS NOT NULL;

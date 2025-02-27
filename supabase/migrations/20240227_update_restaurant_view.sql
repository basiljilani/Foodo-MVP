-- Drop the existing view
DROP VIEW IF EXISTS restaurant_full_menu;

-- Recreate the view with owner information
CREATE OR REPLACE VIEW restaurant_full_menu AS
SELECT 
    r.id as restaurant_id,
    r.name as restaurant_name,
    r.owner_id,
    mc.id as category_id,
    mc.name as category_name,
    mc.display_order,
    mi.id as item_id,
    mi.name as item_name,
    mi.description as item_description,
    mi.price as item_price,
    mi.image as item_image,
    mi.is_available as item_available
FROM restaurants r
LEFT JOIN menu_categories mc ON mc.restaurant_id = r.id
LEFT JOIN menu_items mi ON mi.category_id = mc.id;

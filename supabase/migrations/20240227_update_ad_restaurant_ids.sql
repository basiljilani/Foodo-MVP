-- First, let's see what restaurants we have
SELECT id, name FROM restaurants;

-- Update all ads to point to restaurant ID 2
UPDATE restaurant_ads 
SET restaurant_id = 2 
WHERE restaurant_id = 1;

-- Verify the update
SELECT 
    ra.id as ad_id,
    ra.restaurant_id,
    r.name as restaurant_name,
    ra.title as ad_title
FROM restaurant_ads ra
JOIN restaurants r ON r.id = ra.restaurant_id;

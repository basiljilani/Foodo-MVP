-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON restaurant_ads;

-- Simple read-only policy for public access
CREATE POLICY "Enable read access for all users" 
ON restaurant_ads FOR SELECT 
USING (true);

-- Note: You'll manage all ads through the Supabase dashboard
-- To add new ads for a restaurant:
-- 1. Go to Table Editor
-- 2. Select restaurant_ads table
-- 3. Click "Insert row" 
-- 4. Fill in:
--    - restaurant_id (from the restaurants table)
--    - title
--    - description
--    - image_url (from your image hosting)
--    - display_order (to control the order)
--    - is_active (true/false to show/hide)

-- Example of how to add new ads via SQL:
/*
INSERT INTO restaurant_ads (
    restaurant_id,
    title,
    description,
    image_url,
    display_order,
    is_active
) VALUES (
    2,  -- Replace with actual restaurant ID
    'New Special Offer',
    'Description of the offer',
    'https://your-image-url.jpg',
    1,  -- Lower numbers appear first
    true
);
*/

-- To update existing ads:
/*
UPDATE restaurant_ads
SET 
    title = 'Updated Title',
    description = 'Updated description',
    image_url = 'new-image-url.jpg'
WHERE id = 1;  -- Replace with actual ad ID
*/

-- To deactivate an ad:
/*
UPDATE restaurant_ads
SET is_active = false
WHERE id = 1;  -- Replace with actual ad ID
*/

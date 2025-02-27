-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON restaurant_ads;
DROP POLICY IF EXISTS "Enable insert for restaurant owners" ON restaurant_ads;
DROP POLICY IF EXISTS "Enable update for restaurant owners" ON restaurant_ads;
DROP POLICY IF EXISTS "Enable delete for restaurant owners" ON restaurant_ads;

-- Create proper RLS policies
CREATE POLICY "Enable read access for all users" 
ON restaurant_ads FOR SELECT 
USING (true);

-- Only restaurant owners can insert ads for their restaurant
CREATE POLICY "Enable insert for restaurant owners" 
ON restaurant_ads FOR INSERT 
WITH CHECK (
  restaurant_id IN (
    SELECT id FROM restaurants 
    WHERE restaurants.id = restaurant_ads.restaurant_id
    -- Add owner check here when you implement restaurant ownership
    -- AND restaurants.owner_id = auth.uid()
  )
);

-- Only restaurant owners can update their own ads
CREATE POLICY "Enable update for restaurant owners" 
ON restaurant_ads FOR UPDATE 
USING (
  restaurant_id IN (
    SELECT id FROM restaurants 
    WHERE restaurants.id = restaurant_ads.restaurant_id
    -- Add owner check here when you implement restaurant ownership
    -- AND restaurants.owner_id = auth.uid()
  )
);

-- Only restaurant owners can delete their own ads
CREATE POLICY "Enable delete for restaurant owners" 
ON restaurant_ads FOR DELETE 
USING (
  restaurant_id IN (
    SELECT id FROM restaurants 
    WHERE restaurants.id = restaurant_ads.restaurant_id
    -- Add owner check here when you implement restaurant ownership
    -- AND restaurants.owner_id = auth.uid()
  )
);

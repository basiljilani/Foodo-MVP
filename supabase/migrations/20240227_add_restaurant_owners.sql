-- Add owner_id to restaurants table
ALTER TABLE restaurants
ADD COLUMN owner_id UUID REFERENCES auth.users(id);

-- Create index for faster lookups
CREATE INDEX idx_restaurants_owner_id ON restaurants(owner_id);

-- Update RLS policies for restaurants
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

-- Everyone can view restaurants
CREATE POLICY "Restaurants are viewable by everyone"
    ON restaurants FOR SELECT
    USING (true);

-- Only restaurant owners can insert
CREATE POLICY "Users can create their own restaurants"
    ON restaurants FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

-- Only restaurant owners can update their restaurants
CREATE POLICY "Users can update their own restaurants"
    ON restaurants FOR UPDATE
    USING (auth.uid() = owner_id)
    WITH CHECK (auth.uid() = owner_id);

-- Only restaurant owners can delete their restaurants
CREATE POLICY "Users can delete their own restaurants"
    ON restaurants FOR DELETE
    USING (auth.uid() = owner_id);

-- Function to assign owner to existing restaurants
CREATE OR REPLACE FUNCTION assign_restaurant_owner(
    restaurant_id BIGINT,
    user_id UUID
) RETURNS void AS $$
BEGIN
    UPDATE restaurants
    SET owner_id = user_id
    WHERE id = restaurant_id;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER;

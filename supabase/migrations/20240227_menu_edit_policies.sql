-- Add policies for menu categories editing
CREATE POLICY "Restaurant owners can insert menu categories"
    ON menu_categories FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM restaurants
            WHERE id = restaurant_id
            AND owner_id = auth.uid()
        )
    );

CREATE POLICY "Restaurant owners can update their menu categories"
    ON menu_categories FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM restaurants
            WHERE id = restaurant_id
            AND owner_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM restaurants
            WHERE id = restaurant_id
            AND owner_id = auth.uid()
        )
    );

CREATE POLICY "Restaurant owners can delete their menu categories"
    ON menu_categories FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM restaurants
            WHERE id = restaurant_id
            AND owner_id = auth.uid()
        )
    );

-- Add policies for menu items editing
CREATE POLICY "Restaurant owners can insert menu items"
    ON menu_items FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM restaurants r
            JOIN menu_categories mc ON mc.restaurant_id = r.id
            WHERE mc.id = category_id
            AND r.owner_id = auth.uid()
        )
    );

CREATE POLICY "Restaurant owners can update their menu items"
    ON menu_items FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM restaurants r
            JOIN menu_categories mc ON mc.restaurant_id = r.id
            WHERE mc.id = category_id
            AND r.owner_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM restaurants r
            JOIN menu_categories mc ON mc.restaurant_id = r.id
            WHERE mc.id = category_id
            AND r.owner_id = auth.uid()
        )
    );

CREATE POLICY "Restaurant owners can delete their menu items"
    ON menu_items FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM restaurants r
            JOIN menu_categories mc ON mc.restaurant_id = r.id
            WHERE mc.id = category_id
            AND r.owner_id = auth.uid()
        )
    );

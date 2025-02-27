-- Create restaurant_more_info table
CREATE TABLE restaurant_more_info (
    id BIGSERIAL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50), -- For storing Lucide icon names
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add RLS policies
ALTER TABLE restaurant_more_info ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
ON restaurant_more_info
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to manage info cards (temporary until we implement proper restaurant ownership)
CREATE POLICY "Allow authenticated users to manage info cards"
ON restaurant_more_info
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Add sample data
INSERT INTO restaurant_more_info (restaurant_id, title, description, icon_name, display_order)
SELECT 
    id as restaurant_id,
    'Special Deals' as title,
    'Get 20% off on all orders above Rs. 2000 every Tuesday' as description,
    'Tag' as icon_name,
    1 as display_order
FROM restaurants 
WHERE name = 'Savour Foods'
UNION ALL
SELECT 
    id,
    'Parking Available',
    'Spacious parking area available for both cars and bikes',
    'Car',
    2
FROM restaurants 
WHERE name = 'Savour Foods'
UNION ALL
SELECT 
    id,
    'Delivery Areas',
    'We deliver to F-6, F-7, F-8, and G-6 sectors',
    'MapPin',
    3
FROM restaurants 
WHERE name = 'Savour Foods'
UNION ALL
SELECT 
    id,
    'Payment Methods',
    'We accept cash, credit cards, and online payments',
    'CreditCard',
    4
FROM restaurants 
WHERE name = 'Savour Foods';

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_restaurant_more_info_updated_at
    BEFORE UPDATE
    ON restaurant_more_info
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

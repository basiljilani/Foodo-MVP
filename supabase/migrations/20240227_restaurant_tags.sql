-- Update restaurants to add tags
UPDATE restaurants
SET tags = ARRAY['Pakistani', 'Desi', 'Biryani']
WHERE name = 'Savour Foods';

-- Update other restaurants with relevant tags
UPDATE restaurants
SET tags = ARRAY['Fast Food', 'Burgers', 'American']
WHERE name = 'KFC';

UPDATE restaurants
SET tags = ARRAY['Pizza', 'Italian', 'Fast Food']
WHERE name = 'Pizza Hut';

-- Add some sample tags for other restaurants
UPDATE restaurants
SET tags = ARRAY['Chinese', 'Asian', 'Sushi']
WHERE tags IS NULL;

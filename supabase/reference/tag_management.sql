-- Tag Management Reference Guide

-- View all restaurant tags
SELECT id, name, tags 
FROM restaurants 
ORDER BY name;

-- Add a single new tag
UPDATE restaurants 
SET tags = array_append(tags, 'NewTag')
WHERE id = 1;

-- Add multiple tags at once
UPDATE restaurants 
SET tags = array_cat(tags, ARRAY['Tag1', 'Tag2'])
WHERE id = 1;

-- Remove a specific tag
UPDATE restaurants 
SET tags = array_remove(tags, 'TagToRemove')
WHERE id = 1;

-- Replace all tags for a restaurant
UPDATE restaurants 
SET tags = ARRAY['Tag1', 'Tag2', 'Tag3']
WHERE id = 1;

-- Clear all tags
UPDATE restaurants 
SET tags = ARRAY[]::TEXT[]
WHERE id = 1;

-- Find restaurants by tag
SELECT name, tags
FROM restaurants
WHERE tags @> ARRAY['Pakistani']::TEXT[];

-- Count restaurants by tag
SELECT unnest(tags) as tag, count(*) 
FROM restaurants 
GROUP BY tag 
ORDER BY count DESC;

-- Remove duplicate tags
UPDATE restaurants
SET tags = (
    SELECT array_agg(DISTINCT x) 
    FROM unnest(tags) x
)
WHERE id = 1;

-- Case-insensitive tag search
SELECT name, tags
FROM restaurants
WHERE array_to_string(tags, ',') ILIKE '%pakistani%';

-- Note: Replace 'id = 1' with the actual restaurant ID you want to modify
-- For bulk operations, you can remove the WHERE clause to affect all restaurants

-- Create storage bucket for restaurant images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('restaurant_images', 'restaurant_images', true);

-- Create storage policies for the bucket
CREATE POLICY "Public Access to Restaurant Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'restaurant_images');

-- Only authenticated users can upload images
CREATE POLICY "Authenticated Users Can Upload Restaurant Images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'restaurant_images');

-- Only owners can update their restaurant images
CREATE POLICY "Owners Can Update Restaurant Images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'restaurant_images')
WITH CHECK (bucket_id = 'restaurant_images');

-- Only owners can delete their restaurant images
CREATE POLICY "Owners Can Delete Restaurant Images"
ON storage.objects FOR DELETE
USING (bucket_id = 'restaurant_images');

-- Update restaurant table to use storage references
COMMENT ON COLUMN restaurants.image IS 'Storage path in restaurant_images bucket';
COMMENT ON COLUMN restaurants.banner_image IS 'Storage path in restaurant_images bucket';
COMMENT ON COLUMN restaurants.logo IS 'Storage path in restaurant_images bucket';

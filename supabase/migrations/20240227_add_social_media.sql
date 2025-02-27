-- Add social_media column to restaurants table
ALTER TABLE restaurants
ADD COLUMN social_media JSONB DEFAULT jsonb_build_object(
    'instagram', NULL,
    'facebook', NULL,
    'whatsapp', NULL
);

-- Supabase SQL Schema for Foodo-MVP
-- This schema is designed to match the restaurant data structure in the docs

-- Restaurants Table
CREATE TABLE restaurants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT,
  cover_image TEXT,
  rating NUMERIC(3,1),
  cuisine TEXT,
  delivery_time TEXT,
  delivery_fee INTEGER,
  minimum_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restaurant Branding
CREATE TABLE restaurant_branding (
  restaurant_id TEXT PRIMARY KEY REFERENCES restaurants(id) ON DELETE CASCADE,
  slogan TEXT,
  theme_color TEXT,
  text_color TEXT,
  since INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restaurant Contact Information
CREATE TABLE restaurant_contacts (
  restaurant_id TEXT PRIMARY KEY REFERENCES restaurants(id) ON DELETE CASCADE,
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restaurant Social Media
CREATE TABLE restaurant_social_media (
  restaurant_id TEXT PRIMARY KEY REFERENCES restaurants(id) ON DELETE CASCADE,
  facebook TEXT,
  instagram TEXT,
  twitter TEXT,
  whatsapp TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restaurant Locations
CREATE TABLE restaurant_locations (
  restaurant_id TEXT PRIMARY KEY REFERENCES restaurants(id) ON DELETE CASCADE,
  lat NUMERIC(10,7),
  lng NUMERIC(10,7),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restaurant Hours
CREATE TABLE restaurant_hours (
  restaurant_id TEXT PRIMARY KEY REFERENCES restaurants(id) ON DELETE CASCADE,
  monday TEXT,
  tuesday TEXT,
  wednesday TEXT,
  thursday TEXT,
  friday TEXT,
  saturday TEXT,
  sunday TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu Categories
CREATE TABLE menu_categories (
  id TEXT,
  restaurant_id TEXT REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id, restaurant_id)
);

-- Menu Items
CREATE TABLE menu_items (
  id TEXT,
  restaurant_id TEXT REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER,
  image TEXT,
  popular BOOLEAN DEFAULT FALSE,
  vegan BOOLEAN DEFAULT FALSE,
  vegetarian BOOLEAN DEFAULT FALSE,
  gluten_free BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id, restaurant_id)
);

-- Menu Item Categories (junction table for many-to-many relationship)
CREATE TABLE menu_item_categories (
  item_id TEXT,
  restaurant_id TEXT,
  category_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (item_id, restaurant_id, category_id),
  FOREIGN KEY (item_id, restaurant_id) REFERENCES menu_items(id, restaurant_id) ON DELETE CASCADE,
  FOREIGN KEY (category_id, restaurant_id) REFERENCES menu_categories(id, restaurant_id) ON DELETE CASCADE
);

-- Restaurant Ads
CREATE TABLE restaurant_ads (
  id TEXT,
  restaurant_id TEXT REFERENCES restaurants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  start_date DATE,
  end_date DATE,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id, restaurant_id)
);

-- Create RLS policies for public access (read-only)
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public restaurants are viewable by everyone" ON restaurants FOR SELECT USING (true);

ALTER TABLE restaurant_branding ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public restaurant branding is viewable by everyone" ON restaurant_branding FOR SELECT USING (true);

ALTER TABLE restaurant_contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public restaurant contacts are viewable by everyone" ON restaurant_contacts FOR SELECT USING (true);

ALTER TABLE restaurant_social_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public restaurant social media is viewable by everyone" ON restaurant_social_media FOR SELECT USING (true);

ALTER TABLE restaurant_locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public restaurant locations are viewable by everyone" ON restaurant_locations FOR SELECT USING (true);

ALTER TABLE restaurant_hours ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public restaurant hours are viewable by everyone" ON restaurant_hours FOR SELECT USING (true);

ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public menu categories are viewable by everyone" ON menu_categories FOR SELECT USING (true);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public menu items are viewable by everyone" ON menu_items FOR SELECT USING (true);

ALTER TABLE menu_item_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public menu item categories are viewable by everyone" ON menu_item_categories FOR SELECT USING (true);

ALTER TABLE restaurant_ads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public restaurant ads are viewable by everyone" ON restaurant_ads FOR SELECT USING (true);

-- Create functions to insert restaurant data
CREATE OR REPLACE FUNCTION insert_restaurant_data(
  restaurant_data JSONB
) RETURNS TEXT AS $$
DECLARE
  restaurant_id TEXT;
  category_id TEXT;
  item_id TEXT;
  category_ids TEXT[];
  i INTEGER;
BEGIN
  -- Extract restaurant ID
  restaurant_id := restaurant_data->>'id';
  
  -- Insert into restaurants table
  INSERT INTO restaurants (
    id, name, logo, cover_image, rating, cuisine, delivery_time, delivery_fee, minimum_order
  ) VALUES (
    restaurant_id,
    restaurant_data->>'name',
    restaurant_data->>'logo',
    restaurant_data->>'coverImage',
    (restaurant_data->>'rating')::NUMERIC,
    restaurant_data->>'cuisine',
    restaurant_data->>'deliveryTime',
    (restaurant_data->>'deliveryFee')::INTEGER,
    (restaurant_data->>'minimumOrder')::INTEGER
  );
  
  -- Insert branding
  INSERT INTO restaurant_branding (
    restaurant_id, slogan, theme_color, text_color, since
  ) VALUES (
    restaurant_id,
    restaurant_data->'branding'->>'slogan',
    restaurant_data->'branding'->>'themeColor',
    restaurant_data->'branding'->>'textColor',
    (restaurant_data->'branding'->>'since')::INTEGER
  );
  
  -- Insert contact info
  INSERT INTO restaurant_contacts (
    restaurant_id, address, phone, email, website
  ) VALUES (
    restaurant_id,
    restaurant_data->'contact'->>'address',
    restaurant_data->'contact'->>'phone',
    restaurant_data->'contact'->>'email',
    restaurant_data->'contact'->>'website'
  );
  
  -- Insert social media
  INSERT INTO restaurant_social_media (
    restaurant_id, facebook, instagram, twitter, whatsapp
  ) VALUES (
    restaurant_id,
    restaurant_data->'socialMedia'->>'facebook',
    restaurant_data->'socialMedia'->>'instagram',
    restaurant_data->'socialMedia'->>'twitter',
    restaurant_data->'socialMedia'->>'whatsapp'
  );
  
  -- Insert location
  INSERT INTO restaurant_locations (
    restaurant_id, lat, lng
  ) VALUES (
    restaurant_id,
    (restaurant_data->'location'->>'lat')::NUMERIC,
    (restaurant_data->'location'->>'lng')::NUMERIC
  );
  
  -- Insert hours
  INSERT INTO restaurant_hours (
    restaurant_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday
  ) VALUES (
    restaurant_id,
    restaurant_data->'hours'->>'monday',
    restaurant_data->'hours'->>'tuesday',
    restaurant_data->'hours'->>'wednesday',
    restaurant_data->'hours'->>'thursday',
    restaurant_data->'hours'->>'friday',
    restaurant_data->'hours'->>'saturday',
    restaurant_data->'hours'->>'sunday'
  );
  
  -- Insert menu categories
  FOR i IN 0..jsonb_array_length(restaurant_data->'menuCategories')-1 LOOP
    category_id := restaurant_data->'menuCategories'->i->>'id';
    
    INSERT INTO menu_categories (
      id, restaurant_id, name, description
    ) VALUES (
      category_id,
      restaurant_id,
      restaurant_data->'menuCategories'->i->>'name',
      restaurant_data->'menuCategories'->i->>'description'
    );
  END LOOP;
  
  -- Insert menu items and their categories
  FOR i IN 0..jsonb_array_length(restaurant_data->'menuItems')-1 LOOP
    item_id := restaurant_data->'menuItems'->i->>'id';
    
    -- Insert the menu item
    INSERT INTO menu_items (
      id, restaurant_id, name, description, price, image, 
      popular, vegan, vegetarian, gluten_free
    ) VALUES (
      item_id,
      restaurant_id,
      restaurant_data->'menuItems'->i->>'name',
      restaurant_data->'menuItems'->i->>'description',
      (restaurant_data->'menuItems'->i->>'price')::INTEGER,
      restaurant_data->'menuItems'->i->>'image',
      (restaurant_data->'menuItems'->i->>'popular')::BOOLEAN,
      (restaurant_data->'menuItems'->i->>'vegan')::BOOLEAN,
      (restaurant_data->'menuItems'->i->>'vegetarian')::BOOLEAN,
      (restaurant_data->'menuItems'->i->>'glutenFree')::BOOLEAN
    );
    
    -- Get category IDs for this item
    SELECT array_agg(value) INTO category_ids
    FROM jsonb_array_elements_text(restaurant_data->'menuItems'->i->'categoryId');
    
    -- Insert menu item categories
    FOREACH category_id IN ARRAY category_ids LOOP
      INSERT INTO menu_item_categories (
        item_id, restaurant_id, category_id
      ) VALUES (
        item_id,
        restaurant_id,
        category_id
      );
    END LOOP;
  END LOOP;
  
  -- Insert ads
  FOR i IN 0..jsonb_array_length(restaurant_data->'ads')-1 LOOP
    INSERT INTO restaurant_ads (
      id, restaurant_id, title, description, image, start_date, end_date, url
    ) VALUES (
      restaurant_data->'ads'->i->>'id',
      restaurant_id,
      restaurant_data->'ads'->i->>'title',
      restaurant_data->'ads'->i->>'description',
      restaurant_data->'ads'->i->>'image',
      (restaurant_data->'ads'->i->>'startDate')::DATE,
      (restaurant_data->'ads'->i->>'endDate')::DATE,
      restaurant_data->'ads'->i->>'url'
    );
  END LOOP;
  
  RETURN restaurant_id;
END;
$$ LANGUAGE plpgsql;

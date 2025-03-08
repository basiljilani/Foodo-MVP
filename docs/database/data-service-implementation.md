# Foodo-MVP Data Service Implementation Guide

This document outlines the implementation of a data service layer that will allow Foodo-MVP to transition from using mock JSON data to fetching from Supabase without changing any frontend code.

## Architecture Overview

```
┌────────────┐     ┌─────────────┐     ┌──────────┐
│  Frontend  │ ──► │ Data Service│ ──► │ Supabase │
│ Components │ ◄── │    Layer    │ ◄── │ Database │
└────────────┘     └─────────────┘     └──────────┘
```

## Data Service Layer Implementation

### 1. Create Service Files

```typescript
// src/services/restaurantService.ts

import { createClient } from '@supabase/supabase-js';
import type { Restaurant } from '../types/restaurant';

// Import mock data for fallback
import kfcData from '../docs/restaurants/kfc.json';
import mcdonaldsData from '../docs/restaurants/mcdonalds.json';
import savourData from '../docs/restaurants/savour.json';
import tandooriData from '../docs/restaurants/tandoori.json';
import chaayeKhanaData from '../docs/restaurants/chaaye-khana.json';
import howdyData from '../docs/restaurants/howdy.json';

// Mock data map for fallback
const mockRestaurants: Record<string, Restaurant> = {
  kfc: kfcData as Restaurant,
  mcdonalds: mcdonaldsData as Restaurant,
  savour: savourData as Restaurant,
  tandoori: tandooriData as Restaurant,
  'chaaye-khana': chaayeKhanaData as Restaurant,
  howdy: howdyData as Restaurant
};

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Flag to control data source
const USE_SUPABASE = import.meta.env.VITE_USE_SUPABASE === 'true';

/**
 * Get all restaurants
 */
export async function getAllRestaurants(): Promise<Restaurant[]> {
  if (!USE_SUPABASE) {
    // Return mock data
    return Object.values(mockRestaurants);
  }

  try {
    // Fetch from Supabase
    const { data, error } = await supabase
      .from('restaurants')
      .select('id, name, logo, rating, cuisine, deliveryTime, deliveryFee');

    if (error) {
      console.error('Error fetching restaurants:', error);
      // Fallback to mock data
      return Object.values(mockRestaurants);
    }

    return data as Restaurant[];
  } catch (error) {
    console.error('Error in getAllRestaurants:', error);
    // Fallback to mock data
    return Object.values(mockRestaurants);
  }
}

/**
 * Get restaurant by ID
 */
export async function getRestaurantById(id: string): Promise<Restaurant | null> {
  if (!USE_SUPABASE) {
    // Return mock data
    return mockRestaurants[id] || null;
  }

  try {
    // Use the custom function in Supabase that returns data in the exact format needed
    const { data, error } = await supabase.rpc('get_restaurant_data', {
      restaurant_id_param: id
    });

    if (error) {
      console.error(`Error fetching restaurant ${id}:`, error);
      // Fallback to mock data
      return mockRestaurants[id] || null;
    }

    return data as Restaurant;
  } catch (error) {
    console.error(`Error in getRestaurantById for ${id}:`, error);
    // Fallback to mock data
    return mockRestaurants[id] || null;
  }
}

/**
 * Get nearby restaurants
 */
export async function getNearbyRestaurants(
  lat: number, 
  lng: number, 
  distance: number = 5
): Promise<Restaurant[]> {
  if (!USE_SUPABASE) {
    // For mock data, just return all restaurants
    // In a real implementation, you would filter by distance
    return Object.values(mockRestaurants);
  }

  try {
    // Use the custom function in Supabase
    const { data, error } = await supabase.rpc('nearby_restaurants', {
      user_lat: lat,
      user_lng: lng,
      distance_km: distance
    });

    if (error) {
      console.error('Error fetching nearby restaurants:', error);
      // Fallback to mock data
      return Object.values(mockRestaurants);
    }

    // For each nearby restaurant, fetch full details
    const fullRestaurants = await Promise.all(
      data.map(async (item: any) => {
        const restaurant = await getRestaurantById(item.id);
        return restaurant;
      })
    );

    return fullRestaurants.filter(Boolean) as Restaurant[];
  } catch (error) {
    console.error('Error in getNearbyRestaurants:', error);
    // Fallback to mock data
    return Object.values(mockRestaurants);
  }
}
```

### 2. TypeScript Types

```typescript
// src/types/restaurant.ts

export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  rating: number;
  cuisine: string;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  branding: {
    slogan: string;
    themeColor: string;
    textColor: string;
    since: number;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    whatsapp: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  menuCategories: {
    id: string;
    name: string;
    description: string;
  }[];
  menuItems: {
    id: string;
    categoryId: string[];
    name: string;
    description: string;
    price: number;
    image: string;
    popular: boolean;
    vegan: boolean;
    vegetarian: boolean;
    glutenFree: boolean;
  }[];
  ads: {
    id: string;
    title: string;
    description: string;
    image: string;
    startDate: string;
    endDate: string;
    url: string | null;
  }[];
}
```

### 3. Environment Variables

Add these to your `.env` file:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_USE_SUPABASE=false
```

Initially, set `VITE_USE_SUPABASE=false` to continue using mock data. When ready to switch to Supabase, change to `true`.

## Migration Strategy

1. **Phase 1: Implement Data Service Layer**
   - Create the service files as shown above
   - Update imports in components to use the service instead of direct JSON imports
   - Keep using mock data (USE_SUPABASE=false)

2. **Phase 2: Set Up Supabase**
   - Create tables using the SQL schema
   - Import data from JSON files to Supabase
   - Test the Supabase functions

3. **Phase 3: Gradual Migration**
   - Test with a single restaurant first
   - Switch to Supabase for that restaurant
   - Verify frontend works identically
   - Gradually migrate all restaurants

4. **Phase 4: Complete Migration**
   - Set USE_SUPABASE=true
   - Keep mock data as fallback
   - Monitor for any issues

## Data Import Script

Here's a script to import JSON data into Supabase:

```typescript
// scripts/import-restaurants.ts

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function importRestaurants() {
  const restaurantsDir = path.join(__dirname, '../docs/restaurants');
  const files = fs.readdirSync(restaurantsDir).filter(file => file.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(restaurantsDir, file);
    const restaurantData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    console.log(`Importing ${restaurantData.name}...`);
    
    // Insert into restaurants table
    const { error: restaurantError } = await supabase
      .from('restaurants')
      .upsert({
        id: restaurantData.id,
        name: restaurantData.name,
        logo: restaurantData.logo,
        cover_image: restaurantData.coverImage,
        rating: restaurantData.rating,
        cuisine: restaurantData.cuisine,
        delivery_time: restaurantData.deliveryTime,
        delivery_fee: restaurantData.deliveryFee,
        minimum_order: restaurantData.minimumOrder
      });
    
    if (restaurantError) {
      console.error(`Error inserting restaurant ${restaurantData.name}:`, restaurantError);
      continue;
    }
    
    // Insert branding
    await supabase
      .from('restaurant_branding')
      .upsert({
        restaurant_id: restaurantData.id,
        slogan: restaurantData.branding.slogan,
        theme_color: restaurantData.branding.themeColor,
        text_color: restaurantData.branding.textColor,
        since: restaurantData.branding.since
      });
    
    // Insert contact
    await supabase
      .from('restaurant_contact')
      .upsert({
        restaurant_id: restaurantData.id,
        address: restaurantData.contact.address,
        phone: restaurantData.contact.phone,
        email: restaurantData.contact.email,
        website: restaurantData.contact.website
      });
    
    // Insert social media
    await supabase
      .from('restaurant_social_media')
      .upsert({
        restaurant_id: restaurantData.id,
        facebook: restaurantData.socialMedia.facebook,
        instagram: restaurantData.socialMedia.instagram,
        twitter: restaurantData.socialMedia.twitter,
        whatsapp: restaurantData.socialMedia.whatsapp
      });
    
    // Insert location
    await supabase
      .from('restaurant_location')
      .upsert({
        restaurant_id: restaurantData.id,
        lat: restaurantData.location.lat,
        lng: restaurantData.location.lng
      });
    
    // Insert hours
    await supabase
      .from('restaurant_hours')
      .upsert({
        restaurant_id: restaurantData.id,
        monday: restaurantData.hours.monday,
        tuesday: restaurantData.hours.tuesday,
        wednesday: restaurantData.hours.wednesday,
        thursday: restaurantData.hours.thursday,
        friday: restaurantData.hours.friday,
        saturday: restaurantData.hours.saturday,
        sunday: restaurantData.hours.sunday
      });
    
    // Insert menu categories
    for (let i = 0; i < restaurantData.menuCategories.length; i++) {
      const category = restaurantData.menuCategories[i];
      await supabase
        .from('menu_categories')
        .upsert({
          restaurant_id: restaurantData.id,
          category_id: category.id,
          name: category.name,
          description: category.description,
          display_order: i
        });
    }
    
    // Insert menu items
    for (const item of restaurantData.menuItems) {
      const { data: menuItemData, error: menuItemError } = await supabase
        .from('menu_items')
        .upsert({
          restaurant_id: restaurantData.id,
          item_id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
          popular: item.popular,
          vegan: item.vegan,
          vegetarian: item.vegetarian,
          gluten_free: item.glutenFree
        })
        .select();
      
      if (menuItemError) {
        console.error(`Error inserting menu item ${item.name}:`, menuItemError);
        continue;
      }
      
      // Insert menu item categories
      if (menuItemData && menuItemData.length > 0) {
        const menuItemId = menuItemData[0].id;
        for (const categoryId of item.categoryId) {
          await supabase
            .from('menu_item_categories')
            .upsert({
              menu_item_id: menuItemId,
              category_id: categoryId,
              restaurant_id: restaurantData.id
            });
        }
      }
    }
    
    // Insert ads
    if (restaurantData.ads) {
      for (const ad of restaurantData.ads) {
        await supabase
          .from('restaurant_ads')
          .upsert({
            restaurant_id: restaurantData.id,
            ad_id: ad.id,
            title: ad.title,
            description: ad.description,
            image: ad.image,
            start_date: ad.startDate,
            end_date: ad.endDate,
            url: ad.url
          });
      }
    }
    
    console.log(`Successfully imported ${restaurantData.name}`);
  }
}

importRestaurants()
  .then(() => console.log('Import completed'))
  .catch(err => console.error('Import failed:', err));
```

## Usage in Components

Here's how to update your components to use the data service:

```tsx
// Before:
import restaurantData from '../docs/restaurants/kfc.json';

// After:
import { getRestaurantById } from '../services/restaurantService';
import { useState, useEffect } from 'react';
import type { Restaurant } from '../types/restaurant';

function RestaurantPage({ id }: { id: string }) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRestaurant() {
      setLoading(true);
      const data = await getRestaurantById(id);
      setRestaurant(data);
      setLoading(false);
    }
    
    loadRestaurant();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!restaurant) return <div>Restaurant not found</div>;

  // Rest of your component remains unchanged
  // All data structure and property names are identical
  return (
    <div>
      <h1>{restaurant.name}</h1>
      {/* ... */}
    </div>
  );
}
```

## Conclusion

This approach ensures:

1. **Zero frontend changes** - The data structure remains identical
2. **Graceful fallback** - If Supabase fails, it falls back to mock data
3. **Gradual migration** - Can migrate one restaurant at a time
4. **Scalability** - Database schema designed to handle 50,000+ restaurants
5. **Maintainability** - Clean separation of concerns with a data service layer

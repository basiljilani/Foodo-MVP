# Foodo-MVP Data Migration Guide

This guide explains how to use the restaurant data files and SQL schema to migrate from mock data to Supabase.

## Overview

The migration process follows these steps:

1. Define structured data for each restaurant in JSON files
2. Create the database schema in Supabase
3. Import the restaurant data into Supabase
4. Update the application to fetch data from Supabase instead of mock data

## File Structure

- `/docs/restaurant_schema.md` - Documentation of the restaurant data structure
- `/docs/restaurants/*.json` - Individual restaurant data files
- `/docs/supabase_schema.sql` - SQL schema for Supabase tables and functions

## Step 1: Prepare Restaurant Data

Each restaurant has its own JSON file in the `/docs/restaurants/` directory that follows the schema defined in `restaurant_schema.md`. To add a new restaurant:

1. Create a new JSON file in the `/docs/restaurants/` directory
2. Follow the structure from existing files (kfc.json, mcdonalds.json)
3. Ensure all required fields are populated

## Step 2: Set Up Supabase Schema

1. Log in to your Supabase project
2. Go to the SQL Editor
3. Copy and paste the contents of `supabase_schema.sql`
4. Run the SQL script to create all necessary tables and functions

## Step 3: Import Restaurant Data

For each restaurant JSON file:

1. In Supabase SQL Editor, create a new query
2. Use the following SQL to import a restaurant:

```sql
SELECT insert_restaurant_data(
  -- Replace with the contents of your restaurant JSON file
  $JSON$
  {
    "id": "restaurant-id",
    "name": "Restaurant Name",
    ...
  }
  $JSON$::jsonb
);
```

## Step 4: Update Application Code

The application should be updated to fetch data from Supabase while maintaining the same data structure that the frontend components expect:

1. Create a data service layer that handles Supabase queries
2. Implement functions that map Supabase responses to the expected data structure
3. Replace mock data imports with calls to the data service

### Example Data Service

```typescript
// src/services/restaurantService.ts
import { supabase } from '../utils/supabaseClient';

export async function getRestaurantById(id: string) {
  // Fetch basic restaurant info
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single();
    
  if (!restaurant) return null;
  
  // Fetch related data
  const [
    { data: branding },
    { data: contact },
    { data: socialMedia },
    { data: location },
    { data: hours },
    { data: categories },
    { data: items },
    { data: ads }
  ] = await Promise.all([
    supabase.from('restaurant_branding').select('*').eq('restaurant_id', id).single(),
    supabase.from('restaurant_contacts').select('*').eq('restaurant_id', id).single(),
    supabase.from('restaurant_social_media').select('*').eq('restaurant_id', id).single(),
    supabase.from('restaurant_locations').select('*').eq('restaurant_id', id).single(),
    supabase.from('restaurant_hours').select('*').eq('restaurant_id', id).single(),
    supabase.from('menu_categories').select('*').eq('restaurant_id', id),
    supabase.from('menu_items').select('*, menu_item_categories(category_id)').eq('restaurant_id', id),
    supabase.from('restaurant_ads').select('*').eq('restaurant_id', id)
  ]);
  
  // Transform data to match expected structure
  return {
    id: restaurant.id,
    name: restaurant.name,
    logo: restaurant.logo,
    coverImage: restaurant.cover_image,
    rating: restaurant.rating,
    cuisine: restaurant.cuisine,
    deliveryTime: restaurant.delivery_time,
    deliveryFee: restaurant.delivery_fee,
    minimumOrder: restaurant.minimum_order,
    branding: {
      slogan: branding.slogan,
      themeColor: branding.theme_color,
      textColor: branding.text_color,
      since: branding.since
    },
    contact: {
      address: contact.address,
      phone: contact.phone,
      email: contact.email,
      website: contact.website
    },
    // ... and so on for other properties
  };
}
```

## Fallback Strategy

To ensure a smooth transition, implement a fallback mechanism:

```typescript
import { getRestaurantById } from '../services/restaurantService';
import { mockRestaurants } from '../data/mockData';

export async function getRestaurant(id: string) {
  try {
    // Try to get from Supabase
    const restaurant = await getRestaurantById(id);
    if (restaurant) return restaurant;
    
    // Fall back to mock data if Supabase fails or returns no data
    return mockRestaurants.find(r => r.id === id);
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    // Fall back to mock data
    return mockRestaurants.find(r => r.id === id);
  }
}
```

This approach ensures that the application will continue to work even if there are issues with the Supabase connection, maintaining the optimal web experience as required.

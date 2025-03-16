import { supabase } from '../lib/supabase';

// Types for the data we'll fetch
export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  banner_image?: string;
  cover_image?: string;
  theme_color?: string;
  rating?: number;
  reviews_count?: number;
  cuisine?: string;
  price_range?: string;
  delivery_time?: string;
  minimum_order?: number;
  delivery_fee?: number;
  is_top_restaurant?: boolean;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface RestaurantInfo {
  id: string;
  restaurant_id: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RestaurantAd {
  id: string;
  restaurant_id: string;
  image_url?: string;
  title?: string;
  description?: string;
  link?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OpeningHour {
  id: string;
  restaurant_id: string;
  day: string;
  start_time: string;
  end_time: string;
  is_closed: boolean;
  start_day?: string;
  end_day?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  category_name: string;
  category_description?: string;
  restaurant_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  status?: string;
  is_available?: boolean;
  preparation_time?: string;
  allergens?: string[];
  spicy_level?: string;
  is_vegetarian?: boolean;
  is_vegan?: boolean;
  is_recommended?: boolean;
  display_order?: number;
  category_name?: string;
  menu_category_id?: string;
  restaurant_id?: string;
  created_at?: string;
  updated_at?: string;
}

// Function to get public URL for images from Supabase storage
export async function getImageUrl(bucket: string, path: string): Promise<string> {
  try {
    // Get the public URL directly
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    
    console.log(`Generated public URL for ${path}:`, data.publicUrl);
    return data.publicUrl;
  } catch (error) {
    console.error('Error in getImageUrl:', error);
    return ''; // Return empty string if there's an error
  }
}

// Function to check if a file exists in the Supabase storage bucket
export async function fileExists(bucket: string, path: string): Promise<boolean> {
  try {
    // List files with the exact path to check if it exists
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path.split('/').slice(0, -1).join('/'), {
        limit: 1,
        offset: 0,
        search: path.split('/').pop() || ''
      });
    
    if (error) {
      console.error('Error checking if file exists:', error);
      return false;
    }
    
    return data && data.length > 0;
  } catch (error) {
    console.error('Error in fileExists:', error);
    return false;
  }
}

// Function to get restaurant logo URL
export async function getRestaurantLogoUrl(restaurantId: string): Promise<string> {
  try {
    console.log(`Fetching logo for restaurant ${restaurantId}`);
    
    // Path to the logos folder
    const folderPath = 'logos';
    
    console.log(`Looking for logo in folder: ${folderPath}`);
    
    // List all files in the logos folder
    const { data: files, error } = await supabase.storage
      .from('images')
      .list(folderPath);
    
    if (error) {
      console.error(`Error listing files in ${folderPath}:`, error);
      return '';
    }
    
    console.log(`Files in ${folderPath}:`, files);
    
    if (files && files.length > 0) {
      // Find a file that contains the restaurant ID in its name
      // First try exact match with restaurant_[id]_
      let logoFile = files.find(file => 
        file.name.toLowerCase().includes(`restaurant_${restaurantId.toLowerCase()}_`) &&
        (file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png'))
      );
      
      // If not found, try with just the ID
      if (!logoFile) {
        logoFile = files.find(file => 
          file.name.toLowerCase().includes(`_${restaurantId.toLowerCase()}_`) &&
          (file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png'))
        );
      }
      
      // If still not found, try with just the ID anywhere in the filename
      if (!logoFile) {
        logoFile = files.find(file => 
          file.name.toLowerCase().includes(restaurantId.toLowerCase()) &&
          (file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png'))
        );
      }
      
      // Log all files to help with debugging
      console.log(`All files in logos folder:`, files.map(f => f.name).join(', '));
      
      if (logoFile) {
        // Get the public URL for the image file
        const { data } = supabase.storage
          .from('images')
          .getPublicUrl(`${folderPath}/${logoFile.name}`);
        
        console.log(`Generated logo URL for restaurant ${restaurantId}:`, data.publicUrl);
        return data.publicUrl;
      }
    }
    
    console.log(`No logo found for restaurant ${restaurantId} in ${folderPath}`);
    return '';
  } catch (error) {
    console.error(`Error getting logo for restaurant ${restaurantId}:`, error);
    return '';
  }
}

// Function to get menu item image URL
export async function getMenuItemImageUrl(itemId: string, restaurantId?: string): Promise<string> {
  try {
    // If restaurantId is provided, look in the restaurant's folder
    if (restaurantId) {
      // The correct path structure is: restaurant_[id]/
      const folderPath = `restaurant_${restaurantId}`;
      
      console.log(`Looking for menu item image in folder: ${folderPath}`);
      
      // Try to find the image in the restaurant's folder
      const { data: files, error } = await supabase.storage
        .from('images')
        .list(folderPath, {
          limit: 100,
          offset: 0,
        });
      
      if (!error && files && files.length > 0) {
        console.log(`Found files in ${folderPath}:`, files);
        
        // Find a file that contains the itemId
        const imageFile = files.find(file => 
          file.name.includes(itemId) && 
          (file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png'))
        );
        
        if (imageFile) {
          const { data } = supabase.storage
            .from('images')
            .getPublicUrl(`${folderPath}/${imageFile.name}`);
          
          console.log(`Generated menu item image URL for item ${itemId}:`, data.publicUrl);
          return data.publicUrl;
        }
      }
    }
    
    // Fallback to the old method if not found in the restaurant folder
    const directPath = `menu-items/${itemId}.jpg`;
    console.log(`Falling back to direct path: ${directPath}`);
    return await getImageUrl('images', directPath);
  } catch (error) {
    console.error(`Error getting image for menu item ${itemId}:`, error);
    return '';
  }
}

// Fetch all restaurants or a specific restaurant by ID
export async function fetchRestaurants(id?: string) {
  let query = supabase.from('restaurant').select('*');
  
  if (id) {
    query = query.eq('id', id);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
  
  // For each restaurant, get the logo URL
  const restaurantsWithLogos = await Promise.all(
    data.map(async (restaurant) => {
      const logoUrl = await getRestaurantLogoUrl(restaurant.id);
      return {
        ...restaurant,
        logo: logoUrl || restaurant.logo // Use the fetched logo URL or fall back to the one in the database
      };
    })
  );
  
  return restaurantsWithLogos as Restaurant[];
}

// Fetch restaurant info by restaurant ID
export async function fetchRestaurantInfo(restaurantId: string) {
  const { data, error } = await supabase
    .from('restaurant_info')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .single();
  
  if (error) {
    console.error('Error fetching restaurant info:', error);
    throw error;
  }
  
  return data as RestaurantInfo;
}

// Fetch restaurant ads by restaurant ID
export async function fetchRestaurantAds(restaurantId: string) {
  const { data, error } = await supabase
    .from('restaurant_ads')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .eq('status', 'active');
  
  if (error) {
    console.error('Error fetching restaurant ads:', error);
    throw error;
  }
  
  return data as RestaurantAd[];
}

// Fetch opening hours by restaurant ID
export async function fetchOpeningHours(restaurantId: string) {
  const { data, error } = await supabase
    .from('opening_hours')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .order('day');
  
  if (error) {
    console.error('Error fetching opening hours:', error);
    throw error;
  }
  
  return data as OpeningHour[];
}

// Fetch menu categories by restaurant ID
export async function fetchMenuCategories(restaurantId: string) {
  const { data, error } = await supabase
    .from('item_menu_category')
    .select('id, name, description, category_name, category_description, restaurant_id, created_at, updated_at')
    .eq('restaurant_id', restaurantId)
    .is('is_available', true)
    .order('category_name');
  
  if (error) {
    console.error('Error fetching menu categories:', error);
    throw error;
  }
  
  // Group by category_name to get unique categories
  const categories: MenuCategory[] = [];
  const categoryNames = new Set();
  
  data.forEach(item => {
    if (!categoryNames.has(item.category_name)) {
      categoryNames.add(item.category_name);
      categories.push({
        id: item.id,
        name: item.category_name,
        description: item.category_description,
        category_name: item.category_name,
        category_description: item.category_description,
        restaurant_id: item.restaurant_id,
        created_at: item.created_at,
        updated_at: item.updated_at
      });
    }
  });
  
  return categories;
}

// Fetch menu items by category name
export async function fetchMenuItems(categoryName: string, restaurantId: string) {
  const { data, error } = await supabase
    .from('item_menu_category')
    .select('*')
    .eq('category_name', categoryName)
    .eq('restaurant_id', restaurantId)
    .is('is_available', true);
  
  if (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
  
  // For each menu item, get the image URL
  const itemsWithImages = await Promise.all(
    data.map(async (item) => {
      const imageUrl = await getMenuItemImageUrl(item.id, restaurantId);
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        is_available: item.is_available,
        image_url: imageUrl || item.image_url, // Use the fetched image URL or fall back to the one in the database
        category_name: item.category_name,
        restaurant_id: item.restaurant_id,
        created_at: item.created_at,
        updated_at: item.updated_at
      };
    })
  );
  
  return itemsWithImages as MenuItem[];
}

// Fetch all menu items for a restaurant (across all categories)
export async function fetchAllMenuItems(restaurantId: string) {
  const { data, error } = await supabase
    .from('item_menu_category')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .is('is_available', true);
  
  if (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
  
  // For each menu item, get the image URL
  const itemsWithImages = await Promise.all(
    data.map(async (item) => {
      const imageUrl = await getMenuItemImageUrl(item.id, restaurantId);
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        is_available: item.is_available,
        image_url: imageUrl || item.image_url, // Use the fetched image URL or fall back to the one in the database
        category_name: item.category_name,
        restaurant_id: item.restaurant_id,
        created_at: item.created_at,
        updated_at: item.updated_at
      };
    })
  );
  
  return itemsWithImages as MenuItem[];
}

// Fetch complete restaurant data with all related information
export async function fetchCompleteRestaurantData(restaurantId: string) {
  try {
    // Fetch restaurant basic data
    const restaurants = await fetchRestaurants(restaurantId);
    if (!restaurants || restaurants.length === 0) {
      throw new Error('Restaurant not found');
    }
    const restaurant = restaurants[0];
    
    // Ensure we have the logo from the storage bucket
    if (!restaurant.logo) {
      restaurant.logo = await getRestaurantLogoUrl(restaurantId);
    }
    
    // Fetch restaurant info
    const restaurantInfo = await fetchRestaurantInfo(restaurantId);
    
    // Fetch restaurant ads
    const ads = await fetchRestaurantAds(restaurantId);
    
    // Fetch opening hours
    const openingHours = await fetchOpeningHours(restaurantId);
    
    // Fetch menu categories
    const menuCategories = await fetchMenuCategories(restaurantId);
    
    // Fetch menu items for each category
    const menuItemsByCategory: Record<string, MenuItem[]> = {};
    
    for (const category of menuCategories) {
      const items = await fetchMenuItems(category.category_name, restaurantId);
      menuItemsByCategory[category.category_name] = items;
    }
    
    // Return complete data
    return {
      restaurant,
      info: restaurantInfo,
      ads,
      openingHours,
      menuCategories,
      menuItemsByCategory
    };
  } catch (error) {
    console.error('Error fetching complete restaurant data:', error);
    throw error;
  }
} 
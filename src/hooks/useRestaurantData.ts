import { useState, useEffect } from 'react';
import { fetchCompleteRestaurantData, MenuItem as SupabaseMenuItem, OpeningHour } from '../services/supabaseService';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  preparationTime: string;
  allergens: string[];
  spicyLevel: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isRecommended: boolean;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  logo: string;
  bannerImage: string;
  coverImage?: string;
  themeColor?: string;
  rating: number;
  reviewsCount: number;
  cuisine: string;
  priceRange: string;
  deliveryTime: string;
  minimumOrder: number;
  deliveryFee: number;
  isTopRestaurant: boolean;
  isFeatured: boolean;
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
    city: string;
    social: {
      instagram: string;
      facebook: string;
      whatsapp: string;
    };
  };
  features: {
    isOpen: boolean;
    acceptsOnlinePayment: boolean;
    hasHappyHours: boolean;
    autoAcceptOrders: boolean;
    atmosphere: string;
    dressCode: string;
    parking: string;
    alcohol: string;
  };
  menuItems: Record<string, MenuItem[]>;
  menuCategories: string[];
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  openingHours?: OpeningHour[];
}

// Helper function to transform Supabase menu items to our app's format
function transformMenuItems(supabaseItems: SupabaseMenuItem[]): MenuItem[] {
  return supabaseItems.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description || '',
    price: item.price,
    image: item.image_url || '',
    isAvailable: item.is_available || false,
    preparationTime: item.preparation_time || '10-15 min',
    allergens: item.allergens || [],
    spicyLevel: item.spicy_level || 'mild',
    isVegetarian: item.is_vegetarian || false,
    isVegan: item.is_vegan || false,
    isRecommended: item.is_recommended || false,
    category: item.category_name || ''
  }));
}

export function useRestaurantData(restaurantId: string) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Popular');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!restaurantId) {
          throw new Error('Restaurant ID is required');
        }

        // Fetch data from Supabase
        const data = await fetchCompleteRestaurantData(restaurantId);
        
        if (!data || !data.restaurant) {
          throw new Error('Restaurant not found');
        }
        
        // Transform menu items by category
        const transformedMenuItems: Record<string, MenuItem[]> = {};
        
        for (const [categoryName, items] of Object.entries(data.menuItemsByCategory)) {
          transformedMenuItems[categoryName] = transformMenuItems(items);
        }
        
        // Transform the data to match our expected format
        const transformedRestaurant: Restaurant = {
          id: data.restaurant.id,
          name: data.restaurant.name,
          description: data.restaurant.description || '',
          image: data.restaurant.banner_image || '',
          logo: data.restaurant.logo || '',
          bannerImage: data.restaurant.banner_image || '',
          coverImage: data.restaurant.cover_image,
          themeColor: data.restaurant.theme_color,
          rating: data.restaurant.rating || 4.5,
          reviewsCount: data.restaurant.reviews_count || 100,
          cuisine: data.restaurant.cuisine || '',
          priceRange: data.restaurant.price_range || '$$',
          deliveryTime: data.restaurant.delivery_time || '30-45 min',
          minimumOrder: data.restaurant.minimum_order || 0,
          deliveryFee: data.restaurant.delivery_fee || 0,
          isTopRestaurant: data.restaurant.is_top_restaurant || false,
          isFeatured: data.restaurant.is_featured || false,
          contact: {
            phone: data.info?.phone || '',
            email: data.info?.email || '',
            website: data.info?.website || '',
            address: data.info?.address || '',
            city: data.info?.city || '',
            social: {
              instagram: data.info?.instagram || '',
              facebook: data.info?.facebook || '',
              whatsapp: data.info?.whatsapp || '',
            }
          },
          features: {
            isOpen: true, // Default to open
            acceptsOnlinePayment: true,
            hasHappyHours: false,
            autoAcceptOrders: true,
            atmosphere: 'Casual',
            dressCode: 'Casual',
            parking: 'Available',
            alcohol: 'None'
          },
          menuCategories: data.menuCategories.map(cat => cat.category_name),
          menuItems: transformedMenuItems,
          instagram: data.info?.instagram,
          facebook: data.info?.facebook,
          whatsapp: data.info?.whatsapp,
          openingHours: data.openingHours
        };

        setRestaurant(transformedRestaurant);
        
        // Set initial menu items if the selected category exists
        if (transformedMenuItems[selectedCategory]) {
          setMenuItems(transformedMenuItems[selectedCategory]);
        } else if (data.menuCategories.length > 0) {
          // If the selected category doesn't exist, use the first available category
          const firstCategory = data.menuCategories[0].category_name;
          setSelectedCategory(firstCategory);
          setMenuItems(transformedMenuItems[firstCategory] || []);
        } else {
          setMenuItems([]);
        }

      } catch (err: any) {
        console.error('Error in useRestaurantData:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [restaurantId]);

  // Update menu items when selected category changes
  useEffect(() => {
    if (restaurant && restaurant.menuItems && restaurant.menuItems[selectedCategory]) {
      setMenuItems(restaurant.menuItems[selectedCategory]);
    } else {
      setMenuItems([]);
    }
  }, [selectedCategory, restaurant]);

  return {
    restaurant,
    menuItems,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    error
  };
}

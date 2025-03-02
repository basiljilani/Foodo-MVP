import { useState, useEffect } from 'react';
import { mockRestaurants } from '../data/mockData';

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
}

export function useRestaurantData(restaurantId: string) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Popular');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setIsLoading(true);
        setError(null);

        if (!restaurantId) {
          throw new Error('Restaurant ID is required');
        }

        const restaurantData = mockRestaurants.find(r => r.id === restaurantId);

        if (!restaurantData) {
          throw new Error('Restaurant not found');
        }

        setRestaurant(restaurantData);
        
        // Get menu items for the selected category
        const categoryItems = restaurantData.menuItems[selectedCategory] || [];
        setMenuItems(categoryItems);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, 500); // Simulate API delay

    return () => clearTimeout(timer);
  }, [restaurantId, selectedCategory]);

  return {
    restaurant,
    menuItems,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    error
  };
}

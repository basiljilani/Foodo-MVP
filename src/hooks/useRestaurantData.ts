import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { restaurants as staticRestaurants } from '../data/restaurants';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

interface RestaurantData {
  restaurant: any;
  menuItems: MenuItem[];
  isLoading: boolean;
  error: string | null;
}

export function useRestaurantData(id: string): RestaurantData {
  const [data, setData] = useState<RestaurantData>({
    restaurant: null,
    menuItems: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // First check if this is a static restaurant (id is a number)
        const numericId = parseInt(id);
        if (!isNaN(numericId)) {
          const staticRestaurant = staticRestaurants.find(r => r.id === numericId);
          if (staticRestaurant) {
            // Return static data for existing restaurants
            setData({
              restaurant: staticRestaurant,
              menuItems: [], // Static menu items are handled in the component
              isLoading: false,
              error: null
            });
            return;
          }
        }

        // If not static, fetch from Supabase
        const { data: restaurant, error: restaurantError } = await supabase
          .from('restaurants')
          .select('*')
          .eq('id', id)
          .single();

        if (restaurantError) throw restaurantError;

        if (!restaurant) {
          setData({
            restaurant: null,
            menuItems: [],
            isLoading: false,
            error: 'Restaurant not found'
          });
          return;
        }

        // Fetch menu items with their categories
        const { data: menuData, error: menuError } = await supabase
          .from('menu_items')
          .select('*, menu_categories(name)')
          .eq('restaurant_id', id);

        if (menuError) throw menuError;

        // Transform menu items to match the static data structure
        const transformedMenuItems = (menuData || []).map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price.toString(),
          category: item.menu_categories?.name || 'Other',
          image: item.image_url
        }));

        setData({
          restaurant,
          menuItems: transformedMenuItems,
          isLoading: false,
          error: null
        });
      } catch (error) {
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'An error occurred'
        }));
      }
    }

    fetchData();
  }, [id]);

  return data;
}

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type Restaurant = Database['public']['Tables']['restaurants']['Row'];
type MenuItem = Database['public']['Tables']['menu_items']['Row'];
type RestaurantAd = Database['public']['Tables']['restaurant_ads']['Row'];

export function useRestaurantData(restaurantId: string) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [ads, setAds] = useState<RestaurantAd[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        if (!restaurantId) {
          throw new Error('Restaurant ID is required');
        }

        // Fetch restaurant data with related information
        const { data: restaurantData, error: restaurantError } = await supabase
          .from('restaurants')
          .select(`
            *,
            menu_categories (
              id,
              name,
              display_order,
              menu_items (*)
            ),
            restaurant_ads (
              id,
              title,
              description,
              image_url,
              link_url,
              display_order,
              is_active
            )
          `)
          .eq('id', restaurantId)
          .single();

        if (restaurantError) throw restaurantError;
        if (!restaurantData) throw new Error('Restaurant not found');

        setRestaurant(restaurantData);
        
        // Extract menu items from categories
        const menuItems = restaurantData.menu_categories?.flatMap(cat => 
          cat.menu_items.map(item => ({
            ...item,
            category: cat.name
          }))
        ) || [];
        setMenuItems(menuItems);

        // Extract and sort active ads
        const ads = (restaurantData.restaurant_ads || [])
          .filter(ad => ad.is_active)
          .sort((a, b) => a.display_order - b.display_order);
        setAds(ads);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [restaurantId]);

  return { restaurant, menuItems, ads, isLoading, error };
}

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useRestaurantData(restaurantId: string) {
  const [restaurant, setRestaurant] = useState<any | null>(null);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [menuCategories, setMenuCategories] = useState<any[]>([]);
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

        // Get the base restaurant data
        const { data: restaurantData, error: restaurantError } = await supabase
          .from('restaurants')
          .select('*')
          .eq('restaurant_id', parseInt(restaurantId))
          .limit(1)
          .single();

        if (restaurantError) throw restaurantError;
        if (!restaurantData) throw new Error('Restaurant not found');

        // Transform restaurant data
        const transformedRestaurant = {
          id: restaurantData.restaurant_id.toString(),
          name: restaurantData.restaurant_name,
          description: restaurantData.restaurant_description,
          cuisine: restaurantData.restaurant_categories?.split('_')[0] || 'Steakhouse',
          image: restaurantData.restaurant_image,
          bannerImage: restaurantData.restaurant_banner_image,
          logo: restaurantData.restaurant_logo,
          rating: restaurantData.rating || 4.5,
          totalReviews: restaurantData.reviews_count || 100,
          isTopRestaurant: restaurantData.is_top_restaurant || false,
          deliveryFee: restaurantData.delivery_fee || 0,
          minOrder: restaurantData.minimum_order || 0,
          estimatedTime: restaurantData.delivery_time || '30-45 min',
          distance: restaurantData.distance || '2.5 km',
          priceRange: restaurantData.price_range || '$$$$',
          tags: typeof restaurantData.restaurant_tags === 'string'
            ? [restaurantData.restaurant_tags]
            : restaurantData.restaurant_tags
              ? JSON.parse(restaurantData.restaurant_tags)
              : [],
          contact: {
            phone: restaurantData.restaurant_phone,
            email: restaurantData.restaurant_email,
            website: restaurantData.restaurant_website,
            address: restaurantData.restaurant_address,
            city: restaurantData.restaurant_city,
            social: {
              instagram: restaurantData.instagram_link,
              facebook: restaurantData.facebook_link,
              whatsapp: restaurantData.whatsapp_number
            }
          },
          features: {
            isOpen: restaurantData.is_open || true,
            acceptsOnlinePayment: restaurantData.accepts_online_payment || false,
            hasHappyHours: restaurantData.has_happy_hours || false,
            autoAcceptOrders: restaurantData.auto_accept_orders || false
          }
        };

        // Get menu categories
        const { data: categoryData, error: categoryError } = await supabase
          .from('menu_categories')
          .select('*')
          .eq('restaurant_id', parseInt(restaurantId))
          .order('category_display_order');

        if (categoryError) throw categoryError;

        // Transform categories
        const transformedCategories = categoryData.map(cat => ({
          id: cat.category_id.toString(),
          name: cat.category_name,
          displayOrder: cat.category_display_order || 0
        }));

        // Get menu items
        const { data: itemData, error: itemError } = await supabase
          .from('menu_items')
          .select(`
            *,
            menu_categories (
              category_name
            )
          `)
          .eq('restaurant_id', parseInt(restaurantId));

        if (itemError) throw itemError;

        // Transform menu items
        const transformedItems = itemData.map(item => ({
          id: item.item_id.toString(),
          name: item.item_name,
          description: item.item_description || '',
          price: item.item_price || 0,
          image: item.item_image || '',
          isAvailable: item.item_is_available !== false,
          category: item.menu_categories?.category_name || 'Uncategorized',
          allergens: item.item_allergens?.split('_') || [],
          isVegetarian: item.item_is_vegetarian || false,
          isVegan: item.item_is_vegan || false,
          spicyLevel: item.item_spicy_level || 'low'
        }));

        setRestaurant(transformedRestaurant);
        setMenuCategories(transformedCategories);
        setMenuItems(transformedItems);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [restaurantId]);

  return { restaurant, menuItems, menuCategories, isLoading, error };
}

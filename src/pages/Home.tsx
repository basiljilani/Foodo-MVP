import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Clock, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import FilterSidebar from '../components/FilterSidebar';
import OptimizedImage from '../components/OptimizedImage';
import Layout from '../components/Layout';
import { supabase } from '../lib/supabase';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [],
    rating: null,
    deliveryTime: null
  });

  const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'biryani', name: 'Biryani', icon: '🍚' },
    { id: 'karahi', name: 'Karahi', icon: '🥘' },
    { id: 'bbq', name: 'BBQ', icon: '🍖' },
    { id: 'nihari', name: 'Nihari', icon: '🥣' },
    { id: 'paratha', name: 'Paratha', icon: '🫓' },
    { id: 'chaat', name: 'Chaat', icon: '🥘' },
    { id: 'dessert', name: 'Mithai', icon: '🍯' },
  ];

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('unified_restaurants')
          .select('*')
          .eq('is_open', true);

        if (error) {
          console.error('Error fetching restaurants:', error);
          setRestaurants([]);
          return;
        }

        // Create a Map to deduplicate restaurants by restaurant_id
        const restaurantMap = new Map();
        
        data.forEach(restaurant => {
          // Only add if we haven't seen this restaurant_id before
          if (!restaurantMap.has(restaurant.restaurant_id)) {
            restaurantMap.set(restaurant.restaurant_id, {
              id: restaurant.restaurant_id,
              name: restaurant.restaurant_name,
              image: restaurant.restaurant_image,
              rating: restaurant.rating || 0,
              openingHours: restaurant.opening_hours,
              tags: typeof restaurant.restaurant_tags === 'string' 
                ? [restaurant.restaurant_tags] 
                : restaurant.restaurant_tags 
                  ? JSON.parse(restaurant.restaurant_tags) 
                  : [],
              category: restaurant.restaurant_categories ? restaurant.restaurant_categories.split('_')[0].toLowerCase() : 'all',
              priceRange: restaurant.price_range || '$$',
              description: restaurant.restaurant_description,
              distance: restaurant.distance || 'N/A',
              estimatedTime: restaurant.delivery_time || '30-45 min',
              featured: restaurant.is_featured || false
            });
          }
        });

        // Convert Map values back to array
        const transformedData = Array.from(restaurantMap.values());
        console.log('Fetched restaurants:', transformedData);
        setRestaurants(transformedData);
      } catch (err) {
        console.error('Error processing restaurants:', err);
        setRestaurants([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants;

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case 'offers':
        navigate('/offers');
        break;
      case 'help':
        navigate('/help');
        break;
      default:
        break;
    }
  };

  const handleRestaurantClick = (restaurantId: number) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-50 to-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0iI0ZFRTJFMiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-40"></div>
          </div>

          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Delicious Food,
                <br />
                <span className="text-red-500">Delivered to You</span>
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Discover the best restaurants in your area. From local favorites to new tastes, we bring it all to your doorstep.
              </motion.p>
            </div>
          </div>

          {/* Decorative Elements */}
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-56 h-56 bg-red-200 rounded-full blur-3xl opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
          />
          <motion.div 
            className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <motion.div
              className="hidden md:block flex-none"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FilterSidebar 
                onFilterChange={setFilters} 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </motion.div>

            {/* Restaurant Grid */}
            <div className="flex-grow">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {isLoading ? (
                  // Add loading skeletons
                  Array(3).fill(0).map((_, index) => (
                    <div key={`skeleton-${index}`} className="animate-pulse">
                      <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))
                ) : (
                  filteredRestaurants
                    .filter(restaurant => {
                      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                          restaurant.description.toLowerCase().includes(searchQuery.toLowerCase());
                      const matchesCategory = filters.categories.length === 0 || 
                                            filters.categories.includes(restaurant.category);
                      const matchesPriceRange = filters.priceRange.length === 0 || 
                                              filters.priceRange.includes(restaurant.priceRange);
                      const matchesRating = !filters.rating || restaurant.rating >= filters.rating;
                      
                      return matchesSearch && matchesCategory && matchesPriceRange && matchesRating;
                    })
                    .map((restaurant) => (
                      <motion.div
                        key={restaurant.id}
                        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer"
                        onClick={() => handleRestaurantClick(restaurant.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Restaurant Image */}
                        <div className="relative h-48">
                          <OptimizedImage
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-full h-full"
                            width={400}
                            height={300}
                          />
                          <button 
                            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add to favorites logic here
                            }}
                          >
                            <Heart className="w-5 h-5 text-red-500" />
                          </button>
                        </div>

                        {/* Restaurant Info */}
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-sm font-medium text-gray-900">{restaurant.rating}</span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-3">{restaurant.description}</p>

                          <div className="flex items-center text-sm text-gray-500 space-x-4">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{restaurant.distance}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{restaurant.estimatedTime}</span>
                            </div>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {restaurant.tags && restaurant.tags.map((tag, i) => (
                              <span 
                                key={i}
                                className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))
                )}
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Clock, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import FilterSidebar from '../components/FilterSidebar';
import OptimizedImage from '../components/OptimizedImage';
import Layout from '../components/Layout';
import { fetchRestaurants, fetchRestaurantInfo, Restaurant as SupabaseRestaurant, RestaurantInfo } from '../services/supabaseService';
import PlaceholderLogo from '../components/PlaceholderLogo';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  logo: string;
  bannerImage?: string;
  coverImage?: string;
  themeColor?: string;
  rating: number;
  reviewsCount: number;
  contact: {
    city: string;
    address?: string;
  };
  deliveryTime: string;
  features: {
    isOpen: boolean;
  };
}

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    cuisine: null,
    rating: null,
    deliveryTime: null,
  });
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'fastfood', name: 'Fast Food', icon: '🍔' },
    { id: 'chicken', name: 'Chicken', icon: '🍗' },
  ];

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setIsLoading(true);
        
        // Fetch restaurants from Supabase
        const restaurantsData = await fetchRestaurants();
        console.log('Fetched restaurants data:', restaurantsData);
        
        // For each restaurant, fetch its info
        const restaurantsWithInfo = await Promise.all(
          restaurantsData.map(async (restaurant) => {
            try {
              const info = await fetchRestaurantInfo(restaurant.id);
              console.log(`Restaurant ${restaurant.id} logo:`, restaurant.logo);
              
              return {
                id: restaurant.id,
                name: restaurant.name,
                description: restaurant.description || '',
                image: restaurant.banner_image || '',
                logo: restaurant.logo || '',
                bannerImage: restaurant.banner_image,
                coverImage: restaurant.cover_image,
                themeColor: restaurant.theme_color,
                rating: restaurant.rating || 4.5,
                reviewsCount: restaurant.reviews_count || 100,
                contact: {
                  city: info?.city || 'Islamabad',
                  address: info?.address
                },
                deliveryTime: restaurant.delivery_time || '30-45 min',
                features: {
                  isOpen: true // Default to open
                }
              };
            } catch (error) {
              console.error(`Error fetching info for restaurant ${restaurant.id}:`, error);
              // Return restaurant with default info if there's an error
              return {
                id: restaurant.id,
                name: restaurant.name,
                description: restaurant.description || '',
                image: restaurant.banner_image || '',
                logo: restaurant.logo || '',
                bannerImage: restaurant.banner_image,
                coverImage: restaurant.cover_image,
                themeColor: restaurant.theme_color,
                rating: restaurant.rating || 4.5,
                reviewsCount: restaurant.reviews_count || 100,
                contact: {
                  city: 'Islamabad',
                  address: ''
                },
                deliveryTime: restaurant.delivery_time || '30-45 min',
                features: {
                  isOpen: true
                }
              };
            }
          })
        );
        
        console.log('Restaurants with info:', restaurantsWithInfo);
        setRestaurants(restaurantsWithInfo);
      } catch (err: any) {
        console.error('Error loading restaurants:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRestaurants();
  }, []);

  useEffect(() => {
    // After restaurants are loaded, check if the logo URLs are valid
    if (restaurants.length > 0) {
      console.log('Restaurants loaded with logos:', restaurants);
      
      // Check each restaurant logo
      restaurants.forEach(restaurant => {
        if (restaurant.logo) {
          console.log(`Testing logo for ${restaurant.name} (ID: ${restaurant.id}):`, restaurant.logo);
          const img = new Image();
          img.onload = () => console.log(`Logo for ${restaurant.name} loaded successfully from:`, restaurant.logo);
          img.onerror = (e) => {
            console.error(`Logo for ${restaurant.name} failed to load from URL:`, restaurant.logo);
            console.error('Error details:', e);
          };
          img.src = restaurant.logo;
        } else {
          console.log(`No logo URL for ${restaurant.name} (ID: ${restaurant.id})`);
        }
      });
    }
  }, [restaurants]);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Simplified filtering logic
    const matchesSearch = searchQuery === '' || 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const handleRestaurantClick = (restaurantId: string) => {
    console.log('Navigating to restaurant:', restaurantId);
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
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="flex gap-8">
              {/* Sidebar */}
              <motion.div
                className="hidden md:block flex-none w-64"
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
                {filteredRestaurants.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No restaurants found matching your criteria.</p>
                  </div>
                ) : (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {filteredRestaurants.map((restaurant) => (
                      <motion.div
                        key={restaurant.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105"
                        onClick={() => handleRestaurantClick(restaurant.id)}
                        whileHover={{ y: -5 }}
                      >
                        <div className="relative h-48 bg-gray-50 rounded-lg">
                          {restaurant.themeColor ? (
                            <div className="absolute inset-0" style={{ backgroundColor: restaurant.themeColor }}></div>
                          ) : (
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${restaurant.coverImage || restaurant.bannerImage})` }}>
                              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                            </div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center">
                            {restaurant.logo ? (
                              <>
                                <img
                                  src={restaurant.logo}
                                  alt={restaurant.name}
                                  className="w-full h-full object-contain max-w-[140px] max-h-[140px] p-2"
                                  onLoad={() => console.log("Logo loaded successfully in Home:", restaurant.logo)}
                                  onError={(e) => {
                                    // If the image fails to load, use the PlaceholderLogo component
                                    console.error('Logo failed to load in Home:', restaurant.logo);
                                    // We can't directly replace with a component, so we'll hide this element
                                    e.currentTarget.style.display = 'none';
                                    // And add a class to the parent to indicate we should show the placeholder
                                    e.currentTarget.parentElement?.classList.add('show-placeholder');
                                  }}
                                />
                                <div className="hidden placeholder-logo">
                                  <PlaceholderLogo name={restaurant.name} size="md" />
                                </div>
                              </>
                            ) : (
                              // Fallback when no logo is available
                              <PlaceholderLogo name={restaurant.name} size="md" />
                            )}
                          </div>
                          <div className="absolute top-4 right-4">
                            <Heart className="w-6 h-6 text-white hover:text-red-500 transition-colors" />
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                            <div className="flex items-center">
                              <Star className="w-5 h-5 text-yellow-400 mr-1" />
                              <span className="text-sm font-medium text-gray-600">
                                {restaurant.rating} ({restaurant.reviewsCount})
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{restaurant.contact.city}</span>
                          </div>

                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{restaurant.deliveryTime}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
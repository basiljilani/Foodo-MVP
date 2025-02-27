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
  const [realRestaurants, setRealRestaurants] = useState([]);
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

  const restaurants = [
    {
      id: 1,
      name: "Karachi Biryani House",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
      rating: 4.8,
      openingHours: "11:00 AM - 11:00 PM",
      tags: ["Biryani", "Pakistani", "BBQ"],
      category: "biryani",
      priceRange: "$$",
      description: "Famous for authentic Karachi-style biryani and BBQ specialties.",
      distance: "1.2 km",
      estimatedTime: "20-30 min",
      featured: true
    },
    {
      id: 2,
      name: "Lahore Tikka House",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
      rating: 4.9,
      openingHours: "12:00 PM - 12:00 AM",
      tags: ["Pakistani", "BBQ", "Karahi"],
      category: "bbq",
      priceRange: "$$",
      description: "Authentic Lahori taste with signature tikka and karahi dishes.",
      distance: "0.8 km",
      estimatedTime: "15-25 min",
      featured: true
    },
    {
      id: 3,
      name: "Peshawar Namak Mandi",
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84",
      rating: 4.7,
      openingHours: "1:00 PM - 1:00 AM",
      tags: ["BBQ", "Karahi", "Traditional"],
      category: "karahi",
      priceRange: "$$",
      description: "Famous for traditional Peshawari karahi and namkeen tikka.",
      distance: "2.1 km",
      estimatedTime: "25-35 min"
    },
    {
      id: 4,
      name: "Gujranwala Nihari House",
      image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a",
      rating: 4.8,
      openingHours: "6:00 AM - 11:00 PM",
      tags: ["Nihari", "Pakistani", "Traditional"],
      category: "nihari",
      priceRange: "$",
      description: "Serving the most authentic Nihari recipe since generations.",
      distance: "1.5 km",
      estimatedTime: "20-30 min"
    },
    {
      id: 5,
      name: "Islamabad Chaat Corner",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      rating: 4.6,
      openingHours: "11:00 AM - 11:00 PM",
      tags: ["Chaat", "Street Food", "Snacks"],
      category: "chaat",
      priceRange: "$",
      description: "Famous for gol gappay, dahi bhalla, and special chaat masala.",
      distance: "0.5 km",
      estimatedTime: "15-20 min"
    },
    {
      id: 6,
      name: "Rawalpindi Paratha House",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
      rating: 4.7,
      openingHours: "6:00 AM - 11:00 PM",
      tags: ["Breakfast", "Paratha", "Traditional"],
      category: "paratha",
      priceRange: "$",
      description: "Best breakfast spot famous for crispy parathas and lassi.",
      distance: "1.0 km",
      estimatedTime: "15-25 min"
    },
    {
      id: 7,
      name: "Hyderabad Sweet House",
      image: "https://images.unsplash.com/photo-1615832494873-b0c52d519696",
      rating: 4.8,
      openingHours: "9:00 AM - 11:00 PM",
      tags: ["Mithai", "Desserts", "Traditional"],
      category: "dessert",
      priceRange: "$$",
      description: "Famous for traditional Pakistani sweets and desserts.",
      distance: "1.8 km",
      estimatedTime: "20-30 min"
    },
    {
      id: 8,
      name: "Multan Food Street",
      image: "https://images.unsplash.com/photo-1628294895950-9805252327bc",
      rating: 4.7,
      openingHours: "11:00 AM - 12:00 AM",
      tags: ["BBQ", "Traditional", "Street Food"],
      category: "bbq",
      priceRange: "$$",
      description: "Authentic Multani flavors with special sohan halwa.",
      distance: "2.5 km",
      estimatedTime: "25-35 min"
    }
  ];

  // Fetch real restaurants from Supabase
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching restaurants:', error);
          return;
        }

        // Transform and validate the data
        const transformedData = (data || []).map(restaurant => ({
          ...restaurant,
          tags: restaurant.tags || [],
          rating: restaurant.rating || 0,
          distance: restaurant.distance || 'N/A',
          estimatedTime: restaurant.estimatedTime || 'N/A',
          image: restaurant.image || 'https://placehold.co/400x300?text=No+Image',
          description: restaurant.description || 'No description available'
        }));

        setRealRestaurants(transformedData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Combine mock and real restaurants
  const allRestaurants = [...restaurants, ...realRestaurants];

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
                  allRestaurants
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
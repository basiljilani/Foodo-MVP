import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Clock, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import FilterSidebar from '../components/FilterSidebar';
import OptimizedImage from '../components/OptimizedImage';
import Layout from '../components/Layout';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  logo: string;
  coverImage: string;
  rating: number;
  reviewsCount: number;
  contact: {
    city: string;
  };
  deliveryTime: string;
  features: {
    isOpen: boolean;
  };
}

const mockRestaurants: Restaurant[] = [
  {
    id: 'kfc',
    name: 'KFC',
    description: 'Finger lickin good',
    image: '/images/kfc-hero.jpg',
    logo: '/images/kfc-logo.png',
    coverImage: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1767&q=80',
    rating: 4.5,
    reviewsCount: 100,
    contact: {
      city: 'New York',
    },
    deliveryTime: '30-45 min',
    features: {
      isOpen: true,
    },
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [],
    rating: null,
    deliveryTime: null,
  });

  const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'fastfood', name: 'Fast Food', icon: '🍔' },
    { id: 'chicken', name: 'Chicken', icon: '🍗' },
  ];

  const filteredRestaurants = mockRestaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(restaurant.name.toLowerCase());
    const matchesPriceRange = filters.priceRange.length === 0;
    const matchesRating = !filters.rating || restaurant.rating >= filters.rating;

    return matchesSearch && matchesCategory && matchesPriceRange && matchesRating;
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
                    <div className="relative h-48 bg-gray-50">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${restaurant.coverImage})` }}>
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={restaurant.logo}
                          alt={restaurant.name}
                          className="w-32 h-32 object-contain"
                        />
                      </div>
                      <div className="absolute top-4 right-4">
                        <Heart className="w-6 h-6 text-white hover:text-red-500 transition-colors" />
                      </div>
                      {restaurant.features.isOpen ? (
                        <div className="absolute top-4 left-4 px-2 py-1 bg-green-500 text-white text-sm rounded-full">
                          Open
                        </div>
                      ) : (
                        <div className="absolute top-4 left-4 px-2 py-1 bg-red-500 text-white text-sm rounded-full">
                          Closed
                        </div>
                      )}
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
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
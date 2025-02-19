import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Clock, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import FilterSidebar from '../components/FilterSidebar';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [],
    rating: null,
    deliveryTime: null
  });

  const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'pizza', name: 'Pizza', icon: '🍕' },
    { id: 'sushi', name: 'Sushi', icon: '🍱' },
    { id: 'burger', name: 'Burgers', icon: '🍔' },
    { id: 'healthy', name: 'Healthy', icon: '🥗' },
    { id: 'dessert', name: 'Desserts', icon: '🍰' },
  ];

  const restaurants = [
    {
      id: 1,
      name: "Luigi's Italian",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      rating: 4.8,
      openingHours: "11:00 AM - 10:00 PM",
      tags: ["Italian", "Pizza", "Pasta"],
      category: "pizza",
      priceRange: "$$",
      description: "Authentic Italian cuisine served in a warm, family-friendly atmosphere.",
      distance: "1.2 km",
      estimatedTime: "20-30 min"
    },
    {
      id: 2,
      name: "Sushi Master",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
      rating: 4.9,
      openingHours: "12:00 PM - 11:00 PM",
      tags: ["Japanese", "Sushi", "Asian"],
      category: "sushi",
      priceRange: "$$$",
      description: "Premium sushi experience with fish imported daily from Japan.",
      distance: "0.8 km",
      estimatedTime: "15-25 min"
    },
    {
      id: 3,
      name: "Burger House",
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      rating: 4.7,
      openingHours: "11:00 AM - 12:00 AM",
      tags: ["American", "Burgers", "Fast Food"],
      category: "burger",
      priceRange: "$$",
      description: "Gourmet burgers made with 100% Angus beef.",
      distance: "2.1 km",
      estimatedTime: "25-35 min"
    },
    {
      id: 4,
      name: "Green Garden",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      rating: 4.6,
      openingHours: "10:00 AM - 9:00 PM",
      tags: ["Healthy", "Vegan", "Salads"],
      category: "healthy",
      priceRange: "$$",
      description: "Fresh, organic ingredients in every healthy dish we serve.",
      distance: "1.5 km",
      estimatedTime: "15-25 min"
    },
    {
      id: 5,
      name: "Sweet Delights",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
      rating: 4.9,
      openingHours: "9:00 AM - 10:00 PM",
      tags: ["Desserts", "Bakery", "Coffee"],
      category: "dessert",
      priceRange: "$$",
      description: "Handcrafted desserts and artisanal coffee in a cozy setting.",
      distance: "0.5 km",
      estimatedTime: "10-20 min"
    },
    {
      id: 6,
      name: "Napoli Pizza",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
      rating: 4.8,
      openingHours: "11:30 AM - 11:00 PM",
      tags: ["Pizza", "Italian", "Wine"],
      category: "pizza",
      priceRange: "$$",
      description: "Authentic Neapolitan pizza made in a wood-fired oven.",
      distance: "1.8 km",
      estimatedTime: "25-35 min"
    },
    {
      id: 7,
      name: "Tokyo Ramen",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624",
      rating: 4.7,
      openingHours: "11:00 AM - 10:30 PM",
      tags: ["Japanese", "Ramen", "Asian"],
      category: "sushi",
      priceRange: "$$",
      description: "Authentic Japanese ramen with homemade noodles.",
      distance: "1.3 km",
      estimatedTime: "20-30 min"
    },
    {
      id: 8,
      name: "Veggie Paradise",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
      rating: 4.5,
      openingHours: "10:00 AM - 9:30 PM",
      tags: ["Vegetarian", "Healthy", "Organic"],
      category: "healthy",
      priceRange: "$$",
      description: "Creative vegetarian dishes using local organic produce.",
      distance: "2.0 km",
      estimatedTime: "25-35 min"
    },
    {
      id: 9,
      name: "Gourmet Burgers",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      rating: 4.8,
      openingHours: "11:00 AM - 11:00 PM",
      tags: ["Burgers", "American", "Craft Beer"],
      category: "burger",
      priceRange: "$$$",
      description: "Premium burgers with unique toppings and craft beers.",
      distance: "1.6 km",
      estimatedTime: "20-30 min"
    },
    {
      id: 10,
      name: "Sweet Dreams",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
      rating: 4.9,
      openingHours: "10:00 AM - 10:00 PM",
      tags: ["Desserts", "Ice Cream", "Pastries"],
      category: "dessert",
      priceRange: "$$",
      description: "Homemade ice cream and freshly baked pastries.",
      distance: "0.9 km",
      estimatedTime: "15-25 min"
    },
    {
      id: 11,
      name: "Mediterranean Delight",
      image: "https://images.unsplash.com/photo-1544941968-1c6665ec9c17",
      rating: 4.7,
      openingHours: "11:00 AM - 10:00 PM",
      tags: ["Mediterranean", "Healthy", "Seafood"],
      category: "healthy",
      priceRange: "$$$",
      description: "Fresh Mediterranean cuisine with a modern twist.",
      distance: "1.7 km",
      estimatedTime: "25-35 min"
    },
    {
      id: 12,
      name: "Sushi Fusion",
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754",
      rating: 4.6,
      openingHours: "12:00 PM - 10:30 PM",
      tags: ["Sushi", "Fusion", "Asian"],
      category: "sushi",
      priceRange: "$$$",
      description: "Creative sushi rolls with a contemporary fusion twist.",
      distance: "1.4 km",
      estimatedTime: "20-30 min"
    }
  ];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(restaurant.category);
    const matchesPriceRange = filters.priceRange.length === 0 || filters.priceRange.includes(restaurant.priceRange);
    const matchesRating = filters.rating === null || restaurant.rating >= filters.rating;
    const matchesDeliveryTime = filters.deliveryTime === null || restaurant.estimatedTime <= filters.deliveryTime;
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesPriceRange && matchesRating && matchesDeliveryTime && matchesSearch;
  });

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

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
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <motion.div
                  key={restaurant.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover"
                    />
                    <button 
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50"
                      onClick={() => console.log('Favorite button clicked')}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          false ? 'text-red-500 fill-current' : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                        <span className="text-sm font-medium text-green-700">
                          {restaurant.rating}
                        </span>
                        <Star className="h-4 w-4 text-green-700 ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{restaurant.distance}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{restaurant.estimatedTime} mins</span>
                      </div>
                      <button
                        onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                        className="flex items-center text-sm font-medium text-red-500 hover:text-red-600"
                      >
                        View Menu
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
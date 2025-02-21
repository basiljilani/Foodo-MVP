import React, { useState, useEffect } from 'react';
import { Map as MapIcon, MapPin, Navigation, Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Restaurant {
  id: string;
  name: string;
  distance: string;
  rating: number;
  cuisine: string;
  image: string;
  address: string;
}

export default function NearMeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    if (isOpen) {
      getNearbyRestaurants();
    }
  }, [isOpen]);

  const getNearbyRestaurants = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNearbyRestaurants(mockRestaurants);
      setLoading(false);
    }, 1500);
  };

  // Mock data - replace with actual API call to your backend
  const mockRestaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Spice Garden',
      distance: '0.3 km',
      rating: 4.5,
      cuisine: 'Indian',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=200',
      address: '123 Food Street, Block 6'
    },
    {
      id: '2',
      name: 'Burger House',
      distance: '0.5 km',
      rating: 4.2,
      cuisine: 'American',
      image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=200',
      address: '456 Burger Avenue, Block 4'
    },
    {
      id: '3',
      name: 'Sushi Master',
      distance: '0.7 km',
      rating: 4.8,
      cuisine: 'Japanese',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=200',
      address: '789 Sushi Lane, Block 2'
    },
    {
      id: '4',
      name: 'Pizza Palace',
      distance: '1.1 km',
      rating: 4.3,
      cuisine: 'Italian',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=200',
      address: '321 Pizza Plaza, Block 8'
    },
    {
      id: '5',
      name: 'Taco Fiesta',
      distance: '1.4 km',
      rating: 4.6,
      cuisine: 'Mexican',
      image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=200',
      address: '567 Taco Street, Block 5'
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/30 backdrop-blur-sm"
        >
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 p-4">
                <div className="flex items-center space-x-2">
                  <MapIcon className="h-5 w-5 text-red-500" />
                  <h2 className="text-lg font-semibold">Restaurants Near You</h2>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {loading ? (
                  <div className="flex h-64 items-center justify-center">
                    <div className="text-center">
                      <div className="mb-3 h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
                      <p className="text-sm text-gray-500">Finding restaurants near you...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Location Info */}
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-red-500" />
                        <span>Showing restaurants near your location</span>
                      </div>
                    </div>

                    {/* Restaurant List */}
                    <div className="divide-y divide-gray-100">
                      {nearbyRestaurants.map((restaurant) => (
                        <motion.div
                          key={restaurant.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center space-x-4 py-4"
                        >
                          <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="h-20 w-20 rounded-lg object-cover"
                          />
                          <div className="flex-1 space-y-1">
                            <h3 className="font-medium">{restaurant.name}</h3>
                            <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
                            <p className="text-sm text-gray-500">{restaurant.address}</p>
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center text-sm text-yellow-500">
                                <Star className="mr-1 h-4 w-4 fill-current" />
                                {restaurant.rating}
                              </span>
                              <span className="flex items-center text-sm text-gray-500">
                                <Navigation className="mr-1 h-4 w-4" />
                                {restaurant.distance}
                              </span>
                            </div>
                          </div>
                          <button 
                            className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                            onClick={() => window.location.href = `/restaurants/${restaurant.id}`}
                          >
                            View Menu
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

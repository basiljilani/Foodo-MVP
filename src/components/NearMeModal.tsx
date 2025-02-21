import React, { useState, useEffect } from 'react';
import { Map, MapPin, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Location {
  latitude: number;
  longitude: number;
}

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
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    if (isOpen) {
      getCurrentLocation();
    }
  }, [isOpen]);

  const getCurrentLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          // Simulate fetching nearby restaurants
          setTimeout(() => {
            setNearbyRestaurants(mockRestaurants);
            setLoading(false);
          }, 1500);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    }
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
      address: '123 Food Street'
    },
    {
      id: '2',
      name: 'Burger House',
      distance: '0.5 km',
      rating: 4.2,
      cuisine: 'American',
      image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=200',
      address: '456 Burger Avenue'
    },
    {
      id: '3',
      name: 'Sushi Master',
      distance: '0.7 km',
      rating: 4.8,
      cuisine: 'Japanese',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=200',
      address: '789 Sushi Lane'
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="border-b border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-red-100 p-2">
                      <Map className="h-6 w-6 text-red-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Restaurants Near You</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {loading ? (
                  <div className="flex flex-col items-center justify-center space-y-4 py-12">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-red-500"></div>
                    <p className="text-sm text-gray-500">Finding restaurants near you...</p>
                  </div>
                ) : location ? (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>Your location: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</span>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      {nearbyRestaurants.map((restaurant) => (
                        <motion.div
                          key={restaurant.id}
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
                        >
                          <div className="aspect-w-16 aspect-h-9">
                            <img
                              src={restaurant.image}
                              alt={restaurant.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
                              <div className="flex items-center space-x-1">
                                <span className="text-sm font-medium text-gray-900">{restaurant.rating}</span>
                                <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{restaurant.cuisine}</p>
                            <div className="mt-4 flex items-center justify-between">
                              <span className="text-sm text-gray-500">{restaurant.address}</span>
                              <div className="flex items-center space-x-1 text-red-500">
                                <Navigation className="h-4 w-4" />
                                <span className="text-sm font-medium">{restaurant.distance}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-4 py-12">
                    <div className="rounded-full bg-red-100 p-4">
                      <MapPin className="h-8 w-8 text-red-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Please allow location access to see restaurants near you</p>
                    </div>
                    <button
                      onClick={getCurrentLocation}
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                    >
                      Enable Location
                    </button>
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

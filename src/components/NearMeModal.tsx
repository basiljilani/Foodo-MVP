import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Map as MapIcon, MapPin, Navigation, Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, googleMapsLibraries, GOOGLE_MAPS_SCRIPT_ID } from '../utils/googleMapsConfig';
import { Link } from 'react-router-dom';

interface Restaurant {
  id: string;
  name: string;
  distance: string;
  rating: number;
  cuisine: string;
  image: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}

export default function NearMeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<Restaurant[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [distanceInfo, setDistanceInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: GOOGLE_MAPS_SCRIPT_ID,
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: googleMapsLibraries
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);

  useEffect(() => {
    if (isOpen) {
      getUserLocation();
    }
  }, [isOpen]);

  useEffect(() => {
    if (userLocation) {
      getNearbyRestaurants();
    }
  }, [userLocation]);

  useEffect(() => {
    if (isLoaded && userLocation && selectedRestaurant) {
      calculateRoute();
    }
  }, [isLoaded, userLocation, selectedRestaurant]);

  const getUserLocation = () => {
    setLoading(true);
    setLocationError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError("Unable to get your location. Please enable location services.");
          // Use a default location for Islamabad
          setUserLocation({ lat: 33.6844, lng: 73.0479 });
          setLoading(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      // Use a default location for Islamabad
      setUserLocation({ lat: 33.6844, lng: 73.0479 });
      setLoading(false);
    }
  };

  const getNearbyRestaurants = () => {
    // In a real app, you would fetch restaurants based on user location
    // For now, we'll use the KFC F-11 and McDonald's F-10 locations and calculate actual distance
    
    // KFC F-11 branch in Islamabad
    const kfcF11: Restaurant = {
      id: 'kfc',
      name: 'KFC F-11',
      distance: 'Calculating...',
      rating: 4.3,
      cuisine: 'Fast Food, Chicken',
      image: 'https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png',
      address: 'F-11 Markaz, Islamabad',
      location: { lat: 33.6845, lng: 72.9913 }
    };

    // McDonald's F-10 branch in Islamabad
    const mcdonaldsF10: Restaurant = {
      id: 'mcdonalds',
      name: 'McDonald\'s F-10',
      distance: 'Calculating...',
      rating: 4.2,
      cuisine: 'Fast Food, Burgers',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png',
      address: 'F-10 Markaz, Islamabad',
      location: { lat: 33.6943, lng: 73.0188 }
    };

    const restaurants = [kfcF11, mcdonaldsF10];
    
    // Calculate actual distance for each restaurant
    if (userLocation) {
      calculateDistances(restaurants);
    }
    
    setNearbyRestaurants(restaurants);
    setSelectedRestaurant(kfcF11);
    setLoading(false);
  };

  const calculateDistances = (restaurants: Restaurant[]) => {
    if (!isLoaded || !userLocation) return;

    const service = new google.maps.DistanceMatrixService();
    
    const origins = [new google.maps.LatLng(userLocation.lat, userLocation.lng)];
    const destinations = restaurants.map(r => 
      new google.maps.LatLng(r.location.lat, r.location.lng)
    );

    service.getDistanceMatrix(
      {
        origins,
        destinations,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK' && response) {
          const updatedRestaurants = restaurants.map((restaurant, index) => {
            const result = response.rows[0].elements[index];
            if (result.status === 'OK') {
              return {
                ...restaurant,
                distance: result.distance.text
              };
            }
            return restaurant;
          });
          
          setNearbyRestaurants(updatedRestaurants);
        }
      }
    );
  };

  const calculateRoute = () => {
    if (!isLoaded || !userLocation || !selectedRestaurant) return;

    if (!directionsServiceRef.current) {
      directionsServiceRef.current = new google.maps.DirectionsService();
    }

    directionsServiceRef.current.route(
      {
        origin: new google.maps.LatLng(userLocation.lat, userLocation.lng),
        destination: new google.maps.LatLng(
          selectedRestaurant.location.lat,
          selectedRestaurant.location.lng
        ),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
          
          // Extract distance and duration information
          const route = result.routes[0];
          if (route && route.legs.length > 0) {
            const leg = route.legs[0];
            setDistanceInfo({
              distance: leg.distance?.text || 'Unknown',
              duration: leg.duration?.text || 'Unknown'
            });
          }
        } else {
          console.error(`Directions request failed: ${status}`);
        }
      }
    );
  };

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

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
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Map Section */}
                    <div className="space-y-4">
                      {locationError && (
                        <div className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-700">
                          {locationError}
                        </div>
                      )}
                      
                      {/* Google Map */}
                      <div className="h-[350px] rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                        {isLoaded ? (
                          <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            center={userLocation || { lat: 33.6844, lng: 73.0479 }}
                            zoom={13}
                            onLoad={onMapLoad}
                            options={{
                              fullscreenControl: false,
                              streetViewControl: false,
                              mapTypeControl: false,
                              zoomControl: true,
                            }}
                          >
                            {userLocation && (
                              <Marker
                                position={userLocation}
                                icon={{
                                  url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                                  scaledSize: new google.maps.Size(40, 40)
                                }}
                                title="Your Location"
                              />
                            )}
                            
                            {nearbyRestaurants.map((restaurant) => (
                              <Marker
                                key={restaurant.id}
                                position={restaurant.location}
                                title={restaurant.name}
                                icon={{
                                  url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                                  scaledSize: new google.maps.Size(40, 40)
                                }}
                                onClick={() => setSelectedRestaurant(restaurant)}
                              />
                            ))}
                            
                            {directions && <DirectionsRenderer directions={directions} />}
                          </GoogleMap>
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gray-100">
                            <p className="text-gray-500">Loading map...</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Distance Info */}
                      {distanceInfo && (
                        <div className="rounded-lg bg-gray-50 p-4">
                          <h3 className="font-medium mb-2">Route Information</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Distance</p>
                              <p className="text-sm font-medium">{distanceInfo.distance}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Estimated Time</p>
                              <p className="text-sm font-medium">{distanceInfo.duration}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Restaurant List */}
                    <div className="space-y-4">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4 text-red-500" />
                          <span>Showing restaurants near your location</span>
                        </div>
                      </div>

                      <div className="divide-y divide-gray-100 max-h-[350px] overflow-y-auto">
                        {nearbyRestaurants.map((restaurant) => (
                          <motion.div
                            key={restaurant.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex items-center space-x-4 py-4 px-3 rounded-lg ${
                              selectedRestaurant?.id === restaurant.id ? 'bg-red-50' : ''
                            }`}
                            onClick={() => setSelectedRestaurant(restaurant)}
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
                            <Link 
                              to={`/restaurants/${restaurant.id}`}
                              className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the parent div's onClick
                                onClose(); // Close the modal when navigating to restaurant page
                              }}
                            >
                              View Menu
                            </Link>
                          </motion.div>
                        ))}
                      </div>
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

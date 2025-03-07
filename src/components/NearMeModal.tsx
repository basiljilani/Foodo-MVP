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

  // Calculate route when a restaurant is selected
  const calculateRoute = useCallback(() => {
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
        optimizeWaypoints: true,
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
          
          // Fit the map to the route bounds
          if (mapRef.current && result.routes[0].bounds) {
            mapRef.current.fitBounds(result.routes[0].bounds);
          }
        } else {
          console.error(`Directions request failed: ${status}`);
          setDirections(null);
          setDistanceInfo(null);
        }
      }
    );
  }, [isLoaded, userLocation, selectedRestaurant]);

  // Get user location when modal opens
  useEffect(() => {
    if (isOpen) {
      getUserLocation();
    }
  }, [isOpen]);

  // Get nearby restaurants when user location is available
  useEffect(() => {
    if (userLocation) {
      getNearbyRestaurants();
    }
  }, [userLocation]);

  // Calculate route when a restaurant is selected
  useEffect(() => {
    if (isLoaded && userLocation && selectedRestaurant) {
      calculateRoute();
    }
  }, [isLoaded, userLocation, selectedRestaurant, calculateRoute]);

  // Get user's current location
  const getUserLocation = () => {
    setLoading(true);
    setLocationError(null);

    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      // Use a default location for Islamabad
      setUserLocation({ lat: 33.6844, lng: 73.0479 });
      setLoading(false);
      return;
    }

    // Show a message to the user that we're requesting their location
    const locationPermissionMessage = document.createElement('div');
    locationPermissionMessage.className = 'fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50';
    locationPermissionMessage.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 class="text-lg font-medium mb-2">Location Permission</h3>
        <p class="text-gray-600 mb-4">Foodo needs your location to show nearby restaurants. Please allow location access when prompted.</p>
        <div class="flex justify-end">
          <button id="location-permission-ok" class="px-4 py-2 bg-red-500 text-white rounded-md">OK</button>
        </div>
      </div>
    `;
    document.body.appendChild(locationPermissionMessage);

    // Remove the message when the user clicks OK
    document.getElementById('location-permission-ok')?.addEventListener('click', () => {
      document.body.removeChild(locationPermissionMessage);
      
      // For testing purposes, use a fixed location in Islamabad
      // This ensures consistent behavior during development
      // In production, you would use the commented out geolocation code
      
      // Fixed location for F-7 Islamabad
      const fixedLocation = { lat: 33.7156, lng: 73.0537 };
      setUserLocation(fixedLocation);
      setLoading(false);
      
      /*
      // Request the user's location - uncomment this for production
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          
          // Handle different error cases
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationError("Location permission denied. Please enable location services to see nearby restaurants.");
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationError("Location information is unavailable. Using default location.");
              break;
            case error.TIMEOUT:
              setLocationError("Location request timed out. Using default location.");
              break;
            default:
              setLocationError("An unknown error occurred while getting your location. Using default location.");
          }
          
          // Use a default location for Islamabad
          setUserLocation({ lat: 33.6844, lng: 73.0479 });
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
      */
    });
  };

  // Get nearby restaurants based on user location
  const getNearbyRestaurants = () => {
    // In a real app, you would fetch restaurants based on user location
    // For now, we'll use all restaurants from our data and calculate actual distance
    
    // KFC F-11 branch in Islamabad
    const kfcF11: Restaurant = {
      id: 'kfc',
      name: 'KFC F-11',
      distance: 'Calculating...',
      rating: 4.3,
      cuisine: 'Fast Food, Chicken',
      image: 'https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png',
      address: 'F-11 Markaz, Islamabad',
      location: { lat: 33.7232, lng: 73.0344 }
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
      location: { lat: 33.6934, lng: 73.0244 }
    };

    // Savour Foods F-7 in Islamabad
    const savourF7: Restaurant = {
      id: 'savour',
      name: 'Savour Foods F-7',
      distance: 'Calculating...',
      rating: 4.5,
      cuisine: 'Pakistani, Rice',
      image: '/images/savour-logo.svg',
      address: 'F-7 Markaz, Islamabad',
      location: { lat: 33.7156, lng: 73.0537 }
    };

    // Howdy F-8 in Islamabad
    const howdyF8: Restaurant = {
      id: 'howdy',
      name: 'Howdy F-8',
      distance: 'Calculating...',
      rating: 4.1,
      cuisine: 'Fast Food, Burgers',
      image: '/images/howdy-logo.svg',
      address: 'F-8 Markaz, Islamabad',
      location: { lat: 33.7025, lng: 73.0577 }
    };

    // Chaaye Khana F-7 in Islamabad
    const chaayeKhanaF7: Restaurant = {
      id: 'chaaye-khana',
      name: 'Chaaye Khana F-7',
      distance: 'Calculating...',
      rating: 4.4,
      cuisine: 'Cafe, Pakistani',
      image: '/images/chaaye-khana-logo.svg',
      address: 'F-7 Markaz, Islamabad',
      location: { lat: 33.7156, lng: 73.0537 }
    };

    // Tandoori Blue Area in Islamabad
    const tandooriBlueArea: Restaurant = {
      id: 'tandoori',
      name: 'Tandoori Blue Area',
      distance: 'Calculating...',
      rating: 4.3,
      cuisine: 'Pakistani, Indian',
      image: '/images/tandoori-logo.svg',
      address: 'Blue Area, Islamabad',
      location: { lat: 33.7156, lng: 73.0537 }
    };

    const restaurants = [kfcF11, mcdonaldsF10, savourF7, howdyF8, chaayeKhanaF7, tandooriBlueArea];
    
    // Calculate actual distance for each restaurant
    if (userLocation && isLoaded) {
      calculateDistances(restaurants);
    }
    
    setNearbyRestaurants(restaurants);
    setSelectedRestaurant(restaurants[0]);
    setLoading(false);
  };

  // Calculate distances from user to each restaurant
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

  // Initialize the map when loaded
  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    directionsServiceRef.current = new google.maps.DirectionsService();
    
    // Create a bounds object to fit all markers
    const bounds = new google.maps.LatLngBounds();
    
    // Add user location to bounds
    if (userLocation) {
      bounds.extend(new google.maps.LatLng(userLocation.lat, userLocation.lng));
    }
    
    // Add all restaurant locations to bounds
    nearbyRestaurants.forEach(restaurant => {
      bounds.extend(new google.maps.LatLng(restaurant.location.lat, restaurant.location.lng));
    });
    
    // Only fit bounds if we have points to fit
    if (userLocation || nearbyRestaurants.length > 0) {
      // Fit the map to the bounds with padding
      map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
      
      // Set a minimum zoom level to prevent excessive zoom on single points
      google.maps.event.addListenerOnce(map, 'idle', () => {
        if (map.getZoom() > 14) map.setZoom(14);
      });
    }
    
    // Log to console for debugging
    console.log('Map loaded with user location:', userLocation);
    console.log('Restaurants on map:', nearbyRestaurants.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <motion.div 
        className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center">
            <MapIcon className="w-5 h-5 mr-2 text-red-500" />
            Restaurants Near Me
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="p-10 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Finding restaurants near you...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {/* Restaurant List */}
            <div className="md:col-span-1 overflow-y-auto max-h-[70vh]">
              {locationError && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
                  {locationError}
                </div>
              )}
              
              <div className="space-y-3">
                {nearbyRestaurants.map((restaurant) => (
                  <motion.div
                    key={restaurant.id}
                    className={`p-3 rounded-lg cursor-pointer border ${
                      selectedRestaurant?.id === restaurant.id
                        ? 'bg-red-50 border-red-200'
                        : 'bg-white border-gray-200 hover:border-red-200'
                    }`}
                    onClick={() => setSelectedRestaurant(restaurant)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{restaurant.name}</h4>
                        <div className="flex items-center mt-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-xs text-gray-600 ml-1">{restaurant.rating}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-xs text-gray-600">{restaurant.cuisine}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-600 ml-1">{restaurant.address}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Navigation className="w-3 h-3 text-red-500" />
                          <span className="text-xs font-medium text-red-500 ml-1">{restaurant.distance}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="md:col-span-2 h-[70vh] rounded-lg overflow-hidden border border-gray-200 relative">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={userLocation || { lat: 33.6844, lng: 73.0479 }}
                  zoom={12}
                  options={{
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: true,
                  }}
                  onLoad={onMapLoad}
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
                      icon={{
                        url: selectedRestaurant?.id === restaurant.id 
                          ? 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' 
                          : 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
                        scaledSize: new google.maps.Size(40, 40)
                      }}
                      onClick={() => setSelectedRestaurant(restaurant)}
                      animation={selectedRestaurant?.id === restaurant.id ? google.maps.Animation.BOUNCE : null}
                      title={restaurant.name}
                    />
                  ))}
                  
                  {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />}
                </GoogleMap>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-gray-500 text-sm">Loading map...</p>
                  </div>
                </div>
              )}
              
              {/* Distance info overlay */}
              {distanceInfo && selectedRestaurant && (
                <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {selectedRestaurant.name}
                      </h4>
                      <div className="flex items-center mt-1">
                        <span className="text-xs font-medium text-gray-600">
                          Distance: {distanceInfo.distance}
                        </span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-xs font-medium text-gray-600">
                          ETA: {distanceInfo.duration}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/restaurant/${selectedRestaurant.id}`}
                      className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-md hover:bg-red-600 transition-colors"
                      onClick={onClose}
                    >
                      View Menu
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

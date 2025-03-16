import React, { useState, useEffect } from 'react';
import { fetchRestaurantAds, RestaurantAd } from '../services/supabaseService';

interface RestaurantAdsProps {
  id?: string;
}

export default function RestaurantAds({ id }: RestaurantAdsProps) {
  const [ads, setAds] = useState<RestaurantAd[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAds = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const adsData = await fetchRestaurantAds(id);
        console.log('Loaded ads:', adsData); // Add logging to debug
        setAds(adsData);
      } catch (err: any) {
        console.error('Error loading ads:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadAds();
  }, [id]);

  useEffect(() => {
    if (ads.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ads.length]);

  if (isLoading) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">Failed to load ads: {error}</p>
      </div>
    );
  }

  if (ads.length === 0) {
    // Default ad if no ads are available
    return (
      <div className="w-full h-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Special Offer!</h3>
          <p className="mb-4">Free delivery on your first order with code: WELCOME</p>
          <button className="px-4 py-2 bg-white text-red-600 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Order Now
          </button>
        </div>
      </div>
    );
  }

  const currentAd = ads[currentAdIndex];

  return (
    <a 
      href={currentAd.link || '#'} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block w-full h-full relative overflow-hidden"
    >
      <img 
        src={currentAd.image_url} 
        alt={currentAd.title || 'Advertisement'} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
        {currentAd.title && (
          <h3 className="text-white text-lg font-bold">{currentAd.title}</h3>
        )}
        {currentAd.description && (
          <p className="text-white text-sm">{currentAd.description}</p>
        )}
      </div>
      
      {/* Pagination dots for multiple ads */}
      {ads.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {ads.map((_, index) => (
            <span 
              key={index} 
              className={`block h-1.5 rounded-full ${
                index === currentAdIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
              } transition-all duration-300`}
            />
          ))}
        </div>
      )}
    </a>
  );
}

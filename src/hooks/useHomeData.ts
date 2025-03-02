import { useState, useEffect } from 'react';
import { mockRestaurants } from '../data/mockData';

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  cuisine: string;
  priceRange: string;
  deliveryTime: string;
  minimumOrder: number;
  deliveryFee: number;
  isTopRestaurant: boolean;
  isFeatured: boolean;
  contact: {
    address: string;
    city: string;
  };
  features: {
    isOpen: boolean;
  };
}

export function useHomeData() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setRestaurants(mockRestaurants);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { restaurants, isLoading };
}

import React from 'react';
import { Star, Clock, Bike, Award, Package2, Heart, Crown, Info } from 'lucide-react';

interface RestaurantHeroProps {
  name: string;
  cuisine: string;
  rating: number;
  totalReviews: number;
  isTopRestaurant: boolean;
  deliveryFee: number;
  minOrder: number;
}

export default function RestaurantHero({
  name,
  cuisine,
  rating,
  totalReviews,
  isTopRestaurant,
  deliveryFee,
  minOrder,
}: RestaurantHeroProps) {
  return (
    <div className="bg-white">
      {/* Main Info */}
      <div className="px-4 py-4">
        <div className="flex gap-4 items-start">
          {/* Restaurant Image */}
          <div className="w-[120px] h-[120px] rounded-lg overflow-hidden bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2788&auto=format&fit=crop"
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Restaurant Info */}
          <div className="flex-1">
            <p className="text-[15px] text-gray-600 mb-1">{cuisine}</p>
            <h1 className="text-[22px] font-bold mb-2">{name}</h1>
            {isTopRestaurant && (
              <div className="bg-gray-100 px-3 py-1 rounded-full inline-flex items-center gap-1">
                <Crown className="w-3 h-3" />
                <span className="text-[13px] font-medium">Top restaurant</span>
              </div>
            )}
          </div>
        </div>

        {/* Rating and Info Section */}
        <div className="flex items-center justify-center gap-4 text-[14px] mt-4 whitespace-nowrap">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-orange-400 fill-current" />
            <span className="font-medium">{rating}</span>
            <span className="text-gray-600">/5</span>
            <span className="text-gray-600 ml-1">({totalReviews}+)</span>
          </div>
          <span className="text-gray-600 hover:underline cursor-pointer">See reviews</span>
          <span className="flex items-center gap-1 text-gray-600">
            <Info className="w-4 h-4" />
            <span>More info</span>
          </span>
        </div>
      </div>

      {/* Add to Favorites */}
      <div className="border-t border-gray-100">
        <button className="w-full px-4 py-3 flex items-center justify-center gap-2 text-[15px] text-gray-900">
          <Heart className="w-5 h-5" />
          Add to favourites
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Star, Clock, Bike, Award, Package2, Heart, Crown, Info } from 'lucide-react';
import RestaurantInfoModal from './RestaurantInfoModal';

interface RestaurantHeroProps {
  name: string;
  cuisine: string;
  rating: number;
  totalReviews: number;
  isTopRestaurant: boolean;
  deliveryFee: number;
  minOrder: number;
  image: string;
  restaurant: any; // This will contain all restaurant details
}

export default function RestaurantHero({
  name,
  cuisine,
  rating,
  totalReviews,
  isTopRestaurant,
  deliveryFee,
  minOrder,
  image,
  restaurant,
}: RestaurantHeroProps) {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Mobile Version */}
      <div className="md:hidden">
        {/* Mobile content stays exactly the same */}
        <div className="px-4 py-4">
          <div className="flex gap-4 items-start">
            {/* Restaurant Image */}
            <div className="w-[120px] h-[120px] rounded-lg overflow-hidden bg-gray-100">
              <img
                src={image}
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
            <span 
              className="flex items-center gap-1 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
              onClick={() => setIsInfoModalOpen(true)}
            >
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

      {/* Web Version */}
      <div className="hidden md:block bg-white">
        <div className="max-w-[1280px] mx-auto px-4 py-4">
          <div className="flex items-start gap-6">
            {/* Restaurant Image */}
            <div className="w-[140px] h-[140px] rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  {/* Restaurant Tags */}
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-[14px] text-gray-500">
                    {restaurant.tags?.map((tag, index) => (
                      <>
                        {index > 0 && <span className="text-gray-300">•</span>}
                        <span 
                          key={index}
                          className="hover:text-gray-800 transition-colors cursor-default capitalize"
                        >
                          {tag.toLowerCase()}
                        </span>
                      </>
                    ))}
                  </div>
                  <h1 className="text-[32px] font-bold mb-2">{name}</h1>
                  {isTopRestaurant && (
                    <div className="inline-flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md mb-3">
                      <Crown className="w-4 h-4" />
                      <span className="text-[13px] font-medium">Top restaurant</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-[13px]">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{rating}</span>
                      <span className="text-gray-500">/150 reviews</span>
                      <button 
                        onClick={() => setIsInfoModalOpen(true)}
                        className="ml-2 flex items-center gap-1 text-gray-600 hover:text-gray-900"
                      >
                        <Info className="w-4 h-4" />
                        <span>More info</span>
                      </button>
                    </div>
                  </div>
                </div>
                <button 
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50"
                  aria-label="Add to favorites"
                >
                  <Heart className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Available Deals Section - Web Only */}
          <div className="mt-6 border-t border-gray-100 pt-6">
            <h2 className="text-[28px] font-bold mb-4">Available Deals</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Package2 className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <h3 className="text-[15px] font-medium mb-1">Family Deal 1</h3>
                    <p className="text-gray-600 text-[13px]">2 Large Biryani + 4 Seekh Kebabs + 2 Drinks</p>
                    <p className="text-[15px] font-medium mt-2">Rs. 1,499</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Package2 className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <h3 className="text-[15px] font-medium mb-1">Student Deal</h3>
                    <p className="text-gray-600 text-[13px]">1 Regular Biryani + 2 Seekh Kebabs + 1 Drink</p>
                    <p className="text-[15px] font-medium mt-2">Rs. 599</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Package2 className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <h3 className="text-[15px] font-medium mb-1">Lunch Special</h3>
                    <p className="text-gray-600 text-[13px]">1 Large Biryani + 3 Seekh Kebabs + Raita</p>
                    <p className="text-[15px] font-medium mt-2">Rs. 899</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Info Modal */}
      <RestaurantInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        restaurant={restaurant}
      />
    </div>
  );
}

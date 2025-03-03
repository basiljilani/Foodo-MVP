import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Info, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RestaurantHeroProps {
  name: string;
  cuisine: string;
  isTopRestaurant?: boolean;
  deliveryFee?: number;
  minOrder?: number;
  restaurant: {
    image: string;
    rating?: number;
    reviewsCount?: number;
    city?: string;
  };
  onMoreInfoClick: () => void;
}

const RestaurantHero: React.FC<RestaurantHeroProps> = ({
  name,
  cuisine,
  isTopRestaurant,
  deliveryFee,
  minOrder,
  restaurant,
  onMoreInfoClick
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm">
        <Link to="/" className="text-gray-600 hover:text-gray-900">
          {restaurant.city || 'Islamabad'}
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <Link to="/" className="text-gray-600 hover:text-gray-900">
          Restaurant List
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900">{name}</span>
      </div>

      {/* Restaurant Info */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-start gap-6">
          {/* Restaurant Image */}
          <div className="shrink-0">
            <img
              src={restaurant.image}
              alt={name}
              className="w-24 h-24 rounded-lg object-cover"
            />
          </div>
          
          {/* Restaurant Details */}
          <div className="flex-1">
            {/* Cuisine Tags */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <span>Pakistani</span>
              <span>•</span>
              <span>{cuisine}</span>
              <span>•</span>
              <span>Pulao</span>
            </div>

            {/* Restaurant Name */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{name}</h1>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm">
              {isTopRestaurant && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Top restaurant</span>
                </div>
              )}
              {deliveryFee !== undefined && (
                <div className="flex items-center gap-1">
                  <span>Rs. {deliveryFee} delivery</span>
                </div>
              )}
              {minOrder !== undefined && (
                <div className="flex items-center gap-1">
                  <span>Min. order Rs. {minOrder}</span>
                </div>
              )}
            </div>

            {/* Rating and Actions */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-4">
                {restaurant.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{restaurant.rating}</span>
                    {restaurant.reviewsCount && (
                      <>
                        <span className="text-gray-500">({restaurant.reviewsCount})</span>
                        <button 
                          className="text-gray-600 hover:text-gray-900 text-sm ml-1"
                          onClick={onMoreInfoClick}
                        >
                          See reviews
                        </button>
                      </>
                    )}
                  </div>
                )}
                <button 
                  className="text-gray-600 hover:text-gray-900 text-sm"
                  onClick={onMoreInfoClick}
                >
                  More info
                </button>
              </div>

              <button 
                className={`flex items-center gap-1 text-gray-600 hover:text-gray-900 ${isFavorite ? 'text-red-500 hover:text-red-600' : ''}`}
                onClick={handleFavoriteClick}
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  animate={isFavorite ? {
                    scale: [1, 1.2, 0.95, 1],
                    transition: { duration: 0.3 }
                  } : {}}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </motion.div>
                <span>Add to favourites</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHero;
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHero;

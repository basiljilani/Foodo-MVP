import React, { useState } from 'react';
import { Info, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface RestaurantHeroProps {
  name: string;
  cuisine: string;
  isTopRestaurant: boolean;
  deliveryFee: number;
  minOrder: number;
  restaurant: any;
  onMoreInfoClick?: () => void;
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
  // Split cuisine into categories
  const categories = cuisine.split('•').map(cat => cat.trim());
  
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-3">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Islamabad</Link>
          <span className="text-gray-400">›</span>
          <Link to="/restaurants" className="text-gray-600 hover:text-gray-900">Restaurant List</Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900">{name}</span>
        </div>

        {/* Restaurant Info */}
        <div className="flex items-start gap-4">
          {/* Restaurant Image */}
          <div className="w-[108px] h-[108px] rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={restaurant.image || 'https://placehold.co/400x400?text=No+Image'}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Restaurant Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[40px] leading-[1.2] font-bold text-gray-900 mb-4">{name}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  {categories.map((category, index) => (
                    <React.Fragment key={category}>
                      <span>{category}</span>
                      {index < categories.length - 1 && <span>•</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Info Row */}
            <div className="flex items-center gap-4 text-sm mb-3">
              {isTopRestaurant && (
                <div className="flex items-center gap-1">
                  <span className="flex items-center px-2 py-1 bg-gray-100 rounded-full text-[13px] font-medium">
                    <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 14 14" fill="none">
                      <path d="M7 0L8.5716 5.25532L14 5.25532L9.7142 8.49468L11.2858 13.75L7 10.5106L2.7142 13.75L4.2858 8.49468L0 5.25532L5.4284 5.25532L7 0Z" fill="currentColor"/>
                    </svg>
                    Top restaurant
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1 text-gray-600">
                <span>Rs. {deliveryFee} delivery</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <span>Min. order Rs. {minOrder}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-3">
                <button 
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={onMoreInfoClick}
                >
                  <Info className="w-4 h-4" />
                  <span>More info</span>
                </button>
                <motion.button 
                  className={`flex items-center gap-1 text-gray-600 hover:text-gray-900 ${isFavorite ? 'text-red-500 hover:text-red-600' : ''}`}
                  onClick={handleFavoriteClick}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={isFavorite ? {
                      scale: [1, 1.2, 0.95, 1],
                      transition: { duration: 0.3 }
                    } : {}}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </motion.div>
                  <span>{isFavorite ? 'Added to favourites' : 'Add to favourites'}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHero;

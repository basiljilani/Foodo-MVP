import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Info, Star, ChevronRight, Phone } from 'lucide-react';
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
        <div className="flex gap-6">
          {/* Restaurant Logo */}
          <div className="w-[160px] h-[160px] bg-[#E4002B] rounded-lg flex items-center justify-center p-2">
            <img
              src={restaurant.image}
              alt={name}
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>
          
          {/* Restaurant Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="text-gray-500 mb-1 flex items-center gap-2">
                <span>Burgers</span>
                <span>·</span>
                <span>Fast Food</span>
                <span>·</span>
                <span>Western</span>
                <span>·</span>
                <span>Broast</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                {name}
              </h1>
            </div>

            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-4">
                <motion.button 
                  className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
                  onClick={onMoreInfoClick}
                >
                  <Info className="w-5 h-5" />
                  More info
                </motion.button>
                <motion.a
                  href="tel:051111532532"
                  className="flex items-center gap-2 text-gray-500 select-none px-4 py-2 rounded-lg"
                  whileHover={{ 
                    backgroundColor: '#E4002B',
                    color: '#ffffff'
                  }}
                  transition={{ 
                    duration: 0.2
                  }}
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">Call Now</span>
                </motion.a>
              </div>
              <motion.button 
                className={`text-gray-400 hover:text-red-500 transition-colors`}
                onClick={handleFavoriteClick}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHero;

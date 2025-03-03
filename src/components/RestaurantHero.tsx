import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Phone, 
  Info, 
  Heart,
  Star
} from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Mobile Breadcrumb */}
        <div className="md:hidden flex items-center text-sm">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Islamabad
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
          <span className="text-gray-400">•••</span>
          <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
          <span className="text-gray-900 font-medium">KFC - F 11</span>
        </div>
        
        {/* Desktop Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-sm">
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
      </div>

      {/* Restaurant Info */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Restaurant Logo */}
          <div className="w-full md:w-[160px] h-[120px] md:h-[160px] bg-[#E4002B] rounded-lg flex items-center justify-center p-2 mx-auto md:mx-0 max-w-[160px]">
            <img
              src={restaurant.image}
              alt={name}
              className="w-full h-full object-contain scale-150"
              loading="eager"
            />
          </div>
          
          {/* Restaurant Details */}
          <div className="flex-1 flex flex-col justify-between mt-4 md:mt-0">
            <div>
              <div className="text-gray-500 mb-1 flex items-center gap-2 flex-wrap justify-center md:justify-start text-xs md:text-sm">
                <span>Burgers</span>
                <span className="hidden md:inline">·</span>
                <span className="md:hidden">•</span>
                <span>Fast Food</span>
                <span className="hidden md:inline">·</span>
                <span className="md:hidden">•</span>
                <span>Western</span>
                <span className="hidden md:inline">·</span>
                <span className="md:hidden">•</span>
                <span>Broast</span>
              </div>
              <h1 className="text-xl md:text-4xl font-bold text-gray-900 text-center md:text-left">
                {name}
              </h1>
              
              {/* Mobile Rating */}
              <div className="md:hidden flex items-center justify-center mt-2 text-sm">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">4.9/5</span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <button 
                  className="text-gray-500"
                  onClick={onMoreInfoClick}
                >
                  See reviews
                </button>
              </div>
            </div>

            <div className="flex-col md:flex-row items-center justify-between pb-1 mt-4 md:mt-0 gap-4 md:gap-0 hidden md:flex">
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <button 
                  className="text-gray-500 hover:text-gray-700 flex items-center gap-1 md:gap-2 text-xs md:text-sm"
                  onClick={onMoreInfoClick}
                >
                  <Info className="w-4 h-4 md:w-5 md:h-5" />
                  More info
                </button>
                <a
                  href="tel:051111532532"
                  className="flex items-center gap-1 md:gap-2 text-gray-500 px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-[#E4002B] hover:text-white transition-all duration-300 text-xs md:text-sm"
                >
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">Call Now</span>
                </a>
              </div>
              <button 
                className={`text-gray-400 hover:text-red-500 transition-colors`}
                onClick={handleFavoriteClick}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Actions */}
        <div className="md:hidden mt-4 flex flex-col gap-3">
          <div className="flex justify-between">
            <button 
              className="text-gray-500 hover:text-gray-700 flex items-center gap-2 text-xs py-2"
              onClick={onMoreInfoClick}
            >
              <Info className="w-4 h-4" />
              More info
            </button>
            <button 
              onClick={handleFavoriteClick}
              className="flex items-center gap-1 text-gray-500 py-2"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
              <span>Add to favourites</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHero;

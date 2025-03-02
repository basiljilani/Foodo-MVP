import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isRecommended?: boolean;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  id,
  name,
  description,
  price,
  image,
  isRecommended,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`bg-white rounded-lg p-4 flex justify-between gap-4 border border-gray-100 hover:shadow-sm transition-shadow ${className}`}
    >
      <div className="flex-grow">
        <div className="flex flex-col mb-2">
          <h3 className="text-base font-medium text-gray-900">{name}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-red-500">from Rs. {price}</span>
            {isRecommended && (
              <span className="text-xs text-gray-500 line-through">Rs. {Math.round(price * 1.2)}</span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        {isRecommended && (
          <span className="inline-block mt-2 text-xs text-red-500">Popular</span>
        )}
      </div>
      <div className="relative flex-shrink-0">
        {image && (
          <div className="w-24 h-24 rounded-lg overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <button 
          className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-colors"
          aria-label="Add to cart"
        >
          <Plus className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </motion.div>
  );
};

export default MenuItem;

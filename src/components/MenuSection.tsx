import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuItem from './MenuItem';

interface MenuSectionProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  menuItems: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    preparationTime?: number;
    isVegetarian?: boolean;
    isVegan?: boolean;
    isRecommended?: boolean;
  }>;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  searchQuery,
  onSearchChange,
  menuItems
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Search and Categories */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <MenuItem
                key={item.id}
                {...item}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No menu items found. Try adjusting your filters or search query.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MenuSection;

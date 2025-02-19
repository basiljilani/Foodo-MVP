import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Star, Clock, DollarSign, Filter, Search } from 'lucide-react';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function FilterSidebar({ onFilterChange, searchQuery, onSearchChange }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [deliveryTime, setDeliveryTime] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(['search', 'categories', 'price', 'rating', 'delivery']);

  const categories = [
    { id: 'pizza', name: 'Pizza', count: 45 },
    { id: 'burger', name: 'Burgers', count: 32 },
    { id: 'sushi', name: 'Sushi', count: 28 },
    { id: 'indian', name: 'Indian', count: 36 },
    { id: 'chinese', name: 'Chinese', count: 41 },
    { id: 'italian', name: 'Italian', count: 25 },
    { id: 'mexican', name: 'Mexican', count: 22 },
    { id: 'dessert', name: 'Desserts', count: 19 },
    { id: 'healthy', name: 'Healthy', count: 31 },
  ];

  const prices = [
    { id: 'inexpensive', label: 'Inexpensive', symbol: '$' },
    { id: 'moderate', label: 'Moderate', symbol: '$$' },
    { id: 'expensive', label: 'Expensive', symbol: '$$$' },
    { id: 'very_expensive', label: 'Very Expensive', symbol: '$$$$' },
  ];

  const deliveryTimes = [
    { id: '15', label: 'Under 15 mins' },
    { id: '30', label: 'Under 30 mins' },
    { id: '45', label: 'Under 45 mins' },
    { id: '60', label: 'Under 60 mins' },
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const togglePrice = (priceId: string) => {
    setPriceRange(prev =>
      prev.includes(priceId)
        ? prev.filter(id => id !== priceId)
        : [...prev, priceId]
    );
  };

  const handleRatingChange = (value: number) => {
    setRating(rating === value ? null : value);
  };

  const handleDeliveryTimeChange = (timeId: string) => {
    setDeliveryTime(deliveryTime === timeId ? null : timeId);
  };

  // Update parent component with filter changes
  React.useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      priceRange,
      rating,
      deliveryTime
    });
  }, [selectedCategories, priceRange, rating, deliveryTime, onFilterChange]);

  const FilterSection = ({ 
    title, 
    id, 
    children 
  }: { 
    title: string; 
    id: string; 
    children: React.ReactNode 
  }) => {
    const isExpanded = expandedSections.includes(id);
    return (
      <div className="border-b border-gray-200 py-4">
        <button
          onClick={() => toggleSection(id)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-medium text-gray-900">{title}</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        {isExpanded && <div className="mt-4">{children}</div>}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="h-5 w-5 text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="block w-full pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      <FilterSection title="Categories" id="categories">
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category.id} className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">
                  {category.name}
                </span>
              </div>
              <span className="text-xs text-gray-400">({category.count})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range" id="price">
        <div className="space-y-2">
          {prices.map(price => (
            <label key={price.id} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                checked={priceRange.includes(price.id)}
                onChange={() => togglePrice(price.id)}
                className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">
                {price.symbol} • {price.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Rating" id="rating">
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(value => (
            <button
              key={value}
              onClick={() => handleRatingChange(value)}
              className={`flex items-center w-full px-2 py-1 rounded ${
                rating === value ? 'bg-red-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                {[...Array(value)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      rating === value ? 'text-red-500' : 'text-gray-400'
                    }`}
                    fill={rating === value ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">& Up</span>
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Delivery Time" id="delivery">
        <div className="space-y-2">
          {deliveryTimes.map(time => (
            <button
              key={time.id}
              onClick={() => handleDeliveryTimeChange(time.id)}
              className={`flex items-center w-full px-2 py-1 rounded ${
                deliveryTime === time.id ? 'bg-red-50 text-red-500' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Clock className={`h-4 w-4 ${
                deliveryTime === time.id ? 'text-red-500' : 'text-gray-400'
              }`} />
              <span className="ml-2 text-sm">{time.label}</span>
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Info, Clock, Heart, ChevronRight, Search, ChevronLeft, Plus } from 'lucide-react';
import Layout from '../../components/Layout';
import RestaurantAds from '../../components/RestaurantAds';
import { useRestaurantData } from '../../hooks/useRestaurantData';

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  
  const { 
    restaurant, 
    menuItems, 
    selectedCategory,
    setSelectedCategory,
    isLoading, 
    error 
  } = useRestaurantData(id || '');

  const filteredItems = menuItems.filter((item) => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const checkScroll = () => {
    if (categoriesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (categoriesRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      categoriesRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        </div>
      </Layout>
    );
  }

  if (error || !restaurant) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {error || 'Restaurant not found'}
          </h2>
          <button
            onClick={() => navigate('/home')}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Go back home
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/home" className="hover:text-gray-900">Islamabad</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/home" className="hover:text-gray-900">Restaurant List</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{restaurant.name}</span>
        </nav>

        {/* Restaurant Header */}
        <div className="flex gap-6 mb-6">
          <div className="w-[160px] h-[160px] bg-[#E4002B] rounded-lg flex items-center justify-center p-6">
            <img
              src={restaurant.logo}
              alt={restaurant.name}
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>
          <div className="flex-1 pt-2">
            <div className="text-gray-600 text-sm mb-1">
              Burgers · Fast Food · Western · Broast
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {restaurant.name}
            </h1>
            <div className="flex items-center gap-6 text-gray-700">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Rs. {restaurant.deliveryFee} delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                <span>Min. order Rs. {restaurant.minimumOrder}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-medium">{restaurant.rating}/5</span>
                <span className="ml-1 text-gray-500">({restaurant.reviewsCount}+)</span>
              </div>
              <button className="text-blue-600 hover:text-blue-700">
                See reviews
              </button>
              <button className="text-gray-700 hover:text-gray-900">
                More info
              </button>
              <button className="ml-auto text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Menu Categories */}
        <div className="border-t border-b border-gray-200 mb-6">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center relative" style={{ maxWidth: 'calc(100% - 232px)' }}>
              <button
                onClick={() => scroll('left')}
                className={`absolute left-0 z-10 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] rounded-full p-1.5 transition-all ${
                  showLeftScroll ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none -translate-x-4'
                }`}
                style={{ transform: 'translateX(-50%)' }}
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div 
                ref={categoriesRef}
                className="flex items-center gap-1 overflow-x-auto no-scrollbar px-5"
                onScroll={checkScroll}
              >
                {restaurant.menuCategories.map((category) => {
                  const count = restaurant.menuItems[category]?.length || 0;
                  return (
                    <button
                      key={category}
                      className={`px-4 py-2 whitespace-nowrap text-sm font-medium rounded-full transition-colors flex-shrink-0 ${
                        selectedCategory === category
                          ? 'bg-red-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => scroll('right')}
                className={`absolute right-0 z-10 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] rounded-full p-1.5 transition-all ${
                  showRightScroll ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none translate-x-4'
                }`}
                style={{ transform: 'translateX(50%)' }}
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex-shrink-0 relative ml-4">
              <input
                type="text"
                placeholder="Search menu"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 w-[200px]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Menu and Ads Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Menu Items */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col bg-white rounded-lg border border-gray-200 p-4 hover:border-red-100 hover:shadow-sm transition-all"
              >
                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {item.price.toString().startsWith('from') ? item.price : `Rs. ${item.price}`}
                    </p>
                    <button
                      className="rounded-full p-2 text-red-500 hover:bg-red-50 transition-colors"
                      onClick={() => {/* Add to cart logic */}}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ads and Campaign Section */}
          <div className="space-y-6">
            {/* Ads Section */}
            <div className="h-[280px]">
              <RestaurantAds />
            </div>

            {/* Campaign Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-green-800">Save Trees, Go Digital</h3>
                  <p className="mt-1 text-sm text-green-600">
                    We've gone paperless! Your digital receipt helps save trees. Together we can make a difference.
                  </p>
                  <button className="mt-3 text-sm font-medium text-green-700 hover:text-green-800 flex items-center space-x-1">
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

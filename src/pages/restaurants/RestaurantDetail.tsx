import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Search,
  ChevronLeft,
  ChevronRight,
  Heart,
  X,
  Plus,
  Info,
  Sparkles,
  Clock as ClockIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/Layout';
import RestaurantHero from '../../components/RestaurantHero';
import RestaurantAdCarousel from '../../components/RestaurantAdCarousel';
import CampaignCard from '../../components/CampaignCard';
import { useRestaurantData } from '../../hooks/useRestaurantData';
import Breadcrumb from '../../components/Breadcrumb';
import * as LucideIcons from 'lucide-react';

const RestaurantDetail = () => {
  // 1. All useState hooks first
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [showCallButton, setShowCallButton] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 2. useRef hooks
  const categoriesRef = useRef<HTMLDivElement>(null);

  // 3. Route params
  const { id } = useParams();
  const navigate = useNavigate();

  // 4. Custom hooks
  const { restaurant, menuItems: dynamicMenuItems, ads, isLoading, error } = useRestaurantData(id || '');

  // 5. useEffect hooks
  useEffect(() => {
    const handleScroll = () => {
      if (categoriesRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    const currentRef = categoriesRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoading && !restaurant) {
      navigate('/restaurants');  // Redirect to restaurants list if not found
    }
  }, [isLoading, restaurant, navigate]);

  // 6. useMemo hooks
  const filteredMenuItems = useMemo(() => {
    if (!dynamicMenuItems) return [];
    return dynamicMenuItems.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [dynamicMenuItems, selectedCategory, searchQuery]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  if (error || !restaurant) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Restaurant Not Found</h1>
          <p className="text-gray-600 mb-6">The restaurant you're looking for doesn't exist or there was an error loading it.</p>
          <button 
            onClick={() => navigate('/restaurants')}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            View All Restaurants
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb
              items={[
                { label: 'Islamabad', link: '/' },
                { label: 'Restaurants', link: '/restaurants' },
                { label: restaurant.name }
              ]}
            />
          </div>
        </div>

        <RestaurantHero
          name={restaurant.name}
          cuisine={restaurant.category}
          rating={restaurant.rating}
          totalReviews={150}
          isTopRestaurant={restaurant.settings?.is_featured}
          deliveryFee={restaurant.settings?.delivery_fee || 0}
          minOrder={restaurant.settings?.minimum_order || 0}
          image={restaurant.image}
          restaurant={restaurant}
        />

        {/* Menu Categories */}
        <div className="sticky top-14 bg-white border-b border-gray-100 z-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex-1 flex items-center gap-3 overflow-x-auto no-scrollbar" ref={categoriesRef}>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`
                    whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium transition-all
                    ${selectedCategory === 'All'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }
                  `}
                >
                  All
                </button>
                {restaurant.menu_categories?.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`
                      whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium transition-all
                      ${selectedCategory === category.name
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }
                    `}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Search Box - Desktop */}
              <div className="hidden md:flex items-center gap-2 ml-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search menu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[200px] pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] placeholder:text-gray-400 focus:outline-none focus:border-gray-300"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Search Button - Mobile */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="md:hidden ml-3 text-gray-700"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Menu Items - Takes up 2 columns on desktop */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMenuItems.map((item, index) => (
                  <div key={item.id || index} className="bg-white rounded-lg border border-gray-100 p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-[17px] font-medium mb-1">{item.name}</h3>
                        <p className="text-[15px] text-gray-600 mb-1">from Rs. {item.price}</p>
                        <p className="text-[13px] text-gray-500">{item.description}</p>
                      </div>
                      <div className="relative ml-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-[100px] h-[100px] rounded-lg object-cover"
                        />
                        <button className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50">
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Ads and Campaign */}
            <div className="lg:w-[420px] space-y-8">
              {/* Promotions */}
              {ads && ads.length > 0 && (
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
                  {/* Ad Carousel */}
                  <div className="relative">
                    <RestaurantAdCarousel ads={ads} />
                    
                    {/* Offer Count Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-xs font-medium text-white">
                          {ads.length} {ads.length === 1 ? 'Offer' : 'Offers'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <ClockIcon className="w-3.5 h-3.5" />
                        <span>Limited time offers</span>
                      </div>
                      <button 
                        className="text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors"
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          navigate(`/offers?restaurant=${id}`);
                        }}
                      >
                        View All →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tree Plantation Campaign */}
              <div className="h-full">
                <CampaignCard 
                  onDonate={() => {
                    // Handle donation logic
                    console.log('Donation clicked');
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search Modal */}
        <AnimatePresence>
          {isSearchModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-50"
            >
              <motion.div 
                initial={{ translateY: "100%" }}
                animate={{ translateY: 0 }}
                exit={{ translateY: "100%" }}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <button onClick={() => setIsSearchModalOpen(false)}>
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-[15px] placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default RestaurantDetail;

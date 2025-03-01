import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Plus, Sparkles, Clock } from 'lucide-react';

// Components
import Layout from '../../components/Layout';
import RestaurantHero from '../../components/RestaurantHero';
import RestaurantAdCarousel from '../../components/RestaurantAdCarousel';
import CampaignCard from '../../components/CampaignCard';
import RestaurantInfoModal from '../../components/RestaurantInfoModal';

// Hooks
import { useRestaurantData } from '../../hooks/useRestaurantData';

import { supabase } from '../../lib/supabase';

const RestaurantDetail = () => {
  // 1. All hooks at the top level
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [ads, setAds] = useState<any[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 2. Fetch restaurant data
  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Get all rows for this restaurant
        const { data: allRows, error: rowsError } = await supabase
          .from('unified_restaurants')
          .select('*')
          .eq('restaurant_id', parseInt(id));

        if (rowsError) throw rowsError;
        if (!allRows || allRows.length === 0) throw new Error('Restaurant not found');

        // The first row contains all the restaurant details
        const restaurantDetails = allRows[0];

        // Fetch ads separately with correct column names
        const { data: restaurantAds, error: adsError } = await supabase
          .from('unified_restaurants')
          .select(`
            ad_title,
            ad_description,
            ad_image_url,
            ad_link_url,
            ad_start_date,
            ad_end_date,
            ad_is_active,
            ad_display_order
          `)
          .eq('restaurant_id', parseInt(id))
          .eq('ad_is_active', true)
          .order('ad_display_order', { ascending: true });

        if (!adsError && restaurantAds) {
          // Transform the ads data to match the expected format
          const formattedAds = restaurantAds.map(ad => ({
            title: ad.ad_title,
            description: ad.ad_description,
            imageUrl: ad.ad_image_url,
            linkUrl: ad.ad_link_url,
            startDate: ad.ad_start_date,
            endDate: ad.ad_end_date,
            isActive: ad.ad_is_active,
            displayOrder: ad.ad_display_order
          })).filter(ad => ad.title && ad.imageUrl); // Only include ads with title and image

          setAds(formattedAds);
        } else {
          console.error('Error fetching ads:', adsError);
          setAds([]);
        }

        // Group menu items by category
        const menuByCategory = allRows.reduce((acc: any, row: any) => {
          if (row.category_name && row.item_name) {
            if (!acc[row.category_name]) {
              acc[row.category_name] = [];
            }
            acc[row.category_name].push({
              id: row.id,
              name: row.item_name,
              description: row.item_description,
              price: row.item_price,
              image: row.item_image,
              isAvailable: row.item_is_available,
              preparationTime: row.item_preparation_time,
              allergens: row.item_allergens,
              spicyLevel: row.item_spicy_level,
              isVegetarian: row.item_is_vegetarian,
              isVegan: row.item_is_vegan,
              isRecommended: row.item_is_recommended,
              category: row.category_name,
              categoryDisplayOrder: row.category_display_order
            });
          }
          return acc;
        }, {});

        // Sort categories by display order
        const sortedCategories = Object.keys(menuByCategory).sort((a, b) => {
          const orderA = menuByCategory[a][0]?.categoryDisplayOrder || 0;
          const orderB = menuByCategory[b][0]?.categoryDisplayOrder || 0;
          return orderA - orderB;
        });

        // Combine restaurant details with menu items
        setRestaurant({
          id: restaurantDetails.restaurant_id,
          name: restaurantDetails.restaurant_name,
          description: restaurantDetails.restaurant_description,
          image: restaurantDetails.restaurant_image,
          bannerImage: restaurantDetails.restaurant_banner_image,
          logo: restaurantDetails.restaurant_logo,
          themeColor: restaurantDetails.restaurant_theme_color,
          address: restaurantDetails.restaurant_address,
          city: restaurantDetails.restaurant_city,
          latitude: restaurantDetails.restaurant_latitude,
          longitude: restaurantDetails.restaurant_longitude,
          phone: restaurantDetails.restaurant_phone,
          email: restaurantDetails.restaurant_email,
          website: restaurantDetails.restaurant_website,
          deliveryRadius: restaurantDetails.restaurant_delivery_radius,
          instagramLink: restaurantDetails.instagram_link,
          facebookLink: restaurantDetails.facebook_link,
          whatsappNumber: restaurantDetails.whatsapp_number,
          openingHours: restaurantDetails.opening_hours,
          deliveryTime: restaurantDetails.delivery_time,
          minimumOrder: restaurantDetails.minimum_order,
          deliveryFee: restaurantDetails.delivery_fee,
          priceRange: restaurantDetails.price_range,
          estimatedDeliveryTime: restaurantDetails.estimated_delivery_time,
          acceptsOnlinePayment: restaurantDetails.accepts_online_payment,
          isFeatured: restaurantDetails.is_featured,
          isTopRestaurant: restaurantDetails.is_top_restaurant,
          hasHappyHours: restaurantDetails.has_happy_hours,
          isOpen: restaurantDetails.is_open,
          autoAcceptOrders: restaurantDetails.auto_accept_orders,
          categories: restaurantDetails.restaurant_categories,
          tags: restaurantDetails.restaurant_tags,
          menuItems: menuByCategory,
          menuCategories: sortedCategories,
          atmosphere: restaurantDetails.atmosphere || 'Elegant Dining',
          cuisine: restaurantDetails.cuisine || 'Fine Dining',
          dressCode: 'Smart Casual',
          parking: 'Available',
          alcohol: 'Full Bar',
          features: [],
          additionalInfo: ''
        });

        // Get restaurant info features
        const { data: infoFeatures, error: featuresError } = await supabase
          .from('unified_restaurants')
          .select('info_title, info_description, info_icon')
          .eq('restaurant_id', parseInt(id))
          .not('info_title', 'is', null);

        if (!featuresError && infoFeatures) {
          const formattedFeatures = infoFeatures
            .filter(feature => feature.info_title && feature.info_description)
            .map(feature => ({
              title: feature.info_title,
              description: feature.info_description,
              icon: feature.info_icon
            }));

          setRestaurant(prevState => ({
            ...prevState,
            features: formattedFeatures,
            atmosphere: formattedFeatures.find(f => f.title === 'Ambiance')?.description || 'Elegant Dining',
            additionalInfo: formattedFeatures
              .filter(f => !['Ambiance'].includes(f.title))
              .map(f => `${f.title}: ${f.description}`)
              .join('\n')
          }));
        }

        setError(null);
      } catch (err: any) {
        console.error('Error fetching restaurant:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  // 3. Render loading state
  if (loading) {
    return (
      <Layout>
        <div className="animate-pulse">
          <div className="h-[320px] bg-gray-200" />
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="h-8 bg-gray-200 w-1/3 mb-4" />
            <div className="h-4 bg-gray-200 w-1/4" />
          </div>
        </div>
      </Layout>
    );
  }

  // 4. Render error state
  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Back to Home
          </button>
        </div>
      </Layout>
    );
  }

  // 5. Render not found state
  if (!restaurant) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Restaurant Not Found</h2>
          <p className="text-gray-600 mb-4">The restaurant you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Back to Home
          </button>
        </div>
      </Layout>
    );
  }

  // 6. Render restaurant detail page
  return (
    <Layout>
      <RestaurantInfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        restaurant={restaurant}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Restaurant Hero Section */}
        <RestaurantHero
          name={restaurant.name}
          cuisine={restaurant.cuisine || 'Fine Dining'}
          isTopRestaurant={restaurant.isTopRestaurant}
          deliveryFee={restaurant.deliveryFee}
          minOrder={restaurant.minimumOrder}
          restaurant={{
            ...restaurant,
            image: restaurant.image || restaurant.logo // Use logo as fallback
          }}
          onMoreInfoClick={() => setShowInfoModal(true)}
        />

        {/* Menu Categories */}
        <div className="sticky top-14 bg-white border-b border-gray-100 z-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex-1 flex items-center gap-3 overflow-x-auto no-scrollbar" ref={menuRef}>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`
                    whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium transition-all flex items-center gap-2
                    ${selectedCategory === 'All'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }
                  `}
                >
                  <span>All</span>
                  <span className="px-1.5 py-0.5 bg-white/20 rounded text-[11px]">
                    {Object.keys(restaurant.menuItems).length}
                  </span>
                </button>
                {restaurant.menuCategories?.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium transition-all flex items-center gap-2
                      ${selectedCategory === category
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }
                    `}
                  >
                    <span>{category}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[11px] ${
                      selectedCategory === category ? 'bg-white/20' : 'bg-gray-200'
                    }`}>
                      {restaurant.menuItems[category].length}
                    </span>
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
                onClick={() => setShowSearch(true)}
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
              {/* Featured Items Section */}
              {selectedCategory === 'All' && !searchQuery && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Featured Items</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.values(restaurant.menuItems).flat().slice(0, 3).map((item, index) => (
                      <div 
                        key={item.id || index} 
                        className="bg-white rounded-lg border border-gray-100 p-4 relative overflow-hidden"
                      >
                        <div className="absolute top-4 right-4 px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                          Featured
                        </div>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-[17px] font-medium mb-1">{item.name}</h3>
                            <p className="text-[15px] text-gray-600 mb-1">Rs. {item.price}</p>
                            <p className="text-[13px] text-gray-500 line-clamp-2">{item.description}</p>
                          </div>
                          <div className="relative ml-4">
                            <img 
                              src={item.image || 'https://placehold.co/100x100?text=No+Image'} 
                              alt={item.name} 
                              className="w-[100px] h-[100px] rounded-lg object-cover"
                            />
                            <button 
                              className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-primary text-white shadow-md flex items-center justify-center hover:bg-primary/90 transition-colors"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Menu Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(restaurant.menuItems).flat().filter(item => {
                  const matchesCategory = selectedCategory === 'All' || item.category_name === selectedCategory;
                  const matchesSearch = !searchQuery || 
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchQuery.toLowerCase());
                  return matchesCategory && matchesSearch;
                }).length === 0 ? (
                  <div className="col-span-2 py-12 text-center">
                    <p className="text-gray-500">No menu items found{searchQuery ? ' matching your search' : ''}</p>
                  </div>
                ) : (
                  Object.values(restaurant.menuItems).flat().filter(item => {
                    const matchesCategory = selectedCategory === 'All' || item.category_name === selectedCategory;
                    const matchesSearch = !searchQuery || 
                      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.description.toLowerCase().includes(searchQuery.toLowerCase());
                    return matchesCategory && matchesSearch;
                  }).map((item, index) => (
                    <div 
                      key={item.id || index} 
                      className="bg-white rounded-lg border border-gray-100 p-4 hover:border-gray-200 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-[17px] font-medium mb-1">{item.name}</h3>
                          <p className="text-[15px] text-gray-600 mb-1">Rs. {item.price}</p>
                          <p className="text-[13px] text-gray-500 line-clamp-2">{item.description}</p>
                        </div>
                        <div className="relative ml-4">
                          <img 
                            src={item.image || 'https://placehold.co/100x100?text=No+Image'} 
                            alt={item.name} 
                            className="w-[100px] h-[100px] rounded-lg object-cover"
                          />
                          <button 
                            className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-primary text-white shadow-md flex items-center justify-center hover:bg-primary/90 transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Column - Ads and Campaign */}
            <div className="lg:w-[420px] space-y-8">
              {/* Promotions */}
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
                      <Clock className="w-3.5 h-3.5" />
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
          {showSearch && (
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
                  <button onClick={() => setShowSearch(false)}>
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

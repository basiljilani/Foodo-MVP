import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Tag, Clock, Percent, Gift, Menu, X, ChevronRight, Star, Copy, Check, Timer, Zap, Award, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Navigation from '../components/Navigation';
import Layout from '../components/Layout';

export default function Offers() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const navigate = useNavigate();

  const filters = [
    { id: 'all', label: 'All Offers', icon: Tag },
    { id: 'featured', label: 'Featured', icon: Star },
    { id: 'new_user', label: 'New User', icon: User },
    { id: 'flash_deals', label: 'Flash Deals', icon: Zap },
    { id: 'weekend', label: 'Weekend', icon: Gift },
    { id: 'partnerships', label: 'Partnerships', icon: Award },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
  ];

  const promotions = [
    {
      id: 1,
      title: "First Order Special",
      description: "Get 50% off on your first order! Limited time offer for new customers.",
      code: "WELCOME50",
      discount: "50% OFF",
      validUntil: "2024-04-30",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      type: "new_user",
      featured: true,
      partnerLogo: null,
      usageCount: 15000
    },
    {
      id: 2,
      title: "McDonald's × Foodo Special",
      description: "Exclusive 30% off on all McDonald's orders. Partner offer!",
      code: "MCFOODO30",
      discount: "30% OFF",
      validUntil: "2024-03-31",
      image: "https://images.unsplash.com/photo-1619881589176-57d9c5e23d30",
      type: "partnerships",
      featured: true,
      partnerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/2339px-McDonald%27s_Golden_Arches.svg.png",
      usageCount: 8500
    },
    {
      id: 3,
      title: "Flash Deal: Lunch Special",
      description: "40% off on lunch orders between 1 PM - 3 PM today only!",
      code: "LUNCH40",
      discount: "40% OFF",
      validUntil: "Today 3 PM",
      image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92",
      type: "flash_deals",
      featured: true,
      partnerLogo: null,
      usageCount: 3200,
      timeLeft: "2h 30m"
    },
    {
      id: 4,
      title: "Weekend Feast",
      description: "Extra 25% off on family-size orders during weekends",
      code: "WEEKEND25",
      discount: "25% OFF",
      validUntil: "2024-03-31",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
      type: "weekend",
      featured: false,
      partnerLogo: null,
      usageCount: 6700
    },
    {
      id: 5,
      title: "KFC Tuesday Special",
      description: "Buy 1 Get 1 Free on all KFC Chicken Buckets every Tuesday",
      code: "KFCBOGO",
      discount: "BOGO",
      validUntil: "2024-04-30",
      image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb",
      type: "partnerships",
      featured: true,
      partnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png",
      usageCount: 12300
    },
    {
      id: 6,
      title: "Trending: Free Delivery",
      description: "Free delivery on your first 3 orders of the month",
      code: "FREEDEL",
      discount: "FREE DELIVERY",
      validUntil: "2024-03-31",
      image: "https://images.unsplash.com/photo-1629905679177-4c4e2623654f",
      type: "trending",
      featured: false,
      partnerLogo: null,
      usageCount: 25400
    }
  ];

  const ads = [
    {
      id: 1,
      title: "Premium Partner",
      name: "Sushi Master",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
      description: "Experience authentic Japanese cuisine",
      rating: 4.9,
      discount: "20% OFF",
      deliveryTime: "25-35 min",
      minOrder: 30
    },
    {
      id: 2,
      title: "Trending Now",
      name: "Burger House",
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      description: "Gourmet burgers made with premium ingredients",
      rating: 4.8,
      discount: "Free Delivery",
      deliveryTime: "20-30 min",
      minOrder: 25
    },
    {
      id: 3,
      title: "New on Foodo",
      name: "Pizza Palace",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      description: "Authentic Italian pizzas and pasta",
      rating: 4.7,
      discount: "15% OFF",
      deliveryTime: "30-40 min",
      minOrder: 20
    }
  ];

  const trendingDishes = [
    {
      id: 1,
      name: "Dragon Roll",
      restaurant: "Sushi Master",
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae",
      price: 16.99,
      rating: 4.8
    },
    {
      id: 2,
      name: "Truffle Burger",
      restaurant: "Burger House",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      price: 14.99,
      rating: 4.9
    },
    {
      id: 3,
      name: "Margherita Pizza",
      restaurant: "Pizza Palace",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      price: 12.99,
      rating: 4.7
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success('Promo code copied!');
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Successfully subscribed to offers!');
    setIsSubscribing(false);
    setEmail('');
  };

  const filteredPromotions = promotions.filter(promo => 
    selectedFilter === 'all' ? true : promo.type === selectedFilter
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Exclusive Offers & Deals</h1>
              <p className="text-xl opacity-90 mb-8">Discover amazing discounts and partner offers!</p>
              
              {/* Newsletter Subscription */}
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for exclusive offers"
                    className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-75"
                  >
                    {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className={`grid gap-6 mt-8 ${selectedFilter === 'all' ? 'lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
            {/* Promotions Grid - Takes 2 columns in 'all' view */}
            <div className={`${selectedFilter === 'all' ? 'lg:col-span-2' : ''} grid grid-cols-1 md:grid-cols-2 gap-6`}>
              {filteredPromotions.map((promo) => (
                <motion.div
                  key={promo.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Image Container */}
                  <div className="relative h-48">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-full object-cover"
                    />
                    {promo.featured && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Featured
                      </div>
                    )}
                    {promo.type === 'flash_deals' && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Timer className="w-4 h-4" />
                        {promo.timeLeft}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{promo.title}</h3>
                        <p className="text-gray-600">{promo.description}</p>
                      </div>
                      {promo.partnerLogo && (
                        <img
                          src={promo.partnerLogo}
                          alt="Partner logo"
                          className="w-12 h-12 object-contain"
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {promo.discount}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Valid until {promo.validUntil}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {promo.usageCount.toLocaleString()}+ used
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-50 rounded-lg px-4 py-2 font-mono text-gray-900">
                        {promo.code}
                      </div>
                      <button
                        onClick={() => handleCopyCode(promo.code)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        {copiedCode === promo.code ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Ads Column - Only visible in 'all' view */}
            {selectedFilter === 'all' && (
              <div className="space-y-6">
                {/* Featured Restaurants */}
                {ads.map((ad) => (
                  <div key={ad.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all relative">
                    <div className="absolute right-0 top-0 bg-gray-900/90 text-white text-xs px-2 py-1 rounded-bl-lg z-10">
                      Ad
                    </div>
                    <div className="relative h-48">
                      <img
                        src={ad.image}
                        alt={ad.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-900">{ad.rating}</span>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                          {ad.discount}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-red-500 font-medium">{ad.title}</span>
                        <span className="text-sm text-gray-500">{ad.deliveryTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{ad.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{ad.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Min. Order: ${ad.minOrder}</span>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                          Order Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Trending Dishes */}
                <div className="bg-gray-900 rounded-xl p-6 relative">
                  <div className="absolute right-0 top-0 bg-white/90 text-gray-900 text-xs px-2 py-1 rounded-bl-lg">
                    Ad
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    🔥 Trending Dishes
                  </h3>
                  <div className="space-y-4">
                    {trendingDishes.map((dish) => (
                      <div key={dish.id} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{dish.name}</h4>
                          <p className="text-sm text-gray-400">{dish.restaurant}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-400 ml-1">{dish.rating}</span>
                          </div>
                        </div>
                        <span className="text-green-400">${dish.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
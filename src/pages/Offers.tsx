import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Tag, Clock, Percent, Gift, Menu, X, ChevronRight, Star, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Navigation from '../components/Navigation';

export default function Offers() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const navigate = useNavigate();

  const filters = [
    { id: 'all', label: 'All Offers' },
    { id: 'new_user', label: 'New User' },
    { id: 'weekend', label: 'Weekend' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'time_based', label: 'Time-based' },
  ];

  const promotions = [
    {
      id: 1,
      title: "First Order Special",
      description: "Get 50% off on your first order! Use code WELCOME50",
      code: "WELCOME50",
      discount: "50% OFF",
      validUntil: "2024-04-30",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      type: "new_user",
      featured: true
    },
    {
      id: 2,
      title: "Weekend Feast",
      description: "20% off on all orders above $30 during weekends",
      code: "WEEKEND20",
      discount: "20% OFF",
      validUntil: "2024-03-31",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
      type: "weekend"
    },
    {
      id: 3,
      title: "Free Delivery",
      description: "Free delivery on orders above $25",
      code: "FREEDEL",
      discount: "Free Delivery",
      validUntil: "2024-04-15",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2",
      type: "delivery"
    },
    {
      id: 4,
      title: "Lunch Special",
      description: "15% off on all lunch orders between 11 AM - 3 PM",
      code: "LUNCH15",
      discount: "15% OFF",
      validUntil: "2024-05-31",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      type: "time_based"
    },
    {
      id: 5,
      title: "Family Bundle",
      description: "25% off on family-size orders over $50",
      code: "FAMILY25",
      discount: "25% OFF",
      validUntil: "2024-04-20",
      image: "https://images.unsplash.com/photo-1516684732162-798a0062be99",
      type: "special"
    },
    {
      id: 6,
      title: "Healthy Choice",
      description: "10% off on all salads and healthy bowls",
      code: "HEALTHY10",
      discount: "10% OFF",
      validUntil: "2024-04-25",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      type: "special"
    },
    {
      id: 7,
      title: "Late Night Deal",
      description: "30% off on orders after 10 PM",
      code: "NIGHT30",
      discount: "30% OFF",
      validUntil: "2024-04-30",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      type: "time_based"
    },
    {
      id: 8,
      title: "Student Special",
      description: "15% off with valid student ID",
      code: "STUDENT15",
      discount: "15% OFF",
      validUntil: "2024-05-31",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
      type: "special"
    }
  ];

  const ads = [
    {
      id: 1,
      title: "Premium Restaurant Partner",
      name: "Sushi Master",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
      description: "Experience authentic Japanese cuisine",
      tag: "Featured Partner",
      discount: "20% OFF",
      minOrder: 30
    },
    {
      id: 2,
      title: "Most Popular This Week",
      name: "Burger House",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      description: "Gourmet burgers made with premium ingredients",
      tag: "Trending",
      discount: "Free Delivery",
      minOrder: 25
    },
    {
      id: 3,
      title: "New on Foodo",
      name: "Pizza Palace",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      description: "Authentic Italian pizzas and pasta",
      tag: "New",
      discount: "15% OFF",
      minOrder: 20
    }
  ];

  const popularCategories = [
    { name: "Pizza", icon: "🍕", count: 48 },
    { name: "Burger", icon: "🍔", count: 32 },
    { name: "Sushi", icon: "🍱", count: 24 },
    { name: "Dessert", icon: "🍰", count: 56 },
    { name: "Indian", icon: "🍛", count: 28 },
    { name: "Mexican", icon: "🌮", count: 35 }
  ];

  const filteredPromotions = selectedFilter === 'all'
    ? promotions
    : promotions.filter(promo => promo.type === selectedFilter);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success('Promo code copied!');
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }
    
    setIsSubscribing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Successfully subscribed to newsletter!');
    setEmail('');
    setIsSubscribing(false);
  };

  const CountdownTimer = ({ validUntil }: { validUntil: string }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
      const calculateTimeLeft = () => {
        const difference = +new Date(validUntil) - +new Date();
        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          setTimeLeft(`${days}d ${hours}h left`);
        } else {
          setTimeLeft('Expired');
        }
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000 * 60); // Update every minute

      return () => clearInterval(timer);
    }, [validUntil]);

    return (
      <span className={`text-sm ${timeLeft === 'Expired' ? 'text-red-500' : 'text-gray-500'}`}>
        {timeLeft}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hot Deals & Exclusive Offers
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Save big with our latest promotions and special discounts
          </p>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${selectedFilter === filter.id
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Offers Columns */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="wait">
              {filteredPromotions.map((promo) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all h-[400px] flex flex-col"
                >
                  <div className="relative h-48">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-2">
                        {promo.discount}
                      </div>
                      <h3 className="text-xl font-semibold text-white">{promo.title}</h3>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{promo.description}</p>
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <CountdownTimer validUntil={promo.validUntil} />
                        </div>
                        <button
                          onClick={() => copyToClipboard(promo.code)}
                          className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <span className="text-sm font-medium">{promo.code}</span>
                          {copiedCode === promo.code ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        <span>Claim Offer</span>
                        <Gift className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Ads Column */}
          <div className="space-y-6">
            {/* Featured Restaurants Section */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 h-[400px] flex flex-col">
              <h2 className="text-xl font-semibold text-white mb-4">Featured Partners</h2>
              <p className="text-red-100 mb-6">
                Discover our top-rated restaurant partners and their exclusive offers
              </p>
              <div className="grid grid-cols-3 gap-3 flex-1">
                {popularCategories.slice(0, 6).map((category) => (
                  <button
                    key={category.name}
                    className="flex flex-col items-center justify-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <span className="text-2xl mb-1">{category.icon}</span>
                    <span className="text-sm font-medium text-white">{category.name}</span>
                    <span className="text-xs text-red-200">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Restaurant Ads */}
            {ads.map((ad) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all h-[400px] flex flex-col group cursor-pointer"
              >
                <div className="relative h-48">
                  <img
                    src={ad.image}
                    alt={ad.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{ad.name}</h3>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                      {ad.tag}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{ad.description}</p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>Min. Order: ${ad.minOrder}</span>
                      <span>30-45 min</span>
                    </div>
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                      <span>View Menu</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Trending Dishes */}
            <div className="bg-gray-900 rounded-xl p-6 h-[400px] flex flex-col">
              <h3 className="text-lg font-semibold text-white mb-4">
                🔥 Trending Dishes
              </h3>
              <div className="space-y-4 flex-1">
                <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
                    alt="Pizza"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-white">Margherita Pizza</h4>
                    <p className="text-sm text-gray-400">Pizza Palace</p>
                  </div>
                  <span className="text-green-400">$12.99</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1559847844-5315695dadae"
                    alt="Sushi"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-white">Dragon Roll</h4>
                    <p className="text-sm text-gray-400">Sushi Master</p>
                  </div>
                  <span className="text-green-400">$16.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Newsletter Subscription */}
      <div className="bg-[#1B2333] py-16 mt-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Stay Updated with Latest Offers
          </h2>
          <p className="text-gray-400 mb-8">
            Subscribe to our newsletter and never miss out on exclusive deals and promotions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
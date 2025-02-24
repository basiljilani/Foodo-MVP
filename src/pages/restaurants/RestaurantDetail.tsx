import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  Bike,
  ChevronRight as ChevronRightSmall,
  X,
  Package
} from 'lucide-react';
import { ClockIcon, GiftIcon, StarIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/Layout';
import Breadcrumb from '../../components/Breadcrumb';

// Add CSS for hiding scrollbar and category animation
const customStyles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  @keyframes slideIn {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }

  .category-indicator {
    animation: slideIn 0.2s ease-out forwards;
    transform-origin: center;
  }

  .scroll-button {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease-out, visibility 0.2s ease-out, transform 0.2s ease-out;
    transform: scale(0.9);
  }

  .scroll-button.visible {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .scroll-button {
    animation: fadeIn 0.2s ease-out forwards;
  }

  .category-btn {
    position: relative;
  }

  .category-btn::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 4px;
    height: 2px;
    background-color: #dc2626;
    border-radius: 1px;
    transform: translateX(-50%) scaleX(0);
    transform-origin: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }

  .category-btn:hover::after {
    opacity: 0.5;
    width: 24px;
  }

  .category-btn.active::after {
    opacity: 1;
    width: 32px;
    transform: translateX(-50%) scaleX(1);
  }

  .search-input:focus {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .deal-card {
    animation: float 3s ease-in-out infinite;
  }

  .deal-card:hover {
    animation-play-state: paused;
  }

  .gradient-text {
    background-size: 200% auto;
    animation: shine 2s linear infinite;
  }

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

const RestaurantDetail = () => {
  const { id } = useParams();
  const restaurantId = parseInt(id || '1');

  // Sample menu items
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Chicken Biryani",
      description: "Aromatic rice cooked with tender chicken pieces and special spices",
      price: "Rs. 350",
      category: "Biryani",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8"
    },
    {
      id: 2,
      name: "Mutton Karahi",
      description: "Tender mutton cooked in a spicy tomato-based gravy",
      price: "Rs. 450",
      category: "Curries",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0"
    },
    {
      id: 3,
      name: "Seekh Kebab",
      description: "Minced meat kebabs with herbs and spices",
      price: "Rs. 300",
      category: "BBQ",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19"
    },
    {
      id: 4,
      name: "Butter Naan",
      description: "Soft bread topped with butter",
      price: "Rs. 50",
      category: "Bread",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0"
    },
    {
      id: 5,
      name: "Chicken Tikka",
      description: "Marinated and grilled chicken pieces with special spices",
      price: "Rs. 280",
      category: "BBQ",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0"
    },
    {
      id: 6,
      name: "Mutton Biryani",
      description: "Fragrant rice cooked with tender mutton and aromatic spices",
      price: "Rs. 400",
      category: "Biryani",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8"
    },
    {
      id: 7,
      name: "Chicken Malai Boti",
      description: "Creamy and tender chicken pieces marinated in malai",
      price: "Rs. 320",
      category: "BBQ",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0"
    },
    {
      id: 8,
      name: "Chicken Korma",
      description: "Rich and creamy curry with tender chicken",
      price: "Rs. 380",
      category: "Curries",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0"
    },
    {
      id: 9,
      name: "Garlic Naan",
      description: "Soft bread topped with garlic and butter",
      price: "Rs. 70",
      category: "Bread",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0"
    },
    {
      id: 10,
      name: "Gulab Jamun",
      description: "Sweet milk-solid dumplings soaked in sugar syrup",
      price: "Rs. 150",
      category: "Desserts",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0"
    },
    {
      id: 11,
      name: "Kheer",
      description: "Traditional rice pudding with nuts",
      price: "Rs. 180",
      category: "Desserts",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0"
    },
    {
      id: 12,
      name: "Chicken Soup",
      description: "Hot and sour chicken soup with vegetables",
      price: "Rs. 200",
      category: "Appetizers",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0"
    },
    {
      id: 13,
      name: "Mango Lassi",
      description: "Sweet yogurt drink with mango pulp",
      price: "Rs. 120",
      category: "Beverages",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0"
    },
    {
      id: 14,
      name: "Mint Raita",
      description: "Yogurt dip with fresh mint and spices",
      price: "Rs. 80",
      category: "Appetizers",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0"
    },
    {
      id: 15,
      name: "Sweet Lassi",
      description: "Traditional sweet yogurt drink",
      price: "Rs. 100",
      category: "Beverages",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0"
    },
    {
      id: 16,
      name: "Chicken Wings",
      description: "Spicy buffalo wings with blue cheese dip",
      price: "Rs. 420",
      category: "Starters",
      image: "https://images.unsplash.com/photo-1524114664604-cd8133a0728d"
    },
    {
      id: 17,
      name: "Fish and Chips",
      description: "Crispy fried fish with french fries",
      price: "Rs. 550",
      category: "Seafood",
      image: "https://images.unsplash.com/photo-1579208030886-b937da9925dc"
    },
    {
      id: 18,
      name: "Grilled Salmon",
      description: "Fresh salmon with herbs and lemon",
      price: "Rs. 850",
      category: "Seafood",
      image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369"
    },
    {
      id: 19,
      name: "Sushi Roll",
      description: "California roll with crab and avocado",
      price: "Rs. 600",
      category: "Japanese",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c"
    },
    {
      id: 20,
      name: "Ramen",
      description: "Japanese noodle soup with pork",
      price: "Rs. 520",
      category: "Japanese",
      image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1"
    },
    {
      id: 21,
      name: "Pad Thai",
      description: "Thai style stir-fried noodles",
      price: "Rs. 480",
      category: "Thai",
      image: "https://images.unsplash.com/photo-1559314809-0d155014e29e"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('Biryani');
  // Extract unique categories from menuItems
  const categories = useMemo(() => Array.from(new Set(menuItems.map(item => item.category))), [menuItems]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showCallButton, setShowCallButton] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter menu items based on category and search
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = item.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, selectedCategory, searchQuery]);

  // Check scroll position to show/hide arrows
  const checkScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      const canScroll = container.scrollWidth > container.clientWidth;
      const isEnd = Math.abs(container.scrollWidth - container.clientWidth - container.scrollLeft) < 1;
      setCanScrollRight(canScroll && !isEnd);
    }
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  // Handle scroll for call button
  useEffect(() => {
    const handleScroll = () => {
      setShowCallButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const restaurant = {
    name: "Karachi Biryani House",
    description: "Famous for authentic Karachi-style biryani and BBQ specialties.",
    rating: 4.8,
    reviewCount: 245,
    priceRange: "$$",
    cuisine: "Pakistani, Biryani, BBQ",
    address: "Block 2, Gulshan-e-Iqbal, Karachi",
    phone: "+92 300 8853 111",
    email: "contact@karachibiryani.com",
    openingHours: {
      Mon: "11:00 AM - 11:00 PM",
      Tue: "11:00 AM - 11:00 PM",
      Wed: "11:00 AM - 11:00 PM",
      Thu: "11:00 AM - 11:00 PM",
      Fri: "11:00 AM - 11:30 PM",
      Sat: "11:00 AM - 11:30 PM",
      Sun: "11:00 AM - 11:00 PM"
    },
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8"
  };

  return (
    <Layout>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-gray-50">
        {/* Restaurant Header */}
        <div className="bg-white pt-[42px]">
          <div className="max-w-[1280px] mx-auto px-3">
            {/* Breadcrumb with less vertical space */}
            <div className="py-2.5">
              <Breadcrumb 
                items={[
                  { label: 'Islamabad', link: '/' },
                  { label: 'Restaurant List', link: '/restaurant' },
                  { label: restaurant.name }
                ]} 
              />
            </div>

            {/* Restaurant Header */}
            <div className="flex items-start gap-4 pb-4">
              {/* Restaurant Image */}
              <div className="flex-shrink-0">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-[110px] h-[110px] object-cover rounded-lg"
                />
              </div>

              {/* Restaurant Info */}
              <div className="flex-1 pt-1">
                <div>
                  <p className="text-[15px] text-gray-600 mb-0.5">{restaurant.cuisine}</p>
                  <h1 className="text-[22px] font-bold text-gray-900 leading-tight mb-1">{restaurant.name}</h1>
                  
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center">
                      <span className="text-[15px] font-medium">{restaurant.rating}</span>
                      <span className="text-gray-500 text-[15px] ml-1">({restaurant.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-800 rounded">
                      Top restaurant
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-green-50 text-green-800 rounded">
                      Open now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Available Deals Section */}
          <div className="border-t border-gray-100">
            <div className="max-w-[1280px] mx-auto px-3 py-4">
              <h2 className="text-[17px] font-semibold text-gray-900 mb-3">Available deals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[600px]">
                {/* Limited Time Deal */}
                <div className="bg-red-50 rounded p-3">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 text-red-600 mb-1">
                        <ClockIcon className="w-3.5 h-3.5" />
                        <span className="text-[13px] font-medium">Limited time</span>
                      </div>
                      <div className="font-bold text-[15px] text-red-700">Rs. 1,000 off</div>
                      <p className="text-[13px] text-red-600 mt-0.5">Min. order Rs. 1,000. Valid for selected items.</p>
                      <div className="text-[11px] text-red-500 mt-1">Auto applied</div>
                    </div>
                  </div>
                </div>

                {/* Rewards Deal */}
                <div className="bg-[#FFF8E6] rounded p-3">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 text-[#B17D1C] mb-1">
                        <GiftIcon className="w-3.5 h-3.5" />
                        <span className="text-[13px] font-medium">Rewards</span>
                      </div>
                      <div className="font-bold text-[15px] text-[#B17D1C]">Stamp cards</div>
                      <p className="text-[13px] text-[#B17D1C] mt-0.5">Collect stamps with every order.</p>
                      <div className="text-[11px] text-[#B17D1C] mt-1">Get free items</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Filter Bar */}
          <div className="sticky top-[42px] bg-white border-b border-gray-100 z-10">
            <div className="max-w-[1280px] mx-auto px-3">
              <div className="flex items-center gap-4 relative">
                {/* Left Arrow */}
                <div className="flex-none w-8 mr-4">
                  <button
                    onClick={() => {
                      const container = scrollContainerRef.current;
                      if (container) {
                        container.scrollLeft -= 200;
                      }
                    }}
                    className={`scroll-button w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-transform hover:scale-105 ${canScrollLeft ? 'visible' : ''}`}
                    aria-label="Scroll left"
                    disabled={!canScrollLeft}
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Categories Scroll Container */}
                <div className="flex-1 overflow-hidden">
                  <div 
                    ref={scrollContainerRef}
                    className="flex py-3 overflow-x-auto no-scrollbar scroll-smooth"
                    style={{ 
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    {categories.map((category, index) => (
                      <div 
                        key={category}
                        className={`flex-none ${index > 0 ? 'ml-8' : ''}`}
                      >
                        <button
                          onClick={() => setSelectedCategory(category)}
                          className={`
                            category-btn relative whitespace-nowrap text-[15px] font-medium
                            ${selectedCategory === category ? 'text-gray-900 active' : 'text-gray-600 hover:text-gray-900'}
                          `}
                        >
                          {category}
                          <span className="ml-1.5 text-[13px] text-gray-400">
                            ({menuItems.filter(item => item.category === category).length})
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Arrow */}
                <div className="flex-none w-8 mx-4">
                  <button
                    onClick={() => {
                      const container = scrollContainerRef.current;
                      if (container) {
                        container.scrollLeft += 200;
                      }
                    }}
                    className={`scroll-button w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-transform hover:scale-105 ${canScrollRight ? 'visible' : ''}`}
                    aria-label="Scroll right"
                    disabled={!canScrollRight}
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Search - Desktop */}
                <div className="hidden md:block relative w-72 flex-shrink-0">
                  <input
                    type="text"
                    placeholder="Search in menu"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[15px] focus:outline-none focus:border-gray-300 focus:ring-0 transition-colors search-input"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* Search Icon - Mobile */}
                <button 
                  onClick={() => setShowMobileSearch(true)}
                  className="md:hidden flex-none w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Add custom styles for hiding scrollbar */}
          <style>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          {/* Mobile Search Modal */}
          {showMobileSearch && (
            <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
              <div className="bg-white w-full p-4 absolute top-0 left-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search in menu"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[15px] focus:outline-none focus:border-gray-300 focus:ring-0"
                    autoFocus
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button 
                    onClick={() => setShowMobileSearch(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Menu Title */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Our Menu</h2>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Menu Items Grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredMenuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative h-48">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                        <div className="absolute top-3 right-3">
                          <span className="bg-white/90 backdrop-blur-sm text-red-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                            {item.price}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Info Cards Column */}
              <div className="lg:col-span-1 space-y-6">
                {/* Contact Info */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-3 text-gray-400" />
                      <span>{restaurant.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-3 text-gray-400" />
                      <span>{restaurant.email}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                      <span>{restaurant.address}</span>
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    Opening Hours
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(restaurant.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600">{day}</span>
                        <span className="font-medium">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Call Button */}
          <AnimatePresence>
            {showCallButton && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="fixed bottom-0 left-0 right-0 z-50"
              >
                <div className="bg-white border-t border-gray-100 shadow-lg backdrop-blur-lg">
                  <div className="max-w-6xl mx-auto px-4 py-3">
                    <a
                      href={`tel:${restaurant.phone}`}
                      className="block w-full bg-[#FF3838] hover:bg-[#FF4D4D] text-white rounded-xl py-3.5 flex items-center justify-center space-x-2 transition-all duration-300 font-medium"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Call Restaurant</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}

export default RestaurantDetail;

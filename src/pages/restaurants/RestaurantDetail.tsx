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
  Package,
  Plus,
  SlidersHorizontal
} from 'lucide-react';
import { ClockIcon, GiftIcon, StarIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/Layout';
import Breadcrumb from '../../components/Breadcrumb';
import RestaurantHero from '../../components/RestaurantHero';

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
  const menuItems = [
    // Biryani Category
    {
      name: "Chicken Biryani",
      description: "Classic chicken biryani with basmati rice",
      price: "350",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=60",
      category: "Biryani"
    },
    {
      name: "Mutton Biryani",
      description: "Tender mutton pieces with aromatic rice",
      price: "450",
      image: "https://images.unsplash.com/photo-1589302168068-391b6a87d7b3?w=800&auto=format&fit=crop&q=60",
      category: "Biryani"
    },
    {
      name: "Beef Biryani",
      description: "Spicy beef biryani with special masala",
      price: "400",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=60",
      category: "Biryani"
    },

    // BBQ Category
    {
      name: "Chicken Tikka",
      description: "Marinated and grilled chicken pieces",
      price: "280",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop&q=60",
      category: "BBQ"
    },
    {
      name: "Malai Boti",
      description: "Creamy and tender chicken pieces",
      price: "320",
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format&fit=crop&q=60",
      category: "BBQ"
    },
    {
      name: "Reshmi Kebab",
      description: "Soft minced chicken kebabs",
      price: "300",
      image: "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=800&auto=format&fit=crop&q=60",
      category: "BBQ"
    },

    // Karahi & Curry
    {
      name: "Chicken Karahi",
      description: "Traditional chicken karahi with fresh tomatoes",
      price: "800",
      image: "https://images.unsplash.com/photo-1603496987314-62888e43f875?w=800&auto=format&fit=crop&q=60",
      category: "Karahi"
    },
    {
      name: "Mutton Karahi",
      description: "Spicy mutton karahi with special masala",
      price: "1200",
      image: "https://images.unsplash.com/photo-1605491138091-5bcfae5ad783?w=800&auto=format&fit=crop&q=60",
      category: "Karahi"
    },

    // Bread
    {
      name: "Naan",
      description: "Fresh tandoori naan",
      price: "40",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=60",
      category: "Bread"
    },
    {
      name: "Garlic Naan",
      description: "Naan topped with garlic and butter",
      price: "60",
      image: "https://images.unsplash.com/photo-1593882100739-68de1c6a3c4c?w=800&auto=format&fit=crop&q=60",
      category: "Bread"
    },

    // Drinks
    {
      name: "Soft Drinks",
      description: "Pepsi, Coke, Sprite, 7up (500ml)",
      price: "80",
      image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=800&auto=format&fit=crop&q=60",
      category: "Drinks"
    },
    {
      name: "Mineral Water",
      description: "500ml bottle",
      price: "50",
      image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?w=800&auto=format&fit=crop&q=60",
      category: "Drinks"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
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
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
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

  const categories = ['All', 'Biryani', 'BBQ', 'Karahi', 'Deals'];

  return (
    <Layout>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white">
          <div className="max-w-[1280px] mx-auto">
            <Breadcrumb
              items={[
                { label: 'Islamabad', link: '/' },
                { label: 'Restaurants', link: '/restaurants' },
                { label: 'Karachi Biryani House' }
              ]}
            />
          </div>
        </div>

        {/* Restaurant Hero Section */}
        <RestaurantHero
          name="Karachi Biryani House"
          cuisine="Pakistani, Biryani, BBQ"
          rating={4.8}
          totalReviews={500}
          isTopRestaurant={true}
          deliveryFee={149}
          minOrder={349}
          image="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2788&auto=format&fit=crop"
        />

        {/* Mobile Search Modal */}
        <AnimatePresence>
          {showMobileSearch && (
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
                  <button onClick={() => setShowMobileSearch(false)}>
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    className="flex-1 bg-transparent text-[15px] placeholder:text-gray-400 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Filter Bar */}
        <div className="sticky top-[64px] bg-white z-10 border-t border-b border-gray-100">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="flex items-center justify-between py-2">
              {/* Categories */}
              <div className="flex-1 flex items-center gap-3 overflow-x-auto no-scrollbar">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category.toLowerCase())}
                    className={`
                      whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium
                      ${selectedCategory === category.toLowerCase()
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }
                    `}
                  >
                    {category}
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
                onClick={() => setShowMobileSearch(true)}
                className="md:hidden ml-3 text-gray-700"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="bg-white">
          <div className="max-w-[1280px] mx-auto px-4 py-6">
            {/* Mobile Version */}
            <div className="md:hidden">
              <div className="grid grid-cols-1 gap-4">
                {filteredMenuItems.map((menuItem, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-100 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[17px] font-medium mb-1">{menuItem.name}</h3>
                        <p className="text-[15px] text-gray-600 mb-1">from Rs. {menuItem.price}</p>
                        <p className="text-[13px] text-gray-500">{menuItem.description}</p>
                      </div>
                      <div className="relative">
                        <img src={menuItem.image} 
                             alt={menuItem.name} className="w-[100px] h-[100px] rounded-lg object-cover" />
                        <button className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Web Version */}
            <div className="hidden md:flex gap-6">
              {/* Menu Items */}
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4">
                  {filteredMenuItems.map((menuItem, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-100 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-[17px] font-medium mb-1">{menuItem.name}</h3>
                          <p className="text-[15px] text-gray-600 mb-1">from Rs. {menuItem.price}</p>
                          <p className="text-[13px] text-gray-500">{menuItem.description}</p>
                        </div>
                        <div className="relative">
                          <img src={menuItem.image} 
                               alt={menuItem.name} className="w-[100px] h-[100px] rounded-lg object-cover" />
                          <button className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info & Hours - Web Only */}
              <div className="w-[300px] flex-shrink-0">
                <div className="bg-white rounded-lg border border-gray-100 p-4 sticky top-[80px]">
                  <h3 className="text-[15px] font-medium mb-4">Contact & Hours</h3>
                  
                  {/* Contact Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <p className="text-[13px] text-gray-600">F-7 Markaz, Jinnah Super Market, Islamabad</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-[13px] text-gray-600">051-2345678</p>
                    </div>
                  </div>

                  {/* Opening Hours */}
                  <h4 className="text-[13px] font-medium mb-2">Opening Hours</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-gray-600">Monday - Thursday</span>
                      <span>11:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-gray-600">Friday - Saturday</span>
                      <span>11:00 - 23:30</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-gray-600">Sunday</span>
                      <span>11:00 - 23:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RestaurantDetail;

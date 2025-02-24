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
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/Layout';

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

export default function RestaurantDetail() {
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

  // Extract unique categories
  const categories = useMemo(() => Array.from(new Set(menuItems.map(item => item.category))), []);

  // State declarations
  const [showCallButton, setShowCallButton] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(() => categories[0]);
  const [searchQuery, setSearchQuery] = useState('');
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
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Restaurant Header */}
        <div className="bg-white">
          {/* Breadcrumb - Desktop only */}
          <nav className="hidden md:flex px-6 py-3 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-700">Islamabad</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link to="/restaurants" className="hover:text-gray-700">Restaurant List</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">{restaurant.name}</span>
          </nav>

          {/* Mobile Breadcrumb */}
          <nav className="md:hidden flex items-center px-4 py-3 text-sm border-b border-gray-100">
            <Link to="/" className="text-gray-600">Islamabad</Link>
            <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
            <Link to="/restaurants" className="text-gray-600">Restaurant List</Link>
          </nav>

          <div className="md:max-w-7xl md:mx-auto md:px-6">
            {/* Mobile Header */}
            <div className="md:hidden">
              <div className="px-4 py-3">
                <div className="flex items-start gap-4">
                  {/* Restaurant Image */}
                  <div className="flex-none">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Restaurant Info */}
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl font-bold text-gray-900 leading-tight mb-1">
                      {restaurant.name}
                    </h1>
                    <div className="text-sm text-gray-600 mb-2">
                      {Array.isArray(restaurant.cuisine) ? restaurant.cuisine.join(', ') : restaurant.cuisine}
                    </div>
                    
                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                        <span className="font-medium text-sm">{restaurant.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({restaurant.reviewCount || 0} reviews)
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 rounded text-xs text-blue-700">
                        <span>Top restaurant</span>
                      </div>
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 rounded text-xs text-green-700">
                        <span>Open now</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Info */}
                <div className="flex items-center justify-between mt-4 py-3 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Bike className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Rs. {restaurant.deliveryFee || restaurant.priceRange} delivery</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Min. Rs. {restaurant.minOrder || restaurant.priceRange}</span>
                    </div>
                  </div>
                  <button 
                    className="p-2 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <Heart className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Header - Keep existing desktop layout */}
            <div className="hidden md:block">
              {/* Hero Section */}
              <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-6">
                  {/* Breadcrumb */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Link to="/" className="hover:text-gray-900">Islamabad</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <Link to="/restaurants" className="hover:text-gray-900">Restaurant List</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="text-gray-900">Karachi Biryani House</span>
                  </div>

                  {/* Restaurant Info */}
                  <div className="flex items-start gap-6">
                    {/* Restaurant Image */}
                    <div className="flex-shrink-0">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name}
                        className="w-32 h-32 object-cover rounded-lg shadow-sm"
                      />
                    </div>

                    {/* Restaurant Details */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">{restaurant.name}</h1>
                          <p className="text-gray-500 mt-1">Pakistani, Biryani, BBQ</p>
                        </div>
                        <button 
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Add to favorites"
                        >
                          <Heart className="w-6 h-6" />
                        </button>
                      </div>

                      {/* Restaurant Metrics */}
                      <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-yellow-400 mr-1.5" />
                          <span className="font-medium">{restaurant.rating}</span>
                          <span className="text-gray-500 ml-1">({restaurant.reviewCount})</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-5 h-5 mr-1.5" />
                          <span>Min. order Rs. 500</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Bike className="w-5 h-5 mr-1.5" />
                          <span>Rs. 130 delivery</span>
                        </div>
                      </div>

                      {/* Restaurant Tags */}
                      <div className="flex items-center gap-2 mt-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          Top restaurant
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          Open now
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Deals */}
        <div className="bg-white border-b border-gray-100">
          {/* Desktop Version */}
          <div className="hidden md:block">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Available deals</h2>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {/* Desktop Deal Cards - Keep existing cards */}
                <div className="flex-none">
                  <div className="bg-red-50 rounded-lg p-4 w-72 group hover:bg-red-100/80 transition-colors duration-200">
                    {/* Existing desktop card content */}
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="inline-flex items-center px-2 py-1 mb-2 rounded text-xs font-medium bg-red-100 text-red-700">
                          Limited time
                        </div>
                        <div className="text-xl font-semibold text-gray-900 mb-1">Rs. 1,000 off</div>
                        <div className="text-sm text-gray-600">
                          Min. order Rs. 1,000. Valid for selected items.
                          <span className="block text-red-600 font-medium mt-1">Auto applied</span>
                        </div>
                      </div>
                      <div className="flex-none">
                        <div className="bg-white rounded-full p-2 shadow-sm group-hover:shadow transition-shadow duration-200">
                          <Clock className="w-5 h-5 text-red-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Second desktop card */}
                <div className="flex-none">
                  <div className="bg-blue-50 rounded-lg p-4 w-72 group hover:bg-blue-100/80 transition-colors duration-200">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="inline-flex items-center px-2 py-1 mb-2 rounded text-xs font-medium bg-blue-100 text-blue-700">
                          Rewards
                        </div>
                        <div className="text-xl font-semibold text-gray-900 mb-1">Stamp cards</div>
                        <div className="text-sm text-gray-600">
                          Collect stamps with every order.
                          <span className="block text-blue-600 font-medium mt-1">Get free items</span>
                        </div>
                      </div>
                      <div className="flex-none">
                        <div className="bg-white rounded-full p-2 shadow-sm group-hover:shadow transition-shadow duration-200">
                          <Star className="w-5 h-5 text-blue-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Version */}
          <div className="md:hidden">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">Available deals</h2>
                <button className="text-sm text-gray-500 flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {/* Mobile Deal Card 1 */}
                <div className="bg-gradient-to-r from-red-500/10 to-red-500/5 rounded-lg p-3 active:bg-red-500/15 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex-none">
                      <div className="bg-white rounded-full p-2 shadow-sm">
                        <Clock className="w-5 h-5 text-red-500" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="text-red-600 font-medium">Rs. 1,000 off</div>
                        <div className="px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">Limited time</div>
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        Min. order Rs. 1,000
                      </div>
                    </div>
                    <div className="flex-none">
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Mobile Deal Card 2 */}
                <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-lg p-3 active:bg-blue-500/15 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex-none">
                      <div className="bg-white rounded-full p-2 shadow-sm">
                        <Star className="w-5 h-5 text-blue-500" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="text-blue-600 font-medium">Stamp cards</div>
                        <div className="px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">Rewards</div>
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        Collect stamps, get free items
                      </div>
                    </div>
                    <div className="flex-none">
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Filter Bar */}
        <div className="sticky top-16 bg-white border-b border-gray-100 shadow-md z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center px-6 py-4 relative">
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

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
                  className="flex py-1 overflow-x-auto no-scrollbar scroll-smooth"
                  style={{ 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {categories.map((category, index) => (
                    <div 
                      key={category}
                      className={`
                        flex-none ${index > 0 ? 'ml-6 md:ml-10' : ''}
                      `}
                    >
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`
                          relative whitespace-nowrap text-sm
                          ${selectedCategory === category 
                            ? 'text-gray-900 font-medium' 
                            : 'text-gray-600 hover:text-gray-900'
                          }
                        `}
                      >
                        {category}
                        <span className="ml-1.5 text-xs text-gray-500">
                          ({menuItems.filter(item => item.category === category).length})
                        </span>
                        {selectedCategory === category && (
                          <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-red-500 rounded-full category-indicator" />
                        )}
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
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300 focus:ring-0 transition-colors"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              {/* Search Icon - Mobile */}
              <button 
                onClick={() => setShowMobileSearch(true)}
                className="md:hidden flex-none w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>

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
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300 focus:ring-0"
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
            </div>
          </div>
        </div>

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
                  <Clock className="w-5 h-5 mr-2" />
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
    </Layout>
  );
}

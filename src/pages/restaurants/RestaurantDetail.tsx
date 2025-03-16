import { useState, useRef, useEffect, Fragment, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, 
  Info, 
  Clock, 
  Heart, 
  ChevronRight, 
  Search, 
  ChevronLeft, 
  Plus, 
  MapPin, 
  X, 
  MapPinIcon, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Quote, 
  CreditCard, 
  Banknote,
  Zap,
  CheckCircle,
  Phone,
  ShoppingBag
} from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Layout from '../../components/Layout';
import RestaurantAds from '../../components/RestaurantAds';
import { useRestaurantData } from '../../hooks/useRestaurantData';
import { GOOGLE_MAPS_API_KEY, googleMapsLibraries, GOOGLE_MAPS_SCRIPT_ID } from '../../utils/googleMapsConfig';
import { useCart } from '../../contexts/CartContext';
import toast from 'react-hot-toast';
import PlaceholderLogo from '../../components/PlaceholderLogo';
import { getRestaurantLogoUrl } from '../../services/supabaseService';

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const { addItem, getItemCount } = useCart();
  const cartItemCount = getItemCount();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoLoading, setLogoLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
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

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  useEffect(() => {
    // Log the restaurant data when it's loaded
    if (restaurant) {
      console.log('Restaurant data loaded:', restaurant);
      console.log('Restaurant ID:', id);
      
      // Fetch the logo from Supabase storage
      const fetchLogo = async () => {
        if (!id) return;
        
        setLogoLoading(true);
        setLogoError(false);
        
        try {
          // For restaurant ID 14, directly try to fetch from Supabase first
          if (id === '14') {
            console.log('Fetching logo from Supabase for restaurant ID 14');
            const url = await getRestaurantLogoUrl(id);
            
            if (url) {
              console.log('Logo fetched from Supabase:', url);
              setLogoUrl(url);
            } else {
              // Fall back to mock data if Supabase fetch fails
              console.log('No logo found in Supabase, falling back to mock data');
              if (restaurant.logo) {
                setLogoUrl(restaurant.logo);
              } else {
                setLogoError(true);
              }
            }
          } else {
            // For other restaurants, first try to use the logo from the restaurant data (mock data)
            if (restaurant.logo) {
              console.log('Using logo from restaurant data:', restaurant.logo);
              setLogoUrl(restaurant.logo);
            } else {
              // If no logo in the restaurant data, try to fetch from Supabase
              console.log('Fetching logo from Supabase for restaurant ID:', id);
              const url = await getRestaurantLogoUrl(id);
              
              if (url) {
                console.log('Logo fetched from Supabase:', url);
                setLogoUrl(url);
              } else {
                console.log('No logo found in Supabase for restaurant ID:', id);
                setLogoError(true);
              }
            }
          }
        } catch (error) {
          console.error('Error fetching logo:', error);
          setLogoError(true);
        } finally {
          setLogoLoading(false);
        }
      };
      
      fetchLogo();
    }
  }, [restaurant, id]);

  const checkScroll = () => {
    if (categoriesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (categoriesRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      categoriesRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Theme colors based on restaurant ID - used for styling various elements
  const getThemeColor = () => {
    if (id === 'kfc') return '#E4002B';
    if (id === 'mcdonalds') return '#FFC72C';
    if (id === 'savour') return '#9C27B0';
    if (id === '14') return '#22C55E'; // Green for restaurant ID 14
    return '#E4002B'; // Default to KFC red
  };
  
  // These variables are used throughout the component for styling
  const themeColor = getThemeColor();
  const textColorClass = id === 'mcdonalds' ? 'text-gray-900' : 'text-white';

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

  // Handle adding an item to the cart
  const handleAddToCart = (item: any) => {
    if (!restaurant) return;
    
    // Parse price if it's a string format
    const itemPrice = typeof item.price === 'string' && item.price.startsWith('from') 
      ? parseFloat(item.price.replace('from Rs. ', '')) 
      : item.price;
    
    addItem({
      id: item.id,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      name: item.name,
      price: itemPrice,
      image: item.image,
    });
    
    toast.success(`Added ${item.name} to cart!`, {
      duration: 2000,
      position: 'bottom-center',
      icon: '🛒',
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Breadcrumbs */}
        <div className="py-2">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/home" className="hover:text-gray-900">Islamabad</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/home" className="hover:text-gray-900">Restaurant List</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">{restaurant.name}</span>
          </nav>
        </div>

        {/* Restaurant Header */}
        <div className="flex gap-6">
          <div className={`relative w-[200px] h-[200px] rounded-2xl flex items-center justify-center overflow-hidden ${
            id === '14' ? 'bg-[#22C55E]' : 
            id === 'kfc' || id === 'mcdonalds' ? 'bg-[#E4002B]' : 
            id === 'savour' ? 'bg-[#9C27B0]' : 'bg-gray-100'
          }`}>
            {logoLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            ) : logoUrl ? (
              <img
                src={logoUrl}
                alt={restaurant.name}
                className="w-full h-full object-contain p-4"
                onLoad={() => console.log("Logo loaded successfully:", logoUrl)}
                onError={(e) => {
                  console.error('Logo failed to load:', logoUrl);
                  setLogoError(true);
                  // Hide this element
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <PlaceholderLogo name={restaurant.name} />
            )}
            
            {logoError && <PlaceholderLogo name={restaurant.name} />}
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="text-gray-500 mb-1 flex items-center gap-2">
                <span>Burgers</span>
                <span>·</span>
                <span>Fast Food</span>
                <span>·</span>
                <span>Western</span>
                <span>·</span>
                <span>Broast</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {restaurant.name}
              </h1>
              {/* Promotional Elements - Unique per restaurant */}
              <div className="mb-6">
                {id === 'kfc' && (
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-red-500">
                      Tuesday Krunch Deal
                    </div>
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-amber-500">
                      Ramadan Family Bucket
                    </div>
                  </div>
                )}
                
                {id === 'mcdonalds' && (
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-yellow-500">
                      Minecraft Happy Meal
                    </div>
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-green-500">
                      Midnight McFlurry Deal
                    </div>
                  </div>
                )}
                
                {id === 'savour' && (
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-purple-500">
                      Double Chicken Pulao
                    </div>
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-blue-500">
                      Weekend Family Special
                    </div>
                  </div>
                )}
                
                {id === 'howdy' && (
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-orange-500">
                      Jalapeño Smokehouse
                    </div>
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-red-500">
                      Student Meal Deal
                    </div>
                  </div>
                )}
                
                {id === 'chaaye-khana' && (
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-emerald-500">
                      Doodh Patti Combo
                    </div>
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-teal-500">
                      Book Corner Discount
                    </div>
                  </div>
                )}
                
                {id === 'tandoori' && (
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-rose-500">
                      Unlimited Naan
                    </div>
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-amber-500">
                      Sizzling Tikka Platter
                    </div>
                  </div>
                )}
                
                {id === 'burning-brownies' && (
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-amber-500">
                      6-Flavor Brownie Box
                    </div>
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-indigo-500">
                      Coffee & Dessert Pairing
                    </div>
                  </div>
                )}
                
                {id === 'subway' && (
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-green-500">
                      Footlong Italian BMT
                    </div>
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-yellow-500">
                      Free Cookie Weekdays
                    </div>
                  </div>
                )}
                
                {/* Default promotional element for any other restaurant */}
                {!['kfc', 'mcdonalds', 'savour', 'howdy', 'chaaye-khana', 'tandoori', 'burning-brownies', 'subway'].includes(id || '') && (
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-blue-500">
                      First Order Discount
                    </div>
                    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border-l-2 border-gray-500">
                      Free Delivery
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  className="text-gray-500 hover:text-gray-700 flex items-center gap-2 p-2"
                  onClick={() => setIsInfoModalOpen(true)}
                >
                  <Info className="w-4 h-4" />
                  More info
                </button>
                <a
                  href={`tel:${restaurant.contact.phone}`}
                  className={`flex items-center gap-2 text-gray-500 px-4 py-2 rounded-lg ${
                    id === 'mcdonalds' 
                      ? 'hover:bg-[#FFC72C] hover:text-gray-900' 
                      : 'hover:bg-[#E4002B] hover:text-white'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">Call Now</span>
                </a>
              </div>
              <button 
                className="rounded-full px-4 py-2.5 transition-all hover:bg-gray-100 border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100 flex items-center gap-2"
                aria-label="Add to favorites"
              >
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">Add to favourites</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Call Now Text */}
        <div className="md:hidden px-4 py-3 border-b border-gray-100">
          <a
            href={`tel:${restaurant.contact.phone}`}
            className={`flex items-center justify-center gap-2 text-gray-600 py-2 w-full ${
              id === 'mcdonalds' ? 'hover:text-[#FFC72C]' : 'hover:text-[#E4002B]'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span className="font-medium">Call Now</span>
          </a>
        </div>

        {/* Categories Section */}
        <div className="border-b border-gray-200 sticky top-[70px] bg-white z-10 shadow-sm">
          <div className="max-w-7xl mx-auto">
            {/* Mobile filter bar */}
            <div className="md:hidden flex items-center justify-between px-4 py-3">
              <div className="flex-1 overflow-x-auto no-scrollbar pr-4">
                <div className="flex items-center gap-4">
                  {restaurant.menuCategories.map((category) => (
                    <button
                      key={category}
                      className={`whitespace-nowrap text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? id === 'mcdonalds'
                            ? 'text-[#FFC72C] border-b-2 border-[#FFC72C] pb-1'
                            : 'text-[#E4002B] border-b-2 border-[#E4002B] pb-1'
                          : 'text-gray-600'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="ml-4 p-2 flex-shrink-0"
                aria-label="Search menu"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            {/* Mobile search input (conditionally shown) */}
            {showMobileSearch && (
              <div className="md:hidden px-4 pb-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search menu"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-3 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none ${
                      id === 'mcdonalds' 
                        ? 'focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C]' 
                        : 'focus:border-[#E4002B] focus:ring-1 focus:ring-[#E4002B]'
                    } w-full`}
                    autoFocus
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="mr-1"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            )}

            {/* Desktop filter bar */}
            <div className="hidden md:flex flex-row items-center justify-between py-2 px-4">
              <div className="relative flex-1 max-w-[calc(100%-220px)] bg-white">
                <div className="relative">
                  <button
                    onClick={() => scroll('left')}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] rounded-full p-2 transition-all ${
                      showLeftScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <div 
                    ref={categoriesRef}
                    className="flex items-center gap-2 overflow-x-auto no-scrollbar px-8"
                    onScroll={checkScroll}
                  >
                    {restaurant.menuCategories.map((category) => {
                      const count = restaurant.menuItems[category]?.length || 0;
                      return (
                        <button
                          key={category}
                          className={`px-4 py-2 whitespace-nowrap text-sm font-medium rounded-full transition-colors flex-shrink-0 ${
                            selectedCategory === category
                              ? id === 'mcdonalds'
                                ? 'bg-[#FFC72C] text-gray-900'
                                : 'bg-[#E4002B] text-white'
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
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] rounded-full p-2 transition-all ${
                      showRightScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0 relative ml-4 w-[200px]">
                <input
                  type="text"
                  placeholder="Search menu"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-3 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none ${
                    id === 'mcdonalds' 
                      ? 'focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C]' 
                      : 'focus:border-[#E4002B] focus:ring-1 focus:ring-[#E4002B]'
                  } w-full`}
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Menu and Ads Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-0">
          {/* Menu Items */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 auto-rows-[120px]">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col bg-white rounded-lg border border-gray-200 p-2 md:p-3 ${
                    id === 'mcdonalds' 
                      ? 'hover:border-[#FFC72C]/20' 
                      : 'hover:border-[#E4002B]/20'
                  } hover:shadow-sm transition-all`}
                >
                  <div className="flex flex-col justify-between h-full space-y-1 md:space-y-2">
                    <div className="space-y-0.5 md:space-y-1">
                      <h3 className="text-sm md:text-base font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs md:text-sm font-medium text-gray-900">
                        {item.price.toString().startsWith('from') ? item.price : `Rs. ${item.price}`}
                      </p>
                      <button
                        className={`rounded-full p-2 ${id === 'mcdonalds' ? 'text-[#FFC72C] hover:bg-[#FFC72C]/5' : 'text-[#E4002B] hover:bg-[#E4002B]/5'} transition-colors`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                        aria-label="Add to cart"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredItems.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <p>No items found in this category</p>
              </div>
            )}
          </div>

          {/* Ads and Campaign Section */}
          <div className="space-y-6">
            {/* Ads Section */}
            <div className="h-[200px] md:h-[250px] rounded-xl overflow-hidden shadow-sm">
              <RestaurantAds id={id} />
            </div>

            {/* Campaign Card - Smaller Version */}
            <div className="mt-4 bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 p-5">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-green-700 uppercase tracking-wide mb-2">Environmental Initiative</span>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">Make a Difference with Every Order</h3>
                
                <p className="text-sm text-gray-600 mb-3">
                  For each order placed, we contribute to reforestation projects worldwide.
                </p>
                
                <div className="flex space-x-6 mb-3">
                  <div>
                    <div className="text-base font-bold text-green-600">15,000+</div>
                    <div className="text-xs text-gray-500">Trees Planted</div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-green-600">7.2 tons</div>
                    <div className="text-xs text-gray-500">CO₂ Offset</div>
                  </div>
                </div>
                
                <Link 
                  to="/green-future" 
                  className="mt-1 inline-block px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={isInfoModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsInfoModalOpen(false)}
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel 
              className="transform overflow-hidden rounded-xl bg-white shadow-xl"
            >
              <div className="flex">
                <div className="p-8 flex-shrink-0 w-[500px] flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                          {restaurant.name}
                          <span className="text-gray-400">·</span>
                          <span className="text-gray-600 font-medium">Since 1997</span>
                        </Dialog.Title>
                        
                        <div className={`relative mb-8 py-6 px-8 rounded-xl ${
                          id === 'kfc' ? 'bg-gray-50' : id === 'mcdonalds' ? 'bg-[#FFC72C]/10' : id === 'savour' ? 'bg-[#9C27B0]/10' : id === '14' ? 'bg-[#22C55E]/10' : 'bg-gray-50'
                        }`}>
                          <Quote className={`absolute -left-3 -top-3 w-8 h-8 rotate-6 ${
                            id === 'kfc' ? 'text-red-500' : id === 'mcdonalds' ? 'text-[#FFC72C]' : id === 'savour' ? 'text-[#9C27B0]' : id === '14' ? 'text-[#22C55E]' : 'text-gray-400'
                          }`} />
                          <p className="text-xl text-gray-700 font-medium text-center">
                            {id === 'kfc' ? "It's Finger Lickin' Good!" : id === 'mcdonalds' ? "I'm Lovin' It" : id === 'savour' ? 'Savour the taste' : id === '14' ? 'Green and Fresh' : "Delicious food delivered!"}
                          </p>
                          <Quote className={`absolute -right-3 -bottom-3 w-8 h-8 -rotate-6 ${
                            id === 'kfc' ? 'text-red-500' : id === 'mcdonalds' ? 'text-[#FFC72C]' : id === 'savour' ? 'text-[#9C27B0]' : id === '14' ? 'text-[#22C55E]' : 'text-gray-400'
                          }`} />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-gray-900 font-medium">{restaurant.rating}/5</span>
                            <span className="text-gray-500">(1000+ reviews)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-900">Rs. {restaurant.deliveryFee} delivery</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Info className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-900">Min. order Rs. {restaurant.minimumOrder}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-900">30-45 min delivery</span>
                          </div>
                        </div>

                        <div className="space-y-6 border-t border-gray-100 pt-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <MapPinIcon className="h-6 w-6 text-gray-400" />
                            <span className="text-lg text-gray-600">
                              {restaurant.contact.address}
                            </span>
                          </div>
                          <div className="w-full h-48 rounded-xl overflow-hidden">
                            <GoogleMapComponent 
                              address={restaurant.contact.address} 
                              apiKey={GOOGLE_MAPS_API_KEY}
                            />
                          </div>
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.contact.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            View larger map
                            <ChevronRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none p-2"
                        onClick={() => setIsInfoModalOpen(false)}
                      >
                        <span className="sr-only">Close</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="border-t border-gray-200 mt-6 pt-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">Connect With Us</h4>
                      <div className="flex items-center space-x-6">
                        <a
                          href={restaurant.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#E4405F]"
                        >
                          <span className="sr-only">Instagram</span>
                          <Instagram className="h-8 w-8" />
                        </a>
                        <a
                          href={restaurant.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#1877F2]"
                        >
                          <span className="sr-only">Facebook</span>
                          <Facebook className="h-8 w-8" />
                        </a>
                        <a
                          href={`https://wa.me/${restaurant.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#25D366]"
                        >
                          <span className="sr-only">WhatsApp</span>
                          <MessageCircle className="h-8 w-8" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l border-gray-100 p-8 overflow-hidden bg-gray-50 w-[500px]">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        Opening Hours
                      </h4>
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="space-y-3">
                          {restaurant.openingHours && restaurant.openingHours.map((hour, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-gray-600">{hour.day}{hour.start_day && hour.end_day ? ` - ${hour.end_day}` : ''}</span>
                              {hour.is_closed ? (
                                <span className="text-red-500 font-medium">Closed</span>
                              ) : (
                                <span className="text-gray-900 font-medium">{hour.start_time} - {hour.end_time}</span>
                              )}
                            </div>
                          ))}
                          {(!restaurant.openingHours || restaurant.openingHours.length === 0) && (
                            <>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Monday - Thursday</span>
                                <span className="text-gray-900 font-medium">11:00 AM - 11:00 PM</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Friday - Saturday</span>
                                <span className="text-gray-900 font-medium">11:00 AM - 1:00 AM</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Sunday</span>
                                <span className="text-gray-900 font-medium">12:00 PM - 11:00 PM</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-600" />
                        Delivery Information
                      </h4>
                      <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-1">Delivery Fee</h5>
                          <p className="text-gray-600">Based on your distance from the restaurant</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-1">Minimum Order</h5>
                          <p className="text-gray-600">Rs. {restaurant.minimumOrder} (Small order fee may apply)</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-1">Delivery Time</h5>
                          <p className="text-gray-600">30-45 minutes (may vary during peak hours)</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Star className="w-4 h-4 text-gray-600" />
                        Additional Information
                      </h4>
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <CreditCard className="w-4 h-4" />
                            Card Payment
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Banknote className="w-4 h-4" />
                            Cash on Delivery
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Zap className="w-4 h-4" />
                            Express Delivery
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <CheckCircle className="w-4 h-4" />
                            Order Tracking
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
      {cartItemCount > 0 && (
        <div className="fixed bottom-6 right-6 md:hidden z-50">
          <Link
            to="/cart"
            className="flex items-center justify-center space-x-2 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors"
          >
            <ShoppingBag className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-red-600">
              {cartItemCount}
            </span>
          </Link>
        </div>
      )}
    </Layout>
  );
}

interface GoogleMapComponentProps {
  address: string;
  apiKey: string;
}

function GoogleMapComponent({ address, apiKey }: GoogleMapComponentProps) {
  // Restaurant locations in Islamabad
  const restaurantLocations: Record<string, { lat: number; lng: number }> = {
    kfc: { lat: 33.6845, lng: 72.9913 }, // KFC F-11 branch coordinates
    mcdonalds: { lat: 33.6943, lng: 73.0188 } // McDonald's F-10 branch coordinates
  };
  
  // Get the restaurant ID from the URL
  const { id } = useParams<{ id: string }>();
  
  // Default to KFC location if ID not found in our locations
  const defaultLocation = restaurantLocations.kfc;
  const location = id && restaurantLocations[id as keyof typeof restaurantLocations] 
    ? restaurantLocations[id as keyof typeof restaurantLocations] 
    : defaultLocation;
  
  const { isLoaded } = useJsApiLoader({
    id: GOOGLE_MAPS_SCRIPT_ID,
    googleMapsApiKey: apiKey,
    libraries: googleMapsLibraries as any
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  if (!isLoaded) {
    return <div className="w-full h-full bg-gray-100 flex items-center justify-center">Loading map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={location}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      <Marker position={location} />
    </GoogleMap>
  );
}

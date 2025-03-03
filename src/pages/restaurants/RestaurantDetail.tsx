import React, { useState, useRef, useEffect, Fragment } from 'react';
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
  ChevronDown, 
  MapPinIcon, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Quote, 
  CreditCard, 
  Banknote, 
  Zap, 
  CheckCircle 
} from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import Layout from '../../components/Layout';
import RestaurantAds from '../../components/RestaurantAds';
import { useRestaurantData } from '../../hooks/useRestaurantData';

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
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
          <div className="w-[160px] h-[160px] bg-[#E4002B] rounded-lg flex items-center justify-center p-2">
            <img
              src={restaurant.logo}
              alt={restaurant.name}
              className="w-full h-full object-contain scale-150"
              loading="eager"
            />
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
              <h1 className="text-4xl font-bold text-gray-900">
                {restaurant.name}
              </h1>
            </div>
            
            <div className="flex items-center justify-between pb-1">
              <button 
                className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
                onClick={() => setIsInfoModalOpen(true)}
              >
                <Info className="w-5 h-5" />
                More info
              </button>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Menu Categories */}
        <div className="sticky top-[56px] -mx-4 sm:-mx-6 lg:-mx-8 bg-white z-40 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center relative" style={{ maxWidth: 'calc(100% - 232px)' }}>
                <button
                  onClick={() => scroll('left')}
                  className={`absolute left-0 z-10 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] rounded-full p-1.5 transition-all ${
                    showLeftScroll ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none -translate-x-4'
                  }`}
                  style={{ transform: 'translateX(-50%)' }}
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
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
                  <ChevronRight className="w-4 h-4 text-gray-600" />
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
        </div>

        {/* Menu and Ads Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Menu Items */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 auto-rows-[120px]">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col bg-white rounded-lg border border-gray-200 p-3 hover:border-red-100 hover:shadow-sm transition-all"
                >
                  <div className="flex flex-col justify-between h-full space-y-2">
                    <div className="space-y-1">
                      <h3 className="text-base font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {item.price.toString().startsWith('from') ? item.price : `Rs. ${item.price}`}
                      </p>
                      <button
                        className="rounded-full p-1.5 text-red-500 hover:bg-red-50 transition-colors"
                        onClick={() => {/* Add to cart logic */}}
                      >
                        <Plus className="w-5 h-5" />
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
                        
                        <div className="relative mb-8 py-6 px-8 bg-gray-50 rounded-xl">
                          <Quote className="absolute -left-3 -top-3 w-8 h-8 text-red-500 rotate-6" />
                          <p className="text-xl text-gray-700 font-medium text-center">
                            It's Finger Lickin' Good!
                          </p>
                          <Quote className="absolute -right-3 -bottom-3 w-8 h-8 text-red-500 -rotate-6" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <span className="text-gray-900 font-medium">{restaurant.rating}/5</span>
                            <span className="text-gray-500">(1000+ reviews)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-900">Rs. {restaurant.deliveryFee} delivery</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Info className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-900">Min. order Rs. {restaurant.minimumOrder}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-gray-600" />
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
                            <iframe
                              title="Restaurant Location"
                              width="100%"
                              height="100%"
                              frameBorder="0"
                              style={{ border: 0 }}
                              src={`https://www.openstreetmap.org/export/embed.html?bbox=73.011,33.693,73.013,33.695&layer=mapnik&marker=33.694,73.012`}
                            />
                          </div>
                          <a 
                            href="https://www.openstreetmap.org/?mlat=33.694&mlon=73.012#map=18"
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
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
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
                        <Clock className="w-5 h-5 text-gray-600" />
                        Opening Hours
                      </h4>
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="space-y-3">
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
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-600" />
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
                        <Star className="w-5 h-5 text-gray-600" />
                        Additional Information
                      </h4>
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <CreditCard className="w-5 h-5" />
                            Card Payment
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Banknote className="w-5 h-5" />
                            Cash on Delivery
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Zap className="w-5 h-5" />
                            Express Delivery
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <CheckCircle className="w-5 h-5" />
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
    </Layout>
  );
}

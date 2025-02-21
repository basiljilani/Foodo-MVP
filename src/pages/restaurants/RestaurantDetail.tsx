import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/Layout';

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
  const [showCallButton, setShowCallButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 200px
      const shouldShow = window.scrollY > 200;
      setShowCallButton(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      category: "Main Course",
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
    }
  ];

  const restaurant = {
    name: "Karachi Biryani House",
    description: "Famous for authentic Karachi-style biryani and BBQ specialties.",
    rating: 4.8,
    reviewCount: 245,
    priceRange: "$$",
    cuisine: "Pakistani, Biryani, BBQ",
    address: "Block 2, Gulshan-e-Iqbal, Karachi",
    phone: "+92 321 1234567",
    email: "contact@karachibiryani.com",
    openingHours: {
      Mon: "11:00 AM - 11:00 PM",
      Tue: "11:00 AM - 11:00 PM",
      Wed: "11:00 AM - 11:00 PM",
      Thu: "11:00 AM - 11:00 PM",
      Fri: "11:00 AM - 11:30 PM",
      Sat: "11:00 AM - 11:30 PM",
      Sun: "11:00 AM - 11:00 PM"
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Hero Section */}
        <div className="relative h-72 bg-gradient-to-r from-red-600 to-red-800">
          <div className="absolute inset-0">
            <img
              src={menuItems[0].image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white z-10 px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h1 className="text-4xl md:text-5xl font-bold">{restaurant.name}</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">{restaurant.description}</p>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                  <span className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
                    <Star className="w-5 h-5 text-yellow-400 mr-2" />
                    <span>{restaurant.rating}</span>
                    <span className="mx-1.5 text-white/60">•</span>
                    <span className="text-white/80">{restaurant.reviewCount} reviews</span>
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white/90">
                    {restaurant.cuisine}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Menu Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6">Our Menu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
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
            </div>

            {/* Info Section */}
            <div className="space-y-6">
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

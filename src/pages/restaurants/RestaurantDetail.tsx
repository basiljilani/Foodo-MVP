import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, Mail, Heart, Share2, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  userImage: string;
}

export default function RestaurantDetail() {
  const { id } = useParams();
  const restaurantId = parseInt(id || '1');

  // Sample menu items for Pakistani restaurants
  const menuItems: Record<number, MenuItem[]> = {
    1: [ // Karachi Biryani House
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
        name: "Mutton Biryani",
        description: "Traditional biryani with tender mutton pieces and saffron rice",
        price: "Rs. 450",
        category: "Biryani",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0"
      },
      {
        id: 3,
        name: "Zafrani Pulao",
        description: "Fragrant rice cooked with saffron and mild spices",
        price: "Rs. 300",
        category: "Rice",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19"
      }
    ],
    2: [ // Lahore Tikka House
      {
        id: 1,
        name: "Seekh Kebab",
        description: "Minced meat kebabs with herbs and spices",
        price: "Rs. 300",
        category: "BBQ",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0"
      },
      {
        id: 2,
        name: "Chicken Tikka",
        description: "Marinated chicken pieces grilled to perfection",
        price: "Rs. 350",
        category: "BBQ",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84"
      }
    ]
  };

  const restaurantData: Record<number, any> = {
    1: {
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
      },
      reviews: [
        {
          id: 1,
          userName: "John Doe",
          rating: 5,
          comment: "Amazing food and great service!",
          date: "2024-02-15",
          userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
        },
        // More reviews will be added dynamically
      ]
    },
    2: {
      name: "Lahore Tikka House",
      description: "Authentic Lahori taste with signature tikka and karahi dishes.",
      rating: 4.9,
      reviewCount: 312,
      priceRange: "$$",
      cuisine: "Pakistani, BBQ, Karahi",
      address: "M.M. Alam Road, Gulberg III, Lahore",
      phone: "+92 321 9876543",
      email: "info@lahoretikka.com",
      openingHours: {
        Mon: "12:00 PM - 12:00 AM",
        Tue: "12:00 PM - 12:00 AM",
        Wed: "12:00 PM - 12:00 AM",
        Thu: "12:00 PM - 12:00 AM",
        Fri: "12:00 PM - 1:00 AM",
        Sat: "12:00 PM - 1:00 AM",
        Sun: "12:00 PM - 12:00 AM"
      },
      reviews: [
        {
          id: 1,
          userName: "John Doe",
          rating: 5,
          comment: "Amazing food and great service!",
          date: "2024-02-15",
          userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
        },
        // More reviews will be added dynamically
      ]
    }
  };

  // Get restaurant data based on ID
  const restaurant = restaurantData[restaurantId] || restaurantData[1];
  const menu = menuItems[restaurantId] || menuItems[1];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-96 bg-gray-900">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white z-10">
              <h1 className="text-5xl font-bold mb-4">{restaurant.name}</h1>
              <p className="text-xl">{restaurant.description}</p>
              <div className="flex items-center justify-center mt-4 space-x-4">
                <span className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  {restaurant.rating} ({restaurant.reviewCount} reviews)
                </span>
                <span className="flex items-center">
                  <MapPin className="w-5 h-5 text-red-400 mr-1" />
                  {restaurant.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Menu Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-3xl font-bold mb-8">Menu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menu.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative h-48">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <h3 className="text-white text-xl font-semibold">{item.name}</h3>
                          <p className="text-white/80">{item.price}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-600">{item.description}</p>
                        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              {/* Opening Hours */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Opening Hours
                </h3>
                {Object.entries(restaurant.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between py-2">
                    <span className="text-gray-600">{day}</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4">Contact</h3>
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

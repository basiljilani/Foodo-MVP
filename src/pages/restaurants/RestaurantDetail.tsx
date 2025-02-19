import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, Mail, Heart, Share2, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

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

  // This would typically come from an API call using the id
  const restaurant = {
    id: parseInt(id || '1'),
    name: "Restaurant Name",
    description: "Restaurant description will be dynamically loaded based on the ID.",
    rating: 4.8,
    reviewCount: 245,
    priceRange: "$$",
    cuisine: "Various",
    address: "123 Restaurant Street, City",
    phone: "+1 234 567 8900",
    email: "contact@restaurant.com",
    openingHours: {
      Mon: "11:00 AM - 10:00 PM",
      Tue: "11:00 AM - 10:00 PM",
      Wed: "11:00 AM - 10:00 PM",
      Thu: "11:00 AM - 10:00 PM",
      Fri: "11:00 AM - 11:00 PM",
      Sat: "11:00 AM - 11:00 PM",
      Sun: "12:00 PM - 9:00 PM"
    },
    menu: [
      {
        id: 1,
        name: "Grilled Mediterranean Sea Bass",
        description: "Fresh sea bass fillet grilled to perfection, served with roasted vegetables and lemon herb sauce",
        price: "$28.99",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2"
      },
      {
        id: 2,
        name: "Truffle Mushroom Risotto",
        description: "Creamy Arborio rice with wild mushrooms, finished with black truffle and aged Parmesan",
        price: "$24.99",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371"
      },
      {
        id: 3,
        name: "Crispy Duck Confit",
        description: "Slow-cooked duck leg with crispy skin, served with braised red cabbage and cherry sauce",
        price: "$32.99",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
      },
      {
        id: 4,
        name: "Burrata & Heirloom Tomato",
        description: "Fresh burrata cheese with colorful heirloom tomatoes, basil, and aged balsamic reduction",
        price: "$16.99",
        category: "Starters",
        image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af"
      },
      {
        id: 5,
        name: "Wagyu Beef Burger",
        description: "Premium wagyu beef patty with caramelized onions, aged cheddar, and truffle aioli",
        price: "$26.99",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
      },
      {
        id: 6,
        name: "Lobster Linguine",
        description: "Fresh pasta with succulent lobster meat in a rich tomato and brandy sauce",
        price: "$34.99",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8"
      },
      {
        id: 7,
        name: "Tuna Tartare",
        description: "Fresh sushi-grade tuna with avocado, sesame oil, and wasabi aioli on crispy wonton",
        price: "$19.99",
        category: "Starters",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351"
      },
      {
        id: 8,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a molten center, served with vanilla bean ice cream",
        price: "$12.99",
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51"
      },
      {
        id: 9,
        name: "Rack of Lamb",
        description: "Herb-crusted New Zealand lamb rack with mint pesto and roasted fingerling potatoes",
        price: "$39.99",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1514516345957-556ca7c90a29"
      },
      {
        id: 10,
        name: "Seafood Paella",
        description: "Traditional Spanish rice with shrimp, mussels, calamari, and saffron",
        price: "$36.99",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a"
      },
      {
        id: 11,
        name: "Quinoa Buddha Bowl",
        description: "Organic quinoa with roasted vegetables, avocado, and tahini dressing",
        price: "$18.99",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
      },
      {
        id: 12,
        name: "Tiramisu",
        description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
        price: "$11.99",
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9"
      },
      {
        id: 13,
        name: "Truffle Fries",
        description: "Crispy hand-cut fries tossed with truffle oil, Parmesan, and fresh herbs",
        price: "$9.99",
        category: "Sides",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877"
      }
    ],
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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[70vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold mb-4">{restaurant.name}</h1>
            <div className="flex items-center justify-center space-x-4 text-lg">
              <span className="flex items-center">
                <Star className="h-6 w-6 text-yellow-400 fill-current mr-1" />
                {restaurant.rating} ({restaurant.reviewCount} reviews)
              </span>
              <span>•</span>
              <span>{restaurant.cuisine}</span>
              <span>•</span>
              <span>{restaurant.priceRange}</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-8"
          >
            <ChevronDown className="h-8 w-8 animate-bounce" />
          </motion.div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="sticky top-0 z-30 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-16">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Heart className="h-5 w-5" />
                <span>Save</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Section - Takes up 2 columns */}
          <section className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-3xl font-bold mb-8">Menu</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {restaurant.menu.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold group-hover:text-red-500 transition-colors">{item.name}</h3>
                        <span className="font-medium text-red-500">{item.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Sidebar with Contact Info - Takes up 1 column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Information Card */}
            <section className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Contact & Hours</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                  >
                    <MapPin className="h-5 w-5 text-red-500" />
                    <span>{restaurant.address}</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                  >
                    <Phone className="h-5 w-5 text-red-500" />
                    <span>{restaurant.phone}</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                  >
                    <Mail className="h-5 w-5 text-red-500" />
                    <span>{restaurant.email}</span>
                  </motion.div>
                </div>
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
                  <div className="space-y-2">
                    {Object.entries(restaurant.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between text-sm">
                        <span className="font-medium">{day}</span>
                        <span className="text-gray-600">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews Summary Card */}
            <section className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {restaurant.reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.userImage}
                        alt={review.userName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{review.userName}</h3>
                          <span className="text-sm text-gray-500 flex-shrink-0">{review.date}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="mt-2 text-gray-600 text-sm line-clamp-3">{review.comment}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, MapPin, Star, Menu, X, Smartphone, Clock, CreditCard, ChefHat, Truck, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find restaurants by cuisine, location, or dietary preferences with our intelligent search system."
    },
    {
      icon: Smartphone,
      title: "Mobile Ordering",
      description: "Order your favorite meals anytime, anywhere with our intuitive mobile app."
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Track your order in real-time from the kitchen to your doorstep."
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Multiple secure payment options for hassle-free transactions."
    },
    {
      icon: ChefHat,
      title: "Top Restaurants",
      description: "Access to the best local restaurants and exclusive deals."
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable delivery service to get your food while it's hot."
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "We ensure the quality of food and service for every order."
    },
    {
      icon: Star,
      title: "Rewards Program",
      description: "Earn points with every order and get exclusive rewards."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">Foodo</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="/features" className="text-red-500">Features</a>
              <a href="/how-it-works" className="text-gray-600 hover:text-gray-900">How it works</a>
              <a href="/testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(true)}
                className="text-gray-600 hover:text-gray-900"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-25" onClick={() => setMenuOpen(false)}>
            <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg" onClick={e => e.stopPropagation()}>
              <div className="p-4">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                  <X className="h-6 w-6" />
                </button>
                <div className="mt-8 space-y-4">
                  <a href="/" className="block text-gray-600 hover:text-gray-900 py-2">Home</a>
                  <a href="/features" className="block text-red-500 py-2">Features</a>
                  <a href="/how-it-works" className="block text-gray-600 hover:text-gray-900 py-2">How it works</a>
                  <a href="/testimonials" className="block text-gray-600 hover:text-gray-900 py-2">Testimonials</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for a Better Food Experience
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover all the tools and features we offer to make your food ordering experience seamless and enjoyable.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
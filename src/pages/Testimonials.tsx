import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Food Enthusiast",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      content: "Foodo has completely changed how I discover and order from local restaurants. The interface is intuitive, and the delivery is always on time!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Restaurant Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      content: "As a restaurant owner, partnering with Foodo has helped us reach more customers and streamline our delivery process. It's been a game-changer for our business.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Regular Customer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      content: "I love the variety of restaurants available on Foodo. The rewards program is great, and customer service is always helpful when needed.",
      rating: 4
    }
  ];

  const stats = [
    { label: "Happy Customers", value: "100K+" },
    { label: "Restaurant Partners", value: "500+" },
    { label: "Cities", value: "50+" },
    { label: "Daily Orders", value: "10K+" }
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
              <a href="/features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="/how-it-works" className="text-gray-600 hover:text-gray-900">How it works</a>
              <a href="/testimonials" className="text-red-500">Testimonials</a>
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
                  <a href="/features" className="block text-gray-600 hover:text-gray-900 py-2">Features</a>
                  <a href="/how-it-works" className="block text-gray-600 hover:text-gray-900 py-2">How it works</a>
                  <a href="/testimonials" className="block text-red-500 py-2">Testimonials</a>
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
              What Our Users Say
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our community has to say about their Foodo experience.
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="bg-red-500 py-12 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-red-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-red-500 opacity-50" />
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
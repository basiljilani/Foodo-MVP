import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, ArrowRight, Menu, X, Facebook, Twitter, Instagram, 
  Mail, Phone, MapPin as Location, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const footerLinks = {
    foodo: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Partner with Us', href: '#' },
      { name: 'Blog', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Safety', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' }
    ],
    contact: [
      { icon: Mail, text: 'support@foodo.com' },
      { icon: Phone, text: '+1 (555) 123-4567' },
      { icon: Location, text: '123 Food Street, NY 10001' },
      { icon: Clock, text: 'Mon-Sun 24/7' }
    ],
    social: [
      { icon: Facebook, href: '#' },
      { icon: Twitter, href: '#' },
      { icon: Instagram, href: '#' }
    ]
  };

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
              <a href="/features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="/how-it-works" className="text-gray-600 hover:text-gray-900">How it works</a>
              <a href="/testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</a>
              <button
                onClick={() => navigate('/auth')}
                className="text-gray-600 hover:text-gray-900"
              >
                Log in
              </button>
              <button
                onClick={() => navigate('/auth')}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Get Started
              </button>
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
                  <a href="/features" className="block text-gray-600 hover:text-gray-900 py-2">Features</a>
                  <a href="/how-it-works" className="block text-gray-600 hover:text-gray-900 py-2">How it works</a>
                  <a href="/testimonials" className="block text-gray-600 hover:text-gray-900 py-2">Testimonials</a>
                  <button
                    onClick={() => navigate('/auth')}
                    className="block text-gray-600 hover:text-gray-900 py-2 w-full text-left"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => navigate('/auth')}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Discover and Connect with Local Restaurants
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your ultimate platform for finding and connecting directly with the best local eateries. No middleman, just pure food discovery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/auth')}
                  className="bg-red-500 text-white px-8 py-4 rounded-lg hover:bg-red-600 transition-colors text-lg font-semibold flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate('/auth')}
                  className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors text-lg font-semibold"
                >
                  Log in
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                  alt="Delicious food"
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Foodo Section */}
            <div>
              <div className="flex items-center mb-4">
                <ShoppingBag className="h-8 w-8 text-red-500" />
                <span className="ml-2 text-xl font-bold">Foodo</span>
              </div>
              <ul className="space-y-2">
                {footerLinks.foodo.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                {footerLinks.contact.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-400">
                    <item.icon className="h-5 w-5 mr-2" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {footerLinks.social.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">© 2025 Foodo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
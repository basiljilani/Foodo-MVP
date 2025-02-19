import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, MapPin, CreditCard, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const steps = [
    {
      icon: Search,
      title: "Find Your Restaurant",
      description: "Browse through our curated list of restaurants or search for your favorites.",
      image: "https://images.unsplash.com/photo-1484659619207-9165d119dafe"
    },
    {
      icon: MapPin,
      title: "Choose Your Food",
      description: "Select from a wide variety of dishes and customize your order.",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828"
    },
    {
      icon: CreditCard,
      title: "Place Your Order",
      description: "Securely pay for your order using your preferred payment method.",
      image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Track your order in real-time as it makes its way to you.",
      image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866"
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
              <a href="/features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="/how-it-works" className="text-red-500">How it works</a>
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
                  <a href="/features" className="block text-gray-600 hover:text-gray-900 py-2">Features</a>
                  <a href="/how-it-works" className="block text-red-500 py-2">How it works</a>
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
              How Foodo Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting your favorite food delivered is easier than ever. Follow these simple steps to get started.
            </p>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-12`}
              >
                <div className="flex-1">
                  <div className="max-w-lg">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                      <step.icon className="h-6 w-6 text-red-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h2>
                    <p className="text-xl text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
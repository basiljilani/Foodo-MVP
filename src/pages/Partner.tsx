import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChefHat, TrendingUp, Users, Clock, Percent } from 'lucide-react';
import Layout from '../components/Layout';

export default function Partner() {
  const features = [
    {
      icon: Percent,
      title: "100% Revenue is Yours",
      description: "Keep all your sales revenue. No commission fees, just a simple subscription."
    },
    {
      icon: TrendingUp,
      title: "Boost Your Visibility",
      description: "Get discovered by thousands of hungry customers in your area."
    },
    {
      icon: Users,
      title: "Loyal Customer Base",
      description: "Access our growing community of food enthusiasts and repeat customers."
    },
    {
      icon: Clock,
      title: "Quick Onboarding",
      description: "Get started in less than 24 hours with our streamlined setup process."
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "20",
      description: "Perfect for new restaurants testing the waters",
      features: [
        "List your restaurant on Foodo",
        "Basic restaurant profile",
        "Menu management tools",
        "Customer support",
        "Basic analytics",
        "Up to 50 orders/month"
      ],
      popular: false
    },
    {
      name: "Growth",
      price: "50",
      description: "Ideal for established restaurants looking to expand",
      features: [
        "Everything in Starter, plus:",
        "Featured in search results",
        "Advanced analytics",
        "Priority customer support",
        "Marketing tools",
        "Unlimited orders"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "100",
      description: "For restaurants that want the complete package",
      features: [
        "Everything in Growth, plus:",
        "Premium placement in search",
        "Dedicated account manager",
        "Custom promotions",
        "Advanced marketing tools",
        "API access"
      ],
      popular: false
    }
  ];

  return (
    <Layout>
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="relative bg-[#0A192F] text-white py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Partner with Foodo and{" "}
                  <span className="text-[#FF3838]">Grow Your Restaurant</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                  Join the revolution in food delivery. Keep 100% of your revenue and pay only a simple monthly subscription.
                </p>
                <button className="bg-[#FF3838] hover:bg-[#FF4D4D] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Get Started Today
                </button>
              </motion.div>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Why Partner with Foodo?
                </h2>
                <p className="text-xl text-gray-600">
                  We're revolutionizing the food delivery industry with a fair, transparent model
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <feature.icon className="w-12 h-12 text-[#FF3838] mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Simple, Transparent Pricing
                </h2>
                <p className="text-xl text-gray-600">
                  Choose the plan that best fits your restaurant's needs
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                      plan.popular ? 'ring-2 ring-[#FF3838]' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-[#FF3838] text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline mb-4">
                        <span className="text-4xl font-bold text-gray-900">$</span>
                        <span className="text-6xl font-bold text-gray-900">
                          {plan.price}
                        </span>
                        <span className="text-gray-600 ml-2">/month</span>
                      </div>
                      <p className="text-gray-600 mb-6">{plan.description}</p>
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <Check className="w-5 h-5 text-[#FF3838] mr-3 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                          plan.popular
                            ? 'bg-[#FF3838] text-white hover:bg-[#FF4D4D]'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        Choose {plan.name}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-[#0A192F] text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Grow Your Restaurant Business?
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                  Join thousands of successful restaurants already partnering with Foodo
                </p>
                <button className="bg-[#FF3838] hover:bg-[#FF4D4D] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Partner with Us Today
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

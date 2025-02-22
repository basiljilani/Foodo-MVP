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

  const pricingPlans = [
    {
      name: "Basic",
      price: "6,000",
      description: "Perfect for small restaurants just getting started",
      features: [
        "Basic restaurant profile",
        "Menu management",
        "Order management",
        "Customer reviews",
        "Basic analytics"
      ],
      recommended: false
    },
    {
      name: "Pro",
      price: "14,000",
      description: "Ideal for growing restaurants with regular orders",
      features: [
        "Everything in Basic",
        "Priority customer support",
        "Advanced analytics",
        "Marketing tools",
        "Inventory management"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "28,000",
      description: "For established restaurants with high order volume",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced marketing tools",
        "Multi-location support"
      ],
      recommended: false
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

          {/* Pricing Plans */}
          <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
                <p className="mt-4 text-lg text-gray-600">Choose the plan that best fits your business needs</p>
              </div>

              <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
                {pricingPlans.map((plan) => (
                  <div 
                    key={plan.name} 
                    className={`relative bg-white border ${
                      plan.recommended 
                        ? 'border-red-200 ring-2 ring-red-500' 
                        : 'border-gray-200'
                    } rounded-3xl shadow-sm divide-y divide-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-5 inset-x-0 flex justify-center">
                        <span className="inline-flex rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-600">
                          Recommended
                        </span>
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                      <p className="mt-4 text-sm text-gray-500 min-h-[40px]">{plan.description}</p>
                      <div className="mt-8 flex items-baseline">
                        <span className="text-2xl font-medium text-gray-900">Rs.</span>
                        <span className="text-5xl font-bold tracking-tight text-gray-900 ml-1">{plan.price}</span>
                        <span className="text-base font-medium text-gray-500 ml-2">/month</span>
                      </div>
                      <button
                        className={`mt-8 block w-full border border-transparent rounded-2xl py-3 text-sm font-semibold text-center transition-colors duration-300 ${
                          plan.recommended
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        Get started with {plan.name}
                      </button>
                    </div>
                    <div className="px-8 pt-6 pb-8">
                      <h4 className="text-sm font-medium text-gray-900">What's included</h4>
                      <ul className="mt-6 space-y-4">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex space-x-3">
                            <Check className={`flex-shrink-0 h-5 w-5 ${plan.recommended ? 'text-red-500' : 'text-green-500'}`} aria-hidden="true" />
                            <span className="text-sm text-gray-500">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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

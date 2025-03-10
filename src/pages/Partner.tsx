import { motion } from 'framer-motion';
import { Check, TrendingUp, Users, Clock, Percent, Award, Rocket, BarChart, Star, Briefcase } from 'lucide-react';
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

  const premiumFeatures = [
    "Complete restaurant profile with custom branding",
    "Full menu management system with real-time updates",
    "Order processing & tracking with customer notifications",
    "Customer reviews & ratings integration",
    "Advanced analytics dashboard",
    "Marketing toolkit with promotional tools",
    "Inventory management system",
    "24/7 Priority technical support",
    "Dedicated account manager"
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-[#0A192F] -mb-16">
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
          <div className="py-20 bg-[#0A192F] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Why Partner with Foodo?
                </h2>
                <p className="text-xl text-gray-300">
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
                    className="bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-700"
                  >
                    <feature.icon className="w-12 h-12 text-[#FF3838] mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="py-24 bg-[#0A192F] text-white border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-[#FF3838] text-white mb-6">
                    <Award className="w-4 h-4 mr-1.5" /> Corporate Social Responsibility Initiative
                  </span>
                  <h2 className="text-5xl font-extrabold mb-4 text-white">Premium Partnership Platform</h2>
                  <div className="h-1 w-24 bg-[#FF3838] mx-auto my-6 rounded-full"></div>
                  <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
                    Enterprise-grade restaurant technology now available at <span className="text-[#FF3838] font-bold">zero cost</span> through our commitment to community growth.
                  </p>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-4xl mx-auto bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-[#FF3838]/30"
              >
                <div className="relative">
                  {/* Premium badge */}
                  <div className="absolute -right-12 top-7 transform rotate-45 bg-[#FF3838] text-white py-1 px-14 text-xs font-bold shadow-lg">
                    CSR INITIATIVE
                  </div>
                  
                  <div className="p-10 border-b border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <div>
                        <h3 className="text-3xl font-bold text-white">Enterprise Partnership</h3>
                        <p className="mt-2 text-gray-400">Complete platform for restaurants of all sizes</p>
                      </div>
                      <div className="mt-6 md:mt-0 text-right">
                        <div className="flex flex-col items-end">
                          <div className="flex items-baseline">
                            <span className="text-5xl font-extrabold text-[#FF3838]">FREE</span>
                            <span className="ml-2 text-lg text-gray-400">forever</span>
                          </div>
                          <div className="mt-1 text-sm text-[#FF3838] font-medium">Part of our CSR Program</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <button className="w-full bg-[#FF3838] hover:bg-[#FF4D4D] text-white py-4 px-6 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
                        Apply for Partnership
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-10">
                    <h4 className="text-lg font-semibold text-white mb-6">Everything you need to succeed</h4>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {premiumFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#FF3838] flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" aria-hidden="true" />
                          </div>
                          <span className="ml-3 text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-10 bg-gray-900 p-6 rounded-xl border border-gray-700">
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 rounded-full bg-[#FF3838]/20 flex items-center justify-center mr-4">
                          <Briefcase className="h-5 w-5 text-[#FF3838]" />
                        </div>
                        <h5 className="text-xl font-bold text-white">Why We're Making This Free</h5>
                      </div>
                      <p className="text-gray-400">
                        As part of our corporate social responsibility, we're committed to empowering local restaurants with enterprise-grade technology. By removing financial barriers, we aim to create economic opportunities, strengthen communities, and build a sustainable food ecosystem that benefits everyone.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="py-24 bg-[#0A192F] text-white border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-3xl font-bold text-white mb-6">Join Hundreds of Successful Restaurant Partners</h3>
                  <div className="flex flex-wrap justify-center gap-8 mt-8">
                    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-gray-700 w-64 flex flex-col items-center">
                      <Rocket className="h-10 w-10 text-[#FF3838] mb-2" />
                      <div className="text-2xl font-bold text-[#FF3838]">300+</div>
                      <div className="text-gray-400">Partner Restaurants</div>
                    </div>
                    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-gray-700 w-64 flex flex-col items-center">
                      <BarChart className="h-10 w-10 text-[#FF3838] mb-2" />
                      <div className="text-2xl font-bold text-[#FF3838]">40%</div>
                      <div className="text-gray-400">Average Revenue Growth</div>
                    </div>
                    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-gray-700 w-64 flex flex-col items-center">
                      <Star className="h-10 w-10 text-[#FF3838] mb-2" />
                      <div className="text-2xl font-bold text-[#FF3838]">4.8/5</div>
                      <div className="text-gray-400">Partner Satisfaction</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-[#0A192F] text-white py-20 border-t border-gray-800">
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

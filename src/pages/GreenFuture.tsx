import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TreePine, Leaf, Sprout, BatteryCharging, Recycle } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

export default function GreenFuture() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const successStories = [
    {
      title: "Urban Greening",
      partner: "Green Earth Restaurants",
      metric: "10,000+",
      unit: "Trees Planted",
      description: "Transforming urban spaces into thriving green zones",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=60",
      icon: <Sprout className="w-6 h-6" />,
      color: "emerald"
    },
    {
      title: "Zero Waste",
      partner: "EcoFriendly Foods",
      metric: "90%",
      unit: "Waste Reduced",
      description: "Leading the way in sustainable food packaging",
      image: "https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?w=800&auto=format&fit=crop&q=60",
      icon: <Recycle className="w-6 h-6" />,
      color: "teal"
    },
    {
      title: "Electric Fleet",
      partner: "GreenWheel Logistics",
      metric: "100%",
      unit: "Electric Vehicles",
      description: "Zero-emission food delivery network",
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=60",
      icon: <BatteryCharging className="w-6 h-6" />,
      color: "blue"
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 w-full h-full bg-gradient-to-b from-emerald-50/30 to-transparent"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-8">
          <div className="grid lg:grid-cols-12 lg:gap-x-8 items-start">
            <motion.div 
              className="lg:col-span-6 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-x-1 rounded-full bg-emerald-50 px-4 py-2 border border-emerald-100">
                <span className="text-sm font-medium text-emerald-600">Impact Together</span>
                <div className="mx-2 h-3.5 w-px bg-emerald-200" />
                <span className="text-sm font-medium text-emerald-600">$2.5M Raised</span>
              </div>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl xl:text-6xl">
                Building a <span className="text-emerald-600">Greener</span> Future Together
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-600 sm:text-xl max-w-xl">
                Join our community of change-makers in creating a sustainable food ecosystem. Every order contributes to environmental initiatives, and together we've already planted over 50,000 trees.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100 max-w-xl">
                <div className="flex items-center gap-3 text-emerald-700">
                  <Leaf className="h-5 w-5" />
                  <span className="text-sm font-medium">Your Impact</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  1% of every order goes towards local sustainability projects. Together, we've funded 20+ community gardens and supported 100+ local farmers.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors duration-200"
                >
                  Donate Now
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  See Our Impact <span className="ml-2" aria-hidden="true">→</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              className="mt-8 lg:mt-0 lg:col-span-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] lg:aspect-[3/2]">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60"
                  alt="Sustainability Impact"
                  className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              
              <motion.div 
                className="mt-4 bg-white rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <TreePine className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-gray-900">Monthly Impact</p>
                        <p className="text-sm text-gray-600">5,000+ Trees Planted</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-emerald-600">$25K</p>
                      <p className="text-sm text-gray-600">Donated This Month</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="relative py-16 bg-gray-50">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 w-full h-full bg-gradient-to-b from-white to-transparent"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.h2 
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Success Stories
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              See how we're making a real impact in communities and the environment
            </motion.p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {successStories.map((story, index) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10"></div>
                  <img
                    src={story.image}
                    alt={story.title}
                    className="absolute inset-0 h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <p className="text-white text-sm font-medium">{story.partner}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`h-12 w-12 rounded-full bg-${story.color}-100 flex items-center justify-center`}>
                      {story.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{story.title}</h3>
                      <p className="text-sm text-gray-600">{story.description}</p>
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold text-emerald-600">{story.metric}</p>
                      <p className="text-sm font-medium text-gray-600">{story.unit}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center rounded-xl bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors duration-200"
            >
              View All Stories
            </a>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}

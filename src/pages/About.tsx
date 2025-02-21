import React from 'react';
import { motion } from 'framer-motion';
import { Users, Utensils, Clock, Shield, Heart, Award } from 'lucide-react';
import Navigation from '../components/Navigation';
import Layout from '../components/Layout';

export default function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { number: '10M+', label: 'Happy Customers' },
    { number: '50K+', label: 'Restaurant Partners' },
    { number: '100+', label: 'Cities' },
    { number: '30min', label: 'Average Delivery Time' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make is centered around enhancing your dining experience.'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'We partner with restaurants that maintain the highest standards of food quality.'
    },
    {
      icon: Clock,
      title: 'Lightning Fast',
      description: 'Our efficient delivery network ensures your food arrives hot and fresh.'
    },
    {
      icon: Award,
      title: 'Best in Class',
      description: 'Award-winning service that sets new standards in food delivery.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-founder',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO & Co-founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'
    },
    {
      name: 'Aisha Patel',
      role: 'COO',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=500&fit=crop'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <Navigation />
        
        {/* Hero Section */}
        <motion.section 
          className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              {...fadeIn}
            >
              Revolutionizing Food Delivery
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              We're on a mission to transform the way people experience food delivery,
              making it more convenient, reliable, and enjoyable than ever before.
            </motion.p>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-2">
                    {stat.number}
                  </h2>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Values
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-block p-3 bg-red-50 rounded-full mb-4">
                      <Icon className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Meet Our Team
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Our Mission
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                To create a world where everyone can enjoy their favorite meals,
                delivered right to their doorstep, while supporting local restaurants
                and creating opportunities for delivery partners.
              </motion.p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

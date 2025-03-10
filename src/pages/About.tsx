import { motion } from 'framer-motion';
import { Heart, Shield, Coffee, Globe, Users, Utensils, Building, Leaf, MapPin, Star, Clock, Award } from 'lucide-react';
import Layout from '../components/Layout';

export default function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { number: '1000+', label: 'Local Restaurants', icon: Utensils },
    { number: '50+', label: 'Hidden Gems Discovered', icon: Star },
    { number: '20+', label: 'Cities', icon: MapPin },
    { number: '0%', label: 'Platform Fees', icon: Award }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Community First',
      description: 'We put the needs of local restaurants and customers at the center of everything we do.'
    },
    {
      icon: Shield,
      title: 'Zero Commission',
      description: 'We don\'t charge restaurants commission fees, allowing them to thrive in the digital marketplace.'
    },
    {
      icon: Coffee,
      title: 'Preserving Legacy',
      description: 'We help generational food businesses maintain their heritage while reaching new audiences.'
    },
    {
      icon: Globe,
      title: 'Connecting Communities',
      description: 'We bridge the gap between culinary traditions and modern technology.'
    }
  ];

  const pillars = [
    {
      icon: Users,
      title: 'Nourishing Communities',
      description: 'We believe food brings people together, transcending boundaries and telling the stories of our communities.'
    },
    {
      icon: Utensils,
      title: 'More Than Just Delivery',
      description: 'We\'re a movement toward a more equitable digital ecosystem and a celebration of local food culture.'
    },
    {
      icon: Building,
      title: 'Corporate Social Responsibility',
      description: 'We measure success by the vibrancy we bring to local food scenes and the connections we foster.'
    },
    {
      icon: Leaf,
      title: 'Technology That Serves',
      description: 'We\'re creating a world where technology serves people and business serves community.'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        
        {/* Hero Section */}
        <motion.section 
          className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
              {...fadeIn}
            >
              About <span className="text-red-600">Foodo</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-red-500 max-w-3xl mx-auto font-medium"
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              Nourishing Communities, Connecting Hearts
            </motion.p>
            <motion.div 
              className="mt-10 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="h-1 w-32 bg-red-600 mx-auto"></div>
            </motion.div>
          </div>
        </motion.section>

        {/* Vision Statement */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="prose prose-lg mx-auto text-center"
            >
              <div className="bg-white shadow-lg rounded-lg p-10 border-l-4 border-red-600 transform hover:shadow-xl transition-all duration-300">
                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
                  At Foodo, we believe that food is more than sustenance—it's a universal language that brings people together, transcends boundaries, and tells the stories of our communities. Born from a vision to create meaningful connections between local restaurants and the neighbors they serve, Foodo represents a revolutionary approach to food delivery that puts people before profit.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projected Impact Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold inline-block relative text-gray-900">
                Projected Impact
                <div className="h-1 w-full bg-red-600 absolute bottom-0 left-0 transform translate-y-2"></div>
              </h2>
              <p className="mt-8 text-lg text-gray-600 max-w-3xl mx-auto">
                By 2025, we aim to revolutionize the food delivery ecosystem with these ambitious goals:
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="relative bg-white rounded-lg shadow-md overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <Icon className="w-7 h-7 text-red-600" />
                        </div>
                        <div className="h-12 w-1 bg-gray-100 rounded-full"></div>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-bold text-red-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                        {stat.number}
                      </h3>
                      <p className="text-gray-700 font-medium text-lg">{stat.label}</p>
                      <div className="mt-4 h-1 w-16 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500">
                        {index === 0 && "Supporting local culinary diversity across communities"}
                        {index === 1 && "Uncovering unique dining experiences for our users"}
                        {index === 2 && "Expanding our reach to connect more communities"}
                        {index === 3 && "Maintaining our commitment to zero platform fees"}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-16 bg-white p-8 rounded-lg shadow-md border-l-4 border-red-600"
            >
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Long-term Vision</h3>
                  <p className="text-gray-600">
                    Our metrics go beyond numbers—we measure success by the strength of communities, 
                    the sustainability of local restaurants, and the connections we foster between people.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <a 
                    href="/impact-report" 
                    className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg 
                    font-medium transition-all duration-300 group"
                  >
                    <span>View Full Impact Report</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Purpose Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold inline-block relative text-gray-900">
                  Our Purpose
                  <div className="h-1 w-full bg-red-600 absolute bottom-0 left-0 transform translate-y-2"></div>
                </h2>
              </motion.div>
              <motion.div 
                className="text-lg text-gray-700 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-white shadow-lg rounded-lg p-10 border-t-4 border-red-600 transform hover:shadow-xl transition-all duration-300">
                  <p className="leading-relaxed text-lg text-gray-800">
                    In a world where digital platforms often create barriers through fees and commissions, we chose a different path. Foodo was founded on a simple yet powerful idea: what if technology could truly serve communities without adding financial burden to either restaurants or customers?
                  </p>
                  <div className="flex items-center justify-center my-8">
                    <div className="h-0.5 w-16 bg-gray-200"></div>
                    <div className="mx-4">
                      <Heart className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="h-0.5 w-16 bg-gray-200"></div>
                  </div>
                  <p className="leading-relaxed text-lg text-gray-800">
                    This question led us to create a platform that stands apart in the digital marketplace—one where restaurants can showcase their culinary artistry without paying hosting fees, and where customers can discover and enjoy local flavors without platform charges eating into their budget or the restaurant's margins.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Four Pillars Section */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold inline-block relative">
                Our Four Pillars
                <div className="h-1 w-full bg-red-600 absolute bottom-0 left-0 transform translate-y-2"></div>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center text-center p-8 rounded-lg bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-red-600 h-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-block p-5 bg-gray-700 rounded-full mb-6">
                      <Icon className="w-10 h-10 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{pillar.title}</h3>
                    <p className="text-gray-300">{pillar.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* More Than Just Delivery Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold inline-block relative text-gray-900">
                  More Than Just Delivery
                  <div className="h-1 w-full bg-red-600 absolute bottom-0 left-0 transform translate-y-2"></div>
                </h2>
              </motion.div>
              <motion.div 
                className="text-lg text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-white shadow-lg rounded-lg p-10 border-r-4 border-red-600 transform hover:shadow-xl transition-all duration-300">
                  <p className="leading-relaxed text-lg text-gray-800">
                    Foodo isn't just another food delivery app. It's a movement toward a more equitable digital ecosystem and a celebration of local food culture. We understand that behind every restaurant is a dream, a family legacy, or a passionate chef with a story to tell. By removing financial barriers to digital presence, we're helping these stories reach more tables and touch more lives.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold inline-block relative text-gray-900">
                Our Values
                <div className="h-1 w-full bg-red-600 absolute bottom-0 left-0 transform translate-y-2"></div>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    className="text-center p-8 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-red-600 h-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-block p-5 bg-gray-100 rounded-full mb-6">
                      <Icon className="w-10 h-10 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Commitment Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold inline-block relative text-gray-900">
                  Our Commitment
                  <div className="h-1 w-full bg-red-600 absolute bottom-0 left-0 transform translate-y-2"></div>
                </h2>
              </motion.div>
              <motion.div 
                className="text-lg text-gray-700 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-white shadow-lg rounded-lg p-10 border-l-4 border-red-600 transform hover:shadow-xl transition-all duration-300">
                  <p className="leading-relaxed text-lg text-gray-800">
                    As a Corporate Social Responsibility initiative, Foodo represents our deepest commitment to the communities we serve. We measure our success not by profit margins but by the vibrancy we bring to local food scenes, the economic opportunities we help create, and the connections we foster between people who make food and those who enjoy it.
                  </p>
                  <div className="flex items-center justify-center my-8">
                    <div className="h-0.5 w-16 bg-gray-200"></div>
                    <div className="mx-4">
                      <Building className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="h-0.5 w-16 bg-gray-200"></div>
                  </div>
                  <p className="leading-relaxed text-lg text-gray-800">
                    We've seen firsthand how small businesses struggle to keep up with technology costs while maintaining quality and affordability. By absorbing these costs ourselves, we're investing in the cultural and economic health of our communities—a return that goes far beyond financial statements.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Join Our Table Section */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold inline-block relative">
                  Join Our Table
                  <div className="h-1 w-full bg-red-600 absolute bottom-0 left-0 transform translate-y-2"></div>
                </h2>
              </motion.div>
              <motion.div 
                className="text-lg space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-800 shadow-lg rounded-lg p-10 border-b-4 border-red-600 transform hover:shadow-xl transition-all duration-300">
                  <p className="leading-relaxed text-lg text-gray-300">
                    When you choose Foodo, you're not just ordering a meal—you're participating in a community-centered vision of how technology can serve humanity. You're supporting local restaurants directly, helping them thrive in a digital age without compromise.
                  </p>
                  <div className="flex items-center justify-center my-8">
                    <div className="h-0.5 w-16 bg-gray-600"></div>
                    <div className="mx-4">
                      <Utensils className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="h-0.5 w-16 bg-gray-600"></div>
                  </div>
                  <p className="leading-relaxed text-lg text-gray-300">
                    We invite you to join us at this table we've set—where technology serves people, where business serves community, and where every meal delivered represents a step toward a more connected, compassionate world.
                  </p>
                  <div className="flex items-center justify-center my-8">
                    <div className="h-0.5 w-16 bg-gray-600"></div>
                    <div className="mx-4">
                      <Heart className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="h-0.5 w-16 bg-gray-600"></div>
                  </div>
                  <p className="font-medium text-xl mt-6 text-red-500">
                    Together, we're not just delivering food. We're delivering on a promise of what business can be when it puts heart at the center of its mission.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-16"
              >
                <a 
                  href="/partner" 
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-12 py-5 rounded-lg 
                  text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Partner With Us
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

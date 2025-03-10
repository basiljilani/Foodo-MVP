import { useNavigate } from 'react-router-dom';
import { Search, MapPin, CreditCard, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

export default function HowItWorks() {
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
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-red-50 to-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
                >
                  How <span className="text-red-500">Foodo</span> Works
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-6 max-w-2xl mx-auto text-xl text-gray-500"
                >
                  Delivering happiness to your doorstep in four simple steps.
                </motion.p>
              </div>
            </div>
          </section>

          {/* Steps Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {steps.map((step, index) => (
                  <motion.div 
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col md:flex-row items-start md:items-center"
                  >
                    <div className="bg-red-100 rounded-full p-4 mb-4 md:mb-0 md:mr-6">
                      <step.icon className="h-8 w-8 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      <p className="mt-2 text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Image Gallery */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">See Foodo in Action</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, index) => (
                  <motion.div 
                    key={step.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="overflow-hidden rounded-lg shadow-lg"
                  >
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-red-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Order?</h2>
              <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
                Join thousands of satisfied customers who are already enjoying delicious meals delivered right to their doorstep.
              </p>
              <button 
                onClick={() => navigate('/')}
                className="bg-white text-red-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-colors shadow-lg"
              >
                Order Now
              </button>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
import { useState } from 'react';
import { Search, ChevronDown, HelpCircle, FileText, MessageCircle, Phone, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>("Ordering");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const faqs = [
    {
      category: "Ordering",
      questions: [
        {
          id: "order-1",
          question: "How do I place an order?",
          answer: "You can place an order by selecting a restaurant, choosing your items, and proceeding to checkout. Make sure you're logged in to your account."
        },
        {
          id: "order-2",
          question: "Can I modify my order after placing it?",
          answer: "You can modify your order within 5 minutes of placing it. After that, please contact the restaurant directly."
        },
        {
          id: "order-3",
          question: "What payment methods are accepted?",
          answer: "We accept credit/debit cards, digital wallets, and cash on delivery in select areas."
        }
      ]
    },
    {
      category: "Delivery",
      questions: [
        {
          id: "delivery-1",
          question: "How long will my delivery take?",
          answer: "Delivery times vary based on distance, traffic, and restaurant preparation time. You can see the estimated delivery time before placing your order."
        },
        {
          id: "delivery-2",
          question: "Do you deliver to my area?",
          answer: "We deliver to most areas within city limits. You can check delivery availability by entering your address."
        }
      ]
    },
    {
      category: "Account",
      questions: [
        {
          id: "account-1",
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button and follow the prompts to create your account. You'll need to provide your email and create a password."
        },
        {
          id: "account-2",
          question: "How can I reset my password?",
          answer: "Click 'Forgot Password' on the login page and follow the instructions sent to your email."
        }
      ]
    }
  ];

  const helpResources = [
    {
      id: 1,
      title: "Getting Started Guide",
      description: "Learn how to use our platform effectively",
      icon: FileText,
      link: "#"
    },
    {
      id: 2,
      title: "FAQ & Troubleshooting",
      description: "Find answers to common questions",
      icon: HelpCircle,
      link: "#"
    },
    {
      id: 3,
      title: "Contact Support",
      description: "Get help from our support team",
      icon: MessageCircle,
      link: "#"
    },
    {
      id: 4,
      title: "24/7 Hotline",
      description: "Call us anytime for assistance",
      icon: Phone,
      link: "#"
    }
  ];

  const filteredFaqs = searchQuery
    ? faqs.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqs;

  return (
    <Layout>
      <div className="min-h-screen bg-white -mb-16">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                How Can We Help You?
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                Search our help center or browse frequently asked questions
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-xl 
                  text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 
                  transition-all duration-300 text-lg shadow-sm"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Help Resources Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold text-center mb-12 text-gray-900"
            >
              Help Resources
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {helpResources.map((resource, index) => (
                <motion.a
                  key={resource.id}
                  href={resource.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-white rounded-xl p-6 hover:bg-gray-50 transition-all duration-300 
                  border border-gray-200 hover:border-red-500 group flex flex-col h-full shadow-sm hover:shadow-md"
                >
                  <div className="p-3 bg-red-500 rounded-lg inline-flex mb-4 w-min">
                    <resource.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-red-500 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    {resource.description}
                  </p>
                  <div className="flex items-center text-red-500 font-medium">
                    <span>Learn more</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-center mb-12 text-gray-900"
            >
              Frequently Asked Questions
            </motion.h2>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center mb-8 gap-2">
              {faqs.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setActiveCategory(category.category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                  ${activeCategory === category.category 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {category.category}
                </button>
              ))}
            </div>

            {/* Questions and Answers */}
            <div className="space-y-4">
              {filteredFaqs.map((category) => (
                <AnimatePresence key={category.category}>
                  {(activeCategory === category.category || searchQuery) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {searchQuery && (
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">
                          {category.category}
                        </h3>
                      )}
                      
                      <div className="space-y-3">
                        {category.questions.map((faq) => (
                          <motion.div 
                            key={faq.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                          >
                            <button
                              onClick={() => setOpenQuestion(openQuestion === faq.id ? null : faq.id)}
                              className="w-full flex items-center justify-between p-5 text-left"
                            >
                              <span className="font-medium text-gray-900">{faq.question}</span>
                              <ChevronDown
                                className={`h-5 w-5 text-gray-500 transition-transform duration-300
                                ${openQuestion === faq.id ? 'transform rotate-180' : ''}`}
                              />
                            </button>
                            
                            <AnimatePresence>
                              {openQuestion === faq.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="border-t border-gray-200"
                                >
                                  <div className="p-5 text-gray-600">
                                    {faq.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>
            
            {/* No Results Message */}
            {searchQuery && filteredFaqs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10"
              >
                <p className="text-xl text-gray-700">No results found for "{searchQuery}"</p>
                <p className="text-gray-500 mt-2">Try a different search term or browse our categories</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Still Need Help?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Our support team is available 24/7 to assist you with any questions or concerns
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl 
                text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center mx-auto shadow-md">
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Support
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
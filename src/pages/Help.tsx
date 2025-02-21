import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import Navigation from '../components/Navigation';
import { ShoppingBag, User, Menu, X, ChevronDown as ChevronDownIcon, HelpCircle, FileText, MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

export default function Help() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSection, setOpenSection] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const guides = [
    {
      id: 1,
      title: "Getting Started Guide",
      description: "Learn how to use our platform effectively",
      icon: FileText
    },
    {
      id: 2,
      title: "FAQ & Troubleshooting",
      description: "Find answers to common questions",
      icon: HelpCircle
    },
    {
      id: 3,
      title: "Contact Support",
      description: "Get help from our support team",
      icon: MessageCircle
    },
    {
      id: 4,
      title: "24/7 Hotline",
      description: "Call us anytime for assistance",
      icon: Phone
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How can we help you?
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Search our help center or browse frequently asked questions
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow text-lg"
                />
                <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Quick Help Guides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {guides.map((guide) => (
              <motion.button
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <guide.icon className="h-8 w-8 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-gray-600">{guide.description}</p>
              </motion.button>
            ))}
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((section) => (
                <div key={section.category} className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.category}</h3>
                  <div className="space-y-4">
                    {section.questions.map((faq) => (
                      <div key={faq.id} className="rounded-lg border border-gray-200">
                        <button
                          onClick={() => setOpenSection(openSection === faq.id ? null : faq.id)}
                          className="w-full flex items-center justify-between p-4 text-left"
                        >
                          <span className="font-medium text-gray-900">{faq.question}</span>
                          <ChevronDownIcon
                            className={`h-5 w-5 text-gray-500 transition-transform ${
                              openSection === faq.id ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        {openSection === faq.id && (
                          <div className="px-4 pb-4 text-gray-600">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
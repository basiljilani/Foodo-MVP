import React, { useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ChevronLeft, ArrowRight, Store } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    updateNotes, 
    clearCart, 
    getCartTotal,
    getItemsByRestaurant
  } = useCart();
  
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  const groupedItems = getItemsByRestaurant();
  const cartTotal = getCartTotal();
  const deliveryFee = 2.99;
  const serviceFee = cartTotal * 0.05; // 5% service fee
  const tax = cartTotal * 0.1; // 10% tax
  const totalAmount = cartTotal + deliveryFee + serviceFee + tax;
  
  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="pt-16 min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h2>
              <p className="mt-1 text-sm text-gray-500">Start adding some delicious items to your cart!</p>
              <div className="mt-6">
                <Link 
                  to="/" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Browse Restaurants
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
            <p className="text-sm text-gray-500">Review and modify your order before checkout</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
                    <button 
                      onClick={clearCart}
                      className="text-sm text-red-600 hover:text-red-800 flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear Cart
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {Object.entries(groupedItems).map(([restaurantId, restaurantItems]) => (
                      <div key={restaurantId} className="border border-gray-100 rounded-lg overflow-hidden">
                        {/* Restaurant Header */}
                        <div className="bg-gray-50 p-4 flex items-center">
                          <Store className="h-5 w-5 text-gray-500 mr-2" />
                          <h3 className="text-md font-medium text-gray-900">
                            {restaurantItems[0].restaurantName}
                          </h3>
                        </div>
                        
                        {/* Restaurant Items */}
                        <div className="divide-y divide-gray-100">
                          {restaurantItems.map((item) => (
                            <motion.div 
                              key={item.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center justify-between p-4"
                            >
                              <div className="flex items-center space-x-4">
                                {item.image && (
                                  <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                                    <img 
                                      src={item.image} 
                                      alt={item.name} 
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                )}
                                
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                  <p className="text-sm text-gray-500">Rs. {item.price.toFixed(2)}</p>
                                  {item.notes && (
                                    <p className="text-xs text-gray-400 mt-1">Note: {item.notes}</p>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center border border-gray-200 rounded-md">
                                  <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 text-gray-500 hover:text-gray-700"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <span className="px-2 py-1 text-sm">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 text-gray-500 hover:text-gray-700"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>
                                
                                <div className="text-sm font-medium text-gray-900">
                                  Rs. {(item.price * item.quantity).toFixed(2)}
                                </div>
                                
                                <button 
                                  onClick={() => removeItem(item.id)}
                                  className="text-gray-400 hover:text-red-600"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <label htmlFor="special-instructions" className="block text-sm font-medium text-gray-700 mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      id="special-instructions"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      placeholder="Any special requests or delivery instructions?"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Link 
                  to="/"
                  className="inline-flex items-center text-sm text-red-600 hover:text-red-800"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="text-gray-900">Rs. {cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Delivery Fee</span>
                      <span className="text-gray-900">Rs. {deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Service Fee</span>
                      <span className="text-gray-900">Rs. {serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tax</span>
                      <span className="text-gray-900">Rs. {tax.toFixed(2)}</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="text-base font-medium text-gray-900">Total</span>
                        <span className="text-base font-medium text-gray-900">Rs. {totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

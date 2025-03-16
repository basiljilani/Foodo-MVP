import React, { useState } from 'react';
import { ChevronLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getCartTotal, getItemsByRestaurant, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const groupedItems = getItemsByRestaurant();
  const cartTotal = getCartTotal();
  const deliveryFee = 2.99;
  const serviceFee = cartTotal * 0.05; // 5% service fee
  const tax = cartTotal * 0.1; // 10% tax
  const totalAmount = cartTotal + deliveryFee + serviceFee + tax;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!deliveryAddress || !contactNumber) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Simulate order processing
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      
      // Clear cart after successful order
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 3000);
    }, 2000);
  };
  
  if (items.length === 0 && !orderComplete) {
    // Redirect to cart if there are no items
    navigate('/cart');
    return null;
  }
  
  if (orderComplete) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="mt-3 text-lg font-medium text-gray-900">Order Placed Successfully!</h2>
              <p className="mt-1 text-sm text-gray-500">Your order has been placed and is being processed.</p>
              <p className="mt-1 text-sm text-gray-500">You will receive a confirmation shortly.</p>
              <div className="mt-6">
                <Link 
                  to="/" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Return to Home
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
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <p className="text-sm text-gray-500">Complete your order</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Delivery Information */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Delivery Address *
                        </label>
                        <textarea
                          id="address"
                          rows={3}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          placeholder="Enter your full delivery address"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          placeholder="Enter your phone number"
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          id="card"
                          name="payment-method"
                          type="radio"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                        />
                        <label htmlFor="card" className="ml-3 flex items-center text-sm font-medium text-gray-700">
                          <CreditCard className="h-5 w-5 mr-2 text-gray-400" />
                          Credit/Debit Card
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="cash"
                          name="payment-method"
                          type="radio"
                          checked={paymentMethod === 'cash'}
                          onChange={() => setPaymentMethod('cash')}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                        />
                        <label htmlFor="cash" className="ml-3 flex items-center text-sm font-medium text-gray-700">
                          Cash on Delivery
                        </label>
                      </div>
                      
                      {paymentMethod === 'card' && (
                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                          <div>
                            <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              id="card-number"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                id="expiry"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                placeholder="MM/YY"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                              </label>
                              <input
                                type="text"
                                id="cvv"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link 
                    to="/cart" 
                    className="inline-flex items-center text-sm text-red-600 hover:text-red-800"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back to Cart
                  </Link>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                  
                  <div className="max-h-60 overflow-y-auto mb-4">
                    {Object.entries(groupedItems).map(([restaurantId, restaurantItems]) => (
                      <div key={restaurantId} className="mb-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">
                          {restaurantItems[0].restaurantName}
                        </h3>
                        
                        <div className="space-y-2">
                          {restaurantItems.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-gray-500">
                                {item.quantity} x {item.name}
                              </span>
                              <span className="text-gray-900">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
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
                      type="submit"
                      onClick={handleSubmit}
                      disabled={isProcessing}
                      className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                        isProcessing ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
                    <Shield className="h-4 w-4" />
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Truck className="h-5 w-5 mr-2 text-gray-400" />
                    <span>Estimated delivery time: 30-45 minutes</span>
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

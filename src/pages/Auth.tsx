import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ChevronRight, ArrowRight } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isCustomer, setIsCustomer] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const navigate = useNavigate();
  const { signIn, signUp, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !fullName)) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      if (isLogin) {
        await signIn(email, password);
        toast.success('Welcome back!');
      } else {
        await signUp(email, password, isCustomer ? 'customer' : 'vendor');
        toast.success('Account created successfully!');
      }
      navigate('/profile');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
          <div className="text-center">
            <motion.h2 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              {isLogin ? 'Welcome Back!' : 'Join Foodo'}
            </motion.h2>
            <p className="text-orange-600 text-lg">
              {isLogin ? 'Delicious food awaits you' : 'Start your culinary journey'}
            </p>
          </div>

          {!isLogin && (
            <div className="flex justify-center space-x-4 p-2 bg-orange-50 rounded-lg">
              <button
                onClick={() => setIsCustomer(true)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isCustomer 
                    ? 'bg-orange-500 text-white shadow-md' 
                    : 'text-orange-700 hover:bg-orange-100'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => setIsCustomer(false)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  !isCustomer 
                    ? 'bg-orange-500 text-white shadow-md' 
                    : 'text-orange-700 hover:bg-orange-100'
                }`}
              >
                Restaurant Owner
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="fullName" className="sr-only">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-orange-200 rounded-xl focus:ring-orange-500 focus:border-orange-500 bg-white placeholder-gray-400"
                    placeholder="Full Name"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-orange-200 rounded-xl focus:ring-orange-500 focus:border-orange-500 bg-white placeholder-gray-400"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-orange-200 rounded-xl focus:ring-orange-500 focus:border-orange-500 bg-white placeholder-gray-400"
                  placeholder="Password"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </motion.button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-orange-600 hover:text-orange-700 font-medium flex items-center justify-center w-full"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
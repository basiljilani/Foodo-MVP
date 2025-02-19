import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Store } from 'lucide-react';

export default function Auth() {
  const [userType, setUserType] = useState<'customer' | 'vendor' | null>(null);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [cuisine, setCuisine] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle authentication here
    if (userType === 'vendor') {
      navigate('/vendor/dashboard');
    } else {
      navigate('/home');
    }
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center"
              >
                <ShoppingBag className="h-8 w-8 text-red-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">Foodo</span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Welcome to Foodo</h2>
              <p className="mt-2 text-gray-600">Choose how you want to use Foodo</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setUserType('customer')}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <User className="h-8 w-8 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">I'm a Customer</h3>
                <p className="text-gray-600">Order food from your favorite restaurants</p>
              </button>
              <button
                onClick={() => setUserType('vendor')}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <Store className="h-8 w-8 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">I'm a Vendor</h3>
                <p className="text-gray-600">List your restaurant and manage orders</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center"
            >
              <ShoppingBag className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">Foodo</span>
            </button>
            <button
              onClick={() => setUserType(null)}
              className="text-gray-600 hover:text-gray-900"
            >
              Change User Type
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {mode === 'login' ? 'Welcome back!' : 'Create an account'}
              <span className="block text-sm font-medium text-gray-600 mt-1">
                {userType === 'vendor' ? 'Restaurant Partner' : 'Food Lover'}
              </span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {mode === 'register' && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {userType === 'vendor' ? 'Owner Name' : 'Full Name'}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
              )}

              {userType === 'vendor' && mode === 'register' && (
                <>
                  <div>
                    <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700 mb-1">
                      Restaurant Name
                    </label>
                    <input
                      id="restaurantName"
                      type="text"
                      required
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow"
                      placeholder="Your Restaurant Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="restaurantAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      Restaurant Address
                    </label>
                    <input
                      id="restaurantAddress"
                      type="text"
                      required
                      value={restaurantAddress}
                      onChange={(e) => setRestaurantAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow"
                      placeholder="123 Restaurant St"
                    />
                  </div>
                  <div>
                    <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-1">
                      Cuisine Type
                    </label>
                    <input
                      id="cuisine"
                      type="text"
                      required
                      value={cuisine}
                      onChange={(e) => setCuisine(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow"
                      placeholder="Italian, Indian, etc."
                    />
                  </div>
                </>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                {mode === 'login' ? 'Sign In' : 'Create account'}
              </button>

              <div className="relative mt-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="w-full border border-gray-200 text-gray-600 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium mt-4"
              >
                {mode === 'login' ? 'Create an account' : 'Sign in to your account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
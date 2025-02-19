import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X } from 'lucide-react';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const getCurrentTab = () => {
    const path = location.pathname;
    if (path === '/home') return 'home';
    if (path === '/offers') return 'offers';
    if (path === '/help') return 'help';
    if (path === '/foodo-ai') return 'foodo-ai';
    return '';
  };

  const activeTab = getCurrentTab();

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-red-500" />
            <span className="ml-2 text-xl font-bold text-gray-900">Foodo</span>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/home')}
              className={`px-4 py-2 font-medium relative group ${
                activeTab === 'home' ? 'text-red-500' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
              <div className={`absolute bottom-0 left-0 w-full h-0.5 ${
                activeTab === 'home' ? 'bg-red-500' : 'bg-transparent group-hover:bg-gray-200 transition-colors'
              }`} />
            </button>
            <button
              onClick={() => navigate('/offers')}
              className={`px-4 py-2 font-medium relative group ${
                activeTab === 'offers' ? 'text-red-500' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Offers
              <div className={`absolute bottom-0 left-0 w-full h-0.5 ${
                activeTab === 'offers' ? 'bg-red-500' : 'bg-transparent group-hover:bg-gray-200 transition-colors'
              }`} />
            </button>
            <button
              onClick={() => navigate('/help')}
              className={`px-4 py-2 font-medium relative group ${
                activeTab === 'help' ? 'text-red-500' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Help
              <div className={`absolute bottom-0 left-0 w-full h-0.5 ${
                activeTab === 'help' ? 'bg-red-500' : 'bg-transparent group-hover:bg-gray-200 transition-colors'
              }`} />
            </button>
            <button
              onClick={() => navigate('/foodo-ai')}
              className={`px-4 py-2 font-medium relative group flex items-center space-x-1 ${
                activeTab === 'foodo-ai' ? 'text-red-500' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Foodo AI</span>
              <div className="px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded">Beta</div>
              <div className={`absolute bottom-0 left-0 w-full h-0.5 ${
                activeTab === 'foodo-ai' ? 'bg-red-500' : 'bg-transparent group-hover:bg-gray-200 transition-colors'
              }`} />
            </button>
          </div>

          {/* Profile Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <User className="h-6 w-6" />
              <span>Profile</span>
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-25" onClick={() => setMenuOpen(false)}>
          <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg" onClick={e => e.stopPropagation()}>
            <div className="p-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="mt-8 space-y-4">
                <button
                  onClick={() => {
                    navigate('/home');
                    setMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 ${
                    activeTab === 'home' ? 'text-red-500 font-medium' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    navigate('/offers');
                    setMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 ${
                    activeTab === 'offers' ? 'text-red-500 font-medium' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Offers
                </button>
                <button
                  onClick={() => {
                    navigate('/help');
                    setMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 ${
                    activeTab === 'help' ? 'text-red-500 font-medium' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Help
                </button>
                <button
                  onClick={() => {
                    navigate('/foodo-ai');
                    setMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 flex items-center justify-between ${
                    activeTab === 'foodo-ai' ? 'text-red-500 font-medium' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>Foodo AI</span>
                  <div className="px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded">Beta</div>
                </button>
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-600 hover:text-gray-900"
                >
                  Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

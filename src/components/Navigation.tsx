import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import FoodoLogo from './FoodoLogo';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const getCurrentTab = () => {
    const path = location.pathname;
    if (path === '/home') return 'home';
    if (path === '/offers') return 'offers';
    if (path === '/help') return 'help';
    if (path === '/foodo-ai') return 'foodo-ai';
    return '';
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const activeTab = getCurrentTab();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <FoodoLogo />
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-12">
              <Link
                to="/home"
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/home')
                    ? 'text-red-600 border-b-2 border-red-600 pb-1'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Home
              </Link>

              <Link
                to="/offers"
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/offers')
                    ? 'text-red-600 border-b-2 border-red-600 pb-1'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Offers
              </Link>

              <Link
                to="/help"
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/help')
                    ? 'text-red-600 border-b-2 border-red-600 pb-1'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Help
              </Link>

              <Link
                to="/foodo-ai"
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/foodo-ai')
                    ? 'text-red-600 border-b-2 border-red-600 pb-1'
                    : 'text-gray-500 hover:text-gray-900'
                } flex items-center`}
              >
                Foodo AI
                <span className="ml-1 px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded">
                  Beta
                </span>
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex-shrink-0 flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive('/profile')
                      ? 'text-red-600'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/home"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/home')
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/offers"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/offers')
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Offers
            </Link>
            <Link
              to="/help"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/help')
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Help
            </Link>
            <Link
              to="/foodo-ai"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/foodo-ai')
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Foodo AI
              <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded">
                Beta
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

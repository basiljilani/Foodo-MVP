import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, Map } from 'lucide-react';
import FoodoLogo from './FoodoLogo';
import NearMeModal from './NearMeModal';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNearMeModalOpen, setIsNearMeModalOpen] = useState(false);

  const getCurrentTab = () => {
    const path = location.pathname;
    if (path === '/home') return 'home';
    if (path === '/offers') return 'offers';
    if (path === '/recipes') return 'recipes';
    if (path === '/help') return 'help';
    if (path === '/foodo-ai') return 'foodo-ai';
    return '';
  };

  const activeTab = getCurrentTab();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
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
                  to="/recipes"
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive('/recipes')
                      ? 'text-red-600 border-b-2 border-red-600 pb-1'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Recipes
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

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              {/* Near Me Button */}
              <button
                onClick={() => setIsNearMeModalOpen(true)}
                className="group flex items-center space-x-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-100"
              >
                <Map className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span>Near Me</span>
              </button>

              {/* Mobile menu button */}
              <div className="flex md:hidden">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                >
                  <span className="sr-only">Open main menu</span>
                  {menuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
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
                  activeTab === 'home'
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>

              <Link
                to="/offers"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === 'offers'
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Offers
              </Link>

              <Link
                to="/recipes"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === 'recipes'
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Recipes
              </Link>

              <Link
                to="/help"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === 'help'
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Help
              </Link>

              <Link
                to="/foodo-ai"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === 'foodo-ai'
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Foodo AI
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-600">
                  Beta
                </span>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Near Me Modal */}
      <NearMeModal
        isOpen={isNearMeModalOpen}
        onClose={() => setIsNearMeModalOpen(false)}
      />
    </>
  );
}

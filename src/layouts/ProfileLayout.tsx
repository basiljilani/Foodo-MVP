import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Settings, CreditCard, MapPin, Bell, Shield, History, Home, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MobileProfileLayout from './MobileProfileLayout';

const sidebarItems = [
  { path: '/profile', label: 'Personal Information', icon: User },
  { path: '/profile/preferences', label: 'Preferences', icon: Settings },
  { path: '/profile/payment', label: 'Payment Methods', icon: CreditCard },
  { path: '/profile/addresses', label: 'Addresses', icon: MapPin },
  { path: '/profile/orders', label: 'Order History', icon: History },
  { path: '/profile/notifications', label: 'Notifications', icon: Bell },
  { path: '/profile/security', label: 'Security', icon: Shield },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (isMobile) {
    return <MobileProfileLayout>{children}</MobileProfileLayout>;
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-4">
      {/* Desktop Sidebar */}
      <div className="w-72 bg-white shadow-xl flex flex-col sticky top-20 self-start h-[calc(100vh-6rem)] rounded-lg overflow-hidden">
        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white text-lg font-semibold">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-gray-900 truncate">
                {user?.email}
              </h2>
              <p className="text-sm text-gray-500">
                Member since 2025
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-1.5">
            <div className="mb-6">
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Account Settings
              </h3>
              <div className="mt-3 space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? 'bg-red-50 text-red-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 flex-shrink-0 ${
                          isActive ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-gray-100">
          <div className="space-y-2">
            <Link
              to="/"
              className="group flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <Home className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              Return to Home
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full group flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-8">
        {children}
      </div>
    </div>
  );
}

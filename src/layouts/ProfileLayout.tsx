import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Settings, CreditCard, MapPin, Bell, Shield, History, Home, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-xl flex flex-col relative">
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
        <nav className="flex-1 p-6 space-y-1.5">
          <div className="mb-6">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Account Settings
            </h3>
          </div>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group
                  ${isActive
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-red-600'
                  }`}
              >
                <Icon className={`h-5 w-5 mr-3 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-red-600'
                }`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-gray-100 space-y-2 bg-gray-50">
          <Link
            to="/home"
            className="flex items-center px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-white hover:shadow-md transition-all duration-200 group"
          >
            <Home className="h-5 w-5 mr-3 text-gray-400 transition-transform group-hover:scale-110 group-hover:text-red-500" />
            Return to Home
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-white hover:shadow-md transition-all duration-200 w-full group"
          >
            <LogOut className="h-5 w-5 mr-3 text-gray-400 transition-transform group-hover:scale-110 group-hover:text-red-500" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

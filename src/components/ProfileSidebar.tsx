import React from 'react';
import { User, ShoppingBag, CreditCard, Settings, LogOut, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProfileSidebarProps {
  userFullName: string;
}

export default function ProfileSidebar({ userFullName }: ProfileSidebarProps) {
  const location = useLocation();
  const { signOut } = useAuth();

  const tabs = [
    { name: 'Profile', icon: User, path: '/profile' },
    { name: 'Orders', icon: ShoppingBag, path: '/orders' },
    { name: 'Payment', icon: CreditCard, path: '/payment' },
    { name: 'Preferences', icon: Heart, path: '/preferences' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const isActiveTab = (path: string) => location.pathname === path;

  return (
    <div className="p-6">
      {/* User Info */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{userFullName}</h3>
            <p className="text-sm text-gray-500">Member since January 2024</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="space-y-1">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            to={tab.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              isActiveTab(tab.path)
                ? 'text-red-600 bg-red-50 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.name}</span>
          </Link>
        ))}
      </nav>

      {/* Sign Out Button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-600 hover:text-red-600 rounded-lg transition-colors duration-200 hover:bg-gray-50"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

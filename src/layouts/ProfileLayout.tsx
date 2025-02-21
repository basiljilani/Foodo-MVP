import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Settings, CreditCard, MapPin, Bell, Shield, History } from 'lucide-react';

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

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-red-600' : 'text-gray-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, ShoppingBag, User } from 'lucide-react';
import NearMeModal from './NearMeModal';

export default function Navbar() {
  const [isNearMeModalOpen, setIsNearMeModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-red-500">Foodo</span>
              </Link>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-4">
              {/* Near Me Button */}
              <button
                onClick={() => setIsNearMeModalOpen(true)}
                className="group flex items-center space-x-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-100"
              >
                <Map className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span>Near Me</span>
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="flex items-center space-x-1 rounded-lg p-2 text-gray-500 hover:bg-gray-50"
              >
                <ShoppingBag className="h-6 w-6" />
                <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
                  0
                </span>
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-50"
              >
                <User className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Near Me Modal */}
      <NearMeModal
        isOpen={isNearMeModalOpen}
        onClose={() => setIsNearMeModalOpen(false)}
      />
    </>
  );
}

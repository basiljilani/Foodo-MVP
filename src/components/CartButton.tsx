import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartButton() {
  return (
    <Link to="/cart" className="block mb-6">
      <div className="bg-red-600 rounded-xl hover:bg-red-700 transition-colors">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="h-5 w-5 text-white" />
            <span className="text-sm font-medium text-white">Your Cart</span>
          </div>
          <div className="h-6 w-6 flex items-center justify-center rounded-full bg-white text-red-600 text-sm font-semibold">
            0
          </div>
        </div>
      </div>
    </Link>
  );
}

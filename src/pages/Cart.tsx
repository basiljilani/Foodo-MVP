import React from 'react';
import { ShoppingBag } from 'lucide-react';
import Layout from '../components/Layout';

export default function Cart() {
  return (
    <Layout>
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h2>
            <p className="mt-1 text-sm text-gray-500">Start adding some delicious items to your cart!</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

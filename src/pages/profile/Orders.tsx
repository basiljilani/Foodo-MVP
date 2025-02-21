import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import ProfileLayout from '../../layouts/ProfileLayout';
import { History, ChevronRight } from 'lucide-react';

export default function Orders() {
  const orders = [
    {
      id: '#FD123456',
      date: '21 Feb 2025',
      items: ['Chicken Biryani x2', 'Naan x4'],
      total: 'Rs. 1,250',
      status: 'Delivered',
      restaurant: 'Karachi Biryani House'
    },
    {
      id: '#FD123455',
      date: '18 Feb 2025',
      items: ['Butter Chicken x1', 'Garlic Naan x2'],
      total: 'Rs. 850',
      status: 'Delivered',
      restaurant: 'Tandoor Express'
    },
    {
      id: '#FD123454',
      date: '15 Feb 2025',
      items: ['Palak Paneer x1', 'Roti x3', 'Raita x1'],
      total: 'Rs. 950',
      status: 'Delivered',
      restaurant: 'Punjab Dhaba'
    }
  ];

  return (
    <MainLayout>
      <ProfileLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <History className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="font-medium text-gray-900 mb-1">{order.restaurant}</p>
                    <div className="text-sm text-gray-600">
                      {order.items.map((item, index) => (
                        <span key={index}>
                          {item}
                          {index < order.items.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{order.total}</p>
                    <button className="flex items-center text-red-500 hover:text-red-600">
                      View Details
                      <ChevronRight className="h-5 w-5 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}

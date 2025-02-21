import React from 'react';
import MainLayout from '../layouts/MainLayout';
import ProfileLayout from '../layouts/ProfileLayout';
import { ClockIcon, MapPinIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Order {
  id: string;
  restaurantName: string;
  date: string;
  status: 'delivered' | 'cancelled' | 'processing';
  total: number;
  items: number;
  address: string;
}

const orders: Order[] = [
  {
    id: 'ORD-001',
    restaurantName: 'Burger Palace',
    date: '2025-02-20',
    status: 'delivered',
    total: 32.50,
    items: 3,
    address: '123 Main St, Apt 4B',
  },
  {
    id: 'ORD-002',
    restaurantName: 'Pizza Heaven',
    date: '2025-02-18',
    status: 'delivered',
    total: 45.75,
    items: 2,
    address: '456 Business Ave, Floor 12',
  },
  {
    id: 'ORD-003',
    restaurantName: 'Sushi Express',
    date: 'Feb 15, 2025',
    status: 'cancelled',
    total: 28.90,
    items: 4,
    address: '123 Main St, Apt 4B',
  },
];

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function ProfileOrders() {
  return (
    <MainLayout>
      <ProfileLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
            <p className="mt-1 text-sm text-gray-500">
              View your past orders and their details
            </p>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-gray-300 transition-colors"
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {order.restaurantName}
                      </h3>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {order.date}
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {order.address}
                        </div>
                      </div>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center space-x-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {order.items} items
                      </span>
                    </div>
                    <div className="text-lg font-medium text-gray-900">
                      ${order.total.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}

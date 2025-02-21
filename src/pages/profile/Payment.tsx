import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import ProfileLayout from '../../layouts/ProfileLayout';
import { CreditCard, Plus } from 'lucide-react';

export default function Payment() {
  return (
    <MainLayout>
      <ProfileLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
          </div>

          <div className="grid gap-6">
            {/* Saved Cards */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Saved Cards</h3>
                <button className="flex items-center space-x-2 text-red-500 hover:text-red-600">
                  <Plus className="h-5 w-5" />
                  <span>Add New Card</span>
                </button>
              </div>

              <div className="space-y-4">
                {/* Example Card */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-14 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-sm font-medium">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/25</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-gray-500">Edit</button>
                    <button className="text-red-500 hover:text-red-600">Remove</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Recent Transactions</h3>
              <div className="space-y-4">
                {[
                  { date: '2025-02-21', amount: 'Rs. 1,250', status: 'Completed' },
                  { date: '2025-02-18', amount: 'Rs. 850', status: 'Completed' },
                  { date: '2025-02-15', amount: 'Rs. 2,100', status: 'Completed' },
                ].map((transaction, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.amount}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {transaction.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}

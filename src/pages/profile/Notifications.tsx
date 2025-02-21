import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import ProfileLayout from '../../layouts/ProfileLayout';
import { Bell, MessageCircle, Tag, Truck } from 'lucide-react';

export default function Notifications() {
  return (
    <MainLayout>
      <ProfileLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Bell className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          </div>

          <div className="bg-white shadow rounded-lg p-6 space-y-6">
            {/* Push Notifications */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
              <div className="space-y-4">
                {[
                  { icon: Truck, label: 'Order Updates', description: 'Get notified about your order status' },
                  { icon: Tag, label: 'Offers & Promotions', description: 'Receive updates about deals and discounts' },
                  { icon: MessageCircle, label: 'Chat Messages', description: 'Get notified when someone messages you' }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <item.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Notifications */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
              <div className="space-y-4">
                {[
                  { label: 'Order Confirmations', description: 'Receive order confirmation emails' },
                  { label: 'Newsletter', description: 'Get updates about new features and improvements' },
                  { label: 'Special Offers', description: 'Receive exclusive deals and promotions' }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}

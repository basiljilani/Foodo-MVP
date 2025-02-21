import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import ProfileLayout from '../../layouts/ProfileLayout';
import { Shield, Key, Smartphone, Lock } from 'lucide-react';

export default function Security() {
  return (
    <MainLayout>
      <ProfileLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">Security</h1>
          </div>

          <div className="space-y-6">
            {/* Password Change */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Key className="h-6 w-6 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                  Update Password
                </button>
              </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Smartphone className="h-6 w-6 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                Enable 2FA
              </button>
            </div>

            {/* Login History */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="h-6 w-6 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900">Login History</h3>
              </div>
              <div className="space-y-4">
                {[
                  { device: 'iPhone 13', location: 'Karachi, Pakistan', time: '2 minutes ago' },
                  { device: 'Chrome on Windows', location: 'Lahore, Pakistan', time: '1 day ago' },
                  { device: 'Safari on MacBook', location: 'Islamabad, Pakistan', time: '3 days ago' }
                ].map((session, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{session.device}</p>
                      <p className="text-sm text-gray-500">{session.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{session.time}</p>
                      {index === 0 && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Current Session
                        </span>
                      )}
                    </div>
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

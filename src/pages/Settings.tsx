import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import ProfileSidebar from '../components/ProfileSidebar';
import { Bell, Lock, Globe, Moon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Settings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    notifications: {
      orderUpdates: true,
      promotions: false,
      newsletter: true,
    },
    privacy: {
      showProfile: true,
      shareActivity: false,
    },
    preferences: {
      language: 'en',
      darkMode: false,
    },
  });

  const handleToggle = (category: string, setting: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: !prev[category as keyof typeof prev][setting as keyof typeof prev[keyof typeof prev]],
      },
    }));
    toast.success('Setting updated');
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        language: e.target.value,
      },
    }));
    toast.success('Language preference updated');
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pt-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white rounded-lg shadow">
              <ProfileSidebar userFullName={user.email?.split('@')[0] || 'User'} />
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

              {/* Notifications */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Order Updates</p>
                      <p className="text-sm text-gray-500">
                        Receive notifications about your order status
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle('notifications', 'orderUpdates')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        settings.notifications.orderUpdates ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.notifications.orderUpdates ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Promotions</p>
                      <p className="text-sm text-gray-500">
                        Receive notifications about deals and promotions
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle('notifications', 'promotions')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        settings.notifications.promotions ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.notifications.promotions ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Newsletter</p>
                      <p className="text-sm text-gray-500">
                        Receive our weekly newsletter with food recommendations
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle('notifications', 'newsletter')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        settings.notifications.newsletter ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.notifications.newsletter ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Privacy */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <h2 className="text-lg font-medium text-gray-900">Privacy</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Profile Visibility</p>
                      <p className="text-sm text-gray-500">
                        Allow others to see your profile and reviews
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle('privacy', 'showProfile')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        settings.privacy.showProfile ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.privacy.showProfile ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Activity Sharing</p>
                      <p className="text-sm text-gray-500">
                        Share your food journey with friends
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle('privacy', 'shareActivity')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        settings.privacy.shareActivity ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.privacy.shareActivity ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <h2 className="text-lg font-medium text-gray-900">Preferences</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Language</p>
                      <p className="text-sm text-gray-500">
                        Choose your preferred language
                      </p>
                    </div>
                    <select
                      value={settings.preferences.language}
                      onChange={handleLanguageChange}
                      className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Dark Mode</p>
                      <p className="text-sm text-gray-500">
                        Switch between light and dark theme
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle('preferences', 'darkMode')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        settings.preferences.darkMode ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

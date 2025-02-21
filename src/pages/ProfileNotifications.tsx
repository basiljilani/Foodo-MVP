import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import ProfileLayout from '../layouts/ProfileLayout';
import { Switch } from '@headlessui/react';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  type: 'push' | 'email' | 'sms';
  enabled: boolean;
}

export default function ProfileNotifications() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      title: 'Order Status Updates',
      description: 'Get notified about your order status changes',
      type: 'push',
      enabled: true,
    },
    {
      id: '2',
      title: 'Special Offers',
      description: 'Receive notifications about special offers and promotions',
      type: 'email',
      enabled: true,
    },
    {
      id: '3',
      title: 'Delivery Updates',
      description: 'Real-time updates about your delivery',
      type: 'push',
      enabled: true,
    },
    {
      id: '4',
      title: 'Restaurant Updates',
      description: 'Updates from restaurants you follow',
      type: 'push',
      enabled: false,
    },
    {
      id: '5',
      title: 'Newsletter',
      description: 'Weekly newsletter with trending restaurants and dishes',
      type: 'email',
      enabled: false,
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(current =>
      current.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const getTypeLabel = (type: NotificationSetting['type']) => {
    switch (type) {
      case 'push':
        return 'Push Notification';
      case 'email':
        return 'Email';
      case 'sms':
        return 'SMS';
      default:
        return '';
    }
  };

  return (
    <MainLayout>
      <ProfileLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Notification Settings</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your notification preferences
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-lg border border-gray-200 divide-y">
            {settings.map((setting) => (
              <div key={setting.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {setting.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {setting.description}
                        </p>
                      </div>
                      <Switch
                        checked={setting.enabled}
                        onChange={() => toggleSetting(setting.id)}
                        className={`${
                          setting.enabled ? 'bg-primary-600' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                      >
                        <span className="sr-only">Enable notification</span>
                        <span
                          className={`${
                            setting.enabled ? 'translate-x-5' : 'translate-x-0'
                          } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                        />
                      </Switch>
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        {getTypeLabel(setting.type)}
                      </span>
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

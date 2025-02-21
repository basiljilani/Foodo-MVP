import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import ProfileLayout from '../layouts/ProfileLayout';
import { Switch } from '@headlessui/react';
import { KeyIcon, ShieldCheckIcon, DevicePhoneMobileIcon, EyeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

interface SecuritySetting {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
  requiresVerification?: boolean;
}

export default function ProfileSecurity() {
  const [settings, setSettings] = useState<SecuritySetting[]>([
    {
      id: '2fa',
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      icon: ShieldCheckIcon,
      enabled: false,
      requiresVerification: true,
    },
    {
      id: 'biometric',
      title: 'Biometric Authentication',
      description: 'Use Face ID or Touch ID for faster login',
      icon: DevicePhoneMobileIcon,
      enabled: true,
    },
    {
      id: 'session',
      title: 'Active Sessions',
      description: 'Manage and monitor your active sessions',
      icon: KeyIcon,
      enabled: true,
    },
    {
      id: 'privacy',
      title: 'Privacy Mode',
      description: 'Hide your order history and activity from other users',
      icon: EyeIcon,
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

  return (
    <MainLayout>
      <ProfileLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your account security and privacy settings
            </p>
          </div>

          {/* Password Change Section */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <LockClosedIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">Change Password</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Update your password regularly to keep your account secure
                </p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700">
                Update
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 divide-y">
            {settings.map((setting) => (
              <div key={setting.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <setting.icon className="h-6 w-6 text-gray-400" />
                  </div>
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
                        <span className="sr-only">Enable setting</span>
                        <span
                          className={`${
                            setting.enabled ? 'translate-x-5' : 'translate-x-0'
                          } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                        />
                      </Switch>
                    </div>
                    {setting.requiresVerification && setting.enabled && (
                      <div className="mt-2">
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          Requires verification
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Password changed</p>
                  <p className="text-xs text-gray-500">2 days ago • New York, USA</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-900">New device logged in</p>
                  <p className="text-xs text-gray-500">5 days ago • San Francisco, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}

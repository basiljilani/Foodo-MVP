import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import ProfileLayout from '../layouts/ProfileLayout';
import { PlusIcon, HomeIcon, BuildingOfficeIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

interface Address {
  id: string;
  type: 'home' | 'office';
  name: string;
  address: string;
  isDefault: boolean;
}

export default function ProfileAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      name: 'Home',
      address: '123 Main St, Apt 4B, New York, NY 10001',
      isDefault: true,
    },
    {
      id: '2',
      type: 'office',
      name: 'Office',
      address: '456 Business Ave, Floor 12, New York, NY 10002',
      isDefault: false,
    },
  ]);

  const handleSetDefault = (id: string) => {
    setAddresses(addrs =>
      addrs.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setAddresses(addrs => addrs.filter(addr => addr.id !== id));
  };

  return (
    <MainLayout>
      <ProfileLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Delivery Addresses</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your delivery addresses for faster checkout
            </p>
          </div>

          <div className="grid gap-6">
            {/* Add New Address Button */}
            <button
              className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors group"
            >
              <div className="text-center">
                <PlusIcon className="mx-auto h-8 w-8 text-gray-400 group-hover:text-gray-500" />
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Add new address
                </span>
              </div>
            </button>

            {/* Existing Addresses */}
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {address.type === 'home' ? (
                      <HomeIcon className="h-6 w-6 text-gray-400 mt-1" />
                    ) : (
                      <BuildingOfficeIcon className="h-6 w-6 text-gray-400 mt-1" />
                    )}
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{address.name}</p>
                        {address.isDefault && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{address.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Set as default
                      </button>
                    )}
                    <button
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
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

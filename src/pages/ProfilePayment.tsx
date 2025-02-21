import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import ProfileLayout from '../layouts/ProfileLayout';
import { PlusIcon, CreditCardIcon, TrashIcon } from '@heroicons/react/24/outline';

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export default function ProfilePayment() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true,
    },
    {
      id: '2',
      type: 'Mastercard',
      last4: '8888',
      expiry: '08/24',
      isDefault: false,
    },
  ]);

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  return (
    <MainLayout>
      <ProfileLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your payment methods and billing information
            </p>
          </div>

          <div className="grid gap-6">
            {/* Add New Card Button */}
            <button
              className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors group"
            >
              <div className="text-center">
                <PlusIcon className="mx-auto h-8 w-8 text-gray-400 group-hover:text-gray-500" />
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Add new payment method
                </span>
              </div>
            </button>

            {/* Existing Payment Methods */}
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CreditCardIcon className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {method.type} ending in {method.last4}
                      </p>
                      <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Set as default
                      </button>
                    )}
                    {method.isDefault && (
                      <span className="text-sm text-green-600 font-medium">
                        Default
                      </span>
                    )}
                    <button
                      onClick={() => handleDelete(method.id)}
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

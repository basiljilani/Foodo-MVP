import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import ProfileLayout from '../../layouts/ProfileLayout';
import { MapPin, Plus, Home, Briefcase } from 'lucide-react';

export default function Addresses() {
  return (
    <MainLayout>
      <ProfileLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <MapPin className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">Addresses</h1>
          </div>

          <div className="grid gap-6">
            {/* Address List */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Saved Addresses</h3>
                <button className="flex items-center space-x-2 text-red-500 hover:text-red-600">
                  <Plus className="h-5 w-5" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="space-y-4">
                {/* Home Address */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <Home className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">Home</h4>
                          <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">Default</span>
                        </div>
                        <p className="text-gray-600 mt-1">123 Main Street, Apartment 4B</p>
                        <p className="text-gray-600">Karachi, Pakistan</p>
                        <p className="text-gray-600">+92 300 1234567</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="text-gray-400 hover:text-gray-500">Edit</button>
                      <button className="text-red-500 hover:text-red-600">Remove</button>
                    </div>
                  </div>
                </div>

                {/* Office Address */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <Briefcase className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Office</h4>
                        <p className="text-gray-600 mt-1">456 Business Avenue, Floor 12</p>
                        <p className="text-gray-600">Lahore, Pakistan</p>
                        <p className="text-gray-600">+92 300 9876543</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="text-gray-400 hover:text-gray-500">Edit</button>
                      <button className="text-red-500 hover:text-red-600">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}

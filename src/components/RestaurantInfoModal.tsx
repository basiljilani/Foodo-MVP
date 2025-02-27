import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  X,
  CheckCircle2,
  AlertCircle,
  Hash,
  Quote,
  Star,
  Users,
  Utensils,
  Award,
  History,
  MessageCircle
} from 'lucide-react';

interface RestaurantInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: {
    name: string;
    opening_hours: string;
    tagline?: string;
    stats?: {
      orders_completed?: number;
      regular_customers?: number;
      signature_dishes?: number;
      years_of_service?: number;
    };
    contact: {
      phone: string;
      email: string;
      website?: string;
      social_media?: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
      };
    };
    location: {
      address: string;
    };
    settings: {
      is_open: boolean;
    };
  };
}

export default function RestaurantInfoModal({ isOpen, onClose, restaurant }: RestaurantInfoModalProps) {
  // Sample stats if not provided
  const stats = restaurant.stats || {
    orders_completed: 50000,
    regular_customers: 5000,
    signature_dishes: 25,
    years_of_service: 15
  };

  // Sample tagline if not provided
  const tagline = restaurant.tagline || "Serving happiness on a plate since 2008";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start mb-6">
                  <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                    Restaurant Information
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Status Badge */}
                <div className="mb-6 flex items-center gap-3">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                    restaurant.settings.is_open
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}>
                    {restaurant.settings.is_open ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    {restaurant.settings.is_open ? 'Open Now' : 'Currently Closed'}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span>{restaurant.opening_hours}</span>
                  </div>
                </div>

                {/* Tagline Section */}
                <div className="mb-8 bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <Quote className="w-8 h-8 text-red-500 mb-4" />
                    <p className="text-lg text-gray-600 italic">{tagline}</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <Utensils className="w-8 h-8 mx-auto mb-2 text-red-500" />
                    <div className="text-2xl font-bold text-gray-900">{stats.orders_completed.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Orders Served</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-red-500" />
                    <div className="text-2xl font-bold text-gray-900">{stats.regular_customers.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <Award className="w-8 h-8 mx-auto mb-2 text-red-500" />
                    <div className="text-2xl font-bold text-gray-900">{stats.signature_dishes}</div>
                    <div className="text-sm text-gray-500">Signature Dishes</div>
                  </div>
                  <div className="text-center">
                    <History className="w-8 h-8 mx-auto mb-2 text-red-500" />
                    <div className="text-2xl font-bold text-gray-900">{stats.years_of_service}</div>
                    <div className="text-sm text-gray-500">Years of Service</div>
                  </div>
                </div>

                {/* Contact & Location */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <div>
                      <h4 className="font-medium mb-1">Location</h4>
                      <p className="text-gray-600">{restaurant.location.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-red-500" />
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <p className="text-gray-600">{restaurant.contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-red-500" />
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-gray-600">{restaurant.contact.email}</p>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  {restaurant.contact.social_media && (
                    <div className="flex items-center gap-4 pt-2">
                      <a href={restaurant.contact.social_media.instagram} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600">
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a href={restaurant.contact.social_media.facebook} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600">
                        <Facebook className="w-5 h-5" />
                      </a>
                      <a href={`https://wa.me/${restaurant.contact.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600">
                        <MessageCircle className="w-5 h-5" />
                      </a>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

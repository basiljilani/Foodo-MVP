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
  MessageCircle,
  DollarSign,
  Bike,
  Timer
} from 'lucide-react';

interface RestaurantInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: {
    name: string;
    description?: string;
    cuisine?: string;
    rating?: number;
    totalReviews?: number;
    estimatedTime?: string;
    priceRange?: string;
    deliveryFee?: number;
    minOrder?: number;
    features?: {
      isOpen?: boolean;
      acceptsOnlinePayment?: boolean;
      hasHappyHours?: boolean;
      autoAcceptOrders?: boolean;
    };
    contact?: {
      phone?: string;
      email?: string;
      website?: string;
      address?: string;
      city?: string;
      social?: {
        facebook?: string;
        instagram?: string;
        whatsapp?: string;
      };
    };
  };
}

const RestaurantInfoModal: React.FC<RestaurantInfoModalProps> = ({ isOpen, onClose, restaurant }) => {
  if (!restaurant) return null;

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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Dialog.Title className="text-2xl font-semibold">
                      {restaurant.name}
                    </Dialog.Title>
                    {restaurant.cuisine && (
                      <p className="text-gray-600 mt-1">{restaurant.cuisine}</p>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  {/* Description */}
                  {restaurant.description && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Quote className="w-5 h-5 text-gray-400 mb-2" />
                      <p className="text-gray-600">{restaurant.description}</p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {restaurant.rating && (
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <Star className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                        <div className="font-semibold">{restaurant.rating.toFixed(1)}</div>
                        <div className="text-sm text-gray-500">{restaurant.totalReviews}+ Reviews</div>
                      </div>
                    )}
                    {restaurant.estimatedTime && (
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <Timer className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                        <div className="font-semibold">{restaurant.estimatedTime}</div>
                        <div className="text-sm text-gray-500">Delivery Time</div>
                      </div>
                    )}
                    {restaurant.deliveryFee !== undefined && (
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <Bike className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                        <div className="font-semibold">
                          {restaurant.deliveryFee === 0 ? 'Free' : `Rs. ${restaurant.deliveryFee}`}
                        </div>
                        <div className="text-sm text-gray-500">Delivery Fee</div>
                      </div>
                    )}
                    {restaurant.priceRange && (
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <DollarSign className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                        <div className="font-semibold">{restaurant.priceRange}</div>
                        <div className="text-sm text-gray-500">Price Range</div>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  {restaurant.features && (
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-3">Features</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          {restaurant.features.isOpen ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          )}
                          <span>Currently {restaurant.features.isOpen ? 'Open' : 'Closed'}</span>
                        </div>
                        {restaurant.features.acceptsOnlinePayment && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <span>Online Payment</span>
                          </div>
                        )}
                        {restaurant.features.hasHappyHours && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <span>Happy Hours</span>
                          </div>
                        )}
                        {restaurant.features.autoAcceptOrders && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <span>Auto Accept Orders</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  {restaurant.contact && (
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-3">Contact Information</h3>
                      <div className="space-y-3">
                        {restaurant.contact.address && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <span>{restaurant.contact.address}</span>
                          </div>
                        )}
                        {restaurant.contact.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <a href={`tel:${restaurant.contact.phone}`} className="hover:text-blue-500">
                              {restaurant.contact.phone}
                            </a>
                          </div>
                        )}
                        {restaurant.contact.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <a href={`mailto:${restaurant.contact.email}`} className="hover:text-blue-500">
                              {restaurant.contact.email}
                            </a>
                          </div>
                        )}
                        {restaurant.contact.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-gray-400" />
                            <a href={restaurant.contact.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                              {restaurant.contact.website.replace(/^https?:\/\//, '')}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Social Media */}
                      {restaurant.contact.social && (
                        <div className="flex gap-3 mt-4">
                          {restaurant.contact.social.facebook && (
                            <a
                              href={restaurant.contact.social.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              <Facebook className="w-5 h-5 text-gray-600" />
                            </a>
                          )}
                          {restaurant.contact.social.instagram && (
                            <a
                              href={restaurant.contact.social.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              <Instagram className="w-5 h-5 text-gray-600" />
                            </a>
                          )}
                        </div>
                      )}
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
};

export default RestaurantInfoModal;

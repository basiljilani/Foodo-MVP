import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';
import ProfileSidebar from '../components/ProfileSidebar';
import { Clock, MapPin, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  created_at: string;
  status: 'pending' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
  total_amount: number;
  restaurant_name: string;
  delivery_address: string;
  estimated_time: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export default function Orders() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'on_the_way':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!user || loading) {
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
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No orders yet</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {order.restaurant_name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {formatDate(order.created_at)}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-2" />
                            {order.delivery_address}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-2" />
                            {order.estimated_time}
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div
                                key={index}
                                className="flex justify-between text-sm"
                              >
                                <span className="text-gray-600">
                                  {item.quantity}x {item.name}
                                </span>
                                <span className="text-gray-900">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                            <span className="font-medium text-gray-900">
                              Total
                            </span>
                            <span className="text-lg font-bold text-gray-900">
                              ${order.total_amount.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <button className="flex items-center text-sm text-red-600 hover:text-red-700 font-medium">
                            View Details
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';
import ProfileSidebar from '../components/ProfileSidebar';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface PaymentMethod {
  id: string;
  card_type: string;
  last_four: string;
  expiry_date: string;
  is_default: boolean;
}

export default function Payment() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showAddCard, setShowAddCard] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPaymentMethods();
    }
  }, [user]);

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('user_id', user?.id)
        .order('is_default', { ascending: false });

      if (error) throw error;
      setPaymentMethods(data || []);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      toast.error('Failed to load payment methods');
    } finally {
      setLoading(false);
    }
  };

  const setDefaultPaymentMethod = async (id: string) => {
    try {
      const { error } = await supabase
        .from('payment_methods')
        .update({ is_default: true })
        .eq('id', id);

      if (error) throw error;

      // Update other cards to non-default
      await supabase
        .from('payment_methods')
        .update({ is_default: false })
        .neq('id', id);

      await fetchPaymentMethods();
      toast.success('Default payment method updated');
    } catch (error) {
      console.error('Error updating default payment method:', error);
      toast.error('Failed to update default payment method');
    }
  };

  const deletePaymentMethod = async (id: string) => {
    try {
      const { error } = await supabase
        .from('payment_methods')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPaymentMethods();
      toast.success('Payment method removed');
    } catch (error) {
      console.error('Error deleting payment method:', error);
      toast.error('Failed to remove payment method');
    }
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
                <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
                <button
                  onClick={() => setShowAddCard(true)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Card
                </button>
              </div>

              {paymentMethods.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods</h3>
                  <p className="text-gray-500">Add a credit or debit card to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {method.card_type} •••• {method.last_four}
                          </p>
                          <p className="text-sm text-gray-500">Expires {method.expiry_date}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {!method.is_default && (
                          <>
                            <button
                              onClick={() => setDefaultPaymentMethod(method.id)}
                              className="text-sm text-gray-600 hover:text-gray-900"
                            >
                              Set as default
                            </button>
                            <button
                              onClick={() => deletePaymentMethod(method.id)}
                              className="text-sm text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {method.is_default && (
                          <span className="text-sm font-medium text-green-600">Default</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Card Form - You would typically integrate with a payment processor like Stripe here */}
              {showAddCard && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <h2 className="text-xl font-bold mb-4">Add New Card</h2>
                    <p className="text-gray-500 mb-4">
                      This is a demo interface. In a real application, you would integrate with a payment
                      processor like Stripe.
                    </p>
                    <div className="flex justify-end">
                      <button
                        onClick={() => setShowAddCard(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

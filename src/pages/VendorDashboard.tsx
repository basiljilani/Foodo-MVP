import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Store, Package, Settings, LogOut, 
  Menu as MenuIcon, X, PieChart, Clock, DollarSign,
  Edit, Trash2, Plus
} from 'lucide-react';

export default function VendorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Mock data
  const restaurant = {
    name: "Luigi's Italian",
    address: "123 Restaurant St",
    cuisine: "Italian",
    rating: 4.8,
    totalOrders: 1250,
    totalRevenue: 45000,
    menu: [
      {
        id: 1,
        name: "Margherita Pizza",
        description: "Fresh tomatoes, mozzarella, basil",
        price: 14.99,
        category: "Pizza",
        available: true
      },
      {
        id: 2,
        name: "Pasta Carbonara",
        description: "Creamy sauce with pancetta",
        price: 16.99,
        category: "Pasta",
        available: true
      }
    ],
    orders: [
      {
        id: "ORD001",
        customer: "John Doe",
        items: ["Margherita Pizza", "Pasta Carbonara"],
        total: 31.98,
        status: "Preparing",
        time: "10 minutes ago"
      },
      {
        id: "ORD002",
        customer: "Jane Smith",
        items: ["Margherita Pizza"],
        total: 14.99,
        status: "Delivered",
        time: "1 hour ago"
      }
    ]
  };

  const handleLogout = () => {
    navigate('/');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
                  <Package className="h-6 w-6 text-red-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{restaurant.totalOrders}</p>
                <p className="text-sm text-gray-600 mt-2">+12% from last month</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
                  <DollarSign className="h-6 w-6 text-red-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">${restaurant.totalRevenue}</p>
                <p className="text-sm text-gray-600 mt-2">+8% from last month</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Rating</h3>
                  <PieChart className="h-6 w-6 text-red-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{restaurant.rating}</p>
                <p className="text-sm text-gray-600 mt-2">Based on 234 reviews</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Orders</h2>
              <div className="space-y-4">
                {restaurant.orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">Order #{order.id}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{order.customer}</p>
                      <p className="text-sm text-gray-500 mt-1">{order.items.join(', ')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${order.total}</p>
                      <p className="text-sm text-gray-500 mt-1">{order.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'menu':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Menu Items</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                <Plus className="h-5 w-5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              {restaurant.menu.map((item, index) => (
                <div key={item.id} className={`p-6 ${
                  index !== restaurant.menu.length - 1 ? 'border-b border-gray-200' : ''
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                      <p className="text-gray-500 text-sm mt-1">Category: {item.category}</p>
                      <p className="text-lg font-medium text-gray-900 mt-2">${item.price}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Restaurant Settings</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    defaultValue={restaurant.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    defaultValue={restaurant.address}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cuisine Type
                  </label>
                  <input
                    type="text"
                    defaultValue={restaurant.cuisine}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Opening Hours
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="time"
                      defaultValue="09:00"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <input
                      type="time"
                      defaultValue="22:00"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed w-full top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">Foodo</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Store className="h-6 w-6" />
                <span className="hidden md:inline">{restaurant.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Store className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{restaurant.name}</h2>
                  <p className="text-sm text-gray-500">{restaurant.cuisine} Restaurant</p>
                </div>
              </div>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 p-2 rounded-lg ${
                    activeTab === 'overview'
                      ? 'bg-red-50 text-red-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <PieChart className="h-5 w-5" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('menu')}
                  className={`w-full flex items-center space-x-3 p-2 rounded-lg ${
                    activeTab === 'menu'
                      ? 'bg-red-50 text-red-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <MenuIcon className="h-5 w-5" />
                  <span>Menu</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 p-2 rounded-lg ${
                    activeTab === 'settings'
                      ? 'bg-red-50 text-red-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
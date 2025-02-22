import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { SupabaseProvider } from './contexts/SupabaseContext';
import Recipes from './pages/Recipes';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Help from './pages/Help';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Preferences from './pages/profile/Preferences';
import Payment from './pages/profile/Payment';
import Addresses from './pages/profile/Addresses';
import Orders from './pages/profile/Orders';
import Notifications from './pages/profile/Notifications';
import Security from './pages/profile/Security';
import FoodoAI from './pages/FoodoAI';
import RestaurantDetail from './pages/restaurants/RestaurantDetail';
import Partner from './pages/Partner';
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <SupabaseProvider>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#4aed88',
                },
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/help" element={<Help />} />
            <Route path="/foodo-ai" element={<FoodoAI />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/preferences" element={<Preferences />} />
            <Route path="/profile/payment" element={<Payment />} />
            <Route path="/profile/addresses" element={<Addresses />} />
            <Route path="/profile/orders" element={<Orders />} />
            <Route path="/profile/notifications" element={<Notifications />} />
            <Route path="/profile/security" element={<Security />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          </Routes>
        </AuthProvider>
      </SupabaseProvider>
    </BrowserRouter>
  );
}

export default App;
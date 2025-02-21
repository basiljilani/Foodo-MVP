import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Testimonials from './pages/Testimonials';
import About from './pages/About';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import VendorDashboard from './pages/VendorDashboard';
import Offers from './pages/Offers';
import FoodoAI from './pages/FoodoAI';
import Help from './pages/Help';
import RestaurantDetail from './pages/restaurants/RestaurantDetail';
import Profile from './pages/Profile';
import ProfilePreferences from './pages/ProfilePreferences';
import ProfilePayment from './pages/ProfilePayment';
import ProfileAddresses from './pages/ProfileAddresses';
import ProfileOrders from './pages/ProfileOrders';
import ProfileNotifications from './pages/ProfileNotifications';
import ProfileSecurity from './pages/ProfileSecurity';
import Orders from './pages/Orders';
import Payment from './pages/Payment';
import Settings from './pages/Settings';
import Preferences from './pages/Preferences';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

// Public Route component - redirects to home if authenticated
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/home" />;
  }
  
  return <>{children}</>;
};

const protectedRoutes = [
  { path: '/home', element: <Home /> },
  { path: '/profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
  { path: '/profile/preferences', element: <ProtectedRoute><ProfilePreferences /></ProtectedRoute> },
  { path: '/profile/payment', element: <ProtectedRoute><ProfilePayment /></ProtectedRoute> },
  { path: '/profile/addresses', element: <ProtectedRoute><ProfileAddresses /></ProtectedRoute> },
  { path: '/profile/orders', element: <ProtectedRoute><ProfileOrders /></ProtectedRoute> },
  { path: '/profile/notifications', element: <ProtectedRoute><ProfileNotifications /></ProtectedRoute> },
  { path: '/profile/security', element: <ProtectedRoute><ProfileSecurity /></ProtectedRoute> },
];

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes - redirect to home if authenticated */}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />
      <Route path="/features" element={<Features />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/about" element={<About />} />
      
      {/* Semi-protected routes - accessible to both logged in and non-logged in users */}
      <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/foodo-ai" element={<FoodoAI />} />
      <Route path="/help" element={<Help />} />
      
      {/* Protected routes - only accessible when logged in */}
      {protectedRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
      <Route path="/preferences" element={<ProtectedRoute><Preferences /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/vendor/dashboard" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

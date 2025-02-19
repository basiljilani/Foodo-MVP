import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Testimonials from './pages/Testimonials';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import VendorDashboard from './pages/VendorDashboard';
import Offers from './pages/Offers';
import Help from './pages/Help';
import RestaurantDetail from './pages/restaurants/RestaurantDetail';
import FoodoAI from './pages/FoodoAI';

function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/foodo-ai" element={<FoodoAI />} />
        <Route path="/help" element={<Help />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
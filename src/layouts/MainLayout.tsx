import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <div className="flex-grow pt-24 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </div>
  );
}

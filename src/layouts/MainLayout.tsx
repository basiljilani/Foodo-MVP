import React from 'react';
import Navigation from '../components/Navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}

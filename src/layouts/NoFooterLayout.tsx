import React from 'react';
import Navigation from '../components/Navigation';

export default function NoFooterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <div className="flex-grow pt-16">
        {children}
      </div>
    </div>
  );
}

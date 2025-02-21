import React from 'react';
import Navigation from '../components/Navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-16">{children}</main>
    </div>
  );
}

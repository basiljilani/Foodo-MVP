import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const path = location.pathname;
  
  // Pages that should not show the navigation or footer
  const noNavFooterPages = ['/auth', '/login', '/signup'];
  const noFooterPages = ['/foodo-ai', '/profile', ...noNavFooterPages];
  
  const shouldShowNav = !noNavFooterPages.includes(path);
  // Remove /home from noFooterPages check
  const shouldShowFooter = true;

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowNav && <Navigation />}
      <main className="flex-1">
        {children}
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

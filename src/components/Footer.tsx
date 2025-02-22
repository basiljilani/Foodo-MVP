import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';
import FoodoLogo from './FoodoLogo';

export default function Footer() {
  const footerLinks = {
    foodo: [
      { name: 'Features', href: '/features' },
      { name: 'How it Works', href: '/how-it-works' },
      { name: 'Testimonials', href: '/testimonials' },
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '#' },
      { name: 'Partner with Us', href: '/partner' },
      { name: 'Blog', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Safety', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' }
    ],
    contact: [
      { icon: Mail, text: 'support@hifoodo.com' },
      { icon: Phone, text: '+92 300 8853 111' },
      { icon: MapPin, text: 'Evacuee Trust Complex' },
      { icon: Clock, text: 'Mon-Sun 24/7' }
    ]
  };

  const navigate = useNavigate();

  return (
    <footer className="bg-[#0A192F] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Foodo Section */}
          <div>
            <div className="mb-4">
              <FoodoLogo />
            </div>
            <p className="text-gray-300 mb-6">
              Delivering happiness to your doorstep, one meal at a time.
            </p>
            <button
              onClick={() => navigate('/auth')}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Join Us
            </button>
          </div>

          {/* Foodo Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Foodo</h3>
            <ul className="space-y-3">
              {footerLinks.foodo.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-center space-x-2">
                    <Icon className="w-5 h-5 text-gray-300" />
                    <span className="text-gray-300">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-300">
            &copy; {new Date().getFullYear()} Foodo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

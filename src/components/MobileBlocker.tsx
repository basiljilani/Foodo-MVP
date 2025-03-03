import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';

const MobileBlocker: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      
      // Check both user agent and screen width
      const isMobileDevice = mobileRegex.test(userAgent) || window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-[#E4002B]/10 p-4 rounded-full mb-6">
        <Phone className="w-12 h-12 text-[#E4002B]" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Mobile Version Under Development</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        We're currently optimizing Foodo for mobile devices. Please visit us on a desktop or laptop for the best experience.
      </p>
      <div className="border-t border-gray-200 pt-6 w-full max-w-md">
        <p className="text-sm text-gray-500">
          Expected mobile release: Q2 2025
        </p>
      </div>
    </div>
  );
};

export default MobileBlocker;

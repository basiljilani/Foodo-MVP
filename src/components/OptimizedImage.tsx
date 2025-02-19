import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function OptimizedImage({ src, alt, className = '', width = 400, height = 300 }: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Generate optimized Unsplash URL with size parameters
  const optimizedSrc = src.includes('unsplash.com') 
    ? `${src}?w=${width}&h=${height}&auto=format,compress&q=80` 
    : src;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Low quality placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}

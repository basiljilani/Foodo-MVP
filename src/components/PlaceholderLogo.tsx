import React from 'react';

interface PlaceholderLogoProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const PlaceholderLogo: React.FC<PlaceholderLogoProps> = ({ 
  name, 
  size = 'md', 
  className = '' 
}) => {
  // Generate a consistent color based on the name
  const getColorFromName = (name: string) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    
    // Simple hash function to get a consistent index
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };
  
  // Get initials from name (up to 2 characters)
  const getInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-20 h-20 text-2xl',
    lg: 'w-32 h-32 text-4xl'
  };
  
  const bgColor = getColorFromName(name);
  const initials = getInitials(name);
  
  return (
    <div 
      className={`${sizeClasses[size]} ${bgColor} rounded-lg flex items-center justify-center text-white font-bold ${className}`}
      aria-label={`Logo placeholder for ${name}`}
    >
      {initials}
    </div>
  );
};

export default PlaceholderLogo; 
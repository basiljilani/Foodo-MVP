import React from 'react';
import { Bike } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FoodoLogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
  size?: number;
}

export default function FoodoLogo({ 
  className = "", 
  iconClassName = "text-red-500",
  textClassName = "text-gray-900",
  showText = true,
  size = 32
}: FoodoLogoProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className={`flex items-center ${className} cursor-pointer`} onClick={handleClick}>
      <Bike className={`h-[${size}px] w-[${size}px] ${iconClassName}`} />
      {showText && (
        <span className={`ml-2 text-xl font-semibold ${textClassName}`}>
          Foodo
        </span>
      )}
    </div>
  );
}

import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

// Custom Link component that scrolls to top when clicked
const ScrollToTopLink: React.FC<LinkProps> = ({ children, ...props }) => {
  const handleClick = () => {
    // Scroll to top with smooth behavior
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default ScrollToTopLink;

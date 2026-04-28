import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Reveal = ({ children, delayClass = '', className = '', threshold }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold });
  
  const baseClasses = "transition-all duration-700 ease-out";
  const hiddenClasses = "opacity-0 translate-y-8";
  const visibleClasses = "opacity-100 translate-y-0";
  
  return (
    <div 
      ref={ref} 
      className={`${baseClasses} ${isVisible ? visibleClasses : hiddenClasses} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Reveal;

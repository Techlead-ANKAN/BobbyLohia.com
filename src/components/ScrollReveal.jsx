import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getTransformClass = () => {
    switch (direction) {
      case 'left':
        return 'translate-x-[-50px]';
      case 'right':
        return 'translate-x-[50px]';
      case 'down':
        return 'translate-y-[50px]';
      default:
        return 'translate-y-[50px]';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 translate-x-0'
          : `opacity-0 ${getTransformClass()}`
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;

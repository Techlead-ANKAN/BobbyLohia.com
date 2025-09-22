import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95';

  const variants = {
    primary: 'magnetic-btn bg-white text-black hover:bg-black hover:text-white shadow-lg hover:shadow-2xl backdrop-blur-md bg-opacity-80 border border-transparent hover:border-white',
    secondary: 'magnetic-btn border border-white/30 text-white hover:bg-white hover:text-black shadow-lg hover:shadow-2xl backdrop-blur-md bg-opacity-10',
    ghost: 'magnetic-btn text-white hover:bg-white/10 backdrop-blur-md bg-opacity-0 hover:bg-opacity-10',
    outline: 'magnetic-btn border-2 border-current text-current hover:bg-current hover:text-white hover:border-transparent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-12 py-6 text-xl',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10 font-semibold tracking-wide">{children}</span>
    </button>
  );
};

export default Button;

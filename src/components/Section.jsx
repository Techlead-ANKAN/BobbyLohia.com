import React from 'react';

const Section = ({ 
  children, 
  className = '', 
  container = true, 
  padding = 'py-12 sm:py-16 md:py-20 lg:py-24',
  background = 'bg-white dark:bg-black'
}) => {
  return (
    <section className={`${background} ${padding} ${className}`}>
      {container ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
};

export default Section;

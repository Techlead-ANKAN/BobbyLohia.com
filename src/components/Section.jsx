import React from 'react';

const Section = ({ 
  children, 
  className = '', 
  container = true, 
  padding = 'py-20',
  background = 'bg-white dark:bg-black'
}) => {
  return (
    <section className={`${background} ${padding} ${className}`}>
      {container ? (
        <div className="max-w-7xl mx-auto px-6">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
};

export default Section;

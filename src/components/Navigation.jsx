import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/albums', label: 'Albums' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-indicator"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/10 backdrop-blur-xl border-b border-white/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-xl sm:text-2xl font-display font-bold text-white hover:text-gray-300 transition-colors duration-300 truncate"
            >
              Bobby Lohia
            </Link>

            {/* Desktop Menu - Hidden on tablet and mobile */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link text-sm xl:text-base font-medium transition-all duration-300 ${
                    location.pathname === item.path 
                      ? 'active text-white' 
                      : 'text-white/70 hover:text-white hover:scale-105'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Tablet Menu - Visible on md to lg */}
            <div className="hidden md:flex lg:hidden items-center space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg ${
                    location.pathname === item.path 
                      ? 'active text-white bg-white/10' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button - Show on mobile and foldable devices */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden lg:hidden relative w-10 h-10 flex flex-col justify-center items-center group touch-manipulation"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay - Improved for all devices */}
        <div className={`fixed inset-0 z-40 md:hidden lg:hidden transition-all duration-500 ${
          isOpen 
            ? 'bg-black/95 backdrop-blur-xl opacity-100' 
            : 'bg-transparent backdrop-blur-none opacity-0 pointer-events-none'
        }`}>
          <div className={`flex flex-col items-center justify-center h-full px-8 py-20 transition-all duration-500 delay-200 ${
            isOpen ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0'
          }`}>
            {menuItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`w-full max-w-xs text-center py-4 px-6 mb-4 rounded-xl font-display text-white transition-all duration-500 hover:text-gray-300 hover:bg-white/10 active:scale-95 touch-manipulation ${
                  location.pathname === item.path ? 'bg-white/20' : ''
                } ${
                  isOpen 
                    ? 'transform translate-y-0 opacity-100' 
                    : 'transform translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDelay: isOpen ? `${300 + index * 100}ms` : '0ms',
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)'
                }}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Close hint for mobile */}
            <div className={`mt-8 text-white/60 text-sm transition-all duration-500 delay-700 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}>
              Tap anywhere to close
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
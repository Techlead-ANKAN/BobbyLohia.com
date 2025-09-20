import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
      {/* Floating Glassmorphism Navigation */}
      <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 rounded-full border border-white/20
        ${scrolled 
          ? 'bg-black/80 backdrop-blur-xl shadow-2xl shadow-white/5 scale-95' 
          : 'bg-black/60 backdrop-blur-lg shadow-xl shadow-white/10'
        }`}>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center px-8 py-4 space-x-8">
          <Link 
            to="/" 
            className="text-xl font-mangro font-bold text-white hover:text-primary-200 transition-all duration-500 hover:scale-105"
          >
            Bobby Lohia
          </Link>
          
          <div className="w-px h-6 bg-white/20"></div>
          
          <div className="flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 font-mangro text-sm tracking-wide transition-all duration-500 hover:scale-105 group
                  ${location.pathname === item.path 
                    ? 'text-white' 
                    : 'text-white/70 hover:text-white'
                  }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                )}
                <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center justify-between px-6 py-4">
          <Link 
            to="/" 
            className="text-lg font-mangro font-bold text-white"
          >
            Bobby Lohia
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-8 h-8 flex flex-col justify-center items-center group"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-500 ${isOpen ? 'rotate-45 translate-y-0.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-500 mt-1 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-500 mt-1 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-700 md:hidden ${
        isOpen 
          ? 'bg-black/95 backdrop-blur-xl opacity-100' 
          : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
      }`}>
        <div className={`flex flex-col items-center justify-center h-full space-y-8 transition-all duration-700 delay-200 ${
          isOpen ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0'
        }`}>
          {menuItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-2xl font-mangro text-white transition-all duration-700 hover:text-primary-200 hover:scale-110 ${
                isOpen 
                  ? 'transform translate-y-0 opacity-100' 
                  : 'transform translate-y-4 opacity-0'
              }`}
              style={{
                transitionDelay: isOpen ? `${300 + index * 100}ms` : '0ms'
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-white via-primary-200 to-white z-50 transition-all duration-300"
           style={{
             width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
           }}>
      </div>
    </>
  );
};

export default Navigation;
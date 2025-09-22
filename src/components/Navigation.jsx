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
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-2xl font-display font-bold text-white hover:text-gray-300 transition-colors duration-300"
            >
              Bobby Lohia
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${
                    location.pathname === item.path ? 'active text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center group"
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isOpen 
            ? 'bg-black/95 backdrop-blur-xl opacity-100' 
            : 'bg-transparent backdrop-blur-none opacity-0 pointer-events-none'
        }`}>
          <div className={`flex flex-col items-center justify-center h-full space-y-8 transition-all duration-500 delay-200 ${
            isOpen ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0'
          }`}>
            {menuItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-3xl font-display text-white transition-all duration-500 hover:text-gray-300 ${
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
      </nav>
    </>
  );
};

export default Navigation;
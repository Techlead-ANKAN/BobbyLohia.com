import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { 
      path: '/', 
      label: 'Home', 
      description: 'Welcome to my world',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      path: '/gallery', 
      label: 'Gallery', 
      description: 'Featured wildlife captures',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      path: '/albums', 
      label: 'Photo Albums', 
      description: 'Curated collections',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    { 
      path: '/contact', 
      label: 'Contact Me', 
      description: 'Let\'s connect',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Enhanced Hamburger Button with Glassmorphism */}
      <button
        onClick={toggleMenu}
        className={`fixed top-6 right-6 z-50 group p-4 rounded-2xl transition-all duration-500 ease-out transform hover:scale-110
          ${isOpen 
            ? 'bg-black/20 backdrop-blur-xl border border-white/20 text-white shadow-2xl rotate-90' 
            : scrolled
              ? 'bg-white/10 backdrop-blur-xl border border-white/20 text-forest-800 shadow-xl hover:shadow-2xl'
              : 'bg-white/90 backdrop-blur-sm border border-white/30 text-forest-800 shadow-lg hover:shadow-xl hover:bg-white'
          }`}
        aria-label="Toggle navigation menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1.5">
          <span 
            className={`block h-0.5 w-6 bg-current transition-all duration-500 ease-out transform origin-center
              ${isOpen ? 'rotate-45 translate-y-2' : 'group-hover:w-7'}`}
          />
          <span 
            className={`block h-0.5 bg-current transition-all duration-500 ease-out
              ${isOpen ? 'opacity-0 w-0' : 'w-4 group-hover:w-6'}`}
          />
          <span 
            className={`block h-0.5 w-6 bg-current transition-all duration-500 ease-out transform origin-center
              ${isOpen ? '-rotate-45 -translate-y-2' : 'group-hover:w-5'}`}
          />
        </div>
        
        {/* Ripple Effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-forest-600/20 to-sage-600/20 
          transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out -z-10`} />
      </button>

      {/* Enhanced Backdrop with Blur */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 ease-out
          ${isOpen 
            ? 'bg-black/60 backdrop-blur-md opacity-100' 
            : 'bg-black/0 backdrop-blur-0 opacity-0 pointer-events-none'
          }`}
        onClick={toggleMenu}
      />

      {/* Premium Side Menu Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-96 z-40 
          transform transition-all duration-700 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-earth-50/90 to-sage-50/95 
          backdrop-blur-2xl border-l border-white/20 shadow-2xl" />
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 -right-20 w-40 h-40 bg-gradient-to-br from-forest-600 to-sage-600 
            rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 -right-10 w-32 h-32 bg-gradient-to-br from-earth-600 to-forest-400 
            rounded-full blur-2xl animate-pulse delay-1000" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col">
          {/* Elegant Header */}
          <div className="pt-24 pb-8 px-8 border-b border-white/20">
            <div className="space-y-4">
              <h2 className="text-4xl font-great-vibes text-forest-900 leading-tight drop-shadow-sm">
                Bobby Lohia
              </h2>
              <p className="text-earth-600 font-cormorant italic text-lg tracking-wide">
                Wildlife Photography
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-forest-600 to-sage-600 rounded-full" />
            </div>
          </div>

          {/* Animated Menu Items */}
          <nav className="flex-1 p-8 space-y-3 overflow-y-auto">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative p-5 rounded-2xl transition-all duration-500 ease-out
                    transform hover:scale-105 hover:-translate-y-1
                    ${isActive 
                      ? 'bg-gradient-to-r from-forest-600 to-sage-600 text-white shadow-2xl scale-105' 
                      : 'hover:bg-white/60 hover:shadow-xl text-forest-800 backdrop-blur-sm'
                    } animate-fade-in block`}
                  style={{ 
                    animationDelay: `${(index * 0.1) + 0.3}s`,
                    animationFillMode: 'both'
                  }}
                >
                  {/* Background Glow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-forest-600/20 to-sage-600/20 
                    transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out -z-10
                    ${isActive ? 'scale-100' : ''}`} />
                  
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-xl transition-all duration-300
                      ${isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-forest-100 text-forest-600 group-hover:bg-forest-200 group-hover:scale-110'
                      }`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`text-xl font-great-vibes font-bold mb-1 transition-colors duration-300
                        ${isActive ? 'text-white' : 'text-forest-900 group-hover:text-forest-700'}`}>
                        {item.label}
                      </div>
                      <div className={`text-sm font-cormorant transition-colors duration-300
                        ${isActive ? 'text-forest-100' : 'text-earth-600 group-hover:text-earth-700'}`}>
                        {item.description}
                      </div>
                    </div>
                    <div className={`transition-transform duration-300 group-hover:translate-x-1
                      ${isActive ? 'text-white' : 'text-forest-400'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Premium Footer */}
          <div className="p-8 border-t border-white/20">
            <div className="text-center space-y-6">
              {/* Social Icons with Hover Effects */}
              <div className="flex justify-center space-x-4">
                {[
                  { 
                    href: "mailto:bobbylohia@gmail.com", 
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    ),
                    label: "Email",
                    color: "from-blue-600 to-blue-400"
                  },
                  { 
                    href: "tel:+1234567890", 
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    ),
                    label: "Phone",
                    color: "from-green-600 to-green-400"
                  },
                  { 
                    href: "#", 
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    ),
                    label: "Twitter",
                    color: "from-sky-600 to-sky-400"
                  }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    className="group relative p-3 rounded-xl bg-white/10 text-earth-600 
                      hover:text-white transition-all duration-300 ease-out
                      hover:scale-110 hover:shadow-lg backdrop-blur-sm
                      border border-white/10 hover:border-white/30"
                    aria-label={social.label}
                  >
                    {social.icon}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${social.color} 
                      transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out -z-10`} />
                  </a>
                ))}
              </div>
              
              {/* Signature */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-earth-400 font-cormorant tracking-wider">
                  © 2024 Bobby Lohia Photography
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
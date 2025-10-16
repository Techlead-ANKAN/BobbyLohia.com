import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Floating Elements - Responsive positioning */}
      <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-white/10 rounded-full blur-xl floating opacity-30"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/5 rounded-full blur-xl floating-delayed opacity-30"></div>
      <div className="absolute top-1/2 left-1/6 sm:left-1/4 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white/8 rounded-full blur-lg floating opacity-20"></div>

      {/* Main Content - Mobile-first responsive */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge - Mobile responsive */}
        <div className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs sm:text-sm font-medium mb-6 sm:mb-8 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
          <span className="hidden xs:inline">Wildlife Photography Portfolio</span>
          <span className="xs:hidden">Photography Portfolio</span>
        </div>

        {/* Main Heading - Responsive typography */}
        <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-copperplate font-bold text-white mb-4 sm:mb-6 leading-none transition-all duration-1000 delay-200 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="block">Bobby Lohia</span>
          {/* <span className="block hero-gradient-dark">Lohia</span> */}
        </h1>

        {/* Subtitle - Mobile optimized */}
        <p className={`text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0 transition-all duration-1000 delay-400 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Documenting raw stories of the wild and the timeless rhythm of nature.
        </p>

        {/* CTA Buttons - Mobile-first responsive */}
        <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center transition-all duration-1000 delay-600 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Link 
            to="/gallery" 
            className="relative overflow-hidden rounded-full px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-medium transition-all duration-500 hover:bg-black hover:text-white transform hover:scale-105 group w-full sm:w-auto max-w-xs touch-manipulation"
          >
            <span className="relative z-10 flex items-center justify-center">
              <span className="text-sm sm:text-base">Explore Gallery</span>
              <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
          
          <Link 
            to="/contact" 
            className="relative overflow-hidden rounded-full px-6 sm:px-8 py-3 sm:py-4 border border-white/30 text-white font-medium transition-all duration-500 hover:bg-white hover:text-black transform hover:scale-105 group w-full sm:w-auto max-w-xs touch-manipulation"
          >
            <span className="relative z-10 flex items-center justify-center">
              <span className="text-sm sm:text-base">Get In Touch</span>
              <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Stats - Mobile responsive grid */}
        <div className={`grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-20 max-w-2xl mx-auto px-4 sm:px-0 transition-all duration-1000 delay-800 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center">
            <div className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">15+</div>
            <div className="text-xs xs:text-sm sm:text-sm md:text-base text-white/60">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">10000+</div>
            <div className="text-xs xs:text-sm sm:text-sm md:text-base text-white/60">Photos Captured</div>
          </div>
          <div className="text-center">
            <div className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">50+</div>
            <div className="text-xs xs:text-sm sm:text-sm md:text-base text-white/60">Countries Visited</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

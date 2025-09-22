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
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl floating opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl floating-delayed opacity-30"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/8 rounded-full blur-lg floating opacity-20"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Badge */}
        <div className={`inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
          Wildlife Photography Portfolio
        </div>

        {/* Main Heading */}
        <h1 className={`text-responsive-xl font-display font-bold text-white mb-6 transition-all duration-1000 delay-200 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="block">Bobby</span>
          <span className="block hero-gradient-dark">Lohia</span>
        </h1>

        {/* Subtitle */}
        <p className={`text-responsive-md text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-400 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Through the lens of passion and precision, I document the untamed beauty of wildlife, 
          creating visual stories that inspire conservation and connect us with the natural world.
        </p>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-600 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Link 
            to="/gallery" 
            className="magnetic-btn bg-white text-slate-900 hover:text-white group"
          >
            <span className="relative z-10 flex items-center">
              Explore Gallery
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
          
          <Link 
            to="/contact" 
            className="magnetic-btn border border-white/30 text-white hover:bg-white/10 group"
          >
            <span className="relative z-10 flex items-center">
              Get In Touch
              <svg className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto transition-all duration-1000 delay-800 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">15+</div>
            <div className="text-sm text-white/60">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">1000+</div>
            <div className="text-sm text-white/60">Photos Captured</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-sm text-white/60">Countries Visited</div>
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

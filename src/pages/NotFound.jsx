import React from 'react';
import { Link } from 'react-router-dom';
import { wildlifeImages } from '../data/portfolio';

const NotFound = () => {
  const randomImage = wildlifeImages[Math.floor(Math.random() * wildlifeImages.length)];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('${randomImage.image}')`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <h1 className="text-8xl sm:text-9xl font-playfair font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-forest-200 to-sage-200">
          404
        </h1>
        <h2 className="text-3xl sm:text-4xl font-playfair font-semibold mb-6">
          Lost in the Wild
        </h2>
        <p className="text-xl font-lato text-forest-100 mb-8 leading-relaxed">
          Just like tracking elusive wildlife, sometimes we lose our way. 
          But every path in nature leads to a new discovery.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="btn-primary text-lg px-8 py-4 hover:scale-105 transition-transform duration-300"
          >
            Return Home
          </Link>
          <Link 
            to="/gallery" 
            className="btn-secondary bg-white/10 border-white/30 text-white hover:bg-white hover:text-forest-800 text-lg px-8 py-4 hover:scale-105 transition-all duration-300"
          >
            Explore Gallery
          </Link>
        </div>
        
        {/* Random Image Credit */}
        <div className="mt-12 text-sm text-forest-200 font-lato">
          <p>"{randomImage.title}" - {randomImage.location}</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
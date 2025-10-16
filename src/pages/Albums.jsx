import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { photoAlbums } from '../data/portfolio';

const Albums = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Ultra-Modern Hero Section - Mobile optimized */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-copperplate font-bold text-white mb-8 sm:mb-12 text-shadow-glow leading-tight">
            Photography
            <br />
            <span className="text-gradient-ultra">Albums</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 font-copperplate max-w-4xl mx-auto leading-relaxed px-4">
            Curated collections of wildlife encounters, organized to highlight unique perspectives of the natural world.
          </p>
        </div>
      </section>

      {/* Ultra-Modern Albums Grid - Enhanced Responsiveness */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {photoAlbums.map((album, index) => (
              <div key={index} className="group scroll-reveal touch-manipulation" style={{ animationDelay: `${index * 200}ms` }}>
                <Link to={`/albums/${album.id}`} className="block">
                  <div className="card-ultra-modern overflow-hidden image-reveal magnetic-hover">
                    <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                      <img
                        src={album.images[0]?.image}
                        alt={album.title}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="image-overlay">
                        <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-3 sm:left-4 lg:left-6 right-3 sm:right-4 lg:right-6">
                          <div className="text-white">
                            <span className="text-xs sm:text-sm bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
                              {album.images.length} photos
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 lg:p-8">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-copperplate text-white mb-2 sm:mb-3 group-hover:text-primary-200 transition-colors text-shadow-glow">
                        {album.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/80 font-copperplate mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                        {album.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-white/60 font-copperplate truncate">
                          {album.location || 'Multiple Locations'}
                        </span>
                        <div className="flex items-center space-x-1 text-white/70 group-hover:text-white transition-colors flex-shrink-0 ml-2">
                          <span className="text-xs sm:text-sm">View Album</span>
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-copperplate font-bold text-white mb-8 text-shadow-glow">
            Explore More Photography
          </h2>
          <p className="text-xl text-white/80 font-copperplate mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover individual masterpieces in our main gallery
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/gallery" 
                  className="relative overflow-hidden px-8 py-4 bg-white text-black font-semibold rounded-full
                             magnetic-hover group transition-all duration-500 transform hover:scale-105
                             hover:bg-gray-800 hover:text-white border-2 border-transparent hover:border-white/20
                             hover:shadow-lg hover:shadow-white/20">
              <span className="relative z-10">View Gallery</span>
            </Link>
            <Link to="/contact" 
                  className="relative overflow-hidden px-8 py-4 bg-transparent text-white font-semibold rounded-full
                             magnetic-hover group transition-all duration-500 transform hover:scale-105
                             border-2 border-white/30 hover:border-white/60 hover:bg-white/10
                             hover:shadow-lg hover:shadow-white/10">
              <span className="relative z-10">Get In Touch</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Albums;
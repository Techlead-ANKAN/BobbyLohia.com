import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { photoAlbums } from '../data/portfolio';

const Albums = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Ultra-Modern Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-7xl md:text-9xl font-mangro font-bold text-white mb-12 text-shadow-glow">
            Photography
            <br />
            <span className="text-gradient-ultra">Albums</span>
          </h1>
          <p className="text-xl text-white/80 font-mangro max-w-4xl mx-auto leading-relaxed">
            Curated collections of wildlife moments, each telling a unique story of nature's magnificence
          </p>
        </div>
      </section>

      {/* Ultra-Modern Albums Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {photoAlbums.map((album, index) => (
              <div key={index} className="group scroll-reveal" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="card-ultra-modern overflow-hidden image-reveal magnetic-hover">
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={album.images[0]?.image}
                      alt={album.title}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                    />
                    <div className="image-overlay">
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="text-white">
                          <span className="text-sm bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                            {album.images.length} photos
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-mangro text-white mb-3 group-hover:text-primary-200 transition-colors text-shadow-glow">
                      {album.title}
                    </h3>
                    <p className="text-white/80 font-mangro mb-4 leading-relaxed">
                      {album.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60 font-mangro">
                        {album.location}
                      </span>
                      <div className="flex items-center space-x-1 text-white/70 group-hover:text-white transition-colors">
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-mangro font-bold text-white mb-8 text-shadow-glow">
            Explore More Photography
          </h2>
          <p className="text-xl text-white/80 font-mangro mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover individual masterpieces in our main gallery
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/gallery" className="btn-ultra-modern magnetic-hover">
              <span className="relative z-10">View Gallery</span>
            </Link>
            <Link to="/contact" className="btn-secondary magnetic-hover">
              <span>Get In Touch</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Albums;
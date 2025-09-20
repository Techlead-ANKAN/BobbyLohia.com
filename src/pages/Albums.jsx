import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { photoAlbums } from '../data/portfolio';

const Albums = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-mangro font-bold text-white mb-8">
            Photography
            <br />
            <span className="text-gradient">Albums</span>
          </h1>
          <p className="text-xl text-white/70 font-mangro max-w-3xl mx-auto">
            Curated collections of wildlife moments, each telling a unique story of nature's magnificence
          </p>
        </div>
      </section>

      {/* Albums Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photoAlbums.map((album, index) => (
              <div key={index} className="group">
                <div className="card-modern overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={album.images[0]?.image}
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="image-overlay">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white">
                          <span className="text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                            {album.images.length} photos
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-mangro text-white mb-2 group-hover:text-primary-200 transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-white/70 font-mangro mb-3">
                      {album.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50 font-mangro">
                        {album.location}
                      </span>
                      <div className="flex items-center space-x-1 text-white/60">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-mangro font-bold text-white mb-6">
            Explore More Photography
          </h2>
          <p className="text-lg text-white/70 font-mangro mb-8 max-w-2xl mx-auto">
            Discover individual masterpieces in our main gallery
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/gallery" className="btn-primary">
              View Gallery
            </Link>
            <Link to="/contact" className="btn-secondary">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Albums;
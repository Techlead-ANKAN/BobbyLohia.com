import React, { useState, useEffect } from 'react';
import { wildlifeImages } from '../data/portfolio';

const ModernLightbox = ({ image, isOpen, onClose, onNext, onPrev }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setImageLoaded(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/98 backdrop-blur-xl flex items-center justify-center p-4">
      {/* Modern Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm
                   flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-500 z-10"
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={onPrev}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm
                   flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-500"
        aria-label="Previous"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={onNext}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm
                   flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-500"
        aria-label="Next"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image Container */}
      <div className="max-w-7xl w-full flex flex-col items-center">
        <div className="relative">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={image.image}
            alt={image.title}
            className={`max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        {/* Image Info */}
        <div className={`mt-8 text-center transition-all duration-700 delay-300 ${
          imageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          <h3 className="text-3xl font-mangro text-white mb-2">{image.title}</h3>
          <p className="text-lg text-white/70 font-mangro mb-1">{image.location}</p>
          <p className="text-sm text-white/50 font-mangro">{image.description}</p>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and search logic
  const filteredImages = wildlifeImages.filter(image => {
    const matchesFilter = filter === 'all' || image.category === filter;
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Get unique categories
  const categories = ['all', ...new Set(wildlifeImages.map(img => img.category))];

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-mangro font-bold text-white mb-8">
            Wildlife
            <br />
            <span className="text-gradient">Gallery</span>
          </h1>
          <p className="text-xl text-white/70 font-mangro max-w-3xl mx-auto">
            A comprehensive collection of wildlife moments captured across diverse ecosystems around the world
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-6 sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search wildlife..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-full text-white placeholder-white/50
                           focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-500
                           backdrop-blur-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-full font-mangro text-sm tracking-wide transition-all duration-500 transform hover:scale-105 ${
                    filter === category
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center">
            <p className="text-white/60 font-mangro text-sm">
              Showing {filteredImages.length} of {wildlifeImages.length} images
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={index}
                  className="gallery-item group cursor-pointer h-80"
                  onClick={() => openLightbox(image, index)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-lg font-mangro text-white mb-1">{image.title}</h3>
                        <p className="text-white/80 font-mangro text-sm mb-2">{image.location}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                            {image.category}
                          </span>
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-mangro text-white mb-4">No images found</h3>
              <p className="text-white/70 font-mangro">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-mangro font-bold text-white mb-6">
            Inspired by Nature?
          </h2>
          <p className="text-lg text-white/70 font-mangro mb-8 max-w-2xl mx-auto">
            Connect with me to discuss conservation projects, prints, or photography expeditions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Get In Touch
            </a>
            <a href="/albums" className="btn-secondary">
              Browse Albums
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <ModernLightbox
        image={selectedImage}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
};

export default Gallery;
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
    <div className="fixed inset-0 z-50 bg-black/98 backdrop-blur-xl flex items-center justify-center p-4
         animate-[fadeIn_0.3s_ease-in-out]">
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Ultra-Modern Hero Header */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-xl md:text-7xl font-mangro font-bold text-white mb-12 text-shadow-glow">
            Wildlife
            <br />
            <span className="text-gradient-ultra">Gallery</span>
          </h1>
          <p className="text-xl text-white/80 font-mangro max-w-4xl mx-auto leading-relaxed">
            An extensive gallery of images from diverse landscapes, ecosystems, and species across the globe.
          </p>
        </div>
      </section>

      {/* Enhanced Search and Filter Section */}
      <section className="py-10 px-6 sticky top-0 z-30 glass-ultra border-b border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            {/* Enhanced Search */}
            <div className="relative flex-1 max-w-lg">
              <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search wildlife..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-ultra w-full pl-14 pr-6 py-4 rounded-full hover:scale-[1.02] focus:scale-[1.02]
                           bg-white/10 border border-white/30 backdrop-blur-xl transform-gpu transition-all duration-500 
                           text-white placeholder-white/60 focus:text-white hover:text-white font-mangro"
              />
            </div>

            {/* Enhanced Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-8 py-3 rounded-full font-mangro text-sm font-semibold tracking-wide transition-all duration-500 
                    transform hover:scale-105 hover:shadow-lg hover:shadow-white/10 magnetic-hover relative overflow-hidden ${
                    filter === category
                      ? 'bg-white text-black hover:bg-gray-100 hover:text-black shadow-xl'
                      : 'bg-white/10 text-white hover:text-white hover:bg-white/20 border border-white/30 backdrop-blur-sm hover:border-white/50'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Results Count */}
          <div className="mt-6 text-center">
            <p className="text-white/70 font-mangro text-base">
              Showing {filteredImages.length} of {wildlifeImages.length} images
            </p>
          </div>
        </div>
      </section>

      {/* Ultra-Modern Gallery Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredImages.map((image, index) => (
                <div
                  key={index}
                  className="card-ultra-modern group cursor-pointer h-80 image-reveal magnetic-hover
                           hover:shadow-2xl hover:shadow-white/10 transition-all duration-700"
                  onClick={() => openLightbox(image, index)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative h-full overflow-hidden rounded-3xl">
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 
                               transform-gpu group-hover:rotate-1 filter group-hover:brightness-110"
                      loading="lazy"
                    />
                    <div className="image-overlay">
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                          <h3 className="text-xl font-mangro text-white mb-2 text-shadow-glow">{image.title}</h3>
                          <p className="text-white/90 font-mangro text-sm mb-4">{image.location}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-white/80 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                              {image.category}
                            </span>
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 morphing-blob">
                <svg className="w-16 h-16 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-mangro text-white mb-6 text-shadow-glow">No images found</h3>
              <p className="text-white/80 font-mangro text-lg">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-mangro font-bold text-white mb-8 text-shadow-glow
                         animate-[fadeInUp_0.6s_ease-out] hover:scale-105 transition-transform duration-500">
            Inspired by Nature?
          </h2>
          <p className="text-xl text-white/80 font-mangro mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect with me to discuss conservation projects, prints, or photography expeditions
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/contact" 
               className="relative overflow-hidden px-8 py-4 bg-white text-black font-semibold rounded-full
                          magnetic-hover group transition-all duration-500 transform hover:scale-105
                          hover:bg-gray-800 hover:text-white border-2 border-transparent hover:border-white/20
                          animate-[fadeInUp_0.8s_ease-out] hover:shadow-lg hover:shadow-white/20">
              <span className="relative z-10 flex items-center">
                Get In Touch
                <svg className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <a href="/albums" 
               className="relative overflow-hidden px-8 py-4 bg-transparent text-white font-semibold rounded-full
                          magnetic-hover group transition-all duration-500 transform hover:scale-105
                          border-2 border-white/30 hover:border-white/60 hover:bg-white/10
                          animate-[fadeInUp_0.8s_ease-out_0.2s] hover:shadow-lg hover:shadow-white/10">
              <span className="relative z-10 flex items-center">
                Browse Albums
                <svg className="ml-2 w-5 h-5 transform transition-transform group-hover:rotate-45" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
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
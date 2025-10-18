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

  // Keyboard event handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4
         animate-[fadeIn_0.3s_ease-in-out]">
      {/* Background Overlay - Click to close */}
      <div 
        className="absolute inset-0 bg-transparent cursor-pointer"
        onClick={onClose}
        aria-label="Close lightbox"
      />
      
      {/* Responsive Close Button - White for visibility on dark background */}
      <button
        onClick={onClose}
        className="fixed top-20 right-4 sm:top-24 sm:right-6 md:top-28 md:right-8 lg:top-32 lg:right-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-white/40 backdrop-blur-sm
                   flex items-center justify-center text-white hover:scale-110 transition-all duration-300 z-50 touch-manipulation shadow-lg hover:shadow-white/10 safe-area-inset-right safe-area-inset-top"
        aria-label="Close"
        title="Close (Press Esc)"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation Buttons - White for visibility on dark background */}
      <button
        onClick={onPrev}
        className="fixed left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm
                   flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-40 touch-manipulation safe-area-inset-left"
        aria-label="Previous"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={onNext}
        className="fixed right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm
                   flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-40 touch-manipulation safe-area-inset-right"
        aria-label="Next"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image Container - Properly Responsive and Contained */}
      <div className="w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-6">
        <div className="relative w-full flex justify-center items-center" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={image.image}
            alt={image.title}
            className={`w-auto h-auto object-contain rounded-lg sm:rounded-2xl shadow-2xl transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ 
              maxHeight: 'calc(60vh - 120px)',
              maxWidth: 'calc(80vw - 60px)'
            }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        {/* Image Info - White text on dark background */}
        <div className={`mt-3 sm:mt-4 md:mt-6 text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 delay-300 ${
          imageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-copperplate text-white mb-1 sm:mb-2 leading-tight">{image.title}</h3>
          <p className="text-sm xs:text-base sm:text-lg text-white/70 font-copperplate mb-1">{image.location}</p>
          <p className="text-xs xs:text-sm sm:text-base text-white/60 font-copperplate max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto leading-relaxed line-clamp-2">{image.description}</p>
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
          <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:gap-8 items-center justify-between">
            {/* Enhanced Search - Mobile-first responsive */}
            <div className="relative w-full max-w-lg lg:flex-1">
              <svg className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search wildlife..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-ultra w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 text-sm sm:text-base rounded-full hover:scale-[1.02] focus:scale-[1.02]
                           bg-white/10 border border-white/30 backdrop-blur-xl transform-gpu transition-all duration-500 
                           text-white placeholder-white/60 focus:text-white hover:text-white font-mangro touch-manipulation"
              />
            </div>

            {/* Enhanced Category Filter - Improved mobile layout */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center w-full lg:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-mangro text-xs sm:text-sm font-semibold tracking-wide transition-all duration-500 
                    transform hover:scale-105 hover:shadow-lg hover:shadow-white/10 magnetic-hover relative overflow-hidden touch-manipulation ${
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

      {/* Ultra-Modern Gallery Grid - White Background with Dark Grid Pattern */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 bg-white text-black overflow-hidden gallery-grid-section">
        <div className="max-w-7xl mx-auto relative z-10">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {filteredImages.map((image, index) => (
                <div
                  key={index}
                  className="card-ultra-modern group cursor-pointer image-reveal magnetic-hover
                           hover:shadow-2xl hover:shadow-black/10 transition-all duration-700 w-full max-w-[435px]"
                  onClick={() => openLightbox(image, index)}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    aspectRatio: '435/285'
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-3xl">
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
              <div className="w-32 h-32 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-8 morphing-blob">
                <svg className="w-16 h-16 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-mangro text-black mb-6">No images found</h3>
              <p className="text-black/80 font-mangro text-lg">Try adjusting your search or filter criteria</p>
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
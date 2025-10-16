import React, { useEffect, useState } from 'react';

const Lightbox = ({ image, isOpen, onClose, onNext, onPrev, currentIndex, totalImages }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setImageLoaded(false);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
    <div className="fixed inset-0 z-100 bg-black/95 backdrop-blur-xl flex items-center justify-center overflow-hidden">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Responsive Close Button - Positioned Below Navbar */}
      <button
        onClick={onClose}
        className="fixed top-20 right-4 sm:top-24 sm:right-6 md:top-28 md:right-8 lg:top-32 lg:right-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 hover:border-white/40 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 z-50 touch-manipulation shadow-lg hover:shadow-white/10 safe-area-inset-right safe-area-inset-top"
        aria-label="Close"
        title="Close (Press Esc)"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation Buttons - Fully Responsive Positioning */}
      <button
        onClick={onPrev}
        className="fixed left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-40 touch-manipulation safe-area-inset-left"
        aria-label="Previous"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={onNext}
        className="fixed right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-40 touch-manipulation safe-area-inset-right"
        aria-label="Next"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image Container - Properly Responsive and Contained */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 sm:py-6 md:py-8">
        {/* Image Wrapper with Proper Constraints */}
        <div className="relative w-full flex items-center justify-center" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="loading-dots">
                <div style={{ '--i': 0 }}></div>
                <div style={{ '--i': 1 }}></div>
                <div style={{ '--i': 2 }}></div>
              </div>
            </div>
          )}
          <img
            src={image.image}
            alt={image.title}
            className={`w-auto h-auto object-contain rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ 
              maxHeight: 'calc(60vh - 100px)',
              maxWidth: 'calc(80vw - 60px)'
            }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        {/* Image Info - Compact and Responsive */}
        <div className={`mt-3 sm:mt-4 md:mt-6 text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-500 delay-300 ${
          imageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-copperplate text-white mb-1 sm:mb-2 leading-tight">{image.title}</h3>
          <p className="text-sm xs:text-base sm:text-lg text-white/70 mb-1">{image.location}</p>
          <p className="text-xs xs:text-sm sm:text-base text-white/50 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto leading-relaxed line-clamp-2">{image.description}</p>
          
          {/* Image Counter - Compact */}
          <div className="mt-2 sm:mt-3 text-xs xs:text-sm text-white/60">
            {currentIndex + 1} of {totalImages}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;

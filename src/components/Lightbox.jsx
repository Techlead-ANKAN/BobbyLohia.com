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
    <div className="fixed inset-0 z-100 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={onPrev}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
        aria-label="Previous"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={onNext}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
        aria-label="Next"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image Container */}
      <div className="relative max-w-7xl w-full max-h-[90vh] flex flex-col items-center">
        <div className="relative">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
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
            className={`max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        {/* Image Info */}
        <div className={`mt-8 text-center transition-all duration-500 delay-300 ${
          imageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          <h3 className="text-3xl font-display text-white mb-2">{image.title}</h3>
          <p className="text-lg text-white/70 mb-1">{image.location}</p>
          <p className="text-sm text-white/50 max-w-2xl">{image.description}</p>
          
          {/* Image Counter */}
          <div className="mt-4 text-sm text-white/60">
            {currentIndex + 1} of {totalImages}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;

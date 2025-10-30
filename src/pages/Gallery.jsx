import React, { useState, useEffect } from 'react';
import { wildlifeImages } from '../data/portfolio';
import SEO from '../components/SEO';
import { GallerySchema } from '../components/ImageSchema';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4
         animate-[fadeIn_0.3s_ease-in-out]"
         style={{
           backgroundImage: 'url(/images/wall-texture.jpg)',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}>
      {/* Wall Texture Overlay for depth */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Background Overlay - Click to close */}
      <div 
        className="absolute inset-0 bg-transparent cursor-pointer z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      />
      
      {/* Responsive Close Button - Light for visibility on dark background */}
      <button
        onClick={onClose}
        className="fixed top-20 right-4 sm:top-24 sm:right-6 md:top-28 md:right-8 lg:top-32 lg:right-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-white/40
                   flex items-center justify-center text-white hover:scale-110 transition-all duration-300 z-50 touch-manipulation shadow-lg hover:shadow-white/10 safe-area-inset-right safe-area-inset-top"
        aria-label="Close"
        title="Close (Press Esc)"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation Buttons - Light for visibility on dark background */}
      <button
        onClick={onPrev}
        className="fixed left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/20
                   flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-40 touch-manipulation safe-area-inset-left"
        aria-label="Previous"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={onNext}
        className="fixed right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 border border-white/20
                   flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-40 touch-manipulation safe-area-inset-right"
        aria-label="Next"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Photo Frame Container */}
      <div className="w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-6 relative z-20">
        <div className="relative flex justify-center items-center" style={{ maxHeight: 'calc(100vh - 120px)' }}>
          
          {/* Realistic Dark Frame with Sharp Corners & Deep Beveling */}
          <div className="relative p-4 sm:p-5 md:p-6 shadow-2xl"
               style={{ 
                 background: `
                   linear-gradient(135deg, 
                     #110B11 0%, #1A1216 15%, #0E090E 25%, #151015 35%, 
                     #110B11 45%, #1C171C 55%, #110B11 65%, #0F0A0F 75%,
                     #141014 85%, #110B11 95%, #0D080D 100%
                   )
                 `,
                 boxShadow: `
                   inset 0 0 0 1px #3A353A,
                   inset 0 0 0 2px #050205,
                   inset 0 0 0 4px #2A252A,
                   inset 0 0 0 5px #0A050A,
                   inset 4px 4px 16px rgba(0,0,0,0.9),
                   inset -4px -4px 16px rgba(255,255,255,0.08),
                   inset 8px 0 24px rgba(0,0,0,0.5),
                   inset -8px 0 24px rgba(0,0,0,0.5),
                   inset 0 8px 24px rgba(0,0,0,0.5),
                   inset 0 -8px 24px rgba(255,255,255,0.03),
                   0 0 0 2px #050205,
                   0 16px 48px rgba(0,0,0,0.7),
                   0 24px 72px rgba(0,0,0,0.5)
                 `,
                 border: '2px solid #050205',
                 borderRadius: '0px',
                 position: 'relative'
               }}>
            
            {/* Outer Beveled Edge */}
            <div className="absolute -inset-2 border-4"
                 style={{
                   borderColor: '#3A353A #050205 #050205 #3A353A',
                   borderRadius: '0px',
                   boxShadow: `
                     2px 2px 6px rgba(0,0,0,0.6),
                     -2px -2px 6px rgba(255,255,255,0.03)
                   `
                 }}></div>
            
            {/* Inner Beveled Groove */}
            <div className="absolute inset-3 border-2"
                 style={{
                   borderColor: '#050205 #3A353A #3A353A #050205',
                   borderRadius: '0px',
                   boxShadow: `
                     inset 2px 2px 8px rgba(255,255,255,0.05),
                     inset -2px -2px 8px rgba(0,0,0,0.8)
                   `
                 }}></div>
            
            {/* Deep Center Groove */}
            <div className="absolute inset-6 border"
                 style={{
                   borderColor: '#0A050A #2A252A #2A252A #0A050A',
                   borderRadius: '0px',
                   boxShadow: `
                     inset 1px 1px 4px rgba(255,255,255,0.02),
                     inset -1px -1px 4px rgba(0,0,0,0.9)
                   `
                 }}></div>
            
            {/* Inner White Matting - Reduced by 30% */}
            <div className="bg-white p-5 sm:p-8 md:p-11 shadow-inner"
                 style={{ 
                   boxShadow: 'inset 0 0 30px rgba(0,0,0,0.1), inset 0 0 50px rgba(0,0,0,0.05)' 
                 }}>
              
              {/* Image Container */}
              <div className="relative bg-white">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-amber-700/30 border-t-amber-700 rounded-full animate-spin"></div>
                  </div>
                )}
                
                <img
                  src={image.image}
                  alt={image.alt || `${image.title || 'Wildlife photography'} - High-resolution nature photography by Bobby Lohia showcasing ${image.category?.toLowerCase()} from ${image.location}`}
                  title={image.title || `Professional ${image.category} Photography by Bobby Lohia`}
                  className={`block max-w-full object-contain mx-auto transition-all duration-700 ${
                    imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{ 
                    maxHeight: 'calc(65vh - 100px)',
                    maxWidth: 'calc(85vw - 150px)',
                    minHeight: 'clamp(200px, 30vh, 400px)'
                  }}
                  onLoad={() => setImageLoaded(true)}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Image Info - Light text on dark background */}
        <div className={`mt-3 sm:mt-4 md:mt-6 text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 delay-300 ${
          imageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          <p className="text-sm xs:text-base sm:text-lg text-white/70 font-copperplate mb-1">{image.location}</p>
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

  // Filter logic - fixed to work with case insensitive matching
  const filteredImages = wildlifeImages.filter(image => {
    if (filter === 'all') return true;
    return image.category && image.category.toLowerCase() === filter.toLowerCase();
  });

  // Get only the three categories we want
  const categories = ['all', 'wildlife', 'landscape'];

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
    <>
      <SEO 
        title="Wildlife Photography Gallery | Bobby Lohia - Professional Nature Photographer"
        description="Browse Bobby Lohia's extensive wildlife photography gallery featuring 160+ stunning images of African safaris, Bengal tigers, exotic wildlife, and breathtaking landscapes. Professional nature photography with search and filter options."
        keywords="wildlife photography gallery, Bobby Lohia gallery, nature photography collection, African safari photos, wildlife images, Bengal tiger photography, landscape photography, conservation photography, professional wildlife photographer"
        image="/images/WildlifeAlbumFiles1.jpg"
        type="website"
      />
      <GallerySchema 
        name="Wildlife Photography Gallery"
        description="Complete collection of Bobby Lohia's wildlife photography featuring tigers, elephants, birds, and diverse wildlife from India's premier national parks."
        images={wildlifeImages}
      />
      <div className="min-h-screen text-white relative overflow-hidden"
           style={{
             background: `
               linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.8) 100%),
               url('/images/TextureBlack4.jpg')
             `,
             backgroundSize: 'cover, cover',
             backgroundPosition: 'center, center',
             backgroundRepeat: 'no-repeat, no-repeat',
             backgroundAttachment: 'fixed, fixed'
           }}>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Subtle animated leaves/particles */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-green-500/10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-amber-500/15 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-orange-500/10 rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-60 right-1/3 w-1 h-1 bg-emerald-500/15 rounded-full animate-ping" style={{ animationDelay: '6s' }}></div>
          
          {/* Organic flowing shapes */}
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-green-900/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-l from-amber-900/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }}></div>
        </div>
        
        {/* Ultra-Modern Hero Header */}
      <section className="pt-60 pb-44 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mangro font-bold text-white mb-12 text-shadow-glow">
            Wildlife
            <br />
            <span className="text-gradient-ultra">Gallery</span>
          </h1>
          <p className="text-xl text-white/80 font-mangro max-w-4xl mx-auto leading-relaxed">
            An extensive gallery of images from diverse landscapes, ecosystems, and species across the globe.
          </p>
        </div>
      </section>



      {/* Ultra-Modern Gallery Grid - Texture Background */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 text-black overflow-hidden gallery-grid-section"
               style={{
                 background: `
                   linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 50%, rgba(255,255,255,0.9) 100%),
                   url('/images/Texture6172297.jpg')
                 `,
                 backgroundSize: 'cover, cover',
                 backgroundPosition: 'center, center',
                 backgroundRepeat: 'no-repeat, repeat',
                 backgroundAttachment: 'local, fixed'
               }}>
        
        {/* Category Filter Section - Fixed */}
        <div className="max-w-7xl mx-auto mb-12 z-50 relative">
          <div className="flex justify-center">
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-3 rounded-full font-mangro text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  filter === 'all'
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-gray-100 text-black hover:bg-gray-200 border border-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('wildlife')}
                className={`px-6 py-3 rounded-full font-mangro text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  filter === 'wildlife'
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-gray-100 text-black hover:bg-gray-200 border border-gray-300'
                }`}
              >
                Wildlife
              </button>
              <button
                onClick={() => setFilter('landscape')}
                className={`px-6 py-3 rounded-full font-mangro text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  filter === 'landscape'
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-gray-100 text-black hover:bg-gray-200 border border-gray-300'
                }`}
              >
                Landscape
              </button>
            </div>
          </div>

          {/* Enhanced Results Count */}
          <div className="mt-6 text-center">
            <p className="text-black/70 font-mangro text-base">
              Showing {filteredImages.length} of {wildlifeImages.length} images
            </p>
          </div>
        </div>
        
        {/* Subtle overlay for better contrast */}
        <div className="absolute inset-0 bg-white/20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
              {filteredImages.map((image, index) => (
                <div
                  key={index}
                  className="cursor-pointer w-full max-w-[435px]"
                  onClick={() => openLightbox(image, index)}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    aspectRatio: '435/285',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35), 0 6px 16px rgba(0, 0, 0, 0.25), 0 3px 8px rgba(0, 0, 0, 0.17)',
                    borderRadius: '0.75rem'
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <img
                      src={image.image}
                      alt={image.alt || `${image.title || 'Wildlife photography'} - Professional nature photography by Bobby Lohia featuring ${image.category?.toLowerCase()} from ${image.location}`}
                      title={image.title || `${image.category} Photography by Bobby Lohia`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
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
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-mangro text-black mb-4 sm:mb-6">No images found</h3>
              <p className="text-black/80 font-mangro text-lg">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-gray-900/40 to-transparent"></div>
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 radial-gradient(circle at 30% 20%, rgba(139,69,19,0.15) 0%, transparent 40%),
                 radial-gradient(circle at 70% 80%, rgba(34,139,34,0.12) 0%, transparent 40%),
                 linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.01) 50%, transparent 52%)
               `
             }}></div>
        
        {/* Floating wildlife silhouettes */}
        <div className="absolute top-10 left-1/4 opacity-5">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-white animate-float">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84.95 1.48 2.27 2.71 3.92 3.53.82.41 1.73.63 2.67.63s1.85-.22 2.67-.63c1.65-.82 2.97-2.05 3.92-3.53C20.5 12.37 21 10.74 21 9c0-3.87-3.13-7-9-7z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 right-1/4 opacity-5">
          <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor" className="text-white animate-float" style={{ animationDelay: '2s' }}>
            <path d="M18.5 2.5c0 1.93-1.57 3.5-3.5 3.5S11.5 4.43 11.5 2.5 13.07-1 15-1s3.5 1.57 3.5 3.5zM12 8c-3.31 0-6 2.69-6 6v8h4v-8c0-1.1.9-2 2-2s2 .9 2 2v8h4v-8c0-3.31-2.69-6-6-6z"/>
          </svg>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mangro font-bold text-white mb-6 sm:mb-8 text-shadow-glow
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
    </>
  );
};

export default Gallery;
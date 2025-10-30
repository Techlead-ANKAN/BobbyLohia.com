import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { photoAlbums } from '../data/portfolio';
import GalleryCard from '../components/GalleryCard';
import Lightbox from '../components/Lightbox';

const AlbumDetail = () => {
  const { albumId } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // Find the album by ID
  const album = photoAlbums.find(album => album.id === albumId);
  
  // If album not found, redirect to albums page
  if (!album) {
    return <Navigate to="/albums" replace />;
  }

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
    const nextIndex = (currentImageIndex + 1) % album.images.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(album.images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + album.images.length) % album.images.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(album.images[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Album Hero Section */}
      <section className="pt-24 xs:pt-28 md:pt-32 pb-5 xs:pb-9 md:pb-14 px-4 xs:px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 xs:mb-8">
            <nav className="flex items-center space-x-2 text-xs xs:text-sm text-white/60 overflow-hidden">
              <Link to="/albums" className="hover:text-white transition-colors whitespace-nowrap">
                Albums
              </Link>
              <svg className="w-3 h-3 xs:w-4 xs:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white truncate">{album.title}</span>
            </nav>
          </div>

          {/* Album Header */}
          <div className="text-center mb-12 xs:mb-14 md:mb-16">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-copperplate font-bold text-white mb-6 xs:mb-8 text-shadow-glow leading-tight">
              <span className="block">{album.title}</span>
              <span className="text-gradient-ultra">Collection</span>
            </h1>
            <p className="text-base xs:text-lg sm:text-xl text-white/80 font-copperplate max-w-4xl mx-auto leading-relaxed mb-6 xs:mb-8 px-4">
              {album.description}
            </p>
            <div className="inline-flex items-center px-4 xs:px-6 py-2 xs:py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm xs:text-base">
              <svg className="w-4 h-4 xs:w-5 xs:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {album.images.length} Photos
            </div>
          </div>
        </div>
      </section>

      {/* Photo Grid - Exact 3-Column Layout Like Featured Work */}
      <section className="pt-6 xs:pt-8 md:pt-10 pb-12 xs:pb-16 md:pb-20 px-4 xs:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {album.images.map((image, index) => (
              <GalleryCard
                key={image.id}
                image={image}
                index={index}
                onClick={openLightbox}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Back to Albums Section */}
      <section className="py-20 xs:py-24 md:py-32 px-4 xs:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl font-copperplate font-bold text-white mb-6 xs:mb-8 text-shadow-glow leading-tight">
            <span className="block">Explore More</span>
            <span className="text-gradient-ultra">Collections</span>
          </h2>
          <p className="text-base xs:text-lg sm:text-xl text-white/80 font-copperplate mb-8 xs:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Discover more curated photography collections showcasing different aspects of wildlife and nature.
          </p>
          <div className="flex flex-col xs:flex-col sm:flex-row gap-4 xs:gap-6 justify-center max-w-md xs:max-w-lg sm:max-w-none mx-auto">
            <Link to="/albums" 
                  className="relative overflow-hidden px-6 xs:px-8 py-3 xs:py-4 bg-white text-black font-semibold rounded-full
                             transition-all duration-500 transform hover:scale-105
                             hover:bg-black hover:text-white border-2 border-transparent hover:border-white/20
                             hover:shadow-lg hover:shadow-white/20 text-sm xs:text-base touch-manipulation">
              <span className="relative z-10 flex items-center justify-center">
                <svg className="mr-2 w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                View All Albums
              </span>
            </Link>
            <Link to="/gallery" 
                  className="relative overflow-hidden px-6 xs:px-8 py-3 xs:py-4 bg-transparent text-white font-semibold rounded-full
                             transition-all duration-500 transform hover:scale-105
                             border-2 border-white/30 hover:border-white/60 hover:bg-white hover:text-black
                             hover:shadow-lg hover:shadow-white/10 text-sm xs:text-base touch-manipulation">
              <span className="relative z-10 flex items-center justify-center">
                Browse Gallery
                <svg className="ml-2 w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        image={selectedImage}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
        currentIndex={currentImageIndex}
        totalImages={album.images.length}
      />
    </div>
  );
};

export default AlbumDetail;
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
      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-white/60">
              <Link to="/albums" className="hover:text-white transition-colors">
                Albums
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white">{album.title}</span>
            </nav>
          </div>

          {/* Album Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-mangro font-bold text-white mb-8 text-shadow-glow">
              {album.title}
              <br />
              <span className="text-gradient-ultra">Collection</span>
            </h1>
            <p className="text-xl text-white/80 font-mangro max-w-4xl mx-auto leading-relaxed mb-8">
              {album.description}
            </p>
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {album.images.length} Photos
            </div>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-mangro font-bold text-white mb-8 text-shadow-glow">
            Explore More
            <br />
            <span className="text-gradient-ultra">Collections</span>
          </h2>
          <p className="text-xl text-white/80 font-mangro mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover more curated photography collections showcasing different aspects of wildlife and nature.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/albums" 
                  className="relative overflow-hidden px-8 py-4 bg-white text-black font-semibold rounded-full
                             transition-all duration-500 transform hover:scale-105
                             hover:bg-black hover:text-white border-2 border-transparent hover:border-white/20
                             hover:shadow-lg hover:shadow-white/20">
              <span className="relative z-10 flex items-center">
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                View All Albums
              </span>
            </Link>
            <Link to="/gallery" 
                  className="relative overflow-hidden px-8 py-4 bg-transparent text-white font-semibold rounded-full
                             transition-all duration-500 transform hover:scale-105
                             border-2 border-white/30 hover:border-white/60 hover:bg-white hover:text-black
                             hover:shadow-lg hover:shadow-white/10">
              <span className="relative z-10 flex items-center">
                Browse Gallery
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
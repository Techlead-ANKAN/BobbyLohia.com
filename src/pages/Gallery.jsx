import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { wildlifeImages } from '../data/portfolio';

const Lightbox = ({ image, isOpen, onClose, onNext, onPrev }) => {
  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl p-2 hover:bg-white/10 rounded-full transition-colors duration-200 z-10"
        aria-label="Close lightbox"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous Button */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
        aria-label="Next image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image Container */}
      <div className="max-w-4xl max-h-full flex flex-col">
        <img
          src={image.image}
          alt={image.title}
          className="max-w-full max-h-[70vh] object-contain rounded-lg"
        />
        
        {/* Image Info */}
        <div className="mt-4 text-center text-white">
          <h3 className="text-2xl font-yeseva font-semibold mb-2">{image.title}</h3>
          <p className="text-lg font-cormorant text-gray-300 mb-2">{image.description}</p>
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-400 font-cormorant">
            <span>{image.location}</span>
            <span>•</span>
            <span>{image.year}</span>
            <span>•</span>
            <span className="px-2 py-1 bg-forest-600 rounded-full text-white">
              {image.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(20); // Show 20 images initially

  const categories = ['All', ...new Set(wildlifeImages.map(img => img.category))];
  
  const filteredImages = filter === 'All' 
    ? wildlifeImages 
    : wildlifeImages.filter(img => img.category === filter);

  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMoreImages = visibleCount < filteredImages.length;

  const loadMoreImages = () => {
    setVisibleCount(prev => Math.min(prev + 20, filteredImages.length));
  };

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  // Reset visible count when filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setVisibleCount(20);
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Elegant Header Section */}
      <section className="py-12 bg-gradient-to-br from-forest-100 via-sage-50 to-earth-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-24 h-24 bg-gradient-to-br from-forest-400 to-sage-400 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 left-20 w-32 h-32 bg-gradient-to-br from-earth-400 to-forest-400 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container-custom text-center relative">
          <div className="space-y-4">
            <h1 className="text-6xl lg:text-7xl font-mangro text-forest-900 mb-3 drop-shadow-lg">
              Gallery
            </h1>
            <div className="flex justify-center items-center space-x-6 mb-3">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-forest-500 to-transparent" />
              <div className="w-3 h-3 bg-forest-500 rounded-full animate-pulse" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-forest-500 to-transparent" />
            </div>
            <p className="text-xl lg:text-2xl text-earth-700 font-mangro font-light max-w-4xl mx-auto leading-relaxed tracking-wide">
              A curated collection of wildlife photography showcasing the raw beauty, 
              intimate moments, and incredible diversity of life in the natural world.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 bg-sage-50">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-6 py-3 rounded-full font-mangro font-medium transition-all duration-300 
                  ${filter === category
                    ? 'bg-forest-600 text-white shadow-lg'
                    : 'bg-white text-forest-700 hover:bg-forest-100 shadow-md hover:shadow-lg'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Masonry Gallery */}
      <section className="py-16 bg-gradient-to-b from-sage-50 to-earth-50 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-forest-400 to-sage-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-br from-earth-400 to-forest-400 rounded-full blur-2xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-sage-400 to-earth-400 rounded-full blur-xl animate-pulse delay-2000" />
        </div>

        <div className="container-custom relative">
          {/* Unique Masonry Grid */}
          <div className="masonry-grid columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {visibleImages.map((image, index) => {
              // Create unique height variations for masonry effect
              const heights = ['h-64', 'h-80', 'h-96', 'h-72', 'h-88'];
              const randomHeight = heights[index % heights.length];
              
              return (
                <div
                  key={image.id}
                  className={`break-inside-avoid mb-6 group cursor-pointer animate-fade-in transform hover:scale-[1.02] transition-all duration-700 hover:z-10 relative`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    transformOrigin: 'center'
                  }}
                  onClick={() => openLightbox(image, index)}
                >
                  {/* Elegant Card Container */}
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:shadow-earth-500/20">
                    {/* Image with Unique Aspect Ratios */}
                    <div className={`relative ${randomHeight} overflow-hidden`}>
                      <img
                        src={image.thumbnail}
                        alt={image.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                      />
                      
                      {/* Sophisticated Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      
                      {/* Glassmorphism Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm" />
                    </div>

                    {/* Elegant Info Card */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
                      <div className="backdrop-blur-md bg-black/30 rounded-xl p-4 border border-white/20">
                        <h3 className="text-lg font-yeseva text-white mb-2 drop-shadow-lg">
                          {image.title}
                        </h3>
                        <p className="text-sm font-cormorant text-earth-100 mb-3 opacity-90">
                          {image.location}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs px-3 py-1 bg-gradient-to-r from-forest-600/80 to-sage-600/80 rounded-full font-cormorant font-medium backdrop-blur-sm border border-white/20">
                            {image.category}
                          </span>
                          <span className="text-xs text-earth-200 font-cormorant opacity-75">
                            {image.year}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Floating Action Button */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 delay-200">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-xl">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>

                    {/* Elegant Corner Decorations */}
                    <div className="absolute top-0 left-0 w-0 h-0 border-l-[20px] border-t-[20px] border-l-transparent border-t-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[20px] border-b-[20px] border-r-transparent border-b-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Subtle Particle Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.2}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {hasMoreImages && (
            <div className="text-center mt-16">
              <button
                onClick={loadMoreImages}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-forest-600 to-sage-600 
                         text-white font-cormorant font-semibold rounded-full hover:from-forest-700 hover:to-sage-700 
                         transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
              >
                <span>Load More Images</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-y-1 transition-transform duration-300" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <p className="mt-4 text-sm text-earth-600 font-cormorant">
                Showing {visibleImages.length} of {filteredImages.length} images
              </p>
            </div>
          )}

          {/* No Results Message */}
          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-earth-600 font-cormorant">
                No images found for the selected category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        image={selectedImage}
        isOpen={!!selectedImage}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
};

export default Gallery;
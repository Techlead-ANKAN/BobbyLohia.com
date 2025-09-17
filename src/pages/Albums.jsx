import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { photoAlbums } from '../data/portfolio';

// Enhanced Lightbox for Individual Photos
const PhotoLightbox = ({ image, isOpen, onClose, onNext, onPrev, albumTitle }) => {
  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-2xl p-3 hover:bg-white/10 rounded-full transition-all duration-300 z-10 backdrop-blur-sm"
        aria-label="Close lightbox"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous Button */}
      <button
        onClick={onPrev}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-2xl p-3 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-2xl p-3 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image Container */}
      <div className="max-w-6xl max-h-full flex flex-col items-center">
        <img
          src={image.image}
          alt={image.title}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
        />
        
        {/* Image Info */}
        <div className="mt-6 text-center text-white backdrop-blur-md bg-black/30 rounded-xl p-4 border border-white/20">
          <h3 className="text-2xl font-great-vibes font-bold text-white mb-2 drop-shadow-lg">{image.title}</h3>
          <p className="text-earth-200 font-cormorant mb-1">{image.location}</p>
          <p className="text-sm text-earth-300 font-lato">From album: {albumTitle}</p>
        </div>
      </div>
    </div>
  );
};

// Enhanced Album Modal with Individual Photo Navigation
const AlbumModal = ({ album, isOpen, onClose }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  if (!isOpen || !album) return null;

  const openPhoto = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentPhotoIndex(index);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    const nextIndex = (currentPhotoIndex + 1) % album.images.length;
    setCurrentPhotoIndex(nextIndex);
    setSelectedPhoto(album.images[nextIndex]);
  };

  const prevPhoto = () => {
    const prevIndex = currentPhotoIndex === 0 ? album.images.length - 1 : currentPhotoIndex - 1;
    setCurrentPhotoIndex(prevIndex);
    setSelectedPhoto(album.images[prevIndex]);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/90 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-white via-sage-50 to-earth-50 rounded-3xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden border border-earth-200">
          {/* Enhanced Modal Header */}
          <div className="relative p-8 bg-gradient-to-r from-forest-800 to-sage-800 text-white">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative">
              <h2 className="text-4xl font-great-vibes font-bold text-white mb-3 drop-shadow-lg">
                {album.title}
              </h2>
              <p className="text-earth-100 font-cormorant text-lg mb-2">{album.description}</p>
              <div className="flex items-center space-x-4 text-sm font-lato">
                <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm font-semibold text-white">
                  {album.images.length} Photos
                </span>
                <span className="text-earth-200">{album.location}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Close album"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Enhanced Modal Content with Masonry Grid */}
          <div className="p-8 overflow-y-auto max-h-[calc(95vh-200px)]">
            <div className="masonry-grid columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {album.images.map((image, index) => {
                const heights = ['h-48', 'h-64', 'h-56', 'h-72', 'h-60'];
                const randomHeight = heights[index % heights.length];
                
                return (
                  <div
                    key={image.id}
                    className={`break-inside-avoid mb-6 group cursor-pointer animate-fade-in transform hover:scale-[1.02] transition-all duration-500`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => openPhoto(image, index)}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:shadow-forest-500/20">
                      <div className={`relative ${randomHeight} overflow-hidden`}>
                        <img
                          src={image.thumbnail}
                          alt={image.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        />
                        
                        {/* Sophisticated Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        
                        {/* Photo Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
                          <div className="backdrop-blur-md bg-black/30 rounded-lg p-3 border border-white/20">
                            <h4 className="text-sm font-great-vibes font-bold text-white mb-1 drop-shadow-md">
                              {image.title}
                            </h4>
                            <p className="text-xs font-cormorant text-earth-100">
                              {image.location}
                            </p>
                          </div>
                        </div>

                        {/* Zoom Icon */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 delay-100">
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Individual Photo Lightbox */}
      <PhotoLightbox
        image={selectedPhoto}
        isOpen={!!selectedPhoto}
        onClose={closePhoto}
        onNext={nextPhoto}
        onPrev={prevPhoto}
        albumTitle={album.title}
      />
    </>
  );
};

const Albums = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const openAlbum = (album) => {
    setSelectedAlbum(album);
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
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
            <h1 className="text-6xl lg:text-7xl font-great-vibes text-forest-900 mb-3 drop-shadow-lg">
              Photo Albums
            </h1>
            <div className="flex justify-center items-center space-x-6 mb-3">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-forest-500 to-transparent" />
              <div className="w-3 h-3 bg-forest-500 rounded-full animate-pulse" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-forest-500 to-transparent" />
            </div>
            <p className="text-xl lg:text-2xl text-earth-700 font-cormorant font-light max-w-4xl mx-auto leading-relaxed tracking-wide">
              Curated collections showcasing different aspects of wildlife and nature photography. 
              Each album tells a unique story through carefully selected images that capture 
              the essence of our natural world.
            </p>
            <div className="mt-8 text-sm font-lato text-earth-600">
              Click on any album to explore the full collection
            </div>
          </div>
        </div>
      </section>

      {/* Sophisticated Albums Grid */}
      <section className="py-20 bg-gradient-to-b from-sage-50 to-earth-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {photoAlbums.map((album, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={album.id}
                  className={`group cursor-pointer animate-slide-up transform hover:scale-[1.02] transition-all duration-700 ${
                    isEven ? 'lg:translate-y-8' : 'lg:-translate-y-8'
                  }`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                  onClick={() => openAlbum(album)}
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white transition-all duration-700 hover:shadow-forest-500/20 border border-earth-100">
                    {/* Album Cover */}
                    <div className="relative h-96 overflow-hidden">
                      <img
                        src={album.coverImage}
                        alt={album.title}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
                      />
                      
                      {/* Sophisticated Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-500" />
                      
                      {/* Floating Info Card */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="backdrop-blur-xl bg-white/20 rounded-2xl p-6 border border-white/30 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          <h3 className="text-2xl font-great-vibes text-white mb-2">
                            {album.title}
                          </h3>
                          <p className="text-earth-100 font-cormorant text-sm mb-3 leading-relaxed">
                            {album.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs font-lato text-earth-200">
                              <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
                                {album.images.length} Photos
                              </span>
                              <span>{album.location}</span>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 delay-100">
                              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Corner Badge */}
                      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform rotate-12 group-hover:rotate-0 transition-all duration-500">
                        <div className="bg-sage-600 text-white px-3 py-1 rounded-full text-xs font-lato backdrop-blur-sm border border-white/20">
                          View Album
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Album Stats */}
                    <div className="p-6 bg-gradient-to-r from-white to-sage-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-sage-600 rounded-full animate-pulse" />
                          <span className="text-sm font-lato text-earth-600">
                            Latest Collection
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-cormorant text-forest-800">
                            {album.featured ? 'Featured Album' : 'Explore Now'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Album Modal */}
      <AlbumModal
        album={selectedAlbum}
        isOpen={!!selectedAlbum}
        onClose={closeAlbum}
      />
    </div>
  );
};

export default Albums;
import React, { useState } from 'react';

const GalleryCard = ({ image, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`group cursor-pointer animate-fade-in-up touch-manipulation`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => onClick(image, index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass-card p-2 sm:p-4 h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
        <div className="relative h-full">
          {/* Image */}
          <div className="image-hover h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-md sm:rounded-lg"></div>
          )}
            <img
              src={image.image}
              alt={image.title}
              className={`w-full h-full object-cover rounded-md sm:rounded-lg transition-all duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          </div>

          {/* Overlay Content - Mobile-optimized */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-md sm:rounded-lg transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0'
          } ${
            /* Always show on touch devices */ 
            'sm:opacity-100 md:opacity-0 md:group-hover:opacity-100'
          }`}>
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6">
              <div className={`transform transition-all duration-300 ${
                isHovered ? 'translate-y-0' : 'translate-y-2 sm:translate-y-0 md:translate-y-4'
              }`}>
                <h3 className="text-sm sm:text-lg lg:text-xl font-display text-white mb-1 sm:mb-2 truncate">{image.title}</h3>
                <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-3 truncate">{image.location}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-white">
                    {image.category}
                  </span>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shimmer Effect */}
          <div className={`shimmer absolute inset-0 rounded-lg ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}></div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;

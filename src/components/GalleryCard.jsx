import React, { useState } from 'react';

const GalleryCard = ({ image, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`group cursor-pointer animate-fade-in-up`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => onClick(image, index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass-card p-4 h-80 overflow-hidden">
        <div className="relative h-full">
          {/* Image */}
          <div className="image-hover h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-lg"></div>
          )}
            <img
              src={image.image}
              alt={image.title}
              className={`w-full h-full object-cover rounded-lg transition-all duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Overlay Content */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-lg transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className={`transform transition-all duration-300 ${
                isHovered ? 'translate-y-0' : 'translate-y-4'
              }`}>
                <h3 className="text-xl font-display text-white mb-2">{image.title}</h3>
                <p className="text-white/80 text-sm mb-3">{image.location}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
                    {image.category}
                  </span>
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

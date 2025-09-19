import React from 'react';
import { Link } from 'react-router-dom';
import { photographerBio, wildlifeImages } from '../data/portfolio';

const Home = () => {
  // Get a diverse selection of featured images for the preview section
  const featuredImages = wildlifeImages.slice(0, 8); // Show 8 images instead of 3

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/wildlife-hero.mp4" type="video/mp4" />
            {/* Fallback image for browsers that don't support video */}
            <img 
              src={wildlifeImages[0].image}
              alt="Wildlife Photography" 
              className="w-full h-full object-cover"
            />
          </video>
        </div>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10" />
        
        {/* Hero Content */}
        <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-mangro font-normal mb-8 animate-fade-in text-white drop-shadow-2xl" 
              style={{ textShadow: '0 0 20px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.5)' }}>
            {photographerBio.name}
          </h1>
          
          {/* Enhanced Tagline */}
          <div className="mb-8 animate-fade-in space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cinzel font-medium leading-tight">
              <span className="block font-cormorant font-light text-earth-100">
                Capturing the
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-mangro bg-gradient-to-r from-earth-200 via-sage-200 to-forest-200 bg-clip-text text-transparent drop-shadow-lg">
                Essence
              </span>
              <span className="block font-cormorant font-light text-earth-100">
                of
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-mangro bg-gradient-to-r from-sage-200 via-earth-200 to-forest-200 bg-clip-text text-transparent drop-shadow-lg">
                Wildlife
              </span>
              <span className="block font-cormorant font-light text-earth-100">
                and
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-mangro bg-gradient-to-r from-forest-200 via-earth-200 to-sage-200 bg-clip-text text-transparent drop-shadow-lg">
                Nature
              </span>
            </h2>
            
            {/* Decorative Elements */}
            <div className="flex justify-center items-center space-x-6 pt-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-earth-300 to-transparent" />
              <div className="w-2 h-2 bg-earth-300 rounded-full animate-pulse" />
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-earth-300 to-transparent" />
            </div>
          </div>
          
          {/* Elegant Transparent Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in">
            <Link 
              to="/gallery" 
              className="group relative overflow-hidden px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                         text-white font-lato font-medium text-base hover:bg-white/20 hover:border-white/40 
                         transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
            >
              <span className="relative z-10">View Gallery</span>
              <div className="absolute inset-0 bg-gradient-to-r from-earth-600/20 to-sage-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <Link 
              to="/albums" 
              className="group relative overflow-hidden px-6 py-3 rounded-full bg-black/10 backdrop-blur-sm border border-white/20 
                         text-white font-lato font-medium text-base hover:bg-black/20 hover:border-white/40 
                         transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-black/20"
            >
              <span className="relative z-10">Explore Albums</span>
              <div className="absolute inset-0 bg-gradient-to-r from-forest-600/20 to-earth-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-forest-50 to-sage-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="animate-fade-in">
              <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-forest-900 mb-6">
                About the Artist
              </h2>
              <div className="space-y-6 text-lg text-earth-700 font-lato leading-relaxed">
                <p>
                  {photographerBio.shortBio}
                </p>
                <p>
                  Bobby's lens captures not just images, but stories – tales of survival, beauty, and the 
                  intricate dance of life in the wilderness. Each photograph is a testament to his deep 
                  respect for nature and his commitment to conservation through visual storytelling.
                </p>
                <div className="pt-4">
                  <h3 className="text-xl font-playfair font-semibold text-forest-800 mb-3">
                    Specializations
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {photographerBio.specializations.map((spec, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-forest-100 text-forest-700 rounded-full text-sm font-lato font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link 
                  to="/contact" 
                  className="btn-primary hover:shadow-lg transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative animate-fade-in">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={wildlifeImages[1].image} 
                  alt="Bobby Lohia Photography"
                  className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border-l-4 border-forest-600">
                <div className="text-center">
                  <div className="text-3xl font-playfair font-bold text-forest-900">15+</div>
                  <div className="text-sm text-earth-600 font-lato">Years Experience</div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-6 border-l-4 border-sage-600">
                <div className="text-center">
                  <div className="text-3xl font-playfair font-bold text-forest-900">500+</div>
                  <div className="text-sm text-earth-600 font-lato">Wildlife Captures</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Work Preview */}
      <section className="py-20 bg-gradient-to-b from-sage-50 to-earth-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-mangro text-forest-900 mb-6 drop-shadow-lg">
              Featured Work
            </h2>
            <div className="flex justify-center items-center space-x-6 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-forest-500 to-transparent" />
              <div className="w-3 h-3 bg-forest-500 rounded-full animate-pulse" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-forest-500 to-transparent" />
            </div>
            <p className="text-xl lg:text-2xl text-earth-700 font-cormorant font-light max-w-4xl mx-auto leading-relaxed tracking-wide">
              A glimpse into the wild world through my lens – each image tells a story of 
              nature's incredible beauty and the urgent need for conservation.
            </p>
          </div>

          {/* Enhanced Masonry-style Grid */}
          <div className="masonry-grid columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 mb-12">
            {featuredImages.map((image, index) => {
              const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-56', 'h-88', 'h-68', 'h-84'];
              const randomHeight = heights[index % heights.length];
              
              return (
                <div 
                  key={image.id}
                  className={`break-inside-avoid mb-6 group cursor-pointer animate-fade-in transform hover:scale-[1.02] transition-all duration-500`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:shadow-forest-500/20">
                    <div className={`relative ${randomHeight} overflow-hidden`}>
                      <img 
                        src={image.image} 
                        alt={image.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      />
                      
                      {/* Sophisticated Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      
                      {/* Image Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
                        <div className="backdrop-blur-md bg-black/30 rounded-lg p-3 border border-white/20">
                          <h3 className="text-lg font-mangro font-bold text-white mb-1 drop-shadow-md">{image.title}</h3>
                          <p className="text-sm font-cormorant text-earth-100 mb-1">{image.location}</p>
                          <span className="inline-block px-2 py-1 bg-forest-600/80 rounded-full text-xs font-lato text-white">
                            {image.category}
                          </span>
                        </div>
                      </div>

                      {/* View Icon */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 delay-100">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link 
              to="/gallery" 
              className="btn-primary text-lg px-8 py-4 hover:shadow-lg transition-all duration-300"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { photoAlbums } from '../data/portfolio';
import SEO from '../components/SEO';

const Albums = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  return (
    <>
      <SEO 
        title="Photography Albums | Bobby Lohia - Wildlife & Landscape Collections"
        description="Explore curated photography albums by Bobby Lohia featuring wildlife and landscape collections. Organized galleries showcasing the best of nature photography, African safaris, and conservation photography projects."
        keywords="photography albums, Bobby Lohia albums, wildlife photography collections, landscape photography albums, nature photography gallery, African safari albums, conservation photography, curated wildlife photos"
        image="/images/WildlifeAlbumFiles1.jpg"
        type="website"
      />
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Ultra-Modern Hero Section - Mobile optimized with Texture Background */}
      <section className="pt-60 pb-44 px-6 relative"
               style={{
                 backgroundImage: 'url(/images/TextureBlack2.jpg)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat',
                 backgroundAttachment: 'fixed'
               }}>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-copperplate font-bold text-white mb-12 text-shadow-glow">
            Photography
            <br />
            <span className="text-gradient-ultra">Albums</span>
          </h1>
          <p className="text-xl text-white/80 font-copperplate max-w-4xl mx-auto leading-relaxed">
            Curated collections of wildlife encounters, organized to highlight unique perspectives of the natural world.
          </p>
        </div>
      </section>

      {/* Ultra-Modern Albums Grid - Enhanced Responsiveness with Texture Background */}
      <section className="py-12 sm:py-20 px-4 sm:px-6"
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
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-10">
            {photoAlbums.map((album, index) => (
              <div key={index} className="group scroll-reveal touch-manipulation w-full sm:w-[calc(50%-1rem)] lg:w-[calc(45%-1.25rem)] max-w-md mx-auto" style={{ animationDelay: `${index * 200}ms` }}>
                <Link to={`/albums/${album.id}`} className="block">
                  <div className="card-ultra-modern overflow-hidden image-reveal magnetic-hover">
                    <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-xl">
                      <img
                        src={album.images[0]?.image}
                        alt={album.title}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="image-overlay">
                        <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-3 sm:left-4 lg:left-6 right-3 sm:right-4 lg:right-6">
                          <div className="text-white">
                            <span className="text-xs sm:text-sm bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
                              {album.images.length} photos
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 lg:p-8">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-copperplate text-black mb-2 sm:mb-3 group-hover:text-gray-700 transition-colors">
                        {album.title}
                      </h3>
                      <p className="text-sm sm:text-base text-black/80 font-copperplate mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                        {album.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-black/60 font-copperplate truncate">
                          Multiple Locations
                        </span>
                        <div className="flex items-center space-x-1 text-black/70 group-hover:text-black transition-colors flex-shrink-0 ml-2">
                          <span className="text-xs sm:text-sm">View Album</span>
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action with Texture Background */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6"
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-copperplate font-bold text-black mb-6 sm:mb-8">
            Explore More Photography
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-black/80 font-copperplate mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover individual masterpieces in our main gallery
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link to="/gallery" 
                  className="relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-semibold font-copperplate rounded-full
                             magnetic-hover group transition-all duration-500 transform hover:scale-105
                             hover:bg-gray-800 hover:text-white border-2 border-transparent hover:border-black/20
                             hover:shadow-lg hover:shadow-black/20 w-full sm:w-auto text-center">
              <span className="relative z-10">View Gallery</span>
            </Link>
            <Link to="/contact" 
                  className="relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-black font-semibold font-copperplate rounded-full
                             magnetic-hover group transition-all duration-500 transform hover:scale-105
                             border-2 border-black/30 hover:border-black/60 hover:bg-black/10
                             hover:shadow-lg hover:shadow-black/10 w-full sm:w-auto text-center">
              <span className="relative z-10">Get In Touch</span>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Albums;
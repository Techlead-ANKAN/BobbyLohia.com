import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { wildlifeImages } from '../data/portfolio';
import Hero from '../components/Hero';
import GalleryCard from '../components/GalleryCard';
import Button from '../components/Button';
import Lightbox from '../components/Lightbox';
import { StickyScrollRevealDemo } from '../components/StickyScrollRevealDemo';
import SEO from '../components/SEO';

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const featuredImages = wildlifeImages.slice(0, 6);

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
    const nextIndex = (currentImageIndex + 1) % featuredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(featuredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + featuredImages.length) % featuredImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(featuredImages[prevIndex]);
  };

  return (
    <>
      <SEO 
        title="Bobby Lohia - Professional Wildlife Photographer | Nature Photography Portfolio"
        description="Discover stunning wildlife photography by Bobby Lohia, professional nature photographer from India with 15+ years experience. Featuring African safaris, Bengal tigers, conservation photography, and breathtaking nature galleries."
        keywords="Bobby Lohia wildlife photographer, nature photography India, professional wildlife photographer, African safari photography, Bengal tiger photography, conservation photography, wildlife photography portfolio, nature photographer Kolkata"
        image="/images/WildlifeAlbumFiles39.jpg"
        type="website"
      />
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <Hero />

      {/* Featured Work Section - White Background with Dark Grid */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-white text-black overflow-hidden featured-work-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-copperplate font-bold text-black mb-6">
              Featured
              <span className="block text-gray-800">Work</span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl text-black/70 max-w-3xl mx-auto">
              A curated showcase of wildlife and nature photographs capturing the raw and serene beauty of our environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredImages.map((image, index) => (
              <GalleryCard
                key={index}
                image={image}
                index={index}
                onClick={openLightbox}
              />
            ))}
          </div>

          <div className="text-center mt-20">
            <div className="inline-flex flex-col items-center space-y-4">
              <Link to="/gallery">
                <Button variant="primary" size="xl" className="px-8 sm:px-12 py-4 sm:py-6 text-sm xs:text-base sm:text-lg font-semibold tracking-wide">
                  <span className="flex items-center">
                    View All Work
                    <svg className="ml-2 sm:ml-3 w-4 sm:w-6 h-4 sm:h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Button>
              </Link>
              <p className="text-black/60 text-xs xs:text-sm sm:text-base font-medium tracking-wider uppercase">
                Discover the complete collection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Scroll Sections - About, Conservation, Wild By Nature */}
      <StickyScrollRevealDemo />

      {/* Lightbox */}
      <Lightbox
        image={selectedImage}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
        currentIndex={currentImageIndex}
        totalImages={featuredImages.length}
      />
      </div>
    </>
  );
};

export default Home;
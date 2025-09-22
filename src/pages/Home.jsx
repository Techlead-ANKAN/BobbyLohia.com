import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { wildlifeImages } from '../data/portfolio';
import Hero from '../components/Hero';
import Section from '../components/Section';
import GalleryCard from '../components/GalleryCard';
import Button from '../components/Button';
import Lightbox from '../components/Lightbox';

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
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Hero />

      {/* Featured Work Section */}
      <Section background="bg-black" padding="py-32">
        <div className="text-center mb-16">
          <h2 className="text-responsive-lg font-display font-bold text-white mb-6">
            Featured
            <span className="block hero-gradient-dark">Work</span>
          </h2>
          <p className="text-responsive-md text-white/70 max-w-3xl mx-auto">
            A curated selection of my most impactful wildlife photography, showcasing the raw beauty and untamed spirit of nature
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
              <Button variant="primary" size="xl" className="px-12 py-6 text-lg font-semibold tracking-wide">
                <span className="flex items-center">
                  View All Work
                  <svg className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Button>
            </Link>
            <p className="text-white/60 text-sm font-medium tracking-wider uppercase">
              Discover the complete collection
            </p>
          </div>
        </div>
      </Section>

      {/* About Section */}
      <Section background="bg-black" padding="py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-responsive-lg font-display font-bold text-white mb-8">
              The Story Behind
              <span className="block hero-gradient-dark">The Lens</span>
            </h2>
            <div className="space-y-6 text-lg text-white/70 leading-relaxed">
              <p>
                For over 15 years, I've dedicated my life to documenting the incredible diversity 
                of wildlife across the globe. Each photograph tells a story of survival, beauty, 
                and the delicate balance of our natural world.
              </p>
              <p>
                From the dense jungles of India to the vast savannas of Africa, my camera has 
                been witness to moments of pure magic – the intimate bond between a mother and 
                her cubs, the graceful flight of birds against golden sunsets, and the raw power 
                of predators in their natural habitat.
              </p>
              <p>
                My mission extends beyond photography. Through these images, I aim to inspire 
                conservation awareness and connect people with the wild world that desperately 
                needs our protection.
              </p>
            </div>
            <div className="mt-12">
              <Link to="/contact">
                <Button variant="primary" size="lg">
                  Let's Collaborate
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="glass-card p-4 h-96">
              <img
                src="https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Bobby Lohia"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card p-6">
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-white">15+</div>
                <div className="text-sm text-white/70">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </Section>


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
  );
};

export default Home;
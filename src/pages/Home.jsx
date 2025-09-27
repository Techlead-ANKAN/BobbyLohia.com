import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { wildlifeImages } from '../data/portfolio';
import Hero from '../components/Hero';
import Section from '../components/Section';
import GalleryCard from '../components/GalleryCard';
import Button from '../components/Button';
import Lightbox from '../components/Lightbox';

import  Image1  from "../assets/Img2.jpg"
import  Image2  from "../assets/Img1.jpg"
import WBNLOGO from "../assets/WBN Logo 2.jpg"

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
            A showcase of selected wildlife photography that captures raw moments from the field.
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
              A Journey Framed by the Wild
              {/* <span className="block hero-gradient-dark">The Lens</span> */}
            </h2>
            <div className="space-y-6 text-lg text-white/70 leading-relaxed">
              <p>
                Over 15 years ago, Bobby Lohia picked up a camera in the forests of Kanha and pressed the shutter on his very first tiger. The photo came out entirely blue - an amusing mistake that, instead of discouraging him, sparked a lifelong journey into wildlife photography. What began as an imperfect frame soon became the perfect reason to return to the wild again and again.
              </p>
              <p>
                Since then, Mr. Lohia’s lens has travelled across India’s dense jungles and Africa’s sweeping savannas, chasing not just animals but stories. He has captured intimate bonds between mothers and cubs, the fierce power of predators, and the delicate rhythms of bird flight against glowing skies.
              </p>
              <p>
                Today, he sees photography as far more than an art form. For him, it is a tool for conservation, a bridge between people and wilderness, and a way to inspire communities to cherish the wild stories still unfolding around us.
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
            <div className="glass-card p-4">
              <img
                src={Image1}
                alt="Bobby Lohia"
                className="w-full h-auto max-h-[37rem] object-cover rounded-xl mx-auto"
                style={{ height: 'auto', width: '100%' }}
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

      {/* Philosophy Section */}
      <Section background="bg-black" padding="py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative lg:order-1">
            <div className="glass-card p-4">
              <img
                src={Image2}
                alt="Wildlife Photography"
                className="w-full h-auto max-h-[32rem] object-cover rounded-xl mx-auto"
                style={{ height: 'auto', width: '100%' }}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass-card p-6">
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-white">500+</div>
                <div className="text-sm text-white/70">Species Captured</div>
              </div>
            </div>
          </div>

          <div className="lg:order-2">
            <h2 className="text-responsive-lg font-display font-bold text-white mb-8">
              Conservation Through
              <span className="block hero-gradient-dark">Photography</span>
            </h2>
            <div className="space-y-6 text-lg text-white/70 leading-relaxed">
              <p>
                Every photograph tells a story, but wildlife photography tells stories that matter for the future of our planet. Through each frame, Bobby captures not just the beauty of nature, but also its fragility and the urgent need for conservation.
              </p>
              <p>
                His work has contributed to various conservation initiatives across India and Africa, raising awareness about endangered species and their diminishing habitats. From documenting the majestic tigers of Ranthambore to the gentle giants of the African savanna, each image serves as a powerful voice for the voiceless.
              </p>
              <p>
                Photography becomes a bridge between the wild and civilization, inspiring viewers to become guardians of nature. Through exhibitions, workshops, and collaborations with conservation organizations, Bobby continues to use his art as a tool for positive environmental change.
              </p>
            </div>
            <div className="mt-12">
              <Link to="/gallery">
                <Button variant="primary" size="lg">
                  View Conservation Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Wild By Nature Section */}
      <Section background="bg-black" padding="py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div>
            <h2 className="text-responsive-lg font-display font-bold text-white mb-8">
              Wild By Nature:
              <span className="block hero-gradient-dark">Building a Movement</span>
            </h2>
            <div className="space-y-6 text-lg text-white/70 leading-relaxed">
              <p>
                Wild By Nature grew from Mr. Lohia's realization that wildlife photography in India needed more than passion, it needed a community. After years in the field, he saw scattered talent, limited mentorship, and little space for ethical conversations. What began as his personal pursuit soon evolved into a larger vision: to create a platform where learning, storytelling, and conservation could come together.
              </p>
              <p>
                At its core, Wild By Nature is a collective. It offers mentorship from seasoned experts, curated safaris designed for deeper field experience, opportunities to showcase work through competitions, and guidance on gear and ethics. Every aspect of the platform is built on the belief that wildlife photography should serve a greater purpose - inspiring respect for nature and empowering those who live closest to it.
              </p>
              <p>
                Looking ahead, Bobby envisions Wild By Nature as more than just a platform. He sees it as a movement - one that will expand across borders, build global collaborations, and nurture the next generation of storytellers dedicated to conservation.
              </p>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <a 
                href="https://wildbynatureglobal.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative overflow-hidden px-8 py-4 bg-white text-black font-semibold rounded-full
                           magnetic-hover group transition-all duration-500 transform hover:scale-105
                           hover:bg-gray-800 hover:text-white border-2 border-transparent hover:border-white/20
                           hover:shadow-lg hover:shadow-white/20"
              >
                <span className="relative z-10 flex items-center">
                  Visit Wild By Nature
                  <svg className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </a>
              <a 
                href="https://wildbynatureglobal.com/login" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative overflow-hidden px-8 py-4 bg-transparent text-white font-semibold rounded-full
                           magnetic-hover group transition-all duration-500 transform hover:scale-105
                           border-2 border-white/30 hover:border-white/60 hover:bg-white/10
                           hover:shadow-lg hover:shadow-white/10"
              >
                <span className="relative z-10 flex items-center">
                  Join the Community
                  <svg className="ml-2 w-5 h-5 transform transition-transform group-hover:rotate-45" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="w-82 h-82 overflow-hidden rounded-full">
              <img
                src={WBNLOGO}
                alt="Wild By Nature Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass-card p-6">
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-white">Global</div>
                <div className="text-sm text-white/70">Movement</div>
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
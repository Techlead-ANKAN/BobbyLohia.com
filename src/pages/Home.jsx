import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { wildlifeImages } from '../data/portfolio';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const featuredImages = wildlifeImages.slice(0, 6);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    setTimeout(() => setIsLoaded(true), 500);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <div className={`text-center max-w-6xl mx-auto transition-all duration-2000 ${
          isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          
          {/* Main Title */}
          <div className="mb-12">
            <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-mangro font-bold leading-none tracking-tighter mb-4">
              <span className="block text-white hover:text-primary-200 transition-colors duration-700 cursor-default">
                BOBBY
              </span>
              <span className="block text-gradient hover:scale-105 transition-transform duration-700 cursor-default">
                LOHIA
              </span>
            </h1>
            
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <div className="w-16 h-px bg-gradient-to-r from-white via-transparent to-transparent" />
            </div>
            
            <p className="text-2xl md:text-3xl font-mangro font-light text-white/80 tracking-[0.3em] mb-4">
              WILDLIFE PHOTOGRAPHY
            </p>
            <p className="text-lg md:text-xl font-mangro text-white/60 max-w-3xl mx-auto leading-relaxed">
              Capturing the untamed spirit of nature through 15+ years of passionate dedication to wildlife conservation and storytelling
            </p>
          </div>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-2000 delay-500 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}>
            <Link to="/gallery" className="btn-primary group">
              <span>Explore Gallery</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link to="/contact" className="btn-secondary group">
              <span>Get In Touch</span>
              <svg className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className={`transition-all duration-2000 delay-1000 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}>
            <div className="flex flex-col items-center animate-bounce">
              <span className="text-white/60 font-mangro text-sm tracking-wider mb-2">SCROLL TO EXPLORE</span>
              <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-mangro font-bold text-white mb-8">
              Featured Work
            </h2>
            <p className="text-xl text-white/70 font-mangro max-w-3xl mx-auto">
              A curated selection of moments that capture the wild heart of nature
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredImages.map((image, index) => (
              <div 
                key={index}
                className="gallery-item group h-80 md:h-96"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="image-overlay">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-mangro text-white mb-2">{image.title}</h3>
                    <p className="text-white/80 font-mangro text-sm">{image.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-16">
            <Link to="/gallery" className="btn-ghost group">
              <span>View Complete Gallery</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-5xl md:text-6xl font-mangro font-bold text-white mb-8">
                The Story Behind
                <br />
                <span className="text-gradient">The Lens</span>
              </h2>
              <div className="space-y-6 text-lg text-white/70 font-mangro leading-relaxed">
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
                <Link to="/contact" className="btn-primary">
                  Let's Collaborate
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="card-modern p-1 h-96">
                <img
                  src="https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Bobby Lohia"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 card-modern p-4">
                <div className="text-center">
                  <div className="text-3xl font-mangro font-bold text-white">15+</div>
                  <div className="text-sm text-white/70 font-mangro">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-mangro font-bold text-white mb-8">
            Ready to Explore
            <br />
            <span className="text-gradient">The Wild?</span>
          </h2>
          <p className="text-xl text-white/70 font-mangro mb-12 max-w-2xl mx-auto">
            Dive deeper into the world of wildlife photography and discover stories that inspire conservation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/albums" className="btn-primary">
              Browse Albums
            </Link>
            <Link to="/gallery" className="btn-secondary">
              View Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
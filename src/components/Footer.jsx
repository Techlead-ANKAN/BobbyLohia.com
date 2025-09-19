import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { photographerBio } from '../data/portfolio';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('main-footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/albums', label: 'Albums' },
    { path: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM15.95 16.58c-.393.393-.909.59-1.426.59-.516 0-1.033-.197-1.426-.59L12 15.482l-1.098 1.098c-.393.393-.909.59-1.426.59-.516 0-1.033-.197-1.426-.59-.393-.393-.59-.909-.59-1.426 0-.516.197-1.033.59-1.426L9.148 12.6 8.05 11.502c-.393-.393-.59-.909-.59-1.426 0-.516.197-1.033.59-1.426.393-.393.909-.59 1.426-.59.516 0 1.033.197 1.426.59L12 9.748l1.098-1.098c.393-.393.909-.59 1.426-.59.516 0 1.033.197 1.426.59.393.393.59.909.59 1.426 0 .516-.197 1.033-.59 1.426L14.852 12.6l1.098 1.098c.393.393.59.909.59 1.426 0 .516-.197 1.033-.59 1.426z"/>
        </svg>
      ),
      color: 'from-pink-600 to-purple-600'
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
        </svg>
      ),
      color: 'from-sky-500 to-blue-600'
    },
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'from-blue-600 to-blue-800'
    },
    {
      name: 'Email',
      href: `mailto:${photographerBio.contact.email}`,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z"/>
        </svg>
      ),
      color: 'from-green-600 to-emerald-600'
    }
  ];

  const achievements = [
    { number: '15+', label: 'Years Experience' },
    { number: '500+', label: 'Wildlife Captures' },
    { number: '50+', label: 'Expeditions' },
    { number: '25+', label: 'Countries Visited' }
  ];

  return (
    <footer 
      id="main-footer"
      className="relative bg-gradient-to-br from-earth-900 via-forest-900 to-earth-800 text-white overflow-hidden"
    >
      {/* Natural Forest Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-earth-950/60 to-transparent" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-earth-300 to-sage-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-br from-forest-400 to-earth-400 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-sage-300 to-earth-300 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-gradient-to-br from-earth-500/40 to-forest-500/40 rounded-full blur-2xl animate-pulse delay-3000" />
      </div>

      {/* Parallax Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div 
              key={i} 
              className="bg-white/10 rounded-full transform transition-transform duration-1000 hover:scale-110"
              style={{ 
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                animationDelay: `${Math.random() * 2}s`,
                transform: `translateY(${Math.random() * 20}px)`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative container-custom">
        {/* Main Footer Content */}
        <div className="pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className={`lg:col-span-2 space-y-6 transition-all duration-1000 transform
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="space-y-4">
                <h2 className="text-5xl font-mangro text-white drop-shadow-lg">
                  Bobby Lohia
                </h2>
                <p className="text-xl text-earth-200 font-mangro italic">
                  Wildlife Photography
                </p>
                <div className="w-20 h-1 bg-gradient-to-r from-earth-400 to-sage-400 rounded-full" />
              </div>
              
              <p className="text-earth-100 font-mangro leading-relaxed text-lg max-w-md">
                {photographerBio.shortBio}
              </p>

              {/* Achievement Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`text-center group transition-all duration-700 transform
                      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    style={{ transitionDelay: `${index * 0.2}s` }}
                  >
                    <div className="text-3xl font-playfair font-bold text-earth-300 group-hover:text-white transition-colors duration-300">
                        {achievement.number}
                    </div>
                      <div className="text-sm text-earth-400 font-cormorant mt-1 group-hover:text-earth-200 transition-colors duration-300">
                      {achievement.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className={`space-y-6 transition-all duration-1000 transform delay-300
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-2xl font-mangro text-earth-200 mb-6">
                Quick Links
              </h3>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="group flex items-center space-x-3 text-earth-300 hover:text-white transition-all duration-300 transform hover:translate-x-2"
                  >
                    <div className="w-2 h-2 bg-earth-400 rounded-full group-hover:bg-sage-300 transition-colors duration-300 group-hover:scale-125 transform" />
                    <span className="font-mangro">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact & Social */}
            <div className={`space-y-6 transition-all duration-1000 transform delay-500
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-2xl font-mangro text-earth-200 mb-6">
                Connect
              </h3>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-earth-300">
                  <svg className="w-5 h-5 text-earth-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.945a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${photographerBio.contact.email}`} className="hover:text-white transition-colors duration-300 font-mangro">
                    {photographerBio.contact.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-earth-300">
                  <svg className="w-5 h-5 text-earth-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-mangro">{photographerBio.contact.location}</span>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="space-y-4">
                <h4 className="text-xl font-mangro text-earth-200">Follow My Journey</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="group relative p-3 rounded-xl bg-gradient-to-br from-earth-800/30 to-forest-800/30 
                        backdrop-blur-sm border border-earth-400/20 hover:border-sage-400/50 
                        transition-all duration-500 transform hover:scale-110 hover:-translate-y-1
                        hover:shadow-2xl hover:shadow-earth-900/50"
                      aria-label={social.name}
                    >
                      <div className="text-earth-200 group-hover:text-white transition-colors duration-300 relative z-10">
                        {social.icon}
                      </div>
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${social.color} 
                        transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out opacity-80`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t border-earth-600/30 py-8 transition-all duration-1000 transform delay-700
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-earth-300 font-lato text-sm">
              © 2024 Bobby Lohia Photography. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-earth-300">
              <Link to="/privacy" className="hover:text-sage-200 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-sage-200 transition-colors duration-300">
                Terms of Service
              </Link>
              <div className="flex items-center space-x-2">
                <span>Made with</span>
                <div className="text-earth-400 animate-pulse">♥</div>
                <span>for conservation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-earth-600 to-sage-600 
          text-white shadow-2xl hover:shadow-earth-500/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1
          group border border-earth-400/20 hover:border-sage-400/40"
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
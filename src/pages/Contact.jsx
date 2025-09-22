import React, { useState, useRef } from 'react';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      form.current.reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.945a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'bobbylohia@example.com',
      link: 'mailto:bobbylohia@example.com'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Location',
      value: 'Mumbai, India',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Ultra-Modern Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-mangro font-bold text-white mb-12 text-shadow-glow">
            Get In
            <br />
            <span className="text-gradient-ultra">Touch</span>
          </h1>
          <p className="text-xl text-white/80 font-mangro max-w-4xl mx-auto leading-relaxed">
            Ready to collaborate on your next project or discuss conservation initiatives? 
            Let's create something extraordinary together.
          </p>
        </div>
      </section>

      {/* Enhanced Contact Form & Info */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            
            {/* Enhanced Contact Form */}
            <div className="card-ultra-modern p-10">
              <h2 className="text-4xl font-mangro font-bold text-white mb-10 text-shadow-glow">Send a Message</h2>
              
              <form ref={form} onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-mangro text-white/80 mb-3">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60
                               focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-500 font-mangro
                               backdrop-blur-xl text-lg focus:text-white hover:text-white focus:bg-white/10 hover:bg-white/10"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mangro text-white/80 mb-3">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60
                               focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-500 font-mangro
                               backdrop-blur-xl text-lg focus:text-white hover:text-white focus:bg-white/10 hover:bg-white/10"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-mangro text-white/80 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60
                             focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-500 font-mangro
                             backdrop-blur-xl text-lg focus:text-white hover:text-white focus:bg-white/10 hover:bg-white/10"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mangro text-white/80 mb-3">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60
                             focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-500 font-mangro
                             backdrop-blur-xl text-lg focus:text-white hover:text-white focus:bg-white/10 hover:bg-white/10"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mangro text-white/80 mb-3">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="6"
                    className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60
                             focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-500 font-mangro
                             backdrop-blur-xl resize-vertical text-lg focus:text-white hover:text-white focus:bg-white/10 hover:bg-white/10"
                    placeholder="Tell me more about your project or inquiry..."
                  ></textarea>
                </div>

                {/* Enhanced Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden px-8 py-4 bg-white text-black font-semibold rounded-full
                           w-full disabled:opacity-50 disabled:cursor-not-allowed magnetic-hover
                           transition-all duration-500 transform hover:scale-105
                           hover:bg-gray-800 hover:text-white border-2 border-transparent hover:border-white/20
                           hover:shadow-lg hover:shadow-white/20"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      <span className="relative z-10">Sending...</span>
                    </div>
                  ) : (
                    <span className="relative z-10">Send Message</span>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/40 rounded-lg text-green-400 font-mangro">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-lg text-red-400 font-mangro">
                    Sorry, there was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </div>

            {/* Enhanced Contact Information */}
            <div className="space-y-10">
              <div>
                <h2 className="text-4xl font-mangro font-bold text-white mb-10 text-shadow-glow">Let's Connect</h2>
                <p className="text-lg text-white/80 font-mangro leading-relaxed mb-10">
                  Whether you're looking to commission a photography project, discuss conservation efforts, 
                  or simply want to chat about wildlife, I'd love to hear from you.
                </p>
              </div>

              {/* Enhanced Contact Details */}
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="card-ultra-modern p-8 block magnetic-hover group"
                  >
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white 
                                    group-hover:bg-white/20 transition-colors duration-500">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-mangro text-white mb-2 text-shadow-glow">{item.label}</h3>
                        <p className="text-white/80 font-mangro text-lg">{item.value}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Enhanced Social Links */}
              <div className="card-ultra-modern p-8">
                <h3 className="text-2xl font-mangro text-white mb-6 text-shadow-glow">Follow My Journey</h3>
                <div className="flex space-x-6">
                  <a
                    href="#"
                    className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white 
                             hover:bg-white/20 hover:scale-110 transition-all duration-500 magnetic-hover
                             hover:text-white focus:text-white"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.321-1.297C4.198 14.861 3.708 13.71 3.708 12.413s.49-2.448 1.42-3.321c.873-.807 2.024-1.297 3.321-1.297s2.448.49 3.321 1.297c.93.873 1.42 2.024 1.42 3.321s-.49 2.448-1.42 3.321c-.873.807-2.024 1.297-3.321 1.297zm7.07 0c-1.297 0-2.448-.49-3.321-1.297-.93-.873-1.42-2.024-1.42-3.321s.49-2.448 1.42-3.321c.873-.807 2.024-1.297 3.321-1.297s2.448.49 3.321 1.297c.93.873 1.42 2.024 1.42 3.321s-.49 2.448-1.42 3.321c-.873.807-2.024 1.297-3.321 1.297z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white 
                             hover:bg-white/20 hover:scale-110 transition-all duration-500 magnetic-hover"
                    aria-label="Twitter"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white 
                             hover:bg-white/20 hover:scale-110 transition-all duration-500 magnetic-hover"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-mangro font-bold text-white mb-8 text-shadow-glow">
            Let's Create Something
            <br />
            <span className="text-gradient-ultra">Extraordinary</span>
          </h2>
          <p className="text-xl text-white/80 font-mangro mb-12 max-w-3xl mx-auto leading-relaxed">
            From conservation photography to commercial projects, let's work together to tell stories that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/gallery" 
               className="relative overflow-hidden px-8 py-4 bg-transparent text-white font-semibold rounded-full
                          magnetic-hover group transition-all duration-500 transform hover:scale-105
                          border-2 border-white/30 hover:border-white/60 hover:bg-white hover:text-black
                          hover:shadow-lg hover:shadow-white/10">
              <span className="relative z-10 flex items-center">
                View My Work
                <svg className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <a href="/albums" 
               className="relative overflow-hidden px-8 py-4 bg-white text-black font-semibold rounded-full
                          magnetic-hover group transition-all duration-500 transform hover:scale-105
                          hover:bg-black hover:text-white border-2 border-transparent hover:border-white/20
                          hover:shadow-lg hover:shadow-white/20">
              <span className="relative z-10 flex items-center">
                Browse Albums
                <svg className="ml-2 w-5 h-5 transform transition-transform group-hover:rotate-45" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
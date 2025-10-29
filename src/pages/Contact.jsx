import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Get form data
      const formData = new FormData(form.current);
      const templateParams = {
        name: `${formData.get('firstName')} ${formData.get('lastName')}`.trim(),
        email: formData.get('email'),
        phone: formData.get('phone') || 'Not provided',
        subject: formData.get('subject'),
        message: formData.get('message'),
        current_date: new Date().toLocaleDateString(),
        current_time: new Date().toLocaleTimeString(),
      };

      // Debug: Log the values being used
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_eirqppc';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_oiz1o9b';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '3NyLqOGtvYdpovGxA';
      
      console.log('EmailJS Configuration:', {
        serviceId,
        templateId,
        publicKey: publicKey.substring(0, 8) + '...',
        templateParams
      });

      // Send email using EmailJS with correct template ID
      await emailjs.send(
        serviceId,
        templateId, // Now uses your correct template: template_oiz1o9b
        templateParams,
        publicKey
      );

      setSubmitStatus('success');
      form.current.reset();
    } catch (error) {
      console.error('EmailJS Error Details:', {
        error,
        message: error.message,
        status: error.status,
        text: error.text
      });
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
      value: 'bobbylohia@gmail.com',
      link: 'mailto:bobbylohia@gmail.com'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: '+91 70038 42077',
      link: 'tel:+917003842077'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Location',
      value: 'Kolkata, India',
      link: '#'
    }
  ];

  return (
    <>
      <SEO 
        title="Contact Bobby Lohia - Professional Wildlife Photographer | Photography Services"
        description="Get in touch with Bobby Lohia for wildlife photography services, conservation projects, photography workshops, and custom photography assignments. Professional nature photographer available for commissions worldwide."
        keywords="contact Bobby Lohia photographer, wildlife photography services, photography workshops booking, nature photography commissions, conservation photography projects, professional photographer contact, photography consultation"
        image="/images/WildlifeAlbumFiles39.jpg"
        type="website"
      />
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Ultra-Modern Hero Section - Mobile optimized */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mangro font-bold text-white mb-8 sm:mb-12 text-shadow-glow leading-tight">
            Get In
            <span className="text-gradient-ultra"> Touch</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 font-mangro max-w-4xl mx-auto leading-relaxed px-4">
            Reach out to discuss projects, collaborations, or conservation ideas.
          </p>
        </div>
      </section>

      {/* Enhanced Contact Form & Info - Mobile-first responsive */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
            
            {/* Enhanced Contact Form - Mobile responsive */}
            <div className="card-ultra-modern p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-mangro font-bold text-white mb-6 sm:mb-8 lg:mb-10 text-shadow-glow">Send a Message</h2>
              
              <form ref={form} onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <div>
                    <label className="block text-sm font-mangro text-white/80 mb-2 sm:mb-3">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/10 border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-white/60
                               focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-500 font-mangro
                               backdrop-blur-xl text-base sm:text-lg focus:text-white hover:text-white focus:bg-white/10 hover:bg-white/10 touch-manipulation"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mangro text-white/80 mb-2 sm:mb-3">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/10 border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-white/60
                               focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-500 font-mangro
                               backdrop-blur-xl text-base sm:text-lg focus:text-white hover:text-white focus:bg-white/10 hover:bg-white/10 touch-manipulation"
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
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/10 border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-white/60
                             focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-500 font-mangro
                             backdrop-blur-xl text-base sm:text-lg focus:text-white hover:text-white focus:bg-white/10 hover:bg-white/10 touch-manipulation"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mangro text-white/80 mb-3">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/10 border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-white/60
                             focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-500 font-mangro
                             backdrop-blur-xl text-base sm:text-lg focus:text-white hover:text-white focus:bg-white/10 hover:bg-white/10 touch-manipulation"
                    placeholder="+91 98765 43210"
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
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/10 border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-white/60
                             focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-500 font-mangro
                             backdrop-blur-xl text-base sm:text-lg focus:text-white hover:text-white focus:bg-white/10 hover:bg-white/10 touch-manipulation"
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
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/10 border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-white/60
                             focus:border-white/50 focus:ring-2 focus:ring-white/30 transition-all duration-500 font-mangro
                             backdrop-blur-xl resize-vertical text-base sm:text-lg focus:text-white hover:text-white focus:bg-white/10 hover:bg-white/10 touch-manipulation"
                    placeholder="Tell me more about your project or inquiry..."
                  ></textarea>
                </div>

                {/* Enhanced Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded-full
                           w-full disabled:opacity-50 disabled:cursor-not-allowed magnetic-hover
                           transition-all duration-500 transform hover:scale-105 text-base sm:text-lg
                           hover:bg-gray-800 hover:text-white border-2 border-transparent hover:border-white/20
                           hover:shadow-lg hover:shadow-white/20 touch-manipulation"
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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-mangro font-bold text-white mb-6 sm:mb-8 lg:mb-10 text-shadow-glow">Let's Connect</h2>
                <p className="text-lg text-white/80 font-mangro leading-relaxed mb-10">
                  For commissions, conservation discussions, or collaborations, I’d be glad to hear from you.
                </p>
              </div>

              {/* Enhanced Contact Details - Mobile-first layout */}
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="card-ultra-modern p-4 sm:p-6 lg:p-8 block magnetic-hover group touch-manipulation"
                  >
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/10 rounded-full flex items-center justify-center text-white 
                                    group-hover:bg-white/20 transition-colors duration-500 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-mangro text-white mb-1 sm:mb-2 text-shadow-glow">{item.label}</h3>
                        <p className="text-white/80 font-mangro text-sm sm:text-base lg:text-lg break-words">{item.value}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mangro font-bold text-white mb-6 sm:mb-8 text-shadow-glow">
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
    </>
  );
};

export default Contact;
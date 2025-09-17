import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { photographerBio } from '../data/portfolio';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace with your EmailJS credentials
      const result = await emailjs.sendForm(
        'YOUR_SERVICE_ID', 
        'YOUR_TEMPLATE_ID', 
        form.current, 
        'YOUR_PUBLIC_KEY'
      );
      
      console.log('Email sent successfully:', result.text);
      setSubmitStatus('success');
      form.current.reset();
    } catch (error) {
      console.error('Error sending email:', error);
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
      value: photographerBio.contact.email,
      link: `mailto:${photographerBio.contact.email}`
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: photographerBio.contact.phone,
      link: `tel:${photographerBio.contact.phone}`
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Location',
      value: photographerBio.contact.location,
      link: null
    }
  ];

  const services = [
    {
      title: 'Wildlife Photography Workshops',
      description: 'Learn the art of wildlife photography in some of the world\'s most spectacular locations.',
      icon: '🦁'
    },
    {
      title: 'Conservation Photography',
      description: 'Professional documentation for conservation organizations and environmental campaigns.',
      icon: '🌿'
    },
    {
      title: 'Print Sales & Licensing',
      description: 'High-quality prints and licensing for commercial and editorial use.',
      icon: '🖼️'
    },
    {
      title: 'Custom Photo Tours',
      description: 'Personalized photography expeditions to capture unique wildlife moments.',
      icon: '📸'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Elegant Header Section */}
      <section className="py-12 bg-gradient-to-br from-forest-100 via-sage-50 to-earth-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-24 h-24 bg-gradient-to-br from-forest-400 to-sage-400 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 left-20 w-32 h-32 bg-gradient-to-br from-earth-400 to-forest-400 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container-custom text-center relative">
          <div className="space-y-4">
            <h1 className="text-6xl lg:text-7xl font-great-vibes text-forest-900 mb-3 drop-shadow-lg">
              Contact
            </h1>
            <div className="flex justify-center items-center space-x-6 mb-3">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-forest-500 to-transparent" />
              <div className="w-3 h-3 bg-forest-500 rounded-full animate-pulse" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-forest-500 to-transparent" />
            </div>
            <p className="text-xl lg:text-2xl text-earth-700 font-cormorant font-light max-w-4xl mx-auto leading-relaxed tracking-wide">
              Get in touch to discuss photography services, prints, or collaborations. 
              I'd love to hear from you and help bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section id="contact-form" className="py-16 bg-sage-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <h2 className="text-3xl font-playfair font-bold text-forest-900 mb-6">
                Send a Message
              </h2>
              <p className="text-lg text-earth-700 font-lato mb-8">
                Fill out the form below and I'll get back to you within 24 hours.
              </p>
              
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="from_name" className="block text-sm font-lato font-semibold text-forest-800 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      required
                      className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all duration-200 font-lato"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="from_lastname" className="block text-sm font-lato font-semibold text-forest-800 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="from_lastname"
                      name="from_lastname"
                      required
                      className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all duration-200 font-lato"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reply_to" className="block text-sm font-lato font-semibold text-forest-800 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="reply_to"
                    name="reply_to"
                    required
                    className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all duration-200 font-lato"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-lato font-semibold text-forest-800 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all duration-200 font-lato"
                  >
                    <option value="">Select a topic</option>
                    <option value="Workshop Inquiry">Photography Workshop</option>
                    <option value="Print Purchase">Print Purchase</option>
                    <option value="Licensing">Image Licensing</option>
                    <option value="Custom Tour">Custom Photo Tour</option>
                    <option value="Conservation Project">Conservation Project</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-lato font-semibold text-forest-800 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all duration-200 font-lato resize-vertical"
                    placeholder="Tell me about your project, questions, or how I can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2 transition-all duration-300 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    Thank you for your message! I'll get back to you within 24 hours.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    Sorry, there was an error sending your message. Please try again or contact me directly.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="animate-fade-in">
              <h2 className="text-3xl font-playfair font-bold text-forest-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-earth-700 font-lato mb-8">
                {photographerBio.fullBio.split('.')[0]}.
              </p>

              {/* Contact Details */}
              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-forest-600 text-white rounded-full flex items-center justify-center">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm font-lato font-semibold text-forest-800 uppercase tracking-wide">
                        {info.label}
                      </div>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-lg text-earth-700 hover:text-forest-600 transition-colors duration-200 font-lato"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-lg text-earth-700 font-lato">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Awards & Recognition */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-playfair font-semibold text-forest-900 mb-4">
                  Awards & Recognition
                </h3>
                <div className="space-y-3">
                  {photographerBio.awards.map((award, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-forest-600 rounded-full flex-shrink-0" />
                      <span className="text-earth-700 font-lato">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-b from-sage-50 to-earth-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-forest-900 mb-6">
              Services
            </h2>
            <p className="text-lg text-earth-700 font-lato max-w-2xl mx-auto">
              From educational workshops to conservation documentation, discover how we can 
              work together to capture and preserve the beauty of our natural world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-playfair font-semibold text-forest-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-earth-700 font-lato leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
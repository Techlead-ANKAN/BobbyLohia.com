// Production Configuration
const config = {
  // API Configuration
  API_BASE: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com/api'  // Update with your actual domain
    : 'http://localhost:5000/api',
  
  // Environment
  ENV: process.env.NODE_ENV || 'development',
  
  // EmailJS Configuration
  EMAILJS_SERVICE_ID: 'service_your_id',
  EMAILJS_TEMPLATE_ID: 'template_your_id', 
  EMAILJS_PUBLIC_KEY: 'your_public_key',
  
  // SEO Configuration
  SITE_NAME: 'Bobby Lohia Photography',
  SITE_URL: process.env.NODE_ENV === 'production'
    ? 'https://yourdomain.com'  // Update with your actual domain
    : 'http://localhost:5173',
  
  // Image Configuration
  MAX_IMAGE_SIZE: '10MB',
  ALLOWED_FORMATS: ['jpg', 'jpeg', 'png', 'webp'],
  
  // Admin Configuration
  ADMIN_ROUTE: '/admin',
  
  // Feature Flags
  FEATURES: {
    ANALYTICS: true,
    IMAGE_COMPRESSION: true,
    SEO_OPTIMIZATION: true,
    PROGRESSIVE_LOADING: true
  }
};

export default config;
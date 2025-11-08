const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs-extra');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Debug environment
console.log('=== SERVER STARTUP DEBUG ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', PORT);
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);
console.log('============================');

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting - more lenient for development
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // increased limit for development
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// CORS configuration - Fixed for development
const corsOptions = {
  origin: function (origin, callback) {
    console.log('CORS check for origin:', origin);
    
    // In production, only allow specific origins
    if (process.env.NODE_ENV === 'production') {
      const allowedOrigins = [
        process.env.CORS_ORIGIN,
        'https://yourdomain.com',  // Replace with your actual domain
        'https://www.yourdomain.com'  // Replace with your actual domain
      ].filter(Boolean); // Remove undefined values
      
      console.log('Production allowed origins:', allowedOrigins);
      
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('CORS blocked origin in production:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      // Development - be more permissive
      console.log('Development mode - allowing origin:', origin);
      callback(null, true); // Allow all origins in development
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Create required directories
const createDirectories = async () => {
  try {
    await fs.ensureDir('./uploads/wildlife');
    await fs.ensureDir('./uploads/landscape');
    
    // Create images.json if it doesn't exist
    const imagesJsonPath = './data/images.json';
    await fs.ensureDir('./data');
    
    if (!(await fs.pathExists(imagesJsonPath))) {
      await fs.writeJson(imagesJsonPath, { images: [] });
    }
    
    console.log('✅ Directories and files created successfully');
  } catch (error) {
    console.error('❌ Error creating directories:', error);
  }
};

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/images', require('./routes/images'));
app.use('/api/gallery', require('./routes/gallery'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Bobby Lohia Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Start server
const startServer = async () => {
  await createDirectories();
  
  app.listen(PORT, () => {
    console.log(`🚀 Bobby Lohia Backend Server running on port ${PORT}`);
    console.log(`📁 Upload directory: ${path.join(__dirname, 'uploads')}`);
    console.log(`💾 Data directory: ${path.join(__dirname, 'data')}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer().catch(console.error);

module.exports = app;
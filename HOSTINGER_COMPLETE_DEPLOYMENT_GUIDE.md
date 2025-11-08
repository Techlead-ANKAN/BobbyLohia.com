# 🚀 Bobby Lohia Photography - Complete Hostinger Deployment Guide

## Overview
This guide will help you deploy both the **React Frontend** and **Node.js Backend** to Hostinger hosting platform.

## 📋 Pre-Deployment Checklist

### 1. Hostinger Requirements
- ✅ Hostinger Premium/Business hosting plan (supports Node.js)
- ✅ Domain connected to Hostinger
- ✅ SSH access enabled
- ✅ Node.js support enabled in control panel

### 2. Project Structure
```
BobbyLohia.com/
├── frontend/                  # React app (will be built)
├── backend/                   # Node.js API server
├── dist/                      # Built frontend files
└── deployment-files/          # Deployment configurations
```

## 🏗️ Step 1: Prepare Frontend for Production

### 1.1 Build the React App
```bash
cd C:\TEACHLEAD-ANKAN\BobbyLohia.com
npm run build
```

### 1.2 Update API URLs for Production
You need to update the API base URL from localhost to your domain.

**Files to update:**
- `src/pages/AdminPanel_pro.jsx`
- Any other files using API calls

**Change from:**
```javascript
const API_BASE = 'http://localhost:5000/api';
```

**Change to:**
```javascript
const API_BASE = 'https://yourdomain.com/api';
// OR if using subdomain:
const API_BASE = 'https://api.yourdomain.com/api';
```

## 🚀 Step 2: Backend Deployment

### 2.1 Create Production Environment File
Create `backend/.env.production`:
```env
NODE_ENV=production
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password
CORS_ORIGIN=https://yourdomain.com
```

### 2.2 Update Backend for Production
Update `backend/server.js` CORS configuration:
```javascript
// Update CORS for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CORS_ORIGIN 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
};
```

## 📦 Step 3: Hostinger Deployment Options

### Option A: Single Domain with Subdirectories
```
yourdomain.com/           → Frontend (React app)
yourdomain.com/api/       → Backend API
yourdomain.com/admin/     → Admin panel
```

### Option B: Subdomain Setup
```
yourdomain.com            → Frontend (React app)
api.yourdomain.com        → Backend API
admin.yourdomain.com      → Admin panel
```

## 🔧 Step 4: Hostinger Control Panel Setup

### 4.1 Enable Node.js
1. Login to Hostinger control panel
2. Go to "Advanced" → "Node.js"
3. Create new Node.js app:
   - **Node.js version**: 18.x or latest
   - **Application root**: `/public_html/api`
   - **Application URL**: `yourdomain.com/api`
   - **Startup file**: `server.js`

### 4.2 Configure Environment Variables
In Node.js settings, add environment variables:
```
NODE_ENV=production
PORT=3000
JWT_SECRET=your-jwt-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-password
CORS_ORIGIN=https://yourdomain.com
```

## 📁 Step 5: File Upload Structure

### 5.1 Upload Frontend Files
```
/public_html/
├── index.html              # Main React app
├── assets/                 # CSS, JS bundles
├── images/                 # Static images
└── admin/                  # Admin panel (optional subdirectory)
```

### 5.2 Upload Backend Files
```
/public_html/api/
├── server.js              # Main server file
├── package.json           # Dependencies
├── routes/                # API routes
├── data/                  # JSON databases
├── uploads/               # Image uploads
└── middleware/            # Auth middleware
```

## 🚀 Step 6: Deployment Commands

### 6.1 Build and Prepare Frontend
```bash
# Build React app
npm run build

# The 'dist' folder contains your production files
# Upload contents of 'dist' folder to /public_html/
```

### 6.2 Deploy Backend via SSH
```bash
# Connect to Hostinger via SSH
ssh username@yourdomain.com

# Navigate to API directory
cd public_html/api

# Upload your backend files (use FTP/cPanel File Manager)
# Then install dependencies:
npm install --production

# Start the application (Hostinger will manage this)
```

## 🔒 Step 7: Security & Configuration

### 7.1 Create .htaccess for Frontend
Create `/public_html/.htaccess`:
```apache
# React Router support
RewriteEngine On
RewriteBase /

# Handle API requests
RewriteRule ^api/(.*)$ /api/$1 [L,QSA]

# Handle React Router (SPA)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
```

### 7.2 Secure Admin Panel
Create `/public_html/admin/.htaccess`:
```apache
# Additional security for admin
AuthType Basic
AuthName "Admin Access"
AuthUserFile /path/to/.htpasswd
Require valid-user
```

## 📋 Step 8: Post-Deployment Checklist

### 8.1 Test All Functionality
- [ ] Website loads correctly
- [ ] All pages accessible
- [ ] Image galleries working
- [ ] Contact form working
- [ ] Admin panel accessible
- [ ] Image upload working
- [ ] Category system working

### 8.2 Performance Optimization
- [ ] Enable Gzip compression
- [ ] Set up CDN (Cloudflare)
- [ ] Optimize images
- [ ] Enable browser caching

## 🔧 Troubleshooting Common Issues

### Issue 1: API Not Accessible
**Problem**: Frontend can't reach backend API
**Solution**: 
- Check CORS configuration
- Verify API URL in frontend
- Check Node.js app status in Hostinger panel

### Issue 2: File Uploads Not Working
**Problem**: Images not uploading
**Solution**:
- Check folder permissions (755 for directories)
- Verify upload directory exists
- Check file size limits

### Issue 3: Admin Panel 404
**Problem**: Admin routes not working
**Solution**:
- Check .htaccess rewrite rules
- Verify React Router configuration
- Check build output

## 📞 Support Commands

### Check Node.js App Status
```bash
# Via SSH
pm2 list
pm2 logs
pm2 restart app-name
```

### Check File Permissions
```bash
# Set correct permissions
chmod 755 public_html/api/uploads
chmod 644 public_html/api/data/images.json
```

## 🎉 Success!
Once deployed, your Bobby Lohia Photography website will be live with:
- ✅ Professional photo galleries
- ✅ Admin panel for image management
- ✅ Contact form functionality
- ✅ Responsive design
- ✅ SEO optimization

---

**Need Help?** 
- Hostinger Support: Via control panel
- Check server logs for errors
- Test API endpoints with Postman
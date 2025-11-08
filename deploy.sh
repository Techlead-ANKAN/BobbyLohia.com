#!/bin/bash
# Bobby Lohia Photography - Deployment Script
# Usage: ./deploy.sh [production|staging]

set -e  # Exit on any error

ENVIRONMENT=${1:-production}
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="./backups/$TIMESTAMP"

echo "🚀 Starting deployment process for $ENVIRONMENT environment..."

# Step 1: Create backup directory
echo "📦 Creating backup directory..."
mkdir -p "$BACKUP_DIR"

# Step 2: Backup current production data (if exists)
if [ -f "./backend/data/images.json" ]; then
    echo "💾 Backing up current data..."
    cp -r "./backend/data" "$BACKUP_DIR/"
    cp -r "./backend/uploads" "$BACKUP_DIR/"
fi

# Step 3: Install dependencies
echo "📚 Installing dependencies..."
echo "  - Installing frontend dependencies..."
npm install

echo "  - Installing backend dependencies..."
cd backend
npm install --production
cd ..

# Step 4: Update configuration for environment
echo "🔧 Configuring for $ENVIRONMENT environment..."

if [ "$ENVIRONMENT" = "production" ]; then
    # Copy production environment file
    if [ -f "./backend/.env.production" ]; then
        cp "./backend/.env.production" "./backend/.env"
        echo "  ✅ Production environment configured"
    else
        echo "  ⚠️  Warning: .env.production file not found"
    fi
else
    echo "  ℹ️  Using development configuration"
fi

# Step 5: Build frontend
echo "🏗️  Building frontend application..."
npm run build

if [ $? -eq 0 ]; then
    echo "  ✅ Frontend build successful"
else
    echo "  ❌ Frontend build failed"
    exit 1
fi

# Step 6: Prepare deployment package
echo "📦 Preparing deployment package..."
DEPLOY_DIR="./deploy_package_$TIMESTAMP"
mkdir -p "$DEPLOY_DIR"

# Copy built frontend files
echo "  - Copying frontend files..."
cp -r ./dist/* "$DEPLOY_DIR/"

# Copy backend files
echo "  - Copying backend files..."
mkdir -p "$DEPLOY_DIR/api"
cp -r ./backend/* "$DEPLOY_DIR/api/"

# Copy configuration files
echo "  - Copying configuration files..."
cp ./.htaccess "$DEPLOY_DIR/"

# Step 7: Create deployment info
cat > "$DEPLOY_DIR/deployment_info.txt" << EOF
Deployment Information
======================
Environment: $ENVIRONMENT
Timestamp: $TIMESTAMP
Build Date: $(date)
Node Version: $(node --version)
NPM Version: $(npm --version)

Files Structure:
================
/ (root)           - React app files
/api/              - Node.js backend
/.htaccess         - Apache configuration

Deployment Steps for Hostinger:
===============================
1. Upload all files from this package to /public_html/
2. In Hostinger control panel:
   - Go to Node.js section
   - Create app with root: /public_html/api
   - Set startup file: server.js
   - Add environment variables from .env.production
3. Test the deployment:
   - Frontend: https://yourdomain.com
   - API: https://yourdomain.com/api/images
   - Admin: https://yourdomain.com/admin

Support:
========
- Check server logs in Hostinger control panel
- Verify Node.js app is running
- Test API endpoints individually
EOF

# Step 8: Create upload instructions
cat > "$DEPLOY_DIR/UPLOAD_INSTRUCTIONS.md" << EOF
# 📤 Hostinger Upload Instructions

## 🎯 Quick Upload Guide

### Option 1: File Manager (Recommended)
1. Login to Hostinger control panel
2. Go to **File Manager**
3. Navigate to \`public_html\`
4. **Delete all existing files** (backup first!)
5. **Upload all files** from this deployment package
6. **Extract** if uploaded as zip

### Option 2: FTP Upload
\`\`\`bash
# Using FileZilla or similar FTP client
Host: ftp.yourdomain.com
Username: your_hostinger_username
Password: your_hostinger_password
Port: 21

# Upload to: /public_html/
\`\`\`

## ⚙️ Post-Upload Configuration

### 1. Configure Node.js App
- Go to **Advanced → Node.js**
- Create new application:
  - **App root**: \`/public_html/api\`
  - **Startup file**: \`server.js\`
  - **Node version**: 18.x or latest

### 2. Set Environment Variables
Add these in Node.js app settings:
\`\`\`
NODE_ENV=production
PORT=3000
JWT_SECRET=your_jwt_secret_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
CORS_ORIGIN=https://yourdomain.com
\`\`\`

### 3. Start the Application
- Click **Start** in Node.js control panel
- Wait for status to show **Running**

## 🧪 Testing Deployment

### Check Frontend
- Visit: \`https://yourdomain.com\`
- Verify: Home page loads
- Test: Navigation works
- Check: Images display correctly

### Check Backend API
- Visit: \`https://yourdomain.com/api/images\`
- Should return: JSON with image list
- Test: Upload functionality
- Verify: Admin panel access

### Check Admin Panel  
- Visit: \`https://yourdomain.com/admin\`
- Login with admin credentials
- Test: Image management functions
- Verify: All features working

## 🚨 Troubleshooting

### Common Issues:
1. **500 Error**: Check Node.js logs in control panel
2. **CORS Error**: Verify CORS_ORIGIN environment variable
3. **404 on routes**: Check .htaccess file uploaded correctly
4. **Images not loading**: Check uploads folder permissions

### Quick Fixes:
\`\`\`bash
# File permissions (via SSH if available)
chmod 755 public_html/api/uploads
chmod 644 public_html/api/data/images.json

# Restart Node.js app
# Use control panel or SSH: pm2 restart app-name
\`\`\`

## 📞 Support
- Hostinger Support: Via control panel chat
- Check deployment_info.txt for details
- Verify all steps completed successfully
EOF

# Step 9: Summary
echo ""
echo "🎉 Deployment package created successfully!"
echo ""
echo "📁 Package location: $DEPLOY_DIR"
echo "📄 Backup location: $BACKUP_DIR"
echo ""
echo "📋 Next steps:"
echo "  1. Review files in $DEPLOY_DIR"
echo "  2. Follow instructions in UPLOAD_INSTRUCTIONS.md"
echo "  3. Upload to Hostinger via File Manager or FTP"
echo "  4. Configure Node.js app in control panel"
echo "  5. Test deployment thoroughly"
echo ""
echo "🔧 Configuration files ready:"
echo "  ✅ Frontend built and optimized"
echo "  ✅ Backend production ready"
echo "  ✅ Environment variables configured"
echo "  ✅ .htaccess rules included"
echo ""
echo "Happy deploying! 🚀"
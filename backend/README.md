# Bobby Lohia Photography - Backend Setup

## Overview
This backend provides API endpoints for managing images in the Bobby Lohia Photography website. It supports image upload, management, and serves images dynamically.

## Features
- 🖼️ **Image Upload**: Drag & drop multiple images
- 📁 **Categorization**: Wildlife and Landscape categories
- 🔒 **Admin Authentication**: JWT-based security
- 📱 **Responsive Admin Panel**: Mobile-friendly interface
- 🚀 **Fast Performance**: Optimized image serving
- 💾 **Simple Storage**: JSON-based metadata storage

## Installation

### Prerequisites
- Node.js 18+ installed on VPS
- PM2 process manager
- Nginx web server

### 1. VPS Setup Commands

```bash
# Connect to your Hostinger VPS via SSH
ssh your-username@your-server-ip

# Navigate to web directory
cd /public_html/

# Install Node.js (if not installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Create backend directory
mkdir backend
cd backend
```

### 2. Upload Backend Files

Upload all files from the `backend/` folder to `/public_html/backend/` on your VPS:

- server.js
- package.json
- routes/
- data/
- .env

### 3. Install Dependencies

```bash
# In the backend directory
cd /public_html/backend
npm install
```

### 4. Configure Environment

```bash
# Edit the .env file with your settings
nano .env

# Update these values:
# - JWT_SECRET: Change to a secure random string
# - ADMIN_USERNAME: Your admin username
# - ADMIN_PASSWORD_HASH: Generate with bcrypt
```

### 5. Create Upload Directories

```bash
# Create upload directories
mkdir -p uploads/wildlife/thumbnails
mkdir -p uploads/landscape/thumbnails
chmod 755 uploads/
chmod 755 uploads/*/
```

### 6. Start the Backend Server

```bash
# Start server with PM2
pm2 start server.js --name "bobbylohia-api"

# Save PM2 configuration
pm2 save

# Set PM2 to start on system boot
pm2 startup
```

### 7. Configure Nginx (if needed)

Add this to your Nginx configuration:

```nginx
# API proxy
location /api/ {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}

# Image serving
location /uploads/ {
    alias /public_html/uploads/;
    expires 30d;
    add_header Cache-Control "public, immutable";
}
```

## API Endpoints

### Public Endpoints
- `GET /api/gallery/all` - Get all images
- `GET /api/gallery/wildlife` - Get wildlife images
- `GET /api/gallery/landscape` - Get landscape images
- `GET /api/gallery/stats` - Get gallery statistics
- `GET /api/health` - Health check

### Admin Endpoints (Requires Authentication)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `POST /api/images/upload` - Upload images
- `GET /api/images` - Get all images (admin view)
- `PUT /api/images/:id` - Update image metadata
- `DELETE /api/images/:id` - Delete image
- `POST /api/images/bulk` - Bulk operations

## Default Admin Credentials

**Username:** `admin`  
**Password:** `bobby2024!`

⚠️ **IMPORTANT**: Change these credentials in production by updating the `.env` file.

## Usage

### Accessing Admin Panel
1. Go to: `https://bobbylohia.com/admin`
2. Login with admin credentials
3. Upload, edit, and manage images

### Frontend Integration
The React frontend automatically fetches images from the API endpoints. No additional configuration needed.

## File Structure

```
/public_html/
├── index.html (your React frontend)
├── assets/ (your frontend assets)
├── backend/ (new backend server)
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   │   ├── auth.js
│   │   ├── images.js
│   │   └── gallery.js
│   ├── data/
│   │   └── images.json
│   └── .env
└── uploads/ (image storage)
    ├── wildlife/
    │   └── thumbnails/
    └── landscape/
        └── thumbnails/
```

## Troubleshooting

### Backend Not Starting
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs bobbylohia-api

# Restart server
pm2 restart bobbylohia-api
```

### Permission Issues
```bash
# Fix upload directory permissions
chmod -R 755 uploads/
chown -R www-data:www-data uploads/
```

### API Not Accessible
- Check Nginx configuration
- Verify port 5000 is not blocked
- Check .htaccess proxy rules

## Monitoring

```bash
# View real-time logs
pm2 logs bobbylohia-api --lines 50

# Monitor server performance
pm2 monit

# View process details
pm2 show bobbylohia-api
```

## Backup

### Database Backup
```bash
# Backup images metadata
cp /public_html/backend/data/images.json /backups/images-$(date +%Y%m%d).json
```

### Image Backup
```bash
# Backup all images
tar -czf /backups/uploads-$(date +%Y%m%d).tar.gz uploads/
```

## Security Notes

- Admin panel is protected with JWT authentication
- File uploads are validated for type and size
- Rate limiting is enabled for API endpoints
- CORS is properly configured
- Sensitive files are protected with .htaccess

## Support

For issues:
1. Check PM2 logs: `pm2 logs bobbylohia-api`
2. Verify API health: `curl https://bobbylohia.com/api/health`
3. Check file permissions in uploads directory

---

**Backend Version:** 1.0.0  
**Last Updated:** November 2024
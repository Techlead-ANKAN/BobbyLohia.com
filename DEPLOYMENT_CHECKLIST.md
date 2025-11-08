# 🚀 Deployment Checklist for Bobby Lohia Photography Admin Panel

## ✅ Pre-Deployment Steps (Complete)

- [x] **Backend Server Created**
  - Express.js server with all routes
  - JWT authentication system
  - Image upload with multer
  - JSON-based data storage
  - Error handling and security

- [x] **React Admin Panel Built**
  - Professional upload interface
  - Drag & drop functionality
  - Image management (edit/delete)
  - Mobile responsive design
  - Authentication flow

- [x] **API Integration Ready**
  - ImageAPI service created
  - React hooks for data fetching
  - Fallback to static images
  - URL handling for production/dev

## 🔧 VPS Deployment Steps

### Step 1: Connect to VPS
```bash
# SSH into your Hostinger VPS
ssh u383920653@145.79.21.113
```

### Step 2: Prepare Environment
```bash
# Navigate to web directory
cd /public_html/

# Install Node.js (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2 for process management
sudo npm install -g pm2
```

### Step 3: Upload Backend Files
Upload these files to `/public_html/backend/`:
- [x] server.js
- [x] package.json  
- [x] .env
- [x] routes/ (folder with auth.js, images.js, gallery.js)
- [x] data/ (folder with images.json)
- [x] .htaccess
- [x] README.md

### Step 4: Install Dependencies
```bash
cd /public_html/backend
npm install
```

### Step 5: Create Upload Directories
```bash
mkdir -p uploads/wildlife/thumbnails
mkdir -p uploads/landscape/thumbnails
chmod -R 755 uploads/
```

### Step 6: Configure Environment
```bash
# Edit .env file if needed
nano .env
# Change JWT_SECRET and admin credentials if desired
```

### Step 7: Start Backend Server
```bash
# Start with PM2
pm2 start server.js --name "bobbylohia-api"

# Save PM2 configuration
pm2 save

# Enable auto-start on boot
pm2 startup
```

### Step 8: Test Backend
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Should return: {"status":"OK","message":"Bobby Lohia Backend API is running"}
```

### Step 9: Update Frontend
```bash
# Build your React app
npm run build

# Upload dist/ contents to /public_html/ (overwrite existing)
```

### Step 10: Configure Web Server
Copy the .htaccess content to `/public_html/.htaccess` to enable API routing.

## 🎯 Testing Checklist

After deployment, test these features:

### Backend Testing
- [ ] **API Health**: Visit `https://bobbylohia.com/api/health`
- [ ] **Gallery API**: Visit `https://bobbylohia.com/api/gallery/all`
- [ ] **Image Serving**: Check if images load from `/uploads/`

### Admin Panel Testing  
- [ ] **Admin Access**: Go to `https://bobbylohia.com/admin`
- [ ] **Login**: Use credentials (admin / bobby2024!)
- [ ] **Dashboard**: View statistics and interface
- [ ] **Image Upload**: Test drag & drop upload
- [ ] **Image Management**: Edit titles, descriptions
- [ ] **Image Deletion**: Delete test images
- [ ] **Logout**: Ensure logout works properly

### Frontend Integration Testing
- [ ] **Gallery Display**: Check if uploaded images appear in gallery
- [ ] **Categories**: Verify wildlife/landscape categorization
- [ ] **Performance**: Ensure fast loading
- [ ] **Fallback**: Test behavior when backend is down

## 📊 Expected Results

### URLs That Should Work:
- `https://bobbylohia.com/` → Main website ✅
- `https://bobbylohia.com/admin` → Admin panel 🆕
- `https://bobbylohia.com/api/health` → Backend status 🆕
- `https://bobbylohia.com/api/gallery/all` → Image API 🆕
- `https://bobbylohia.com/uploads/wildlife/image.jpg` → Served images 🆕

### Admin Panel Features:
- 🔐 **Secure Login** with JWT authentication
- 📤 **Image Upload** with drag & drop (up to 10 images)
- 🏷️ **Categorization** (Wildlife/Landscape)
- ✏️ **Metadata Editing** (titles, descriptions)
- 🗑️ **Image Deletion** (single & bulk)
- 📊 **Statistics Dashboard** (image counts)
- 📱 **Mobile Responsive** design

## 🚨 Troubleshooting

### If Backend Won't Start:
```bash
pm2 logs bobbylohia-api
cd /public_html/backend && npm install
pm2 restart bobbylohia-api
```

### If Images Won't Upload:
```bash
chmod -R 755 uploads/
chown -R www-data:www-data uploads/
```

### If API Returns 404:
- Check .htaccess file is in place
- Verify Nginx/Apache proxy configuration
- Ensure PM2 process is running: `pm2 status`

## 🔐 Default Admin Credentials

**Username:** `admin`  
**Password:** `bobby2024!`

⚠️ **Change these in production** by updating the `.env` file!

## 🎉 Success Metrics

✅ **Deployment is successful when:**
- Admin panel loads at `/admin`
- You can login and upload images
- Images appear in the main gallery immediately
- Website performance is maintained
- All existing functionality works

---

**Ready for deployment!** Follow the steps above and you'll have a fully functional image management system. 🚀
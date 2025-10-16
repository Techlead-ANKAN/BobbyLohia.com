# 🚀 Hostinger Premium Hosting Upload Guide

## 📦 What to Upload to Hostinger

**Upload ALL contents from your `dist/` folder to your domain's root directory:**

### **Required Files & Folders:**
```
📁 Your Domain Root (public_html or domain folder)
├── 📄 index.html                 ← Main website file
├── 📄 .htaccess                  ← Apache configuration  
├── 📁 assets/                    ← CSS, JS, optimized images
│   ├── index-CeLWa5o6.js        ← Main JavaScript bundle
│   ├── index-JCrhHgQM.css       ← Styles
│   ├── vendor-Dy2uw6f2.js       ← React libraries
│   └── [image files]            ← Optimized images
├── 📁 images/                    ← All 62 wildlife photos
│   ├── WildlifeAlbumFiles00.jpg
│   ├── WildlifeAlbumFiles01.jpg
│   └── ... (all 62 photos)
├── 📁 fonts/                     ← Custom Mangro font
│   └── mangro/
│       └── mangro.otf
└── 📄 vite.svg                   ← Favicon
```

## 🎯 Hostinger Upload Steps

### **Step 1: Access File Manager**
1. Log into your **Hostinger Control Panel**
2. Find your domain in the website list
3. Click **"Manage"** or **"File Manager"**

### **Step 2: Navigate to Root Directory**
- Go to **`public_html`** (most common)
- OR go to your **domain name folder** (e.g., `bobbylohia.com`)
- **Delete any existing files** in this directory

### **Step 3: Upload Your Files**

#### **Option A: Drag & Drop (Recommended)**
1. Open **File Manager** in Hostinger
2. Navigate to your domain's root folder
3. **Drag and drop ALL files/folders** from your local `dist/` folder
4. Wait for upload to complete (may take 2-5 minutes)

#### **Option B: Zip Upload**
1. **Create a ZIP file** of all `dist/` contents
2. **Upload the ZIP** to File Manager
3. **Right-click** the ZIP file
4. Select **"Extract"** or **"Unzip"**
5. **Delete the ZIP** file after extraction

### **Step 4: Set File Permissions**
Usually automatic, but if needed:
- **Files**: 644 (read/write for owner, read for others)
- **Folders**: 755 (read/write/execute for owner, read/execute for others)

## ✅ Upload Checklist

Before uploading, ensure you have:
- ✅ **index.html** (main entry point)
- ✅ **.htaccess** (routing & performance)
- ✅ **assets/ folder** (CSS, JS, optimized images)
- ✅ **images/ folder** (all 62 wildlife photos)
- ✅ **fonts/ folder** (Mangro font)
- ✅ **vite.svg** (favicon)

## 🌐 After Upload

### **Immediate Testing:**
1. **Visit your domain** (e.g., `https://bobbylohia.com`)
2. **Test navigation** (Home, Gallery, Albums, Contact)
3. **Check image loading** (gallery photos)
4. **Test contact form** (EmailJS integration)
5. **Verify mobile responsiveness**

### **SSL Certificate:**
- Hostinger Premium automatically provides **free SSL**
- Your site should be accessible via **`https://`**
- If not automatic, enable SSL in hosting settings

## 📱 Performance Features Included

Your uploaded site includes:
- ✅ **Optimized Bundle**: 74KB gzipped JavaScript
- ✅ **Image Optimization**: All photos optimized for web
- ✅ **Caching**: Browser caching via .htaccess
- ✅ **Compression**: Gzip compression enabled
- ✅ **Mobile-First**: Fully responsive design
- ✅ **SEO Ready**: Meta tags and structure

## 🚨 Important Notes

1. **Domain Propagation**: Changes may take 5-15 minutes to reflect
2. **Cache**: Clear browser cache if old version appears
3. **File Structure**: Maintain exact folder structure as shown above
4. **Case Sensitivity**: File names are case-sensitive on servers

## 🔧 Troubleshooting

### **Common Issues:**

1. **404 Errors on Page Refresh**
   - Ensure `.htaccess` is uploaded and in root directory
   - Check if Apache mod_rewrite is enabled (usually automatic on Hostinger)

2. **Images Not Loading**
   - Verify `images/` folder is in root directory
   - Check file permissions (644 for files, 755 for folders)

3. **Styles Not Applied**
   - Ensure `assets/` folder uploaded completely
   - Check if CSS files are in `assets/` folder

4. **Contact Form Not Working**
   - Test after domain is fully propagated
   - Check browser console for JavaScript errors

---

## 🎉 Ready to Upload!

Your `dist/` folder contains everything needed for your professional photography portfolio. Simply upload all contents to your Hostinger domain root, and your website will be live!

**Total Upload Size**: ~50-60MB (optimized for fast loading)
**Upload Time**: 2-5 minutes depending on connection speed
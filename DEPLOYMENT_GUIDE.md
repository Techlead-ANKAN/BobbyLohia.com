# Hostinger Deployment Guide for Bobby Lohia Photography

## 🚀 Pre-Deployment Checklist

✅ **Production Build Created**: `dist/` folder contains optimized files  
✅ **Vite Configuration**: Configured for static hosting with proper base path  
✅ **Apache .htaccess**: Created for React Router compatibility  
✅ **Assets Optimized**: Images and fonts ready for production  
✅ **Local Testing**: Production build tested successfully  

## 📋 Deployment Steps

### 1. **Access Hostinger File Manager**
   - Log into your Hostinger control panel
   - Navigate to **File Manager**
   - Go to `public_html` directory (or your domain's root folder)

### 2. **Upload Website Files**
   - **DELETE** all existing files in `public_html` (if any)
   - **UPLOAD** all contents from the `dist/` folder to `public_html`
   - Ensure these files are in the root:
     - `index.html`
     - `.htaccess`
     - `assets/` folder
     - `images/` folder
     - `fonts/` folder

### 3. **File Structure on Server**
   ```
   public_html/
   ├── index.html
   ├── .htaccess
   ├── assets/
   │   ├── index-BBLD4pxS.js
   │   ├── index-JCrhHgQM.css
   │   ├── vendor-Dy2uw6f2.js
   │   └── [image files]
   ├── images/
   │   └── [all wildlife photos]
   └── fonts/
       └── mangro/
   ```

### 4. **Set File Permissions** (if needed)
   - Files: `644`
   - Folders: `755`
   - `.htaccess`: `644`

### 5. **Domain Configuration**
   - Ensure your domain points to `public_html`
   - Wait for DNS propagation (up to 24 hours)

## 🌐 Post-Deployment

### **Test Your Website**
- Visit your domain (e.g., `https://bobbylohia.com`)
- Test navigation between pages
- Verify image loading
- Test contact form
- Check mobile responsiveness

### **Performance Optimization**
- **CDN**: Enable Cloudflare in Hostinger (recommended)
- **SSL**: Ensure SSL certificate is active
- **Caching**: Browser caching configured via `.htaccess`

## 📧 EmailJS Configuration

Update your contact form with production EmailJS keys:
1. Go to [EmailJS Dashboard](https://www.emailjs.com/)
2. Get your Service ID, Template ID, and Public Key
3. Update environment variables if needed

## 🔧 Troubleshooting

### **Common Issues:**

1. **404 Errors on Page Refresh**
   - Ensure `.htaccess` file is uploaded
   - Check Apache rewrite module is enabled

2. **Images Not Loading**
   - Verify file paths are correct
   - Check file permissions (644)

3. **CSS/JS Not Loading**
   - Clear browser cache
   - Check file permissions
   - Verify assets folder structure

4. **Contact Form Not Working**
   - Update EmailJS configuration
   - Check console for errors

## 📱 Mobile Performance

Your site is optimized for:
- ✅ Mobile devices (320px+)
- ✅ Tablets (768px+)
- ✅ Foldable phones (380px-640px)
- ✅ Desktop displays (1280px+)

## 🎯 Production Features

- **Minified Code**: 73KB gzipped JavaScript
- **Optimized CSS**: 8.76KB gzipped styles
- **Image Optimization**: All wildlife photos ready
- **SEO Ready**: Meta tags and structured data
- **Fast Loading**: Lazy loading and code splitting
- **Secure**: Security headers via .htaccess

---

**🎉 Your Bobby Lohia Photography website is ready for production!**

After deployment, your professional wildlife photography portfolio will be live and fully responsive across all devices.
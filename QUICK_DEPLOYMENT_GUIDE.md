# 🚀 QUICK DEPLOYMENT GUIDE - Bobby Lohia Photography

## ⚡ 1-Minute Setup for Hostinger

### Step 1: Prepare Your Domain
Update these files with your actual domain:
- `src/config/config.js` - Line 4: Change `yourdomain.com` to your domain
- `backend/.env.production` - Line 9: Change `yourdomain.com` to your domain
- `backend/server.js` - Lines 32-33: Change to your domain

### Step 2: Run Deployment Script
```powershell
# In PowerShell (Windows)
.\deploy.ps1 production
```

This will:
- ✅ Build your React app
- ✅ Prepare backend files  
- ✅ Create deployment package
- ✅ Generate instructions

### Step 3: Upload to Hostinger
1. **Hostinger Control Panel** → **File Manager**
2. Navigate to `/public_html/`
3. **Delete existing files** (backup first!)
4. **Upload** all files from deployment package
5. **Extract** if uploaded as ZIP

### Step 4: Configure Node.js
1. **Hostinger Control Panel** → **Advanced** → **Node.js**
2. **Create Application**:
   - App root: `/public_html/api`
   - Startup file: `server.js`
   - Node version: 18.x

### Step 5: Set Environment Variables
Add in Node.js app settings:
```
NODE_ENV=production
PORT=3000
JWT_SECRET=BobbyLohia2024_SuperSecure_Photography_JWT_Key_12345!@#
ADMIN_USERNAME=admin
ADMIN_PASSWORD=BobbyLohia2024Admin!
CORS_ORIGIN=https://yourdomain.com
```

### Step 6: Start & Test
1. **Start** the Node.js application
2. Test: `https://yourdomain.com` (website)
3. Test: `https://yourdomain.com/api/images` (API)
4. Test: `https://yourdomain.com/admin` (admin panel)

## 🎯 That's it! Your site is live!

---

## 🚨 Quick Troubleshooting

**Website not loading?**
- Check .htaccess file uploaded correctly
- Verify domain DNS settings

**API not working?**
- Check Node.js app is "Running" in control panel
- Verify environment variables are set
- Check server logs for errors

**Admin panel not accessible?**
- Try: `https://yourdomain.com/admin`
- Clear browser cache
- Check console for errors

**Images not displaying?**
- Check uploads folder permissions (755)
- Verify image paths in database
- Test direct image URLs

---

## 📞 Support Checklist

Before contacting support:
- [ ] Domain properly connected
- [ ] All files uploaded to /public_html/
- [ ] Node.js app configured and running
- [ ] Environment variables set correctly
- [ ] Tested all URLs individually

**Contact Hostinger Support** via control panel if issues persist.

---

**🎉 Congratulations!** 
Your Bobby Lohia Photography website is now live with full admin functionality!
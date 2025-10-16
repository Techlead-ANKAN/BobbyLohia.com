# 🚀 How to Update Your Live Hostinger Website

## 🎯 Current Setup
- ✅ **Website Live**: Bobby Lohia photography portfolio on Hostinger
- ✅ **Domain Connected**: bobbylohia.com working
- ✅ **Files Uploaded**: All content in Hostinger File Manager
- 🔧 **Next**: How to push code changes to live site

---

## 📋 STEP-BY-STEP UPDATE PROCESS

### **Method 1: Complete Rebuild & Upload (Recommended for Major Changes)**

#### **Step 1: Make Your Changes**
1. **Edit your code** in VS Code (React components, CSS, etc.)
2. **Test locally** with `npm run dev`
3. **Verify everything works** before deploying

#### **Step 2: Build Production Version**
```powershell
# In your project directory
npm run build
```
- This creates a new optimized `dist/` folder
- All your changes are compiled and minified

#### **Step 3: Upload to Hostinger**
1. **Open Hostinger File Manager**
2. **Navigate to your domain root** (public_html)
3. **Delete old files** (optional but recommended for clean deployment)
4. **Upload new dist/ contents**

---

### **Method 2: Selective File Updates (For Small Changes)**

#### **For CSS/JS Changes:**
1. **Build the project**: `npm run build`
2. **In Hostinger File Manager**:
   - Go to `assets/` folder
   - **Replace only the changed files**:
     - `index-[hash].css` (styles)
     - `index-[hash].js` (JavaScript)
     - `vendor-[hash].js` (if libraries changed)

#### **For Content/Images:**
1. **New images**: Upload to `images/` folder
2. **New fonts**: Upload to `fonts/` folder  
3. **Config changes**: Update `.htaccess` if needed

---

## ⚡ AUTOMATED WORKFLOW SETUP

### **Option A: Git + Manual Deploy**
```bash
# After making changes
git add .
git commit -m "Update: describe your changes"
git push

# Then build and upload
npm run build
# Upload dist/ contents to Hostinger
```

### **Option B: FTP/SFTP Client (Advanced)**
1. **Install FileZilla** or similar FTP client
2. **Connect to Hostinger** using FTP credentials
3. **Sync local dist/ folder** with remote hosting
4. **Automatic file replacement**

---

## 🛠️ COMMON UPDATE SCENARIOS

### **Scenario 1: Text/Content Changes**
**Example**: Update contact information, gallery descriptions
```bash
1. Edit React components (Contact.jsx, etc.)
2. npm run build
3. Upload new assets/ folder to Hostinger
```

### **Scenario 2: New Photos Added**
**Example**: Add new wildlife photos to gallery
```bash
1. Add images to public/images/ folder
2. Update portfolio.js data file
3. npm run build  
4. Upload new images/ folder + new assets/
```

### **Scenario 3: Design Changes**
**Example**: Change colors, fonts, layouts
```bash
1. Edit CSS/Tailwind classes
2. npm run build
3. Upload new assets/ folder (contains updated CSS)
```

### **Scenario 4: New Features**
**Example**: Add new page, component, functionality
```bash
1. Develop new features locally
2. Test thoroughly with npm run dev
3. npm run build
4. Upload entire dist/ contents (full update)
```

---

## 📁 FILE STRUCTURE REFERENCE

### **Your Local Development:**
```
BobbyLohia.com/
├── src/           ← Edit these files
├── public/        ← Add images/assets here
├── dist/          ← Generated on build
└── package.json
```

### **Hostinger Live Site:**
```
public_html/
├── index.html     ← From dist/
├── assets/        ← From dist/assets/  
├── images/        ← From dist/images/
├── fonts/         ← From dist/fonts/
└── .htaccess      ← From dist/
```

---

## ⏱️ UPDATE TIMELINE

### **Small Changes** (CSS, text):
- **Build time**: 10-30 seconds
- **Upload time**: 1-3 minutes  
- **Live changes**: Immediately visible

### **Major Changes** (new features):
- **Development**: Varies
- **Testing**: 5-15 minutes
- **Build & upload**: 3-7 minutes
- **Cache clear**: May need browser refresh

---

## 🔧 BEST PRACTICES

### **Before Every Update:**
1. ✅ **Test locally first** (`npm run dev`)
2. ✅ **Check mobile responsiveness**
3. ✅ **Verify all links work**
4. ✅ **Test contact form** (if changed)

### **During Upload:**
1. ✅ **Backup current site** (download existing files)
2. ✅ **Upload to staging** (if available)
3. ✅ **Clear browser cache** after upload
4. ✅ **Test live site** immediately

### **After Update:**
1. ✅ **Test on multiple devices**
2. ✅ **Check all pages load**
3. ✅ **Verify image galleries work**
4. ✅ **Test contact form functionality**

---

## 🚨 TROUBLESHOOTING

### **Changes Not Showing:**
- **Clear browser cache** (Ctrl+F5)
- **Check file upload completed**
- **Verify correct folder structure**
- **Wait 5-10 minutes** for CDN updates

### **Build Errors:**
- **Fix code issues** before building
- **Check console for errors**
- **Ensure all imports are correct**
- **Verify package.json dependencies**

### **Upload Issues:**
- **Check file permissions** (644 for files, 755 for folders)
- **Verify folder structure** matches exactly
- **Try uploading files individually** if bulk upload fails

---

## 🎯 QUICK UPDATE CHECKLIST

For any website change:

1. ⏹️ **Make changes** in VS Code
2. 🧪 **Test locally** (`npm run dev`)
3. 🔧 **Build production** (`npm run build`)  
4. 📤 **Upload dist/ contents** to Hostinger
5. ✅ **Test live site**
6. 🎉 **Changes are live!**

---

## 💡 PRO TIPS

### **Version Control:**
- **Commit changes** to Git before deploying
- **Tag major releases** for easy rollback
- **Keep deployment notes** for tracking

### **Performance:**
- **Only upload changed files** for faster updates
- **Compress images** before adding to gallery
- **Test loading speed** after updates

### **Maintenance:**
- **Regular backups** of live site
- **Monitor site performance**
- **Keep dependencies updated**

---

Your Bobby Lohia photography website is now ready for seamless updates! 📸✨

**Most common workflow**: Edit code → Test → Build → Upload assets/ folder → Live! 🚀
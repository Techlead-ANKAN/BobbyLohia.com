# 🌐 Connect External Domain to Hostinger Hosting

## 🎯 Current Situation
- ✅ **Files Uploaded**: Your Bobby Lohia website is uploaded to Hostinger
- 🔧 **Domain Setup**: Your domain is registered with a different provider
- 📋 **Next Step**: Point your external domain to Hostinger servers

---

## 🚀 STEP-BY-STEP DOMAIN CONNECTION

### **Step 1: Get Hostinger Nameservers**
1. **Login to Hostinger Control Panel**
2. Go to **"Domains"** section
3. Find your hosting plan or look for **"Nameservers"**
4. **Copy these Hostinger nameservers** (usually):
   ```
   ns1.dns-parking.com
   ns2.dns-parking.com
   ```
   OR
   ```
   ns1.hostinger.com
   ns2.hostinger.com
   ```

### **Step 2: Add Domain to Hostinger**
1. In Hostinger Control Panel → **"Websites"**
2. Click **"Add Domain"** or **"Manage Domain"**
3. **Enter your domain name** (e.g., bobbylohia.com)
4. **Point it to your existing hosting** where files are uploaded
5. **Save settings**

### **Step 3: Update Nameservers at Domain Provider**

#### **At Your Domain Registrar** (GoDaddy/Namecheap/etc.):
1. **Login to your domain provider**
2. Find **"Domain Management"** or **"DNS Settings"**
3. Look for **"Nameservers"** or **"DNS"**
4. **Change from current nameservers TO Hostinger nameservers:**
   ```
   Replace existing with:
   ns1.hostinger.com
   ns2.hostinger.com
   ```
5. **Save changes**

---

## ⏰ PROPAGATION TIME

### **Wait Period:**
- **Nameserver changes**: 4-48 hours (usually 4-12 hours)
- **DNS propagation**: Can take up to 72 hours globally
- **Most users see changes**: Within 6-24 hours

### **During This Time:**
- Your domain might show:
  - Old hosting content
  - "Site not found" errors
  - Intermittent loading
- **This is normal!** Be patient.

---

## 🔧 ALTERNATIVE METHOD: DNS Records (Faster)

If you want to keep nameservers with your domain provider:

### **Option A: A Record Method**
1. **Get Hostinger IP address** from hosting control panel
2. **At your domain provider**, go to **DNS settings**
3. **Add/Update A Record:**
   ```
   Type: A
   Name: @ (or blank)
   Value: [Hostinger IP address]
   TTL: 3600
   ```
4. **Add WWW subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: yourdomain.com
   TTL: 3600
   ```

### **Option B: CNAME Method** (if Hostinger provides)
- **Check if Hostinger gives you a CNAME** (like xyz.hostinger.com)
- **Point your domain's CNAME** to that address

---

## ✅ VERIFICATION CHECKLIST

### **After Making Changes:**

1. **Check Propagation Status:**
   - Visit: whatsmydns.net
   - Enter your domain name
   - Check if it points to Hostinger servers globally

2. **Test Your Website:**
   - Try: `http://yourdomain.com`
   - Try: `https://yourdomain.com`
   - Try: `www.yourdomain.com`

3. **Mobile Test:**
   - Test on different devices
   - Check if all features work

---

## 🚨 COMMON ISSUES & SOLUTIONS

### **"Site Not Found" Error:**
- **Wait longer** - propagation still in progress
- **Clear browser cache** - old DNS might be cached
- **Try different browser/device**

### **Mixed Content Warnings:**
- **Enable SSL** in Hostinger control panel
- **Force HTTPS** redirect (usually automatic)

### **Emails Not Working:**
- **Keep email settings** with original domain provider
- OR **migrate email** to Hostinger (optional)

### **Partial Loading:**
- Some users see new site, others don't
- **Normal during propagation** - wait it out

---

## 📞 NEED HELP?

### **Hostinger Support:**
- **Live Chat**: Available 24/7 in control panel
- **Ask about**: "Connecting external domain to hosting"

### **Domain Provider Support:**
- **Ask about**: "Changing nameservers to point to external hosting"
- **Show them**: Hostinger nameserver addresses

---

## 🎉 SUCCESS INDICATORS

### **Your Website is Live When:**
- ✅ Domain loads your Bobby Lohia photography portfolio
- ✅ All 62 wildlife photos display correctly  
- ✅ Navigation works smoothly
- ✅ Contact form functions (EmailJS)
- ✅ Mobile responsiveness works
- ✅ HTTPS (SSL) certificate is active

---

## ⚡ QUICK ACTION ITEMS

1. **Get Hostinger nameservers** from control panel
2. **Add your domain** in Hostinger website management
3. **Update nameservers** at your domain registrar
4. **Wait 4-24 hours** for propagation
5. **Test your live website!**

**Your beautiful wildlife photography portfolio will be live soon!** 📸🌐
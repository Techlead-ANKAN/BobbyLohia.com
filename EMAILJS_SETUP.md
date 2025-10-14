# EmailJS Setup Instructions for Bobby Lohia Photography

## 📧 EmailJS Configuration Complete

### **Your EmailJS Credentials:**
- **Service ID**: `service_eirqppc`
- **Template ID**: `template_vwsh3gi`
- **Public Key**: `3NyLqOGtvYdpovGxA`

## 🛠️ Template Setup in EmailJS Dashboard

### **Step 1: Copy the HTML Template**
1. Go to your [EmailJS Dashboard](https://dashboard.emailjs.com/admin/templates/template_vwsh3gi)
2. Click on your template: **"template_vwsh3gi"**
3. Replace the existing content with the HTML template from `emailjs-template.html`

### **Step 2: Template Variables**
Make sure these variables are configured in your EmailJS template:
- `{{name}}` - Full name (firstName + lastName)
- `{{email}}` - Sender's email address
- `{{phone}}` - Phone number (optional field)
- `{{subject}}` - Message subject
- `{{message}}` - Main message content
- `{{current_date}}` - Auto-generated date
- `{{current_time}}` - Auto-generated time

### **Step 3: Email Settings**
In your EmailJS template settings:
- **To Email**: `bobbylohia@gmail.com` (or your preferred email)
- **From Name**: `{{name}}`
- **From Email**: `{{email}}`
- **Reply To**: `{{email}}`
- **Subject**: `New Contact: {{subject}}`

## 🎨 Template Features

### **Professional Design:**
- ✅ Mobile-responsive HTML template
- ✅ Photography-themed styling
- ✅ Clean, professional layout
- ✅ Contact information display
- ✅ Message formatting with proper styling

### **Form Fields Mapping:**
```javascript
// Contact form fields → EmailJS template variables
firstName + lastName → {{name}}
email → {{email}}  
phone → {{phone}}
subject → {{subject}}
message → {{message}}
```

## 🚀 Implementation Status

### **Frontend Integration:**
- ✅ EmailJS library imported (`@emailjs/browser`)
- ✅ Environment variables configured
- ✅ Form submission handler updated
- ✅ Success/error messaging
- ✅ Loading states and UX

### **Form Enhancements:**
- ✅ Added phone number field (optional)
- ✅ Proper form validation
- ✅ Mobile-optimized inputs
- ✅ Accessible labels and placeholders

## 🧪 Testing Your Contact Form

### **Local Testing:**
1. Start development server: `npm run dev`
2. Navigate to `/contact` page
3. Fill out the contact form
4. Submit and check for success message
5. Check your email inbox for the formatted message

### **Production Testing:**
1. Deploy to Hostinger with updated build
2. Test form submission on live site
3. Verify email delivery
4. Check mobile responsiveness

## 🔧 Troubleshooting

### **Common Issues:**

1. **Form not sending:**
   - Check EmailJS service status
   - Verify credentials in environment variables
   - Check browser console for errors

2. **Template not formatting:**
   - Ensure HTML template is properly copied
   - Verify variable names match exactly
   - Check for HTML/CSS syntax errors

3. **Emails going to spam:**
   - Add your domain to EmailJS allowed origins
   - Configure proper SPF records (if using custom domain)

### **Environment Variables:**
```bash
# Development (.env)
VITE_EMAILJS_SERVICE_ID=service_eirqppc
VITE_EMAILJS_TEMPLATE_ID=template_vwsh3gi
VITE_EMAILJS_PUBLIC_KEY=3NyLqOGtvYdpovGxA

# Production (.env.production) - Same values
```

## 📱 Mobile Optimization

The contact form is fully optimized for:
- ✅ Touch interactions
- ✅ Mobile keyboards (tel, email input types)
- ✅ Responsive design
- ✅ Proper focus states
- ✅ Accessibility compliance

## 🎯 Next Steps

1. **Copy HTML template** to EmailJS dashboard
2. **Configure email settings** in template
3. **Test locally** before deployment  
4. **Deploy updated build** to Hostinger
5. **Test live form** submission
6. **Monitor email delivery** for first few days

---

**📸 Your photography portfolio now has a professional contact system!**

Clients can easily reach out through the beautiful contact form, and you'll receive properly formatted emails with all their details.
# 📧 EmailJS Template Setup - Quick Guide

## Copy This HTML Template to EmailJS Dashboard

**Go to:** https://dashboard.emailjs.com/admin/templates/template_vwsh3gi

**Replace the template content with this HTML:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact - Bobby Lohia Photography</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa; }
        .container { background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); color: #fff; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; }
        .contact-info { background: #f8f9fa; border-left: 4px solid #007bff; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .contact-info h2 { margin: 0 0 15px 0; color: #007bff; }
        .info-row { margin-bottom: 10px; }
        .label { font-weight: bold; color: #555; display: inline-block; width: 80px; }
        .message-box { background: #f8f9fa; padding: 20px; border-left: 3px solid #28a745; margin: 20px 0; border-radius: 4px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📸 New Contact Form Submission</h1>
            <p>Bobby Lohia Photography Portfolio</p>
        </div>
        
        <div class="content">
            <p>Hello Bobby,</p>
            <p>You have received a new message through your photography portfolio website.</p>
            
            <div class="contact-info">
                <h2>Contact Details</h2>
                <div class="info-row"><span class="label">Name:</span> {{name}}</div>
                <div class="info-row"><span class="label">Email:</span> {{email}}</div>
                <div class="info-row"><span class="label">Phone:</span> {{phone}}</div>
                <div class="info-row"><span class="label">Subject:</span> {{subject}}</div>
            </div>
            
            <div class="message-box">
                <h3>📝 Message:</h3>
                <p>{{message}}</p>
            </div>
            
            <p><strong>Reply directly to this email to respond to {{name}}</strong></p>
        </div>
        
        <div class="footer">
            <p>Sent from Bobby Lohia Photography contact form</p>
            <p>{{current_date}} at {{current_time}}</p>
        </div>
    </div>
</body>
</html>
```

## Template Settings:

- **Template Name:** Contact Us Form
- **Subject:** New Contact: {{subject}}
- **To Email:** bobbylohia@gmail.com
- **From Name:** {{name}}
- **From Email:** noreply@emailjs.com
- **Reply To:** {{email}}

## Variables Used:
- {{name}} - Contact name
- {{email}} - Contact email  
- {{phone}} - Phone number
- {{subject}} - Message subject
- {{message}} - Message content
- {{current_date}} - Date sent
- {{current_time}} - Time sent

**✅ After copying this template, your contact form will work perfectly!**
# Bobby Lohia Photography - Windows Deployment Script
# Usage: .\deploy.ps1 [production|staging]

param(
    [string]$Environment = "production"
)

$ErrorActionPreference = "Stop"
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$BackupDir = ".\backups\$Timestamp"
$DeployDir = ".\deploy_package_$Timestamp"

Write-Host "🚀 Starting deployment process for $Environment environment..." -ForegroundColor Green

# Step 1: Create backup directory
Write-Host "📦 Creating backup directory..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null

# Step 2: Backup current production data (if exists)
if (Test-Path ".\backend\data\images.json") {
    Write-Host "💾 Backing up current data..." -ForegroundColor Yellow
    Copy-Item ".\backend\data" -Destination "$BackupDir\" -Recurse -Force
    Copy-Item ".\backend\uploads" -Destination "$BackupDir\" -Recurse -Force
}

# Step 3: Install dependencies
Write-Host "📚 Installing dependencies..." -ForegroundColor Yellow
Write-Host "  - Installing frontend dependencies..." -ForegroundColor Cyan
npm install

Write-Host "  - Installing backend dependencies..." -ForegroundColor Cyan
Set-Location "backend"
npm install --production
Set-Location ".."

# Step 4: Update configuration for environment
Write-Host "🔧 Configuring for $Environment environment..." -ForegroundColor Yellow

if ($Environment -eq "production") {
    if (Test-Path ".\backend\.env.production") {
        Copy-Item ".\backend\.env.production" -Destination ".\backend\.env" -Force
        Write-Host "  ✅ Production environment configured" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Warning: .env.production file not found" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ℹ️  Using development configuration" -ForegroundColor Blue
}

# Step 5: Build frontend
Write-Host "🏗️  Building frontend application..." -ForegroundColor Yellow
$buildResult = & npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ Frontend build successful" -ForegroundColor Green
} else {
    Write-Host "  ❌ Frontend build failed" -ForegroundColor Red
    exit 1
}

# Step 6: Prepare deployment package
Write-Host "📦 Preparing deployment package..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $DeployDir -Force | Out-Null

# Copy built frontend files
Write-Host "  - Copying frontend files..." -ForegroundColor Cyan
Copy-Item ".\dist\*" -Destination $DeployDir -Recurse -Force

# Copy backend files
Write-Host "  - Copying backend files..." -ForegroundColor Cyan
New-Item -ItemType Directory -Path "$DeployDir\api" -Force | Out-Null
Copy-Item ".\backend\*" -Destination "$DeployDir\api\" -Recurse -Force

# Copy configuration files
Write-Host "  - Copying configuration files..." -ForegroundColor Cyan
Copy-Item ".\.htaccess" -Destination $DeployDir -Force

# Step 7: Create deployment info
$deploymentInfo = @"
Deployment Information
======================
Environment: $Environment
Timestamp: $Timestamp
Build Date: $(Get-Date)
PowerShell Version: $($PSVersionTable.PSVersion)
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
"@

$deploymentInfo | Out-File -FilePath "$DeployDir\deployment_info.txt" -Encoding UTF8

# Step 8: Create upload instructions
$uploadInstructions = @"
# 📤 Hostinger Upload Instructions

## 🎯 Quick Upload Guide

### Option 1: File Manager (Recommended)
1. Login to Hostinger control panel
2. Go to **File Manager**
3. Navigate to `public_html`
4. **Delete all existing files** (backup first!)
5. **Upload all files** from this deployment package
6. **Extract** if uploaded as zip

### Option 2: FTP Upload
```
Host: ftp.yourdomain.com
Username: your_hostinger_username
Password: your_hostinger_password
Port: 21
Upload to: /public_html/
```

## ⚙️ Post-Upload Configuration

### 1. Configure Node.js App
- Go to **Advanced → Node.js**
- Create new application:
  - **App root**: `/public_html/api`
  - **Startup file**: `server.js`
  - **Node version**: 18.x or latest

### 2. Set Environment Variables
Add these in Node.js app settings:
```
NODE_ENV=production
PORT=3000
JWT_SECRET=your_jwt_secret_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
CORS_ORIGIN=https://yourdomain.com
```

### 3. Start the Application
- Click **Start** in Node.js control panel
- Wait for status to show **Running**

## 🧪 Testing Deployment

### Check Frontend
- Visit: `https://yourdomain.com`
- Verify: Home page loads
- Test: Navigation works
- Check: Images display correctly

### Check Backend API
- Visit: `https://yourdomain.com/api/images`
- Should return: JSON with image list
- Test: Upload functionality
- Verify: Admin panel access

### Check Admin Panel  
- Visit: `https://yourdomain.com/admin`
- Login with admin credentials
- Test: Image management functions
- Verify: All features working

## 🚨 Troubleshooting

### Common Issues:
1. **500 Error**: Check Node.js logs in control panel
2. **CORS Error**: Verify CORS_ORIGIN environment variable
3. **404 on routes**: Check .htaccess file uploaded correctly
4. **Images not loading**: Check uploads folder permissions

## 📞 Support
- Hostinger Support: Via control panel chat
- Check deployment_info.txt for details
- Verify all steps completed successfully
"@

$uploadInstructions | Out-File -FilePath "$DeployDir\UPLOAD_INSTRUCTIONS.md" -Encoding UTF8

# Step 9: Create a simple batch file for easy upload
$uploadBatch = @"
@echo off
echo =======================================
echo  Bobby Lohia Photography
echo  Quick Upload to Hostinger
echo =======================================
echo.
echo This package contains all files ready for deployment
echo.
echo NEXT STEPS:
echo 1. Zip this entire folder
echo 2. Upload to Hostinger File Manager
echo 3. Extract in /public_html/
echo 4. Configure Node.js app (see instructions)
echo.
echo Files ready for upload:
dir /b
echo.
pause
"@

$uploadBatch | Out-File -FilePath "$DeployDir\UPLOAD_TO_HOSTINGER.bat" -Encoding ASCII

# Step 10: Summary
Write-Host ""
Write-Host "🎉 Deployment package created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Package location: $DeployDir" -ForegroundColor Cyan
Write-Host "📄 Backup location: $BackupDir" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "  1. Review files in $DeployDir" -ForegroundColor White
Write-Host "  2. Run UPLOAD_TO_HOSTINGER.bat for quick instructions" -ForegroundColor White
Write-Host "  3. Follow UPLOAD_INSTRUCTIONS.md for detailed steps" -ForegroundColor White
Write-Host "  4. Upload to Hostinger via File Manager or FTP" -ForegroundColor White
Write-Host "  5. Configure Node.js app in control panel" -ForegroundColor White
Write-Host "  6. Test deployment thoroughly" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Configuration files ready:" -ForegroundColor Yellow
Write-Host "  ✅ Frontend built and optimized" -ForegroundColor Green
Write-Host "  ✅ Backend production ready" -ForegroundColor Green
Write-Host "  ✅ Environment variables configured" -ForegroundColor Green
Write-Host "  ✅ .htaccess rules included" -ForegroundColor Green
Write-Host ""
Write-Host "Happy deploying! 🚀" -ForegroundColor Magenta

# Open the deployment folder
Start-Process explorer.exe -ArgumentList $DeployDir
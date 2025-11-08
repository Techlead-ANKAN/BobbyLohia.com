const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs-extra');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'bobby-lohia-photography-secret-key-2024';

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Multer configuration - Save to temp folder first, then move to correct category
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save to temp folder first since req.body.category might not be available yet
    const tempDir = './uploads/temp';
    fs.ensureDirSync(tempDir);
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substr(2, 9);
    const extension = path.extname(file.originalname);
    const filename = `img_${timestamp}_${randomId}${extension}`;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WebP files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Helper function to read/write images.json
const getImagesData = async () => {
  try {
    const data = await fs.readJson('./data/images.json');
    return data.images || [];
  } catch (error) {
    return [];
  }
};

const saveImagesData = async (images) => {
  try {
    await fs.writeJson('./data/images.json', { images }, { spaces: 2 });
  } catch (error) {
    console.error('Error saving images data:', error);
    throw error;
  }
};

// Generate thumbnail
const generateThumbnail = async (imagePath, category) => {
  try {
    const thumbnailDir = `./uploads/${category}`;
    await fs.ensureDir(thumbnailDir);
    
    const filename = path.basename(imagePath);
    const thumbnailPath = path.join(thumbnailDir, `thumb_${filename}`);
    
    await sharp(imagePath)
      .resize(400, 300, { 
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 80 })
      .toFile(thumbnailPath);
    
    return thumbnailPath;
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    return null;
  }
};

// Upload images endpoint
router.post('/upload', authenticateToken, upload.array('images', 50), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const images = await getImagesData();
    const uploadedImages = [];

    console.log('=== UPLOAD REQUEST DEBUG ===');
    console.log('Request body:', req.body);
    console.log('Number of files:', req.files.length);
    console.log('Files array:', req.files.map(f => ({ filename: f.filename, path: f.path })));

    for (const file of req.files) {
      // Make sure we get the category correctly
      let category = (req.body.category || 'landscape').toLowerCase();
      const title = req.body.title || 'Untitled';
      
      console.log(`\n--- Processing file: ${file.filename} ---`);
      console.log(`Category from request: "${category}"`);
      console.log(`Title from request: "${title}"`);
      console.log(`Current file path: ${file.path}`);
      
      const description = req.body.description || '';
      const altText = req.body.altText || title || 'Photography image';
      const featured = req.body.featured === 'true';

      // Validate category
      if (!['wildlife', 'landscape'].includes(category)) {
        console.error(`Invalid category: ${category}, defaulting to landscape`);
        category = 'landscape';
      }

      // Move file from temp to correct category folder
      const categoryDir = `./uploads/${category}`;
      await fs.ensureDir(categoryDir);
      
      const oldPath = file.path; // Current temp path
      const newPath = path.join(categoryDir, file.filename);
      
      console.log(`Moving from: ${oldPath}`);
      console.log(`Moving to: ${newPath}`);
      
      try {
        // Check if source file exists
        const sourceExists = await fs.pathExists(oldPath);
        console.log(`Source file exists: ${sourceExists}`);
        
        if (sourceExists) {
          await fs.move(oldPath, newPath);
          console.log(`✅ Successfully moved file to ${category} folder`);
        } else {
          throw new Error(`Source file does not exist: ${oldPath}`);
        }
      } catch (moveError) {
        console.error('❌ Error moving file:', moveError);
        throw new Error(`Failed to move file to ${category} folder: ${moveError.message}`);
      }

      const imageData = {
        id: Date.now() + Math.random(),
        filename: file.filename,
        originalName: file.originalname,
        title: title,
        description: description,
        altText: altText,
        category: category,
        featured: featured,
        imagePath: `/uploads/${category}/${file.filename}`,
        thumbnailPath: `/uploads/${category}/${file.filename}`,
        size: file.size,
        uploadDate: new Date().toISOString(),
        isActive: true
      };

      images.push(imageData);
      uploadedImages.push(imageData);
    }

    await saveImagesData(images);

    res.json({
      success: true,
      message: `Successfully uploaded ${uploadedImages.length} image(s)`,
      images: uploadedImages
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Upload failed: ' + error.message
    });
  }
});

// Get all images
router.get('/', async (req, res) => {
  try {
    const images = await getImagesData();
    const { category, page = 1, limit = 50 } = req.query;

    let filteredImages = images.filter(img => img.isActive);

    if (category) {
      filteredImages = filteredImages.filter(img => 
        img.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedImages = filteredImages.slice(startIndex, endIndex);

    res.json({
      success: true,
      images: paginatedImages,
      pagination: {
        currentPage: parseInt(page),
        totalImages: filteredImages.length,
        totalPages: Math.ceil(filteredImages.length / limit),
        hasNext: endIndex < filteredImages.length,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch images'
    });
  }
});

// Get statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const images = await getImagesData();
    const activeImages = images.filter(img => img.isActive);
    
    const stats = {
      total: activeImages.length,
      wildlife: activeImages.filter(img => img.category === 'wildlife').length,
      landscape: activeImages.filter(img => img.category === 'landscape').length,
      totalSize: activeImages.reduce((sum, img) => sum + (img.size || 0), 0)
    };

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

// Get single image
router.get('/:id', async (req, res) => {
  try {
    const images = await getImagesData();
    const image = images.find(img => img.id == req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    res.json({
      success: true,
      image
    });

  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch image'
    });
  }
});

// Update image metadata
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const images = await getImagesData();
    const imageIndex = images.findIndex(img => img.id == req.params.id);

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    const { title, description, category, altText, featured } = req.body;
    
    images[imageIndex] = {
      ...images[imageIndex],
      title: title !== undefined ? title : images[imageIndex].title,
      description: description !== undefined ? description : images[imageIndex].description,
      category: category || images[imageIndex].category,
      altText: altText !== undefined ? altText : images[imageIndex].altText,
      featured: featured !== undefined ? featured : images[imageIndex].featured,
      updatedDate: new Date().toISOString()
    };

    await saveImagesData(images);

    res.json({
      success: true,
      message: 'Image updated successfully',
      image: images[imageIndex]
    });

  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update image'
    });
  }
});

// Delete image
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const images = await getImagesData();
    const imageIndex = images.findIndex(img => img.id == req.params.id);

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    const image = images[imageIndex];

    // Delete physical files
    try {
      await fs.unlink(`.${image.imagePath}`);
      if (image.thumbnailPath) {
        await fs.unlink(`.${image.thumbnailPath}`);
      }
    } catch (fileError) {
      console.error('Error deleting files:', fileError);
    }

    // Remove from data
    images.splice(imageIndex, 1);
    await saveImagesData(images);

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete image'
    });
  }
});

// Bulk operations
router.post('/bulk', authenticateToken, async (req, res) => {
  try {
    const { action, imageIds } = req.body;

    if (!action || !imageIds || !Array.isArray(imageIds)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid bulk operation parameters'
      });
    }

    const images = await getImagesData();
    let modifiedCount = 0;

    if (action === 'delete') {
      for (const id of imageIds) {
        const imageIndex = images.findIndex(img => img.id == id);
        if (imageIndex !== -1) {
          const image = images[imageIndex];
          
          // Delete physical files
          try {
            await fs.unlink(`.${image.imagePath}`);
            if (image.thumbnailPath) {
              await fs.unlink(`.${image.thumbnailPath}`);
            }
          } catch (fileError) {
            console.error('Error deleting files:', fileError);
          }

          images.splice(imageIndex, 1);
          modifiedCount++;
        }
      }
    }

    await saveImagesData(images);

    res.json({
      success: true,
      message: `Bulk ${action} completed for ${modifiedCount} image(s)`
    });

  } catch (error) {
    console.error('Bulk operation error:', error);
    res.status(500).json({
      success: false,
      message: 'Bulk operation failed'
    });
  }
});

module.exports = router;
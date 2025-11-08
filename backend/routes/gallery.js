const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const router = express.Router();

// Helper function to read images data
const getImagesData = async () => {
  try {
    const data = await fs.readJson('./data/images.json');
    return data.images || [];
  } catch (error) {
    return [];
  }
};

// Get all gallery images (public endpoint)
router.get('/all', async (req, res) => {
  try {
    const images = await getImagesData();
    const activeImages = images
      .filter(img => img.isActive)
      .map(img => ({
        id: img.id,
        title: img.title,
        description: img.description,
        category: img.category,
        image: img.imagePath,
        thumbnail: img.thumbnailPath || img.imagePath,
        alt: img.title || `${img.category} photography by Bobby Lohia`
      }));

    res.json({
      success: true,
      images: activeImages,
      count: activeImages.length
    });

  } catch (error) {
    console.error('Error fetching gallery images:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch gallery images'
    });
  }
});

// Get wildlife images
router.get('/wildlife', async (req, res) => {
  try {
    const images = await getImagesData();
    const wildlifeImages = images
      .filter(img => img.isActive && img.category.toLowerCase() === 'wildlife')
      .map(img => ({
        id: img.id,
        title: img.title,
        description: img.description,
        category: img.category,
        image: img.imagePath,
        thumbnail: img.thumbnailPath || img.imagePath,
        alt: img.title || `Wildlife photography by Bobby Lohia`
      }));

    res.json({
      success: true,
      images: wildlifeImages,
      count: wildlifeImages.length
    });

  } catch (error) {
    console.error('Error fetching wildlife images:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch wildlife images'
    });
  }
});

// Get landscape images
router.get('/landscape', async (req, res) => {
  try {
    const images = await getImagesData();
    const landscapeImages = images
      .filter(img => img.isActive && img.category.toLowerCase() === 'landscape')
      .map(img => ({
        id: img.id,
        title: img.title,
        description: img.description,
        category: img.category,
        image: img.imagePath,
        thumbnail: img.thumbnailPath || img.imagePath,
        alt: img.title || `Landscape photography by Bobby Lohia`
      }));

    res.json({
      success: true,
      images: landscapeImages,
      count: landscapeImages.length
    });

  } catch (error) {
    console.error('Error fetching landscape images:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch landscape images'
    });
  }
});

// Get images by category with pagination
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const images = await getImagesData();
    const categoryImages = images.filter(img => 
      img.isActive && 
      img.category.toLowerCase() === category.toLowerCase()
    );

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedImages = categoryImages
      .slice(startIndex, endIndex)
      .map(img => ({
        id: img.id,
        title: img.title,
        description: img.description,
        category: img.category,
        image: img.imagePath,
        thumbnail: img.thumbnailPath || img.imagePath,
        alt: img.title || `${img.category} photography by Bobby Lohia`
      }));

    res.json({
      success: true,
      images: paginatedImages,
      pagination: {
        currentPage: parseInt(page),
        totalImages: categoryImages.length,
        totalPages: Math.ceil(categoryImages.length / limit),
        hasNext: endIndex < categoryImages.length,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching category images:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch category images'
    });
  }
});

// Get featured images (first 12 images)
router.get('/featured', async (req, res) => {
  try {
    const images = await getImagesData();
    const featuredImages = images
      .filter(img => img.isActive)
      .slice(0, 12)
      .map(img => ({
        id: img.id,
        title: img.title,
        description: img.description,
        category: img.category,
        image: img.imagePath,
        thumbnail: img.thumbnailPath || img.imagePath,
        alt: img.title || `${img.category} photography by Bobby Lohia`
      }));

    res.json({
      success: true,
      images: featuredImages,
      count: featuredImages.length
    });

  } catch (error) {
    console.error('Error fetching featured images:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured images'
    });
  }
});

// Get gallery statistics
router.get('/stats', async (req, res) => {
  try {
    const images = await getImagesData();
    const activeImages = images.filter(img => img.isActive);
    
    const stats = {
      total: activeImages.length,
      wildlife: activeImages.filter(img => img.category.toLowerCase() === 'wildlife').length,
      landscape: activeImages.filter(img => img.category.toLowerCase() === 'landscape').length,
      recent: activeImages.filter(img => {
        const uploadDate = new Date(img.uploadDate);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return uploadDate > sevenDaysAgo;
      }).length
    };

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Error fetching gallery stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch gallery statistics'
    });
  }
});

module.exports = router;
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://bobbylohia.com/api' 
  : 'http://localhost:5000/api';

class ImageAPI {
  // Get all images for gallery display
  static async getGalleryImages() {
    try {
      const response = await fetch(`${API_BASE}/gallery/all`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        return data.images;
      } else {
        throw new Error(data.message || 'Failed to fetch images');
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      return [];
    }
  }

  // Get wildlife images
  static async getWildlifeImages() {
    try {
      const response = await fetch(`${API_BASE}/gallery/wildlife`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        return data.images;
      } else {
        throw new Error(data.message || 'Failed to fetch wildlife images');
      }
    } catch (error) {
      console.error('Error fetching wildlife images:', error);
      return [];
    }
  }

  // Get landscape images
  static async getLandscapeImages() {
    try {
      const response = await fetch(`${API_BASE}/gallery/landscape`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        return data.images;
      } else {
        throw new Error(data.message || 'Failed to fetch landscape images');
      }
    } catch (error) {
      console.error('Error fetching landscape images:', error);
      return [];
    }
  }

  // Get images by category with pagination
  static async getImagesByCategory(category, page = 1, limit = 20) {
    try {
      const response = await fetch(`${API_BASE}/gallery/category/${category}?page=${page}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        return {
          images: data.images,
          pagination: data.pagination
        };
      } else {
        throw new Error(data.message || 'Failed to fetch category images');
      }
    } catch (error) {
      console.error('Error fetching category images:', error);
      return { images: [], pagination: null };
    }
  }

  // Get featured images (for homepage)
  static async getFeaturedImages() {
    try {
      const response = await fetch(`${API_BASE}/gallery/featured`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        return data.images;
      } else {
        throw new Error(data.message || 'Failed to fetch featured images');
      }
    } catch (error) {
      console.error('Error fetching featured images:', error);
      return [];
    }
  }

  // Get gallery statistics
  static async getGalleryStats() {
    try {
      const response = await fetch(`${API_BASE}/gallery/stats`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        return data.stats;
      } else {
        throw new Error(data.message || 'Failed to fetch gallery stats');
      }
    } catch (error) {
      console.error('Error fetching gallery stats:', error);
      return { total: 0, wildlife: 0, landscape: 0, recent: 0 };
    }
  }

  // Convert image URLs for proper display
  static getImageUrl(imagePath) {
    if (!imagePath) return '';
    
    // If it's already a full URL, return as-is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Remove leading slash if present
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    
    // Always use localhost:5000 for development
    return `http://localhost:5000/${cleanPath}`;
  }
}

import { useState, useEffect } from 'react';

// Hook for React components to use the API
export const useImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const imageData = await ImageAPI.getGalleryImages();
      setImages(imageData);
    } catch (err) {
      setError(err.message);
      console.error('Error in useImages hook:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return { images, loading, error, refetch: fetchImages };
};

// Hook for category-specific images
export const useCategoryImages = (category) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let imageData;
      if (category === 'wildlife') {
        imageData = await ImageAPI.getWildlifeImages();
      } else if (category === 'landscape') {
        imageData = await ImageAPI.getLandscapeImages();
      } else {
        imageData = await ImageAPI.getGalleryImages();
      }
      
      setImages(imageData);
    } catch (err) {
      setError(err.message);
      console.error('Error in useCategoryImages hook:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [category]);

  return { images, loading, error, refetch: fetchImages };
};

export default ImageAPI;
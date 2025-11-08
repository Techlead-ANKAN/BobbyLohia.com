import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config/config.js';
import SEO from '../components/SEO';

const API_BASE = config.API_BASE;

const ProfessionalAdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [stats, setStats] = useState({ 
    total: 0, 
    wildlife: 0, 
    landscape: 0, 
    totalSize: 0,
    featured: 0
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [activeTab, setActiveTab] = useState('analytics');
  const [uploadFiles, setUploadFiles] = useState([]);
  const [bulkFormData, setBulkFormData] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [editingImage, setEditingImage] = useState(null);

  const navigate = useNavigate();

  // Professional v0.dev inspired styles
  const adminStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    .admin-root {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0a0a0a;
      color: #ffffff;
      min-height: 100vh;
      position: fixed;
      inset: 0;
      overflow: hidden;
      z-index: 50;
    }
    
    .layout-container {
      display: flex;
      height: 100vh;
      background: #0a0a0a;
    }
    
    .sidebar {
      width: 280px;
      background: linear-gradient(180deg, #111111 0%, #0d0d0d 100%);
      border-right: 1px solid #1f1f1f;
      display: flex;
      flex-direction: column;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      z-index: 10;
    }
    
    .sidebar.collapsed {
      width: 80px;
    }
    
    .sidebar-header {
      padding: 24px 20px;
      border-bottom: 1px solid #1f1f1f;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .logo-icon {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
    }
    
    .logo-text {
      font-size: 18px;
      font-weight: 700;
      color: #ffffff;
      opacity: 1;
      transition: opacity 0.3s ease;
    }
    
    .sidebar.collapsed .logo-text {
      opacity: 0;
      width: 0;
      overflow: hidden;
    }
    
    .sidebar-nav {
      flex: 1;
      padding: 24px 0;
      overflow-y: auto;
    }
    
    .nav-item {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 12px 20px;
      color: #a1a1aa;
      background: none;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 14px;
      font-weight: 500;
      text-align: left;
      gap: 12px;
    }
    
    .nav-item:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #ffffff;
    }
    
    .nav-item.active {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
      border-right: 2px solid #3b82f6;
    }
    
    .nav-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }
    
    .nav-text {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
    
    .sidebar.collapsed .nav-text {
      opacity: 0;
      width: 0;
      overflow: hidden;
    }
    
    .sidebar-footer {
      padding: 20px;
      border-top: 1px solid #1f1f1f;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #0a0a0a;
      overflow: hidden;
    }
    
    .top-bar {
      height: 72px;
      background: #111111;
      border-bottom: 1px solid #1f1f1f;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      position: relative;
      z-index: 5;
    }
    
    .top-bar-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .collapse-btn {
      width: 40px;
      height: 40px;
      background: transparent;
      border: 1px solid #1f1f1f;
      border-radius: 8px;
      color: #a1a1aa;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    
    .collapse-btn:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #ffffff;
    }
    
    .page-title {
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
    }
    
    .top-bar-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .content-area {
      flex: 1;
      padding: 32px;
      overflow-y: auto;
      background: linear-gradient(135deg, #0a0a0a 0%, #111111 100%);
    }
    
    .card {
      background: linear-gradient(145deg, #141414 0%, #111111 100%);
      border: 1px solid #1f1f1f;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
      transition: all 0.3s ease;
    }
    
    .card:hover {
      border-color: #2a2a2a;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }
    
    .stat-card {
      background: linear-gradient(145deg, #141414 0%, #0f0f0f 100%);
      border: 1px solid #1f1f1f;
      border-radius: 20px;
      padding: 32px;
      text-align: center;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
      border-radius: 20px 20px 0 0;
    }
    
    .stat-card:hover {
      transform: translateY(-4px);
      border-color: #2a2a2a;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    }
    
    .stat-icon {
      width: 64px;
      height: 64px;
      background: rgba(59, 130, 246, 0.1);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 28px;
    }
    
    .stat-value {
      font-size: 48px;
      font-weight: 800;
      background: linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }
    
    .stat-label {
      font-size: 16px;
      font-weight: 600;
      color: #a1a1aa;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: #ffffff;
      border: none;
      border-radius: 12px;
      padding: 14px 28px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(59, 130, 246, 0.4);
    }
    
    .btn-secondary {
      background: transparent;
      color: #a1a1aa;
      border: 1px solid #1f1f1f;
      border-radius: 12px;
      padding: 14px 28px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #ffffff;
      border-color: #2a2a2a;
    }
    
    .btn-danger {
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      color: #ffffff;
      border: none;
      border-radius: 12px;
      padding: 14px 28px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-danger:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(220, 38, 38, 0.4);
    }
    
    .input-field {
      background: #1a1a1a;
      border: 1px solid #2a2a2a;
      border-radius: 12px;
      padding: 16px;
      color: #ffffff;
      font-size: 14px;
      width: 100%;
      transition: all 0.3s ease;
      outline: none;
    }
    
    .input-field:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .upload-zone {
      border: 2px dashed #2a2a2a;
      border-radius: 20px;
      padding: 48px;
      text-align: center;
      background: linear-gradient(145deg, #0f0f0f 0%, #141414 100%);
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
    }
    
    .upload-zone:hover,
    .upload-zone.drag-over {
      border-color: #3b82f6;
      background: linear-gradient(145deg, rgba(59, 130, 246, 0.05) 0%, rgba(29, 78, 216, 0.05) 100%);
    }
    
    .file-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }
    
    .file-card {
      background: linear-gradient(145deg, #141414 0%, #111111 100%);
      border: 1px solid #1f1f1f;
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    .file-card:hover {
      transform: translateY(-4px);
      border-color: #2a2a2a;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
    }
    
    .file-card.selected {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
    }
    
    .file-preview {
      width: 100%;
      height: 200px;
      background: #0a0a0a;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    .file-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .file-info {
      padding: 20px;
    }
    
    .loading-spinner {
      width: 24px;
      height: 24px;
      border: 2px solid #2a2a2a;
      border-top: 2px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .fade-in {
      animation: fadeIn 0.5s ease-in-out;
    }
    
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    .checkbox {
      width: 20px;
      height: 20px;
      background: #1a1a1a;
      border: 2px solid #2a2a2a;
      border-radius: 4px;
      cursor: pointer;
      position: relative;
      transition: all 0.2s ease;
    }
    
    .checkbox.checked {
      background: #3b82f6;
      border-color: #3b82f6;
    }
    
    .checkbox.checked::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #ffffff;
      font-size: 12px;
      font-weight: 700;
    }
    
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .badge.featured {
      background: rgba(251, 191, 36, 0.1);
      color: #fbbf24;
      border: 1px solid rgba(251, 191, 36, 0.2);
    }
    
    .badge.wildlife {
      background: rgba(34, 197, 94, 0.1);
      color: #22c55e;
      border: 1px solid rgba(34, 197, 94, 0.2);
    }
    
    .badge.landscape {
      background: rgba(168, 85, 247, 0.1);
      color: #a855f7;
      border: 1px solid rgba(168, 85, 247, 0.2);
    }
    
    @media (max-width: 1024px) {
      .sidebar {
        position: fixed;
        z-index: 50;
        transform: translateX(-100%);
      }
      
      .sidebar.open {
        transform: translateX(0);
      }
      
      .main-content {
        margin-left: 0;
      }
    }
    
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
      padding: 20px;
    }
    
    .login-card {
      background: linear-gradient(145deg, #141414 0%, #111111 100%);
      border: 1px solid #1f1f1f;
      border-radius: 24px;
      padding: 48px;
      width: 100%;
      max-width: 480px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
    }
  `;

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchImages();
      fetchStats();
    }
  }, [isAuthenticated]);

  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE}/auth/verify`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setIsAuthenticated(true);
        fetchImages();
        fetchStats();
      } else {
        localStorage.removeItem('adminToken');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('adminToken');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        fetchImages();
        fetchStats();
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (error) {
      setLoginError('Connection error. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = {};
      
      // Only add Authorization header if we have a valid token
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_BASE}/images`, {
        headers: headers
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched images data:', data);
        // Handle both response formats: direct array or {images: array}
        const imageArray = Array.isArray(data) ? data : (data.images || []);
        setImages(imageArray);
      } else {
        console.error('Failed to fetch images, status:', response.status);
        setImages([]);
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
      setImages([]); // Ensure it's always an array
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/images/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Stats data:', data);
        // Handle response format
        const statsData = data.stats || data;
        
        // Get featured count from current images or calculate from API
        const imagesResponse = await fetch(`${API_BASE}/images`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (imagesResponse.ok) {
          const imagesData = await imagesResponse.json();
          const imageArray = Array.isArray(imagesData) ? imagesData : (imagesData.images || []);
          const featuredCount = imageArray.filter(img => img.featured === true).length;
          
          setStats({
            ...statsData,
            featured: featuredCount
          });
        } else {
          setStats(statsData);
        }
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      setStats({ total: 0, wildlife: 0, landscape: 0, totalSize: 0, featured: 0 });
    }
  };

  const handleFileSelect = (files) => {
    const newFiles = Array.from(files).map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      title: '',
      description: '',
      altText: '',
      category: 'landscape',
      featured: false
    }));
    
    setUploadFiles(prev => [...prev, ...newFiles]);
    setBulkFormData(prev => [...prev, ...newFiles]);
  };

  const handleBulkUpload = async () => {
    if (bulkFormData.length === 0) return;
    
    setUploading(true);
    const token = localStorage.getItem('adminToken');
    
    for (let i = 0; i < bulkFormData.length; i++) {
      const item = bulkFormData[i];
      const formData = new FormData();
      
      formData.append('images', item.file);
      formData.append('title', item.title || 'Untitled');
      formData.append('description', item.description || '');
      formData.append('altText', item.altText || item.title || 'Image');
      formData.append('category', item.category);
      formData.append('featured', item.featured);

      console.log(`Uploading file: ${item.file.name}`);
      console.log(`Category: ${item.category}`);
      console.log(`Title: ${item.title || 'Untitled'}`);

      try {
        setUploadProgress(prev => ({...prev, [item.id]: 50}));
        
        const response = await fetch(`${API_BASE}/images/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        });

        if (response.ok) {
          setUploadProgress(prev => ({...prev, [item.id]: 100}));
        } else {
          setUploadProgress(prev => ({...prev, [item.id]: 'error'}));
        }
      } catch (error) {
        setUploadProgress(prev => ({...prev, [item.id]: 'error'}));
      }
    }
    
    setTimeout(() => {
      setUploading(false);
      setUploadFiles([]);
      setBulkFormData([]);
      setUploadProgress({});
      fetchImages();
      fetchStats();
    }, 1000);
  };

  const updateFormData = (id, field, value) => {
    setBulkFormData(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeFile = (id) => {
    setUploadFiles(prev => prev.filter(item => item.id !== id));
    setBulkFormData(prev => prev.filter(item => item.id !== id));
  };

  const updateImageField = (imageId, field, value) => {
    setImages(prev => 
      prev.map(img => 
        img.id === imageId ? { ...img, [field]: value } : img
      )
    );
  };

  const saveImageChanges = async (imageId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const image = images.find(img => img.id === imageId);
      
      if (!image) return;

      const response = await fetch(`${API_BASE}/images/${imageId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: image.title,
          description: image.description,
          altText: image.altText,
          category: image.category,
          featured: image.featured
        })
      });
      
      if (response.ok) {
        setEditingImage(null);
        fetchImages();
        fetchStats();
        console.log('Image updated successfully');
      } else {
        console.error('Failed to update image:', response.status);
        alert('Failed to save changes');
      }
    } catch (error) {
      console.error('Failed to update image:', error);
      alert('Failed to save changes: ' + error.message);
    }
  };

  const toggleFeatured = async (imageId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const image = images.find(img => img.id === imageId);
      
      const response = await fetch(`${API_BASE}/images/${imageId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...image,
          featured: !image.featured
        })
      });
      
      if (response.ok) {
        fetchImages();
        fetchStats();
      }
    } catch (error) {
      console.error('Failed to update image:', error);
    }
  };

  const deleteImage = async (imageId) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/images/${imageId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        fetchImages();
        fetchStats();
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedImages.length === 0) return;
    
    const confirmMessage = `Are you sure you want to delete ${selectedImages.length} selected image(s)? This action cannot be undone.`;
    if (!confirm(confirmMessage)) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      
      // Delete images one by one
      for (const imageId of selectedImages) {
        await fetch(`${API_BASE}/images/${imageId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
      
      // Clear selection and refresh
      setSelectedImages([]);
      fetchImages();
      fetchStats();
    } catch (error) {
      console.error('Failed to delete images:', error);
      alert('Some images failed to delete. Please try again.');
    }
  };

  const handleBulkFeature = async () => {
    if (selectedImages.length === 0) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      
      // Feature/unfeature selected images
      for (const imageId of selectedImages) {
        const image = images.find(img => img.id === imageId);
        if (image) {
          await fetch(`${API_BASE}/images/${imageId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ...image,
              featured: !image.featured
            })
          });
        }
      }
      
      // Clear selection and refresh
      setSelectedImages([]);
      fetchImages();
      fetchStats();
    } catch (error) {
      console.error('Failed to update images:', error);
      alert('Some images failed to update. Please try again.');
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: adminStyles }} />
        <div className="admin-root">
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            <div style={{textAlign: 'center'}}>
              <div className="loading-spinner" style={{margin: '0 auto 20px'}}></div>
              <p style={{color: '#a1a1aa', fontSize: '16px'}}>Loading Admin Panel...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: adminStyles }} />
        <SEO title="Admin Login | Bobby Lohia Photography" />
        <div className="admin-root">
          <div className="login-container">
            <div className="login-card">
              <div style={{textAlign: 'center', marginBottom: '40px'}}>
                <div className="logo-icon" style={{margin: '0 auto 16px'}}>BL</div>
                <h1 style={{fontSize: '32px', fontWeight: '800', marginBottom: '8px'}}>Admin Panel</h1>
                <p style={{color: '#a1a1aa', fontSize: '16px'}}>Bobby Lohia Photography</p>
              </div>
              
              {loginError && (
                <div style={{
                  background: 'rgba(220, 38, 38, 0.1)',
                  border: '1px solid rgba(220, 38, 38, 0.2)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '24px',
                  color: '#fca5a5'
                }}>
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                <div>
                  <label style={{display: 'block', marginBottom: '8px', color: '#a1a1aa', fontSize: '14px', fontWeight: '500'}}>
                    Username
                  </label>
                  <input
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label style={{display: 'block', marginBottom: '8px', color: '#a1a1aa', fontSize: '14px', fontWeight: '500'}}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="input-field"
                    required
                  />
                </div>

                <button type="submit" className="btn-primary" style={{width: '100%', justifyContent: 'center'}}>
                  Sign In
                </button>
              </form>

              <button
                onClick={() => navigate('/')}
                className="btn-secondary"
                style={{width: '100%', marginTop: '20px', justifyContent: 'center'}}
              >
                ← Back to Website
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const getPageTitle = () => {
    switch(activeTab) {
      case 'analytics': return 'Analytics Dashboard';
      case 'upload': return 'Upload Images';
      case 'featured': return 'Featured Images';
      case 'manage': return 'Manage Images';
      default: return 'Dashboard';
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: adminStyles }} />
      <SEO title={`${getPageTitle()} | Admin Panel`} />
      <div className="admin-root">
        <div className="layout-container">
          {/* Sidebar */}
          <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
              <div className="logo">
                <div className="logo-icon">BL</div>
                <span className="logo-text">Admin Panel</span>
              </div>
            </div>
            
            <nav className="sidebar-nav">
              <button
                className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                <span className="nav-icon">📊</span>
                <span className="nav-text">Analytics</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'upload' ? 'active' : ''}`}
                onClick={() => setActiveTab('upload')}
              >
                <span className="nav-icon">📤</span>
                <span className="nav-text">Upload Images</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'featured' ? 'active' : ''}`}
                onClick={() => setActiveTab('featured')}
              >
                <span className="nav-icon">⭐</span>
                <span className="nav-text">Featured Images</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'manage' ? 'active' : ''}`}
                onClick={() => setActiveTab('manage')}
              >
                <span className="nav-icon">🖼️</span>
                <span className="nav-text">Manage Images</span>
              </button>
            </nav>
            
            <div className="sidebar-footer">
              <button onClick={() => navigate('/')} className="btn-secondary" style={{width: '100%'}}>
                🌐 View Website
              </button>
              <button onClick={handleLogout} className="btn-danger" style={{width: '100%'}}>
                🚪 Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <div className="top-bar">
              <div className="top-bar-left">
                <button 
                  className="collapse-btn"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  ☰
                </button>
                <h1 className="page-title">{getPageTitle()}</h1>
              </div>
              <div className="top-bar-right">
                <span style={{color: '#a1a1aa', fontSize: '14px'}}>
                  Welcome back, Admin
                </span>
              </div>
            </div>

            <div className="content-area fade-in">
              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon">📷</div>
                      <div className="stat-value">{stats.total}</div>
                      <div className="stat-label">Total Images</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">🦅</div>
                      <div className="stat-value">{stats.wildlife}</div>
                      <div className="stat-label">Wildlife</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">🏔️</div>
                      <div className="stat-value">{stats.landscape}</div>
                      <div className="stat-label">Landscape</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">⭐</div>
                      <div className="stat-value">{stats.featured}</div>
                      <div className="stat-label">Featured</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">💾</div>
                      <div className="stat-value" style={{fontSize: '32px'}}>{formatFileSize(stats.totalSize)}</div>
                      <div className="stat-label">Storage Used</div>
                    </div>
                  </div>
                  
                  <div className="card">
                    <h3 style={{fontSize: '20px', fontWeight: '700', marginBottom: '16px'}}>Portfolio Overview</h3>
                    <p style={{color: '#a1a1aa', lineHeight: '1.6'}}>
                      Your photography portfolio contains {stats.total} high-quality images showcasing the beauty of wildlife and landscapes. 
                      {stats.featured > 0 && ` ${stats.featured} images are currently featured on your homepage.`}
                    </p>
                  </div>
                </div>
              )}

              {/* Upload Tab */}
              {activeTab === 'upload' && (
                <div>
                  <div className="card" style={{marginBottom: '32px'}}>
                    <h3 style={{fontSize: '20px', fontWeight: '700', marginBottom: '24px'}}>Bulk Image Upload</h3>
                    
                    <div 
                      className="upload-zone"
                      onDrop={(e) => {
                        e.preventDefault();
                        handleFileSelect(e.dataTransfer.files);
                      }}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e.target.files)}
                        style={{display: 'none'}}
                        id="bulk-upload"
                      />
                      <label htmlFor="bulk-upload" style={{cursor: 'pointer', display: 'block'}}>
                        <div style={{fontSize: '64px', marginBottom: '20px'}}>📁</div>
                        <h4 style={{fontSize: '20px', fontWeight: '600', marginBottom: '8px'}}>
                          Drop files here or click to select
                        </h4>
                        <p style={{color: '#a1a1aa', fontSize: '16px'}}>
                          Support for multiple JPG, PNG files up to 10MB each
                        </p>
                      </label>
                    </div>
                  </div>

                  {uploadFiles.length > 0 && (
                    <div className="card">
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                        <h3 style={{fontSize: '20px', fontWeight: '700'}}>
                          Selected Files ({uploadFiles.length})
                        </h3>
                        <button 
                          className="btn-primary"
                          onClick={handleBulkUpload}
                          disabled={uploading}
                        >
                          {uploading ? 'Uploading...' : 'Upload All'}
                        </button>
                      </div>
                      
                      <div className="file-grid">
                        {uploadFiles.map((item) => (
                          <div key={item.id} className="file-card">
                            <div className="file-preview">
                              <img src={item.preview} alt={item.file.name} />
                            </div>
                            <div className="file-info">
                              <input
                                type="text"
                                placeholder="Image title..."
                                value={item.title}
                                onChange={(e) => updateFormData(item.id, 'title', e.target.value)}
                                className="input-field"
                                style={{marginBottom: '12px'}}
                              />
                              <textarea
                                placeholder="Description..."
                                value={item.description}
                                onChange={(e) => updateFormData(item.id, 'description', e.target.value)}
                                className="input-field"
                                rows="2"
                                style={{marginBottom: '12px', resize: 'vertical'}}
                              />
                              <input
                                type="text"
                                placeholder="Alt text..."
                                value={item.altText}
                                onChange={(e) => updateFormData(item.id, 'altText', e.target.value)}
                                className="input-field"
                                style={{marginBottom: '12px'}}
                              />
                              <div style={{display: 'flex', gap: '12px', marginBottom: '16px'}}>
                                <select
                                  value={item.category}
                                  onChange={(e) => updateFormData(item.id, 'category', e.target.value)}
                                  className="input-field"
                                  style={{flex: 1}}
                                >
                                  <option value="wildlife">🦅 Wildlife</option>
                                  <option value="landscape">🏔️ Landscape</option>
                                </select>
                                <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                                  <div 
                                    className={`checkbox ${item.featured ? 'checked' : ''}`}
                                    onClick={() => updateFormData(item.id, 'featured', !item.featured)}
                                  />
                                  <span style={{fontSize: '14px', fontWeight: '500'}}>Featured</span>
                                </label>
                              </div>
                              <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                                <button 
                                  onClick={() => removeFile(item.id)}
                                  className="btn-danger"
                                  style={{padding: '8px 16px', fontSize: '12px'}}
                                >
                                  Remove
                                </button>
                                {uploadProgress[item.id] && (
                                  <span style={{fontSize: '12px', color: '#a1a1aa'}}>
                                    {uploadProgress[item.id] === 'error' ? 'Error' : `${uploadProgress[item.id]}%`}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Featured Images Tab */}
              {activeTab === 'featured' && (
                <div>
                  <div className="card" style={{marginBottom: '32px'}}>
                    <h3 style={{fontSize: '20px', fontWeight: '700', marginBottom: '16px'}}>Featured Images</h3>
                    <p style={{color: '#a1a1aa', marginBottom: '24px'}}>
                      These images will appear in the "Featured Work" section of your homepage.
                    </p>
                  </div>
                  
                  {(images || []).filter(img => img.featured).length === 0 ? (
                    <div className="card" style={{textAlign: 'center', padding: '60px'}}>
                      <div style={{fontSize: '64px', marginBottom: '20px'}}>⭐</div>
                      <h3 style={{fontSize: '24px', fontWeight: '700', marginBottom: '12px'}}>No Featured Images</h3>
                      <p style={{color: '#a1a1aa', marginBottom: '24px'}}>Mark images as featured to showcase them on your homepage.</p>
                      <button 
                        onClick={() => setActiveTab('manage')}
                        className="btn-primary"
                      >
                        Manage Images
                      </button>
                    </div>
                  ) : (
                    <div className="file-grid">
                      {(images || []).filter(img => img.featured).map((image) => (
                        <div key={image.id} className="file-card">
                          <div className="file-preview">
                            <img 
                              src={`http://localhost:5000/uploads/${image.category}/${image.filename}`}
                              alt={image.altText || image.title || 'Featured image'}
                              onError={(e) => {
                                console.error('Featured image failed to load:', e.target.src);
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                          <div className="file-info">
                            <h4 style={{fontSize: '16px', fontWeight: '600', marginBottom: '8px'}}>
                              {image.title}
                            </h4>
                            <div style={{display: 'flex', gap: '8px', marginBottom: '12px'}}>
                              <span className={`badge ${image.category}`}>
                                {image.category === 'wildlife' ? '🦅' : '🏔️'} {image.category}
                              </span>
                              <span className="badge featured">⭐ Featured</span>
                            </div>
                            {image.description && (
                              <p style={{color: '#a1a1aa', fontSize: '14px', marginBottom: '16px'}}>
                                {image.description.length > 100 ? 
                                  image.description.substring(0, 100) + '...' : 
                                  image.description
                                }
                              </p>
                            )}
                            <div style={{display: 'flex', gap: '8px'}}>
                              <button 
                                onClick={() => toggleFeatured(image.id)}
                                className="btn-secondary"
                                style={{fontSize: '12px', padding: '8px 16px'}}
                              >
                                Remove Featured
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Manage Images Tab */}
              {activeTab === 'manage' && (
                <div>
                  <div className="card" style={{marginBottom: '32px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                      <h3 style={{fontSize: '20px', fontWeight: '700'}}>All Images ({(images || []).length})</h3>
                      <button 
                        onClick={() => setActiveTab('upload')}
                        className="btn-primary"
                      >
                        + Upload New
                      </button>
                    </div>
                    
                    {/* Bulk Selection Controls */}
                    {(images || []).length > 0 && (
                      <div style={{display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid #1f1f1f'}}>
                        <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                          <div 
                            className={`checkbox ${selectedImages.length === (images || []).length && (images || []).length > 0 ? 'checked' : ''}`}
                            onClick={() => {
                              if (selectedImages.length === (images || []).length) {
                                setSelectedImages([]);
                              } else {
                                setSelectedImages((images || []).map(img => img.id));
                              }
                            }}
                          />
                          <span style={{fontSize: '14px', fontWeight: '500'}}>
                            Select All ({selectedImages.length} selected)
                          </span>
                        </label>
                        
                        {selectedImages.length > 0 && (
                          <div style={{display: 'flex', gap: '12px'}}>
                            <button 
                              onClick={handleBulkDelete}
                              className="btn-danger"
                              style={{fontSize: '14px', padding: '8px 16px'}}
                            >
                              🗑️ Delete Selected ({selectedImages.length})
                            </button>
                            <button 
                              onClick={handleBulkFeature}
                              className="btn-secondary"
                              style={{fontSize: '14px', padding: '8px 16px'}}
                            >
                              ⭐ Feature Selected
                            </button>
                            <button 
                              onClick={() => setSelectedImages([])}
                              className="btn-secondary"
                              style={{fontSize: '14px', padding: '8px 16px'}}
                            >
                              Clear Selection
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {(images || []).length === 0 ? (
                    <div className="card" style={{textAlign: 'center', padding: '60px'}}>
                      <div style={{fontSize: '64px', marginBottom: '20px'}}>📷</div>
                      <h3 style={{fontSize: '24px', fontWeight: '700', marginBottom: '12px'}}>No Images</h3>
                      <p style={{color: '#a1a1aa', marginBottom: '24px'}}>Upload your first image to get started.</p>
                      <button 
                        onClick={() => setActiveTab('upload')}
                        className="btn-primary"
                      >
                        Upload Images
                      </button>
                    </div>
                  ) : (
                    <div className="file-grid">
                      {(images || []).map((image) => (
                        <div key={image.id} className={`file-card ${selectedImages.includes(image.id) ? 'selected' : ''}`} style={{position: 'relative'}}>
                          {/* Selection Checkbox */}
                          <div style={{position: 'absolute', top: '12px', left: '12px', zIndex: 10}}>
                            <div 
                              className={`checkbox ${selectedImages.includes(image.id) ? 'checked' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (selectedImages.includes(image.id)) {
                                  setSelectedImages(prev => prev.filter(id => id !== image.id));
                                } else {
                                  setSelectedImages(prev => [...prev, image.id]);
                                }
                              }}
                              style={{
                                background: selectedImages.includes(image.id) ? '#3b82f6' : 'rgba(0, 0, 0, 0.7)',
                                backdropFilter: 'blur(10px)',
                                border: selectedImages.includes(image.id) ? '2px solid #3b82f6' : '2px solid rgba(255, 255, 255, 0.3)'
                              }}
                            />
                          </div>
                          
                          <div className="file-preview">
                            <img 
                              src={`http://localhost:5000/uploads/${image.category}/${image.filename}`}
                              alt={image.altText || image.title || 'Image'}
                              onError={(e) => {
                                console.error('Image failed to load:', e.target.src);
                                e.target.src = '/images/placeholder.jpg'; // fallback
                              }}
                            />
                          </div>
                          <div className="file-info">
                            {editingImage === image.id ? (
                              // Edit Mode
                              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                                <input
                                  type="text"
                                  value={image.title || ''}
                                  onChange={(e) => updateImageField(image.id, 'title', e.target.value)}
                                  className="input-field"
                                  placeholder="Image title..."
                                  style={{fontSize: '14px', padding: '8px 12px'}}
                                />
                                <textarea
                                  value={image.description || ''}
                                  onChange={(e) => updateImageField(image.id, 'description', e.target.value)}
                                  className="input-field"
                                  placeholder="Description..."
                                  rows="3"
                                  style={{fontSize: '14px', padding: '8px 12px', resize: 'vertical'}}
                                />
                                <input
                                  type="text"
                                  value={image.altText || ''}
                                  onChange={(e) => updateImageField(image.id, 'altText', e.target.value)}
                                  className="input-field"
                                  placeholder="Alt text..."
                                  style={{fontSize: '14px', padding: '8px 12px'}}
                                />
                                <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                                  <select
                                    value={image.category}
                                    onChange={(e) => updateImageField(image.id, 'category', e.target.value)}
                                    className="input-field"
                                    style={{fontSize: '14px', padding: '8px 12px', flex: 1}}
                                  >
                                    <option value="wildlife">🦅 Wildlife</option>
                                    <option value="landscape">🏔️ Landscape</option>
                                  </select>
                                  <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                                    <div 
                                      className={`checkbox ${image.featured ? 'checked' : ''}`}
                                      onClick={() => updateImageField(image.id, 'featured', !image.featured)}
                                    />
                                    <span style={{fontSize: '14px', fontWeight: '500', color: '#a1a1aa'}}>Featured</span>
                                  </label>
                                </div>
                                <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                                  <button 
                                    onClick={() => saveImageChanges(image.id)}
                                    className="btn-primary"
                                    style={{fontSize: '12px', padding: '8px 16px'}}
                                  >
                                    Save Changes
                                  </button>
                                  <button 
                                    onClick={() => setEditingImage(null)}
                                    className="btn-secondary"
                                    style={{fontSize: '12px', padding: '8px 16px'}}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              // View Mode
                              <div>
                                <h4 style={{fontSize: '16px', fontWeight: '600', marginBottom: '8px'}}>
                                  {image.title || 'Untitled'}
                                </h4>
                                <div style={{display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap'}}>
                                  <span className={`badge ${image.category}`}>
                                    {image.category === 'wildlife' ? '🦅' : '🏔️'} {image.category}
                                  </span>
                                  {image.featured && <span className="badge featured">⭐ Featured</span>}
                                </div>
                                {image.description && (
                                  <p style={{color: '#a1a1aa', fontSize: '14px', marginBottom: '12px', lineHeight: '1.4'}}>
                                    {image.description.length > 100 ? 
                                      image.description.substring(0, 100) + '...' : 
                                      image.description
                                    }
                                  </p>
                                )}
                                <div style={{fontSize: '12px', color: '#666', marginBottom: '16px'}}>
                                  <div>Size: {formatFileSize(image.size)}</div>
                                  <div>Uploaded: {new Date(image.uploadDate).toLocaleDateString()}</div>
                                  {image.altText && <div>Alt: {image.altText}</div>}
                                </div>
                                <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                                  <button 
                                    onClick={() => setEditingImage(image.id)}
                                    className="btn-primary"
                                    style={{fontSize: '12px', padding: '8px 16px'}}
                                  >
                                    ✏️ Edit
                                  </button>
                                  <button 
                                    onClick={() => toggleFeatured(image.id)}
                                    className={image.featured ? "btn-secondary" : "btn-primary"}
                                    style={{fontSize: '12px', padding: '8px 16px'}}
                                  >
                                    {image.featured ? '⭐ Unfeature' : '⭐ Feature'}
                                  </button>
                                  <button 
                                    onClick={() => deleteImage(image.id)}
                                    className="btn-danger"
                                    style={{fontSize: '12px', padding: '8px 16px'}}
                                  >
                                    🗑️ Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalAdminPanel;
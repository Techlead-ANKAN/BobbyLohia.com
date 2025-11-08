import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://bobbylohia.com/api' 
  : 'http://localhost:5000/api';

const ModernAdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [stats, setStats] = useState({ 
    total: 0, 
    wildlife: 0, 
    landscape: 0, 
    totalSize: 0 
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [editingImage, setEditingImage] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    altText: '',
    category: 'wildlife',
    featured: false
  });

  const navigate = useNavigate();

  // Modern styles
  const adminStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes slideIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    .admin-container {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
      min-height: 100vh;
      color: #ffffff;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      z-index: 10000;
    }
    
    .admin-container * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    .sidebar {
      width: 280px;
      background: rgba(15, 15, 15, 0.95);
      backdrop-filter: blur(20px);
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
      transition: all 0.3s ease;
    }
    
    .main-content {
      margin-left: 280px;
      height: 100vh;
      overflow-y: auto;
      background: rgba(10, 10, 10, 0.8);
    }
    
    .card {
      background: rgba(20, 20, 20, 0.9);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 24px;
      transition: all 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      border: none;
      border-radius: 12px;
      padding: 12px 24px;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 14px;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
    }
    
    .btn-danger {
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      border: none;
      border-radius: 12px;
      padding: 12px 24px;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 14px;
    }
    
    .btn-danger:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(220, 38, 38, 0.4);
    }
    
    .input-field {
      background: rgba(30, 30, 30, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 14px 16px;
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
      border: 2px dashed rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      background: rgba(15, 15, 15, 0.5);
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .upload-zone:hover {
      border-color: #3b82f6;
      background: rgba(59, 130, 246, 0.05);
    }
    
    .stat-card {
      background: linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(20, 20, 20, 0.9) 100%);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 24px;
      text-align: center;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
    }
    
    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    .tab-button {
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      padding: 12px 24px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    
    .tab-button.active {
      background: rgba(59, 130, 246, 0.2);
      color: #3b82f6;
    }
    
    .tab-button:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.05);
    }
    
    @media (max-width: 1024px) {
      .sidebar {
        width: 240px;
      }
      .main-content {
        margin-left: 240px;
      }
    }
    
    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
        width: 280px;
      }
      .main-content {
        margin-left: 0;
      }
      .sidebar.open {
        transform: translateX(0);
      }
    }
  `;

  // Check authentication on component mount
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
        headers: {
          'Content-Type': 'application/json',
        },
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
      console.error('Login error:', error);
      setLoginError('Connection error. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setImages([]);
    setStats({ total: 0, wildlife: 0, landscape: 0, totalSize: 0 });
  };

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/images`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/images/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    
    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    
    // Add the file
    formData.append('images', files[0]);
    
    // Add form data
    formData.append('title', uploadForm.title || 'Untitled');
    formData.append('description', uploadForm.description || '');
    formData.append('altText', uploadForm.altText || uploadForm.title || 'Image');
    formData.append('category', uploadForm.category);
    formData.append('featured', uploadForm.featured);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/images/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        await fetchImages();
        await fetchStats();
        
        // Reset form
        setUploadForm({
          title: '',
          description: '',
          altText: '',
          category: 'wildlife',
          featured: false
        });
        
        // Reset file input
        const fileInput = document.getElementById('file-upload');
        if (fileInput) fileInput.value = '';
      } else {
        const errorData = await response.json();
        alert('Upload failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const deleteImage = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/images/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        fetchImages();
        fetchStats();
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: adminStyles }} />
        <div className="admin-container" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(59, 130, 246, 0.3)',
              borderTop: '3px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <p style={{fontSize: '18px', fontWeight: '500'}}>Loading Admin Panel...</p>
          </div>
        </div>
      </>
    );
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: adminStyles }} />
        <SEO 
          title="Admin Login | Bobby Lohia Photography"
          description="Administrative login for Bobby Lohia Photography website management."
        />
        <div className="admin-container" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="card" style={{width: '100%', maxWidth: '400px', textAlign: 'center'}}>
            <h1 style={{fontSize: '28px', fontWeight: '700', marginBottom: '8px', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Admin Panel
            </h1>
            <p style={{color: 'rgba(255, 255, 255, 0.6)', marginBottom: '32px'}}>
              Bobby Lohia Photography
            </p>
            
            {loginError && (
              <div style={{
                background: 'rgba(220, 38, 38, 0.1)', 
                border: '1px solid rgba(220, 38, 38, 0.3)',
                color: '#fca5a5', 
                padding: '12px', 
                borderRadius: '12px', 
                marginBottom: '24px',
                fontSize: '14px'
              }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} style={{textAlign: 'left'}}>
              <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.8)'}}>
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

              <div style={{marginBottom: '24px'}}>
                <label style={{display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.8)'}}>
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

              <button type="submit" className="btn-primary" style={{width: '100%', marginBottom: '20px'}}>
                Sign In
              </button>
            </form>

            <button
              onClick={() => navigate('/')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.6)',
                cursor: 'pointer',
                fontSize: '14px',
                textDecoration: 'underline'
              }}
            >
              ← Back to Website
            </button>
          </div>
        </div>
      </>
    );
  }

  // Main admin dashboard
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: adminStyles }} />
      <SEO 
        title="Admin Dashboard | Bobby Lohia Photography"
        description="Administrative dashboard for managing Bobby Lohia Photography website content."
      />
      <div className="admin-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div style={{padding: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>
            <h1 style={{fontSize: '20px', fontWeight: '700', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0}}>
              Admin Dashboard
            </h1>
            <p style={{color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px', marginTop: '4px'}}>
              Bobby Lohia Photography
            </p>
          </div>
          
          <nav style={{padding: '20px'}}>
            <button
              className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
              style={{width: '100%', textAlign: 'left', marginBottom: '8px'}}
            >
              📊 Dashboard
            </button>
            <button
              className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveTab('upload')}
              style={{width: '100%', textAlign: 'left', marginBottom: '8px'}}
            >
              📤 Upload Images
            </button>
            <button
              className={`tab-button ${activeTab === 'manage' ? 'active' : ''}`}
              onClick={() => setActiveTab('manage')}
              style={{width: '100%', textAlign: 'left', marginBottom: '8px'}}
            >
              🖼️ Manage Images
            </button>
          </nav>
          
          <div style={{position: 'absolute', bottom: '20px', left: '20px', right: '20px'}}>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
              style={{width: '100%', marginBottom: '12px'}}
            >
              🌐 View Website
            </button>
            <button
              onClick={handleLogout}
              className="btn-danger"
              style={{width: '100%'}}
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div style={{padding: '40px'}}>
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div style={{animation: 'slideIn 0.5s ease'}}>
                <h2 style={{fontSize: '32px', fontWeight: '700', marginBottom: '32px', background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                  Analytics Overview
                </h2>
                
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px'}}>
                  <div className="stat-card">
                    <div style={{fontSize: '48px', marginBottom: '12px'}}>📷</div>
                    <h3 style={{fontSize: '36px', fontWeight: '700', color: '#3b82f6', marginBottom: '8px'}}>{stats.total}</h3>
                    <p style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px', fontWeight: '500'}}>Total Images</p>
                  </div>
                  
                  <div className="stat-card">
                    <div style={{fontSize: '48px', marginBottom: '12px'}}>🦅</div>
                    <h3 style={{fontSize: '36px', fontWeight: '700', color: '#10b981', marginBottom: '8px'}}>{stats.wildlife}</h3>
                    <p style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px', fontWeight: '500'}}>Wildlife Photos</p>
                  </div>
                  
                  <div className="stat-card">
                    <div style={{fontSize: '48px', marginBottom: '12px'}}>🏔️</div>
                    <h3 style={{fontSize: '36px', fontWeight: '700', color: '#f59e0b', marginBottom: '8px'}}>{stats.landscape}</h3>
                    <p style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px', fontWeight: '500'}}>Landscape Photos</p>
                  </div>
                  
                  <div className="stat-card">
                    <div style={{fontSize: '48px', marginBottom: '12px'}}>💾</div>
                    <h3 style={{fontSize: '36px', fontWeight: '700', color: '#8b5cf6', marginBottom: '8px'}}>{formatFileSize(stats.totalSize)}</h3>
                    <p style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px', fontWeight: '500'}}>Total Storage</p>
                  </div>
                </div>
                
                <div className="card">
                  <h3 style={{fontSize: '24px', fontWeight: '600', marginBottom: '20px'}}>Recent Activity</h3>
                  <p style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                    Your photography portfolio is growing! You have {stats.total} images showcasing the beauty of nature across {stats.wildlife + stats.landscape} different captures.
                  </p>
                </div>
              </div>
            )}

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div style={{animation: 'slideIn 0.5s ease'}}>
                <h2 style={{fontSize: '32px', fontWeight: '700', marginBottom: '32px', background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                  Upload New Images
                </h2>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px'}}>
                  {/* Upload Form */}
                  <div className="card">
                    <h3 style={{fontSize: '20px', fontWeight: '600', marginBottom: '24px'}}>Image Details</h3>
                    
                    <div style={{display: 'grid', gap: '20px'}}>
                      <div>
                        <label style={{display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.8)'}}>
                          Title
                        </label>
                        <input
                          type="text"
                          value={uploadForm.title}
                          onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                          className="input-field"
                          placeholder="Enter image title..."
                        />
                      </div>
                      
                      <div>
                        <label style={{display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.8)'}}>
                          Description
                        </label>
                        <textarea
                          value={uploadForm.description}
                          onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                          className="input-field"
                          rows="3"
                          placeholder="Describe your image..."
                          style={{resize: 'vertical', minHeight: '80px'}}
                        />
                      </div>
                      
                      <div>
                        <label style={{display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.8)'}}>
                          Alt Text
                        </label>
                        <input
                          type="text"
                          value={uploadForm.altText}
                          onChange={(e) => setUploadForm({...uploadForm, altText: e.target.value})}
                          className="input-field"
                          placeholder="Alt text for accessibility..."
                        />
                      </div>
                      
                      <div style={{display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', alignItems: 'end'}}>
                        <div>
                          <label style={{display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: 'rgba(255, 255, 255, 0.8)'}}>
                            Category *
                          </label>
                          <select
                            value={uploadForm.category}
                            onChange={(e) => setUploadForm({...uploadForm, category: e.target.value})}
                            className="input-field"
                          >
                            <option value="wildlife">🦅 Wildlife</option>
                            <option value="landscape">🏔️ Landscape</option>
                          </select>
                        </div>
                        
                        <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '14px 0'}}>
                          <input
                            type="checkbox"
                            checked={uploadForm.featured}
                            onChange={(e) => setUploadForm({...uploadForm, featured: e.target.checked})}
                            style={{width: '18px', height: '18px'}}
                          />
                          <span style={{fontSize: '14px', fontWeight: '500'}}>⭐ Featured</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* File Upload */}
                  <div className="card">
                    <h3 style={{fontSize: '20px', fontWeight: '600', marginBottom: '24px'}}>Select Image *</h3>
                    
                    <div className="upload-zone">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        style={{display: 'none'}}
                        id="file-upload"
                        disabled={uploading}
                      />
                      <label htmlFor="file-upload" style={{cursor: uploading ? 'not-allowed' : 'pointer', display: 'block'}}>
                        {uploading ? (
                          <div>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              border: '3px solid rgba(59, 130, 246, 0.3)',
                              borderTop: '3px solid #3b82f6',
                              borderRadius: '50%',
                              animation: 'spin 1s linear infinite',
                              margin: '0 auto 16px'
                            }}></div>
                            <p style={{fontSize: '16px', fontWeight: '500', marginBottom: '8px'}}>Uploading...</p>
                            <p style={{fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)'}}>{uploadProgress}%</p>
                          </div>
                        ) : (
                          <div>
                            <div style={{fontSize: '48px', marginBottom: '16px'}}>📁</div>
                            <p style={{fontSize: '16px', fontWeight: '500', marginBottom: '8px'}}>Click to select image</p>
                            <p style={{fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)'}}>PNG, JPG, JPEG up to 10MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                    
                    <p style={{fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '16px', textAlign: 'center'}}>
                      * Only image file is mandatory for upload
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Manage Images Tab */}
            {activeTab === 'manage' && (
              <div style={{animation: 'slideIn 0.5s ease'}}>
                <h2 style={{fontSize: '32px', fontWeight: '700', marginBottom: '32px', background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                  Manage Images
                </h2>
                
                {images.length === 0 ? (
                  <div className="card" style={{textAlign: 'center', padding: '60px'}}>
                    <div style={{fontSize: '64px', marginBottom: '20px', opacity: '0.5'}}>📷</div>
                    <h3 style={{fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: 'rgba(255, 255, 255, 0.7)'}}>No Images Yet</h3>
                    <p style={{color: 'rgba(255, 255, 255, 0.5)', marginBottom: '24px'}}>Upload your first image to get started</p>
                    <button 
                      onClick={() => setActiveTab('upload')} 
                      className="btn-primary"
                    >
                      Upload First Image
                    </button>
                  </div>
                ) : (
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px'}}>
                    {images.map((image) => (
                      <div key={image.id} className="card">
                        <div style={{
                          width: '100%', 
                          height: '200px', 
                          borderRadius: '12px', 
                          overflow: 'hidden', 
                          marginBottom: '16px',
                          background: 'rgba(30, 30, 30, 0.5)'
                        }}>
                          <img 
                            src={`http://localhost:5000/uploads/${image.category}/${image.image}`}
                            alt={image.altText || image.title}
                            style={{
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                        
                        <div style={{marginBottom: '12px'}}>
                          <h4 style={{fontSize: '16px', fontWeight: '600', marginBottom: '4px'}}>
                            {image.title || 'Untitled'}
                            {image.featured && <span style={{marginLeft: '8px'}}>⭐</span>}
                          </h4>
                          <p style={{fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px'}}>
                            {image.category === 'wildlife' ? '🦅 Wildlife' : '🏔️ Landscape'}
                          </p>
                          {image.description && (
                            <p style={{fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.4'}}>
                              {image.description.length > 100 ? image.description.substring(0, 100) + '...' : image.description}
                            </p>
                          )}
                        </div>
                        
                        <div style={{display: 'flex', gap: '8px'}}>
                          <button 
                            onClick={() => deleteImage(image.id)}
                            className="btn-danger"
                            style={{fontSize: '12px', padding: '8px 12px'}}
                          >
                            Delete
                          </button>
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
    </>
  );
};

export default ModernAdminPanel;
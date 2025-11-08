import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

// Admin Panel specific styles to override website styles
const adminStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .admin-panel-container {
    all: initial;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.5;
    color: #ffffff;
    background: #000000;
    min-height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    overflow-y: auto;
  }
  
  .admin-panel-container * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  .admin-panel-container h1,
  .admin-panel-container h2,
  .admin-panel-container h3 {
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 1rem;
  }
  
  .admin-panel-container p,
  .admin-panel-container span,
  .admin-panel-container div {
    color: #ffffff;
  }
  
  .admin-panel-container input,
  .admin-panel-container select,
  .admin-panel-container button {
    font-family: inherit;
    font-size: 14px;
  }
`;

const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://bobbylohia.com/api' 
  : 'http://localhost:5000/api';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [stats, setStats] = useState({ total: 0, wildlife: 0, landscape: 0 });
  const [selectedImages, setSelectedImages] = useState([]);
  const [editingImage, setEditingImage] = useState(null);
  const navigate = useNavigate();

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
    }
    setIsLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        fetchImages();
        fetchStats();
      } else {
        setLoginError(data.message);
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setImages([]);
    setStats({ total: 0, wildlife: 0, landscape: 0 });
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
        setImages(data.images || []);
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/gallery/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleFileUpload = async (files, category = 'landscape') => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      
      Array.from(files).forEach(file => {
        formData.append('images', file);
      });
      formData.append('category', category);

      const response = await fetch(`${API_BASE}/images/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Successfully uploaded ${data.images.length} image(s)!`);
        fetchImages();
        fetchStats();
      } else {
        const errorData = await response.json();
        alert('Upload failed: ' + errorData.message);
      }
    } catch (error) {
      alert('Upload failed: ' + error.message);
    }

    setUploading(false);
    setUploadProgress(0);
  };

  const handleImageDelete = async (imageId) => {
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
        alert('Image deleted successfully!');
        fetchImages();
        fetchStats();
      } else {
        const errorData = await response.json();
        alert('Delete failed: ' + errorData.message);
      }
    } catch (error) {
      alert('Delete failed: ' + error.message);
    }
  };

  const handleImageEdit = async (imageData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/images/${imageData.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(imageData)
      });

      if (response.ok) {
        alert('Image updated successfully!');
        setEditingImage(null);
        fetchImages();
      } else {
        const errorData = await response.json();
        alert('Update failed: ' + errorData.message);
      }
    } catch (error) {
      alert('Update failed: ' + error.message);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedImages.length === 0) {
      alert('Please select images to delete');
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${selectedImages.length} image(s)?`)) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/images/bulk`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'delete',
          imageIds: selectedImages
        })
      });

      if (response.ok) {
        alert('Images deleted successfully!');
        setSelectedImages([]);
        fetchImages();
        fetchStats();
      } else {
        const errorData = await response.json();
        alert('Bulk delete failed: ' + errorData.message);
      }
    } catch (error) {
      alert('Bulk delete failed: ' + error.message);
    }
  };

  if (isLoading) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: adminStyles }} />
        <div className="admin-panel-container" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{fontSize: '20px', fontWeight: '600'}}>Loading...</div>
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: adminStyles }} />
        <SEO 
          title="Admin Login | Bobby Lohia Photography"
          description="Administrative login for Bobby Lohia Photography website management."
        />
        <div className="admin-panel-container" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{
            background: '#1f2937', 
            padding: '2rem', 
            borderRadius: '8px', 
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', 
            width: '100%', 
            maxWidth: '28rem'
          }}>
            <h1 style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center', color: '#ffffff'}}>Admin Login</h1>
            
            {loginError && (
              <div style={{
                background: '#dc2626', 
                color: '#ffffff', 
                padding: '0.75rem', 
                borderRadius: '6px', 
                marginBottom: '1rem'
              }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <div>
                <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#ffffff'}}>Username</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  style={{
                    width: '100%', 
                    padding: '0.75rem', 
                    background: '#374151', 
                    border: '1px solid #4b5563', 
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#ffffff'}}>Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  style={{
                    width: '100%', 
                    padding: '0.75rem', 
                    background: '#374151', 
                    border: '1px solid #4b5563', 
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%', 
                  background: '#2563eb', 
                  color: '#ffffff', 
                  fontWeight: '700', 
                  padding: '0.75rem 1rem', 
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
                onMouseOut={(e) => e.target.style.background = '#2563eb'}
              >
                Login
              </button>
            </form>

            <div style={{marginTop: '1.5rem', textAlign: 'center'}}>
              <button
                onClick={() => navigate('/')}
                style={{
                  color: '#60a5fa', 
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseOver={(e) => e.target.style.color = '#93c5fd'}
                onMouseOut={(e) => e.target.style.color = '#60a5fa'}
              >
                ← Back to Website
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: adminStyles }} />
      <SEO 
        title="Admin Panel | Bobby Lohia Photography"
        description="Administrative panel for managing Bobby Lohia Photography website content."
      />
      <div className="admin-panel-container">
        {/* Header */}
        <header style={{
          background: '#1f2937', 
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid #374151'
        }}>
          <div style={{
            maxWidth: '80rem', 
            margin: '0 auto', 
            padding: '1rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}>
            <h1 style={{fontSize: '1.5rem', fontWeight: '700', color: '#ffffff', margin: 0}}>Admin Panel</h1>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <button
                onClick={() => navigate('/')}
                style={{
                  background: '#374151', 
                  color: '#ffffff', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseOver={(e) => e.target.style.background = '#4b5563'}
                onMouseOut={(e) => e.target.style.background = '#374151'}
              >
                View Website
              </button>
              <button
                onClick={handleLogout}
                style={{
                  background: '#dc2626', 
                  color: '#ffffff', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseOver={(e) => e.target.style.background = '#b91c1c'}
                onMouseOut={(e) => e.target.style.background = '#dc2626'}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <div style={{maxWidth: '80rem', margin: '0 auto', padding: '2rem 1rem'}}>
          {/* Stats Dashboard */}
          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1.5rem', 
            marginBottom: '2rem'
          }}>
            <div style={{background: '#1f2937', padding: '1.5rem', borderRadius: '8px'}}>
              <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffffff'}}>Total Images</h3>
              <p style={{fontSize: '1.875rem', fontWeight: '700', color: '#60a5fa'}}>{stats.total}</p>
            </div>
            <div style={{background: '#1f2937', padding: '1.5rem', borderRadius: '8px'}}>
              <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffffff'}}>Wildlife</h3>
              <p style={{fontSize: '1.875rem', fontWeight: '700', color: '#34d399'}}>{stats.wildlife}</p>
            </div>
            <div style={{background: '#1f2937', padding: '1.5rem', borderRadius: '8px'}}>
              <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffffff'}}>Landscape</h3>
              <p style={{fontSize: '1.875rem', fontWeight: '700', color: '#fbbf24'}}>{stats.landscape}</p>
            </div>
          </div>

          {/* Upload Section */}
          <div style={{background: '#1f2937', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem'}}>
            <h2 style={{fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#ffffff'}}>Upload Images</h2>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem'}}>
              <div>
                <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#ffffff'}}>Category</label>
                <select 
                  id="category-select"
                  style={{
                    width: '100%', 
                    padding: '0.75rem', 
                    background: '#374151', 
                    border: '1px solid #4b5563', 
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontSize: '14px'
                  }}
                >
                  <option value="wildlife">Wildlife</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            </div>

            <div style={{
              border: '2px dashed #4b5563', 
              padding: '2rem', 
              textAlign: 'center', 
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const category = document.getElementById('category-select').value;
                  handleFileUpload(e.target.files, category);
                }}
                style={{display: 'none'}}
                id="file-upload"
                disabled={uploading}
              />
              <label 
                htmlFor="file-upload" 
                style={{
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  opacity: uploading ? '0.5' : '1'
                }}
              >
                <div style={{color: '#9ca3af'}}>
                  {uploading ? (
                    <div>
                      <div style={{
                        width: '2rem',
                        height: '2rem',
                        border: '2px solid #3b82f6',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 0.5rem auto'
                      }}></div>
                      <p style={{margin: 0, color: '#ffffff'}}>Uploading... {uploadProgress}%</p>
                    </div>
                  ) : (
                    <div>
                      <svg 
                        style={{
                          width: '3rem', 
                          height: '3rem', 
                          margin: '0 auto 0.5rem auto',
                          display: 'block'
                        }} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 48 48"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                      </svg>
                      <p style={{margin: '0 0 0.25rem 0', color: '#ffffff', fontSize: '16px'}}>Click to select images or drag and drop</p>
                      <p style={{margin: 0, fontSize: '0.875rem', color: '#9ca3af'}}>PNG, JPG, JPEG up to 10MB each</p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Image Management */}
          <div style={{background: '#1f2937', padding: '1.5rem', borderRadius: '8px'}}>
            <div style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '1rem'
            }}>
              <h2 style={{fontSize: '1.25rem', fontWeight: '700', color: '#ffffff', margin: 0}}>Manage Images</h2>
              {selectedImages.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  style={{
                    background: '#dc2626', 
                    color: '#ffffff', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#b91c1c'}
                  onMouseOut={(e) => e.target.style.background = '#dc2626'}
                >
                  Delete Selected ({selectedImages.length})
                </button>
              )}
            </div>

            {images.length === 0 ? (
              <p style={{color: '#9ca3af', textAlign: 'center', padding: '2rem 0', margin: 0}}>No images uploaded yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {images.map(image => (
                  <div key={image.id} className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="relative">
                      <img 
                        src={`${API_BASE.replace('/api', '')}${image.thumbnailPath || image.imagePath}`}
                        alt={image.title || image.filename}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = `${API_BASE.replace('/api', '')}${image.imagePath}`;
                        }}
                      />
                      <div className="absolute top-2 left-2">
                        <input
                          type="checkbox"
                          checked={selectedImages.includes(image.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedImages([...selectedImages, image.id]);
                            } else {
                              setSelectedImages(selectedImages.filter(id => id !== image.id));
                            }
                          }}
                          className="w-4 h-4"
                        />
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 text-xs rounded ${
                          image.category.toLowerCase() === 'wildlife' 
                            ? 'bg-green-600' 
                            : 'bg-yellow-600'
                        }`}>
                          {image.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-medium mb-1 truncate">
                        {image.title || 'Untitled'}
                      </h4>
                      <p className="text-sm text-gray-400 mb-2 truncate">
                        {image.description || 'No description'}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        {new Date(image.uploadDate).toLocaleDateString()}
                      </p>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingImage(image)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs py-2 px-3 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleImageDelete(image.id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-xs py-2 px-3 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {editingImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Edit Image</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={editingImage.title || ''}
                    onChange={(e) => setEditingImage({...editingImage, title: e.target.value})}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={editingImage.description || ''}
                    onChange={(e) => setEditingImage({...editingImage, description: e.target.value})}
                    rows={3}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={editingImage.category || 'landscape'}
                    onChange={(e) => setEditingImage({...editingImage, category: e.target.value})}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:border-blue-500 focus:outline-none"
                  >
                    <option value="wildlife">Wildlife</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => handleImageEdit(editingImage)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingImage(null)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPanel;
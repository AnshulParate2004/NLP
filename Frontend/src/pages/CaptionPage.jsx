import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Sparkles, X, AlertCircle, Wand2 } from 'lucide-react';

const CaptionPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  
  const fileInputRef = useRef(null);

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setError('');
      setCaption('');
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please provide a valid image file.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError('');
    setCaption('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/caption`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Server error');
      }

      const data = await response.json();
      setCaption(data.caption);
    } catch (err) {
      setError('Error generating caption: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setCaption('');
    setError('');
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Image <span className="gradient-text">Captioner</span></h1>
        <p className="subtitle">Transform visuals into intelligent descriptions</p>
      </header>

      <main className="caption-content">
        <AnimatePresence mode="wait">
          {!imagePreview ? (
            <motion.div 
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`upload-zone ${isDragOver ? 'drag-over' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="upload-icon-wrapper">
                <UploadCloud size={48} className="upload-icon" />
              </div>
              <h3>Choose an image</h3>
              <p>Drag and drop or click to browse</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => processFile(e.target.files[0])}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
            </motion.div>
          ) : (
            <motion.div 
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="preview-section"
            >
              <div className="image-card">
                <img src={imagePreview} alt="Preview" />
                <button className="remove-btn" onClick={resetForm}><X size={18} /></button>
              </div>

              {!caption && (
                <button 
                  className={`action-btn ${loading ? 'loading' : ''}`}
                  onClick={handleSubmit} 
                  disabled={loading}
                >
                  {loading ? <span className="pulse">Analysing...</span> : 'Generate Caption'}
                </button>
              )}

              {caption && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="result-box"
                >
                  <h4>Result</h4>
                  <p>"{caption}"</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="error-box">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default CaptionPage;

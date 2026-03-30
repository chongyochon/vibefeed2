import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPost, CATEGORIES } from '../lib/storage';
import { ImagePlus, X } from 'lucide-react';
import ThemeToggle from '../components/ui/ThemeToggle';

export default function Write() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [image, setImage] = useState(''); // Base64

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addPost({
      title,
      content,
      category,
      image
    });

    navigate('/'); // Go back to feed
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'var(--surface-color)', minHeight: '100%' }}>
      <header style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>New Post</h1>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <ThemeToggle />
          <button 
            type="button"
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            Cancel
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              fontSize: '16px',
              fontFamily: 'inherit',
              backgroundColor: 'var(--bg-color)'
            }}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Title</label>
          <input 
            type="text" 
            placeholder="What's this about?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              fontSize: '16px',
              fontFamily: 'inherit'
            }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Content</label>
          <textarea 
            placeholder="Share your progress or ask a question..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              fontSize: '16px',
              minHeight: '120px',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Image (Optional)</label>
          
          {image ? (
            <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={image} alt="Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', display: 'block' }} />
              <button 
                type="button"
                onClick={() => setImage('')}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed var(--border-color)',
                borderRadius: '8px',
                padding: '32px',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                backgroundColor: 'var(--bg-color)'
              }}
            >
              <ImagePlus size={32} style={{ margin: '0 auto 8px auto', display: 'block' }} />
              <div style={{ fontSize: '14px' }}>Click to upload an image</div>
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            style={{ display: 'none' }} 
          />
        </div>

        <button 
          type="submit"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '12px',
            boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)'
          }}
        >
          Post Update
        </button>

      </form>
    </div>
  );
}

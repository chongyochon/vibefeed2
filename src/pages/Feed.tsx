import { useState, useEffect } from 'react';
import { getPosts, toggleLike, CATEGORIES } from '../lib/storage';
import type { Post } from '../lib/storage';
import PostCard from '../components/ui/PostCard';
import Tag from '../components/ui/Tag';

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  const handleLike = (id: string) => {
    const updated = toggleLike(id);
    setPosts(updated);
  };

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  return (
    <div style={{ padding: '0 0 20px 0' }}>
      <header style={{ 
        padding: '16px 20px', 
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--primary)', fontFamily: 'Outfit, Inter, sans-serif' }}>VibeFeed</h1>
        
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          overflowX: 'auto', 
          marginTop: '16px',
          paddingBottom: '4px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          <Tag 
            label="All" 
            isActive={selectedCategory === 'All'} 
            onClick={() => setSelectedCategory('All')} 
          />
          {CATEGORIES.map(cat => (
            <Tag 
              key={cat} 
              label={cat} 
              isActive={selectedCategory === cat} 
              onClick={() => setSelectedCategory(cat)} 
            />
          ))}
        </div>
      </header>

      <div style={{ padding: '20px' }}>
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px' }}>
            No posts found in this category.
          </div>
        ) : (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} onLike={handleLike} />
          ))
        )}
      </div>
    </div>
  );
}

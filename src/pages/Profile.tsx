import { useState, useEffect } from 'react';
import { getPosts, toggleLike } from '../lib/storage';
import type { Post } from '../lib/storage';
import PostCard from '../components/ui/PostCard';

export default function Profile() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Only fetch posts by "My Profile"
    const allPosts = getPosts();
    setPosts(allPosts.filter(p => p.authorName === 'My Profile'));
  }, []);

  const handleLike = (id: string) => {
    // We update all posts in local config and then refilter
    toggleLike(id);
    const allPosts = getPosts();
    setPosts(allPosts.filter(p => p.authorName === 'My Profile'));
  };

  return (
    <div>
      <div style={{ 
        backgroundColor: 'var(--surface-color)', 
        padding: '32px 20px', 
        textAlign: 'center',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <img 
          src="https://ui-avatars.com/api/?name=My+Profile&background=9C27B0&color=fff&size=100" 
          alt="My Profile" 
          style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '16px', objectFit: 'cover' }} 
        />
        <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px 0' }}>My Profile</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>
          WIV Buildathon Participant
        </p>
      </div>

      <div style={{ padding: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>My Posts ({posts.length})</h2>
        
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px' }}>
            You haven't posted anything yet.
          </div>
        ) : (
          posts.map(post => (
            <PostCard key={post.id} post={post} onLike={handleLike} />
          ))
        )}
      </div>
    </div>
  );
}

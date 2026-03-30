import { Heart } from 'lucide-react';
import Tag from './Tag';
import type { Post } from '../../lib/storage';

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
}

export default function PostCard({ post, onLike }: PostCardProps) {
  const timeAgo = new Date(post.createdAt).toLocaleDateString();

  return (
    <div style={{
      backgroundColor: 'var(--surface-color)',
      borderRadius: '16px',
      padding: '16px',
      marginBottom: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid var(--border-color)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <img 
          src={post.authorProfilePic} 
          alt={post.authorName} 
          style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '12px', objectFit: 'cover' }} 
        />
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>{post.authorName}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{timeAgo}</div>
        </div>
      </div>
      
      {post.image && (
        <div style={{ margin: '0 -16px 16px -16px' }}>
          <img 
            src={post.image} 
            alt="Post content" 
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} 
          />
        </div>
      )}

      <div style={{ marginBottom: '12px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>{post.title}</h3>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
          {post.content}
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Tag label={post.category} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button 
          onClick={() => onLike(post.id)}
          style={{
            background: 'none',
            border: 'none',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            color: post.isLikedByMe ? 'var(--primary)' : 'var(--text-secondary)'
          }}
        >
          <Heart 
            size={22} 
            fill={post.isLikedByMe ? 'var(--primary)' : 'none'} 
            color={post.isLikedByMe ? 'var(--primary)' : 'currentColor'} 
          />
          <span style={{ fontSize: '14px', fontWeight: post.isLikedByMe ? 600 : 500 }}>{post.likes}</span>
        </button>
      </div>
    </div>
  );
}

export interface Post {
  id: string;
  authorName: string;
  authorProfilePic: string;
  title: string;
  content: string;
  image: string; // Base64 or URL
  category: string;
  likes: number;
  createdAt: number;
  isLikedByMe: boolean;
}



export const CATEGORIES = ['#TodayILearned', '#ProjectProgress', '#NeedAdvice', '#General'];

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    authorName: 'Sarah',
    authorProfilePic: 'https://ui-avatars.com/api/?name=Sarah&background=FF6B6B&color=fff',
    title: 'First day of WIV Buildathon! 🎉',
    content: 'Just set up my development environment. The mentor sessions were really helpful! Cant wait to start coding my project.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    category: '#TodayILearned',
    likes: 12,
    createdAt: Date.now() - 86400000 * 2,
    isLikedByMe: true
  },
  {
    id: '2',
    authorName: 'Minji',
    authorProfilePic: 'https://ui-avatars.com/api/?name=Minji&background=4CAF50&color=fff',
    title: 'How to vertically center a div???',
    content: 'Ive been struggling with CSS flexbox for the last 2 hours. Any tips on how to properly align items?',
    image: '',
    category: '#NeedAdvice',
    likes: 5,
    createdAt: Date.now() - 3600000,
    isLikedByMe: false
  }
];

let inMemoryPosts: Post[] = [...MOCK_POSTS];

export function getPosts(): Post[] {
  return inMemoryPosts;
}

export function savePosts(posts: Post[]) {
  inMemoryPosts = posts;
}

export function addPost(post: Omit<Post, 'id' | 'createdAt' | 'authorName' | 'authorProfilePic' | 'likes' | 'isLikedByMe'>) {
  const posts = getPosts();
  const newPost: Post = {
    ...post,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: Date.now(),
    authorName: 'My Profile', // Mock current user
    authorProfilePic: 'https://ui-avatars.com/api/?name=My+Profile&background=9C27B0&color=fff',
    likes: 0,
    isLikedByMe: false
  };
  savePosts([newPost, ...posts]);
}

export function toggleLike(postId: string) {
  const posts = getPosts();
  const updated = posts.map(p => {
    if (p.id === postId) {
      if (p.isLikedByMe) {
        return { ...p, likes: p.likes - 1, isLikedByMe: false };
      } else {
        return { ...p, likes: p.likes + 1, isLikedByMe: true };
      }
    }
    return p;
  });
  savePosts(updated);
  return updated;
}

import { useNavigate, useLocation } from 'react-router-dom';
import { Home, PenSquare, User } from 'lucide-react';

export default function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Feed' },
    { path: '/write', icon: PenSquare, label: 'Write' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '60px',
      backgroundColor: 'var(--surface-color)',
      borderTop: '1px solid var(--border-color)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 10
    }}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        return (
          <button 
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} color={isActive ? 'var(--primary)' : 'var(--text-secondary)'} />
            <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

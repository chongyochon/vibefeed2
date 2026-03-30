import type { ReactNode } from 'react';
import NavigationBar from './NavigationBar';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{
      maxWidth: '480px',
      margin: '0 auto',
      minHeight: '100dvh',
      backgroundColor: 'var(--surface-color)',
      boxShadow: '0 0 20px rgba(0,0,0,0.05)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ flex: 1, paddingBottom: '60px', overflowY: 'auto' }}>
        {children}
      </div>
      <NavigationBar />
    </div>
  );
}

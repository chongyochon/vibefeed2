

interface TagProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function Tag({ label, isActive, onClick }: TagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '6px 14px',
        borderRadius: '20px',
        border: '1px solid ' + (isActive ? 'var(--primary)' : 'var(--border-color)'),
        fontSize: '12px',
        fontWeight: isActive ? 600 : 500,
        backgroundColor: isActive ? 'var(--primary)' : 'transparent',
        color: isActive ? '#fff' : 'var(--text-secondary)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease',
        display: 'inline-block'
      }}
    >
      {label}
    </button>
  );
}

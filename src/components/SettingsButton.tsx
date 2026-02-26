import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SettingsButtonProps {
  className?: string;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/admin')}
      className={`group flex items-center h-16 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] overflow-hidden z-50 ${className}`}
      style={{ 
        background: 'var(--card-bg)',
        border: '3px solid var(--primary-color)'
      }}
      title="Inställningar"
    >
      {/* Icon Container */}
      <div 
        className="flex items-center justify-center w-16 h-16 shrink-0 rounded-full transition-transform duration-700 group-hover:rotate-180"
        style={{ color: 'var(--primary-color)' }}
      >
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
      
      {/* Expanding Text */}
      <div className="flex items-center max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:pr-6 transition-all duration-500 ease-out overflow-hidden">
        <span className="font-black text-lg tracking-wide whitespace-nowrap" style={{ color: 'var(--primary-color)' }}>
          Inställningar
        </span>
      </div>
    </button>
  );
};

export default SettingsButton;


import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeProfile } = useProfile();

  const navItems = [
    { path: '/dashboard', label: 'Hem', icon: '🏠', requiresProfile: true },
    { path: '/samling', label: 'Samling', icon: '⭐', requiresProfile: true },
    { path: '/', label: 'Byt Profil', icon: '👤', requiresProfile: false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 p-4 bg-white/10 backdrop-blur-xl border-t border-white/20 flex justify-around items-center z-50 safe-area-bottom">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const isDisabled = item.requiresProfile && !activeProfile;
        
        return (
          <button
            key={item.path}
            onClick={() => !isDisabled && navigate(item.path)}
            disabled={isDisabled}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              isDisabled 
                ? 'opacity-30 cursor-not-allowed' 
                : isActive 
                  ? 'scale-110' 
                  : 'hover:opacity-80'
            }`}
          >
            <span className={`text-3xl drop-shadow-sm ${isActive && !isDisabled ? '' : 'opacity-50'}`}>
              {item.icon}
            </span>
            <span 
              className={`text-[10px] font-black uppercase tracking-widest ${
                isActive && !isDisabled ? 'text-[var(--primary-color)]' : ''
              }`} 
              style={!isActive || isDisabled ? { color: 'var(--text-color)', opacity: 0.5 } : {}}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;

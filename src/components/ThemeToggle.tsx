
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useProfile } from '../contexts/ProfileContext';
import { ThemeType } from '../types';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "absolute top-4 right-4" }) => {
  const { theme, setTheme } = useTheme();
  const { updateProfileTheme } = useProfile();

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    updateProfileTheme(newTheme);
  };

  return (
    <div className={`${className} z-[100] flex bg-white/10 backdrop-blur-xl p-1.5 rounded-full shadow-2xl border border-white/20 scale-90 md:scale-100 origin-top-right`}>
      <button
        onClick={() => handleThemeChange(ThemeType.UNICORN)}
        className={`flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:h-11 rounded-full transition-all duration-500 ${
          theme === ThemeType.UNICORN 
            ? 'bg-gradient-to-r from-pink-300 to-purple-300 text-white shadow-[0_0_20px_rgba(244,114,182,0.4)] scale-105' 
            : 'text-pink-300 hover:bg-white/10'
        }`}
        title="Unicornvärlden"
      >
        <span className="text-2xl md:text-xl drop-shadow-md">🦄</span>
        <span className="text-xs font-black uppercase tracking-widest ml-2 hidden md:inline">Unicorn</span>
      </button>
      <button
        onClick={() => handleThemeChange(ThemeType.HERO)}
        className={`flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:h-11 rounded-full transition-all duration-500 ${
          theme === ThemeType.HERO 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-105' 
            : 'text-blue-400 hover:bg-white/10'
        }`}
        title="Hjältevärlden"
      >
        <span className="text-2xl md:text-xl drop-shadow-md">🦸</span>
        <span className="text-xs font-black uppercase tracking-widest ml-2 hidden md:inline">Hjältar</span>
      </button>
    </div>
  );
};

export default ThemeToggle;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContext } from './contexts/ThemeContext';
import { SpeechProvider } from './contexts/SpeechContext';
import { ProfileProvider, useProfile } from './contexts/ProfileContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ThemeType } from './types';

// Pages
import WelcomePage from './pages/WelcomePage';
import ProfileWizard from './pages/ProfileWizard';
import Dashboard from './pages/Dashboard';
import SpellingGame from './pages/SpellingGame';
import MathGame from './pages/MathGame';
import MemoryGame from './pages/MemoryGame';
import PuzzleGame from './pages/PuzzleGame';
import CollectionPage from './pages/CollectionPage';
import AdminPage from './pages/AdminPage';
import ThemeToggle from './components/ThemeToggle';
import BottomNavigation from './components/BottomNavigation';
import { useLocation } from 'react-router-dom';

// Component to sync theme with active profile
const ThemeSync: React.FC = () => {
  const { activeProfile } = useProfile();
  const { setTheme } = React.useContext(ThemeContext);

  useEffect(() => {
    if (activeProfile?.theme) {
      setTheme(activeProfile.theme);
    }
  }, [activeProfile, setTheme]);

  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const showNav = ['/', '/dashboard', '/samling', '/admin'].includes(location.pathname);

  return (
    <div
      className={`min-h-screen text-[var(--text-color)] transition-colors duration-300 flex flex-col`}
      style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
    >
      <ThemeSync />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/profil/ny" element={<ProfileWizard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/spel/abc-aventyr/" element={<SpellingGame />} />
          <Route path="/spel/matte-magi" element={<MathGame />} />
          <Route path="/spel/minnes-mastaren" element={<MemoryGame />} />
          <Route path="/spel/pussel-palatset" element={<PuzzleGame />} />
          <Route path="/samling" element={<CollectionPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {showNav && <BottomNavigation />}
    </div>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    return (localStorage.getItem('lmn_global_theme') as ThemeType) || ThemeType.UNICORN;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lmn_global_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === ThemeType.UNICORN ? ThemeType.HERO : ThemeType.UNICORN);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <SettingsProvider>
        <SpeechProvider>
          <ProfileProvider>
            <Router>
              <AppContent />
            </Router>
          </ProfileProvider>
        </SpeechProvider>
      </SettingsProvider>
    </ThemeContext.Provider>
  );
};

export default App;

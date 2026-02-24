
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, ThemeType, CompletedLevel } from '../types';

interface ProfileContextType {
  profiles: Profile[];
  activeProfile: Profile | null;
  addProfile: (name: string, avatar: string, theme: ThemeType) => void;
  selectProfile: (id: string) => void;
  updateStars: (starsEarned: number) => void;
  completeLevel: (gameId: string, levelId: number, stars: number) => void;
  isLevelCompleted: (gameId: string, levelId: number) => boolean;
  isLevelUnlocked: (gameId: string, levelId: number) => boolean;
  getLevelStars: (gameId: string, levelId: number) => number;
  deleteProfile: (id: string) => void;
  resetProfile: (id: string) => void;
  updateProfileTheme: (theme: ThemeType) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const saved = localStorage.getItem('lmn_profiles');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeProfileId, setActiveProfileId] = useState<string | null>(() => {
    return localStorage.getItem('lmn_active_profile_id');
  });

  useEffect(() => {
    localStorage.setItem('lmn_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    if (activeProfileId) {
      localStorage.setItem('lmn_active_profile_id', activeProfileId);
    }
  }, [activeProfileId]);

  const activeProfile = profiles.find(p => p.id === activeProfileId) || null;

  const addProfile = (name: string, avatar: string, theme: ThemeType) => {
    const newProfile: Profile = {
      id: crypto.randomUUID(),
      name,
      avatar,
      theme,
      stars: 0,
      completedLevels: [],
      unlockedLevels: [],
      lastPlayed: new Date().toISOString()
    };
    setProfiles(prev => [...prev, newProfile]);
    setActiveProfileId(newProfile.id);
  };

  const selectProfile = (id: string) => {
    setActiveProfileId(id);
  };

  const updateStars = (amount: number) => {
    if (!activeProfileId) return;
    setProfiles(prev => prev.map(p =>
      p.id === activeProfileId ? { ...p, stars: p.stars + amount } : p
    ));
  };

  const completeLevel = (gameId: string, levelId: number, stars: number) => {
    if (!activeProfileId) return;
    setProfiles(prev => prev.map(p => {
      if (p.id !== activeProfileId) return p;
      const completed = p.completedLevels || [];
      const existing = completed.find(c => c.gameId === gameId && c.levelId === levelId);
      if (existing) {
        if (stars > existing.stars) {
          return {
            ...p,
            completedLevels: completed.map(c =>
              c.gameId === gameId && c.levelId === levelId ? { ...c, stars } : c
            )
          };
        }
        return p;
      }
      return {
        ...p,
        completedLevels: [...completed, { gameId, levelId, stars }]
      };
    }));
  };

  const isLevelCompleted = (gameId: string, levelId: number): boolean => {
    if (!activeProfile) return false;
    const completed = activeProfile.completedLevels || [];
    return completed.some(c => c.gameId === gameId && c.levelId === levelId);
  };

  const isLevelUnlocked = (gameId: string, levelId: number): boolean => {
    if (levelId === 1) return true;
    return isLevelCompleted(gameId, levelId - 1);
  };

  const getLevelStars = (gameId: string, levelId: number): number => {
    if (!activeProfile) return 0;
    const completed = activeProfile.completedLevels || [];
    const entry = completed.find(c => c.gameId === gameId && c.levelId === levelId);
    return entry?.stars || 0;
  };

  const deleteProfile = (id: string) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
    if (activeProfileId === id) setActiveProfileId(null);
  };

  const resetProfile = (id: string) => {
    setProfiles(prev => prev.map(p =>
      p.id === id ? { ...p, stars: 0, completedLevels: [], unlockedLevels: [] } : p
    ));
  };

  const updateProfileTheme = (theme: ThemeType) => {
    if (!activeProfileId) return;
    setProfiles(prev => prev.map(p =>
      p.id === activeProfileId ? { ...p, theme } : p
    ));
  };

  return (
    <ProfileContext.Provider value={{
      profiles,
      activeProfile,
      addProfile,
      selectProfile,
      updateStars,
      completeLevel,
      isLevelCompleted,
      isLevelUnlocked,
      getLevelStars,
      deleteProfile,
      resetProfile,
      updateProfileTheme
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within a ProfileProvider');
  return context;
};

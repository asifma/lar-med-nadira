
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AppSettings } from '../types';

const DEFAULT_SETTINGS: AppSettings = {
    adminPin: '1234',
    speechRate: 0.8,
    autoPlayInstructions: true,
    unlockedGames: [],
};

interface SettingsContextType {
    settings: AppSettings;
    updateSettings: (partial: Partial<AppSettings>) => void;
    unlockAllLevels: (gameId: string) => void;
    lockAllLevels: (gameId: string) => void;
    isGameFullyUnlocked: (gameId: string) => boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<AppSettings>(() => {
        const saved = localStorage.getItem('lmn_settings');
        if (saved) {
            try {
                return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
            } catch {
                return DEFAULT_SETTINGS;
            }
        }
        return DEFAULT_SETTINGS;
    });

    useEffect(() => {
        localStorage.setItem('lmn_settings', JSON.stringify(settings));
    }, [settings]);

    const updateSettings = useCallback((partial: Partial<AppSettings>) => {
        setSettings(prev => ({ ...prev, ...partial }));
    }, []);

    const unlockAllLevels = useCallback((gameId: string) => {
        setSettings(prev => ({
            ...prev,
            unlockedGames: prev.unlockedGames.includes(gameId)
                ? prev.unlockedGames
                : [...prev.unlockedGames, gameId],
        }));
    }, []);

    const lockAllLevels = useCallback((gameId: string) => {
        setSettings(prev => ({
            ...prev,
            unlockedGames: prev.unlockedGames.filter(id => id !== gameId),
        }));
    }, []);

    const isGameFullyUnlocked = useCallback((gameId: string) => {
        return settings.unlockedGames.includes(gameId);
    }, [settings.unlockedGames]);

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, unlockAllLevels, lockAllLevels, isGameFullyUnlocked }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('useSettings must be used within a SettingsProvider');
    return context;
};

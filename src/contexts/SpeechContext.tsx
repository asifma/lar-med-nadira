
import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { useSettings } from './SettingsContext';

interface SpeechContextType {
  speak: (text: string) => void;
  stop: () => void;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
  isSupported: boolean;
}

const SpeechContext = createContext<SpeechContextType | undefined>(undefined);

export const SpeechProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const [speechRate, _setSpeechRate] = useState(settings.speechRate);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
  }, []);

  // No debug logs by default — keep behavior quiet in production/dev

  // Sync from settings on mount and when settings change externally
  useEffect(() => {
    _setSpeechRate(settings.speechRate);
  }, [settings.speechRate]);

  const setSpeechRate = useCallback((rate: number) => {
    _setSpeechRate(rate);
    updateSettings({ speechRate: rate });
  }, [updateSettings]);

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const doSpeak = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'sv-SE';
      utterance.rate = speechRate;

      const voices = window.speechSynthesis.getVoices();
      const svVoice = voices.find(v => v.lang.startsWith('sv'));
      if (svVoice) utterance.voice = svVoice;

      window.speechSynthesis.speak(utterance);
    };

    // Small delay after cancel() to work around Chrome dropping utterances
    setTimeout(doSpeak, 50);
  }, [speechRate]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  return (
    <SpeechContext.Provider value={{ speak, stop, speechRate, setSpeechRate, isSupported }}>
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = () => {
  const context = useContext(SpeechContext);
  if (!context) throw new Error('useSpeech must be used within a SpeechProvider');
  return context;
};

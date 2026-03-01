
import React, { createContext, useContext, useCallback, useState, useEffect, useRef } from 'react';
import { useSettings } from './SettingsContext';
import { Howl } from 'howler';
import spriteData from '../../public/audio/sprite.json';

interface SpeechContextType {
  speak: (text: string) => void;
  stop: () => void;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
  isSupported: boolean;
}

const SpeechContext = createContext<SpeechContextType | undefined>(undefined);

// Lazy-init Howl on first use (after user gesture) to avoid audio pool exhaustion
// Persisted on window to survive HMR
function getOrCreateHowl(): Howl {
  const win = window as any;
  if (!win.__lmn_howl) {
    win.__lmn_howl = new Howl({
      src: ['/audio/sprite.mp3'],
      sprite: spriteData.sprite as any,
      preload: true
    });
  }
  return win.__lmn_howl;
}

export const SpeechProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const [speechRate, _setSpeechRate] = useState(settings.speechRate);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
  }, []);

  // Sync from settings on mount and when settings change externally
  useEffect(() => {
    _setSpeechRate(settings.speechRate);
  }, [settings.speechRate]);

  const setSpeechRate = useCallback((rate: number) => {
    _setSpeechRate(rate);
    updateSettings({ speechRate: rate });
  }, [updateSettings]);

  const speak = useCallback((text: string) => {
    // 1. Try to play from the audio sprite first
    const keyToFind = text.toLowerCase().trim();
    
    if (spriteData.sprite) {
      const actualKey = Object.keys(spriteData.sprite).find(
        k => k.toLowerCase().trim() === keyToFind
      );

      if (actualKey) {
        // Lazy-init Howl on first actual use (triggered by user gesture)
        const howl = getOrCreateHowl();
        howl.stop();
        howl.play(actualKey);
        return;
      }
    }

    // 2. Fallback to Web Speech API if word not found in sprite
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
    const win = window as any;
    if (win.__lmn_howl) {
      win.__lmn_howl.stop();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
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

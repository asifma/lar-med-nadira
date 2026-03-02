
import React, { createContext, useContext, useCallback, useState, useEffect, useRef } from 'react';
import { useSettings } from './SettingsContext';
import { Howl } from 'howler';
import spriteData from '../../public/audio/sprite.json';

interface SpeechContextType {
  speak: (text: string) => void;
  speakSequence: (texts: string[]) => void;
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
  if (!win.__lmn_howl_v2) {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const srcFiles = spriteData.src ? spriteData.src.map(s => `${cleanBaseUrl}/audio/${s}`) : [`${cleanBaseUrl}/audio/sprite.mp3`];
    win.__lmn_howl_v2 = new Howl({
      src: srcFiles,
      sprite: spriteData.sprite as any,
      preload: true
    });
  }
  return win.__lmn_howl_v2;
}

export const SpeechProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const [speechRate, _setSpeechRate] = useState(settings.speechRate);
  const [isSupported, setIsSupported] = useState(false);
  const sequenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    if (sequenceTimeoutRef.current) {
      clearTimeout(sequenceTimeoutRef.current);
      sequenceTimeoutRef.current = null;
    }

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

  const speakSequence = useCallback((texts: string[]) => {
    if (texts.length === 0) return;

    if (sequenceTimeoutRef.current) {
      clearTimeout(sequenceTimeoutRef.current);
      sequenceTimeoutRef.current = null;
    }

    const howl = getOrCreateHowl();
    howl.stop();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    let currentIndex = 0;

    const playNext = () => {
      if (currentIndex >= texts.length) {
        sequenceTimeoutRef.current = null;
        return;
      }
      
      const text = texts[currentIndex];
      const keyToFind = text.toLowerCase().trim();
      
      let actualKey: string | undefined;
      if (spriteData.sprite) {
        actualKey = Object.keys(spriteData.sprite).find(
          k => k.toLowerCase().trim() === keyToFind
        );
      }

      if (actualKey) {
        const spriteInfo = (spriteData.sprite as any)[actualKey];
        const duration = spriteInfo[1]; // duration in ms
        howl.play(actualKey);
        
        currentIndex++;
        sequenceTimeoutRef.current = setTimeout(playNext, duration + 100); // 100ms gap between words
      } else {
        // Fallback to Web Speech API
        if (!('speechSynthesis' in window)) {
          currentIndex++;
          playNext();
          return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'sv-SE';
        utterance.rate = speechRate;

        const voices = window.speechSynthesis.getVoices();
        const svVoice = voices.find(v => v.lang.startsWith('sv'));
        if (svVoice) utterance.voice = svVoice;

        utterance.onend = () => {
          currentIndex++;
          sequenceTimeoutRef.current = setTimeout(playNext, 100);
        };
        
        utterance.onerror = () => {
          currentIndex++;
          playNext();
        };

        window.speechSynthesis.speak(utterance);
      }
    };

    playNext();
  }, [speechRate]);

  const stop = useCallback(() => {
    if (sequenceTimeoutRef.current) {
      clearTimeout(sequenceTimeoutRef.current);
      sequenceTimeoutRef.current = null;
    }
    const win = window as any;
    if (win.__lmn_howl_v2) {
      win.__lmn_howl_v2.stop();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return (
    <SpeechContext.Provider value={{ speak, speakSequence, stop, speechRate, setSpeechRate, isSupported }}>
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = () => {
  const context = useContext(SpeechContext);
  if (!context) throw new Error('useSpeech must be used within a SpeechProvider');
  return context;
};

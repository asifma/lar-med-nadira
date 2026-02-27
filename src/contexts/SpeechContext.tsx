
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

export const SpeechProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const [speechRate, _setSpeechRate] = useState(settings.speechRate);
  const [isSupported, setIsSupported] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
    
    // Initialize Howler with the sprite data
    soundRef.current = new Howl({
      src: ['/audio/sprite.mp3'],
      sprite: spriteData.sprite,
      html5: true, // Force HTML5 Audio to prevent loading whole file in memory if it's large
      preload: true
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
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
    if (soundRef.current) {
      // Clean up the text to match our sprite keys (lowercase, trim)
      const keyToFind = text.toLowerCase().trim();
      
      // Check if the key exists in our sprite definition (case-insensitive check against keys)
      if (spriteData.sprite) {
        // Find the actual key in the JSON that matches our lowercase text
        const actualKey = Object.keys(spriteData.sprite).find(
          k => k.toLowerCase().trim() === keyToFind
        );

        if (actualKey) {
          // Stop any currently playing sprite sound
          soundRef.current.stop();
          // Play the new sound using the exact key from the JSON
          soundRef.current.play(actualKey);
          return; // Success! Don't use fallback.
        }
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
    if (soundRef.current) {
      soundRef.current.stop();
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

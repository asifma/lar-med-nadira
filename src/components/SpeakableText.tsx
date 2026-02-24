
import React from 'react';
import { useSpeech } from '../contexts/SpeechContext';

interface SpeakableTextProps {
  text: string;
  children?: React.ReactNode;
  className?: string;
  autoSpeak?: boolean;
}

const SpeakableText: React.FC<SpeakableTextProps> = ({ text, children, className = '', autoSpeak = false }) => {
  const { speak } = useSpeech();

  // autoSpeak is now ignored as per user request to only play on click
  
  return (
    <div 
      className={`inline-flex items-center gap-3 cursor-pointer group ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
    >
      <span className="flex-1 leading-tight">{children || text}</span>
      <button 
        className="flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center group-hover:scale-110 active:scale-95 transition-all shadow-lg"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--primary-color)'
        }}
        aria-label="Lyssna på texten"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary-color)]">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      </button>
    </div>
  );
};

export default SpeakableText;

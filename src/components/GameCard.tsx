import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GameDefinition } from '../types';
import { AbcCardIllustration, MathCardIllustration, MemoryCardIllustration, PuzzleCardIllustration, TracingCardIllustration } from './GameCardIllustration';
import { useSpeech } from '../contexts/SpeechContext';

interface GameCardProps {
  game: GameDefinition;
  isComingSoon?: boolean;
}

const ILLUSTRATIONS: Record<string, React.FC<{ className?: string }>> = {
  AbcCardIllustration,
  MathCardIllustration,
  MemoryCardIllustration,
  PuzzleCardIllustration,
  TracingCardIllustration,
};

const GameCard: React.FC<GameCardProps> = ({ game, isComingSoon = false }) => {
  const navigate = useNavigate();
  const { speak } = useSpeech();
  const Illustration = ILLUSTRATIONS[game.illustration] || AbcCardIllustration;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(game.name);
  };

  if (isComingSoon) {
    return (
      <div
        className="rounded-[2rem] p-8 shadow-[0_6px_0_rgba(0,0,0,0.05)] border-2 border-dashed opacity-50 flex flex-col justify-center items-center text-center"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--primary-color)', opacity: 0.4 }}
      >
        <Illustration className="w-24 h-24 mb-4" />
        <h3 className="text-xl font-bold">{game.name}</h3>
        <p className="text-sm opacity-60">Kommer snart!</p>
      </div>
    );
  }

  return (
    <div
      onClick={() => navigate(game.route)}
      className="rounded-[2rem] p-8 shadow-[0_10px_0_rgba(0,0,0,0.1)] border border-white/20 cursor-pointer hover:translate-y-[-8px] hover:shadow-[0_18px_0_rgba(0,0,0,0.1)] transition-all group overflow-hidden relative active:translate-y-[-2px] flex flex-col"
      style={{ backgroundColor: 'var(--card-bg)', backdropFilter: 'blur(10px)' }}
    >
      {game.badge && (
        <div
          className="absolute top-4 right-4 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm z-10"
          style={{ backgroundColor: 'var(--accent-color)' }}
        >
          {game.badge}
        </div>
      )}
      
      {/* Speaker button */}
      <button
        onClick={handleSpeak}
        className="absolute top-4 left-4 w-10 h-10 rounded-full border-2 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg z-10"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--primary-color)'
        }}
        title={`Lyssna på ${game.name}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary-color)]">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      </button>

      <Illustration className="w-28 h-28 mb-4 group-hover:scale-105 transition-transform" />
      <h3 className="text-3xl font-black mb-2">{game.name}</h3>
      <p className="font-bold opacity-70 flex-1">{game.description}</p>
      <div className="mt-6 flex justify-end">
        <div className="w-12 h-12 rounded-full text-white flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform" style={{ background: 'var(--primary-gradient, var(--primary-color))' }}>➔</div>
      </div>
    </div>
  );
};

export default GameCard;

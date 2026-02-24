import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GameDefinition } from '../types';
import { AbcCardIllustration, MathCardIllustration, MemoryCardIllustration, PuzzleCardIllustration } from './GameCardIllustration';

interface GameCardProps {
  game: GameDefinition;
  isComingSoon?: boolean;
}

const ILLUSTRATIONS: Record<string, React.FC<{ className?: string }>> = {
  AbcCardIllustration,
  MathCardIllustration,
  MemoryCardIllustration,
  PuzzleCardIllustration,
};

const GameCard: React.FC<GameCardProps> = ({ game, isComingSoon = false }) => {
  const navigate = useNavigate();
  const Illustration = ILLUSTRATIONS[game.illustration] || AbcCardIllustration;

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

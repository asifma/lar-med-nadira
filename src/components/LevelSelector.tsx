import React from 'react';
import { BaseGameLevel } from '../types';
import SpeakableText from './SpeakableText';

interface LevelGroup {
  title: string;
  subtitle: string;
  levels: BaseGameLevel[];
  color: string;
  borderColor: string;
}

interface LevelSelectorProps {
  gameId: string;
  gameName: string;
  levelGroups: LevelGroup[];
  levelIcons: Record<number, string>;
  isLevelUnlocked: (gameId: string, levelId: number) => boolean;
  isLevelCompleted: (gameId: string, levelId: number) => boolean;
  getLevelStars: (gameId: string, levelId: number) => number;
  isFullyUnlocked: boolean;
  onLevelSelect: (levelId: number) => void;
  onBack: () => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({
  gameId,
  gameName,
  levelGroups,
  levelIcons,
  isLevelUnlocked,
  isLevelCompleted,
  getLevelStars,
  isFullyUnlocked,
  onLevelSelect,
  onBack,
}) => {
  // Find next playable level
  const allLevels = levelGroups.flatMap(g => g.levels);
  const nextPlayableId = allLevels.find(
    l => (isLevelUnlocked(gameId, l.id) || isFullyUnlocked) && !isLevelCompleted(gameId, l.id)
  )?.id;

  return (
    <div
      className="min-h-screen p-5 md:p-10 pb-12 overflow-y-auto"
      style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={onBack}
            className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl hover:scale-110 hover:bg-white/25 transition-all shadow-lg"
          >
            ←
          </button>
          <div className="flex-1 text-center">
            <SpeakableText text="Välj nivå!" className="text-4xl md:text-5xl font-black" />
          </div>
        </div>

        {/* Level Groups */}
        <div className="space-y-10">
          {levelGroups.map((group, gi) => {
            const groupCompleted = group.levels.filter(l => isLevelCompleted(gameId, l.id)).length;
            return (
              <div key={gi}>
                {/* Group Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className={`h-1 flex-1 rounded-full bg-gradient-to-r ${group.color} opacity-40`} />
                  <div className="text-center shrink-0">
                    <h3 className="text-xl md:text-2xl font-black tracking-tight">{group.title}</h3>
                    <p className="text-xs font-bold opacity-40 mt-0.5">{group.subtitle} — {groupCompleted}/{group.levels.length} ✓</p>
                  </div>
                  <div className={`h-1 flex-1 rounded-full bg-gradient-to-r ${group.color} opacity-40`} />
                </div>

                {/* Level Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
                  {group.levels.map(lvl => {
                    const unlocked = isLevelUnlocked(gameId, lvl.id) || isFullyUnlocked;
                    const completed = isLevelCompleted(gameId, lvl.id);
                    const stars = getLevelStars(gameId, lvl.id);
                    const isNext = lvl.id === nextPlayableId || (isFullyUnlocked && !completed);

                    return (
                      <button
                        key={lvl.id}
                        disabled={!unlocked && !completed}
                        onClick={() => onLevelSelect(lvl.id)}
                        className={`
                          relative p-5 md:p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center gap-2 group overflow-hidden
                          ${completed
                            ? `backdrop-blur-md ${group.borderColor} shadow-[0_8px_0_rgba(0,0,0,0.2)] hover:shadow-[0_12px_0_rgba(0,0,0,0.3)] hover:translate-y-[-4px] active:translate-y-[2px] active:shadow-[0_2px_0_rgba(0,0,0,0.2)]`
                            : unlocked
                              ? `backdrop-blur-md border-[var(--primary-color)] shadow-[0_8px_0_rgba(0,0,0,0.08)] hover:shadow-[0_12px_0_rgba(0,0,0,0.1)] hover:translate-y-[-4px] active:translate-y-[2px] active:shadow-[0_2px_0_rgba(0,0,0,0.08)] ${isNext ? 'level-pulse' : ''}`
                              : 'bg-white/5 border-white/10 opacity-30 cursor-not-allowed grayscale'
                          }
                        `}
                        style={unlocked ? { backgroundColor: 'var(--card-bg)' } : {}}
                      >
                        {/* Completion ribbon */}
                        {completed && stars >= 3 && (
                          <div className="absolute -top-1 -right-1 w-10 h-10">
                            <div className={`absolute inset-0 bg-gradient-to-br ${group.color} rotate-12 rounded-lg opacity-90`} />
                            <span className="absolute inset-0 flex items-center justify-center text-sm">💯</span>
                          </div>
                        )}

                        {/* Level Icon */}
                        <div className={`text-4xl md:text-5xl transition-transform duration-300 ${unlocked ? 'group-hover:scale-115 group-hover:rotate-6' : ''} ${isNext ? 'animate-bounce' : ''}`}>
                          {completed ? lvl.badge : levelIcons[lvl.id] || '📖'}
                        </div>

                        {/* Level Number */}
                        <span className="text-lg md:text-xl font-black" style={{ color: 'var(--text-color)' }}>
                          {lvl.id}
                        </span>

                        {/* Level Name */}
                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wide leading-tight text-center ${completed ? 'opacity-60' : unlocked ? 'opacity-50' : 'opacity-30'}`}>
                          {lvl.name}
                        </span>

                        {/* Stars */}
                        {completed && (
                          <div className="flex gap-1 mt-1">
                            {[1, 2, 3].map(s => (
                              <span key={s} className={`text-sm ${s <= stars ? 'drop-shadow-md' : 'opacity-15'}`}>⭐</span>
                            ))}
                          </div>
                        )}

                        {/* "Play" indicator for next level */}
                        {isNext && !completed && (
                          <div
                            className="mt-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg"
                            style={{ background: 'var(--primary-gradient, var(--primary-color))' }}
                          >
                            Spela! ▶
                          </div>
                        )}

                        {/* Lock overlay for locked levels */}
                        {!unlocked && (
                          <div className="absolute inset-0 flex items-center justify-center rounded-3xl">
                            <span className="text-3xl opacity-60">🔒</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-10 flex justify-center gap-8 text-sm font-bold opacity-50">
          <span className="flex items-center gap-2">🌱 Öppen</span>
          <span className="flex items-center gap-2">🏅 Klar</span>
          <span className="flex items-center gap-2">🔒 Låst</span>
        </div>
      </div>

      <style>{`
        @keyframes levelPulse {
          0%, 100% { box-shadow: 0 8px 0 rgba(0,0,0,0.08), 0 0 0 0 var(--primary-color); }
          50% { box-shadow: 0 8px 0 rgba(0,0,0,0.08), 0 0 0 8px transparent; }
        }
        .level-pulse {
          animation: levelPulse 2s ease-in-out infinite;
          border-color: var(--primary-color);
        }
      `}</style>
    </div>
  );
};

export default LevelSelector;

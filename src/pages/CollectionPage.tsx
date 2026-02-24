
import React from 'react';
import { useProfile } from '../contexts/ProfileContext';
import SpeakableText from '../components/SpeakableText';
import { abcGame } from '../data/abcWords';
import { GameDefinition } from '../types';

const ALL_GAMES: GameDefinition[] = [abcGame];

const CollectionPage: React.FC = () => {
  const { activeProfile, isLevelCompleted, getLevelStars } = useProfile();

  if (!activeProfile) return null;

  const totalBadges = ALL_GAMES.reduce((sum, g) => sum + g.levels.length, 0);
  const earnedBadges = ALL_GAMES.reduce((sum, g) =>
    sum + g.levels.filter(l => isLevelCompleted(g.id, l.id)).length
    , 0);

  return (
    <div
      className="min-h-screen p-6 md:p-12 relative"
      style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <SpeakableText text="Min samling" className="text-5xl font-black" />
          <p className="mt-2 font-bold opacity-60">{earnedBadges} av {totalBadges} märken</p>
        </div>

        {ALL_GAMES.map(game => {
          const completed = game.levels.filter(l => isLevelCompleted(game.id, l.id)).length;
          return (
            <div key={game.id} className="mb-10">
              {/* Game header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{game.icon}</span>
                <div>
                  <h3 className="text-2xl font-black">{game.name}</h3>
                  <p className="text-sm font-bold opacity-50">{completed}/{game.levels.length} nivåer klara</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden border border-white/20 shadow-inner mb-6">
                <div
                  className="bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500 h-full transition-all duration-1000 rounded-full"
                  style={{ width: `${(completed / game.levels.length) * 100}%` }}
                />
              </div>

              {/* Badge grid */}
              <div
                className="bg-white/10 backdrop-blur-md rounded-[2rem] p-6 md:p-8 border shadow-xl"
                style={{ borderColor: 'var(--card-border, rgba(255,255,255,0.2))' }}
              >
                <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
                  {game.levels.map(level => {
                    const unlocked = isLevelCompleted(game.id, level.id);
                    const stars = getLevelStars(game.id, level.id);
                    return (
                      <div
                        key={level.id}
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all ${unlocked
                            ? 'bg-white shadow-lg scale-105 border-2 border-yellow-300'
                            : 'bg-white/5 grayscale opacity-20 border-2 border-dashed border-white/20'
                          }`}
                      >
                        <span className={`text-3xl md:text-4xl ${unlocked ? '' : 'blur-sm'}`}>{level.badge}</span>
                        {unlocked && (
                          <div className="flex gap-0.5 mt-1">
                            {[1, 2, 3].map(s => (
                              <span key={s} className={`text-[8px] ${s <= stars ? '' : 'opacity-20'}`}>⭐</span>
                            ))}
                          </div>
                        )}
                        {!unlocked && (
                          <span className="text-[10px] font-bold opacity-60 mt-1">{level.id}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionPage;

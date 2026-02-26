
import React from 'react';
import { useProfile } from '../contexts/ProfileContext';
import SpeakableText from '../components/SpeakableText';
import GAMES from '../data/gameRegistry';

const CollectionPage: React.FC = () => {
  const { activeProfile, isLevelCompleted, getLevelStars } = useProfile();

  if (!activeProfile) return null;

  const totalBadges = GAMES.reduce((sum, g) => sum + g.levels.length, 0);
  const earnedBadges = GAMES.reduce((sum, g) =>
    sum + g.levels.filter(l => isLevelCompleted(g.id, l.id)).length
    , 0);

  const completionPercentage = Math.round((earnedBadges / totalBadges) * 100);

  return (
    <div
      className="min-h-screen p-6 pb-32 md:p-12 md:pb-32 relative overflow-hidden"
      style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="float-element text-6xl opacity-10 absolute" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>🏆</div>
        <div className="float-element text-5xl opacity-15 absolute" style={{ top: '25%', right: '8%', animationDelay: '2s' }}>⭐</div>
        <div className="float-element text-4xl opacity-10 absolute" style={{ top: '60%', left: '10%', animationDelay: '4s' }}>🎖️</div>
        <div className="float-element text-5xl opacity-15 absolute" style={{ top: '75%', right: '15%', animationDelay: '1s' }}>✨</div>
        <div className="float-element text-6xl opacity-10 absolute" style={{ top: '45%', right: '5%', animationDelay: '3s' }}>🌟</div>
        <div className="float-element text-4xl opacity-15 absolute" style={{ top: '85%', left: '20%', animationDelay: '5s' }}>💫</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with back button and stats */}
        <div className="mb-12">
          {/* Back button */}
          <button 
            onClick={() => window.history.back()}
            className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            <span className="text-2xl">←</span>
            <span className="font-bold">Tillbaka</span>
          </button>

          {/* Title */}
          <div className="text-center">
            <div className="inline-block relative">
              {/* Glow effect behind title */}
              <div className="absolute inset-0 blur-2xl opacity-30" style={{ background: 'var(--primary-color)' }}></div>
              <SpeakableText text="Min samling" className="text-5xl md:text-6xl font-black relative" />
            </div>
            
            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto">
            {/* Earned badges card */}
            <div 
              className="rounded-3xl p-6 border-2 shadow-xl backdrop-blur-md relative overflow-hidden group hover:scale-105 transition-transform"
              style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--primary-color)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-5xl mb-2 animate-bounce-slow">🏅</div>
              <div className="text-4xl font-black" style={{ color: 'var(--primary-color)' }}>{earnedBadges}</div>
              <div className="text-sm font-bold opacity-60">Samlade</div>
            </div>

            {/* Total badges card */}
            <div 
              className="rounded-3xl p-6 border-2 shadow-xl backdrop-blur-md relative overflow-hidden group hover:scale-105 transition-transform"
              style={{ 
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--accent-color)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-5xl mb-2 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>🎯</div>
              <div className="text-4xl font-black" style={{ color: 'var(--accent-color)' }}>{totalBadges}</div>
              <div className="text-sm font-bold opacity-60">Totalt</div>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex justify-between text-sm font-bold opacity-60 mb-2">
              <span>Total framsteg</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden border-2 border-white/20 shadow-inner relative">
              <div
                className="h-full transition-all duration-1000 rounded-full relative overflow-hidden"
                style={{ 
                  width: `${completionPercentage}%`,
                  background: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 20%, #10b981 40%, #3b82f6 60%, #8b5cf6 80%, #ec4899 100%)'
                }}
              >
                <div className="absolute inset-0 bg-white/30 animate-shimmer-progress"></div>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Game sections */}
        {GAMES.map((game, gameIndex) => {
          const completed = game.levels.filter(l => isLevelCompleted(game.id, l.id)).length;
          const gameProgress = Math.round((completed / game.levels.length) * 100);
          
          return (
            <div 
              key={game.id} 
              className="mb-12 animate-slide-in-up"
              style={{ animationDelay: `${gameIndex * 0.1}s` }}
            >
              {/* Game header */}
              <div 
                className="flex items-center gap-4 mb-6 p-6 rounded-3xl border-2 shadow-lg backdrop-blur-md relative overflow-hidden group hover:scale-[1.02] transition-transform"
                style={{ 
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--primary-color)'
                }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="text-6xl group-hover:scale-110 transition-transform relative z-10">{game.icon}</div>
                <div className="flex-1 relative z-10">
                  <h3 className="text-3xl font-black mb-1">{game.name}</h3>
                  <p className="text-sm font-bold opacity-60">{completed}/{game.levels.length} nivåer klara</p>
                </div>
                <div className="text-5xl font-black relative z-10" style={{ color: 'var(--accent-color)' }}>
                  {gameProgress}%
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden border border-white/20 shadow-inner mb-6 relative">
                <div
                  className="h-full transition-all duration-1000 rounded-full relative overflow-hidden"
                  style={{ 
                    width: `${gameProgress}%`,
                    background: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 25%, #10b981 50%, #3b82f6 75%, #8b5cf6 100%)'
                  }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
              </div>

              {/* Badge grid */}
              <div
                className="bg-white/10 backdrop-blur-md rounded-[2rem] p-6 md:p-8 border-2 shadow-xl relative overflow-hidden"
                style={{ borderColor: 'var(--card-border, rgba(255,255,255,0.2))' }}
              >
                {/* Decorative corner elements */}
                <div className="absolute top-4 right-4 text-4xl opacity-5 pointer-events-none">🏆</div>
                <div className="absolute bottom-4 left-4 text-4xl opacity-5 pointer-events-none">⭐</div>
                
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-5 relative z-10">
                  {game.levels.map((level, levelIndex) => {
                    const unlocked = isLevelCompleted(game.id, level.id);
                    const stars = getLevelStars(game.id, level.id);
                    
                    // Different gradient backgrounds for unlocked badges
                    const gradients = [
                      'from-pink-200 via-purple-200 to-blue-200',
                      'from-yellow-200 via-orange-200 to-red-200',
                      'from-green-200 via-teal-200 to-cyan-200',
                      'from-indigo-200 via-purple-200 to-pink-200',
                      'from-amber-200 via-yellow-200 to-lime-200',
                    ];
                    const gradientClass = gradients[levelIndex % gradients.length];
                    
                    return (
                      <div
                        key={level.id}
                        className={`aspect-square rounded-3xl px-8 py-6 md:px-10 md:py-8 flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden group ${
                          unlocked
                            ? `bg-gradient-to-br ${gradientClass} shadow-2xl hover:scale-110 border-4 animate-badge-appear`
                            : 'bg-gradient-to-br from-gray-800/20 to-gray-900/20 opacity-30 border-4 border-dashed border-white/20 hover:opacity-50'
                        }`}
                        style={{ 
                          borderColor: unlocked ? '#fbbf24' : undefined,
                          animationDelay: `${levelIndex * 0.05}s`,
                          boxShadow: unlocked ? '0 0 30px rgba(251, 191, 36, 0.4), 0 10px 40px rgba(0,0,0,0.2)' : undefined
                        }}
                      >
                        {/* Animated glow effect for unlocked badges */}
                        {unlocked && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute inset-0 animate-pulse-glow"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-badge"></div>
                          </>
                        )}
                        
                        {/* Badge emoji - bigger with spacing */}
                        <span className={`text-3xl md:text-4xl lg:text-5xl relative z-10 drop-shadow-lg ${unlocked ? 'animate-bounce-once' : 'blur-sm grayscale'}`}>
                          {level.badge}
                        </span>
                        
                        {/* Stars for unlocked badges with spacing */}
                        {unlocked && (
                          <div className="flex gap-2 relative z-10">
                            {[1, 2, 3].map(s => (
                              <span 
                                key={s} 
                                className={`text-sm md:text-base transition-all drop-shadow-md ${s <= stars ? 'scale-100 animate-star-twinkle' : 'opacity-20 scale-75'}`}
                                style={{ animationDelay: `${s * 0.2}s` }}
                              >
                                ⭐
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Level number for locked badges */}
                        {!unlocked && (
                          <span className="text-sm font-bold opacity-60 relative z-10">{level.id}</span>
                        )}

                        {/* Enhanced sparkle effects on hover for unlocked */}
                        {unlocked && (
                          <>
                            <div className="absolute -top-2 -right-2 text-lg opacity-0 group-hover:opacity-100 transition-opacity animate-twinkle drop-shadow-lg">✨</div>
                            <div className="absolute -bottom-2 -left-2 text-lg opacity-0 group-hover:opacity-100 transition-opacity animate-twinkle drop-shadow-lg" style={{ animationDelay: '0.5s' }}>💫</div>
                            <div className="absolute -top-2 -left-2 text-base opacity-0 group-hover:opacity-100 transition-opacity animate-twinkle drop-shadow-lg" style={{ animationDelay: '0.25s' }}>🌟</div>
                            <div className="absolute -bottom-2 -right-2 text-base opacity-0 group-hover:opacity-100 transition-opacity animate-twinkle drop-shadow-lg" style={{ animationDelay: '0.75s' }}>⭐</div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Completion celebration */}
        {earnedBadges === totalBadges && (
          <div className="text-center py-12 animate-scale-in">
            <div className="text-8xl mb-4 animate-bounce">🏆</div>
            <h2 className="text-4xl font-black mb-2" style={{ color: 'var(--primary-color)' }}>
              GRATTIS!
            </h2>
            <p className="text-xl font-bold opacity-70">Du har samlat alla märken!</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .float-element {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes bounceOnce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-bounce-once {
          animation: bounceOnce 0.6s ease-out;
        }

        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-up {
          animation: slideInUp 0.6s ease-out backwards;
        }

        @keyframes badgeAppear {
          0% { opacity: 0; transform: scale(0) rotate(-180deg); }
          60% { transform: scale(1.2) rotate(10deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .animate-badge-appear {
          animation: badgeAppear 0.6s ease-out backwards;
        }

        @keyframes shimmerProgress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer-progress {
          animation: shimmerProgress 2s ease-in-out infinite;
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        .animate-twinkle {
          animation: twinkle 1.5s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.3);
            opacity: 0.5;
          }
          50% { 
            box-shadow: inset 0 0 40px rgba(255, 255, 255, 0.5);
            opacity: 0.8;
          }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }

        @keyframes shimmerBadge {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-shimmer-badge {
          animation: shimmerBadge 3s ease-in-out infinite;
        }

        @keyframes starTwinkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.2) rotate(5deg); }
          50% { transform: scale(1) rotate(0deg); }
          75% { transform: scale(1.2) rotate(-5deg); }
        }
        .animate-star-twinkle {
          animation: starTwinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CollectionPage;

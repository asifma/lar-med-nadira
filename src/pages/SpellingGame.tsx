
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import { useSpeech } from '../contexts/SpeechContext';
import { useSettings } from '../contexts/SettingsContext';
import Button from '../components/Button';
import SwedishKeyboard from '../components/SwedishKeyboard';
import SpeakableText from '../components/SpeakableText';
import { abcGame } from '../data/abcWords';
import { PlaceholderMode } from '../types';

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SpellingGame: React.FC = () => {
  const navigate = useNavigate();
  const { activeProfile, updateStars, completeLevel, isLevelUnlocked, isLevelCompleted, getLevelStars } = useProfile();
  const { speak, stop } = useSpeech();
  const { isGameFullyUnlocked } = useSettings();

  const [gameState, setGameState] = useState<'selecting' | 'playing' | 'complete'>('selecting');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userLetters, setUserLetters] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [firstAttemptCorrect, setFirstAttemptCorrect] = useState(0); // Track first-try accuracy
  const [hasAttempted, setHasAttempted] = useState(false); // Track if current word was attempted
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');
  const [shake, setShake] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const safeSpeak = useCallback((text: string) => {
    if (!isMuted) speak(text);
  }, [isMuted, speak]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      if (!prev) stop(); // Stop any current speech when muting
      return !prev;
    });
  }, [stop]);

  const level = abcGame.levels.find(l => l.id === selectedLevel)!;
  const words = useMemo(
    () => shuffleArray(level.words),
    [selectedLevel, gameState]
  );
  const word = words[currentWordIndex] || words[0];

  const handleKeyPress = useCallback((char: string) => {
    if (level.placeholderMode === 'none') {
      setUserLetters(prev => [...prev, char]);
    } else if (userLetters.length < word.word.length) {
      setUserLetters(prev => [...prev, char]);
    }
  }, [level.placeholderMode, userLetters.length, word.word.length]);

  const handleBackspace = useCallback(() => {
    setUserLetters(prev => prev.slice(0, -1));
  }, []);

  const checkAnswer = useCallback(() => {
    if (userLetters.length === 0) return;
    if (level.placeholderMode !== 'none' && userLetters.length < word.word.length) return;

    const guess = userLetters.join('');
    if (guess === word.word) {
      setFeedback('correct');
      setCorrectCount(prev => prev + 1);
      if (!hasAttempted) {
        setFirstAttemptCorrect(prev => prev + 1); // Only count if first attempt
      }
      updateStars(1);
      safeSpeak(`Rätt! Du stavade ${word.word} helt rätt!`);

      setTimeout(() => {
        if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex(prev => prev + 1);
          setUserLetters([]);
          setFeedback('none');
          setHasAttempted(false); // Reset for next word
        } else {
          setGameState('complete');
        }
      }, 2000);
    } else {
      setFeedback('wrong');
      setHasAttempted(true); // Mark that they've attempted this word
      setShake(true);
      safeSpeak('Inte riktigt! Försök igen!');
      setTimeout(() => {
        setShake(false);
        setFeedback('none');
        setUserLetters([]);
      }, 1000);
    }
  }, [userLetters, word, currentWordIndex, words.length, updateStars, safeSpeak, level.placeholderMode, hasAttempted]);

  useEffect(() => {
    // Reset state when level changes
  }, [selectedLevel]);

  // Handle game completion
  useEffect(() => {
    if (gameState === 'complete') {
      const stars = firstAttemptCorrect >= 10 ? 3 : firstAttemptCorrect >= 7 ? 2 : firstAttemptCorrect >= 5 ? 1 : 0;
      if (stars > 0) {
        completeLevel('abc', selectedLevel, stars);
      }
    }
  }, [gameState]);

  // Physical keyboard support
  useEffect(() => {
    if (gameState !== 'playing') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (feedback !== 'none') return;
      const key = e.key;
      if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Enter') {
        checkAnswer();
      } else if (/^[a-zA-ZåäöÅÄÖ]$/.test(key)) {
        handleKeyPress(key.toUpperCase());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, feedback, checkAnswer, handleKeyPress, handleBackspace]);

  const startLevel = (levelId: number) => {
    setSelectedLevel(levelId);
    setCurrentWordIndex(0);
    setUserLetters([]);
    setCorrectCount(0);
    setFirstAttemptCorrect(0);
    setHasAttempted(false);
    setFeedback('none');
    setGameState('playing');
  };

  // ─── LEVEL ICONS ───
  const levelIcons: Record<number, string> = {
    1: '🌱', 2: '☀️', 3: '🦋', 4: '🐾', 5: '🌈',
    6: '🚀', 7: '🌊', 8: '🍎', 9: '🌿', 10: '✨',
    11: '🔥', 12: '💐', 13: '🏰', 14: '🎪', 15: '🐉',
    16: '⚡', 17: '🏆', 18: '👑', 19: '💎', 20: '🌟',
  };

  const levelGroups = [
    { title: '🌱 Nybörjare', subtitle: 'Korta ord (2–3 bokstäver)', levels: abcGame.levels.slice(0, 5), color: 'from-green-400 to-emerald-500', borderColor: 'border-green-300/40' },
    { title: '📚 Mellannivå', subtitle: 'Medellånga ord (4–5 bokstäver)', levels: abcGame.levels.slice(5, 10), color: 'from-blue-400 to-indigo-500', borderColor: 'border-blue-300/40' },
    { title: '🔥 Utmanare', subtitle: 'Längre ord med ledtrådar', levels: abcGame.levels.slice(10, 14), color: 'from-orange-400 to-red-500', borderColor: 'border-orange-300/40' },
    { title: '👑 Mästare', subtitle: 'Utan hjälp — du kan!', levels: abcGame.levels.slice(14, 20), color: 'from-purple-500 to-pink-500', borderColor: 'border-purple-300/40' },
  ];

  // Find the "next" playable level (first uncompleted level that is either naturally unlocked OR forced unlocked)
  const isFullyUnlocked = isGameFullyUnlocked('abc');
  const nextPlayableId = abcGame.levels.find(
    l => (isLevelUnlocked('abc', l.id) || isFullyUnlocked) && !isLevelCompleted('abc', l.id)
  )?.id;

  // ─── LEVEL SELECT ───
  if (gameState === 'selecting') {
    return (
      <div
        className="min-h-screen p-5 md:p-10 pb-12 overflow-y-auto"
        style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <button
              onClick={() => navigate('/dashboard')}
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
              const groupCompleted = group.levels.filter(l => isLevelCompleted('abc', l.id)).length;
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
                      const unlocked = isLevelUnlocked('abc', lvl.id) || isFullyUnlocked;
                      const completed = isLevelCompleted('abc', lvl.id);
                      const stars = getLevelStars('abc', lvl.id);
                      // If it's the next sequential uncompleted level OR if we just forcefully unlocked everything and this is uncompleted
                      const isNext = lvl.id === nextPlayableId || (isFullyUnlocked && !completed);

                      return (
                        <button
                          key={lvl.id}
                          disabled={!unlocked}
                          onClick={() => startLevel(lvl.id)}
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
  }

  // ─── COMPLETE ───
  if (gameState === 'complete') {
    const stars = firstAttemptCorrect >= 10 ? 3 : firstAttemptCorrect >= 7 ? 2 : firstAttemptCorrect >= 5 ? 1 : 0;
    const isNewBadge = !isLevelCompleted('abc', selectedLevel) || stars > getLevelStars('abc', selectedLevel);

    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-8"
        style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
      >
        <div className="text-8xl mb-4">{stars >= 2 ? '🎉' : stars >= 1 ? '👏' : '💪'}</div>
        <h2 className="text-5xl font-black">
          {stars >= 2 ? 'BRA JOBBAT!' : stars >= 1 ? 'BRA FÖRSÖK!' : 'FÖRSÖK IGEN!'}
        </h2>
        <div className="text-3xl font-bold opacity-70">
          Du stavade {firstAttemptCorrect} av {words.length} ord rätt på första försöket!
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <span key={s} className={`text-5xl ${s <= stars ? 'animate-bounce' : 'opacity-20'}`} style={{ animationDelay: `${s * 0.15}s` }}>⭐</span>
          ))}
        </div>
        {stars > 0 && (
          <div
            className="p-6 rounded-3xl border-4 border-yellow-400"
            style={{ backgroundColor: 'var(--card-bg)' }}
          >
            <p className="text-xl font-black mb-2">Nivå {selectedLevel} avklarad!</p>
            <span className="text-6xl">{level.badge}</span>
          </div>
        )}
        <div className="pt-6 flex flex-wrap gap-4 justify-center">
          <Button variant="secondary" size="lg" onClick={() => setGameState('selecting')}>ALLA NIVÅER</Button>
          <Button variant="primary" size="lg" onClick={() => startLevel(selectedLevel)}>SPELA IGEN</Button>
          {stars > 0 && selectedLevel < 20 && (
            <Button variant="accent" size="lg" onClick={() => startLevel(selectedLevel + 1)}>NÄSTA NIVÅ →</Button>
          )}
        </div>
      </div>
    );
  }

  // ─── PLAYING ───
  return (
    <div
      className="min-h-[100dvh] flex flex-col p-4 overflow-hidden"
      style={{ perspective: '1000px', background: 'var(--bg-gradient, var(--bg-color))' }}
    >
      {/* HUD */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl shadow-sm mb-2 z-10 border border-white/20">
        <button onClick={() => setGameState('selecting')} className="text-3xl hover:scale-110 transition-transform shrink-0">←</button>
        <h2 className="flex-1 min-w-0 text-center text-base md:text-2xl font-black tracking-tight truncate" style={{ color: 'var(--primary-color)' }}>
          Nivå {selectedLevel} — {level.name}
        </h2>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleMute}
            className={`text-xl hover:scale-110 transition-all ${isMuted ? 'opacity-40' : ''}`}
            title={isMuted ? 'Slå på ljud' : 'Stäng av ljud'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          <div className="text-lg font-black text-yellow-600">⭐ {currentWordIndex + 1}/{words.length}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-3xl mx-auto mb-4 z-10">
        <div className="flex justify-between text-xs font-bold opacity-60 mb-1">
          <span>Framsteg</span>
          <span>{currentWordIndex}/{words.length}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/20 shadow-inner">
          <div
            className="bg-gradient-to-r from-green-400 via-yellow-400 to-purple-500 h-full transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(currentWordIndex / words.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Game Area */}
      <div
        className="flex-1 flex flex-col items-center justify-center space-y-10 transition-all duration-700"
        style={{ transform: 'rotateX(10deg)', transformStyle: 'preserve-3d' }}
      >
        {/* Word Emoji */}
        <div
          onClick={() => safeSpeak(word.word)}
          className={`relative w-40 h-40 md:w-56 md:h-56 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center justify-center text-[6rem] md:text-[8rem] cursor-pointer transition-all duration-300 active:scale-95 ${feedback === 'correct' ? 'ring-8 ring-green-400' : ''}`}
          style={{
            transform: 'translateZ(20px)',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), inset 0 -10px 20px -10px rgba(0,0,0,0.1)',
            backgroundColor: 'var(--card-bg)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="animate-float">{word.emoji}</div>
          <button className="absolute -bottom-2 -right-2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl border-4 border-[var(--accent-color)] hover:scale-110 transition-transform">🔊</button>
        </div>

        {/* Placeholders */}
        <Placeholders
          word={word.word}
          userLetters={userLetters}
          mode={level.placeholderMode}
          feedback={feedback}
          shake={shake}
        />

        {/* Feedback */}
        <div className="h-10" style={{ transform: 'translateZ(60px)' }}>
          {feedback === 'correct' && (
            <div className="text-3xl font-black text-green-500 animate-bounce drop-shadow-lg">FANTASTISKT! ✅</div>
          )}
          {feedback === 'wrong' && (
            <div className="text-3xl font-black text-red-400 drop-shadow-lg">Försök igen! 😔</div>
          )}
        </div>
      </div>

      {/* Keyboard */}
      <div className="pb-4 z-20" style={{ transform: 'rotateX(-5deg)', transformStyle: 'preserve-3d' }}>
        <SwedishKeyboard
          onKeyPress={handleKeyPress}
          onBackspace={handleBackspace}
          onCheck={checkAnswer}
          onHearWord={() => safeSpeak(word.word)}
          disabled={feedback === 'correct' || feedback === 'wrong'}
        />
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

// ─── Placeholder component ───
const Placeholders: React.FC<{
  word: string;
  userLetters: string[];
  mode: PlaceholderMode;
  feedback: 'none' | 'correct' | 'wrong';
  shake: boolean;
}> = ({ word, userLetters, mode, feedback, shake }) => {
  if (mode === 'none') {
    // No placeholders — show typed letters inline
    return (
      <div className={`flex gap-2 min-h-[5rem] items-center justify-center flex-wrap ${shake ? 'animate-shake' : ''}`} style={{ transform: 'translateZ(40px)' }}>
        {userLetters.length === 0 ? (
          <span className="text-xl font-bold opacity-40 italic">Skriv ordet...</span>
        ) : (
          userLetters.map((letter, idx) => (
            <div
              key={idx}
              className={`w-12 h-14 md:w-14 md:h-16 rounded-xl flex items-center justify-center text-2xl md:text-3xl font-black shadow-md border-2 -translate-y-1 transition-all duration-200 ${feedback === 'wrong' ? 'text-red-500 border-red-400 bg-red-50' : ''
                } ${feedback === 'correct' ? 'border-green-400 text-green-600 bg-green-50' : ''}`}
              style={feedback === 'none' ? { backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', borderColor: 'var(--card-border)' } : {}}
            >
              {letter}
            </div>
          ))
        )}
      </div>
    );
  }

  if (mode === 'partial') {
    // Show first and last letter, blanks in between
    return (
      <div className={`flex gap-3 md:gap-4 min-h-[5rem] items-center ${shake ? 'animate-shake' : ''}`} style={{ transform: 'translateZ(40px)' }}>
        {Array.from({ length: word.length }).map((_, idx) => {
          const isHint = idx === 0 || idx === word.length - 1;
          const letter = userLetters[idx];
          return (
            <div
              key={idx}
              className={`w-12 h-16 md:w-16 md:h-20 rounded-xl flex items-center justify-center text-2xl md:text-3xl font-black transition-all duration-300 ${isHint && !letter
                ? 'bg-[var(--accent-color)]/30 border-2 border-[var(--accent-color)] text-[var(--text-color)]'
                : letter
                  ? 'shadow-lg -translate-y-1 border-2'
                  : 'bg-[var(--secondary-color)]/30 border-b-4 border-[var(--primary-color)]'
                } ${feedback === 'wrong' && letter ? 'text-red-500 border-red-400 bg-red-50' : ''
                } ${feedback === 'correct' ? 'border-green-400 text-green-600 bg-green-50' : ''}`}
              style={letter && feedback === 'none' ? { backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', borderColor: 'var(--card-border)' } : {}}
            >
              {letter || (isHint ? word[idx] : '')}
            </div>
          );
        })}
      </div>
    );
  }

  // Full placeholders
  return (
    <div className={`flex gap-3 md:gap-4 min-h-[5rem] items-center ${shake ? 'animate-shake' : ''}`} style={{ transform: 'translateZ(40px)' }}>
      {Array.from({ length: word.length }).map((_, idx) => (
        <div
          key={idx}
          className={`w-14 h-18 md:w-18 md:h-22 rounded-xl flex items-center justify-center text-3xl md:text-4xl font-black transition-all duration-300 ${userLetters[idx]
            ? 'shadow-lg -translate-y-1 border-2'
            : 'bg-[var(--secondary-color)]/30 border-b-4 border-[var(--primary-color)]'
            } ${feedback === 'wrong' && userLetters[idx] ? 'text-red-500 border-red-400 bg-red-50' : ''
            } ${feedback === 'correct' ? 'border-green-400 text-green-600 bg-green-50' : ''}`}
          style={userLetters[idx] && feedback === 'none' ? { backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', borderColor: 'var(--card-border)' } : {}}
        >
          {userLetters[idx] || ''}
        </div>
      ))}
    </div>
  );
};

export default SpellingGame;
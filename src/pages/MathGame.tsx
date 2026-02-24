import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import mathGame from '../data/mathLevels';
import Button from '../components/Button';
import SpeakableText from '../components/SpeakableText';
import NumericPad from '../components/NumericPad';
import { useSettings } from '../contexts/SettingsContext';
import { useSpeech } from '../contexts/SpeechContext';
import { burstConfetti, fireConfetti } from '../utils/confetti';

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const VisualCount: React.FC<{ n: number, emoji?: string }> = ({ n, emoji = '🔵' }) => (
  <div className="flex gap-1 flex-wrap justify-center items-center max-w-xs">
    {Array.from({ length: Math.min(n, 10) }).map((_, i) => (
      <span key={i} className="text-3xl">{emoji}</span>
    ))}
    {n > 10 && <span className="text-2xl font-black opacity-60">+{n - 10}</span>}
  </div>
);

const MathGame: React.FC = () => {
  const navigate = useNavigate();
  const { activeProfile, updateStars, completeLevel, isLevelCompleted, isLevelUnlocked, getLevelStars } = useProfile();
  const { isGameFullyUnlocked, settings } = useSettings();

  const [gameState, setGameState] = useState<'selecting' | 'playing' | 'complete'>('selecting');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const level = useMemo(() => mathGame.levels.find((l: any) => l.id === selectedLevel), [selectedLevel]);
  const [problems, setProblems] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [firstAttemptCorrect, setFirstAttemptCorrect] = useState(0); // Track first-try accuracy
  const [hasAttempted, setHasAttempted] = useState(false); // Track if current question was attempted
  const [feedback, setFeedback] = useState<'none'|'correct'|'wrong'>('none');
  const [streak, setStreak] = useState(0);
  const { speak, stop } = useSpeech();
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(prev => {
      if (!prev) stop();
      return !prev;
    });
  };

  const safeSpeak = (text: string) => {
    if (isMuted) return;
    speak(text);
  };

  useEffect(() => {
    if (gameState === 'complete') {
      if (correctCount > 0) fireConfetti();
      const stars = firstAttemptCorrect >= 10 ? 3 : firstAttemptCorrect >= 7 ? 2 : firstAttemptCorrect >= 5 ? 1 : 0;
      if (stars > 0) completeLevel('math', selectedLevel, stars);
    }
  }, [gameState]);

  const startLevel = (id: number) => {
    setSelectedLevel(id);
    const lvl = mathGame.levels.find((l:any) => l.id === id);
    // Use static problems from level definition
    setProblems(lvl.problems);
    setIndex(0); 
    setInput(''); 
    setCorrectCount(0); 
    setFirstAttemptCorrect(0);
    setHasAttempted(false);
    setFeedback('none'); 
    setGameState('playing');
    if (settings.autoPlayInstructions) safeSpeak(`Nivå ${id}, ${lvl?.name}`);
  };

  const check = () => {
    const p = problems[index];
    const val = Number(input);
    if (val === p.answer) {
      setFeedback('correct');
      setCorrectCount(c => c + 1);
      if (!hasAttempted) {
        setFirstAttemptCorrect(c => c + 1); // Only count if first attempt
      }
      setStreak(s => s + 1);
      updateStars(1);
      burstConfetti();
      safeSpeak('Rätt');
      setTimeout(() => {
        if (index < problems.length - 1) { 
          setIndex(i => i + 1); 
          setInput(''); 
          setFeedback('none');
          setHasAttempted(false); // Reset for next question
        }
        else setGameState('complete');
      }, 700);
    } else {
      setFeedback('wrong');
      setHasAttempted(true); // Mark that they've attempted this question
      setStreak(0);
      safeSpeak('Inte rätt, försök igen');
      setTimeout(() => { setFeedback('none'); setInput(''); }, 700);
    }
  };

  useEffect(() => {
    if (!settings.autoPlayInstructions) return;
    if (gameState === 'playing' && problems.length > 0) {
      const p = problems[index];
      if (p) {
        const opWord = level?.op === '+' ? 'plus' : level?.op === '-' ? 'minus' : level?.op === '×' ? 'gånger' : 'delat med';
        safeSpeak(`${p.a} ${opWord} ${p.b}`);
      }
    }
  }, [gameState, index, problems, settings.autoPlayInstructions]);

  if (!activeProfile) return (<div className="p-8 text-center"><Button onClick={() => navigate('/')}>Gå till start</Button></div>);

  if (gameState === 'selecting') {
    const groups = [
      { title: '➕ Addition', subtitle: 'Lär dig lägga ihop', levels: mathGame.levels.slice(0,5), color: 'from-green-400 to-emerald-500', borderColor: 'border-green-300/40' },
      { title: '➖ Subtraktion', subtitle: 'Ta bort och jämför', levels: mathGame.levels.slice(5,10), color: 'from-blue-400 to-indigo-500', borderColor: 'border-blue-300/40' },
      { title: '✖️ Multiplikation', subtitle: 'Gör grupper', levels: mathGame.levels.slice(10,15), color: 'from-orange-400 to-red-500', borderColor: 'border-orange-300/40' },
      { title: '➗ Division', subtitle: 'Dela rättvist', levels: mathGame.levels.slice(15,20), color: 'from-purple-500 to-pink-500', borderColor: 'border-purple-300/40' },
    ];
    const levelIcons: Record<number, string> = {
      1: '➕', 2: '➕', 3: '➕', 4: '➕', 5: '➕',
      6: '➖', 7: '➖', 8: '➖', 9: '➖', 10: '➖',
      11: '✖️', 12: '✖️', 13: '✖️', 14: '✖️', 15: '✖️',
      16: '➗', 17: '➗', 18: '➗', 19: '➗', 20: '➗',
    };
    const isFullyUnlocked = isGameFullyUnlocked('math');
    const nextPlayableId = mathGame.levels.find((l:any) => (isLevelUnlocked('math', l.id) || isFullyUnlocked) && !isLevelCompleted('math', l.id))?.id;

    return (
      <div className="min-h-screen p-5 md:p-10 pb-12" style={{ background: 'var(--bg-gradient, var(--bg-color))' }}>
        <div className="max-w-4xl mx-auto">
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

          <div className="space-y-10">
            {groups.map((group, gi) => {
              const groupCompleted = group.levels.filter((l:any) => isLevelCompleted('math', l.id)).length;
              return (
                <div key={gi}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`h-1 flex-1 rounded-full bg-gradient-to-r ${group.color} opacity-40`} />
                    <div className="text-center shrink-0">
                      <h3 className="text-xl md:text-2xl font-black tracking-tight">{group.title}</h3>
                      <p className="text-xs font-bold opacity-40 mt-0.5">{group.subtitle} — {groupCompleted}/{group.levels.length} ✓</p>
                    </div>
                    <div className={`h-1 flex-1 rounded-full bg-gradient-to-r ${group.color} opacity-40`} />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
                    {group.levels.map((lvl:any) => {
                      const unlocked = isLevelUnlocked('math', lvl.id) || isFullyUnlocked;
                      const completed = isLevelCompleted('math', lvl.id);
                      const stars = getLevelStars('math', lvl.id);
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

                          <div className={`text-4xl md:text-5xl transition-transform duration-300 ${unlocked ? 'group-hover:scale-115 group-hover:rotate-6' : ''} ${isNext ? 'animate-bounce' : ''}`}>
                            {completed ? lvl.badge : levelIcons[lvl.id] || '📐'}
                          </div>

                          <span className="text-lg md:text-xl font-black" style={{ color: 'var(--text-color)' }}>{lvl.id}</span>

                          <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wide leading-tight text-center ${completed ? 'opacity-60' : unlocked ? 'opacity-50' : 'opacity-30'}`}>{lvl.name}</span>

                          {completed && (
                            <div className="flex gap-1 mt-1">
                              {[1,2,3].map(s => (
                                <span key={s} className={`text-sm ${s <= stars ? 'drop-shadow-md' : 'opacity-15'}`}>⭐</span>
                              ))}
                            </div>
                          )}

                          {isNext && !completed && (
                            <div
                              className="mt-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg"
                              style={{ background: 'var(--primary-gradient, var(--primary-color))' }}
                            >
                              Spela! ▶
                            </div>
                          )}

                          {!unlocked && (
                            <div className="absolute inset-0 flex items-center justify-center rounded-3xl"><span className="text-3xl opacity-60">🔒</span></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

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
      </div>
    );
  }

  if (gameState === 'complete') {
    const stars = firstAttemptCorrect >= 10 ? 3 : firstAttemptCorrect >= 7 ? 2 : firstAttemptCorrect >= 5 ? 1 : 0;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="text-6xl">{stars >= 2 ? '🎉' : '👏'}</div>
        <h2 className="text-3xl font-black">Du fick {firstAttemptCorrect} av {problems.length} rätt på första försöket</h2>
        <div className="flex gap-2 my-4">
          {[1, 2, 3].map(s => (
            <span key={s} className={`text-5xl ${s <= stars ? 'animate-bounce' : 'opacity-20'}`} style={{ animationDelay: `${s * 0.15}s` }}>⭐</span>
          ))}
        </div>
        <div className="pt-6 flex gap-4">
          <Button variant="secondary" size="lg" onClick={() => setGameState('selecting')}>Alla nivåer</Button>
          <Button variant="primary" size="lg" onClick={() => startLevel(selectedLevel)}>Spela igen</Button>
        </div>
      </div>
    );
  }

  // playing
  const p = problems[index];

    return (
      <div className="min-h-screen p-6 flex flex-col" style={{ background: 'var(--bg-gradient, var(--bg-color))' }}>
        <style>{`
          @keyframes pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          .animate-pop { animation: pop 0.3s ease-out; }

          @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-2deg); }
            75% { transform: rotate(2deg); }
          }
          .animate-wiggle { animation: wiggle 0.3s ease-in-out; }

          @keyframes glow-pulse {
            0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.5); }
            50% { box-shadow: 0 0 20px 10px rgba(255,255,255,0); }
            100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
          }
          .animate-glow-pulse { animation: glow-pulse 1s ease-out; }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          .animate-shake { animation: shake 0.2s ease-in-out infinite; }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float { animation: float 3s ease-in-out infinite; }
        `}</style>
        <div className="relative flex items-center px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl shadow-sm mb-2 z-10 border border-white/20">
          <button onClick={() => setGameState('selecting')} className="text-3xl hover:scale-110 transition-transform z-10">←</button>
          <h2 className="absolute inset-0 flex items-center justify-center text-xl md:text-2xl font-black tracking-tight pointer-events-none" style={{ color: 'var(--primary-color)' }}>
            Nivå {selectedLevel} — {level?.name}
          </h2>
          <div className="flex-1" />
          <div className="flex items-center gap-2 z-10">
            <button onClick={toggleMute} className={`text-xl hover:scale-110 transition-all ${isMuted ? 'opacity-40' : ''}`} title={isMuted ? 'Slå på ljud' : 'Stäng av ljud'}>
              {isMuted ? '🔇' : '🔊'}
            </button>
            <div className="text-lg font-black text-yellow-600">⭐ {index + 1}/{problems.length}</div>
            {streak > 1 && (
              <div className="text-sm font-black text-orange-500 flex items-center gap-1 animate-bounce">
                🔥 {streak}
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-3xl mx-auto mb-4">
          <div className="flex justify-between text-xs font-bold opacity-60 mb-1">
            <span>Framsteg</span>
            <span>{index}/{problems.length}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/20 shadow-inner">
            <div
              className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(index / problems.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-6">
        
        {/* Feedback text - positioned at top with nice visuals */}
        <div className="h-20 flex items-center justify-center">
          {feedback === 'correct' && (
            <div className="text-5xl font-black text-green-500 animate-pop flex items-center gap-3 drop-shadow-lg">
              <span className="animate-bounce">✅</span>
              <span>Rätt!</span>
              <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🎉</span>
            </div>
          )}
          {feedback === 'wrong' && (
            <div className="text-4xl font-black text-red-500 animate-shake flex items-center gap-3 drop-shadow-lg">
              <span>❌</span>
              <span>Försök igen!</span>
            </div>
          )}
        </div>

        <div className={`w-full max-w-3xl p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 text-center shadow-2xl ${feedback === 'correct' ? 'animate-wiggle' : ''} ${feedback === 'wrong' ? 'animate-shake' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">{level?.badge}</div>
            <div className="text-sm opacity-60">Fråga {index + 1}/{problems.length}</div>
          </div>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="text-4xl font-black">{p.question}</div>
            <button
              onClick={() => {
                const opWord = level?.op === '+' ? 'plus' : level?.op === '-' ? 'minus' : level?.op === '×' ? 'gånger' : 'delat med';
                safeSpeak(`${p.a} ${opWord} ${p.b}`);
              }}
              className="text-2xl hover:scale-110 transition-transform"
              title="Spela upp fråga"
            >🔊</button>
          </div>
          <div className="mb-4 text-sm opacity-60">Föreställ dig bilden och skriv svaret</div>
          <div className="mb-6">
            <div className="flex gap-6 justify-center items-center">
              <div className={`bg-white/10 p-4 rounded-2xl animate-float ${feedback === 'correct' ? 'animate-glow-pulse' : ''} ${feedback === 'wrong' ? 'opacity-50' : ''}`}>
                <VisualCount n={p.a} emoji={level?.op === '+' ? '🍎' : level?.op === '-' ? '🍐' : level?.op === '×' ? '🍇' : '🍪'} />
              </div>
              <div className="text-4xl font-black">{level?.op}</div>
              <div className={`bg-white/10 p-4 rounded-2xl animate-float ${feedback === 'correct' ? 'animate-glow-pulse' : ''} ${feedback === 'wrong' ? 'opacity-50' : ''}`}>
                <VisualCount n={p.b} emoji={level?.op === '+' ? '🍏' : level?.op === '-' ? '🍎' : level?.op === '×' ? '🍇' : '🍪'} />
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <input
                value={input}
                readOnly
                className={`w-full p-6 rounded-xl text-6xl text-center bg-[var(--card-bg)] text-[var(--text-color)] font-black transition-colors duration-300 ${feedback === 'correct' ? 'animate-pop' : ''} ${feedback === 'wrong' ? 'bg-red-500 text-white' : ''}`}
              />
            </div>
            <NumericPad onPress={(v) => setInput(i => (v === '' ? '' : (i + v).slice(0,6)))} onClear={() => setInput('')} onEnter={check} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathGame;

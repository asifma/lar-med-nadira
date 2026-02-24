import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import { useSpeech } from '../contexts/SpeechContext';
import { useSettings } from '../contexts/SettingsContext';
import LevelSelector from '../components/LevelSelector';
import Button from '../components/Button';
import { memoryGame } from '../data/memoryLevels';
import { burstConfetti } from '../utils/confetti';

// Emoji themes for memory cards
const THEMES: Record<string, string[]> = {
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔'],
  fruits: ['🍎', '🍌', '🍇', '🍓', '🍉', '🍊', '🍋', '🍒', '🍑', '🥝', '🍍', '🥭', '🍈', '🫐', '🥥', '🍐'],
  vehicles: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🚲', '🛴', '🛵'],
  mixed: ['🎨', '⚽', '🎸', '🎭', '🎪', '🎡', '🎢', '🎠', '🎯', '🎲', '🧩', '🎺', '🎻', '🎹', '🥁', '🎬'],
};

interface Card {
  id: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  shake?: boolean;
}

const MemoryGame: React.FC = () => {
  const navigate = useNavigate();
  const { updateStars, completeLevel, isLevelUnlocked, isLevelCompleted, getLevelStars } = useProfile();
  const { speak } = useSpeech();
  const { isGameFullyUnlocked } = useSettings();

  const [gameState, setGameState] = useState<'selecting' | 'playing' | 'complete'>('selecting');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showStreakBurst, setShowStreakBurst] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(prev => {
      if (!prev) stop();
      return !prev;
    });
  };

  const safeSpeak = (text: string) => {
    if (!isMuted) speak(text);
  };

  const level = memoryGame.levels.find(l => l.id === selectedLevel)!;

  const levelGroups = [
    { title: '🐾 Djur', subtitle: 'Hitta djurpar', levels: memoryGame.levels.slice(0, 5), color: 'from-green-400 to-emerald-500', borderColor: 'border-green-300/40' },
    { title: '🍎 Frukt', subtitle: 'Fruktiga par', levels: memoryGame.levels.slice(5, 10), color: 'from-blue-400 to-indigo-500', borderColor: 'border-blue-300/40' },
    { title: '🚗 Fordon', subtitle: 'Transportpar', levels: memoryGame.levels.slice(10, 15), color: 'from-orange-400 to-red-500', borderColor: 'border-orange-300/40' },
    { title: '🎨 Blandat', subtitle: 'Allt möjligt', levels: memoryGame.levels.slice(15, 20), color: 'from-purple-500 to-pink-500', borderColor: 'border-purple-300/40' },
  ];

  const levelIcons: Record<number, string> = {
    1: '🐶', 2: '🐱', 3: '🦁', 4: '🐘', 5: '🦒',
    6: '🍎', 7: '🍌', 8: '🍇', 9: '🍓', 10: '🍉',
    11: '🚗', 12: '🚂', 13: '✈️', 14: '🚀', 15: '🚁',
    16: '🎨', 17: '🎭', 18: '🎪', 19: '🎡', 20: '🏆',
  };

  // Initialize cards for level
  const initializeCards = () => {
    const emojis = THEMES[level.theme].slice(0, level.pairs);
    const cardPairs = [...emojis, ...emojis].map((emoji, idx) => ({
      id: `${emoji}-${idx}`,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    // Shuffle
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }
    setCards(cardPairs);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
  };

  const startLevel = (levelId: number) => {
    setSelectedLevel(levelId);
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState === 'playing') {
      initializeCards();
    }
  }, [gameState, selectedLevel]);

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match!
        const newStreak = streak + 1;
        setStreak(newStreak);
        
        if (newStreak >= 3) {
          safeSpeak('Fantastiskt! Du är på en vinnande rad!');
          setShowStreakBurst(true);
          setTimeout(() => setShowStreakBurst(false), 2000);
        } else {
          safeSpeak('Perfekt!');
        }
        
        burstConfetti();
        updateStars(1);
        setCards(prev => prev.map(c => 
          c.id === first || c.id === second ? { ...c, isMatched: true } : c
        ));
        setMatchedPairs(p => p + 1);
        setFlippedCards([]);
      } else {
        // No match - shake cards and reset streak
        setStreak(0);
        safeSpeak('Försök igen!');
        setCards(prev => prev.map(c => 
          c.id === first || c.id === second ? { ...c, isFlipped: true, shake: true } : c
        ));
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second ? { ...c, isFlipped: false, shake: false } : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  // Check for completion
  useEffect(() => {
    if (matchedPairs === level.pairs && gameState === 'playing') {
      // Big celebration!
      safeSpeak('Grattis! Du hittade alla par!');
      burstConfetti();
      setTimeout(() => burstConfetti(), 300);
      setTimeout(() => burstConfetti(), 600);
      setTimeout(() => setGameState('complete'), 1500);
    }
  }, [matchedPairs, level.pairs]);

  // Save completion when game state changes to complete
  useEffect(() => {
    if (gameState === 'complete') {
      const stars = moves <= level.pairs + 2 ? 3 : moves <= level.pairs + 5 ? 2 : 1;
      completeLevel('memory', selectedLevel, stars);
    }
  }, [gameState]);

  const handleCardClick = (cardId: string) => {
    if (flippedCards.length === 2) return;
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    // Speak the emoji name when card is flipped
    const emojiNames: Record<string, string> = {
      '🐶': 'hund', '🐱': 'katt', '🐭': 'råtta', '🐹': 'hamster', '🐰': 'kanin', '🦊': 'räv',
      '🐻': 'björn', '🐼': 'panda', '🐨': 'koala', '🐯': 'tiger', '🦁': 'lejon', '🐮': 'ko',
      '🐷': 'gris', '🐸': 'groda', '🐵': 'apa', '🐔': 'höna', '🐘': 'elefant', '🦒': 'giraff',
      '🍎': 'äpple', '🍌': 'banan', '🍇': 'druva', '🍓': 'jordgubbe', '🍉': 'vattenmelon',
      '🍊': 'apelsin', '🍋': 'citron', '🍒': 'körsbär', '🍑': 'persika', '🥝': 'kiwi',
      '🍍': 'ananas', '🥭': 'mango', '🍈': 'melon', '🫐': 'blåbär', '🥥': 'kokosnöt', '🍐': 'päron',
      '🚗': 'bil', '🚕': 'taxi', '🚙': 'bil', '🚌': 'buss', '🚎': 'buss', '🏎️': 'racerbil',
      '🚓': 'polisbil', '🚑': 'ambulans', '🚒': 'brandbil', '🚐': 'skåpbil', '🚚': 'lastbil',
      '🚛': 'lastbil', '🚜': 'traktor', '🚲': 'cykel', '🛴': 'sparkcykel', '🛵': 'moped',
      '🎨': 'palett', '⚽': 'fotboll', '🎸': 'gitarr', '🎭': 'mask', '🎪': 'cirkus',
      '🎡': 'pariserhjul', '🎢': 'berg och dalbana', '🎠': 'karusell', '🎯': 'piltavla',
      '🎲': 'tärning', '🧩': 'pussel', '🎺': 'trumpet', '🎻': 'fiol', '🎹': 'piano',
      '🥁': 'trumma', '🎬': 'film',
    };
    
    const name = emojiNames[card.emoji] || 'kort';
    safeSpeak(name);

    setCards(prev => prev.map(c => c.id === cardId ? { ...c, isFlipped: true } : c));
    setFlippedCards(prev => [...prev, cardId]);
    if (flippedCards.length === 0) setMoves(m => m + 1);
  };

  // ─── LEVEL SELECTION ───
  if (gameState === 'selecting') {
    return (
      <LevelSelector
        gameId="memory"
        gameName="Minnes-Mästaren"
        levelGroups={levelGroups}
        levelIcons={levelIcons}
        isLevelUnlocked={isLevelUnlocked}
        isLevelCompleted={isLevelCompleted}
        getLevelStars={getLevelStars}
        isFullyUnlocked={isGameFullyUnlocked('memory')}
        onLevelSelect={startLevel}
        onBack={() => navigate('/dashboard')}
      />
    );
  }

  // ─── INTRO ANIMATION ───
  if (showIntro) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
      >
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce-big">{level.badge}</div>
          <h2 className="text-5xl font-black mb-4 animate-fade-in" style={{ color: 'var(--primary-color)' }}>
            {level.name}
          </h2>
          <div className="text-6xl font-black animate-countdown">
            <span className="inline-block">Redo?</span>
          </div>
        </div>
        <style>{`
          @keyframes bounceBig {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-30px) scale(1.2); }
          }
          .animate-bounce-big {
            animation: bounceBig 1s ease-in-out infinite;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.6s ease-out;
          }

          @keyframes countdown {
            0% { opacity: 0; transform: scale(0.5); }
            20% { opacity: 1; transform: scale(1.2); }
            40% { opacity: 1; transform: scale(1); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-countdown {
            animation: countdown 2s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // ─── GAME COMPLETE ───
  if (gameState === 'complete') {
    const stars = moves <= level.pairs + 2 ? 3 : moves <= level.pairs + 5 ? 2 : 1;

    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-8 relative overflow-hidden"
        style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
      >
        {/* Celebration confetti effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {['🎉', '⭐', '✨', '🎊', '💫', '🌟'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>

        {/* Trophy animation */}
        <div className="text-8xl md:text-9xl mb-4 animate-trophy-bounce">
          {stars >= 3 ? '🏆' : stars >= 2 ? '🎉' : '👏'}
        </div>

        {/* Title with gradient */}
        <h2 
          className="text-5xl md:text-6xl font-black animate-scale-in"
          style={{
            background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {stars >= 3 ? 'FANTASTISKT!' : stars >= 2 ? 'BRA JOBBAT!' : 'BRA FÖRSÖK!'}
        </h2>

        {/* Stats card */}
        <div 
          className="p-8 rounded-3xl border-4 shadow-2xl backdrop-blur-md animate-slide-up"
          style={{ 
            backgroundColor: 'var(--card-bg)',
            borderColor: stars >= 3 ? '#FFD700' : 'var(--primary-color)',
          }}
        >
          <div className="text-3xl font-bold opacity-70 mb-4">
            Du klarade det på {moves} drag!
          </div>
          
          {/* Stars */}
          <div className="flex gap-3 justify-center mb-4">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`text-6xl ${s <= stars ? 'animate-star-pop' : 'opacity-20'}`}
                style={{ animationDelay: `${s * 0.2}s` }}
              >
                ⭐
              </div>
            ))}
          </div>

          {/* Badge */}
          {stars > 0 && (
            <div className="mt-6">
              <p className="text-xl font-black mb-3 opacity-70">Nytt märke!</p>
              <div className="text-7xl animate-badge-spin">{level.badge}</div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="pt-6 flex flex-wrap gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Button variant="secondary" size="lg" onClick={() => setGameState('selecting')}>
            ALLA NIVÅER
          </Button>
          <Button variant="primary" size="lg" onClick={() => startLevel(selectedLevel)}>
            SPELA IGEN
          </Button>
          {selectedLevel < 20 && (
            <Button variant="accent" size="lg" onClick={() => startLevel(selectedLevel + 1)}>
              NÄSTA NIVÅ →
            </Button>
          )}
        </div>

        <style>{`
          @keyframes confetti {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          .animate-confetti {
            animation: confetti 3s ease-in forwards;
          }

          @keyframes trophyBounce {
            0%, 100% { transform: translateY(0) scale(1); }
            25% { transform: translateY(-30px) scale(1.1); }
            50% { transform: translateY(0) scale(1); }
            75% { transform: translateY(-15px) scale(1.05); }
          }
          .animate-trophy-bounce {
            animation: trophyBounce 1s ease-out;
          }

          @keyframes scaleIn {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-scale-in {
            animation: scaleIn 0.5s ease-out;
          }

          @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-up {
            animation: slideUp 0.6s ease-out backwards;
          }

          @keyframes starPop {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            50% { transform: scale(1.3) rotate(180deg); opacity: 1; }
            100% { transform: scale(1) rotate(360deg); opacity: 1; }
          }
          .animate-star-pop {
            animation: starPop 0.6s ease-out backwards;
          }

          @keyframes badgeSpin {
            0% { transform: scale(0) rotate(-180deg); opacity: 0; }
            60% { transform: scale(1.2) rotate(20deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          .animate-badge-spin {
            animation: badgeSpin 0.8s ease-out 0.6s backwards;
          }
        `}</style>
      </div>
    );
  }

  // ─── PLAYING ───
  const gridCols = level.pairs <= 6 ? 'grid-cols-3' : level.pairs <= 12 ? 'grid-cols-4' : 'grid-cols-5';

  return (
    <div 
      className="min-h-screen p-4 md:p-6 flex flex-col relative overflow-hidden"
      style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="float-element text-6xl opacity-10 absolute" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>✨</div>
        <div className="float-element text-5xl opacity-10 absolute" style={{ top: '20%', right: '10%', animationDelay: '2s' }}>🧠</div>
        <div className="float-element text-4xl opacity-10 absolute" style={{ top: '60%', left: '8%', animationDelay: '4s' }}>💫</div>
        <div className="float-element text-5xl opacity-10 absolute" style={{ top: '70%', right: '15%', animationDelay: '1s' }}>⭐</div>
      </div>

      {/* HUD */}
      <div className="relative flex items-center px-3 md:px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl shadow-sm mb-4 z-10 border border-white/20">
        <button 
          onClick={() => setGameState('selecting')} 
          className="text-2xl md:text-3xl hover:scale-110 transition-transform z-10 active:scale-95"
        >
          ←
        </button>
        <h2 
          className="absolute inset-0 flex items-center justify-center text-sm md:text-xl lg:text-2xl font-black tracking-tight pointer-events-none px-12" 
          style={{ color: 'var(--primary-color)' }}
        >
          <span className="truncate">Nivå {selectedLevel} — {level.name}</span>
        </h2>
        <div className="flex-1" />
        <div className="flex items-center gap-2 md:gap-3 z-10">
          {/* Mute button */}
          <button
            onClick={toggleMute}
            className={`text-lg md:text-xl hover:scale-110 transition-all ${isMuted ? 'opacity-40' : ''}`}
            title={isMuted ? 'Slå på ljud' : 'Stäng av ljud'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          
          {/* Streak indicator */}
          {streak >= 3 && (
            <div className="hidden sm:flex items-center gap-1 px-2 md:px-3 py-1 rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg animate-bounce">
              <span className="text-base md:text-lg">🔥</span>
              <span className="text-xs md:text-sm font-black">{streak}</span>
            </div>
          )}
          <div className="flex items-center gap-1 px-2 md:px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
            <span className="text-base md:text-lg">🎯</span>
            <span className="text-xs md:text-sm font-black">{moves}</span>
          </div>
          <div className="flex items-center gap-1 px-2 md:px-3 py-1 rounded-full bg-yellow-500/20 backdrop-blur-sm">
            <span className="text-base md:text-lg">✅</span>
            <span className="text-xs md:text-sm font-black text-yellow-600">{matchedPairs}/{level.pairs}</span>
          </div>
        </div>
      </div>

      {/* Streak burst overlay */}
      {showStreakBurst && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-7xl font-black text-orange-500 animate-streak-burst drop-shadow-2xl">
            🔥 STREAK! 🔥
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="w-full max-w-3xl mx-auto mb-4 z-10">
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/20 shadow-inner">
          <div
            className="bg-gradient-to-r from-green-400 via-yellow-400 to-purple-500 h-full transition-all duration-500 ease-out rounded-full relative"
            style={{ width: `${(matchedPairs / level.pairs) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Game Grid */}
      <div className="flex-1 flex items-center justify-center p-2 md:p-4 z-10">
        <div className={`grid ${gridCols} gap-2 md:gap-3 max-w-3xl w-full`}>
          {cards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isMatched || card.isFlipped || flippedCards.length === 2}
              className={`aspect-square rounded-2xl text-4xl md:text-5xl lg:text-6xl flex items-center justify-center transition-all duration-500 relative overflow-hidden group ${
                card.isFlipped || card.isMatched
                  ? 'bg-white shadow-2xl scale-105 card-flip'
                  : 'bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md hover:scale-110 hover:shadow-xl active:scale-95 card-back'
              } ${card.isMatched ? 'card-matched' : ''} ${card.shake ? 'animate-shake-card' : ''}`}
              style={{
                border: card.isFlipped || card.isMatched ? '4px solid var(--primary-color)' : '3px solid rgba(255,255,255,0.3)',
                animationDelay: `${idx * 0.05}s`,
                transform: card.isMatched ? 'scale(0.95)' : undefined,
              }}
            >
              {/* Card back pattern */}
              {!card.isFlipped && !card.isMatched && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full relative">
                    {/* Decorative pattern - more playful */}
                    <div className="absolute inset-3 rounded-xl border-4 border-white/20 border-dashed animate-spin-very-slow" />
                    <div className="absolute inset-6 rounded-lg border-2 border-white/10" />
                    
                    {/* Center icon with pulse */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-5xl md:text-6xl opacity-40 group-hover:opacity-60 group-hover:scale-125 transition-all duration-300 animate-pulse-gentle">
                        ❓
                      </div>
                    </div>
                    
                    {/* Corner sparkles */}
                    <div className="absolute top-2 left-2 text-xl opacity-20 group-hover:opacity-40 transition-opacity">✨</div>
                    <div className="absolute top-2 right-2 text-xl opacity-20 group-hover:opacity-40 transition-opacity">✨</div>
                    <div className="absolute bottom-2 left-2 text-xl opacity-20 group-hover:opacity-40 transition-opacity">✨</div>
                    <div className="absolute bottom-2 right-2 text-xl opacity-20 group-hover:opacity-40 transition-opacity">✨</div>
                    
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" 
                         style={{ transform: 'translateX(-100%) rotate(45deg)', transition: 'transform 0.6s' }} />
                  </div>
                </div>
              )}
              
              {/* Card front (emoji) */}
              {(card.isFlipped || card.isMatched) && (
                <div className={`relative z-10 ${card.isMatched ? 'animate-bounce-once' : 'animate-pop-in'}`}>
                  <div className="relative">
                    {card.emoji}
                    {/* Glow effect for matched cards */}
                    {card.isMatched && (
                      <>
                        <div className="absolute inset-0 blur-xl bg-green-400/50 animate-pulse-slow" />
                        <div className="absolute -top-3 -right-3 text-3xl animate-spin-slow">✨</div>
                        <div className="absolute -bottom-2 -left-2 text-2xl animate-spin-slow" style={{ animationDelay: '1s' }}>💫</div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Matched overlay */}
              {card.isMatched && (
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-2xl animate-pulse-slow" />
              )}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .float-element {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes cardFlip {
          0% { transform: rotateY(0deg) scale(1); }
          50% { transform: rotateY(90deg) scale(1.1); }
          100% { transform: rotateY(180deg) scale(1); }
        }
        .card-flip {
          animation: cardFlip 0.6s ease-out;
        }

        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: popIn 0.4s ease-out;
        }

        @keyframes bounceOnce {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-10px); }
          50% { transform: translateY(0); }
          75% { transform: translateY(-5px); }
        }
        .animate-bounce-once {
          animation: bounceOnce 0.6s ease-out;
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 3s linear infinite;
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-slow {
          animation: pulseSlow 2s ease-in-out infinite;
        }

        @keyframes cardBack {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .card-back {
          animation: cardBack 3s ease-in-out infinite;
        }

        @keyframes cardMatched {
          0% { transform: scale(1); }
          50% { transform: scale(1.15) rotate(5deg); }
          100% { transform: scale(0.95) rotate(0deg); }
        }
        .card-matched {
          animation: cardMatched 0.6s ease-out;
        }

        /* Stagger animation for initial card appearance */
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.8);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        .grid > button {
          animation: slideIn 0.5s ease-out backwards;
        }

        @keyframes shakeCard {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-10px) rotate(-5deg); }
          75% { transform: translateX(10px) rotate(5deg); }
        }
        .animate-shake-card {
          animation: shakeCard 0.4s ease-in-out;
        }

        @keyframes spinVerySlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-very-slow {
          animation: spinVerySlow 20s linear infinite;
        }

        @keyframes pulseGentle {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.05); opacity: 0.6; }
        }
        .animate-pulse-gentle {
          animation: pulseGentle 2s ease-in-out infinite;
        }

        @keyframes streakBurst {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.3) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 0; }
        }
        .animate-streak-burst {
          animation: streakBurst 1.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MemoryGame;

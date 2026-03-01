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
  const { updateStars, completeLevel, isLevelUnlocked, isLevelCompleted, getLevelStars, addStreak } = useProfile();
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
  const [seenEmojis, setSeenEmojis] = useState<Set<string>>(new Set());
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
    setStreak(0);
    setSeenEmojis(new Set());
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
        setStreak(prev => {
          const newStreak = prev + 1;
          
          setTimeout(() => {
            if (newStreak >= 3 && newStreak % 3 === 0) {
              addStreak();
              safeSpeak('Fantastiskt! Du är på en vinnande rad!');
              setShowStreakBurst(true);
              setTimeout(() => setShowStreakBurst(false), 2000);
            } else if (newStreak >= 3) {
              safeSpeak('Fantastiskt! Du är på en vinnande rad!');
              setShowStreakBurst(true);
              setTimeout(() => setShowStreakBurst(false), 2000);
            } else {
              safeSpeak('Perfekt!');
            }
          }, 1000);
          
          return newStreak;
        });
        
        burstConfetti();
        updateStars(1);
        setCards(prev => prev.map(c => 
          c.id === first || c.id === second ? { ...c, isMatched: true } : c
        ));
        setMatchedPairs(p => p + 1);
        setFlippedCards([]);
      } else {
        // No match - check if it was a "fair" mistake
        const missedMatch = seenEmojis.has(firstCard!.emoji) || seenEmojis.has(secondCard!.emoji);
        
        if (missedMatch) {
          setStreak(0); // They forgot where a card was!
        }
        
        // Add these to seen
        setSeenEmojis(prev => new Set(prev).add(firstCard!.emoji).add(secondCard!.emoji));

        setTimeout(() => safeSpeak('Försök igen!'), 1000);
        setCards(prev => prev.map(c => 
          c.id === first || c.id === second ? { ...c, isFlipped: true, shake: true } : c
        ));
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === first || c.id === second ? { ...c, isFlipped: false, shake: false } : c
          ));
          setFlippedCards([]);
        }, 1200);
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
      const stars = moves <= Math.ceil(level.pairs * 1.5) ? 3 : moves <= Math.ceil(level.pairs * 2.5) ? 2 : 1;
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
    const stars = moves <= Math.ceil(level.pairs * 1.5) ? 3 : moves <= Math.ceil(level.pairs * 2.5) ? 2 : 1;

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
            🏠 ALLA NIVÅER
          </Button>
          <Button variant="primary" size="lg" onClick={() => startLevel(selectedLevel)}>
            🔄 SPELA IGEN
          </Button>
          {selectedLevel < 20 && (
            <Button variant="accent" size="lg" onClick={() => startLevel(selectedLevel + 1)}>
              ⭐ NÄSTA NIVÅ →
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
      <div className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl shadow-sm mb-2 z-10 border border-white/20 shrink-0">
        <button 
          onClick={() => setGameState('selecting')} 
          className="text-3xl hover:scale-110 transition-transform shrink-0 active:scale-95"
        >
          ←
        </button>
        <h2 
          className="flex-1 min-w-0 text-center text-base md:text-2xl font-black tracking-tight truncate" 
          style={{ color: 'var(--primary-color)' }}
        >
          Nivå {selectedLevel} — {level.name}
        </h2>
        <div className="flex items-center gap-2 shrink-0">
          {/* Mute button */}
          <button
            onClick={toggleMute}
            className={`text-xl hover:scale-110 transition-all ${isMuted ? 'opacity-40' : ''}`}
            title={isMuted ? 'Slå på ljud' : 'Stäng av ljud'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          
          {/* Moves counter */}
          <div className="text-lg font-black">🎯 {moves}</div>
          
          {/* Matched pairs */}
          <div className="text-lg font-black text-yellow-600">✅ {matchedPairs}/{level.pairs}</div>
          
          {/* Streak indicator */}
          {streak >= 3 && (
            <div className="text-sm font-black text-orange-500 flex items-center gap-1 animate-bounce">
              🔥 {streak}
            </div>
          )}
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
              className={`aspect-square rounded-2xl md:rounded-3xl text-4xl md:text-5xl lg:text-6xl flex items-center justify-center transition-all duration-300 relative overflow-hidden group card-button ${
                card.isFlipped || card.isMatched
                  ? 'card-flipped shadow-lg card-flip'
                  : 'card-unflipped shadow-md hover:shadow-xl active:scale-95'
              } ${card.isMatched ? 'card-matched opacity-80' : ''} ${card.shake ? 'animate-shake-card' : ''}`}
            >
              {/* Card back pattern */}
              {!card.isFlipped && !card.isMatched && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full relative border-4 border-white/20 rounded-2xl md:rounded-3xl flex items-center justify-center">
                    <div className="text-4xl md:text-5xl opacity-80 drop-shadow-md">
                      🎴
                    </div>
                  </div>
                </div>
              )}
              
              {/* Card front (emoji) */}
              {(card.isFlipped || card.isMatched) && (
                <div className={`relative z-10 ${card.isMatched ? 'animate-bounce-celebrate' : 'animate-flip-reveal'}`}>
                  <div className="relative drop-shadow-xl">
                    {card.emoji}
                  </div>
                </div>
              )}

              {/* Matched overlay */}
              {card.isMatched && (
                <div className="absolute inset-0 card-matched-overlay rounded-2xl md:rounded-3xl" />
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
          animation: cardFlip 0.3s ease-out;
        }

        @keyframes flipReveal {
          0% { transform: scale(0) rotateY(180deg); opacity: 0; }
          50% { transform: scale(1.1) rotateY(180deg); opacity: 1; }
          100% { transform: scale(1) rotateY(180deg); opacity: 1; }
        }
        .animate-flip-reveal {
          animation: flipReveal 0.3s ease-out;
        }

        @keyframes bounceCelebrate {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        .animate-bounce-celebrate {
          animation: bounceCelebrate 0.5s ease-out;
        }

        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateY(10px) scale(0.9);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        .grid > button {
          animation: slideIn 0.3s ease-out backwards;
        }

        @keyframes shakeCard {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-5px) rotate(-2deg); }
          75% { transform: translateX(5px) rotate(2deg); }
        }
        .animate-shake-card {
          animation: shakeCard 0.3s ease-in-out;
        }

        @keyframes streakBurst {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.3) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 0; }
        }
        .animate-streak-burst {
          animation: streakBurst 1.5s ease-out;
        }

        /* Theme-specific card styles */
        /* Unicorn Theme - Pink/Purple/Magical */
        [data-theme="unicorn"] .card-unflipped {
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f472b6 100%);
          border: 3px solid rgba(255,255,255,0.5);
        }
        [data-theme="unicorn"] .card-flipped {
          background: linear-gradient(135deg, #ffffff 0%, #ddd6fe 50%, #fae8ff 100%);
          border: 4px solid #FFD700;
        }
        [data-theme="unicorn"] .card-matched-overlay {
          background: linear-gradient(135deg, rgba(74, 222, 128, 0.3) 0%, rgba(251, 191, 36, 0.3) 50%, rgba(16, 185, 129, 0.3) 100%);
        }

        /* Hero Theme - Teal/Cyan/Blue */
        [data-theme="hero"] .card-unflipped {
          background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #3b82f6 100%);
          border: 3px solid rgba(255,255,255,0.5);
        }
        [data-theme="hero"] .card-flipped {
          background: linear-gradient(135deg, #ffffff 0%, #cffafe 50%, #ccfbf1 100%);
          border: 4px solid #10B981;
        }
        [data-theme="hero"] .card-matched-overlay {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(20, 184, 166, 0.3) 50%, rgba(6, 182, 212, 0.3) 100%);
        }
      `}</style>
    </div>
  );
};

export default MemoryGame;
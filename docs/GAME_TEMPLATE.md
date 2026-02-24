# 🎮 Spelmall - Kopiera och anpassa

## Steg 1: Skapa speldata (`src/data/yourGameLevels.ts`)

```typescript
import type { GameDefinition, YourGameLevel } from '../types';

// Om du behöver en ny nivåtyp, lägg först till den i src/types.ts:
// export interface YourGameLevel extends BaseGameLevel {
//   yourProperty: string;
//   anotherProperty: number;
// }

const levels: YourGameLevel[] = [
  { id: 1, name: 'Nivå 1', badge: '🌟', /* dina properties */ },
  { id: 2, name: 'Nivå 2', badge: '⭐', /* dina properties */ },
  // ... upp till 20 nivåer rekommenderas
];

export const yourGame: GameDefinition<YourGameLevel> = {
  id: 'your-game-id',                    // Unikt ID (lowercase, inga mellanslag)
  name: 'Ditt Spelnamn',                 // Visningsnamn
  icon: '🎮',                            // Emoji-ikon
  description: 'Kort beskrivning!',      // Visas på spelkortet
  route: '/spel/ditt-spelnamn',         // URL-sökväg
  illustration: 'YourGameCardIllustration', // Komponentnamn
  badge: 'Ny!',                          // Valfri: 'Ny!', 'Populärt!', etc.
  levels
};

export default yourGame;
```

## Steg 2: Skapa spelkomponent (`src/pages/YourGame.tsx`)

```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import { useSpeech } from '../contexts/SpeechContext';
import { useSettings } from '../contexts/SettingsContext';
import LevelSelector from '../components/LevelSelector';
import Button from '../components/Button';
import { yourGame } from '../data/yourGameLevels';

const YourGame: React.FC = () => {
  const navigate = useNavigate();
  const { 
    activeProfile, 
    updateStars, 
    completeLevel, 
    isLevelUnlocked, 
    isLevelCompleted, 
    getLevelStars 
  } = useProfile();
  const { speak, stop } = useSpeech();
  const { isGameFullyUnlocked } = useSettings();

  const [gameState, setGameState] = useState<'selecting' | 'playing' | 'complete'>('selecting');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [correctCount, setCorrectCount] = useState(0);

  // Definiera nivågrupper (4 grupper med 5 nivåer vardera)
  const levelGroups = [
    { 
      title: '🌱 Nybörjare', 
      subtitle: 'Enkla utmaningar', 
      levels: yourGame.levels.slice(0, 5), 
      color: 'from-green-400 to-emerald-500', 
      borderColor: 'border-green-300/40' 
    },
    { 
      title: '📚 Mellannivå', 
      subtitle: 'Lite svårare', 
      levels: yourGame.levels.slice(5, 10), 
      color: 'from-blue-400 to-indigo-500', 
      borderColor: 'border-blue-300/40' 
    },
    { 
      title: '🔥 Utmanare', 
      subtitle: 'Riktigt knepigt', 
      levels: yourGame.levels.slice(10, 15), 
      color: 'from-orange-400 to-red-500', 
      borderColor: 'border-orange-300/40' 
    },
    { 
      title: '👑 Mästare', 
      subtitle: 'För experter', 
      levels: yourGame.levels.slice(15, 20), 
      color: 'from-purple-500 to-pink-500', 
      borderColor: 'border-purple-300/40' 
    },
  ];

  // Ikoner för varje nivå
  const levelIcons: Record<number, string> = {
    1: '🌱', 2: '☀️', 3: '🦋', 4: '🐾', 5: '🌈',
    6: '🚀', 7: '🌊', 8: '🍎', 9: '🌿', 10: '✨',
    11: '🔥', 12: '💐', 13: '🏰', 14: '🎪', 15: '🐉',
    16: '⚡', 17: '🏆', 18: '👑', 19: '💎', 20: '🌟',
  };

  const startLevel = (levelId: number) => {
    setSelectedLevel(levelId);
    setCorrectCount(0);
    setGameState('playing');
  };

  // ─── LEVEL SELECTION ───
  if (gameState === 'selecting') {
    return (
      <LevelSelector
        gameId="your-game-id"
        gameName="Ditt Spelnamn"
        levelGroups={levelGroups}
        levelIcons={levelIcons}
        isLevelUnlocked={isLevelUnlocked}
        isLevelCompleted={isLevelCompleted}
        getLevelStars={getLevelStars}
        isFullyUnlocked={isGameFullyUnlocked('your-game-id')}
        onLevelSelect={startLevel}
        onBack={() => navigate('/dashboard')}
      />
    );
  }

  // ─── GAME COMPLETE ───
  if (gameState === 'complete') {
    const stars = correctCount >= 10 ? 3 : correctCount >= 7 ? 2 : correctCount >= 5 ? 1 : 0;
    
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-8"
        style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
      >
        <div className="text-8xl mb-4">{stars >= 2 ? '🎉' : '👏'}</div>
        <h2 className="text-5xl font-black">
          {stars >= 2 ? 'BRA JOBBAT!' : 'BRA FÖRSÖK!'}
        </h2>
        <div className="text-3xl font-bold opacity-70">
          Du fick {correctCount} rätt!
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <span 
              key={s} 
              className={`text-5xl ${s <= stars ? 'animate-bounce' : 'opacity-20'}`} 
              style={{ animationDelay: `${s * 0.15}s` }}
            >
              ⭐
            </span>
          ))}
        </div>
        <div className="pt-6 flex gap-4">
          <Button variant="secondary" size="lg" onClick={() => setGameState('selecting')}>
            ALLA NIVÅER
          </Button>
          <Button variant="primary" size="lg" onClick={() => startLevel(selectedLevel)}>
            SPELA IGEN
          </Button>
          {stars > 0 && selectedLevel < 20 && (
            <Button variant="accent" size="lg" onClick={() => startLevel(selectedLevel + 1)}>
              NÄSTA NIVÅ →
            </Button>
          )}
        </div>
      </div>
    );
  }

  // ─── PLAYING ───
  const level = yourGame.levels.find(l => l.id === selectedLevel)!;

  return (
    <div 
      className="min-h-screen p-6 flex flex-col"
      style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
    >
      {/* HUD */}
      <div className="relative flex items-center px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl shadow-sm mb-2 z-10 border border-white/20">
        <button 
          onClick={() => setGameState('selecting')} 
          className="text-3xl hover:scale-110 transition-transform z-10"
        >
          ←
        </button>
        <h2 
          className="absolute inset-0 flex items-center justify-center text-xl md:text-2xl font-black tracking-tight pointer-events-none" 
          style={{ color: 'var(--primary-color)' }}
        >
          Nivå {selectedLevel} — {level.name}
        </h2>
        <div className="flex-1" />
        <div className="flex items-center gap-2 z-10">
          <div className="text-lg font-black text-yellow-600">
            ⭐ {correctCount}
          </div>
        </div>
      </div>

      {/* Din spellogik här */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Implementera din spellogik här!</h1>
          <p className="text-xl opacity-70">Nivå {selectedLevel}</p>
          
          {/* Exempel: När spelaren lyckas */}
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => {
              updateStars(1);
              setCorrectCount(c => c + 1);
              // När alla frågor är klara:
              setGameState('complete');
            }}
          >
            Simulera rätt svar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default YourGame;
```

## 📝 Checklista

Innan du skickar in din PR:

- [ ] Speldata definierad i `src/data/`
- [ ] Spelkomponent skapad i `src/pages/`
- [ ] Illustration tillagd i `src/components/GameCardIllustration.tsx`
- [ ] Spel registrerat i `src/data/gameRegistry.ts`
- [ ] Route tillagd i `src/App.tsx`
- [ ] Testat alla nivåer
- [ ] Testat båda teman (Enhörning & Hjälte)
- [ ] Testat på mobil och desktop
- [ ] Text-till-tal fungerar (om relevant)
- [ ] Framsteg sparas korrekt

## 🎯 Exempel: Komplett Memory-spel

Se `docs/examples/MemoryGameExample.tsx` för ett komplett exempel.

# 🎮 Guide: Lägga till ett nytt spel

Denna guide visar hur du enkelt lägger till ett nytt spel i Lär med Nadira.

## 📋 Översikt

Att lägga till ett nytt spel kräver 5 enkla steg:

1. Definiera speldata och nivåer
2. Skapa spelkomponenten
3. Lägg till illustration för spelkortet
4. Registrera spelet
5. Lägg till route

## 🚀 Steg-för-steg

### Steg 1: Definiera speldata

Skapa en ny fil i `src/data/` för ditt spel (t.ex. `memoryLevels.ts`):

```typescript
import type { GameDefinition, MemoryGameLevel } from '../types';

const levels: MemoryGameLevel[] = [
  { id: 1, name: 'Enkla par', pairs: 4, theme: 'animals', badge: '🐶' },
  { id: 2, name: 'Fler par', pairs: 6, theme: 'animals', badge: '🐱' },
  // ... lägg till fler nivåer
];

export const memoryGame: GameDefinition<MemoryGameLevel> = {
  id: 'memory',
  name: 'Minnes-Mästaren',                   // Namn som visas i UI
  icon: '🧠',                                // Emoji för spelet
  description: 'Hitta matchande par!',      // Kort beskrivning
  route: '/spel/minnes-mastaren',           // URL-sökväg
  illustration: 'MemoryCardIllustration',   // Komponentnamn för kortet
  badge: 'Ny!',                             // Valfri badge (Ny!, Populärt!, etc.)
  levels
};

export default memoryGame;
```

**Om ditt spel behöver en ny nivåtyp:**

Lägg till den i `src/types.ts`:

```typescript
export interface MemoryGameLevel extends BaseGameLevel {
  pairs: number;
  theme: string;
}

// Uppdatera union type
export type GameLevel = SpellingGameLevel | MathGameLevel | MemoryGameLevel;
```

### Steg 2: Skapa spelkomponenten

Skapa en ny fil i `src/pages/` (t.ex. `MemoryGame.tsx`):

```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import { useSpeech } from '../contexts/SpeechContext';
import { useSettings } from '../contexts/SettingsContext';
import LevelSelector from '../components/LevelSelector';
import Button from '../components/Button';
import { memoryGame } from '../data/memoryLevels';

const MemoryGame: React.FC = () => {
  const navigate = useNavigate();
  const { activeProfile, updateStars, completeLevel, isLevelUnlocked, isLevelCompleted, getLevelStars } = useProfile();
  const { speak } = useSpeech();
  const { isGameFullyUnlocked } = useSettings();

  const [gameState, setGameState] = useState<'selecting' | 'playing' | 'complete'>('selecting');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [firstAttemptCorrect, setFirstAttemptCorrect] = useState(0);
  const [hasAttempted, setHasAttempted] = useState(false);

  // Define level groups for the selector
  const levelGroups = [
    { 
      title: '🐾 Djur', 
      subtitle: 'Hitta djurpar', 
      levels: memoryGame.levels.slice(0, 5), 
      color: 'from-green-400 to-emerald-500', 
      borderColor: 'border-green-300/40' 
    },
    // ... fler grupper
  ];

  const levelIcons: Record<number, string> = {
    1: '🐶', 2: '🐱', 3: '🐭', // etc.
  };

  const startLevel = (levelId: number) => {
    setSelectedLevel(levelId);
    setFirstAttemptCorrect(0);
    setHasAttempted(false);
    setGameState('playing');
  };

  // Save completion when game state changes to complete
  useEffect(() => {
    if (gameState === 'complete') {
      const stars = firstAttemptCorrect >= 10 ? 3 : firstAttemptCorrect >= 7 ? 2 : firstAttemptCorrect >= 5 ? 1 : 0;
      completeLevel('memory', selectedLevel, stars);
    }
  }, [gameState]);

  // Level selection screen
  if (gameState === 'selecting') {
    return (
      <LevelSelector
        gameId="memory"
        gameName="Minnes-Magi"
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

  // Game completion screen
  if (gameState === 'complete') {
    const stars = firstAttemptCorrect >= 10 ? 3 : firstAttemptCorrect >= 7 ? 2 : firstAttemptCorrect >= 5 ? 1 : 0;
    
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="text-8xl mb-4">🎉</div>
        <h2 className="text-5xl font-black">BRA JOBBAT!</h2>
        <div className="text-3xl font-bold opacity-70">
          Du fick {firstAttemptCorrect} av 10 rätt på första försöket!
        </div>
        <div className="flex gap-2 my-4">
          {[1, 2, 3].map(s => (
            <span key={s} className={`text-5xl ${s <= stars ? 'animate-bounce' : 'opacity-20'}`}>⭐</span>
          ))}
        </div>
        <div className="pt-6 flex gap-4">
          <Button variant="secondary" size="lg" onClick={() => setGameState('selecting')}>
            ALLA NIVÅER
          </Button>
          <Button variant="primary" size="lg" onClick={() => startLevel(selectedLevel)}>
            SPELA IGEN
          </Button>
        </div>
      </div>
    );
  }

  // Playing screen - implement your game logic here
  return (
    <div className="min-h-screen p-6" style={{ background: 'var(--bg-gradient, var(--bg-color))' }}>
      {/* Your game UI here */}
      <h1>Memory Game - Level {selectedLevel}</h1>
      {/* ... */}
    </div>
  );
};

export default MemoryGame;
```

### Steg 3: Lägg till illustration

I `src/components/GameCardIllustration.tsx`, lägg till din illustration:

```typescript
export const MemoryCardIllustration: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <svg viewBox="0 0 100 100" fill="none">
      {/* Din SVG-illustration här */}
      <circle cx="50" cy="50" r="40" fill="var(--primary-color)" opacity="0.2" />
      <text x="50" y="60" fontSize="40" textAnchor="middle">🧠</text>
    </svg>
  </div>
);
```

### Steg 4: Registrera spelet

Öppna `src/data/gameRegistry.ts` och lägg till ditt spel:

```typescript
import { memoryGame } from './memoryLevels';

export const GAMES: GameDefinition[] = [
  { ...abcGame, /* ... */ },
  { ...mathGame, /* ... */ },
  { ...memoryGame, /* ... */ },  // ← Lägg till här!
];
```

### Steg 5: Lägg till route

I `src/App.tsx`, lägg till routen:

```typescript
import MemoryGame from './pages/MemoryGame';

// I Routes-komponenten:
<Route path="/spel/minnes-mastaren" element={<MemoryGame />} />
```

## ✅ Klart!

Ditt spel visas nu automatiskt på:
- Dashboard (spelkort)
- Samlingssidan (märkessamling)
- Bottom navigation (om relevant)

## 🎨 Designriktlinjer

### Färgscheman per svårighetsgrad

Använd dessa färgscheman för konsekvens:

- **Nybörjare**: `from-green-400 to-emerald-500` / `border-green-300/40`
- **Mellannivå**: `from-blue-400 to-indigo-500` / `border-blue-300/40`
- **Utmanare**: `from-orange-400 to-red-500` / `border-orange-300/40`
- **Mästare**: `from-purple-500 to-pink-500` / `border-purple-300/40`

### Stjärnsystem

Använd samma stjärnsystem för konsekvens (baserat på första försökets noggrannhet):
- 3 stjärnor: 10/10 rätt på första försöket
- 2 stjärnor: 7-9/10 rätt på första försöket
- 1 stjärna: 5-6/10 rätt på första försöket
- 0 stjärnor: <5/10 rätt på första försöket

**Viktigt**: Spåra `firstAttemptCorrect` separat från `correctCount` för att belöna noggrannhet!

### Märken (Badges)

Varje nivå ska ha ett unikt emoji-märke som barn kan samla.

## 🧪 Testning

Innan du skickar in din PR, testa:

1. Alla nivåer kan spelas
2. Stjärnor och märken sparas korrekt
3. Låsmekanismen fungerar
4. Text-till-tal fungerar (om relevant)
5. Båda teman (Enhörning & Hjälte) ser bra ut
6. Responsiv design på mobil och desktop

## 💡 Tips

- Använd `useSpeech()` hook för text-till-tal
- Använd `useProfile()` för att spara framsteg
- Använd `useSettings()` för globala inställningar
- Följ samma UI-mönster som befintliga spel
- Håll spelen enkla och roliga för barn 6-9 år

## 🤝 Behöver hjälp?

Öppna en [GitHub Discussion](https://github.com/asifma/lar-med-nadira/discussions) om du har frågor!

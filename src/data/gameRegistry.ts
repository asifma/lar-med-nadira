import { GameDefinition, SpellingGameLevel, MathGameLevel } from '../types';
import { abcGame } from './abcWords';
import { mathGame } from './mathLevels';
import { memoryGame } from './memoryLevels';

/**
 * GAME REGISTRY
 * 
 * This is the single source of truth for all games in the app.
 * To add a new game:
 * 
 * 1. Create your game data file in src/data/ (e.g., memoryLevels.ts)
 * 2. Create your game page component in src/pages/ (e.g., MemoryGame.tsx)
 * 3. Create your game card illustration in src/components/GameCardIllustration.tsx
 * 4. Import and add your game to the GAMES array below
 * 5. Add the route in src/App.tsx
 * 
 * That's it! The dashboard, collection page, and navigation will automatically update.
 */

export const GAMES: GameDefinition[] = [
  {
    ...abcGame,
    description: 'Lär dig stava roliga ord!',
    route: '/spel/abc-aventyr/',
    illustration: 'AbcCardIllustration',
    badge: 'Populärt!',
  },
  {
    ...mathGame,
    description: 'Räkna, tänk visuellt och samla märken!',
    route: '/spel/matte-magi',
    illustration: 'MathCardIllustration',
    badge: 'Ny!',
  },
  {
    ...memoryGame,
    description: 'Hitta matchande par!',
    route: '/spel/minnes-mastaren',
    illustration: 'MemoryCardIllustration',
    badge: 'Ny!',
  },
  // Add new games here following the same pattern
];

export default GAMES;

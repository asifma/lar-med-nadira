import type { GameDefinition, MemoryGameLevel } from '../types';

const levels: MemoryGameLevel[] = [
  // Beginner levels (1-5)
  { id: 1, name: 'Första paren', pairs: 4, theme: 'animals', badge: '🐶' },
  { id: 2, name: 'Fler djur', pairs: 6, theme: 'animals', badge: '🐱' },
  { id: 3, name: 'Djurparken', pairs: 8, theme: 'animals', badge: '🦁' },
  { id: 4, name: 'Vilda djur', pairs: 10, theme: 'animals', badge: '🐘' },
  { id: 5, name: 'Djurmästare', pairs: 12, theme: 'animals', badge: '🦒' },
  
  // Intermediate levels (6-10)
  { id: 6, name: 'Fruktkorgen', pairs: 4, theme: 'fruits', badge: '🍎' },
  { id: 7, name: 'Fruktfesten', pairs: 6, theme: 'fruits', badge: '🍌' },
  { id: 8, name: 'Fruktsallad', pairs: 8, theme: 'fruits', badge: '🍇' },
  { id: 9, name: 'Fruktmix', pairs: 10, theme: 'fruits', badge: '🍓' },
  { id: 10, name: 'Fruktmästare', pairs: 12, theme: 'fruits', badge: '🍉' },
  
  // Advanced levels (11-15)
  { id: 11, name: 'Fordonsfärden', pairs: 6, theme: 'vehicles', badge: '🚗' },
  { id: 12, name: 'Transportvägen', pairs: 8, theme: 'vehicles', badge: '🚂' },
  { id: 13, name: 'Resan', pairs: 10, theme: 'vehicles', badge: '✈️' },
  { id: 14, name: 'Äventyret', pairs: 12, theme: 'vehicles', badge: '🚀' },
  { id: 15, name: 'Transportmästare', pairs: 14, theme: 'vehicles', badge: '🚁' },
  
  // Master levels (16-20)
  { id: 16, name: 'Emoji-mix 1', pairs: 8, theme: 'mixed', badge: '🎨' },
  { id: 17, name: 'Emoji-mix 2', pairs: 10, theme: 'mixed', badge: '🎭' },
  { id: 18, name: 'Emoji-mix 3', pairs: 12, theme: 'mixed', badge: '🎪' },
  { id: 19, name: 'Emoji-mix 4', pairs: 14, theme: 'mixed', badge: '🎡' },
  { id: 20, name: 'Minnesmästare', pairs: 16, theme: 'mixed', badge: '🏆' },
];

export const memoryGame: GameDefinition<MemoryGameLevel> = {
  id: 'memory',
  name: 'Minnes-Mästaren',
  icon: '🧠',
  description: 'Hitta matchande par!',
  route: '/spel/minnes-mastaren',
  illustration: 'MemoryCardIllustration',
  badge: 'Ny!',
  levels
};

export default memoryGame;

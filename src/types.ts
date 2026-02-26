
export enum ThemeType {
  UNICORN = 'unicorn',
  HERO = 'hero'
}

export interface Word {
  word: string;
  emoji: string;
}

export type PlaceholderMode = 'full' | 'partial' | 'none';

// Base level interface - all games must have these properties
export interface BaseGameLevel {
  id: number;
  name: string;
  badge: string;
}

// Spelling game specific level
export interface SpellingGameLevel extends BaseGameLevel {
  words: Word[];
  placeholderMode: PlaceholderMode;
}

// Math game specific level
export interface MathGameLevel extends BaseGameLevel {
  op: string;
  min: number;
  max: number;
}

// Memory game specific level (for future use)
export interface MemoryGameLevel extends BaseGameLevel {
  pairs: number;
  theme: string;
}

// Puzzle game specific level
export interface PuzzleGameLevel extends BaseGameLevel {
  puzzles: Word[];
}

// Union type for all game levels
export type GameLevel = SpellingGameLevel | MathGameLevel | MemoryGameLevel | PuzzleGameLevel;

// Game definition with metadata
export interface GameDefinition<T extends BaseGameLevel = BaseGameLevel> {
  id: string;
  name: string;
  icon: string;
  description: string;
  route: string;
  illustration: string; // Component name for the card illustration
  badge?: string; // Optional badge text like "Populärt!" or "Ny!"
  levels: T[];
}

export interface CompletedLevel {
  gameId: string;
  levelId: number;
  stars: number;
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  theme: ThemeType;
  stars: number;
  completedLevels: CompletedLevel[];
  unlockedLevels: string[];
  lastPlayed?: string;
  /** @deprecated use completedLevels */
  stickers?: string[];
}

export interface AppSettings {
  adminPin: string;
  speechRate: number;
  autoPlayInstructions: boolean;
  unlockedGames: string[];
}

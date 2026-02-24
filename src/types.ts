
export enum ThemeType {
  UNICORN = 'unicorn',
  HERO = 'hero'
}

export interface Word {
  word: string;
  emoji: string;
}

export type PlaceholderMode = 'full' | 'partial' | 'none';

export interface GameLevel {
  id: number;
  name: string;
  words: Word[];
  placeholderMode: PlaceholderMode;
  badge: string;
}

export interface GameDefinition {
  id: string;
  name: string;
  icon: string;
  levels: GameLevel[];
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

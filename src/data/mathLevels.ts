import type { GameDefinition, MathGameLevel } from '../types';

// Math problems interface
interface MathProblem {
  question: string;
  answer: number;
  a: number;
  b: number;
}

// Static level definitions with predefined problems for kids aged 6-9
const levels: (MathGameLevel & { problems: MathProblem[] })[] = [
  // Addition (1-5) — simple addition within 10
  { 
    id: 1, name: 'Addition 1-5', op: '+', min: 1, max: 5, badge: '🎩', emoji: '🍎',
    problems: [
      { question: '1 + 1', answer: 2, a: 1, b: 1 },
      { question: '2 + 1', answer: 3, a: 2, b: 1 },
      { question: '1 + 2', answer: 3, a: 1, b: 2 },
      { question: '2 + 2', answer: 4, a: 2, b: 2 },
      { question: '3 + 1', answer: 4, a: 3, b: 1 },
      { question: '2 + 3', answer: 5, a: 2, b: 3 },
      { question: '3 + 2', answer: 5, a: 3, b: 2 },
      { question: '4 + 1', answer: 5, a: 4, b: 1 },
      { question: '3 + 3', answer: 6, a: 3, b: 3 },
      { question: '4 + 2', answer: 6, a: 4, b: 2 },
    ]
  },
  { 
    id: 2, name: 'Addition 1-10', op: '+', min: 1, max: 10, badge: '🌟', emoji: '⭐',
    problems: [
      { question: '5 + 2', answer: 7, a: 5, b: 2 },
      { question: '4 + 3', answer: 7, a: 4, b: 3 },
      { question: '5 + 3', answer: 8, a: 5, b: 3 },
      { question: '6 + 2', answer: 8, a: 6, b: 2 },
      { question: '5 + 4', answer: 9, a: 5, b: 4 },
      { question: '6 + 3', answer: 9, a: 6, b: 3 },
      { question: '5 + 5', answer: 10, a: 5, b: 5 },
      { question: '6 + 4', answer: 10, a: 6, b: 4 },
      { question: '7 + 3', answer: 10, a: 7, b: 3 },
      { question: '8 + 2', answer: 10, a: 8, b: 2 },
    ]
  },
  { 
    id: 3, name: 'Addition 10-15', op: '+', min: 1, max: 15, badge: '✨', emoji: '🦋',
    problems: [
      { question: '6 + 5', answer: 11, a: 6, b: 5 },
      { question: '7 + 4', answer: 11, a: 7, b: 4 },
      { question: '6 + 6', answer: 12, a: 6, b: 6 },
      { question: '7 + 5', answer: 12, a: 7, b: 5 },
      { question: '8 + 4', answer: 12, a: 8, b: 4 },
      { question: '7 + 6', answer: 13, a: 7, b: 6 },
      { question: '8 + 5', answer: 13, a: 8, b: 5 },
      { question: '7 + 7', answer: 14, a: 7, b: 7 },
      { question: '8 + 6', answer: 14, a: 8, b: 6 },
      { question: '8 + 7', answer: 15, a: 8, b: 7 },
    ]
  },
  { 
    id: 4, name: 'Addition 10-20', op: '+', min: 1, max: 20, badge: '🎯', emoji: '🎈',
    problems: [
      { question: '9 + 7', answer: 16, a: 9, b: 7 },
      { question: '8 + 8', answer: 16, a: 8, b: 8 },
      { question: '9 + 8', answer: 17, a: 9, b: 8 },
      { question: '9 + 9', answer: 18, a: 9, b: 9 },
      { question: '10 + 8', answer: 18, a: 10, b: 8 },
      { question: '10 + 9', answer: 19, a: 10, b: 9 },
      { question: '11 + 8', answer: 19, a: 11, b: 8 },
      { question: '10 + 10', answer: 20, a: 10, b: 10 },
      { question: '11 + 9', answer: 20, a: 11, b: 9 },
      { question: '12 + 8', answer: 20, a: 12, b: 8 },
    ]
  },
  { 
    id: 5, name: 'Addition Mästare', op: '+', min: 1, max: 20, badge: '🏅', emoji: '🍬',
    problems: [
      { question: '13 + 7', answer: 20, a: 13, b: 7 },
      { question: '12 + 9', answer: 21, a: 12, b: 9 },
      { question: '14 + 8', answer: 22, a: 14, b: 8 },
      { question: '15 + 8', answer: 23, a: 15, b: 8 },
      { question: '13 + 10', answer: 23, a: 13, b: 10 },
      { question: '14 + 10', answer: 24, a: 14, b: 10 },
      { question: '15 + 10', answer: 25, a: 15, b: 10 },
      { question: '16 + 9', answer: 25, a: 16, b: 9 },
      { question: '17 + 9', answer: 26, a: 17, b: 9 },
      { question: '18 + 10', answer: 28, a: 18, b: 10 },
    ]
  },

  // Subtraction (6-10) — simple subtraction
  { 
    id: 6, name: 'Subtraktion 1-5', op: '-', min: 1, max: 5, badge: '🍏', emoji: '🍪',
    problems: [
      { question: '2 - 1', answer: 1, a: 2, b: 1 },
      { question: '3 - 1', answer: 2, a: 3, b: 1 },
      { question: '3 - 2', answer: 1, a: 3, b: 2 },
      { question: '4 - 1', answer: 3, a: 4, b: 1 },
      { question: '4 - 2', answer: 2, a: 4, b: 2 },
      { question: '5 - 1', answer: 4, a: 5, b: 1 },
      { question: '5 - 2', answer: 3, a: 5, b: 2 },
      { question: '5 - 3', answer: 2, a: 5, b: 3 },
      { question: '4 - 3', answer: 1, a: 4, b: 3 },
      { question: '5 - 4', answer: 1, a: 5, b: 4 },
    ]
  },
  { 
    id: 7, name: 'Subtraktion 1-10', op: '-', min: 1, max: 10, badge: '🍎', emoji: '🧁',
    problems: [
      { question: '6 - 2', answer: 4, a: 6, b: 2 },
      { question: '7 - 3', answer: 4, a: 7, b: 3 },
      { question: '8 - 3', answer: 5, a: 8, b: 3 },
      { question: '7 - 2', answer: 5, a: 7, b: 2 },
      { question: '8 - 2', answer: 6, a: 8, b: 2 },
      { question: '9 - 3', answer: 6, a: 9, b: 3 },
      { question: '10 - 3', answer: 7, a: 10, b: 3 },
      { question: '9 - 2', answer: 7, a: 9, b: 2 },
      { question: '10 - 2', answer: 8, a: 10, b: 2 },
      { question: '10 - 1', answer: 9, a: 10, b: 1 },
    ]
  },
  { 
    id: 8, name: 'Subtraktion 10-15', op: '-', min: 1, max: 15, badge: '🍐', emoji: '🐟',
    problems: [
      { question: '11 - 3', answer: 8, a: 11, b: 3 },
      { question: '12 - 4', answer: 8, a: 12, b: 4 },
      { question: '11 - 2', answer: 9, a: 11, b: 2 },
      { question: '12 - 3', answer: 9, a: 12, b: 3 },
      { question: '13 - 3', answer: 10, a: 13, b: 3 },
      { question: '12 - 2', answer: 10, a: 12, b: 2 },
      { question: '14 - 3', answer: 11, a: 14, b: 3 },
      { question: '13 - 2', answer: 11, a: 13, b: 2 },
      { question: '15 - 3', answer: 12, a: 15, b: 3 },
      { question: '14 - 2', answer: 12, a: 14, b: 2 },
    ]
  },
  { 
    id: 9, name: 'Subtraktion 10-20', op: '-', min: 1, max: 20, badge: '🍊', emoji: '🎁',
    problems: [
      { question: '15 - 4', answer: 11, a: 15, b: 4 },
      { question: '16 - 4', answer: 12, a: 16, b: 4 },
      { question: '17 - 5', answer: 12, a: 17, b: 5 },
      { question: '16 - 3', answer: 13, a: 16, b: 3 },
      { question: '18 - 4', answer: 14, a: 18, b: 4 },
      { question: '17 - 3', answer: 14, a: 17, b: 3 },
      { question: '18 - 3', answer: 15, a: 18, b: 3 },
      { question: '19 - 4', answer: 15, a: 19, b: 4 },
      { question: '20 - 4', answer: 16, a: 20, b: 4 },
      { question: '20 - 3', answer: 17, a: 20, b: 3 },
    ]
  },
  { 
    id: 10, name: 'Subtraktion Mästare', op: '-', min: 1, max: 20, badge: '🍌', emoji: '🍩',
    problems: [
      { question: '20 - 5', answer: 15, a: 20, b: 5 },
      { question: '19 - 3', answer: 16, a: 19, b: 3 },
      { question: '20 - 2', answer: 18, a: 20, b: 2 },
      { question: '18 - 2', answer: 16, a: 18, b: 2 },
      { question: '19 - 2', answer: 17, a: 19, b: 2 },
      { question: '17 - 2', answer: 15, a: 17, b: 2 },
      { question: '16 - 2', answer: 14, a: 16, b: 2 },
      { question: '15 - 2', answer: 13, a: 15, b: 2 },
      { question: '14 - 1', answer: 13, a: 14, b: 1 },
      { question: '13 - 1', answer: 12, a: 13, b: 1 },
    ]
  },

  // Multiplication (11-15) — times tables for kids
  { 
    id: 11, name: 'Multiplikation 1-2', op: '×', min: 1, max: 3, badge: '🔢', emoji: '🐝',
    problems: [
      { question: '1 × 1', answer: 1, a: 1, b: 1 },
      { question: '1 × 2', answer: 2, a: 1, b: 2 },
      { question: '2 × 1', answer: 2, a: 2, b: 1 },
      { question: '2 × 2', answer: 4, a: 2, b: 2 },
      { question: '1 × 3', answer: 3, a: 1, b: 3 },
      { question: '3 × 1', answer: 3, a: 3, b: 1 },
      { question: '2 × 3', answer: 6, a: 2, b: 3 },
      { question: '3 × 2', answer: 6, a: 3, b: 2 },
      { question: '3 × 3', answer: 9, a: 3, b: 3 },
      { question: '2 × 4', answer: 8, a: 2, b: 4 },
    ]
  },
  { 
    id: 12, name: 'Multiplikation 2-5', op: '×', min: 1, max: 5, badge: '🔢', emoji: '🌺',
    problems: [
      { question: '4 × 2', answer: 8, a: 4, b: 2 },
      { question: '3 × 4', answer: 12, a: 3, b: 4 },
      { question: '4 × 3', answer: 12, a: 4, b: 3 },
      { question: '5 × 2', answer: 10, a: 5, b: 2 },
      { question: '2 × 5', answer: 10, a: 2, b: 5 },
      { question: '4 × 4', answer: 16, a: 4, b: 4 },
      { question: '5 × 3', answer: 15, a: 5, b: 3 },
      { question: '3 × 5', answer: 15, a: 3, b: 5 },
      { question: '5 × 4', answer: 20, a: 5, b: 4 },
      { question: '4 × 5', answer: 20, a: 4, b: 5 },
    ]
  },
  { 
    id: 13, name: 'Multiplikation 5-10', op: '×', min: 1, max: 10, badge: '✖️', emoji: '🚀',
    problems: [
      { question: '5 × 5', answer: 25, a: 5, b: 5 },
      { question: '6 × 3', answer: 18, a: 6, b: 3 },
      { question: '3 × 6', answer: 18, a: 3, b: 6 },
      { question: '6 × 4', answer: 24, a: 6, b: 4 },
      { question: '4 × 6', answer: 24, a: 4, b: 6 },
      { question: '5 × 6', answer: 30, a: 5, b: 6 },
      { question: '6 × 5', answer: 30, a: 6, b: 5 },
      { question: '7 × 4', answer: 28, a: 7, b: 4 },
      { question: '4 × 7', answer: 28, a: 4, b: 7 },
      { question: '6 × 6', answer: 36, a: 6, b: 6 },
    ]
  },
  { 
    id: 14, name: 'Multiplikation 10+', op: '×', min: 1, max: 12, badge: '🔥', emoji: '💎',
    problems: [
      { question: '7 × 5', answer: 35, a: 7, b: 5 },
      { question: '5 × 7', answer: 35, a: 5, b: 7 },
      { question: '8 × 5', answer: 40, a: 8, b: 5 },
      { question: '5 × 8', answer: 40, a: 5, b: 8 },
      { question: '7 × 6', answer: 42, a: 7, b: 6 },
      { question: '6 × 7', answer: 42, a: 6, b: 7 },
      { question: '8 × 6', answer: 48, a: 8, b: 6 },
      { question: '6 × 8', answer: 48, a: 6, b: 8 },
      { question: '7 × 7', answer: 49, a: 7, b: 7 },
      { question: '9 × 6', answer: 54, a: 9, b: 6 },
    ]
  },
  { 
    id: 15, name: 'Multiplikation Expert', op: '×', min: 1, max: 15, badge: '🏆', emoji: '🦄',
    problems: [
      { question: '8 × 7', answer: 56, a: 8, b: 7 },
      { question: '7 × 8', answer: 56, a: 7, b: 8 },
      { question: '9 × 7', answer: 63, a: 9, b: 7 },
      { question: '7 × 9', answer: 63, a: 7, b: 9 },
      { question: '8 × 8', answer: 64, a: 8, b: 8 },
      { question: '9 × 8', answer: 72, a: 9, b: 8 },
      { question: '8 × 9', answer: 72, a: 8, b: 9 },
      { question: '9 × 9', answer: 81, a: 9, b: 9 },
      { question: '10 × 9', answer: 90, a: 10, b: 9 },
      { question: '10 × 10', answer: 100, a: 10, b: 10 },
    ]
  },

  // Division (16-20) — simple division
  { 
    id: 16, name: 'Division 1-5', op: '÷', min: 1, max: 5, badge: '🔁', emoji: '🍕',
    problems: [
      { question: '2 ÷ 1', answer: 2, a: 2, b: 1 },
      { question: '4 ÷ 2', answer: 2, a: 4, b: 2 },
      { question: '6 ÷ 2', answer: 3, a: 6, b: 2 },
      { question: '6 ÷ 3', answer: 2, a: 6, b: 3 },
      { question: '8 ÷ 2', answer: 4, a: 8, b: 2 },
      { question: '9 ÷ 3', answer: 3, a: 9, b: 3 },
      { question: '10 ÷ 2', answer: 5, a: 10, b: 2 },
      { question: '12 ÷ 3', answer: 4, a: 12, b: 3 },
      { question: '12 ÷ 4', answer: 3, a: 12, b: 4 },
      { question: '15 ÷ 3', answer: 5, a: 15, b: 3 },
    ]
  },
  { 
    id: 17, name: 'Division 5-10', op: '÷', min: 1, max: 10, badge: '🔄', emoji: '🍰',
    problems: [
      { question: '10 ÷ 5', answer: 2, a: 10, b: 5 },
      { question: '15 ÷ 5', answer: 3, a: 15, b: 5 },
      { question: '16 ÷ 4', answer: 4, a: 16, b: 4 },
      { question: '18 ÷ 3', answer: 6, a: 18, b: 3 },
      { question: '20 ÷ 4', answer: 5, a: 20, b: 4 },
      { question: '20 ÷ 5', answer: 4, a: 20, b: 5 },
      { question: '24 ÷ 4', answer: 6, a: 24, b: 4 },
      { question: '25 ÷ 5', answer: 5, a: 25, b: 5 },
      { question: '18 ÷ 6', answer: 3, a: 18, b: 6 },
      { question: '24 ÷ 6', answer: 4, a: 24, b: 6 },
    ]
  },
  { 
    id: 18, name: 'Division 10-20', op: '÷', min: 1, max: 20, badge: '⚖️', emoji: '🍫',
    problems: [
      { question: '28 ÷ 4', answer: 7, a: 28, b: 4 },
      { question: '30 ÷ 5', answer: 6, a: 30, b: 5 },
      { question: '32 ÷ 4', answer: 8, a: 32, b: 4 },
      { question: '35 ÷ 5', answer: 7, a: 35, b: 5 },
      { question: '36 ÷ 6', answer: 6, a: 36, b: 6 },
      { question: '40 ÷ 5', answer: 8, a: 40, b: 5 },
      { question: '42 ÷ 6', answer: 7, a: 42, b: 6 },
      { question: '45 ÷ 5', answer: 9, a: 45, b: 5 },
      { question: '48 ÷ 6', answer: 8, a: 48, b: 6 },
      { question: '50 ÷ 5', answer: 10, a: 50, b: 5 },
    ]
  },
  { 
    id: 19, name: 'Division 20+', op: '÷', min: 1, max: 20, badge: '🧮', emoji: '🎲',
    problems: [
      { question: '54 ÷ 6', answer: 9, a: 54, b: 6 },
      { question: '56 ÷ 7', answer: 8, a: 56, b: 7 },
      { question: '63 ÷ 7', answer: 9, a: 63, b: 7 },
      { question: '64 ÷ 8', answer: 8, a: 64, b: 8 },
      { question: '72 ÷ 8', answer: 9, a: 72, b: 8 },
      { question: '72 ÷ 9', answer: 8, a: 72, b: 9 },
      { question: '81 ÷ 9', answer: 9, a: 81, b: 9 },
      { question: '80 ÷ 10', answer: 8, a: 80, b: 10 },
      { question: '90 ÷ 10', answer: 9, a: 90, b: 10 },
      { question: '100 ÷ 10', answer: 10, a: 100, b: 10 },
    ]
  },
  { 
    id: 20, name: 'Division Mästare', op: '÷', min: 1, max: 20, badge: '🌈', emoji: '🌈',
    problems: [
      { question: '60 ÷ 6', answer: 10, a: 60, b: 6 },
      { question: '70 ÷ 7', answer: 10, a: 70, b: 7 },
      { question: '80 ÷ 8', answer: 10, a: 80, b: 8 },
      { question: '90 ÷ 9', answer: 10, a: 90, b: 9 },
      { question: '77 ÷ 7', answer: 11, a: 77, b: 7 },
      { question: '88 ÷ 8', answer: 11, a: 88, b: 8 },
      { question: '84 ÷ 7', answer: 12, a: 84, b: 7 },
      { question: '96 ÷ 8', answer: 12, a: 96, b: 8 },
      { question: '108 ÷ 9', answer: 12, a: 108, b: 9 },
      { question: '120 ÷ 10', answer: 12, a: 120, b: 10 },
    ]
  },
];

export const mathGame: GameDefinition<MathGameLevel & { problems: MathProblem[] }> = {
  id: 'math',
  name: 'Matte-Magi',
  icon: '➗',
  description: 'Räkna, tänk visuellt och samla märken!',
  route: '/spel/matte-magi',
  illustration: 'MathCardIllustration',
  levels
};

export default mathGame;

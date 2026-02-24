// Static level definitions for Matte Magi with per-level badges and increasing difficulty
const levels = [
  // Addition (1-5) — progressively increasing max
  { id: 1, name: 'Addition 1', op: '+', min: 1, max: 5, badge: '🌱' },
  { id: 2, name: 'Addition 2', op: '+', min: 1, max: 8, badge: '🌟' },
  { id: 3, name: 'Addition 3', op: '+', min: 1, max: 12, badge: '✨' },
  { id: 4, name: 'Addition 4', op: '+', min: 1, max: 18, badge: '🎯' },
  { id: 5, name: 'Addition 5', op: '+', min: 1, max: 25, badge: '🏅' },

  // Subtraction (6-10)
  { id: 6, name: 'Subtraktion 1', op: '-', min: 1, max: 6, badge: '🍏' },
  { id: 7, name: 'Subtraktion 2', op: '-', min: 1, max: 10, badge: '🍎' },
  { id: 8, name: 'Subtraktion 3', op: '-', min: 1, max: 14, badge: '🍐' },
  { id: 9, name: 'Subtraktion 4', op: '-', min: 1, max: 20, badge: '🍊' },
  { id: 10, name: 'Subtraktion 5', op: '-', min: 1, max: 28, badge: '🍌' },

  // Multiplication (11-15)
  { id: 11, name: 'Multiplikation 1', op: '×', min: 1, max: 3, badge: '🔢' },
  { id: 12, name: 'Multiplikation 2', op: '×', min: 1, max: 5, badge: '🔢' },
  { id: 13, name: 'Multiplikation 3', op: '×', min: 1, max: 8, badge: '✖️' },
  { id: 14, name: 'Multiplikation 4', op: '×', min: 1, max: 12, badge: '🔥' },
  { id: 15, name: 'Multiplikation 5', op: '×', min: 1, max: 15, badge: '🏆' },

  // Division (16-20) — ensure divisible pairs by construction when generating problems
  { id: 16, name: 'Division 1', op: '÷', min: 1, max: 3, badge: '🔁' },
  { id: 17, name: 'Division 2', op: '÷', min: 1, max: 5, badge: '🔄' },
  { id: 18, name: 'Division 3', op: '÷', min: 1, max: 8, badge: '⚖️' },
  { id: 19, name: 'Division 4', op: '÷', min: 1, max: 12, badge: '🧮' },
  { id: 20, name: 'Division 5', op: '÷', min: 1, max: 16, badge: '🌈' },
];

export const mathGame = {
  id: 'math',
  name: 'Matte-Magi',
  icon: '➗',
  levels
};

export default mathGame;

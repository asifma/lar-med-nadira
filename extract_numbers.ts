import fs from 'fs';
import { mathGame } from './src/data/mathLevels.js';

const numbers = new Set<number>();
mathGame.levels.forEach(level => {
  level.problems.forEach(p => {
    numbers.add(p.a);
    numbers.add(p.b);
    numbers.add(p.answer);
  });
});

const sorted = Array.from(numbers).sort((a, b) => a - b);
console.log(sorted.join(', '));

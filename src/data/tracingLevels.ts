import { GameDefinition, TracingGameLevel } from '../types';

let idCounter = 1;
const levels: TracingGameLevel[] = [];

// 1. A-Ö (29 levels)
'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'.split('').forEach(letter => {
  levels.push({
    id: idCounter++,
    name: `Stora ${letter}`,
    badge: letter,
    target: letter,
    type: 'uppercase'
  });
});

// 2. a-ö (29 levels)
'abcdefghijklmnopqrstuvwxyzåäö'.split('').forEach(letter => {
  levels.push({
    id: idCounter++,
    name: `Lilla ${letter}`,
    badge: letter,
    target: letter,
    type: 'lowercase'
  });
});

// 3. 1-9 (9 levels)
'123456789'.split('').forEach(num => {
  levels.push({
    id: idCounter++,
    name: `Siffra ${num}`,
    badge: num,
    target: num,
    type: 'number'
  });
});

// 4. 40 words (easy to advanced, first uppercase, then lowercase)
const upperWords = [
  { word: 'SOL', emoji: '☀️' },
  { word: 'BIL', emoji: '🚗' },
  { word: 'HUS', emoji: '🏠' },
  { word: 'BOK', emoji: '📖' },
  { word: 'KATT', emoji: '🐱' },
  { word: 'HUND', emoji: '🐶' },
  { word: 'TRÄD', emoji: '🌳' },
  { word: 'BLAD', emoji: '🍃' },
  { word: 'BÅT', emoji: '⛵' },
  { word: 'TÅG', emoji: '🚂' },
  { word: 'BOLL', emoji: '⚽' },
  { word: 'SKO', emoji: '👞' },
  { word: 'HATT', emoji: '🎩' },
  { word: 'GLAS', emoji: '🥛' },
  { word: 'STOL', emoji: '🪑' },
  { word: 'LAMPA', emoji: '💡' },
  { word: 'SÄNG', emoji: '🛏️' },
  { word: 'DÖRR', emoji: '🚪' },
  { word: 'FÅGEL', emoji: '🐦' },
  { word: 'FISK', emoji: '🐟' },
];

upperWords.forEach(w => {
  levels.push({
    id: idCounter++,
    name: `Ordet ${w.word}`,
    badge: w.emoji,
    target: w.word,
    type: 'word',
    emoji: w.emoji
  });
});

const lowerWords = [
  { word: 'äpple', emoji: '🍎' },
  { word: 'banan', emoji: '🍌' },
  { word: 'päron', emoji: '🍐' },
  { word: 'melon', emoji: '🍉' },
  { word: 'krona', emoji: '👑' },
  { word: 'slott', emoji: '🏰' },
  { word: 'spöke', emoji: '👻' },
  { word: 'robot', emoji: '🤖' },
  { word: 'raket', emoji: '🚀' },
  { word: 'stjärna', emoji: '⭐' },
  { word: 'måne', emoji: '🌙' },
  { word: 'moln', emoji: '☁️' },
  { word: 'regn', emoji: '🌧️' },
  { word: 'snö', emoji: '❄️' },
  { word: 'eld', emoji: '🔥' },
  { word: 'vatten', emoji: '💧' },
  { word: 'is', emoji: '🧊' },
  { word: 'berg', emoji: '⛰️' },
  { word: 'skog', emoji: '🌲' },
  { word: 'blomma', emoji: '🌸' },
];

lowerWords.forEach(w => {
  levels.push({
    id: idCounter++,
    name: `Ordet ${w.word}`,
    badge: w.emoji,
    target: w.word,
    type: 'word',
    emoji: w.emoji
  });
});

export const tracingLevels = levels;

export const tracingGame: GameDefinition<TracingGameLevel> = {
  id: 'tracing',
  name: 'Skriv & Spåra',
  icon: '✏️',
  description: 'Lär dig skriva bokstäver och siffror!',
  route: '/spel/spara-och-rita',
  illustration: 'TracingCardIllustration',
  levels: tracingLevels,
};

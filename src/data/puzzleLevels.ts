import { GameDefinition, PuzzleGameLevel, Word } from '../types';

// Helper to create a level
const createLevel = (id: number, name: string, badge: string, words: Word[]): PuzzleGameLevel => ({
  id,
  name,
  badge,
  puzzles: words.slice(0, 10), // Ensure exactly 10 puzzles
});

// Level 1-5: 2-3 letter words
const l1: Word[] = [
  { word: 'KO', emoji: '🐄' }, { word: 'BI', emoji: '🐝' }, { word: 'IS', emoji: '🧊' },
  { word: 'ÖN', emoji: '🏝️' }, { word: 'UR', emoji: '⏰' }, { word: 'RO', emoji: '🚣‍♀️' },
  { word: 'SOL', emoji: '☀️' }, { word: 'HUS', emoji: '🏠' }, { word: 'BIL', emoji: '🚗' },
  { word: 'MUS', emoji: '🐭' }
];

const l2: Word[] = [
  { word: 'BÅT', emoji: '⛵' }, { word: 'VÅG', emoji: '🌊' }, { word: 'LEK', emoji: '🎮' },
  { word: 'VÄG', emoji: '🛣️' }, { word: 'ÄGG', emoji: '🥚' }, { word: 'TRE', emoji: '3️⃣' },
  { word: 'TVÅ', emoji: '2️⃣' }, { word: 'BRO', emoji: '🌉' }, { word: 'FRÖ', emoji: '🌱' },
  { word: 'UGN', emoji: '🔥' }
];

const l3: Word[] = [
  { word: 'FÅR', emoji: '🐑' }, { word: 'TÅG', emoji: '🚂' }, { word: 'RÖD', emoji: '🔴' },
  { word: 'SÅG', emoji: '🪚' }, { word: 'ORM', emoji: '🐍' }, { word: 'OST', emoji: '🧀' },
  { word: 'ÖGA', emoji: '👁️' }, { word: 'BOK', emoji: '📖' }, { word: 'TRÄ', emoji: '🪵' },
  { word: 'LÖV', emoji: '🍂' }
];

const l4: Word[] = [
  { word: 'KATT', emoji: '🐱' }, { word: 'HUND', emoji: '🐕' }, { word: 'FISK', emoji: '🐠' },
  { word: 'BOLL', emoji: '⚽' }, { word: 'ANKA', emoji: '🦆' }, { word: 'GRIS', emoji: '🐷' },
  { word: 'TALL', emoji: '🌲' }, { word: 'SKOG', emoji: '🌳' }, { word: 'TUPP', emoji: '🐓' },
  { word: 'SVAN', emoji: '🦢' }
];

const l5: Word[] = [
  { word: 'GLAD', emoji: '😊' }, { word: 'VARM', emoji: '🌡️' }, { word: 'KALL', emoji: '❄️' },
  { word: 'MASK', emoji: '🪱' }, { word: 'MYRA', emoji: '🐜' }, { word: 'RÄKA', emoji: '🦐' },
  { word: 'LAMM', emoji: '🐑' }, { word: 'ROCK', emoji: '🧥' }, { word: 'RING', emoji: '💍' },
  { word: 'LAKE', emoji: '🐟' }
];

// Level 6-10: 4-5 letter words
const l6: Word[] = [
  { word: 'BANAN', emoji: '🍌' }, { word: 'CYKEL', emoji: '🚲' }, { word: 'LAMPA', emoji: '💡' },
  { word: 'PANDA', emoji: '🐼' }, { word: 'PIZZA', emoji: '🍕' }, { word: 'TIGER', emoji: '🐅' },
  { word: 'ZEBRA', emoji: '🦓' }, { word: 'DOCKA', emoji: '🪆' }, { word: 'MOROT', emoji: '🥕' },
  { word: 'HÄST', emoji: '🐴' }
];

const l7: Word[] = [
  { word: 'DRUVA', emoji: '🍇' }, { word: 'FJÄLL', emoji: '⛰️' }, { word: 'GLASS', emoji: '🍦' },
  { word: 'HJORT', emoji: '🦌' }, { word: 'JUICE', emoji: '🧃' }, { word: 'KLOSS', emoji: '🧱' },
  { word: 'MELON', emoji: '🍈' }, { word: 'SOFFA', emoji: '🛋️' }, { word: 'GRODA', emoji: '🐸' },
  { word: 'KANIN', emoji: '🐰' }
];

const l8: Word[] = [
  { word: 'ÄPPLE', emoji: '🍎' }, { word: 'MANGO', emoji: '🥭' }, { word: 'KRÅKA', emoji: '🐦‍⬛' },
  { word: 'PÄRON', emoji: '🍐' }, { word: 'RÄVEN', emoji: '🦊' }, { word: 'UGGLA', emoji: '🦉' },
  { word: 'TROLL', emoji: '🧌' }, { word: 'DIMMA', emoji: '🌫️' }, { word: 'FROST', emoji: '🥶' },
  { word: 'GURKA', emoji: '🥒' }
];

const l9: Word[] = [
  { word: 'HJÄLM', emoji: '⛑️' }, { word: 'VÄSKA', emoji: '👜' }, { word: 'SVAMP', emoji: '🍄' },
  { word: 'BJÖRK', emoji: '🌳' }, { word: 'BÄVER', emoji: '🦫' }, { word: 'KARTA', emoji: '🗺️' },
  { word: 'NOTER', emoji: '🎵' }, { word: 'STUGA', emoji: '🛖' }, { word: 'BLOMMA', emoji: '🌸' },
  { word: 'DELFIN', emoji: '🐬' }
];

const l10: Word[] = [
  { word: 'CITRON', emoji: '🍋' }, { word: 'GIRAFF', emoji: '🦒' }, { word: 'HJÄRTA', emoji: '❤️' },
  { word: 'KLOCKA', emoji: '⏰' }, { word: 'TOMTEN', emoji: '🎅' }, { word: 'ÅSKAN', emoji: '⚡' },
  { word: 'SNIGEL', emoji: '🐌' }, { word: 'HATTEN', emoji: '🎩' }, { word: 'ORANGE', emoji: '🍊' },
  { word: 'KORGEN', emoji: '🧺' }
];

// Level 11-15: 6-7 letter words
const l11: Word[] = [
  { word: 'FJÄRIL', emoji: '🦋' }, { word: 'BLÅBÄR', emoji: '🫐' }, { word: 'FÅGELN', emoji: '🐦' },
  { word: 'PINGIS', emoji: '🏓' }, { word: 'RAKET', emoji: '🚀' }, { word: 'VAGNEN', emoji: '🚃' },
  { word: 'MOLNET', emoji: '☁️' }, { word: 'TUNNAN', emoji: '🛢️' }, { word: 'LEKSAK', emoji: '🧸' },
  { word: 'PLANET', emoji: '🪐' }
];

const l12: Word[] = [
  { word: 'STJÄRNA', emoji: '⭐' }, { word: 'BLOMMOR', emoji: '💐' }, { word: 'DANSARE', emoji: '💃' },
  { word: 'FISKARE', emoji: '🎣' }, { word: 'SNÖBOLL', emoji: '☃️' }, { word: 'HAMSTER', emoji: '🐹' },
  { word: 'SOLSKEN', emoji: '🌤️' }, { word: 'APELSIN', emoji: '🍊' }, { word: 'GORILLA', emoji: '🦍' },
  { word: 'GALAXEN', emoji: '🌌' }
];

const l13: Word[] = [
  { word: 'KRUKOR', emoji: '🏺' }, { word: 'DRAKE', emoji: '🐉' }, { word: 'FOTBOLL', emoji: '⚽' },
  { word: 'ELEFANT', emoji: '🐘' }, { word: 'HALSBAND', emoji: '📿' }, { word: 'HÄXA', emoji: '🧙‍♀️' },
  { word: 'JOKER', emoji: '🃏' }, { word: 'SKATTEN', emoji: '💰' }, { word: 'NYCKEL', emoji: '🔑' },
  { word: 'ÄVENTYR', emoji: '🗺️' }
];

const l14: Word[] = [
  { word: 'BARNVAGN', emoji: '👶' }, { word: 'GLASÖGON', emoji: '👓' }, { word: 'SNÖGUBBE', emoji: '⛄' },
  { word: 'FLAMINGO', emoji: '🦩' }, { word: 'KARUSELL', emoji: '🎠' }, { word: 'GULDFISK', emoji: '🐠' },
  { word: 'KOKOSNÖT', emoji: '🥥' }, { word: 'REGNBÅGE', emoji: '🌈' }, { word: 'KLÄNNING', emoji: '👗' },
  { word: 'KYCKLING', emoji: '🐥' }
];

const l15: Word[] = [
  { word: 'KAMERAN', emoji: '📷' }, { word: 'KROKODIL', emoji: '🐊' }, { word: 'PAPEGOJA', emoji: '🦜' },
  { word: 'PARAPLY', emoji: '☂️' }, { word: 'PILBÅGE', emoji: '🏹' }, { word: 'RULLSTOL', emoji: '🦽' },
  { word: 'SLOTTSMUR', emoji: '🏰' }, { word: 'TROMBON', emoji: '🎺' }, { word: 'VATTEN', emoji: '💧' },
  { word: 'ÄNGELN', emoji: '👼' }
];

// Level 16-20: 8-10 letter words
const l16: Word[] = [
  { word: 'NYCKELPIGA', emoji: '🐞' }, { word: 'HELIKOPTER', emoji: '🚁' }, { word: 'ASTRONAUT', emoji: '🧑‍🚀' },
  { word: 'TVÄTTBJÖRN', emoji: '🦝' }, { word: 'DINOSAURIE', emoji: '🦖' }, { word: 'PRINSESSA', emoji: '👸' },
  { word: 'KANELBULLE', emoji: '🧁' }, { word: 'SNÖFLINGA', emoji: '❄️' }, { word: 'SKÖLDPADDA', emoji: '🐢' },
  { word: 'HAMBURGARE', emoji: '🍔' }
];

const l17: Word[] = [
  { word: 'VATTENMELON', emoji: '🍉' }, { word: 'FÅGELUNGE', emoji: '🐥' }, { word: 'SIMHALLEN', emoji: '🏊' },
  { word: 'FJÄLLSTUGA', emoji: '🏔️' }, { word: 'SMULTRON', emoji: '🍓' }, { word: 'TUSSILAGO', emoji: '🌼' },
  { word: 'SKALBAGGE', emoji: '🪲' }, { word: 'FLYGPLATS', emoji: '🛫' }, { word: 'PINGVINEN', emoji: '🐧' },
  { word: 'BJÖRNBÄR', emoji: '🫐' }
];

const l18: Word[] = [
  { word: 'BRANDKÅREN', emoji: '🚒' }, { word: 'ELEFANTEN', emoji: '🐘' }, { word: 'MÅNSKENET', emoji: '🌕' },
  { word: 'TÅRTBOTTEN', emoji: '🎂' }, { word: 'BADMINTON', emoji: '🏸' }, { word: 'TROLLKARL', emoji: '🧙‍♂️' },
  { word: 'SOLUPPGÅNG', emoji: '🌅' }, { word: 'SEGELBÅTEN', emoji: '⛵' }, { word: 'TRÄDGÅRDEN', emoji: '🏡' },
  { word: 'BIBLIOTEKET', emoji: '📚' }
];

const l19: Word[] = [
  { word: 'SPINDELVÄV', emoji: '🕸️' }, { word: 'FOTBOLLEN', emoji: '⚽' }, { word: 'LEKPLATSEN', emoji: '🛝' },
  { word: 'FJÄRILARNA', emoji: '🦋' }, { word: 'KANINUNGEN', emoji: '🐇' }, { word: 'RIDDARBORG', emoji: '🏰' },
  { word: 'UPPFINNING', emoji: '💡' }, { word: 'BLÄCKFISK', emoji: '🦑' }, { word: 'MÅLARPENSEL', emoji: '🖌️' },
  { word: 'VATTENFÄRGER', emoji: '🎨' }
];

const l20: Word[] = [
  { word: 'SMÖRGÅSTÅRTA', emoji: '🥪' }, { word: 'MORGONROCK', emoji: '🧥' }, { word: 'SÄLLSKAPET', emoji: '👨‍👩‍👧‍👦' },
  { word: 'SNÖSTORMEN', emoji: '🌨️' }, { word: 'VULKANEN', emoji: '🌋' }, { word: 'SKORSTENEN', emoji: '🏭' },
  { word: 'CHOKLADKAKA', emoji: '🍫' }, { word: 'SOLNEDGÅNG', emoji: '🌇' }, { word: 'VATTENFALL', emoji: '💧' },
  { word: 'ENHÖRNING', emoji: '🦄' }
];

export const puzzleGame: GameDefinition<PuzzleGameLevel> = {
  id: 'puzzle',
  name: 'Pussel-Palatset',
  icon: '🧩',
  description: 'Dra pusselbitarna till rätt plats!',
  route: '/spel/pussel-palatset',
  illustration: 'PuzzleCardIllustration',
  badge: 'Ny!',
  levels: [
    createLevel(1, 'Småpussel', '🐄', l1),
    createLevel(2, 'Pusselbiten', '⛵', l2),
    createLevel(3, 'Klurigt', '🐑', l3),
    createLevel(4, 'Tänkaren', '🐱', l4),
    createLevel(5, 'Pusselmästaren', '😊', l5),
    createLevel(6, 'Ordbyggaren', '🍌', l6),
    createLevel(7, 'Pusselpalatset', '🍦', l7),
    createLevel(8, 'Bokstavspussel', '🍎', l8),
    createLevel(9, 'Pusseljakten', '🦫', l9),
    createLevel(10, 'Smarta drag', '🦒', l10),
    createLevel(11, 'Långa ord', '🦋', l11),
    createLevel(12, 'Pusselstjärnan', '⭐', l12),
    createLevel(13, 'Mästerpusslaren', '🐉', l13),
    createLevel(14, 'Pusselgeniet', '🌈', l14),
    createLevel(15, 'Ordmagi', '🦜', l15),
    createLevel(16, 'Superpusslet', '🐞', l16),
    createLevel(17, 'Pusselhjälten', '🍉', l17),
    createLevel(18, 'Pusselmästaren', '🚒', l18),
    createLevel(19, 'Pussellegenden', '🕸️', l19),
    createLevel(20, 'Pusselguden', '🦄', l20),
  ],
};

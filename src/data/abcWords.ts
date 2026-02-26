import type { GameDefinition, SpellingGameLevel, Word } from '../types';

// Level 1-5: 2-4 letter words, placeholderMode: 'full'
const level1Words: Word[] = [
  { word: 'KO', emoji: '🐄' },
  { word: 'BI', emoji: '🐝' },
  { word: 'IS', emoji: '🧊' },
  { word: 'ÖN', emoji: '🏝️' },
  { word: 'ORM', emoji: '🐍' },
  { word: 'OST', emoji: '🧀' },
  { word: 'UR', emoji: '⏰' },
  { word: 'RO', emoji: '🚣‍♀️' },
  { word: 'ÖGA', emoji: '👁️' },
  { word: 'OKEJ', emoji: '👍' },
];

const level2Words: Word[] = [
  { word: 'SOL', emoji: '☀️' },
  { word: 'HUS', emoji: '🏠' },
  { word: 'BIL', emoji: '🚗' },
  { word: 'MUS', emoji: '🐭' },
  { word: 'BÅT', emoji: '⛵' },
  { word: 'VÅG', emoji: '🌊' },
  { word: 'MÅNE', emoji: '🌙' },
  { word: 'LEK', emoji: '🎮' },
  { word: 'NÄSA', emoji: '👃' },
  { word: 'VÄG', emoji: '🛣️' },
];

const level3Words: Word[] = [
  { word: 'ÄGG', emoji: '🥚' },
  { word: 'TRE', emoji: '3️⃣' },
  { word: 'TVÅ', emoji: '2️⃣' },
  { word: 'BRO', emoji: '🌉' },
  { word: 'FRÖ', emoji: '🌱' },
  { word: 'UGN', emoji: '🔥' },
  { word: 'FÅR', emoji: '🐑' },
  { word: 'TÅG', emoji: '🚂' },
  { word: 'RÖD', emoji: '🔴' },
  { word: 'SÅG', emoji: '🪚' },
];

const level4Words: Word[] = [
  { word: 'KAKA', emoji: '🍪' },
  { word: 'FISK', emoji: '🐠' },
  { word: 'BOLL', emoji: '⚽' },
  { word: 'HUND', emoji: '🐕' },
  { word: 'ANKA', emoji: '🦆' },
  { word: 'GRIS', emoji: '🐷' },
  { word: 'TALL', emoji: '🌲' },
  { word: 'SKOG', emoji: '🌳' },
  { word: 'TUPP', emoji: '🐓' },
  { word: 'SVAN', emoji: '🦢' },
];

const level5Words: Word[] = [
  { word: 'GLAD', emoji: '😊' },
  { word: 'VARM', emoji: '🌡️' },
  { word: 'KALL', emoji: '❄️' },
  { word: 'MASK', emoji: '🪱' },
  { word: 'MYRA', emoji: '🐜' },
  { word: 'RÄKA', emoji: '🦐' },
  { word: 'LAMM', emoji: '🐑' },
  { word: 'ROCK', emoji: '🧥' },
  { word: 'RING', emoji: '💍' },
  { word: 'LAKE', emoji: '🐟' },
];

// Level 6-10: 4-5 letter words, placeholderMode: 'full'
const level6Words: Word[] = [
  { word: 'BANAN', emoji: '🍌' },
  { word: 'CYKEL', emoji: '🚲' },
  { word: 'LAMPA', emoji: '💡' },
  { word: 'PANDA', emoji: '🐼' },
  { word: 'PIZZA', emoji: '🍕' },
  { word: 'TIGER', emoji: '🐅' },
  { word: 'ZEBRA', emoji: '🦓' },
  { word: 'DOCKA', emoji: '🪆' },
  { word: 'MOROT', emoji: '🥕' },
  { word: 'HÄST', emoji: '🐴' },
];

const level7Words: Word[] = [
  { word: 'DRUVA', emoji: '🍇' },
  { word: 'FJÄLL', emoji: '⛰️' },
  { word: 'GLASS', emoji: '🍦' },
  { word: 'HJORT', emoji: '🦌' },
  { word: 'JUICE', emoji: '🧃' },
  { word: 'KLOSS', emoji: '🧱' },
  { word: 'MELON', emoji: '🍈' },
  { word: 'SOFFA', emoji: '🛋️' },
  { word: 'GRODA', emoji: '🐸' },
  { word: 'KANIN', emoji: '🐰' },
];

const level8Words: Word[] = [
  { word: 'ÄPPLE', emoji: '🍎' },
  { word: 'MANGO', emoji: '🥭' },
  { word: 'KRÅKA', emoji: '🐦‍⬛' },
  { word: 'PÄRON', emoji: '🍐' },
  { word: 'RÄVEN', emoji: '🦊' },
  { word: 'UGGLA', emoji: '🦉' },
  { word: 'TROLL', emoji: '🧌' },
  { word: 'DIMMA', emoji: '🌫️' },
  { word: 'FROST', emoji: '🥶' },
  { word: 'GURKA', emoji: '🥒' },
];

const level9Words: Word[] = [
  { word: 'HJÄLM', emoji: '⛑️' },
  { word: 'VÄSKA', emoji: '👜' },
  { word: 'SVAMP', emoji: '🍄' },
  { word: 'BJÖRK', emoji: '🌳' },
  { word: 'BÄVER', emoji: '🦫' },
  { word: 'KARTA', emoji: '🗺️' },
  { word: 'NOTER', emoji: '🎵' },
  { word: 'STUGA', emoji: '🛖' },
  { word: 'BLOMMA', emoji: '🌸' },
  { word: 'DELFIN', emoji: '🐬' },
];

const level10Words: Word[] = [
  { word: 'CITRON', emoji: '🍋' },
  { word: 'GIRAFF', emoji: '🦒' },
  { word: 'HJÄRTA', emoji: '❤️' },
  { word: 'KLOCKA', emoji: '⏰' },
  { word: 'TOMTEN', emoji: '🎅' },
  { word: 'ÅSKAN', emoji: '⚡' },
  { word: 'SNIGEL', emoji: '🐌' },
  { word: 'HATTEN', emoji: '🎩' },
  { word: 'ORANGE', emoji: '🍊' },
  { word: 'KORGEN', emoji: '🧺' },
];

// Level 11-14: 5-7 letter words, placeholderMode: 'partial'
const level11Words: Word[] = [
  { word: 'FJÄRIL', emoji: '🦋' },
  { word: 'BLÅBÄR', emoji: '🫐' },
  { word: 'FÅGELN', emoji: '🐦' },
  { word: 'PINGIS', emoji: '🏓' },
  { word: 'RAKET', emoji: '🚀' },
  { word: 'VAGNEN', emoji: '🚃' },
  { word: 'MOLNET', emoji: '☁️' },
  { word: 'TUNNAN', emoji: '🛢️' },
  { word: 'LEKSAK', emoji: '🧸' },
  { word: 'PLANET', emoji: '🪐' },
];

const level12Words: Word[] = [
  { word: 'STJÄRNA', emoji: '⭐' },
  { word: 'BLOMMOR', emoji: '💐' },
  { word: 'DANSARE', emoji: '💃' },
  { word: 'FISKARE', emoji: '🎣' },
  { word: 'SNÖBOLL', emoji: '☃️' },
  { word: 'HAMSTER', emoji: '🐹' },
  { word: 'SOLSKEN', emoji: '🌤️' },
  { word: 'APELSIN', emoji: '🍊' },
  { word: 'GORILLA', emoji: '🦍' },
  { word: 'GALAXEN', emoji: '🌌' },
];

const level13Words: Word[] = [
  { word: 'KRUKOR', emoji: '🏺' },
  { word: 'DRAKE', emoji: '🐉' },
  { word: 'FOTBOLL', emoji: '⚽' },
  { word: 'ELEFANT', emoji: '🐘' },
  { word: 'HALSBAND', emoji: '📿' },
  { word: 'HÄXA', emoji: '🧙‍♀️' },
  { word: 'JOKER', emoji: '🃏' },
  { word: 'SKATTEN', emoji: '💰' },
  { word: 'NYCKEL', emoji: '🔑' },
  { word: 'ÄVENTYRET', emoji: '🗺️' },
];

const level14Words: Word[] = [
  { word: 'BARNVAGN', emoji: '👶' },
  { word: 'GLASÖGON', emoji: '👓' },
  { word: 'SNÖGUBBE', emoji: '⛄' },
  { word: 'FLAMINGO', emoji: '🦩' },
  { word: 'KARUSELL', emoji: '🎠' },
  { word: 'GULDFISK', emoji: '🐠' },
  { word: 'KOKOSNÖT', emoji: '🥥' },
  { word: 'REGNBÅGE', emoji: '🌈' },
  { word: 'ENHÖRNING', emoji: '🦄' },
  { word: 'KLÄNNING', emoji: '👗' },
];

// Level 15-20: 6-10 letter words, placeholderMode: 'none'
const level15Words: Word[] = [
  { word: 'NYCKELPIGA', emoji: '🐞' },
  { word: 'HELIKOPTER', emoji: '🚁' },
  { word: 'ASTRONAUT', emoji: '🧑‍🚀' },
  { word: 'TVÄTTBJÖRN', emoji: '🦝' },
  { word: 'DINOSAURIE', emoji: '🦖' },
  { word: 'PRINSESSA', emoji: '👸' },
  { word: 'KROKODIL', emoji: '🐊' },
  { word: 'KANELBULLE', emoji: '🧁' },
  { word: 'SNÖFLINGA', emoji: '❄️' },
  { word: 'SKÖLDPADDA', emoji: '🐢' },
];

const level16Words: Word[] = [
  { word: 'HAMBURGARE', emoji: '🍔' },
  { word: 'VATTENMELON', emoji: '🍉' },
  { word: 'FÅGELUNGE', emoji: '🐥' },
  { word: 'SIMHALLEN', emoji: '🏊' },
  { word: 'FJÄLLSTUGA', emoji: '🏔️' },
  { word: 'SMULTRON', emoji: '🍓' },
  { word: 'TUSSILAGO', emoji: '🌼' },
  { word: 'SKALBAGGE', emoji: '🪲' },
  { word: 'FLYGPLATS', emoji: '🛫' },
  { word: 'PINGVINEN', emoji: '🐧' },
];

const level17Words: Word[] = [
  { word: 'BJÖRNBÄR', emoji: '🫐' },
  { word: 'BRANDKÅREN', emoji: '🚒' },
  { word: 'ELEFANTEN', emoji: '🐘' },
  { word: 'MÅNSKENET', emoji: '🌕' },
  { word: 'TÅRTBOTTEN', emoji: '🎂' },
  { word: 'BADMINTON', emoji: '🏸' },
  { word: 'TROLLKARL', emoji: '🧙‍♂️' },
  { word: 'SOLUPPGÅNG', emoji: '🌅' },
  { word: 'SEGELBÅTEN', emoji: '⛵' },
  { word: 'TRÄDGÅRDEN', emoji: '🏡' },
];

const level18Words: Word[] = [
  { word: 'BIBLIOTEKET', emoji: '📚' },
  { word: 'SPINDELVÄV', emoji: '🕸️' },
  { word: 'FOTBOLLEN', emoji: '⚽' },
  { word: 'LEKPLATSEN', emoji: '🛝' },
  { word: 'FJÄRILARNA', emoji: '🦋' },
  { word: 'KANINUNGEN', emoji: '🐇' },
  { word: 'RIDDARBORG', emoji: '🏰' },
  { word: 'UPPFINNING', emoji: '💡' },
  { word: 'BLÄCKFISK', emoji: '🦑' },
  { word: 'MÅLARPENSEL', emoji: '🖌️' },
];

const level19Words: Word[] = [
  { word: 'VATTENFÄRGER', emoji: '🎨' },
  { word: 'SMÖRGÅSTÅRTA', emoji: '🥪' },
  { word: 'MORGONROCK', emoji: '🧥' },
  { word: 'SÄLLSKAPET', emoji: '👨‍👩‍👧‍👦' },
  { word: 'SNÖSTORMEN', emoji: '🌨️' },
  { word: 'VULKANEN', emoji: '🌋' },
  { word: 'SKORSTENEN', emoji: '🏭' },
  { word: 'CHOKLADKAKA', emoji: '🍫' },
  { word: 'SOLNEDGÅNG', emoji: '🌇' },
  { word: 'VATTENFALL', emoji: '💧' },
];

const level20Words: Word[] = [
  { word: 'BARNDOMSVÄN', emoji: '👫' },
  { word: 'SAGOBOKEN', emoji: '📖' },
  { word: 'NORRSKENET', emoji: '🌌' },
  { word: 'TROLLFORMEL', emoji: '✨' },
  { word: 'JORDGUBBE', emoji: '🍓' },
  { word: 'TRUMSLAGET', emoji: '🥁' },
  { word: 'DRÖMFÅNGARE', emoji: '🕸️' },
  { word: 'TORNSVALAN', emoji: '🕊️' },
  { word: 'BERGSBÄCKEN', emoji: '🏔️' },
  { word: 'TROLLSTAVEN', emoji: '🪄' },
];

export const abcGame: GameDefinition<SpellingGameLevel> = {
  id: 'abc',
  name: 'ABC-Äventyr',
  icon: '📚',
  description: 'Lär dig stava roliga ord!',
  route: '/spel/abc-aventyr/',
  illustration: 'AbcCardIllustration',
  levels: [
    { id: 1, name: 'Första stegen', words: level1Words, placeholderMode: 'full', badge: '🌟' },
    { id: 2, name: 'Bokstavslandet', words: level2Words, placeholderMode: 'full', badge: '🎯' },
    { id: 3, name: 'Ordjakten', words: level3Words, placeholderMode: 'full', badge: '🏅' },
    { id: 4, name: 'Stavningsparken', words: level4Words, placeholderMode: 'full', badge: '🎪' },
    { id: 5, name: 'Bokstavsgården', words: level5Words, placeholderMode: 'full', badge: '🎠' },
    { id: 6, name: 'Ordskatten', words: level6Words, placeholderMode: 'full', badge: '🎡' },
    { id: 7, name: 'Ordvärlden', words: level7Words, placeholderMode: 'full', badge: '🎢' },
    { id: 8, name: 'Stavningsskolan', words: level8Words, placeholderMode: 'full', badge: '🎭' },
    { id: 9, name: 'Bokstavsdjungeln', words: level9Words, placeholderMode: 'full', badge: '🎨' },
    { id: 10, name: 'Ordmagikern', words: level10Words, placeholderMode: 'full', badge: '🎬' },
    { id: 11, name: 'Stavningsmästaren', words: level11Words, placeholderMode: 'partial', badge: '🎵' },
    { id: 12, name: 'Ordkonstnären', words: level12Words, placeholderMode: 'partial', badge: '🎶' },
    { id: 13, name: 'Bokstavsslottet', words: level13Words, placeholderMode: 'partial', badge: '🎸' },
    { id: 14, name: 'Ordäventyraren', words: level14Words, placeholderMode: 'partial', badge: '🎹' },
    { id: 15, name: 'Ordtrollkarlen', words: level15Words, placeholderMode: 'none', badge: '🎺' },
    { id: 16, name: 'Stavningsutopin', words: level16Words, placeholderMode: 'none', badge: '🎻' },
    { id: 17, name: 'Orduniversumet', words: level17Words, placeholderMode: 'none', badge: '🏆' },
    { id: 18, name: 'Bokstavskungen', words: level18Words, placeholderMode: 'none', badge: '👑' },
    { id: 19, name: 'Ordlegenden', words: level19Words, placeholderMode: 'none', badge: '💎' },
    { id: 20, name: 'Mästerstavaren', words: level20Words, placeholderMode: 'none', badge: '🌈' },
  ],
};

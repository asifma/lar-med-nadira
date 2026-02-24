// Simple level definitions for Matte Magi (grouped: 5 levels per operation)
const makeLevels = () => {
  const levels: any[] = [];
  // Addition 1-5
  for (let i = 1; i <= 5; i++) {
    levels.push({ id: i, name: `Addition ${i}`, op: '+', min: 1, max: 5 * i, badge: '➕' });
  }
  // Subtraction 6-10
  for (let i = 6; i <= 10; i++) {
    levels.push({ id: i, name: `Subtraktion ${i - 5}`, op: '-', min: 1, max: 5 * (i - 5), badge: '➖' });
  }
  // Multiplication 11-15
  for (let i = 11; i <= 15; i++) {
    levels.push({ id: i, name: `Multiplikation ${i - 10}`, op: '×', min: 1, max: 2 * (i - 10 + 2), badge: '✖️' });
  }
  // Division 16-20
  for (let i = 16; i <= 20; i++) {
    levels.push({ id: i, name: `Division ${i - 15}`, op: '÷', min: 1, max: 2 * (i - 15 + 2), badge: '➗' });
  }
  return levels;
};

export const mathGame = {
  id: 'math',
  name: 'Matte-Magi',
  icon: '➗',
  levels: makeLevels()
};

export default mathGame;

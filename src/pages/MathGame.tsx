import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import mathGame from '../data/mathLevels';
import Button from '../components/Button';
import SpeakableText from '../components/SpeakableText';
import NumericPad from '../components/NumericPad';

const makeProblems = (level: any, count = 10) => {
  const problems: any[] = [];
  for (let i = 0; i < count; i++) {
    const a = Math.floor(Math.random() * (level.max - level.min + 1)) + level.min;
    const b = Math.floor(Math.random() * (level.max - level.min + 1)) + level.min;
    let question = '';
    let answer: number = 0;
    switch (level.op) {
      case '+': question = `${a} + ${b}`; answer = a + b; break;
      case '-': question = `${a + b} - ${b}`; answer = a; break; // ensure positive
      case '×': question = `${a} × ${b}`; answer = a * b; break;
      case '÷': {
        const prod = a * b; question = `${prod} ÷ ${b}`; answer = a; break; // divisible
      }
    }
    problems.push({ question, answer, a, b });
  }
  return problems;
};

const VisualCount: React.FC<{ n: number, emoji?: string }> = ({ n, emoji = '🔵' }) => (
  <div className="flex gap-1 flex-wrap justify-center">
    {Array.from({ length: Math.min(n, 12) }).map((_, i) => (
      <span key={i} className="text-3xl">{emoji}</span>
    ))}
    {n > 12 && <span className="text-xl opacity-60">+{n - 12}</span>}
  </div>
);

const MathGame: React.FC = () => {
  const navigate = useNavigate();
  const { activeProfile, updateStars, completeLevel } = useProfile();

  const [gameState, setGameState] = useState<'selecting' | 'playing' | 'complete'>('selecting');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const level = useMemo(() => mathGame.levels.find((l: any) => l.id === selectedLevel), [selectedLevel]);
  const [problems, setProblems] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<'none'|'correct'|'wrong'>('none');

  const startLevel = (id: number) => {
    setSelectedLevel(id);
    const lvl = mathGame.levels.find((l:any) => l.id === id);
    setProblems(makeProblems(lvl, 10));
    setIndex(0); setInput(''); setCorrectCount(0); setFeedback('none'); setGameState('playing');
  };

  const check = () => {
    const p = problems[index];
    const val = Number(input);
    if (val === p.answer) {
      setFeedback('correct');
      setCorrectCount(c => c + 1);
      updateStars(1);
      setTimeout(() => {
        if (index < problems.length - 1) { setIndex(i => i + 1); setInput(''); setFeedback('none'); }
        else setGameState('complete');
      }, 700);
    } else {
      setFeedback('wrong');
      setTimeout(() => { setFeedback('none'); setInput(''); }, 700);
    }
  };

  if (!activeProfile) return (<div className="p-8 text-center"><Button onClick={() => navigate('/')}>Gå till start</Button></div>);

  if (gameState === 'selecting') {
    // grouped view similar to ABC game
    const groups = [
      { title: '➕ Addition', levels: mathGame.levels.slice(0,5) },
      { title: '➖ Subtraktion', levels: mathGame.levels.slice(5,10) },
      { title: '✖️ Multiplikation', levels: mathGame.levels.slice(10,15) },
      { title: '➗ Division', levels: mathGame.levels.slice(15,20) },
    ];

    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => navigate('/dashboard')} className="w-14 h-14 rounded-2xl bg-white/15">←</button>
            <div className="flex-1 text-center"><SpeakableText text="Välj nivå i Matte-Magi!" className="text-4xl font-black"/></div>
          </div>

          {groups.map((g, gi) => (
            <div key={gi} className="mb-8">
              <h3 className="text-xl font-black mb-3">{g.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {g.levels.map((lvl:any) => (
                  <button key={lvl.id} onClick={() => startLevel(lvl.id)} className="p-4 rounded-2xl border bg-[var(--card-bg)]">
                    <div className="text-3xl">{lvl.badge}</div>
                    <div className="font-black">{lvl.id}</div>
                    <div className="text-xs opacity-60">{lvl.name}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (gameState === 'complete') {
    const stars = correctCount >= 10 ? 3 : correctCount >= 7 ? 2 : correctCount >= 5 ? 1 : 0;
    if (stars > 0) completeLevel('math', selectedLevel, stars);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="text-6xl">{stars >= 2 ? '🎉' : '👏'}</div>
        <h2 className="text-3xl font-black">Du fick {correctCount} av {problems.length} rätt</h2>
        <div className="pt-6 flex gap-4">
          <Button variant="secondary" size="lg" onClick={() => setGameState('selecting')}>Alla nivåer</Button>
          <Button variant="primary" size="lg" onClick={() => startLevel(selectedLevel)}>Spela igen</Button>
        </div>
      </div>
    );
  }

  // playing
  const p = problems[index];

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => setGameState('selecting')} className="w-12 h-12 rounded bg-white/10">←</button>
        <div className="flex-1 text-center font-black">Nivå {selectedLevel} — {level?.name}</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="w-full max-w-3xl p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 text-center shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">{level?.badge}</div>
            <div className="text-sm opacity-60">Fråga {index + 1}/{problems.length}</div>
          </div>
          <div className="text-4xl font-black mb-2">{p.question}</div>
          <div className="mb-4 text-sm opacity-60">Föreställ dig bilden och skriv svaret</div>
          <div className="mb-6">
            <div className="flex gap-6 justify-center items-center">
              <div className="bg-white/10 p-4 rounded-2xl">
                <VisualCount n={p.a} emoji={'🔵'} />
              </div>
              <div className="text-4xl">{level?.op}</div>
              <div className="bg-white/10 p-4 rounded-2xl">
                <VisualCount n={p.b} emoji={'🟢'} />
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <input value={input} readOnly className="w-full p-4 rounded-xl text-4xl text-center bg-white/5" />
            </div>
            <NumericPad onPress={(v) => setInput(i => (v === '' ? '' : (i + v).slice(0,6)))} onClear={() => setInput('')} onEnter={check} />
          </div>

          <div className="h-12 mt-4">
            {feedback === 'correct' && <div className="text-2xl text-green-500">Rätt! ✅</div>}
            {feedback === 'wrong' && <div className="text-2xl text-red-400">Inte rätt — försök igen</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathGame;

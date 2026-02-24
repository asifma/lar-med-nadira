# Matte Magi Enhancement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform Matte-Magi math game into an engaging, interactive experience with animated dashboard card, TTS, collection integration, progress tracking, celebrations, and feedback.

**Architecture:** Incremental improvements to existing React components. New components follow AbcCardIllustration patterns. SpeechContext for TTS. canvas-confetti for particle effects. CSS variables ensure theme consistency.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, SVG animations, canvas-confetti.

---

### Task 1: Replace MathCardIllustration with animated calculator

**Files:**
- Modify: `src/components/GameCardIllustration.tsx`
- Modify: `src/pages/Dashboard.tsx`

**Step 1:** Update `MathCardIllustration` component in `GameCardIllustration.tsx` with the following full SVG replacement:

```tsx
export const MathCardIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={className}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>
        {`
          @keyframes bounce {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes pulse {
            0%,100% { opacity:0.2; }
            50% { opacity:0.8; }
          }
          @keyframes pop {
            0% { transform: scale(0); opacity:0; }
            80% { transform: scale(1.2); opacity:1; }
            100% { transform: scale(1); opacity:1; }
          }
          @keyframes float {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes rotateFloat {
            0% { transform: rotate(0deg) translate(0,0); }
            50% { transform: rotate(10deg) translate(5px,-5px); }
            100% { transform: rotate(0deg) translate(0,0); }
          }
        `}
      </style>
      {/* Calculator body with bounce */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="30,20;30,18;30,20" dur="3s" repeatCount="indefinite" />
        <rect x="30" y="20" width="60" height="90" rx="8" fill="var(--primary-color)" opacity="0.6" />
        {/* Screen */}
        <rect x="35" y="25" width="50" height="20" rx="4" fill="white" opacity="0.3" />
        {/* Buttons grid (3x4) with wave effect */}
        <g>
          {[ // Row 1
            {cx: 38, cy: 35}, {cx: 53, cy: 35}, {cx: 68, cy: 35},
            // Row 2
            {cx: 38, cy: 50}, {cx: 53, cy: 50}, {cx: 68, cy: 50},
            // Row 3
            {cx: 38, cy: 65}, {cx: 53, cy: 65}, {cx: 68, cy: 65},
            // Row 4 (0)
            {cx: 53, cy: 80}
          ].map((pos, i) => (
            <circle key={i} cx={pos.cx} cy={pos.cy} r="6" fill="white" opacity="0.2">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
            </circle>
          ))}
        </g>
        {/* Popping numbers (sample: 1, 2, 3) */}
        <g fill="var(--text-color)" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
          <text x="38" y="39" textAnchor="middle">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0s" />
            <animateTransform attributeName="transform" type="scale" values="0;1.2;1" dur="1.5s" repeatCount="indefinite" begin="0s" additive="sum"/>
            1
          </text>
          <text x="53" y="39" textAnchor="middle">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
            <animateTransform attributeName="transform" type="scale" values="0;1.2;1" dur="1.5s" repeatCount="indefinite" begin="0.5s" additive="sum"/>
            2
          </text>
          <text x="68" y="39" textAnchor="middle">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="1s" />
            <animateTransform attributeName="transform" type="scale" values="0;1.2;1" dur="1.5s" repeatCount="indefinite" begin="1s" additive="sum"/>
            3
          </text>
        </g>
        {/* Floating math symbols around calculator */}
        <g fill="var(--accent-color)" fontSize="12" fontWeight="bold">
          <text x="20" y="35">
            <animateTransform attributeName="transform" type="translate" values="0,0; -3,-3; 0,0" dur="4s" repeatCount="indefinite" />
            +
          </text>
          <text x="95" y="25">
            <animateTransform attributeName="transform" type="translate" values="0,0; 3,-3; 0,0" dur="4s" repeatCount="indefinite" begin="1s" />
            −
          </text>
          <text x="95" y="70">
            <animateTransform attributeName="transform" type="translate" values="0,0; -3,3; 0,0" dur="4s" repeatCount="indefinite" begin="2s" />
            ×
          </text>
          <text x="20" y="85">
            <animateTransform attributeName="transform" type="translate" values="0,0; 3,3; 0,0" dur="4s" repeatCount="indefinite" begin="3s" />
            ÷
          </text>
        </g>
        {/* Sparkles at corners */}
        <circle cx="28" cy="18" r="3" fill="#FFD700">
          <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="92" cy="18" r="2" fill="#FFD700">
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="28" cy="102" r="2.5" fill="#FFD700">
          <animate attributeName="opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  </div>
);
```

**Step 2:** In `Dashboard.tsx`, replace the plain icon div with the new component:

Find lines around 110-112:

```tsx
<div className="w-24 h-24 mb-4 flex items-center justify-center text-4xl">➗</div>
```

Replace with:

```tsx
<MathCardIllustration className="w-28 h-28 mb-4" />
```

**Step 3:** Test manually: ensure the SVG animates, uses theme colors, and looks vibrant. Toggle between Unicorn and Hero themes.

**Step 4:** Commit.

```bash
git add src/components/GameCardIllustration.tsx src/pages/Dashboard.tsx
git commit -m "feat: add animated calculator illustration for Matte Magi dashboard card"
```

---

### Task 2: CollectionPage Integration

**Files:** `src/pages/CollectionPage.tsx`

**Step 1:** Import mathGame:

```ts
import { mathGame } from '../data/mathLevels';
```

(After existing imports)

**Step 2:** Update ALL_GAMES array:

```ts
const ALL_GAMES: GameDefinition[] = [abcGame, mathGame];
```

**Step 3:** Test: Visit `/samling` and confirm both games appear with correct progress counts and badges.

**Step 4:** Commit.

```bash
git add src/pages/CollectionPage.tsx
git commit -m "feat: integrate math game badges into collection page"
```

---

### Task 3: Install Confetti Dependency

Run:

```bash
npm install canvas-confetti
```

**Verify:** package.json now includes canvas-confetti.

Commit package.json and package-lock.json:

```bash
git add package.json package-lock.json
git commit -m "deps: add canvas-confetti for celebration effects"
```

---

### Task 4: Text-to-Speech Implementation

**Files:** `src/pages/MathGame.tsx`

**Step 1:** Add SpeechContext import:

```ts
import { useSpeech } from '../contexts/SpeechContext';
```

**Step 2:** Inside component, after existing hooks, add:

```ts
const { speak, stop } = useSpeech();
const [isMuted, setIsMuted] = useState(false);

const safeSpeak = useCallback((text: string) => {
  if (!isMuted) speak(text);
}, [isMuted, speak]);

const toggleMute = useCallback(() => {
  setIsMuted(prev => {
    if (!prev) stop();
    return !prev;
  });
}, [stop]);
```

**Step 3:** Replace the HUD placeholder speaker button. Locate the HUD right-side button with title "Ljud (ej aktiv)". Replace entire button with:

```tsx
<button
  onClick={toggleMute}
  className={`text-xl hover:scale-110 transition-all ${isMuted ? 'opacity-40' : ''}`}
  title={isMuted ? 'Slå på ljud' : 'Stäng av ljud'}
>
  {isMuted ? '🔇' : '🔊'}
</button>
```

**Step 4:** Add a speaker button next to the problem equation. Change this section:

```tsx
<div className="mb-4">
  <div className="text-4xl font-black mb-2">{p.question}</div>
  <div className="mb-4 text-sm opacity-60">Föreställ dig bilden och skriv svaret</div>
```

to:

```tsx
<div className="mb-4">
  <div className="text-4xl font-black mb-2 flex items-center justify-center gap-3">
    {p.question}
    <button
      onClick={() => safeSpeak(p.question)}
      className="text-2xl hover:scale-110 transition-transform"
      title="Läs upp frågan"
    >
      🔊
    </button>
  </div>
  <div className="text-sm opacity-60">Föreställ dig bilden och skriv svaret</div>
```

**Step 5:** Test: Click HUD speaker to mute/unmute; click problem speaker to hear "5 + 3" etc.

**Step 6:** Commit.

```bash
git add src/pages/MathGame.tsx
git commit -m "feat: implement TTS with mute toggle and problem speaker in Matte Magi"
```

---

### Task 5: Confetti Utility

**Step 1:** Create `src/utils/confetti.ts`:

```ts
import confetti from 'canvas-confetti';

export const burstConfetti = (x?: number, y?: number) => {
  confetti({
    particleCount: 30,
    spread: 60,
    origin: { x: x ?? 0.5, y: y ?? 0.5 },
    colors: ['#FF6B9D', '#C084FC', '#10B981', '#FBBF24', '#EF4444'],
    gravity: 0.8,
    scalar: 0.8,
    drift: 0.5,
    zIndex: 9999,
  });
};

export const fireConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#FF6B9D', '#C084FC', '#10B981', '#FBBF24', '#EF4444'],
    gravity: 0.8,
    scalar: 1,
    drift: 0.5,
    zIndex: 9999,
  });
};
```

**Step 2:** Import in MathGame:

```ts
import { burstConfetti, fireConfetti } from '../utils/confetti';
```

**Step 3:** Trigger on correct answer. In `check` function, inside correct block, after `updateStars(1)`, add `burstConfetti();`.

**Step 4:** Trigger full confetti on level complete. Add this `useEffect` to component:

```ts
useEffect(() => {
  if (gameState === 'complete' && correctCount > 0) {
    fireConfetti();
  }
}, [gameState, correctCount]);
```

**Step 5:** Test: confetti appears on correct and on completion.

**Step 6:** Commit.

```bash
git add src/utils/confetti.ts src/pages/MathGame.tsx
git commit -m "feat: add confetti celebrations for correct answers and level completion"
```

---

### Task 6: Progress Bar and Streak

**Step 1:** Add streak state near other state declarations:

```ts
const [streak, setStreak] = useState(0);
```

**Step 2:** Update `check` function:

```ts
if (val === p.answer) {
  setFeedback('correct');
  setCorrectCount(c => c + 1);
  setStreak(s => s + 1);
  updateStars(1);
  burstConfetti();
  setTimeout(() => {
    if (index < problems.length - 1) { setIndex(i => i + 1); setInput(''); setFeedback('none'); }
    else setGameState('complete');
  }, 700);
} else {
  setFeedback('wrong');
  setStreak(0);
  setTimeout(() => { setFeedback('none'); setInput(''); }, 700);
}
```

**Step 3:** Add progress bar UI in playing view. In the playing return, after the HUD and before the main card `<div className="flex-1...">`, insert:

```tsx
{/* Progress Bar */}
<div className="w-full max-w-3xl mx-auto mb-4">
  <div className="flex justify-between text-xs font-bold opacity-60 mb-1">
    <span>Framsteg</span>
    <span>{index + 1}/{problems.length}</span>
  </div>
  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/20 shadow-inner">
    <div
      className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 h-full transition-all duration-500 ease-out rounded-full"
      style={{ width: `${((index + 1) / problems.length) * 100}%` }}
    />
  </div>
</div>
```

**Step 4:** Add streak counter to HUD. Inside HUD right-side (after star count), add:

```tsx
{streak > 1 && (
  <div className="text-sm font-black text-orange-500 flex items-center gap-1 animate-bounce">
    🔥 {streak}
  </div>
)}
```

**Step 5:** Test: progress bar fills, streak shows and resets.

**Step 6:** Commit.

```bash
git add src/pages/MathGame.tsx
git commit -m "feat: add progress bar and streak counter to gameplay"
```

---

### Task 7: Interactive Feedback Animations

**Files:** `src/pages/MathGame.tsx`

**Step 1:** Add CSS keyframes to the component's `<style>` block. Extend existing style or create new. Insert these definitions:

```css
@keyframes pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
.animate-pop { animation: pop 0.3s ease-out; }

@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-2deg); }
  75% { transform: rotate(2deg); }
}
.animate-wiggle { animation: wiggle 0.3s ease-in-out; }

@keyframes glow-pulse {
  0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.5); }
  50% { box-shadow: 0 0 20px 10px rgba(255,255,255,0); }
  100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
}
.animate-glow-pulse { animation: glow-pulse 1s ease-out; }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}
.animate-shake { animation: shake 0.2s ease-in-out infinite; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-float { animation: float 3s ease-in-out infinite; }
```

**Step 2:** Apply `animate-pop` to input. Change input element to:

```tsx
<input
  value={input}
  readOnly
  className={\`w-full p-6 rounded-xl text-6xl text-center bg-white/5 font-black \${feedback === 'correct' ? 'animate-pop' : ''}\`}
/>
```

**Step 3:** Apply `animate-wiggle` to problem card when correct and `animate-shake` when wrong. The card's className becomes:

```tsx
className={\`w-full max-w-3xl p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 text-center shadow-2xl \${feedback === 'correct' ? 'animate-wiggle' : ''} \${feedback === 'wrong' ? 'animate-shake' : ''}\`}
```

**Step 4:** Apply interactive feedback to emoji count boxes: add glow on correct, dim on wrong, and always float.

Find the two containers for a and b:

```tsx
<div className="bg-white/10 p-4 rounded-2xl">
  <VisualCount n={p.a} emoji={level?.op === '+' ? '🍎' : level?.op === '-' ? '🍐' : level?.op === '×' ? '🍇' : '🍪'} />
</div>
```

Modify both to:

```tsx
<div className={\`bg-white/10 p-4 rounded-2xl animate-float \${feedback === 'correct' ? 'animate-glow-pulse' : ''} \${feedback === 'wrong' ? 'opacity-50' : ''}\`}>
  <VisualCount n={p.a} emoji={level?.op === '+' ? '🍎' : level?.op === '-' ? '🍐' : level?.op === '×' ? '🍇' : '🍪'} />
</div>
```

**Step 5:** Input flash red on wrong: update input className with conditional `bg-red-200` when feedback is 'wrong' plus `transition-colors duration-300`.

```tsx
className={\`w-full p-6 rounded-xl text-6xl text-center bg-white/5 font-black transition-colors duration-300 \${feedback === 'correct' ? 'animate-pop' : ''} \${feedback === 'wrong' ? 'bg-red-200' : ''}\`}
```

**Step 6:** Test each feedback scenario.

**Step 7:** Commit.

```bash
git add src/pages/MathGame.tsx
git commit -m "feat: add interactive feedback animations (correct, wrong, float) in Matte Magi"
```

---

### Task 8: Polish Level Selection Cards

**Files:** `src/pages/MathGame.tsx`

**Step 1:** Add level-pulse to "Spela!" indicator.

Find the indicator inside level selection (for next level). The JSX is:

```tsx
<div
  className="mt-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg"
  style={{ background: 'var(--primary-gradient, var(--primary-color))' }}
>
  Spela! ▶
</div>
```

Add `level-pulse` class:

```tsx
<div className="mt-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg level-pulse" style={{ background: 'var(--primary-gradient, var(--primary-color))' }}>
  Spela! ▶
</div>
```

**Step 2:** Add CSS for levelPulse to the component's style block:

```css
@keyframes levelPulse {
  0%, 100% { box-shadow: 0 8px 0 rgba(0,0,0,0.08), 0 0 0 0 var(--primary-color); }
  50% { box-shadow: 0 8px 0 rgba(0,0,0,0.08), 0 0 0 8px transparent; }
}
.level-pulse { animation: levelPulse 2s ease-in-out infinite; }
```

**Step 3:** Ensure visual count boxes in playing view have `animate-float` already added in Task 6.

**Step 4:** Commit.

```bash
git add src/pages/MathGame.tsx
git commit -m "style: add pulse animation to 'Spela!' indicator in level select"
```

---

### Task 9: Completion Screen Animations

**Files:** `src/pages/MathGame.tsx`

**Step 1:** Make stars bounce in completion screen. Change stars rendering from:

```tsx
<div className="flex gap-2">
  {[1,2,3].map(s => (
    <span key={s} className={`text-sm ${s <= stars ? 'drop-shadow-md' : 'opacity-15'}`}>⭐</span>
  ))}
</div>
```

to:

```tsx
<div className="flex gap-2">
  {[1,2,3].map(s => (
    <span key={s} className={\`text-5xl \${s <= stars ? 'animate-bounce drop-shadow-md' : 'opacity-20'}\`} style={{ animationDelay: `${s * 0.15}s` }}>⭐</span>
  ))}
</div>
```

**Step 2:** Add bounce animation to badge:

```tsx
<span className="text-6xl animate-bounce">{level?.badge}</span>
```

**Step 3:** Commit.

```bash
git add src/pages/MathGame.tsx
git commit -m "feat: add bounce animations to stars and badge on level completion"
```

---

### Task 10: Final Testing and Adjustments

**Manual Testing Checklist:**

- **Dashboard**: Matte Magi card animates, navigates to level select on click.
- **Level Select**: Groups display (addition, subtraction, multiplication, division). Completed levels show stars. Next unplayed level shows "Spela!" pulse. Locked levels show lock.
- **Gameplay**:
  - HUD mute toggle works; speaker reads problem when clicking problem speaker.
  - Progress bar updates correctly.
  - Streak counter appears after 2+ correct in a row, resets on wrong.
  - Correct answer: sees confetti burst, input pop, problem wiggle, emoji glow, emoji float.
  - Wrong answer: sees shake, red flash, emoji dim, streak reset.
  - Complete level: full confetti, victory screen with bouncing stars and badge, stars awarded.
- **Collection**: `/samling` shows both ABC and Matte Magi sections; math badges show correct star counts.
- **Themes**: Switch between Unicorn and Hero; all colors adapt smoothly.
- **Responsive**: Test on mobile width (375px) – all elements fit, no overflow.

Adjust any issues discovered during testing (padding, animation timing, colors).

**Final commit:** `git commit -m "feat: enhance Matte-Magi with animations, TTS, confetti, and collection"`

---

## Notes

- All CSS animations use `transform` and `opacity` for GPU acceleration.
- All new components use Tailwind's utility classes and CSS variables for theming.
- The confetti library adds ~2KB; acceptable for engagement gain.
- No breaking changes to existing data structures.
- Follow existing code style (semicolons, quotes, formatting).

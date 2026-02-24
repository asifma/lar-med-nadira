# Matte Magi Enhancement Design

**Date:** 2025-02-24
**Scope:** Improve the Matte-Magi math game to make it more visually appealing, interactive, and fun for kids (ages 6–9)

## Current State

- Functional math game with 20 levels (addition, subtraction, multiplication, division)
- Basic UI: numeric keypad, visual count aids (fruit emojis), simple feedback
- Dashboard card: plain divider icon (➗) with minimal styling, no animation
- Gameplay: displays problem, visual aids, feedback with simple "Rätt!/Fel" messages
- Collection system exists but math game not yet integrated into `/samling`
- Text-to-speech: placeholder button (🔊) non-functional

## Design Goals

1. **Visual Appeal**: Create engaging, animated dashboard card that matches ABC-Äventyr's quality
2. **Interactive Fun**: Add celebration effects, progress tracking, and responsive feedback
3. **Polished UX**: Implement TTS for problem reading; integrate math badges into collection
4. **Theme Consistency**: Support both Unicorn (pastel/magical) and Hero (action/adventure) themes

---

## 1. Dashboard Card: Animated MathCardIllustration

### Component: `src/components/GameCardIllustration.tsx`

**New Design** (Calculator theme):
- Calculator body: rounded rectangle with subtle bounce animation
- Buttons: small circles that light up in a wave pattern
- Numbers (1–9, 0) popping up with scale animation
- Math symbols (+, −, ×, ÷) floating around the calculator
- Sparkles/stars at corners for magical effect

**Technical**:
- SVG-based illustration, viewBox 0 0 120 120
- Use CSS keyframes for continuous gentle animations
- Colors: CSS variables for primary, accent, secondary, text
- Size: w-28 h-28 (className prop)
- No `opacity` or `grayscale` filters – full vibrant color

**Example**: Similar to AbcCardIllustration's structure: multiple `<g>` groups, `<animateTransform>` and `<animate>` for motion.

---

## 2. Gameplay Screen Enhancements

All enhancements apply to `src/pages/MathGame.tsx`.

### A) Celebration Effects

**Correct Answer**:
- Confetti burst: 10–20 particles near input area (canvas overlay or CSS)
- Floating "+1 ⭐" text that rises 50px and fades over 1s
- Emoji count boxes briefly scale up (1.1) and bounce

**Level Complete**:
- Full-screen confetti (multi-color, 50+ particles, physics: gravity, drift)
- Victory modal: large emoji (🎉 or 👏), bouncing stars (bounce sequentially)
- New badge (sticker) appearance: pop-in with rotation and scale

**Implementation**:
- Lightweight confetti: use `canvas-confetti` library or custom Canvas API
- Trigger effects via conditional rendering with CSS animations
- Reuse patterns from SpellingGame where possible

### B) Progress Visualization

**Progress Bar**:
- Horizontal bar segmented into 10 parts at top of game card
- Fills left-to-right as problems are solved
- Theme-colored gradient fill (green → yellow → red style or rainbow)
- Rounded corners, subtle glow

**Streak Counter**:
- Next to problem indicator "⭐ 3/10"
- Show "🔥 Streak: X" in bold, size increases with streak (up to 3×)
- Reset streak to 0 on wrong answer

**Visual**:
- Bar placed just below header or above problem text
- Streak counter: small badge with fire emoji

### C) Interactive Feedback

**Correct**:
- Input field (readonly input) scales to 1.1 then back to 1.0 over 300ms
- Problem text: green tint, slight wiggle (rotate ±2°)
- Visual count boxes: glow (box-shadow) pulse once

**Wrong**:
- Problem card shakes horizontally (translateX ±8px, 2–3 cycles)
- Input field flashes red (bg-red-200) briefly (300ms)
- Visual count boxes: dim opacity 50% then restore after 500ms

**General**:
- Emojis in visual count boxes gently bob up/down continuously (like ABC floating emoji)

---

## 3. Text-to-Speech (TTS)

**Implementation**:
- Import `useSpeech` from `src/contexts/SpeechContext`
- Add state: `const [isMuted, setIsMuted] = useState(false);`
- Add `toggleMute` function; stop speech when muting
- Add `safeSpeak(text)` wrapper that checks mute state

**HUD Button**:
- Right side of header bar, next to star count
- Icon: 🔊 when enabled, 🔇 when muted
- Click toggles mute; tooltip "Lyssna" / "Stäng av"
- Use same style as ABC: text-xl, hover:scale-110

**Problem Reading**:
- On load of each problem, optionally auto-read? Better: add a dedicated speaker icon near the problem text that reads it aloud when clicked.
- Alternatively: Auto-read when problem appears if TTS enabled. Let's follow ABC: The HUD button is mute toggle; there is a separate button on the word emoji that reads the word. For math, we can have a speaker icon near the problem equation that reads it aloud when clicked.

**Speech Content**:
- Read the equation in a friendly way: "Fem plus tre är åtta" or "5 + 3 = ?"
- Use `speak("5 + 3")?` but better to form Swedish phrasing. Given app is Swedish, maybe read "fem plus tre"
- We can keep simple: speak the question text as displayed (e.g., "5 + 3") – that's understandable.
- We can also read the visual aid "Fem äpple plus tre äpple"

**Simplify**: Just read the problem math expression when user clicks a speaker icon near the problem. This matches ABC where clicking the big emoji reads the word.

---

## 4. Sticker Collection Integration

**File**: `src/pages/CollectionPage.tsx`

**Change**:
- Import `mathGame` from `../data/mathLevels`
- Add to `ALL_GAMES` array: `const ALL_GAMES: GameDefinition[] = [abcGame, mathGame];`
- This automatically includes math badges in the collection grid and progress totals.

**No other changes needed** – `completeLevel('math', levelId, stars)` is already called in MathGame; `isLevelCompleted`, `getLevelStars` work generically.

---

## 5. Optional: Unique Badges for Math Levels

**Current**: 4 repeated badges (➕, ➖, ✖️, ➗) across 20 levels.

**Enhancement**: Assign unique math-themed emojis to each level (20 total) to increase collection excitement, similar to ABC's 20 distinct icons (🌱☀️🦋...).

**Approach**:
- Update `src/data/mathLevels.ts`:
  - Replace `badge` property values with unique emojis per level
  - Could use: 1-5: 🧮, 🔢, 1️⃣, 2️⃣, 3️⃣? Better: choose 20 distinct emojis related to math/magic: 🧮, 🔢, 📊, 🧩, 🎲, 🧠, 🌟, ✨, 💡, 🧭, 📐, 📏, ⚖️, 🔍, 🎯, 🏆, 🥇, 🪐, 🧙, 🎩, etc.
  - Keep the operation indicator elsewhere if needed (maybe in level name remains "Addition 1", "Subtraktion 1", etc.)
  - The badge emoji will be used in level selection card and in collection sticker.

**Simpler**: For now, keep repeating badges but show operation-specific distinct badges (e.g., for addition use different apple emojis per level? That's not necessary). We'll leave as is unless we want extra polish.

**Decision**: Keep it simple for now (no extra work), but design allows future upgrade.

---

## 6. Theme Adaptation

All new visual components must use CSS variables:
- `var(--primary-color)`, `var(--primary-gradient)`
- `var(--accent-color)`
- `var(--secondary-color)`
- `var(--text-color)`
- `var(--card-bg)`

This ensures the new animations and colors automatically switch between Unicorn and Hero themes when user toggles.

---

## 7. Additional Animations

**Math level selection cards** (in MathGame state 'selecting'):
- Add subtle hover lift (already present)
- Add pulse animation to "Spela!" indicator on next level (like ABC's level-pulse)
- Add bounce to level badge icon on hover

**Playing screen**:
- Visual count emojis: continuous gentle float (like ABC's `animate-float`)
- Numeric pad: buttons scale down slightly on active press

---

## 8. Implementation Phases

1. **Dashboard Card**: Create animated MathCardIllustration component; update Dashboard.tsx to use it (replace plain icon div)
2. **TTS Functionality**: Implement speaker button in HUD + problem speaker; test speech synthesis
3. **Collection Integration**: Add mathGame to CollectionPage
4. **Progress & Streak**: Add progress bar, streak state and UI
5. **Celebration Confetti**: Integrate confetti library; trigger on correct and complete
6. **Interactive Feedback**: Add CSS animations for correct/wrong; apply to elements
7. **Animations Polish**: Continuous emoji float, improved transitions, visual tweaks
8. **Testing & Bugfix**: Ensure all work across themes, mobile, and accessibility

---

## Success Metrics

- Child testers report "Matte-Magi is fun!"
- Increased engagement: longer play sessions, more level completions
- Visual quality on par with ABC-Äventyr
- No performance issues: 60fps animations, under 100ms input latency

---

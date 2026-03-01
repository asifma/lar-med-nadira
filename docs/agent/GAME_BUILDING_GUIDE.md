# Game Building Guide for Agents

This document serves as a steering guide for AI agents and developers to understand the architecture, design patterns, and conventions for building games in "Lär med Nadira".

## 🎮 Core Game Architecture

Every game in the app follows a standardized structure to ensure a consistent user experience.

### 1. Levels & Progression
- **Level Count**: Typically 20 levels, but can be more if the content requires it (e.g., alphabet tracing with 100+ levels).
- **Difficulty Curve**: 
  - Group levels logically (e.g., Beginners, Intermediate, Advanced, Master).
- **Sub-tasks**: A level usually contains multiple tasks (e.g., 10 spelling words, 10 math problems, or 3-5 coding challenges).
- **Badges**: Each level rewards a unique emoji badge upon completion.
- **Stars**: Players earn 1-3 stars based on their performance (e.g., first-try accuracy, number of moves, tracing accuracy).

### 2. Standard UI Components
Always use the existing UI components to maintain the app's look and feel:
- **`LevelSelector`**: The standard screen for choosing a level. Handles locked/unlocked states, stars, and badges. **Do not build custom level selection screens.**
- **`SpeakableText`**: For text that should be read aloud when clicked.
- **`Button`**: Standardized buttons (`primary`, `secondary`, `accent`).
- **HUD (Heads Up Display)**: The top bar during gameplay. Must match the style used in Memory and Puzzle games. Must include:
  - Back button (`←`)
  - Level name
  - Mute toggle (`🔊`/`🔇`)
  - Progress indicator (e.g., `⭐ 1/5`)
- **Progress Bar**: A visual bar below the HUD showing current task progress.
- **Level Complete Screen**: A standardized celebration screen showing stars earned, the badge, and buttons to play again, go to next level, or return to level select.

### 3. Sound & Effects
- **Speech**: Use `useSpeech()` context for text-to-speech. Respect the `isMuted` state.
- **Confetti**: Use `burstConfetti()` from `src/utils/confetti.ts` for small celebrations (e.g., correct answer) and `fireConfetti()` for level completion.

### 4. Theming
The app supports two themes: **Unicorn** (🦄) and **Hero** (🦸).
- Use CSS variables like `var(--primary-color)`, `var(--accent-color)`, `var(--card-bg)`.
- Avoid hardcoding colors unless they are theme-agnostic (like success green or error red).

## 🛠️ Steps to Create a New Game

### Step 1: Define Types (`src/types.ts`)
Add a new interface extending `BaseGameLevel`.
```typescript
export interface MyGameLevel extends BaseGameLevel {
  tasks: MyTask[];
}
```

### Step 2: Create Game Data (`src/data/myGameLevels.ts`)
Create the 20 levels and export the `GameDefinition`.
```typescript
import type { GameDefinition, MyGameLevel } from '../types';

export const myGame: GameDefinition<MyGameLevel> = {
  id: 'mygame',
  name: 'Mitt Spel',
  icon: '🎮',
  description: 'En kort beskrivning av spelet!',
  route: '/spel/mitt-spel',
  illustration: 'MyGameCardIllustration',
  badge: 'Ny!',
  levels: [ /* 20 levels here */ ]
};
```

### Step 3: Create Card Illustration (`src/components/GameCardIllustration.tsx`)
Add an SVG illustration component for the game card.
```tsx
export const MyGameCardIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={className}>
    <svg viewBox="0 0 120 120">...</svg>
  </div>
);
```

### Step 4: Build the Game Page (`src/pages/MyGame.tsx`)
Implement the game logic. The component should handle three states:
1. `'selecting'`: Render `<LevelSelector>`
2. `'playing'`: Render the HUD, Progress Bar, and Game Content.
3. `'complete'`: Render the celebration screen and call `completeLevel(gameId, levelId, stars)`.

### Step 5: Register the Game (`src/data/gameRegistry.ts`)
Import and add your game to the `GAMES` array.

### Step 6: Add Route (`src/App.tsx`)
Add the route for your new game page.

## 💡 Best Practices
- **Feedback**: Always provide clear visual and auditory feedback for correct/incorrect actions (e.g., shaking animations, green/red colors).
- **Accessibility**: Ensure touch targets are large enough for kids' fingers.
- **State Management**: Use `useProfile` to save progress and `useSettings` to check if levels are fully unlocked by the admin.
- **Animations**: Use Tailwind classes or inline CSS animations for playful interactions (`animate-bounce`, `animate-pulse`, etc.).

# ⚡ Snabbguide: Lägg till ett nytt spel på 5 minuter

## 🎯 Översikt

Tack vare den nya standardiserade strukturen kan du lägga till ett komplett spel på bara 5 steg!

## 📝 Steg 1: Speldata (2 min)

Skapa `src/data/yourGameLevels.ts`:

```typescript
import type { GameDefinition, YourGameLevel } from "../types";

const levels: YourGameLevel[] = [
  { id: 1, name: "Nivå 1", badge: "🌟" /* dina properties */ },
  // ... 20 nivåer totalt
];

export const yourGame: GameDefinition<YourGameLevel> = {
  id: "your-game",
  name: "Ditt Spelnamn",
  icon: "🎮",
  description: "Kort beskrivning!",
  route: "/spel/ditt-spelnamn",
  illustration: "YourGameCardIllustration",
  levels,
};
```

**Om du behöver en ny nivåtyp**, lägg till i `src/types.ts`:

```typescript
export interface YourGameLevel extends BaseGameLevel {
  yourProperty: string;
}

export type GameLevel =
  | SpellingGameLevel
  | MathGameLevel
  | MemoryGameLevel
  | YourGameLevel;
```

## 🎮 Steg 2: Spelkomponent (2 min)

Kopiera `docs/GAME_TEMPLATE.md` och anpassa! Använd `LevelSelector` komponenten för nivåval.

## 🎨 Steg 3: Illustration (30 sek)

Lägg till i `src/components/GameCardIllustration.tsx`:

```typescript
export const YourGameCardIllustration: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <svg viewBox="0 0 120 120">
      {/* Din SVG eller bara en stor emoji */}
      <text x="60" y="70" textAnchor="middle" fontSize="60">🎮</text>
    </svg>
  </div>
);
```

## 📋 Steg 4: Registrera (15 sek)

I `src/data/gameRegistry.ts`:

```typescript
import { yourGame } from "./yourGameLevels";

export const GAMES: GameDefinition[] = [
  { ...abcGame /* ... */ },
  { ...mathGame /* ... */ },
  { ...memoryGame /* ... */ },
  { ...yourGame /* ... */ }, // ← Lägg till här!
];
```

## 🛣️ Steg 5: Route (15 sek)

I `src/App.tsx`:

```typescript
import YourGame from './pages/YourGame';

// I Routes:
<Route path="/spel/ditt-spelnamn" element={<YourGame />} />
```

## ✅ Klart!

Ditt spel visas nu automatiskt på:

- ✅ Dashboard (spelkort)
- ✅ Samlingssidan (märkessamling)
- ✅ Alla teman fungerar
- ✅ Framstegsspårning fungerar

## 🧪 Testa

```bash
npm run dev
```

Navigera till dashboard och se ditt nya spelkort!

## 📚 Exempel

Se `src/pages/MemoryGame.tsx` för ett komplett exempel på ett enkelt memory-spel som implementerades på 5 minuter.

## 💡 Tips

- Använd `LevelSelector` för nivåval (redan färdig!)
- Använd `useProfile()` hooks för framsteg
- Använd `useSpeech()` för text-till-tal
- Följ samma UI-mönster som andra spel
- Testa båda teman (Enhörning & Hjälte)

## 🎉 Exempel: Memory-spelet

Memory-spelet lades till med exakt dessa 5 steg och tog ~5 minuter. Kolla koden:

- `src/data/memoryLevels.ts` - 60 rader
- `src/pages/MemoryGame.tsx` - 180 rader
- `src/components/GameCardIllustration.tsx` - 15 rader tillagda
- `src/data/gameRegistry.ts` - 8 rader tillagda
- `src/App.tsx` - 2 rader tillagda

**Totalt: ~265 rader kod för ett komplett spel med 20 nivåer!**

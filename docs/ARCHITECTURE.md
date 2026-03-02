# 🏗️ Arkitektur - Lär med Nadira

## 📊 Systemöversikt

```
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ ThemeContext │  │ ProfileContext│  │ SpeechContext│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      React Router                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Welcome  │  │Dashboard │  │  Games   │  │Collection│   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Game Registry                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ ABC Game │  │Math Game │  │Memory Gm │  ← Lägg till här!│
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

## 🎮 Spelstruktur

### Före standardisering ❌

```
Dashboard.tsx
├── Hårdkodad ABC-kort
├── Hårdkodad Math-kort
└── Hårdkodad Puzzle-kort

CollectionPage.tsx
├── Manuell import av abcGame
├── Manuell import av mathGame
└── Hårdkodad logik för varje spel

SpellingGame.tsx
└── Egen nivåval-UI (duplicerad kod)

MathGame.tsx
└── Egen nivåval-UI (duplicerad kod)
```

### Efter standardisering ✅

```
gameRegistry.ts (Single Source of Truth)
├── GAMES array
│   ├── abcGame
│   ├── mathGame
│   └── memoryGame ← Lägg bara till här!

Dashboard.tsx
└── GAMES.map(game => <GameCard game={game} />)  ← Automatisk!

CollectionPage.tsx
└── GAMES.map(game => ...)  ← Automatisk!

SpellingGame.tsx
└── <LevelSelector ... />  ← Återanvänd komponent!

MathGame.tsx
└── <LevelSelector ... />  ← Återanvänd komponent!

MemoryGame.tsx
└── <LevelSelector ... />  ← Återanvänd komponent!
```

## 📁 Filstruktur för spel

```
src/
├── data/
│   ├── gameRegistry.ts      ← REGISTRERA HÄR
│   ├── abcWords.ts          ← Speldata
│   ├── mathLevels.ts        ← Speldata
│   └── memoryLevels.ts      ← Speldata (nytt!)
│
├── pages/
│   ├── SpellingGame.tsx     ← Spellogik
│   ├── MathGame.tsx         ← Spellogik
│   └── MemoryGame.tsx       ← Spellogik (nytt!)
│
├── components/
│   ├── GameCard.tsx         ← Återanvändbar spelkort
│   ├── LevelSelector.tsx    ← Återanvändbar nivåväljare
│   └── GameCardIllustration.tsx  ← Illustrationer
│
└── types.ts                 ← Typdefinitioner
```

## 🔄 Dataflöde

### Spelregistrering

```
1. Skapa speldata
   memoryLevels.ts → GameDefinition<MemoryGameLevel>

2. Registrera i registry
   gameRegistry.ts → GAMES.push(memoryGame)

3. Automatisk integration
   Dashboard → läser GAMES → renderar GameCard
   CollectionPage → läser GAMES → visar märken
```

### Spelflöde

```
Dashboard
   ↓ (klick på GameCard)
YourGame (selecting state)
   ↓ (använder LevelSelector)
YourGame (playing state)
   ↓ (spellogik)
YourGame (complete state)
   ↓ (completeLevel())
ProfileContext → sparar framsteg
   ↓
CollectionPage → visar märken
```

## 🧩 Komponenter

### GameCard (Återanvändbar)

```typescript
<GameCard
  game={gameDefinition}  // Från gameRegistry
  isComingSoon={false}   // Valfri
/>
```

**Vad den gör:**

- Visar spelikon, namn, beskrivning
- Hanterar navigation till spelet
- Visar badge ("Ny!", "Populärt!")
- Stödjer båda teman automatiskt

### LevelSelector (Återanvändbar)

```typescript
<LevelSelector
  gameId="memory"
  gameName="Minnes-Magi"
  levelGroups={levelGroups}
  levelIcons={levelIcons}
  isLevelUnlocked={isLevelUnlocked}
  isLevelCompleted={isLevelCompleted}
  getLevelStars={getLevelStars}
  isFullyUnlocked={isFullyUnlocked}
  onLevelSelect={startLevel}
  onBack={() => navigate('/dashboard')}
/>
```

**Vad den gör:**

- Visar alla nivåer i grupper
- Hanterar låsning/upplåsning
- Visar stjärnor och märken
- Animerar nästa nivå
- Stödjer båda teman automatiskt

## 🎨 Teman

Appen använder CSS-variabler för teman:

```css
/* Unicorn Theme */
--primary-color: #ff6b9d --secondary-color: #c77dff --accent-color: #ffd93d
  --bg-gradient: linear-gradient(...) /* Hero Theme */ --primary-color: #ff6b35
  --secondary-color: #004e89 --accent-color: #ffd23f
  --bg-gradient: linear-gradient(...);
```

Alla komponenter använder dessa variabler automatiskt!

## 💾 Datalagring

```
localStorage
├── lmn_profiles          → Array<Profile>
├── lmn_active_profile    → string (profile.id)
├── lmn_settings          → AppSettings
└── lmn_global_theme      → ThemeType
```

## 🔌 Hooks & Contexts

### useProfile()

```typescript
const {
  activeProfile, // Aktiv profil
  updateStars, // Lägg till stjärnor
  completeLevel, // Markera nivå som klar
  isLevelUnlocked, // Kolla om nivå är upplåst
  isLevelCompleted, // Kolla om nivå är klar
  getLevelStars, // Hämta stjärnor för nivå
} = useProfile();
```

### useSpeech()

```typescript
const {
  speak, // Spela upp text (använder audio sprite eller talsyntes)
  speakSequence, // Spela upp en sekvens av texter med paus emellan
  stop, // Stoppa uppspelning
} = useSpeech();
```

### useSettings()

```typescript
const {
  settings, // AppSettings
  isGameFullyUnlocked, // Kolla om spel är upplåst
} = useSettings();
```

## 🎯 Lägg till ett spel - Checklista

- [ ] **Steg 1**: Skapa `src/data/yourGameLevels.ts`
- [ ] **Steg 2**: Skapa `src/pages/YourGame.tsx`
- [ ] **Steg 3**: Lägg till illustration i `src/components/GameCardIllustration.tsx`
- [ ] **Steg 4**: Registrera i `src/data/gameRegistry.ts`
- [ ] **Steg 5**: Lägg till route i `src/App.tsx`

**Det är allt!** Dashboard och Collection uppdateras automatiskt.

## 🧪 Testning

```bash
npm run dev
```

Testa:

1. Spelkort visas på Dashboard ✓
2. Klicka på kort → navigerar till spel ✓
3. Nivåväljare visas korrekt ✓
4. Spela nivå → framsteg sparas ✓
5. Märken visas i Collection ✓
6. Båda teman fungerar ✓

## 📖 Mer information

- **Detaljerad guide**: [ADDING_GAMES.md](ADDING_GAMES.md)
- **Komplett mall**: [GAME_TEMPLATE.md](GAME_TEMPLATE.md)
- **Exempel**: Se `src/pages/MemoryGame.tsx`

## 🎉 Exempel: Memory-spelet

Memory-spelet lades till med exakt denna process:

1. ✅ `src/data/memoryLevels.ts` - 60 rader
2. ✅ `src/pages/MemoryGame.tsx` - 180 rader
3. ✅ `src/components/GameCardIllustration.tsx` - 15 rader
4. ✅ `src/data/gameRegistry.ts` - 8 rader
5. ✅ `src/App.tsx` - 2 rader

**Totalt: 5 minuter, 265 rader kod, komplett spel med 20 nivåer!**

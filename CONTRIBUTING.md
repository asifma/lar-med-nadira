# Bidra till Lär med Nadira

Tack för att du överväger att bidra till Lär med Nadira! 🎉

Detta dokument ger riktlinjer för hur du kan bidra till projektet.

## 🌟 Vår Vision

Vi tror på att demokratisera lärande. Varje bidrag, stort som litet, hjälper oss att göra högkvalitativ utbildning tillgänglig för alla barn.

## 🤝 Hur kan jag bidra?

### 🐛 Rapportera Buggar

Innan du rapporterar en bugg:
- Kontrollera att buggen inte redan är rapporterad i [Issues](https://github.com/asifma/lar-med-nadira-3/issues)
- Testa med senaste versionen av appen

När du rapporterar en bugg, inkludera:
- **Tydlig titel** som beskriver problemet
- **Steg för att återskapa** buggen
- **Förväntat beteende** vs **faktiskt beteende**
- **Skärmdumpar** om relevant
- **Enhet och webbläsare** (t.ex. "iPad Safari 17")
- **Konsol-loggar** om det finns JavaScript-fel

### ✨ Föreslå Nya Funktioner

Vi älskar nya idéer! När du föreslår en funktion:
- Beskriv **problemet** funktionen skulle lösa
- Förklara **hur** funktionen skulle fungera
- Överväg **alternativa lösningar**
- Tänk på **målgruppen** (barn 6-9 år)

### 🎮 Lägg till Nya Spel

Vill du skapa ett nytt spel? Fantastiskt! 

**📖 Läs den kompletta guiden: [docs/ADDING_GAMES.md](docs/ADDING_GAMES.md)**

**🎯 Använd mallen: [docs/GAME_TEMPLATE.md](docs/GAME_TEMPLATE.md)**

#### Snabbstart (5 steg)

1. **Skapa speldata** i `src/data/yourGameLevels.ts`
2. **Skapa spelkomponent** i `src/pages/YourGame.tsx`
3. **Lägg till illustration** i `src/components/GameCardIllustration.tsx`
4. **Registrera spelet** i `src/data/gameRegistry.ts`
5. **Lägg till route** i `src/App.tsx`

Det är allt! Dashboard och samlingssidan uppdateras automatiskt.

#### Testa
- [ ] Fungerar spelet i båda teman?
- [ ] Är instruktioner tydliga för barn?
- [ ] Fungerar text-till-tal?
- [ ] Är animationer smidiga?
- [ ] Sparas framsteg korrekt?
- [ ] Fungerar på mobil och desktop?

### 📝 Förbättra Dokumentation

Dokumentation är lika viktig som kod! Du kan:
- Förbättra README
- Lägga till kodkommentarer
- Skriva tutorials
- Översätta till andra språk

### 🎨 Design & UX

Designbidrag är välkomna:
- Nya teman
- Förbättrade animationer
- Nya avatarer (emoji eller SVG)
- Märken och belöningar
- Ikoner och illustrationer

## 💻 Utvecklingsmiljö

### Setup

```bash
# Klona ditt fork
git clone https://github.com/DITT-ANVÄNDARNAMN/lar-med-nadira-3.git
cd lar-med-nadira-3

# Installera beroenden
npm install

# Starta dev-server
npm run dev
```

### Kodstil

Vi använder:
- **TypeScript** för typsäkerhet
- **React Hooks** (inga class components)
- **Functional components**
- **CSS Variables** för teman
- **Tailwind CSS** för styling

#### Namnkonventioner
```typescript
// Komponenter: PascalCase
const MyComponent: React.FC = () => {};

// Funktioner: camelCase
const handleClick = () => {};

// Konstanter: UPPER_SNAKE_CASE
const MAX_ATTEMPTS = 3;

// Interfaces: PascalCase med I-prefix (valfritt)
interface GameLevel {
  id: number;
  name: string;
}
```

#### Kommentarer
```typescript
// ✅ Bra: Förklarar VARFÖR
// Använd shuffle för att undvika att barn memorerar ordning
const shuffledWords = shuffleArray(words);

// ❌ Dåligt: Förklarar VAD (uppenbart från koden)
// Shuffla orden
const shuffledWords = shuffleArray(words);
```

### Commit-meddelanden

Följ [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: lägg till matte-spel
fix: rätta stavfel i nivå 5
docs: uppdatera README med nya instruktioner
style: förbättra knapp-animationer
refactor: förenkla spellogik
test: lägg till tester för ProfileContext
chore: uppdatera beroenden
```

### Branching

```bash
# Skapa en feature branch
git checkout -b feature/amazing-feature

# Eller en bugfix branch
git checkout -b fix/bug-description
```

## 🧪 Testning

### Manuell Testning

Testa alltid:
1. **Båda teman** (Enhörning & Hjälte)
2. **Olika enheter** (desktop, mobil, surfplatta)
3. **Olika webbläsare** (Chrome, Firefox, Safari)
4. **Offline-läge** (stäng av internet)
5. **Flera profiler** (skapa, byt, ta bort)
6. **Text-till-tal** (alla instruktioner)

### Testa med Barn

Om möjligt, testa med barn i målgruppen (6-9 år):
- Förstår de instruktionerna?
- Är spelet för lätt/svårt?
- Är det roligt och engagerande?
- Fungerar belöningssystemet motiverande?

## 📋 Pull Request Process

1. **Uppdatera din fork**
   ```bash
   git remote add upstream https://github.com/asifma/lar-med-nadira-3.git
   git fetch upstream
   git merge upstream/main
   ```

2. **Gör dina ändringar**
   - Följ kodstilen
   - Lägg till kommentarer
   - Testa noga

3. **Commit**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

4. **Push**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Öppna Pull Request**
   - Använd vår [PR template](.github/PULL_REQUEST_TEMPLATE.md)
   - Beskriv dina ändringar tydligt
   - Länka till relaterade issues
   - Lägg till skärmdumpar

6. **Code Review**
   - Var öppen för feedback
   - Svara på kommentarer
   - Gör begärda ändringar

7. **Merge**
   - När PR är godkänd, mergas den av en maintainer
   - Din kod är nu del av projektet! 🎉

## 🎯 Prioriterade Områden

Vi behöver särskilt hjälp med:

### Högt Prioriterade
- 🎮 Nya spel (matte, pussel, läsförståelse)
- 🌍 Översättningar (engelska, arabiska, etc.)
- ♿ Tillgänglighetsförbättringar
- 📱 PWA-optimeringar

### Medel Prioriterade
- 🎨 Nya teman och avatarer
- 📊 Förbättrad statistik för föräldrar
- 🔊 Ljudeffekter och musik
- 📝 Fler ordlistor och nivåer

### Lågt Prioriterade
- 🧹 Kodrefaktorering
- 📚 Dokumentationsförbättringar
- 🎭 Animationsförbättringar

## ❓ Frågor?

Tveka inte att:
- Öppna en [Discussion](https://github.com/asifma/lar-med-nadira-3/discussions)
- Skapa en [Issue](https://github.com/asifma/lar-med-nadira-3/issues)
- Kontakta [@asifma](https://github.com/asifma)

## 📜 Uppförandekod

### Vårt Löfte

Vi är engagerade i att tillhandahålla en välkomnande och inspirerande community för alla.

### Våra Standarder

✅ **Gör:**
- Var respektfull och inkluderande
- Välkomna nybörjare
- Ge konstruktiv feedback
- Fokusera på vad som är bäst för barnen

❌ **Gör inte:**
- Använd olämpligt språk
- Trakassera eller mobba
- Publicera andras privata information
- Agera oprofessionellt

## 🙏 Tack!

Varje bidrag, stort som litet, gör skillnad. Tillsammans kan vi göra lärande tillgängligt för alla barn.

**Tack för att du gör världen till en bättre plats, ett barn i taget.** ❤️

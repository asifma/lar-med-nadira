# ✅ Checklista: Lägg till ett nytt spel

Använd denna checklista när du lägger till ett nytt spel.

## 📋 Före du börjar

- [ ] Läs [QUICK_START_NEW_GAME.md](QUICK_START_NEW_GAME.md)
- [ ] Bestäm spelnamn, ID och lärandemål
- [ ] Skissa spelmekanik på papper
- [ ] Planera 20 nivåer med progressiv svårighet

## 🛠️ Implementation

### Steg 1: Speldata
- [ ] Skapa `src/data/yourGameLevels.ts`
- [ ] Definiera nivåtyp i `src/types.ts` (om ny typ behövs)
- [ ] Skapa 20 nivåer med progressiv svårighet
- [ ] Exportera `GameDefinition<YourGameLevel>`
- [ ] Inkludera: id, name, icon, description, route, illustration, levels

### Steg 2: Spelkomponent
- [ ] Skapa `src/pages/YourGame.tsx`
- [ ] Implementera tre states: 'selecting', 'playing', 'complete'
- [ ] Använd `LevelSelector` för nivåval
- [ ] Implementera spellogik
- [ ] Lägg till HUD med tillbaka-knapp, nivåinfo, framsteg
- [ ] Implementera completion screen med stjärnor
- [ ] Använd `useProfile()` hooks: updateStars, completeLevel
- [ ] Använd `useSpeech()` för text-till-tal (valfritt)

### Steg 3: Illustration
- [ ] Öppna `src/components/GameCardIllustration.tsx`
- [ ] Lägg till `YourGameCardIllustration` komponent
- [ ] Använd SVG eller emoji
- [ ] Testa att den ser bra ut i båda teman

### Steg 4: Registrering
- [ ] Öppna `src/data/gameRegistry.ts`
- [ ] Importera ditt spel
- [ ] Lägg till i `GAMES` array
- [ ] Verifiera alla properties är ifyllda

### Steg 5: Route
- [ ] Öppna `src/App.tsx`
- [ ] Importera din spelkomponent
- [ ] Lägg till `<Route path="..." element={<YourGame />} />`

## 🧪 Testning

### Funktionalitet
- [ ] Spelkort visas på Dashboard
- [ ] Klick på kort navigerar till spel
- [ ] Nivåväljare visas korrekt
- [ ] Alla 20 nivåer kan spelas
- [ ] Låsmekanismen fungerar (nivå 1 öppen, resten låsta)
- [ ] Stjärnor tilldelas korrekt (3/2/1 baserat på prestation)
- [ ] Märken sparas i profilen
- [ ] Completion screen visas med rätt stjärnor
- [ ] "Nästa nivå" knapp fungerar
- [ ] Märken visas i Collection page
- [ ] Framsteg sparas mellan sessioner

### UI/UX
- [ ] Enhörningstema ser bra ut
- [ ] Hjältetema ser bra ut
- [ ] Responsiv på mobil (320px+)
- [ ] Responsiv på surfplatta (768px+)
- [ ] Responsiv på desktop (1024px+)
- [ ] Animationer är smidiga
- [ ] Inga layout-shifts
- [ ] Text är läsbar i båda teman

### Tillgänglighet
- [ ] Text-till-tal fungerar (om implementerat)
- [ ] Knappar har hover-states
- [ ] Fokus-states är synliga
- [ ] Färgkontrast är tillräcklig
- [ ] Touch-targets är minst 44x44px

### Prestanda
- [ ] Inga console errors
- [ ] Inga console warnings
- [ ] Spelet laddar snabbt (<1s)
- [ ] Animationer är 60fps
- [ ] Ingen memory leak vid upprepade spel

### Webbläsare
- [ ] Chrome/Edge (senaste)
- [ ] Firefox (senaste)
- [ ] Safari (senaste)
- [ ] Safari iOS (senaste)
- [ ] Chrome Android (senaste)

## 📝 Dokumentation

- [ ] Kommentarer i koden
- [ ] JSDoc för publika funktioner
- [ ] README uppdaterad (om relevant)
- [ ] CONTRIBUTING.md uppdaterad (om relevant)

## 🎨 Kodkvalitet

- [ ] TypeScript errors: 0
- [ ] Följer projektets kodstil
- [ ] Inga hårdkodade värden (använd konstanter)
- [ ] Inga TODO-kommentarer kvar
- [ ] Inga console.log kvar
- [ ] Inga onödiga dependencies

## 📤 Pull Request

- [ ] Branch namn: `feature/add-your-game`
- [ ] Commit message: `feat: add Your Game with 20 levels`
- [ ] PR beskrivning inkluderar:
  - [ ] Vad spelet lär ut
  - [ ] Skärmdumpar från båda teman
  - [ ] GIF av spelmekanik
  - [ ] Testresultat
- [ ] Länka till relaterade issues
- [ ] Begär review från maintainer

## 🎉 Efter merge

- [ ] Testa i produktion
- [ ] Dela på sociala medier
- [ ] Uppdatera roadmap
- [ ] Fira! 🎊

## 💡 Tips

- Börja enkelt - gör spelet spelbart först, polera sen
- Testa med riktiga barn om möjligt
- Fråga i Discussions om du kör fast
- Kolla Memory-spelet som referens
- Ha kul! 🎮

## 📞 Hjälp

Behöver du hjälp? 
- 💬 [GitHub Discussions](https://github.com/asifma/lar-med-nadira/discussions)
- 🐛 [GitHub Issues](https://github.com/asifma/lar-med-nadira/issues)

# 🦄 Lär med Nadira

<div align="center">

![Lär med Nadira](https://img.shields.io/badge/Lär_med_Nadira-v1.0-FF6B9D?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-CC_BY--NC_4.0-orange?style=for-the-badge)

**En rolig, svenskspråkig lärapp för barn i åldern 6–9 år**

[Demo](https://nadira.mithawala.com) • [Rapportera Bug](https://github.com/asifma/lar-med-nadira/issues) • [Föreslå Feature](https://github.com/asifma/lar-med-nadira/issues)

</div>

---

## 📸 Skärmdumpar

<div align="center">

| Enhörningsvärlden 🦄 | Hjältevärlden 🦸 |
|:---:|:---:|
| ![Välkomstsida – Enhörning](docs/screenshots/welcome-unicorn.png) | ![Välkomstsida – Hjälte](docs/screenshots/welcome-hero.png) |
| ![Dashboard – Enhörning](docs/screenshots/dashboard-unicorn.png) | ![Dashboard – Hjälte](docs/screenshots/dashboard-hero.png) |

</div>

---

## 🌟 Vision

**Lärande ska vara gratis, tillgängligt och roligt för alla barn.**

Jag tror på att demokratisera lärande. Varje barn, oavsett bakgrund eller ekonomiska förutsättningar, förtjänar tillgång till högkvalitativa läromedel. Lär med Nadira är mitt bidrag till denna vision – en helt gratis, reklamfri och säker lärapp som hjälper barn att utveckla sina språkkunskaper genom lek.

Appen är byggd med öppen källkod för att möjliggöra för lärare, föräldrar och utvecklare att bidra, anpassa och förbättra upplevelsen för barn över hela världen.

---

## ✨ Funktioner

### 🎮 Interaktiva Spel
- **ABC-Äventyr**: 20 progressiva nivåer för stavningsträning
  - Nybörjare (nivå 1-5): Korta ord med full hjälp
  - Mellannivå (nivå 6-10): Medellånga ord
  - Utmanare (nivå 11-14): Längre ord med ledtrådar
  - Mästare (nivå 15-20): Avancerade ord utan hjälp
- Svenskt tangentbord med Å, Ä, Ö
- Text-till-tal för alla ord och instruktioner
- Stjärnsystem för motivation

### 🎨 Två Magiska Teman
- **Enhörningsvärlden** 🦄: Pastellfärger och magisk atmosfär
- **Hjältevärlden** 🦸: Modig och äventyrlig design
- Animerade bakgrundselement
- Tema-anpassade färger och effekter

### 👤 Profilhantering
- Flera barnprofiler per enhet
- 24 roliga avatarer att välja mellan
- Individuell framstegsspårning
- Märkessamling för varje nivå

### 🔒 Säkerhet & Integritet
- **Ingen datainsamling**: All data sparas lokalt
- **Inga annonser**: 100% reklamfri upplevelse
- **PIN-skyddad admin**: Föräldrakontroll

### 📊 Föräldrafunktioner
- Framstegsspårning per barn
- Anpassningsbara inställningar
- Rösthastighetskontroll
- Exportera/importera data

---

## 🚀 Kom Igång

### Förutsättningar
- Node.js 18+ 
- npm eller yarn

### Installation

```bash
# Klona repot
git clone https://github.com/asifma/lar-med-nadira.git

# Gå in i projektkatalogen
cd lar-med-nadira

# Installera beroenden
npm install

# Starta utvecklingsservern
npm run dev
```

Appen körs nu på `http://localhost:3000`

### Bygga för Produktion

```bash
# Bygg appen
npm run build

# Förhandsgranska produktionsbygget
npm run preview
```

---

## 🏗️ Teknisk Stack

- **Frontend**: React 19.2 + TypeScript
- **Styling**: Tailwind CSS 4.2
- **Routing**: React Router 7
- **Build Tool**: Vite 6.2
- **PWA**: Service Worker för offline-stöd
- **Speech**: Web Speech API

---

## 📁 Projektstruktur

```
lar-med-nadira/
├── docs/screenshots/    # Skärmdumpar
├── public/              # Statiska filer (ikoner, manifest)
├── src/
│   ├── components/      # Återanvändbara komponenter
│   │   ├── Button.tsx
│   │   ├── ConfirmDialog.tsx
│   │   ├── SpeakableText.tsx
│   │   └── ...
│   ├── contexts/        # React Context providers
│   │   ├── ProfileContext.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── SpeechContext.tsx
│   │   └── SettingsContext.tsx
│   ├── data/           # Speldata och ordlistor
│   │   └── abcWords.ts
│   ├── pages/          # Sidkomponenter
│   │   ├── Dashboard.tsx
│   │   ├── SpellingGame.tsx
│   │   ├── ProfileWizard.tsx
│   │   └── ...
│   ├── types.ts        # TypeScript typdefinitioner
│   ├── index.css       # Globala stilar och teman
│   └── App.tsx         # Huvudkomponent
├── index.html
├── vite.config.ts
└── package.json
```

---

## 🤝 Bidra

Jag välkomnar bidrag från alla! Oavsett om du är lärare, förälder, designer eller utvecklare – din input är värdefull.

### Hur du kan bidra

#### 🎮 Lägg till nya spel
Vill du skapa ett nytt spel? Fantastiskt! Följ dessa steg:

1. Skapa en ny fil i `src/data/` (t.ex. `mathGame.ts`)
2. Definiera spelets struktur enligt `GameDefinition` typen
3. Lägg till spelkortet i `Dashboard.tsx`
4. Skapa spelkomponenten i `src/pages/`
5. Testa grundligt med barn i målgruppen

#### 📝 Förbättra ordlistor
- Lägg till fler ord i `src/data/abcWords.ts`
- Föreslå bättre emoji-representationer
- Skapa tematiska ordlistor (djur, mat, etc.)

#### 🎨 Design & UX
- Föreslå nya teman
- Förbättra animationer
- Skapa nya avatarer
- Designa märken och belöningar

#### 🐛 Rapportera buggar
Hittade du en bugg? [Skapa en issue](https://github.com/asifma/lar-med-nadira/issues) med:
- Beskrivning av problemet
- Steg för att återskapa
- Förväntad vs faktisk beteende
- Skärmdumpar (om relevant)

### Pull Request Process

1. **Forka** repot
2. **Skapa en branch**: `git checkout -b feature/amazing-feature`
3. **Gör dina ändringar** och testa noga
4. **Commit**: `git commit -m 'Add amazing feature'`
5. **Push**: `git push origin feature/amazing-feature`
6. **Öppna en Pull Request** med vår [PR template](.github/PULL_REQUEST_TEMPLATE.md)

Se [CONTRIBUTING.md](CONTRIBUTING.md) för detaljerade riktlinjer.

---

## 📋 Roadmap

### Version 1.1 (Planerad)
- [ ] Matte-Magi spel (addition, subtraktion)
- [ ] Pussel-Palats (logiska pussel)
- [ ] Dagliga utmaningar
- [ ] Förbättrad statistik för föräldrar

### Version 1.2 (Framtida)
- [ ] Flerspråksstöd (engelska)
- [ ] Anpassningsbara svårighetsgrader
- [ ] Ljudeffekter och bakgrundsmusik
- [ ] Exportera framstegsrapporter

### Långsiktigt
- [ ] Lärarportal för klassrumsanvändning
- [ ] Community-skapade spel
- [ ] Tillgänglighetsförbättringar
- [ ] Android/iOS native apps

---

## 📜 Licens

Detta projekt är licensierat under **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** - se [LICENSE](LICENSE) filen för detaljer.

**Vad betyder det?**
- ✅ Du får använda, kopiera, modifiera och distribuera koden
- ✅ Du måste ange Asif Mithawala som upphovsman
- ❌ Du får **INTE** använda den kommersiellt
- ✅ Perfekt för utbildning, personligt bruk och icke-kommersiella projekt
- 💼 För kommersiell användning, kontakta: [mithawala.com](https://mithawala.com/)

**Varför icke-kommersiell?**
Lärande ska vara gratis och tillgängligt för alla barn. Denna licens säkerställer att appen förblir fri från kommersiella intressen samtidigt som den är öppen för bidrag från communityn.

---

## 🙏 Erkännanden

- **Barn och föräldrar** som testat appen och gett feedback
- **Open source-communityn** för fantastiska verktyg
- **Lärare** som inspirerat innehållet
- Alla som bidrar till att göra lärande tillgängligt för alla

---

## 👨‍💻 Skapare

**Asif Mithawala**
- Website: [mithawala.com](https://mithawala.com/)
- GitHub: [@asifma](https://github.com/asifma)

Utvecklad med ❤️ för att demokratisera lärande

---

## 📞 Support

Har du frågor eller behöver hjälp?
- 📧 Skapa en [GitHub Issue](https://github.com/asifma/lar-med-nadira/issues)
- 💬 Starta en [Discussion](https://github.com/asifma/lar-med-nadira/discussions)

---

<div align="center">

**Om du gillar projektet, ge det en ⭐ på GitHub!**

Det hjälper fler att upptäcka appen och motiverar fortsatt utveckling.

</div>

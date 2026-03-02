import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import { tracingGame } from '../data/tracingLevels';
import Button from '../components/Button';
import LevelSelector from '../components/LevelSelector';
import { useSettings } from '../contexts/SettingsContext';
import { useSpeech } from '../contexts/SpeechContext';
import { burstConfetti, fireConfetti } from '../utils/confetti';

const COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#3b82f6', // blue
  '#a855f7', // purple
  '#ec4899', // pink
  '#14b8a6', // teal
  '#000000', // black
  '#0ea5e9', // sky blue
];

const PRAISE_MESSAGES = [
  "Bra jobbat!",
  "Du gjorde helt rätt!",
  "Fantastiskt spårat!",
  "Superbra!",
  "Snyggt skrivet!",
  "Det där var perfekt!",
  "Toppen!",
  "Du klarade det galant!",
  "Fortsätt så!",
  "Så duktig du är!",
  "Helt rätt!",
  "Strålande!",
  "Du följer linjerna jätte bra!",
  "Imponerande!",
  "Det där satt perfekt!",
  "Heja dig!",
  "Du fixade det!"
] as const;

const TracingGame: React.FC = () => {
  const navigate = useNavigate();
  const { activeProfile, updateStars, completeLevel, isLevelCompleted, isLevelUnlocked, getLevelStars, addStreak } = useProfile();
  const { isGameFullyUnlocked, settings } = useSettings();
  const { speak, stop } = useSpeech();

  const [gameState, setGameState] = useState<'selecting' | 'playing' | 'complete'>('selecting');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const level = useMemo(() => tracingGame.levels.find((l: any) => l.id === selectedLevel), [selectedLevel]);
  
  const [isMuted, setIsMuted] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLORS[4]);

  const [dots, setDots] = useState<{x: number, y: number, touched: boolean}[]>([]);
  const [failShake, setFailShake] = useState(false);
  const [streak, setStreak] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef<{ x: number, y: number } | null>(null);
  
  const hitboxDataRef = useRef<Uint8ClampedArray | null>(null);
  const canvasWidthRef = useRef<number>(0);
  const outsideCountRef = useRef<number>(0);

  const [fontLoaded, setFontLoaded] = useState(false);
  const [praiseMessage, setPraiseMessage] = useState<string>('');

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@200;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    document.fonts.ready.then(() => {
      setFontLoaded(true);
    });

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Auto-play the target letter/word when level starts (if enabled)
  useEffect(() => {
    if (gameState === 'playing' && level && settings.autoPlayInstructions && !isMuted) {
      const timer = setTimeout(() => {
        speak(level.target);
      }, 300); // Slight delay for UX
      return () => clearTimeout(timer);
    }
  }, [gameState, selectedLevel, settings.autoPlayInstructions, level, speak, isMuted]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const playSound = (type: 'success' | 'complete') => {
    // Sounds removed per user request
  };

  const startGame = (levelId: number) => {
    setSelectedLevel(levelId);
    setGameState('playing');
    setHasDrawn(false);
    setStreak(0);
    setDots([]);
    setPraiseMessage('');
    clearCanvas();
  };

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement> | PointerEvent) => {
    if (!canvasRef.current) return null;
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const updateDots = (currentPos: {x: number, y: number}, previousPos: {x: number, y: number} | null) => {
    setDots(prev => {
      let changed = false;
      const next = prev.map(dot => {
        if (dot.touched) return dot;
        
        let dist;
        if (previousPos) {
          const l2 = (currentPos.x - previousPos.x)**2 + (currentPos.y - previousPos.y)**2;
          if (l2 === 0) {
            dist = Math.hypot(dot.x - currentPos.x, dot.y - currentPos.y);
          } else {
            let t = ((dot.x - previousPos.x) * (currentPos.x - previousPos.x) + (dot.y - previousPos.y) * (currentPos.y - previousPos.y)) / l2;
            t = Math.max(0, Math.min(1, t));
            const projX = previousPos.x + t * (currentPos.x - previousPos.x);
            const projY = previousPos.y + t * (currentPos.y - previousPos.y);
            dist = Math.hypot(dot.x - projX, dot.y - projY);
          }
        } else {
          dist = Math.hypot(dot.x - currentPos.x, dot.y - currentPos.y);
        }

        if (dist < 24) {
          changed = true;
          return { ...dot, touched: true };
        }
        return dot;
      });
      return changed ? next : prev;
    });
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setHasDrawn(false);
    setDots(prev => prev.map(d => ({ ...d, touched: false })));
    outsideCountRef.current = 0;
  };

  const handleFail = () => {
    setFailShake(true);
    setStreak(0);
    clearCanvas();
    setTimeout(() => setFailShake(false), 500);
  };

  const checkOutside = (pos: {x: number, y: number}) => {
    if (!hitboxDataRef.current || canvasWidthRef.current === 0) return false;
    const x = Math.floor(pos.x);
    const y = Math.floor(pos.y);
    const width = canvasWidthRef.current;
    
    // Check bounds
    if (x < 0 || x >= width || y < 0 || y >= hiddenCanvasRef.current!.height) return true;

    const index = (y * width + x) * 4;
    
    // If alpha is 0 (completely outside) OR it's the Red zone (border)
    const r = hitboxDataRef.current[index];
    const g = hitboxDataRef.current[index + 1];
    const b = hitboxDataRef.current[index + 2];
    const a = hitboxDataRef.current[index + 3];

    if (a === 0 || (r > 128 && g < 128 && b < 128)) {
      outsideCountRef.current += 1;
      if (outsideCountRef.current > 3) { // Threshold for failing
        return true;
      }
    }
    return false;
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const pos = getCoordinates(e);
    if (!pos || !canvasRef.current) return;
    
    if (checkOutside(pos)) {
      handleFail();
      return;
    }

    setIsDrawing(true);
    lastPos.current = pos;
    setHasDrawn(true);

    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 16;
      ctx.strokeStyle = selectedColor;
      ctx.stroke();
    }
    updateDots(pos, null);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing || !canvasRef.current || !lastPos.current) return;
    
    const pos = getCoordinates(e);
    if (!pos) return;

    if (checkOutside(pos)) {
      handleFail();
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 16;
      ctx.strokeStyle = selectedColor;
      ctx.stroke();
    }

    updateDots(pos, lastPos.current);
    lastPos.current = pos;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  // Setup level and handle resize
  useEffect(() => {
    if (gameState !== 'playing' || !level || !fontLoaded) return;
    
    const setupLevel = (force = false) => {
      if (!containerRef.current || !canvasRef.current || !bgCanvasRef.current || !hiddenCanvasRef.current) return;

      const { width, height } = containerRef.current.getBoundingClientRect();
      
      if (!force && Math.abs(canvasRef.current.width - width) < 10 && Math.abs(canvasRef.current.height - height) < 10) {
        return;
      }

      canvasRef.current.width = width;
      canvasRef.current.height = height;
      bgCanvasRef.current.width = width;
      bgCanvasRef.current.height = height;
      hiddenCanvasRef.current.width = width;
      hiddenCanvasRef.current.height = height;

      const bgCtx = bgCanvasRef.current.getContext('2d');
      const hiddenCtx = hiddenCanvasRef.current.getContext('2d', { willReadFrequently: true });
      
      if (!bgCtx || !hiddenCtx) return;

      const text = level.target;
      const isWord = text.length > 1;
      const fontSize = isWord ? Math.min(width / text.length * 1.5, height * 0.6) : Math.min(width * 0.8, height * 0.8);
      
      bgCtx.textAlign = 'center';
      hiddenCtx.textAlign = 'center';
      bgCtx.textBaseline = 'alphabetic';
      hiddenCtx.textBaseline = 'alphabetic';

      // Use the THINNEST font weight (200) as the skeleton
      const fontString = `200 ${fontSize}px "Nunito", sans-serif`;
      bgCtx.font = fontString;
      hiddenCtx.font = fontString;
      
      const metrics = bgCtx.measureText(text);
      const yOffset = (height / 2) + (metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2;

      const thickness = Math.max(30, fontSize / 6);

      // 1. Draw Visuals (Background)
      // We create a "bubble" letter by stroking the thin skeleton font.
      // This guarantees the skeleton is EXACTLY in the mathematical center.
      bgCtx.clearRect(0, 0, width, height);
      bgCtx.lineJoin = 'round';
      bgCtx.lineCap = 'round';
      
      // Outer border (gray)
      bgCtx.lineWidth = thickness + 12;
      bgCtx.strokeStyle = '#cbd5e1'; // slate-300
      bgCtx.strokeText(text, width / 2, yOffset);
      
      // Inner fill (white)
      bgCtx.lineWidth = thickness;
      bgCtx.strokeStyle = '#f8fafc'; // slate-50
      bgCtx.strokeText(text, width / 2, yOffset);
      
      // Fill the very center just in case
      bgCtx.fillStyle = '#f8fafc';
      bgCtx.fillText(text, width / 2, yOffset);

      // Draw the thin skeleton letter (replaces dots)
      bgCtx.fillStyle = '#94a3b8'; // slate-400
      bgCtx.fillText(text, width / 2, yOffset);
      bgCtx.lineWidth = 4; // Same thickness as the scanning line
      bgCtx.strokeStyle = '#94a3b8';
      bgCtx.strokeText(text, width / 2, yOffset);

      // 2. Generate Dots (Kept invisible for progress tracking)
      // We generate dots directly from the thin skeleton font.
      hiddenCtx.clearRect(0, 0, width, height);
      hiddenCtx.fillStyle = 'black';
      hiddenCtx.fillText(text, width / 2, yOffset);
      hiddenCtx.lineWidth = 4; // Slightly thicker to ensure solid strokes for scanning
      hiddenCtx.strokeStyle = 'black';
      hiddenCtx.strokeText(text, width / 2, yOffset);

      const imgData = hiddenCtx.getImageData(0, 0, width, height).data;
      const candidates: {x: number, y: number}[] = [];
      
      // Horizontal scanning (finds vertical-ish strokes)
      for (let y = 0; y < height; y++) {
        let inStroke = false;
        let startX = 0;
        for (let x = 0; x < width; x++) {
          const alpha = imgData[(y * width + x) * 4 + 3];
          if (alpha > 50) {
            if (!inStroke) {
              inStroke = true;
              startX = x;
            }
          } else {
            if (inStroke) {
              inStroke = false;
              candidates.push({ x: (startX + x - 1) / 2, y });
            }
          }
        }
        if (inStroke) {
          candidates.push({ x: (startX + width - 1) / 2, y });
        }
      }

      // Vertical scanning (finds horizontal-ish strokes)
      for (let x = 0; x < width; x++) {
        let inStroke = false;
        let startY = 0;
        for (let y = 0; y < height; y++) {
          const alpha = imgData[(y * width + x) * 4 + 3];
          if (alpha > 50) {
            if (!inStroke) {
              inStroke = true;
              startY = y;
            }
          } else {
            if (inStroke) {
              inStroke = false;
              candidates.push({ x, y: (startY + y - 1) / 2 });
            }
          }
        }
        if (inStroke) {
          candidates.push({ x, y: (startY + height - 1) / 2 });
        }
      }

      // --- ALIGNMENT & SNAPPING ALGORITHM ---
      // Find prominent vertical and horizontal lines and snap dots to them perfectly.
      const snapThreshold = Math.max(2, fontSize * 0.02);
      const minClusterSize = fontSize / 5;

      const xHist = new Map<number, number>();
      const yHist = new Map<number, number>();
      
      for (const pt of candidates) {
        const rx = Math.round(pt.x);
        const ry = Math.round(pt.y);
        xHist.set(rx, (xHist.get(rx) || 0) + 1);
        yHist.set(ry, (yHist.get(ry) || 0) + 1);
      }

      const getPeaks = (hist: Map<number, number>) => {
        const peaks: number[] = [];
        const keys = Array.from(hist.keys()).sort((a, b) => a - b);
        
        let currentPeak = { sum: 0, count: 0 };
        
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          const v = hist.get(k)!;
          
          if (currentPeak.count === 0 || Math.abs(k - (currentPeak.sum / currentPeak.count)) <= snapThreshold) {
            currentPeak.sum += k * v;
            currentPeak.count += v;
          } else {
            if (currentPeak.count > minClusterSize) {
              peaks.push(currentPeak.sum / currentPeak.count);
            }
            currentPeak = { sum: k * v, count: v };
          }
        }
        if (currentPeak.count > minClusterSize) {
          peaks.push(currentPeak.sum / currentPeak.count);
        }
        return peaks;
      };

      const xPeaks = getPeaks(xHist);
      const yPeaks = getPeaks(yHist);

      // Apply Snapping
      for (const pt of candidates) {
        for (const px of xPeaks) {
          if (Math.abs(pt.x - px) <= snapThreshold) {
            pt.x = px;
            break;
          }
        }
        for (const py of yPeaks) {
          if (Math.abs(pt.y - py) <= snapThreshold) {
            pt.y = py;
            break;
          }
        }
      }

      // Sort candidates top-to-bottom, left-to-right for symmetric dot placement
      candidates.sort((a, b) => a.y - b.y || a.x - b.x);

      const newDots: {x: number, y: number, touched: boolean}[] = [];
      const minDist = Math.max(15, fontSize / 12);
      
      for (const pt of candidates) {
        let tooClose = false;
        for (const dot of newDots) {
          if (Math.hypot(dot.x - pt.x, dot.y - pt.y) < minDist) {
            tooClose = true;
            break;
          }
        }
        if (!tooClose) {
          newDots.push({ x: pt.x, y: pt.y, touched: false });
        }
      }
      setDots(newDots);

      // 3. Draw Acceptable Hitbox (Thick stroke)
      hiddenCtx.clearRect(0, 0, width, height);
      hiddenCtx.lineJoin = 'round';
      hiddenCtx.lineCap = 'round';

      // "Danger" area (Red) - everywhere outside the white bubble
      hiddenCtx.fillStyle = '#ff0000';
      hiddenCtx.fillRect(0, 0, width, height);

      // "Sloppy" area (Green) - matches the inner white fill
      hiddenCtx.lineWidth = thickness;
      hiddenCtx.strokeStyle = '#00ff00';
      hiddenCtx.strokeText(text, width / 2, yOffset);
      hiddenCtx.fillStyle = '#00ff00';
      hiddenCtx.fillText(text, width / 2, yOffset);

      // "Perfect" area (Blue) - matches the skeleton + brush width margin
      hiddenCtx.lineWidth = 16; // Exact brush width
      hiddenCtx.strokeStyle = '#0000ff';
      hiddenCtx.strokeText(text, width / 2, yOffset);
      hiddenCtx.fillStyle = '#0000ff';
      hiddenCtx.fillText(text, width / 2, yOffset);

      // Save hitbox data for real-time checking
      hitboxDataRef.current = hiddenCtx.getImageData(0, 0, width, height).data;
      canvasWidthRef.current = width;
      outsideCountRef.current = 0;

      // Clear user drawing
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, width, height);
      setHasDrawn(false);
    };

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setupLevel(false);
      }, 100);
    };

    setupLevel(true);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [gameState, level, fontLoaded]);

  const handleDone = () => {
    if (!hasDrawn) {
      return;
    }

    const dotsTouched = dots.filter(d => d.touched).length;
    const totalDots = dots.length;
    const dotsPercentage = totalDots > 0 ? dotsTouched / totalDots : 0;

    if (dotsPercentage < 0.90) {
      // Didn't trace enough of the skeleton
      handleFail();
      return;
    }

    // Calculate how much of the drawing touches the sloppy area (green area)
    const userCanvas = canvasRef.current;
    const hitboxData = hitboxDataRef.current;
    let stars = 1;

    if (userCanvas && hitboxData) {
      const width = userCanvas.width;
      const height = userCanvas.height;
      const userCtx = userCanvas.getContext('2d');
      
      if (userCtx) {
        const userData = userCtx.getImageData(0, 0, width, height).data;
        let totalDrawnPixels = 0;
        let sloppyPixels = 0;
        let dangerPixels = 0;

        for (let i = 0; i < userData.length; i += 4) {
          if (userData[i + 3] > 50) { // User drew here
            totalDrawnPixels++;
            const r = hitboxData[i];
            const g = hitboxData[i + 1];
            const b = hitboxData[i + 2];
            
            if (r > 128 && g < 128 && b < 128) {
              dangerPixels++;
            } else if (g > 128 && r < 128 && b < 128) {
              sloppyPixels++;
            }
          }
        }

        const sloppyPercentage = totalDrawnPixels > 0 ? sloppyPixels / totalDrawnPixels : 0;
        const dangerPercentage = totalDrawnPixels > 0 ? dangerPixels / totalDrawnPixels : 0;

        if (dangerPercentage > 0.02) {
          // Painted outside the bubble letter
          handleFail();
          return;
        }

        if (sloppyPercentage > 0.30) {
          // Painted too much in the bubble letter (off the skeleton)
          handleFail();
          return;
        }

        if (dotsPercentage === 1 && sloppyPercentage <= 0.05) {
          stars = 3; 
        } else if (dotsPercentage >= 0.95 && sloppyPercentage <= 0.15) {
          stars = 2; 
        } else {
          stars = 1; 
        }
      }
    }

    if (stars > 0) {
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak >= 3 && newStreak % 3 === 0) {
          addStreak();
        }
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    playSound('complete');
    burstConfetti();
    setTimeout(fireConfetti, 500);

    // Select and speak random praise message
    const randomPraise = PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)];
    setPraiseMessage(randomPraise);
    speak(randomPraise);

    if (activeProfile && level) {
      completeLevel(tracingGame.id, level.id, stars);
      updateStars(stars);
    }

    setGameState('complete');
  };

  const nextLevel = () => {
    const nextId = selectedLevel + 1;
    if (tracingGame.levels.find(l => l.id === nextId)) {
      startGame(nextId);
    } else {
      setGameState('selecting');
    }
  };

  if (gameState === 'selecting') {
    const levelGroups = [
      { title: '🔠 Stora bokstäver', subtitle: 'A till Ö', levels: tracingGame.levels.slice(0, 29), color: 'from-blue-400 to-indigo-500', borderColor: 'border-blue-300/40' },
      { title: '🔤 Små bokstäver', subtitle: 'a till ö', levels: tracingGame.levels.slice(29, 58), color: 'from-green-400 to-emerald-500', borderColor: 'border-green-300/40' },
      { title: '🔢 Siffror', subtitle: '0 till 9', levels: tracingGame.levels.slice(58, 68), color: 'from-orange-400 to-red-500', borderColor: 'border-orange-300/40' },
      { title: '📝 Stora ord', subtitle: 'Lätta ord', levels: tracingGame.levels.slice(68, 88), color: 'from-purple-500 to-pink-500', borderColor: 'border-purple-300/40' },
      { title: '✍️ Små ord', subtitle: 'Lätta ord', levels: tracingGame.levels.slice(88, 108), color: 'from-teal-400 to-cyan-500', borderColor: 'border-teal-300/40' },
    ];

    const levelIcons: Record<number, React.ReactNode> = {};
    tracingGame.levels.forEach(l => {
      const color = COLORS[l.id % COLORS.length];
      levelIcons[l.id] = <span style={{ color }}>{l.badge}</span>;
    });

    return (
      <LevelSelector
        gameId={tracingGame.id}
        gameName={tracingGame.name}
        levelGroups={levelGroups}
        levelIcons={levelIcons}
        isLevelUnlocked={isLevelUnlocked}
        isLevelCompleted={isLevelCompleted}
        getLevelStars={getLevelStars}
        isFullyUnlocked={isGameFullyUnlocked(tracingGame.id)}
        onLevelSelect={startGame}
        onBack={() => navigate('/dashboard')}
      />
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto h-[100dvh] flex flex-col pb-24">
      {/* HUD */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl shadow-sm mb-2 z-10 border border-white/20 shrink-0">
        <button 
          onClick={() => setGameState('selecting')} 
          className="text-3xl hover:scale-110 transition-transform shrink-0 active:scale-95"
        >
          ←
        </button>
        <h2 
          className="flex-1 min-w-0 text-center text-base md:text-2xl font-black tracking-tight truncate" 
          style={{ color: 'var(--primary-color)' }}
        >
          Nivå {selectedLevel} — {level?.name}
        </h2>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleMute}
            className={`text-xl hover:scale-110 transition-all ${isMuted ? 'opacity-40' : ''}`}
            title={isMuted ? 'Slå på ljud' : 'Stäng av ljud'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          {streak > 1 && (
            <div className="text-lg font-black text-orange-500 animate-bounce">
              🔥 {streak}
            </div>
          )}
        </div>
      </div>

      {/* Main Game Area */}
      {gameState === 'playing' && (
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-center flex items-center justify-center gap-3">
            <div className="text-2xl font-bold opacity-80">
              Spåra {level?.type === 'number' ? 'siffran' : level?.type === 'word' ? 'ordet' : 'bokstaven'} {level?.target}
            </div>
            {level?.emoji && <span className="text-3xl">{level.emoji}</span>}
            {/* Custom speaker button */}
            <button
              onClick={() => speak(level.target)}
              className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg group"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                border: '3px solid var(--primary-color)'
              }}
              aria-label={
                level?.type === 'number'
                  ? `Lyssna på siffran ${level.target}`
                  : level?.type === 'word'
                  ? `Lyssna på ordet ${level.target}`
                  : `Lyssna på bokstaven ${level.target}`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--primary-color)]"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              {/* Ripple effect on hover */}
              <span className="absolute inset-0 rounded-full border-2 border-[var(--primary-color)] opacity-0 group-hover:opacity-40 group-hover:animate-ping"></span>
            </button>
          </div>

          <div 
            ref={containerRef}
            className={`flex-1 relative bg-white rounded-3xl shadow-inner border-4 border-dashed border-gray-300 overflow-hidden touch-none ${failShake ? 'animate-shake border-red-400 bg-red-50' : ''}`}
          >
            <canvas ref={bgCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
            <canvas ref={hiddenCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-0" />
            
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full touch-none"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerOut={stopDrawing}
              onPointerCancel={stopDrawing}
            />
          </div>

          {/* Color Picker & Actions */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-center gap-2 flex-wrap">
              {COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full shadow-sm transition-transform ${selectedColor === color ? 'scale-125 ring-4 ring-white' : 'hover:scale-110'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex justify-between items-center gap-4">
              <Button variant="secondary" onClick={clearCanvas} className="flex-1">
                🔄 Börja om
              </Button>
              <Button variant="primary" onClick={handleDone} className="flex-1" disabled={!hasDrawn}>
                ✅ Klar!
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Level Complete Modal */}
      {gameState === 'complete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="text-6xl mb-4 animate-bounce" style={{ color: COLORS[(level?.id || 0) % COLORS.length] }}>{level?.badge}</div>
            <h2 className="text-3xl font-black mb-2 text-[var(--primary-color)]">Nivå Klar!</h2>
            <p className="text-xl mb-6 font-medium">{praiseMessage}</p>
            
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3].map(star => (
                <span 
                  key={star} 
                  className={`text-5xl transition-all duration-500 delay-${star * 100} ${
                    star <= getLevelStars(tracingGame.id, level?.id || 1) 
                      ? 'text-yellow-400 scale-110 drop-shadow-lg' 
                      : 'text-gray-200 scale-100'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {level?.id && level.id < tracingGame.levels.length && (
                <Button variant="primary" onClick={nextLevel} className="w-full text-lg py-4">
                  ⭐ Nästa Nivå →
                </Button>
              )}
              <Button variant="secondary" onClick={() => setGameState('selecting')} className="w-full">
                🏠 Tillbaka till Menyn
              </Button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default TracingGame;

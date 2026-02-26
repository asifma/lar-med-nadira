import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import { useSpeech } from '../contexts/SpeechContext';
import { puzzleGame } from '../data/puzzleLevels';
import Button from '../components/Button';
import LevelSelector from '../components/LevelSelector';
import confetti from 'canvas-confetti';
import { useSettings } from '../contexts/SettingsContext';
import { motion, useMotionValue } from 'framer-motion';

type GameState = 'selecting' | 'playing' | 'level-complete';

interface JigsawPieceData {
  id: string;
  row: number;
  col: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
  initialX: number;
  initialY: number;
  initialRotation: number;
}

const getGridSize = (levelId: number) => {
  if (levelId <= 5) return { cols: 2, rows: 2 };
  if (levelId <= 10) return { cols: 3, rows: 3 };
  if (levelId <= 15) return { cols: 4, rows: 4 };
  return { cols: 5, rows: 5 };
};

const getPiecePath = (w: number, h: number, top: number, right: number, bottom: number, left: number, ts: number) => {
  const nw = ts * 0.7;
  const kw = ts * 1.2;
  const kh = ts - 1; // Prevent clipping against the SVG bounds
  
  let path = `M ${ts} ${ts} `;

  if (top === 0) {
    path += `L ${w+ts} ${ts} `;
  } else {
    const sign = top === 1 ? -1 : 1;
    path += `L ${ts + w/2 - nw/2} ${ts} `;
    path += `C ${ts + w/2 - nw/2} ${ts + sign * kh/2}, ${ts + w/2 - kw/2} ${ts + sign * kh}, ${ts + w/2} ${ts + sign * kh} `;
    path += `C ${ts + w/2 + kw/2} ${ts + sign * kh}, ${ts + w/2 + nw/2} ${ts + sign * kh/2}, ${ts + w/2 + nw/2} ${ts} `;
    path += `L ${w+ts} ${ts} `;
  }

  if (right === 0) {
    path += `L ${w+ts} ${h+ts} `;
  } else {
    const sign = right === 1 ? 1 : -1;
    path += `L ${w+ts} ${ts + h/2 - nw/2} `;
    path += `C ${w+ts + sign * kh/2} ${ts + h/2 - nw/2}, ${w+ts + sign * kh} ${ts + h/2 - kw/2}, ${w+ts + sign * kh} ${ts + h/2} `;
    path += `C ${w+ts + sign * kh} ${ts + h/2 + kw/2}, ${w+ts + sign * kh/2} ${ts + h/2 + nw/2}, ${w+ts} ${ts + h/2 + nw/2} `;
    path += `L ${w+ts} ${h+ts} `;
  }

  if (bottom === 0) {
    path += `L ${ts} ${h+ts} `;
  } else {
    const sign = bottom === 1 ? 1 : -1;
    path += `L ${ts + w/2 + nw/2} ${h+ts} `;
    path += `C ${ts + w/2 + nw/2} ${h+ts + sign * kh/2}, ${ts + w/2 + kw/2} ${h+ts + sign * kh}, ${ts + w/2} ${h+ts + sign * kh} `;
    path += `C ${ts + w/2 - kw/2} ${h+ts + sign * kh}, ${ts + w/2 - nw/2} ${h+ts + sign * kh/2}, ${ts + w/2 - nw/2} ${h+ts} `;
    path += `L ${ts} ${h+ts} `;
  }

  if (left === 0) {
    path += `L ${ts} ${ts} `;
  } else {
    const sign = left === 1 ? -1 : 1;
    path += `L ${ts} ${ts + h/2 + nw/2} `;
    path += `C ${ts + sign * kh/2} ${ts + h/2 + nw/2}, ${ts + sign * kh} ${ts + h/2 + kw/2}, ${ts + sign * kh} ${ts + h/2} `;
    path += `C ${ts + sign * kh} ${ts + h/2 - kw/2}, ${ts + sign * kh/2} ${ts + h/2 - nw/2}, ${ts} ${ts + h/2 - nw/2} `;
    path += `L ${ts} ${ts} `;
  }

  path += `Z`;
  return path;
};

const PuzzleContent = ({ word, emoji, width, height, theme }: { word: string, emoji: string, width: number, height: number, theme: string }) => {
  const maxFontSize = height * 0.18;
  const calculatedFontSize = (width * 0.9) / word.length;
  const fontSize = Math.min(maxFontSize, calculatedFontSize * 1.4);

  const background = theme === 'hero' 
    ? 'linear-gradient(135deg, #ef4444 0%, #eab308 50%, #3b82f6 100%)' // Red, Yellow, Blue for Hero
    : 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f472b6 100%)'; // Original Pink/Purple for Unicorn

  return (
    <div 
      style={{ 
        width, 
        height, 
        background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '24px',
        border: '6px solid rgba(255,255,255,0.8)',
        boxSizing: 'border-box',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
      }}
    >
      <div style={{ fontSize: `${height * 0.4}px`, lineHeight: 1.2, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>{emoji}</div>
      <div style={{ 
        fontSize: `${fontSize}px`, 
        fontWeight: '900', 
        color: 'white', 
        letterSpacing: '2px',
        textShadow: '0 4px 8px rgba(0,0,0,0.3)',
        textTransform: 'uppercase'
      }}>{word}</div>
    </div>
  );
};

const JigsawPieceComponent = ({ 
  piece, w, h, ts, W, H, word, emoji, theme, onPlace, onMove 
}: { 
  piece: JigsawPieceData, w: number, h: number, ts: number, W: number, H: number, word: string, emoji: string, theme: string, onPlace: (id: string, isCorrect: boolean) => void, onMove: (id: string) => void 
}) => {
  const [rotation, setRotation] = useState(piece.initialRotation);
  const [isCorrect, setIsCorrect] = useState(false);
  const x = useMotionValue(piece.initialX);
  const y = useMotionValue(piece.initialY);
  const hasDragged = useRef(false);

  // Reset state when piece changes (new puzzle)
  useEffect(() => {
    setRotation(piece.initialRotation);
    setIsCorrect(false);
    x.set(piece.initialX);
    y.set(piece.initialY);
  }, [piece, x, y]);

  const checkAndSnap = (currentX: number, currentY: number, currentRot: number) => {
    const normalizedRot = ((currentRot % 360) + 360) % 360;
    if (Math.abs(currentX) < 30 && Math.abs(currentY) < 30 && normalizedRot === 0) {
      x.set(0);
      y.set(0);
      setIsCorrect(true);
      onPlace(piece.id, true);
    } else {
      setIsCorrect(false);
      onPlace(piece.id, false);
    }
  };

  const handleDragEnd = () => {
    checkAndSnap(x.get(), y.get(), rotation);
    setTimeout(() => { hasDragged.current = false; }, 100);
  };

  const handleTap = () => {
    if (hasDragged.current) return;
    const newRot = rotation + 90;
    setRotation(newRot);
    checkAndSnap(x.get(), y.get(), newRot);
  };

  const path = getPiecePath(w, h, piece.top, piece.right, piece.bottom, piece.left, ts);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: piece.col * w - ts,
        top: piece.row * h - ts,
        width: w + 2 * ts,
        height: h + 2 * ts,
        zIndex: isCorrect ? 1 : 10,
        filter: isCorrect ? 'none' : 'drop-shadow(2px 4px 6px rgba(0,0,0,0.4))',
        cursor: 'grab',
        x,
        y
      }}
      drag
      dragMomentum={false}
      onDragStart={() => {
        hasDragged.current = true;
        setIsCorrect(false);
        onPlace(piece.id, false);
        onMove(piece.id);
      }}
      onDragEnd={handleDragEnd}
      onTap={handleTap}
      whileDrag={{ scale: 1.05, zIndex: 20, filter: 'drop-shadow(4px 8px 12px rgba(0,0,0,0.5))' }}
      animate={{ rotate: rotation }}
      transition={{ rotate: { duration: 0.2 } }}
    >
      <div 
        style={{ 
          width: '100%', 
          height: '100%', 
          clipPath: `path('${path}')`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ 
          position: 'absolute',
          top: -(piece.row * h - ts), 
          left: -(piece.col * w - ts), 
          width: W, 
          height: H 
        }}>
          <PuzzleContent word={word} emoji={emoji} width={W} height={H} theme={theme} />
        </div>
      </div>
      
      {/* Inner stroke for realism */}
      <svg width={w + 2*ts} height={h + 2*ts} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
        <path d={path} fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
      </svg>
    </motion.div>
  );
};

const PuzzleGame: React.FC = () => {
  const navigate = useNavigate();
  const { activeProfile, completeLevel, isLevelCompleted, isLevelUnlocked, getLevelStars } = useProfile();
  const { speak, stop } = useSpeech();
  const { isGameFullyUnlocked } = useSettings();

  const [gameState, setGameState] = useState<GameState>('selecting');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(prev => {
      if (!prev) stop();
      return !prev;
    });
  };
  
  const [pieces, setPieces] = useState<JigsawPieceData[]>([]);
  const [placedPieces, setPlacedPieces] = useState<Set<string>>(new Set());
  
  const [puzzleMetrics, setPuzzleMetrics] = useState({ w: 0, h: 0, ts: 0, W: 320, H: 320 });

  const level = puzzleGame.levels.find(l => l.id === selectedLevel) || puzzleGame.levels[0];
  const currentPuzzle = level.puzzles[currentPuzzleIndex];
  const theme = activeProfile?.theme || 'unicorn';

  const levelIcons: Record<number, string> = {
    1: '🧩', 2: '🧩', 3: '🧩', 4: '🧩', 5: '🧩',
    6: '🧩', 7: '🧩', 8: '🧩', 9: '🧩', 10: '🧩',
    11: '🧩', 12: '🧩', 13: '🧩', 14: '🧩', 15: '🧩',
    16: '🧩', 17: '🧩', 18: '🧩', 19: '🧩', 20: '🧩',
  };

  const levelGroups = [
    { title: '🌱 Nybörjare', subtitle: 'Korta ord (2–3 bokstäver)', levels: puzzleGame.levels.slice(0, 5), color: 'from-green-400 to-emerald-500', borderColor: 'border-green-300/40' },
    { title: '📚 Mellannivå', subtitle: 'Medellånga ord (4–5 bokstäver)', levels: puzzleGame.levels.slice(5, 10), color: 'from-blue-400 to-indigo-500', borderColor: 'border-blue-300/40' },
    { title: '🔥 Utmanare', subtitle: 'Långa ord (6–7 bokstäver)', levels: puzzleGame.levels.slice(10, 15), color: 'from-orange-400 to-red-500', borderColor: 'border-orange-300/40' },
    { title: '👑 Mästare', subtitle: 'Jättelånga ord (8–10 bokstäver)', levels: puzzleGame.levels.slice(15, 20), color: 'from-purple-500 to-pink-500', borderColor: 'border-purple-300/40' },
  ];

  // Initialize puzzle
  useEffect(() => {
    if (gameState === 'playing' && currentPuzzle) {
      const W = window.innerWidth < 400 ? 280 : 320;
      const H = W;
      
      const { cols, rows } = getGridSize(selectedLevel);
      const w = W / cols;
      const h = H / rows;
      const ts = Math.min(w, h) * 0.28; // Increased from 0.25 to make tabs more prominent
      
      const hEdges = Array(rows + 1).fill(0).map(() => Array(cols).fill(0));
      const vEdges = Array(rows).fill(0).map(() => Array(cols + 1).fill(0));
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (r < rows - 1) hEdges[r+1][c] = Math.random() > 0.5 ? 1 : -1;
          if (c < cols - 1) vEdges[r][c+1] = Math.random() > 0.5 ? 1 : -1;
        }
      }
      
      const newPieces: JigsawPieceData[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const trayY = H + 40 + Math.random() * 60;
          const trayX = Math.random() * (W - w);
          
          newPieces.push({
            id: `${r}-${c}`,
            row: r,
            col: c,
            top: r === 0 ? 0 : -hEdges[r][c],
            bottom: r === rows - 1 ? 0 : hEdges[r+1][c],
            left: c === 0 ? 0 : -vEdges[r][c],
            right: c === cols - 1 ? 0 : vEdges[r][c+1],
            initialX: trayX - (c * w - ts),
            initialY: trayY - (r * h - ts),
            initialRotation: Math.floor(Math.random() * 4) * 90,
          });
        }
      }
      
      // Shuffle pieces array so they render in random z-order
      const shuffled = [...newPieces].sort(() => Math.random() - 0.5);
      
      setPuzzleMetrics({ w, h, ts, W, H });
      setPieces(shuffled);
      setPlacedPieces(new Set());
      
      speak(currentPuzzle.word);
    }
  }, [currentPuzzleIndex, gameState, currentPuzzle, selectedLevel, speak]);

  const handleStartLevel = (levelId: number) => {
    setSelectedLevel(levelId);
    setCurrentPuzzleIndex(0);
    setGameState('playing');
  };

  const handlePiecePlace = (id: string, isCorrect: boolean) => {
    setPlacedPieces(prev => {
      const next = new Set(prev);
      if (isCorrect) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const handlePieceMove = (id: string) => {
    // Bring to front by moving it to the end of the array
    setPieces(prev => {
      const piece = prev.find(p => p.id === id);
      if (!piece) return prev;
      return [...prev.filter(p => p.id !== id), piece];
    });
  };

  // Check for puzzle completion
  useEffect(() => {
    if (gameState === 'playing' && pieces.length > 0 && placedPieces.size === pieces.length) {
      if (!isMuted) speak(`Bra! ${currentPuzzle.word}`);
      
      const timer = setTimeout(() => {
        if (currentPuzzleIndex < level.puzzles.length - 1) {
          setCurrentPuzzleIndex(prev => prev + 1);
        } else {
          handleLevelComplete();
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [placedPieces.size, pieces.length, gameState, currentPuzzle.word, currentPuzzleIndex, level.puzzles.length]);

  const handleLevelComplete = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1']
    });
    
    completeLevel('puzzle', selectedLevel, 3);
    setGameState('level-complete');
  };

  if (gameState === 'selecting') {
    return (
      <LevelSelector
        gameId="puzzle"
        gameName={puzzleGame.name}
        levelGroups={levelGroups}
        levelIcons={levelIcons}
        isLevelUnlocked={isLevelUnlocked}
        isLevelCompleted={isLevelCompleted}
        getLevelStars={getLevelStars}
        isFullyUnlocked={isGameFullyUnlocked('puzzle')}
        onLevelSelect={handleStartLevel}
        onBack={() => navigate('/dashboard')}
      />
    );
  }

  if (gameState === 'level-complete') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-8" style={{ background: 'var(--bg-gradient, var(--bg-color))' }}>
        <div className="text-8xl mb-4">🎉</div>
        <h2 className="text-5xl font-black">BRA JOBBAT!</h2>
        <div className="text-3xl font-bold opacity-70">
          Du klarade alla pussel på nivå {selectedLevel}!
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <span key={s} className="text-5xl animate-bounce" style={{ animationDelay: `${s * 0.15}s` }}>⭐</span>
          ))}
        </div>
        
        <div className="p-6 rounded-3xl border-4 border-yellow-400" style={{ backgroundColor: 'var(--card-bg)' }}>
          <p className="text-xl font-black mb-2">Nivå {selectedLevel} avklarad!</p>
          <span className="text-6xl">{level.badge}</span>
        </div>
        
        <div className="pt-6 flex flex-wrap gap-4 justify-center">
          <Button variant="secondary" size="lg" onClick={() => setGameState('selecting')}>ALLA NIVÅER</Button>
          <Button variant="primary" size="lg" onClick={() => handleStartLevel(selectedLevel)}>SPELA IGEN</Button>
          {selectedLevel < puzzleGame.levels.length && (
            <Button variant="accent" size="lg" onClick={() => handleStartLevel(selectedLevel + 1)}>NÄSTA NIVÅ →</Button>
          )}
        </div>
      </div>
    );
  }

  // PLAYING STATE
  const progress = ((currentPuzzleIndex) / level.puzzles.length) * 100;

  return (
    <div className="min-h-[100dvh] flex flex-col p-4 overflow-hidden" style={{ background: 'var(--bg-gradient, var(--bg-color))' }}>
      {/* HUD */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl shadow-sm mb-2 z-10 border border-white/20">
        <button onClick={() => setGameState('selecting')} className="text-3xl hover:scale-110 transition-transform shrink-0">←</button>
        <h2 className="flex-1 min-w-0 text-center text-base md:text-2xl font-black tracking-tight truncate" style={{ color: 'var(--primary-color)' }}>
          Nivå {selectedLevel} — {level.name}
        </h2>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleMute}
            className={`text-xl hover:scale-110 transition-all ${isMuted ? 'opacity-40' : ''}`}
            title={isMuted ? 'Slå på ljud' : 'Stäng av ljud'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          <div className="text-lg font-black text-yellow-600">⭐ {currentPuzzleIndex + 1}/{level.puzzles.length}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-3xl mx-auto mb-4 z-10">
        <div className="flex justify-between text-xs font-bold opacity-60 mb-1">
          <span>Framsteg</span>
          <span>{currentPuzzleIndex}/{level.puzzles.length}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/20 shadow-inner">
          <div
            className="bg-gradient-to-r from-green-400 via-yellow-400 to-purple-500 h-full transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center pt-8 w-full max-w-md mx-auto relative">
        
        {/* Board Area */}
        <div 
          className="relative rounded-3xl border-4 border-white/20 bg-black/10 shadow-inner"
          style={{ width: puzzleMetrics.W, height: puzzleMetrics.H }}
        >
          {/* Pieces */}
          {pieces.map((piece) => (
            <JigsawPieceComponent
              key={piece.id}
              piece={piece}
              w={puzzleMetrics.w}
              h={puzzleMetrics.h}
              ts={puzzleMetrics.ts}
              W={puzzleMetrics.W}
              H={puzzleMetrics.H}
              word={currentPuzzle.word}
              emoji={currentPuzzle.emoji}
              theme={theme}
              onPlace={handlePiecePlace}
              onMove={handlePieceMove}
            />
          ))}
        </div>

        {/* Tray Area (visual only, pieces can be dragged anywhere) */}
        <div className="mt-8 w-full h-48 bg-white/5 rounded-3xl border-2 border-dashed border-white/20 flex items-center justify-center pointer-events-none">
          {placedPieces.size === 0 && (
            <span className="opacity-40 font-bold text-lg">Dra bitarna hit upp ↑</span>
          )}
        </div>

      </div>
    </div>
  );
};

export default PuzzleGame;

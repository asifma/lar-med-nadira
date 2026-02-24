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

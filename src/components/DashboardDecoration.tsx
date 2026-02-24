import React from 'react';

const DashboardDecoration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none ${className}`}>
      <svg viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="dashGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="dashStar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
        </defs>

        {/* Background glow blobs */}
        <ellipse cx="150" cy="100" rx="120" ry="80" fill="url(#dashGlow)">
          <animate attributeName="rx" values="120;140;120" dur="6s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="450" cy="100" rx="100" ry="70" fill="url(#dashGlow)">
          <animate attributeName="rx" values="100;120;100" dur="5s" repeatCount="indefinite" />
        </ellipse>

        {/* Floating star 1 */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;0,-8;0,0" dur="3s" repeatCount="indefinite" />
          <polygon points="80,40 83,50 94,50 86,56 88,66 80,60 72,66 74,56 66,50 77,50" fill="url(#dashStar)" opacity="0.8" />
        </g>

        {/* Floating star 2 */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;0,10;0,0" dur="4s" repeatCount="indefinite" />
          <polygon points="520,50 523,58 532,58 525,63 527,72 520,67 513,72 515,63 508,58 517,58" fill="url(#dashStar)" opacity="0.6" />
        </g>

        {/* Floating star 3 */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;5,-6;0,0" dur="3.5s" repeatCount="indefinite" />
          <polygon points="300,25 302,32 310,32 304,36 306,43 300,39 294,43 296,36 290,32 298,32" fill="url(#dashStar)" opacity="0.5" />
        </g>

        {/* Sparkle dots */}
        <circle cx="180" cy="30" r="3" fill="var(--primary-color)" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="420" cy="45" r="2.5" fill="var(--accent-color)" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="2.5;4;2.5" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="350" cy="160" r="2" fill="var(--primary-color)" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="150" r="2" fill="var(--accent-color)" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.8s" repeatCount="indefinite" />
        </circle>

        {/* Floating pencil */}
        <g transform="translate(50, 130)">
          <animateTransform attributeName="transform" type="translate" values="50,130;55,124;50,130" dur="4s" repeatCount="indefinite" />
          <rect x="-3" y="-25" width="6" height="22" rx="1" fill="#FFD93D" opacity="0.6" />
          <polygon points="-3,-3 3,-3 0,6" fill="#FFDAB9" opacity="0.6" />
          <polygon points="-1,1 1,1 0,6" fill="#888" opacity="0.4" />
        </g>

        {/* Floating book */}
        <g transform="translate(540, 140)">
          <animateTransform attributeName="transform" type="translate" values="540,140;540,132;540,140" dur="3.5s" repeatCount="indefinite" />
          <path d="M -8 0 Q -20 -4 -25 -18 L -25 8 Q -20 4 -8 6 Z" fill="var(--primary-color)" opacity="0.4" />
          <path d="M 8 0 Q 20 -4 25 -18 L 25 8 Q 20 4 8 6 Z" fill="var(--primary-color)" opacity="0.4" />
          <path d="M -8 0 L 0 -3 L 8 0 L 8 6 L 0 4 L -8 6 Z" fill="var(--primary-color)" opacity="0.2" />
        </g>

        {/* Floating letter bubbles */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;-4,6;0,0" dur="5s" repeatCount="indefinite" />
          <circle cx="230" cy="160" r="14" fill="var(--primary-color)" opacity="0.2" />
          <text x="230" y="166" textAnchor="middle" fill="var(--primary-color)" fontSize="14" fontWeight="800" opacity="0.5" fontFamily="'Baloo 2', cursive">A</text>
        </g>
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;6,-4;0,0" dur="4.5s" repeatCount="indefinite" />
          <circle cx="380" cy="155" r="12" fill="var(--accent-color)" opacity="0.2" />
          <text x="380" y="160" textAnchor="middle" fill="var(--accent-color)" fontSize="12" fontWeight="800" opacity="0.5" fontFamily="'Baloo 2', cursive">Ö</text>
        </g>

        {/* Rainbow arc (subtle) */}
        <path d="M 100 180 Q 300 100 500 180" stroke="var(--primary-color)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.08" />
        <path d="M 120 185 Q 300 110 480 185" stroke="var(--accent-color)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.06" />
      </svg>
    </div>
  );
};

export default DashboardDecoration;

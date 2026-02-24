import React from 'react';

export const AbcCardIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={className}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Open book */}
      <g transform="translate(60, 75)">
        <animateTransform attributeName="transform" type="translate" values="60,75;60,70;60,75" dur="3s" repeatCount="indefinite" />
        <path d="M -5 0 Q -30 -5 -40 -25 L -40 15 Q -30 10 -5 12 Z" fill="var(--primary-color)" opacity="0.7" />
        <path d="M 5 0 Q 30 -5 40 -25 L 40 15 Q 30 10 5 12 Z" fill="var(--primary-color)" opacity="0.7" />
        <path d="M -5 0 L 0 -3 L 5 0 L 5 12 L 0 10 L -5 12 Z" fill="var(--primary-color)" opacity="0.4" />
        {/* Page lines */}
        <line x1="-30" y1="-12" x2="-12" y2="-8" stroke="white" strokeWidth="1.5" opacity="0.4" />
        <line x1="-30" y1="-5" x2="-12" y2="-1" stroke="white" strokeWidth="1.5" opacity="0.4" />
        <line x1="12" y1="-8" x2="30" y2="-12" stroke="white" strokeWidth="1.5" opacity="0.4" />
        <line x1="12" y1="-1" x2="30" y2="-5" stroke="white" strokeWidth="1.5" opacity="0.4" />
      </g>

      {/* Floating letters */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-5;0,0" dur="2.5s" repeatCount="indefinite" />
        <circle cx="30" cy="35" r="15" fill="var(--primary-color)" opacity="0.8" />
        <text x="30" y="41" textAnchor="middle" fill="white" fontSize="18" fontWeight="800" fontFamily="'Baloo 2', cursive">A</text>
      </g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,4;0,0" dur="3s" repeatCount="indefinite" />
        <circle cx="60" cy="25" r="13" fill="var(--accent-color)" opacity="0.8" />
        <text x="60" y="31" textAnchor="middle" fill="var(--text-color)" fontSize="16" fontWeight="800" fontFamily="'Baloo 2', cursive">B</text>
      </g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="3.5s" repeatCount="indefinite" />
        <circle cx="90" cy="35" r="14" fill="var(--secondary-color)" opacity="0.8" />
        <text x="90" y="41" textAnchor="middle" fill="var(--text-color)" fontSize="17" fontWeight="800" fontFamily="'Baloo 2', cursive">C</text>
      </g>

      {/* Sparkles rising from book */}
      <circle cx="45" cy="55" r="2" fill="#FFD700" opacity="0.7">
        <animate attributeName="cy" values="55;35;55" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="75" cy="50" r="1.5" fill="#FFD700" opacity="0.5">
        <animate attributeName="cy" values="50;30;50" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="58" r="2" fill="#FFD700" opacity="0.6">
        <animate attributeName="cy" values="58;40;58" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
);

export const MathCardIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={className}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-40 grayscale">
      {/* Calculator body */}
      <rect x="30" y="20" width="60" height="80" rx="10" fill="var(--primary-color)" opacity="0.5" />
      <rect x="38" y="28" width="44" height="22" rx="5" fill="white" opacity="0.3" />
      {/* Number buttons */}
      <circle cx="48" cy="64" r="6" fill="white" opacity="0.2" />
      <circle cx="60" cy="64" r="6" fill="white" opacity="0.2" />
      <circle cx="72" cy="64" r="6" fill="white" opacity="0.2" />
      <circle cx="48" cy="80" r="6" fill="white" opacity="0.2" />
      <circle cx="60" cy="80" r="6" fill="white" opacity="0.2" />
      <circle cx="72" cy="80" r="6" fill="white" opacity="0.2" />
      {/* Plus sign */}
      <text x="60" y="44" textAnchor="middle" fill="var(--text-color)" fontSize="16" fontWeight="800" opacity="0.3">1+2</text>
    </svg>
  </div>
);

export const PuzzleCardIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={className}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-40 grayscale">
      {/* Puzzle pieces */}
      <g transform="translate(25, 25)">
        <path d="M 0 10 L 0 0 L 30 0 L 30 10 Q 25 10 25 15 Q 25 20 30 20 L 30 35 L 0 35 L 0 25 Q 5 25 5 20 Q 5 15 0 15 Z" fill="var(--primary-color)" opacity="0.4" />
      </g>
      <g transform="translate(60, 25)">
        <path d="M 5 0 L 35 0 L 35 15 Q 30 15 30 20 Q 30 25 35 25 L 35 35 L 5 35 L 5 20 Q 10 20 10 15 Q 10 10 5 10 Z" fill="var(--accent-color)" opacity="0.3" />
      </g>
      <g transform="translate(25, 62)">
        <path d="M 0 0 L 0 -5 Q 5 -5 5 -10 Q 5 -15 0 -15 L 0 -25 L 30 -25 L 30 0 L 0 0 Z" fill="var(--secondary-color)" opacity="0.35" transform="translate(0, 35)" />
      </g>
    </svg>
  </div>
);

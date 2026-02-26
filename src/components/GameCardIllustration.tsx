import React from 'react';

export const AbcCardIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={className}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Open book */}
      <g transform="translate(60, 60)">
        <animateTransform attributeName="transform" type="translate" values="60,60;60,55;60,60" dur="3s" repeatCount="indefinite" />
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
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>
        {`
          @keyframes bounce {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes pulse {
            0%,100% { opacity:0.2; }
            50% { opacity:0.8; }
          }
          @keyframes pop {
            0% { transform: scale(0); opacity:0; }
            80% { transform: scale(1.2); opacity:1; }
            100% { transform: scale(1); opacity:1; }
          }
          @keyframes float {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes rotateFloat {
            0% { transform: rotate(0deg) translate(0,0); }
            50% { transform: rotate(10deg) translate(5px,-5px); }
            100% { transform: rotate(0deg) translate(0,0); }
          }
        `}
      </style>
      {/* Calculator body with bounce - CENTERED */}
      <g transform="translate(60, 60)">
        <animateTransform attributeName="transform" type="translate" values="60,60;60,58;60,60" dur="3s" repeatCount="indefinite" />
        <rect x="-30" y="-40" width="60" height="90" rx="8" fill="var(--primary-color)" opacity="0.6" />
        {/* Screen */}
        <rect x="-25" y="-35" width="50" height="20" rx="4" fill="white" opacity="0.3" />
        {/* Buttons grid (3x4) with wave effect */}
        <g>
          {[ // Row 1
            {cx: -22, cy: -25}, {cx: -7, cy: -25}, {cx: 8, cy: -25},
            // Row 2
            {cx: -22, cy: -10}, {cx: -7, cy: -10}, {cx: 8, cy: -10},
            // Row 3
            {cx: -22, cy: 5}, {cx: -7, cy: 5}, {cx: 8, cy: 5},
            // Row 4 (0)
            {cx: -7, cy: 20}
          ].map((pos, i) => (
            <circle key={i} cx={pos.cx} cy={pos.cy} r="6" fill="white" opacity="0.2">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
            </circle>
          ))}
        </g>
        {/* Popping numbers (sample: 1, 2, 3) */}
        <g fill="var(--text-color)" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
          <text x="-22" y="-21" textAnchor="middle">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0s" />
            <animateTransform attributeName="transform" type="scale" values="0;1.2;1" dur="1.5s" repeatCount="indefinite" begin="0s" additive="sum"/>
            1
          </text>
          <text x="-7" y="-21" textAnchor="middle">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
            <animateTransform attributeName="transform" type="scale" values="0;1.2;1" dur="1.5s" repeatCount="indefinite" begin="0.5s" additive="sum"/>
            2
          </text>
          <text x="8" y="-21" textAnchor="middle">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="1s" />
            <animateTransform attributeName="transform" type="scale" values="0;1.2;1" dur="1.5s" repeatCount="indefinite" begin="1s" additive="sum"/>
            3
          </text>
        </g>
        {/* Floating math symbols around calculator */}
        <g fill="var(--accent-color)" fontSize="12" fontWeight="bold">
          <text x="-40" y="-25">
            <animateTransform attributeName="transform" type="translate" values="0,0; -3,-3; 0,0" dur="4s" repeatCount="indefinite" />
            +
          </text>
          <text x="35" y="-35">
            <animateTransform attributeName="transform" type="translate" values="0,0; 3,-3; 0,0" dur="4s" repeatCount="indefinite" begin="1s" />
            −
          </text>
          <text x="35" y="10">
            <animateTransform attributeName="transform" type="translate" values="0,0; -3,3; 0,0" dur="4s" repeatCount="indefinite" begin="2s" />
            ×
          </text>
          <text x="-40" y="25">
            <animateTransform attributeName="transform" type="translate" values="0,0; 3,3; 0,0" dur="4s" repeatCount="indefinite" begin="3s" />
            ÷
          </text>
        </g>
        {/* Sparkles at corners */}
        <circle cx="-32" cy="-42" r="3" fill="#FFD700">
          <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="32" cy="-42" r="2" fill="#FFD700">
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="-32" cy="42" r="2.5" fill="#FFD700">
          <animate attributeName="opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  </div>
);

export const MemoryCardIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={className}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Brain with pulsing effect */}
      <g transform="translate(60, 60)">
        <ellipse cx="0" cy="0" rx="35" ry="30" fill="var(--primary-color)" opacity="0.3">
          <animate attributeName="rx" values="35;38;35" dur="2s" repeatCount="indefinite" />
          <animate attributeName="ry" values="30;33;30" dur="2s" repeatCount="indefinite" />
        </ellipse>
        
        {/* Brain emoji */}
        <text x="0" y="12" textAnchor="middle" fontSize="40" opacity="0.8">
          <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="2s" repeatCount="indefinite" additive="sum" />
          🧠
        </text>
      </g>

      {/* Floating memory cards around brain */}
      <g>
        {/* Card 1 - top left */}
        <g transform="translate(15, 20)">
          <animateTransform attributeName="transform" type="translate" values="15,20; 12,15; 15,20" dur="3s" repeatCount="indefinite" />
          <rect x="0" y="0" width="20" height="26" rx="3" fill="white" opacity="0.7" />
          <rect x="2" y="2" width="16" height="22" rx="2" fill="var(--accent-color)" opacity="0.4" />
          <text x="10" y="18" textAnchor="middle" fontSize="12">🐶</text>
        </g>

        {/* Card 2 - top right */}
        <g transform="translate(85, 25)">
          <animateTransform attributeName="transform" type="translate" values="85,25; 88,20; 85,25" dur="3.5s" repeatCount="indefinite" />
          <rect x="0" y="0" width="20" height="26" rx="3" fill="white" opacity="0.7" />
          <rect x="2" y="2" width="16" height="22" rx="2" fill="var(--secondary-color)" opacity="0.4" />
          <text x="10" y="18" textAnchor="middle" fontSize="12">🐱</text>
        </g>

        {/* Card 3 - bottom left */}
        <g transform="translate(20, 75)">
          <animateTransform attributeName="transform" type="translate" values="20,75; 17,80; 20,75" dur="2.8s" repeatCount="indefinite" />
          <rect x="0" y="0" width="20" height="26" rx="3" fill="white" opacity="0.7" />
          <rect x="2" y="2" width="16" height="22" rx="2" fill="var(--primary-color)" opacity="0.4" />
          <text x="10" y="18" textAnchor="middle" fontSize="12">🍎</text>
        </g>

        {/* Card 4 - bottom right */}
        <g transform="translate(80, 70)">
          <animateTransform attributeName="transform" type="translate" values="80,70; 83,75; 80,70" dur="3.2s" repeatCount="indefinite" />
          <rect x="0" y="0" width="20" height="26" rx="3" fill="white" opacity="0.7" />
          <rect x="2" y="2" width="16" height="22" rx="2" fill="var(--accent-color)" opacity="0.4" />
          <text x="10" y="18" textAnchor="middle" fontSize="12">🍌</text>
        </g>
      </g>

      {/* Sparkles and stars */}
      <circle cx="25" cy="50" r="2" fill="#FFD700">
        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="95" cy="55" r="2.5" fill="#FFD700">
        <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle cx="60" cy="15" r="2" fill="#FFD700">
        <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" begin="1s" />
      </circle>

      {/* Thought bubbles */}
      <circle cx="40" cy="35" r="3" fill="white" opacity="0.3">
        <animate attributeName="cy" values="35;25;35" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="75" cy="40" r="2.5" fill="white" opacity="0.3">
        <animate attributeName="cy" values="40;30;40" dur="3.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="3.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
);

export const PuzzleCardIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={className}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>
        {`
          @keyframes float1 {
            0%, 100% { transform: translate(-2px, -2px); }
            50% { transform: translate(-5px, -5px); }
          }
          @keyframes float2 {
            0%, 100% { transform: translate(2px, -2px); }
            50% { transform: translate(5px, -5px); }
          }
          @keyframes float3 {
            0%, 100% { transform: translate(-2px, 2px); }
            50% { transform: translate(-5px, 5px); }
          }
          @keyframes float4 {
            0%, 100% { transform: translate(2px, 2px); }
            50% { transform: translate(5px, 5px); }
          }
        `}
      </style>
      
      {/* Background glow */}
      <circle cx="60" cy="60" r="40" fill="var(--primary-color)" opacity="0.15">
        <animate attributeName="r" values="40;45;40" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Center Puzzle */}
      <g transform="translate(60, 60)">
        {/* Piece 1 (Top-Left) */}
        <g style={{ animation: 'float1 4s ease-in-out infinite' }}>
          <path d="M -30 -30 L 0 -30 L 0 -20 C 15 -20, 15 -10, 0 -10 L 0 0 L -10 0 C -10 -15, -20 -15, -20 0 L -30 0 Z" 
                fill="var(--primary-color)" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        </g>
        
        {/* Piece 2 (Top-Right) */}
        <g style={{ animation: 'float2 4.5s ease-in-out infinite' }}>
          <path d="M 0 -30 L 30 -30 L 30 0 L 20 0 C 20 -15, 10 -15, 10 0 L 0 0 L 0 -10 C 15 -10, 15 -20, 0 -20 L 0 -30 Z" 
                fill="var(--accent-color)" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        </g>
        
        {/* Piece 3 (Bottom-Left) */}
        <g style={{ animation: 'float3 5s ease-in-out infinite' }}>
          <path d="M -30 0 L -20 0 C -20 -15, -10 -15, -10 0 L 0 0 L 0 10 C -15 10, -15 20, 0 20 L 0 30 L -30 30 Z" 
                fill="var(--secondary-color)" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        </g>
        
        {/* Piece 4 (Bottom-Right) */}
        <g style={{ animation: 'float4 4s ease-in-out infinite' }}>
          <path d="M 0 0 L 10 0 C 10 -15, 20 -15, 20 0 L 30 0 L 30 30 L 0 30 L 0 20 C -15 20, -15 10, 0 10 L 0 0 Z" 
                fill="#FFD700" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        </g>
      </g>

      {/* Sparkles */}
      <circle cx="20" cy="20" r="2" fill="#FFD700">
        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="40" r="2.5" fill="#FFD700">
        <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle cx="80" cy="90" r="2" fill="#FFD700">
        <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" begin="1s" />
      </circle>
    </svg>
  </div>
);

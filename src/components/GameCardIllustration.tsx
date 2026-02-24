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
      {/* Calculator body with bounce */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="30,20;30,18;30,20" dur="3s" repeatCount="indefinite" />
        <rect x="30" y="20" width="60" height="90" rx="8" fill="var(--primary-color)" opacity="0.6" />
        {/* Screen */}
        <rect x="35" y="25" width="50" height="20" rx="4" fill="white" opacity="0.3" />
        {/* Buttons grid (3x4) with wave effect */}
        <g>
          {[ // Row 1
            {cx: 38, cy: 35}, {cx: 53, cy: 35}, {cx: 68, cy: 35},
            // Row 2
            {cx: 38, cy: 50}, {cx: 53, cy: 50}, {cx: 68, cy: 50},
            // Row 3
            {cx: 38, cy: 65}, {cx: 53, cy: 65}, {cx: 68, cy: 65},
            // Row 4 (0)
            {cx: 53, cy: 80}
          ].map((pos, i) => (
            <circle key={i} cx={pos.cx} cy={pos.cy} r="6" fill="white" opacity="0.2">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
            </circle>
          ))}
        </g>
        {/* Popping numbers (sample: 1, 2, 3) */}
        <g fill="var(--text-color)" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
          <text x="38" y="39" textAnchor="middle">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0s" />
            <animateTransform attributeName="transform" type="scale" values="0;1.2;1" dur="1.5s" repeatCount="indefinite" begin="0s" additive="sum"/>
            1
          </text>
          <text x="53" y="39" textAnchor="middle">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
            <animateTransform attributeName="transform" type="scale" values="0;1.2;1" dur="1.5s" repeatCount="indefinite" begin="0.5s" additive="sum"/>
            2
          </text>
          <text x="68" y="39" textAnchor="middle">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="1s" />
            <animateTransform attributeName="transform" type="scale" values="0;1.2;1" dur="1.5s" repeatCount="indefinite" begin="1s" additive="sum"/>
            3
          </text>
        </g>
        {/* Floating math symbols around calculator */}
        <g fill="var(--accent-color)" fontSize="12" fontWeight="bold">
          <text x="20" y="35">
            <animateTransform attributeName="transform" type="translate" values="0,0; -3,-3; 0,0" dur="4s" repeatCount="indefinite" />
            +
          </text>
          <text x="95" y="25">
            <animateTransform attributeName="transform" type="translate" values="0,0; 3,-3; 0,0" dur="4s" repeatCount="indefinite" begin="1s" />
            −
          </text>
          <text x="95" y="70">
            <animateTransform attributeName="transform" type="translate" values="0,0; -3,3; 0,0" dur="4s" repeatCount="indefinite" begin="2s" />
            ×
          </text>
          <text x="20" y="85">
            <animateTransform attributeName="transform" type="translate" values="0,0; 3,3; 0,0" dur="4s" repeatCount="indefinite" begin="3s" />
            ÷
          </text>
        </g>
        {/* Sparkles at corners */}
        <circle cx="28" cy="18" r="3" fill="#FFD700">
          <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="92" cy="18" r="2" fill="#FFD700">
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="28" cy="102" r="2.5" fill="#FFD700">
          <animate attributeName="opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </g>
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

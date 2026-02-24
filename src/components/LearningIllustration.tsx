import React from 'react';

const LearningIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          {/* Gradient backgrounds */}
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-color)" />
            <stop offset="100%" stopColor="var(--accent-color)" />
          </linearGradient>
          <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
          <linearGradient id="rainbowArc" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="25%" stopColor="#FFD93D" />
            <stop offset="50%" stopColor="#6BCB77" />
            <stop offset="75%" stopColor="#4D96FF" />
            <stop offset="100%" stopColor="#9B59B6" />
          </linearGradient>
        </defs>

        {/* Background glow */}
        <circle cx="200" cy="200" r="180" fill="url(#glow)">
          <animate attributeName="r" values="170;190;170" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Rainbow arc */}
        <path d="M 60 300 Q 200 60 340 300" stroke="url(#rainbowArc)" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.5">
          <animate attributeName="stroke-dasharray" values="0 600;600 0" dur="2s" fill="freeze" />
        </path>

        {/* School tools cluster */}
        <g transform="translate(200, 240)">
          <animateTransform attributeName="transform" type="translate" values="200,240;200,232;200,240" dur="3s" repeatCount="indefinite" />

          {/* Ruler (linjal) */}
          <g transform="rotate(-15)">
            <rect x="-50" y="-8" width="100" height="16" rx="3" fill="#FFD93D" stroke="#E6B800" strokeWidth="1.5" />
            {/* Ruler marks */}
            <line x1="-40" y1="-8" x2="-40" y2="-2" stroke="#E6B800" strokeWidth="1" />
            <line x1="-30" y1="-8" x2="-30" y2="0" stroke="#E6B800" strokeWidth="1" />
            <line x1="-20" y1="-8" x2="-20" y2="-2" stroke="#E6B800" strokeWidth="1" />
            <line x1="-10" y1="-8" x2="-10" y2="0" stroke="#E6B800" strokeWidth="1" />
            <line x1="0" y1="-8" x2="0" y2="-2" stroke="#E6B800" strokeWidth="1" />
            <line x1="10" y1="-8" x2="10" y2="0" stroke="#E6B800" strokeWidth="1" />
            <line x1="20" y1="-8" x2="20" y2="-2" stroke="#E6B800" strokeWidth="1" />
            <line x1="30" y1="-8" x2="30" y2="0" stroke="#E6B800" strokeWidth="1" />
            <line x1="40" y1="-8" x2="40" y2="-2" stroke="#E6B800" strokeWidth="1" />
          </g>

          {/* Pencil (penna) */}
          <g transform="translate(-30, -20) rotate(-40)">
            <rect x="-3.5" y="-30" width="7" height="28" rx="1" fill="#FF6B6B" />
            <rect x="-3.5" y="-34" width="7" height="6" rx="1" fill="#E85D75" />
            <polygon points="-3.5,-2 3.5,-2 0,6" fill="#FFDAB9" />
            <polygon points="-1,1 1,1 0,6" fill="#555" />
          </g>

          {/* Paintbrush (pensel) */}
          <g transform="translate(35, -15) rotate(25)">
            <rect x="-2.5" y="-28" width="5" height="22" rx="1" fill="#C4A882" />
            <rect x="-4" y="-32" width="8" height="6" rx="1" fill="#888" />
            <path d="M -4 -38 Q 0 -46 4 -38 L 4 -32 L -4 -32 Z" fill="#4D96FF" />
          </g>

          {/* Sparkles rising from tools */}
          <circle cx="-15" cy="-45" r="3" fill="url(#starGrad)" opacity="0.8">
            <animate attributeName="cy" values="-45;-75;-45" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="20" cy="-50" r="2.5" fill="url(#starGrad)" opacity="0.6">
            <animate attributeName="cy" values="-50;-85;-50" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="-40" r="2" fill="url(#starGrad)" opacity="0.7">
            <animate attributeName="cy" values="-40;-70;-40" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Floating letter A */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;0,-12;0,0" dur="3.5s" repeatCount="indefinite" />
          <circle cx="90" cy="120" r="32" fill="var(--primary-color)" opacity="0.9" />
          <text x="90" y="132" textAnchor="middle" fill="white" fontSize="36" fontWeight="800" fontFamily="'Baloo 2', cursive">A</text>
        </g>

        {/* Floating letter B */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;0,10;0,0" dur="4s" repeatCount="indefinite" />
          <circle cx="310" cy="110" r="28" fill="var(--accent-color)" opacity="0.9" />
          <text x="310" y="121" textAnchor="middle" fill="var(--text-color)" fontSize="30" fontWeight="800" fontFamily="'Baloo 2', cursive">B</text>
        </g>

        {/* Floating math sign + */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;8,0;0,0" dur="3s" repeatCount="indefinite" />
          <circle cx="200" cy="80" r="25" fill="#2ECC71" opacity="0.9" />
          <text x="200" y="92" textAnchor="middle" fill="white" fontSize="32" fontWeight="800" fontFamily="'Baloo 2', cursive">+</text>
        </g>

        {/* Floating Swedish letter Å */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;-6,-8;0,0" dur="4.5s" repeatCount="indefinite" />
          <circle cx="140" cy="170" r="22" fill="#FFD93D" opacity="0.9" />
          <text x="140" y="179" textAnchor="middle" fill="var(--text-color)" fontSize="24" fontWeight="800" fontFamily="'Baloo 2', cursive">Å</text>
        </g>

        {/* Floating Swedish letter Ö */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;6,8;0,0" dur="3.8s" repeatCount="indefinite" />
          <circle cx="270" cy="175" r="22" fill="#FF6B6B" opacity="0.8" />
          <text x="270" y="184" textAnchor="middle" fill="white" fontSize="24" fontWeight="800" fontFamily="'Baloo 2', cursive">Ö</text>
        </g>

        {/* Floating number 1 */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;5,-10;0,0" dur="3.2s" repeatCount="indefinite" />
          <circle cx="340" cy="155" r="20" fill="#6BCB77" opacity="0.9" />
          <text x="340" y="164" textAnchor="middle" fill="white" fontSize="22" fontWeight="800" fontFamily="'Baloo 2', cursive">1</text>
        </g>

        {/* Floating number 2 */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;-8,5;0,0" dur="4.2s" repeatCount="indefinite" />
          <circle cx="65" cy="155" r="18" fill="#4D96FF" opacity="0.85" />
          <text x="65" y="163" textAnchor="middle" fill="white" fontSize="20" fontWeight="800" fontFamily="'Baloo 2', cursive">2</text>
        </g>

        {/* Floating number 3 */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;7,6;0,0" dur="3.6s" repeatCount="indefinite" />
          <circle cx="175" cy="135" r="18" fill="#E85D75" opacity="0.85" />
          <text x="175" y="143" textAnchor="middle" fill="white" fontSize="20" fontWeight="800" fontFamily="'Baloo 2', cursive">3</text>
        </g>

        {/* Floating math sign × */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;-5,7;0,0" dur="4s" repeatCount="indefinite" />
          <circle cx="320" cy="200" r="16" fill="#9B59B6" opacity="0.85" />
          <text x="320" y="208" textAnchor="middle" fill="white" fontSize="20" fontWeight="800" fontFamily="'Baloo 2', cursive">×</text>
        </g>

        {/* Floating math sign = */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;6,-5;0,0" dur="3.4s" repeatCount="indefinite" />
          <circle cx="80" cy="100" r="16" fill="#E67E22" opacity="0.85" />
          <text x="80" y="108" textAnchor="middle" fill="white" fontSize="18" fontWeight="800" fontFamily="'Baloo 2', cursive">=</text>
        </g>

        {/* Stars */}
        <g>
          <animateTransform attributeName="transform" type="rotate" values="0 330 60;360 330 60" dur="6s" repeatCount="indefinite" />
          <polygon points="330,45 334,55 345,55 336,62 339,72 330,66 321,72 324,62 315,55 326,55" fill="url(#starGrad)" />
        </g>
        <g>
          <animateTransform attributeName="transform" type="rotate" values="0 70 65;-360 70 65" dur="8s" repeatCount="indefinite" />
          <polygon points="70,52 73,60 82,60 75,65 77,73 70,68 63,73 65,65 58,60 67,60" fill="url(#starGrad)" />
        </g>
        <g opacity="0.7">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
          <polygon points="350,200 352,206 358,206 353,210 355,216 350,212 345,216 347,210 342,206 348,206" fill="url(#starGrad)" />
        </g>
        <g opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
          <polygon points="55,210 57,215 62,215 58,218 59,223 55,220 51,223 52,218 48,215 53,215" fill="url(#starGrad)" />
        </g>

        {/* Pencil */}
        <g transform="translate(320, 280) rotate(30)">
          <animateTransform attributeName="transform" type="translate" values="320,280;315,275;320,280" dur="2s" repeatCount="indefinite" />
          <rect x="-4" y="-40" width="8" height="35" rx="1" fill="#FFD93D" />
          <rect x="-4" y="-45" width="8" height="8" rx="1" fill="#FF6B6B" />
          <polygon points="-4,-5 4,-5 0,8" fill="#FFDAB9" />
          <polygon points="-1,3 1,3 0,8" fill="#555" />
        </g>
      </svg>
    </div>
  );
};

export default LearningIllustration;

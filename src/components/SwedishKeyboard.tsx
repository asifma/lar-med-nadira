
import React from 'react';
import Button from './Button';

interface SwedishKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onCheck: () => void;
  onHearWord: () => void;
  disabled?: boolean;
}

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ['Å', 'Ä', 'Ö', '⌫']
];

const SwedishKeyboard: React.FC<SwedishKeyboardProps> = ({ 
  onKeyPress, 
  onBackspace, 
  onCheck, 
  onHearWord,
  disabled 
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-2 md:p-4 bg-white/10 backdrop-blur-md rounded-2xl md:rounded-[2.5rem] shadow-2xl border border-white/20">
      <div className="flex flex-col gap-1 md:gap-2">
        {rows.map((row, i) => (
          <div key={i} className="flex justify-center gap-1 md:gap-2">
            {row.map(key => 
              key === '⌫' ? (
                <button
                  key={key}
                  disabled={disabled}
                  onClick={onBackspace}
                  className="w-[13vw] sm:w-16 md:w-20 lg:w-24 h-[8.5vw] sm:h-12 md:h-14 lg:h-16 bg-red-100/80 rounded-lg md:rounded-xl shadow-[0_3px_0_rgba(239,68,68,0.2)] border-b-2 border-red-200 active:translate-y-[3px] active:shadow-none text-lg md:text-2xl font-black text-red-500 hover:bg-red-100 flex items-center justify-center transition-all disabled:opacity-50"
                >
                  ⌫
                </button>
              ) : (
              <button
                key={key}
                disabled={disabled}
                onClick={() => onKeyPress(key)}
                className="w-[8.5vw] sm:w-12 md:w-14 lg:w-16 aspect-square bg-white/90 rounded-lg md:rounded-xl shadow-[0_3px_0_rgba(0,0,0,0.1)] border-b-2 border-gray-200 active:translate-y-[3px] active:shadow-none text-lg md:text-2xl font-black text-gray-700 hover:bg-white flex items-center justify-center transition-all disabled:opacity-50"
              >
                {key}
              </button>
              )
            )}
          </div>
        ))}
        
        <div className="flex justify-center gap-2 md:gap-4 mt-2 md:mt-4">
          <Button 
            variant="secondary" 
            size="md" 
            onClick={onHearWord}
            className="flex items-center gap-2 text-sm md:text-lg px-3 py-2 md:px-6 md:py-3"
            disabled={disabled}
          >
            🔊 Hör ordet
          </Button>
          <Button 
            variant="accent" 
            size="md" 
            onClick={onCheck}
            className="flex-1 max-w-[140px] md:max-w-[200px] text-sm md:text-lg px-3 py-2 md:px-6 md:py-3"
            disabled={disabled}
          >
            KOLLA!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SwedishKeyboard;

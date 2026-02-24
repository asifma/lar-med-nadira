import React from 'react';
import Button from './Button';

interface NumericPadProps {
  onPress: (val: string) => void;
  onClear?: () => void;
  onEnter?: () => void;
}

const NumericPad: React.FC<NumericPadProps> = ({ onPress, onClear, onEnter }) => {
  const keys = ['1','2','3','4','5','6','7','8','9','0'];
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-[var(--card-bg)] backdrop-blur-md rounded-2xl shadow-xl border-[var(--card-border)]">
      <div className="grid grid-cols-3 gap-3 mb-3">
        {keys.slice(0,9).map(k => (
          <button key={k} onClick={() => onPress(k)} className="p-4 rounded-xl bg-[var(--bg-color)] text-2xl font-black shadow-sm">{k}</button>
        ))}
        <button onClick={onClear} className="p-4 rounded-xl bg-red-600 text-white text-2xl font-black shadow-sm">⌫</button>
        <button onClick={() => onPress('0')} className="p-4 rounded-xl bg-[var(--bg-color)] text-2xl font-black shadow-sm">0</button>
        <button onClick={onEnter} className="p-4 rounded-xl bg-[var(--accent-color)] text-[var(--text-color)] font-black shadow-sm">✔</button>
      </div>
      {/* Removed redundant Rensa/Kolla buttons — top row already provides clear and enter */}
    </div>
  );
};

export default NumericPad;

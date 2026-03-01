
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeType } from '../types';
import Button from '../components/Button';
import SpeakableText from '../components/SpeakableText';
import ThemeToggle from '../components/ThemeToggle';

const AVATARS = [
  '🦁', '🐼', '🦊', '🐸', '🦋', '🐬', 
  '🦉', '🐱', '🐶', '🦄', '🐉', '🦈',
  '🐯', '🐨', '🐰', '🐻', '🦓', '🦒',
  '🐵', '🐮', '🐷', '🦆', '🐔', '🦜'
];

const ProfileWizard: React.FC = () => {
  const navigate = useNavigate();
  const { addProfile } = useProfile();
  const { setTheme: setGlobalTheme } = useTheme();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>(ThemeType.UNICORN);

  const handleFinish = () => {
    if (!name || !avatar) return;
    addProfile(name, avatar, selectedTheme);
    navigate('/dashboard');
  };

  return (
    <div
      className="min-h-screen p-6 md:p-12 flex flex-col items-center relative"
      style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
    >
      {/* Cancel / Back to home */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border transition-all hover:scale-105"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border, rgba(255,255,255,0.3))' }}
      >
        <span className="text-lg">←</span>
        <span className="text-sm font-black uppercase tracking-wider" style={{ color: 'var(--text-color)' }}>Tillbaka</span>
      </button>

      <div className="max-w-4xl w-full text-center space-y-10 pt-10">

        {step === 1 && (
          <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            <SpeakableText
              text="Välj din avatar! Vem vill du vara?"
              className="text-4xl font-black"
            />
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {AVATARS.map(a => (
                <button
                  key={a}
                  onClick={() => setAvatar(a)}
                  className={`text-6xl p-4 rounded-3xl shadow-lg transition-all ${
                    avatar === a 
                      ? 'scale-110 border-8' 
                      : 'hover:scale-105 border-4 border-white/20'
                  }`}
                  style={{
                    backgroundColor: avatar === a ? 'var(--card-bg)' : 'rgba(255, 255, 255, 0.9)',
                    ...(avatar === a && { borderColor: 'var(--primary-color)' })
                  }}
                >
                  {a}
                </button>
              ))}
            </div>
            <div className="pt-8">
              <Button size="lg" onClick={() => setStep(2)} variant={avatar ? "primary" : "secondary"} disabled={!avatar}>⭐ NÄSTA →</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
            <SpeakableText
              text="Vad heter du? Skriv ditt namn här!"
              className="text-4xl font-black"
            />
            <div className="max-w-lg mx-auto">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                className="w-full p-6 text-7xl md:text-8xl text-center rounded-[3rem] border-8 shadow-2xl focus:outline-none font-black tracking-tight"
                style={{ 
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  borderColor: 'var(--primary-color)',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-color)'
                }}
                placeholder="..."
              />
            </div>
            <div className="flex justify-center gap-6 pt-8">
              <Button variant="secondary" size="lg" onClick={() => setStep(1)}>← 🏠 TILLBAKA</Button>
              <Button size="lg" onClick={() => name && setStep(3)} disabled={!name}>⭐ NÄSTA →</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
            <SpeakableText
              text="Välj din värld!"
              className="text-4xl font-black"
            />
            <div className="grid md:grid-cols-2 gap-8">
              {/* Unicorn Theme Card */}
              <button
                onClick={() => {
                  setSelectedTheme(ThemeType.UNICORN);
                  setGlobalTheme(ThemeType.UNICORN);
                }}
                className={`relative p-12 rounded-[3rem] border-8 transition-all duration-500 overflow-hidden group ${selectedTheme === ThemeType.UNICORN
                  ? 'border-pink-400 scale-105 shadow-[0_20px_60px_rgba(244,114,182,0.5)]'
                  : 'border-pink-200/40 opacity-70 hover:opacity-90'
                  }`}
                style={{ 
                  backgroundColor: selectedTheme === ThemeType.UNICORN ? '#FFE0F0' : '#F3E8FF'
                }}
              >
                {/* Magical sparkles background */}
                <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
                  <div className="absolute top-4 left-4 text-4xl opacity-30 animate-pulse">✨</div>
                  <div className="absolute top-8 right-8 text-3xl opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
                  <div className="absolute bottom-6 left-12 text-3xl opacity-25 animate-pulse" style={{ animationDelay: '1s' }}>💫</div>
                  <div className="absolute bottom-12 right-6 text-4xl opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}>🌟</div>
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-200/40 via-purple-200/30 to-pink-300/40 rounded-[2.5rem]" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 space-y-6">
                  <div className="text-9xl drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                    🦄
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-pink-600 mb-2">Enhörningsvärlden</h3>
                    <p className="text-sm font-bold text-pink-500/70">Magisk & färgglad</p>
                  </div>
                  {selectedTheme === ThemeType.UNICORN && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-full text-sm font-black animate-bounce">
                      ✓ Vald
                    </div>
                  )}
                </div>
              </button>

              {/* Hero Theme Card */}
              <button
                onClick={() => {
                  setSelectedTheme(ThemeType.HERO);
                  setGlobalTheme(ThemeType.HERO);
                }}
                className={`relative p-12 rounded-[3rem] border-8 transition-all duration-500 overflow-hidden group ${selectedTheme === ThemeType.HERO
                  ? 'border-blue-500 scale-105 shadow-[0_20px_60px_rgba(59,130,246,0.5)]'
                  : 'border-slate-400/40 opacity-70 hover:opacity-90'
                  }`}
                style={{ 
                  backgroundColor: selectedTheme === ThemeType.HERO ? '#1e293b' : '#334155'
                }}
              >
                {/* Action symbols background */}
                <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
                  <div className="absolute top-6 left-6 text-4xl opacity-20 animate-pulse">⚡</div>
                  <div className="absolute top-10 right-10 text-3xl opacity-15 animate-pulse" style={{ animationDelay: '0.5s' }}>💥</div>
                  <div className="absolute bottom-8 left-10 text-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>🔥</div>
                  <div className="absolute bottom-10 right-8 text-4xl opacity-15 animate-pulse" style={{ animationDelay: '1.5s' }}>⭐</div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-purple-600/30 rounded-[2.5rem]" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 space-y-6">
                  <div className="text-9xl drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                    🦸
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-blue-400 mb-2">Hjältevärlden</h3>
                    <p className="text-sm font-bold text-blue-300/70">Modig & äventyrlig</p>
                  </div>
                  {selectedTheme === ThemeType.HERO && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-black animate-bounce">
                      ✓ Vald
                    </div>
                  )}
                </div>
              </button>
            </div>
            <div className="flex justify-center gap-6 pt-8">
              <Button variant="secondary" size="lg" onClick={() => setStep(2)}>← 🏠 TILLBAKA</Button>
              <Button variant="primary" size="lg" onClick={handleFinish}>✅ KLAR! ✨</Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfileWizard;

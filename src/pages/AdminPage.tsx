
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import { useSettings } from '../contexts/SettingsContext';
import { useSpeech } from '../contexts/SpeechContext';
import Button from '../components/Button';
import ThemeToggle from '../components/ThemeToggle';
import ConfirmDialog from '../components/ConfirmDialog';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { profiles, deleteProfile, resetProfile } = useProfile();
  const { settings, updateSettings, unlockAllLevels, lockAllLevels, isGameFullyUnlocked } = useSettings();
  const { speechRate, setSpeechRate } = useSpeech();

  const [pin, setPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Editable settings state
  const [newPin, setNewPin] = useState('');
  const [pinSaved, setPinSaved] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{ 
    open: boolean; 
    title: string; 
    message: string; 
    onConfirm: () => void;
    type?: 'warning' | 'danger' | 'info';
    icon?: string;
  } | null>(null);

  const openConfirm = (
    title: string, 
    message: string, 
    onConfirm: () => void, 
    type: 'warning' | 'danger' | 'info' = 'info',
    icon?: string
  ) => {
    setConfirmDialog({ open: true, title, message, onConfirm, type, icon });
  };

  const handleDeleteProfile = (id: string, name: string) => {
    openConfirm(
      'Ta bort profil', 
      `Vill du verkligen ta bort ${name}? Detta går inte att ångra.`, 
      () => {
        deleteProfile(id);
      },
      'danger',
      '🗑️'
    );
  };

  const handleResetProfile = (id: string, name: string) => {
    openConfirm(
      'Nollställ poäng', 
      `Vill du nollställa ${name}s poäng och framsteg? Alla stjärnor och avklarade nivåer kommer att tas bort.`, 
      () => {
        resetProfile(id);
      },
      'warning',
      '🔄'
    );
  };

  const handleClearAllData = () => {
    openConfirm(
      'Rensa all data', 
      'VARNING: Detta tar bort ALL data permanent, inklusive alla profiler och inställningar. Är du helt säker?', 
      () => {
        localStorage.clear();
        window.location.reload();
      },
      'danger',
      '💥'
    );
  };

  const handlePinSubmit = () => {
    if (pin === settings.adminPin) {
      setIsAuthorized(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPin('');
      setTimeout(() => setPinError(false), 2000);
    }
  };

  const handleSavePin = () => {
    if (newPin.length >= 4) {
      updateSettings({ adminPin: newPin });
      setNewPin('');
      setPinSaved(true);
      setTimeout(() => setPinSaved(false), 2000);
    }
  };

  if (!isAuthorized) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-8 relative"
        style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
      >
        <ThemeToggle />
        <div
          className="backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl space-y-8 text-center max-w-sm w-full border border-white/20"
          style={{ backgroundColor: 'var(--card-bg)' }}
        >
          <h2 className="text-2xl font-bold">Föräldrar / Lärare</h2>
          <p className="opacity-60">Slå in PIN-kod för att fortsätta.</p>
          
          {pinError && (
            <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-4 animate-shake">
              <p className="text-red-500 font-bold text-center">❌ Fel PIN! Försök igen.</p>
            </div>
          )}
          
          <form onSubmit={(e) => { e.preventDefault(); handlePinSubmit(); }}>
            <input
              type="text"
              name="username"
              autoComplete="username"
              style={{ display: 'none' }}
              tabIndex={-1}
              aria-hidden="true"
            />
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className={`w-full p-4 text-4xl text-center border-2 rounded-xl bg-white/5 focus:border-blue-500 outline-none transition-all ${
                pinError ? 'border-red-500 animate-shake' : 'border-white/10'
              }`}
              placeholder="****"
              maxLength={8}
              autoComplete="current-password"
            />
          </form>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => (
              <button
                key={n}
                onClick={() => setPin(prev => (prev + n).slice(0, 8))}
                className="p-4 bg-white/5 rounded-lg hover:bg-white/10 font-bold text-xl border border-white/5"
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <Button onClick={handlePinSubmit} size="lg">Logga in</Button>
            <button onClick={() => navigate('/')} className="text-sm underline" style={{ color: 'var(--muted-color)' }}>Gå tillbaka</button>
          </div>
        </div>
      </div>
    );
  }

  const abcUnlocked = isGameFullyUnlocked('abc');
  const mathUnlocked = isGameFullyUnlocked('math');
  const memoryUnlocked = isGameFullyUnlocked('memory');

  return (
    <div
      className="min-h-screen p-6 md:p-12 pb-28 relative"
      style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center border-b border-white/20 pb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl hover:scale-110 hover:bg-white/25 transition-all shadow-lg"
          >
            ←
          </button>
          <h1 className="text-4xl font-bold absolute left-1/2 -translate-x-1/2">Admin-panel</h1>
          <div className="w-12" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profiles Management */}
          <div
            className="backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-lg"
            style={{ backgroundColor: 'var(--card-bg)' }}
          >
            <h3 className="text-xl font-bold mb-6 opacity-80">Hantera profiler</h3>
            <div className="space-y-4">
              {profiles.length === 0 ? (
                <p className="text-gray-400 italic">Inga profiler skapade än.</p>
              ) : (
                profiles.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{p.avatar}</span>
                      <div>
                        <p className="font-bold">{p.name}</p>
                        <p className="text-xs opacity-60">ID: {p.id.slice(0, 8)}... | ⭐ {p.stars}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleResetProfile(p.id, p.name)}
                        className="px-3 py-2 rounded-lg font-bold text-sm transition-all border-2"
                        style={{ 
                          borderColor: 'var(--accent-color)', 
                          color: 'var(--accent-color)',
                          backgroundColor: 'transparent'
                        }}
                      >
                        Nollställ poäng
                      </button>
                      <button
                        onClick={() => handleDeleteProfile(p.id, p.name)}
                        className="px-3 py-2 rounded-lg font-bold text-sm bg-red-500 text-white hover:bg-red-600 transition-all"
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* App Settings */}
          <div
            className="backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-lg"
            style={{ backgroundColor: 'var(--card-bg)' }}
          >
            <h3 className="text-xl font-bold mb-6 opacity-80">App-inställningar</h3>
            <div className="space-y-6">

              {/* PIN Setting */}
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-60 uppercase tracking-wider">Admin PIN</label>
                <form onSubmit={(e) => { e.preventDefault(); handleSavePin(); }} className="flex gap-2">
                  <input
                    type="text"
                    name="username"
                    autoComplete="username"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  <input
                    type="password"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder={`Nuvarande: ${'•'.repeat(settings.adminPin.length)}`}
                    maxLength={8}
                    autoComplete="new-password"
                    className="flex-1 p-3 rounded-xl border border-white/10 bg-white/5 focus:border-blue-500 outline-none text-sm"
                  />
                  <button
                    type="submit"
                    disabled={newPin.length < 4}
                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all ${newPin.length >= 4
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-white/5 opacity-30 cursor-not-allowed'
                      }`}
                  >
                    {pinSaved ? '✓ Sparat!' : 'Spara'}
                  </button>
                </form>
                <p className="text-xs opacity-40">Minst 4 tecken</p>
              </div>

              <hr className="border-white/10" />

              {/* Voice Speed */}
              <div className="space-y-3">
                <label className="text-sm font-bold opacity-60 uppercase tracking-wider">Röst-hastighet</label>
                <div className="flex items-center gap-4">
                  <span className="text-sm opacity-50">🐢</span>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.1"
                    value={speechRate}
                    onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                    className="flex-1 accent-[var(--primary-color)]"
                  />
                  <span className="text-sm opacity-50">🐇</span>
                  <span className="font-mono bg-white/10 px-3 py-1 rounded-lg text-sm font-bold min-w-[3.5rem] text-center">
                    {speechRate.toFixed(1)}x
                  </span>
                </div>
              </div>

              <hr className="border-white/10" />

              {/* Auto-play Instructions */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">Automatisk uppläsning</p>
                  <p className="text-xs opacity-40">Läs instruktioner högt automatiskt</p>
                </div>
                <button
                  onClick={() => updateSettings({ autoPlayInstructions: !settings.autoPlayInstructions })}
                  className={`w-14 h-8 rounded-full transition-all duration-300 relative ${settings.autoPlayInstructions
                    ? 'bg-green-500'
                    : 'bg-white/10'
                    }`}
                >
                  <div className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-all duration-300 shadow-md ${settings.autoPlayInstructions ? 'left-7' : 'left-1'
                    }`} />
                </button>
              </div>

              <hr className="border-white/10" />

              {/* Unlock All Levels */}
              <div className="space-y-3">
                <label className="text-sm font-bold opacity-60 uppercase tracking-wider">Lås upp nivåer</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🔤</span>
                      <div>
                        <p className="font-bold text-sm">ABC-Äventyr</p>
                        <p className="text-xs opacity-40">Alla 20 nivåer</p>
                      </div>
                    </div>
                    <button
                      onClick={() => abcUnlocked ? lockAllLevels('abc') : unlockAllLevels('abc')}
                      className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${abcUnlocked
                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                        : 'bg-white/10 hover:bg-white/20 border border-white/10'
                        }`}
                    >
                      {abcUnlocked ? '🔓 Upplåst' : '🔒 Lås upp alla'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">➗</span>
                      <div>
                        <p className="font-bold text-sm">Matte-Magi</p>
                        <p className="text-xs opacity-40">Alla 20 nivåer</p>
                      </div>
                    </div>
                    <button
                      onClick={() => mathUnlocked ? lockAllLevels('math') : unlockAllLevels('math')}
                      className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${mathUnlocked
                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                        : 'bg-white/10 hover:bg-white/20 border border-white/10'
                        }`}
                    >
                      {mathUnlocked ? '🔓 Upplåst' : '🔒 Lås upp alla'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🧠</span>
                      <div>
                        <p className="font-bold text-sm">Minnes-Mästaren</p>
                        <p className="text-xs opacity-40">Alla 20 nivåer</p>
                      </div>
                    </div>
                    <button
                      onClick={() => memoryUnlocked ? lockAllLevels('memory') : unlockAllLevels('memory')}
                      className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${memoryUnlocked
                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                        : 'bg-white/10 hover:bg-white/20 border border-white/10'
                        }`}
                    >
                      {memoryUnlocked ? '🔓 Upplåst' : '🔒 Lås upp alla'}
                    </button>
                  </div>
                </div>
              </div>

              <hr className="border-white/10" />

              {/* Data / Debug Section */}
              <div className="bg-amber-400/10 p-4 rounded-xl border border-amber-400/30 space-y-3">
                <h4 className="text-sm font-black text-amber-500 uppercase tracking-wider">Data-hantering 🛠️</h4>
                <p className="text-xs opacity-50">Exportera eller rensa all data nedan.</p>
              </div>

              <div className="pt-2 space-y-4">
                <Button variant="secondary" className="w-full text-sm" onClick={() => {
                  const data = {
                    profiles: localStorage.getItem('lmn_profiles'),
                    settings: localStorage.getItem('lmn_settings'),
                  };
                  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'backup.json';
                  a.click();
                }}>Exportera Backup</Button>

                <button
                  onClick={handleClearAllData}
                  className="w-full py-3 text-red-400 font-bold border-2 border-red-400/20 rounded-xl hover:bg-red-400/10 transition-colors"
                >
                  Rensa all data
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-blue-600/20 backdrop-blur-md rounded-2xl border border-blue-400/30 shadow-lg">
          <h3 className="text-xl font-bold mb-2 text-blue-400">Pedagogisk information</h3>
          <p className="opacity-90 leading-relaxed">
            "Lär med Nadira" är designad för att vara ett säkert utrymme för barn att utforska språket.
            Vi använder inga externa servrar eller annonser. All data sparas lokalt på denna enhet.
            Använd admin-sidan för att följa upp barnens framsteg och rensa gamla profiler vid behov.
          </p>
        </div>

        {/* Developer Credit */}
        <div className="text-center py-6 opacity-60">
          <p className="text-sm font-bold">
            Developed with ❤️ by{' '}
            <a 
              href="https://mithawala.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity underline"
              style={{ color: 'var(--primary-color)' }}
            >
              Asif Mithawala
            </a>
          </p>
        </div>
      </div>

      {/* Confirm Dialog */}
      {confirmDialog && (
        <ConfirmDialog
          open={confirmDialog.open}
          title={confirmDialog.title}
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onCancel={() => setConfirmDialog(null)}
          type={confirmDialog.type}
          icon={confirmDialog.icon}
        />
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AdminPage;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import SpeakableText from '../components/SpeakableText';
import Button from '../components/Button';
import DashboardDecoration from '../components/DashboardDecoration';
import { AbcCardIllustration, MathCardIllustration, PuzzleCardIllustration } from '../components/GameCardIllustration';
import ThemeToggle from '../components/ThemeToggle';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { activeProfile } = useProfile();

  if (!activeProfile) {
    return <div className="p-8 text-center"><Button onClick={() => navigate('/')}>Gå till start</Button></div>;
  }

  return (
    <div
      className="h-[100dvh] flex flex-col overflow-hidden relative"
      style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Unicorn theme elements */}
        <div className="unicorn-floaters" data-theme="unicorn">
          <div className="float-element text-6xl opacity-20 absolute" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>✨</div>
          <div className="float-element text-5xl opacity-15 absolute" style={{ top: '20%', right: '10%', animationDelay: '2s' }}>🦄</div>
          <div className="float-element text-4xl opacity-25 absolute" style={{ top: '60%', left: '15%', animationDelay: '4s' }}>🌈</div>
          <div className="float-element text-5xl opacity-20 absolute" style={{ top: '70%', right: '20%', animationDelay: '1s' }}>⭐</div>
          <div className="float-element text-6xl opacity-15 absolute" style={{ top: '40%', right: '5%', animationDelay: '3s' }}>💫</div>
          <div className="float-element text-4xl opacity-20 absolute" style={{ top: '85%', left: '25%', animationDelay: '5s' }}>🌸</div>
          <div className="float-element text-5xl opacity-15 absolute" style={{ top: '30%', left: '40%', animationDelay: '2.5s' }}>🦋</div>
          <div className="float-element text-4xl opacity-25 absolute" style={{ top: '50%', right: '35%', animationDelay: '1.5s' }}>💖</div>
        </div>
        
        {/* Hero theme elements */}
        <div className="hero-floaters" data-theme="hero">
          <div className="float-element text-6xl opacity-15 absolute" style={{ top: '15%', left: '8%', animationDelay: '0s' }}>⚡</div>
          <div className="float-element text-5xl opacity-20 absolute" style={{ top: '25%', right: '12%', animationDelay: '2s' }}>🦸</div>
          <div className="float-element text-4xl opacity-15 absolute" style={{ top: '55%', left: '10%', animationDelay: '4s' }}>🔥</div>
          <div className="float-element text-5xl opacity-20 absolute" style={{ top: '75%', right: '15%', animationDelay: '1s' }}>💥</div>
          <div className="float-element text-6xl opacity-15 absolute" style={{ top: '45%', right: '8%', animationDelay: '3s' }}>⭐</div>
          <div className="float-element text-4xl opacity-20 absolute" style={{ top: '80%', left: '20%', animationDelay: '5s' }}>🚀</div>
          <div className="float-element text-5xl opacity-15 absolute" style={{ top: '35%', left: '45%', animationDelay: '2.5s' }}>🎯</div>
          <div className="float-element text-4xl opacity-20 absolute" style={{ top: '60%', right: '30%', animationDelay: '1.5s' }}>🏆</div>
        </div>
      </div>

      {/* Header */}
      <header className="p-6 flex justify-between items-center bg-white/10 backdrop-blur-md shadow-sm border-b border-white/20 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-4xl border-4 border-[var(--primary-color)]">
            {activeProfile.avatar}
          </div>
          <div>
            <h2 className="text-2xl font-black">Hej {activeProfile.name}!</h2>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold" style={{ color: 'var(--accent-color)' }}>⭐ {activeProfile.stars}</span>
            </div>
          </div>
        </div>
        <ThemeToggle className="top-6" />
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="max-w-5xl mx-auto space-y-12">

          <div className="text-center relative">
            <DashboardDecoration className="absolute inset-0 -top-8 -bottom-4 opacity-80" />
            <SpeakableText
              text={`Välkommen tillbaka, ${activeProfile.name}! Vad vill du lära dig idag?`}
              className="text-4xl font-black relative z-10"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ABC Game Card */}
            <div
              onClick={() => navigate('/spel/abc-aventyr/stavning')}
              className="rounded-[2rem] p-8 shadow-[0_10px_0_rgba(0,0,0,0.1)] border border-white/20 cursor-pointer hover:translate-y-[-8px] hover:shadow-[0_18px_0_rgba(0,0,0,0.1)] transition-all group overflow-hidden relative active:translate-y-[-2px]"
              style={{ backgroundColor: 'var(--card-bg)', backdropFilter: 'blur(10px)' }}
            >
              <div
                className="absolute top-4 right-4 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm z-10"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                Populärt!
              </div>
              <AbcCardIllustration className="w-28 h-28 mb-4 group-hover:scale-105 transition-transform" />
              <h3 className="text-3xl font-black mb-2">ABC-Äventyr</h3>
              <p className="font-bold opacity-70">Lär dig stava roliga ord!</p>
              <div className="mt-6 flex justify-end">
                <div className="w-12 h-12 rounded-full text-white flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform" style={{ background: 'var(--primary-gradient, var(--primary-color))' }}>➔</div>
              </div>
            </div>

            {/* Future Math Game Placeholder */}
            <div
              className="rounded-[2rem] p-8 shadow-[0_6px_0_rgba(0,0,0,0.05)] border-2 border-dashed opacity-50 flex flex-col justify-center items-center text-center"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--primary-color)', opacity: 0.4 }}
            >
              <MathCardIllustration className="w-24 h-24 mb-4" />
              <h3 className="text-xl font-bold">Matte-Magi</h3>
              <p className="text-sm opacity-60">Kommer snart!</p>
            </div>

            {/* Future Puzzle Placeholder */}
            <div
              className="rounded-[2rem] p-8 shadow-[0_6px_0_rgba(0,0,0,0.05)] border-2 border-dashed opacity-50 flex flex-col justify-center items-center text-center"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--primary-color)', opacity: 0.4 }}
            >
              <PuzzleCardIllustration className="w-24 h-24 mb-4" />
              <h3 className="text-xl font-bold">Pussel-Palats</h3>
              <p className="text-sm opacity-60">Kommer snart!</p>
            </div>
          </div>

          <div className="pt-12">
            <div
              className="rounded-3xl p-8 border border-white/20 backdrop-blur-md shadow-inner"
              style={{ backgroundColor: 'var(--card-bg)' }}
            >
              <h4 className="text-2xl font-black mb-6 flex items-center gap-3">
                🏆 Dina framsteg
              </h4>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {(activeProfile.completedLevels || []).length === 0 ? (
                  <p className="italic font-bold" style={{ color: 'var(--muted-color)' }}>Spela spel för att samla märken! 🎁</p>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold opacity-60">⭐ {activeProfile.stars} stjärnor</span>
                    <span className="mx-2 opacity-30">|</span>
                    <span className="text-sm font-bold opacity-60">🏅 {(activeProfile.completedLevels || []).length} nivåer klara</span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/ProfileContext';
import SpeakableText from '../components/SpeakableText';
import Button from '../components/Button';
import DashboardDecoration from '../components/DashboardDecoration';
import GameCard from '../components/GameCard';
import ThemeToggle from '../components/ThemeToggle';
import GAMES from '../data/gameRegistry';

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
      <main className="flex-1 overflow-y-auto p-6 pb-32 md:p-12 md:pb-32">
        <div className="max-w-5xl mx-auto space-y-12">

          <div className="text-center relative">
            <DashboardDecoration className="absolute inset-0 -top-8 -bottom-4 opacity-80" />
            <SpeakableText
              text={`Välkommen tillbaka. Vad vill du lära dig idag?`}
              className="text-4xl font-black relative z-10"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GAMES.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          <div className="pt-12">
            <div
              className="rounded-3xl p-8 border border-white/20 backdrop-blur-md shadow-lg overflow-hidden relative"
              style={{ backgroundColor: 'var(--card-bg)' }}
            >
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 text-9xl opacity-5 pointer-events-none">🏆</div>
              <div className="absolute bottom-0 left-0 text-7xl opacity-5 pointer-events-none">⭐</div>
              
              <h4 className="text-3xl font-black mb-8 flex items-center gap-3 relative z-10">
                <span className="text-4xl">🏆</span>
                <SpeakableText text="Dina framsteg" className="inline" />
              </h4>
              
              {(activeProfile.completedLevels || []).length === 0 ? (
                <div className="text-center py-8 relative z-10">
                  <div className="text-6xl mb-4 animate-bounce">🎁</div>
                  <p className="text-xl font-bold opacity-70">Spela spel för att samla märken!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {/* Stars card */}
                  <div className="rounded-2xl p-6 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 border-2 border-yellow-400/30 shadow-lg relative overflow-hidden group hover:scale-105 transition-transform">
                    {/* Floating stars background */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-2 right-4 text-3xl opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>⭐</div>
                      <div className="absolute top-8 left-6 text-2xl opacity-15 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}>✨</div>
                      <div className="absolute bottom-4 right-8 text-2xl opacity-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>💫</div>
                      <div className="absolute bottom-8 left-4 text-3xl opacity-15 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }}>🌟</div>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="text-6xl group-hover:scale-110 transition-transform">⭐</div>
                      <div>
                        <div className="text-5xl font-black text-yellow-600">{activeProfile.stars}</div>
                        <div className="text-sm font-bold opacity-60">Stjärnor totalt</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Levels card */}
                  <div className="rounded-2xl p-6 bg-gradient-to-br from-green-400/20 to-emerald-400/20 border-2 border-green-400/30 shadow-lg relative overflow-hidden group hover:scale-105 transition-transform">
                    {/* Floating badges background */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-3 right-5 text-3xl opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2.2s' }}>🏅</div>
                      <div className="absolute top-10 left-5 text-2xl opacity-15 animate-bounce" style={{ animationDelay: '0.7s', animationDuration: '2.7s' }}>🎖️</div>
                      <div className="absolute bottom-5 right-6 text-2xl opacity-20 animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '3.2s' }}>🥇</div>
                      <div className="absolute bottom-10 left-6 text-3xl opacity-15 animate-bounce" style={{ animationDelay: '1.8s', animationDuration: '2.5s' }}>🎯</div>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="text-6xl group-hover:scale-110 transition-transform">🏅</div>
                      <div>
                        <div className="text-5xl font-black text-green-600">{(activeProfile.completedLevels || []).length}</div>
                        <div className="text-sm font-bold opacity-60">Klistermärken samlade</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;

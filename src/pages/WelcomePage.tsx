
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import SpeakableText from '../components/SpeakableText';
import LearningIllustration from '../components/LearningIllustration';
import { useProfile } from '../contexts/ProfileContext';
import ThemeToggle from '../components/ThemeToggle';
import HomeScreenTip from '../components/HomeScreenTip';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { activeProfile, profiles, selectProfile } = useProfile();

  const hasProfiles = profiles.length > 0;

  const handleStart = () => {
    if (profiles.length === 0) {
      navigate('/profil/ny');
    } else if (activeProfile) {
      navigate('/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  // Handle horizontal scroll with mouse wheel on desktop
  React.useEffect(() => {
    const container = document.querySelector('.profile-scroll-container');
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    const updateScrollHints = () => {
      const leftHint = document.querySelector('.profile-scroll-hint-left');
      const rightHint = document.querySelector('.profile-scroll-hint-right');
      
      if (leftHint && rightHint) {
        // Show left hint if we can scroll left
        if (container.scrollLeft > 10) {
          leftHint.classList.remove('opacity-0');
          leftHint.classList.add('opacity-100');
        } else {
          leftHint.classList.add('opacity-0');
          leftHint.classList.remove('opacity-100');
        }

        // Show right hint if we can scroll right
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft < maxScroll - 10) {
          rightHint.classList.remove('opacity-0');
          rightHint.classList.add('opacity-100');
        } else {
          rightHint.classList.add('opacity-0');
          rightHint.classList.remove('opacity-100');
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', updateScrollHints);
    
    // Initial check
    setTimeout(updateScrollHints, 100);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', updateScrollHints);
    };
  }, [hasProfiles, profiles.length]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative px-6 py-10 pb-24"
      style={{ background: 'var(--bg-gradient, var(--bg-color))' }}
    >
      <ThemeToggle className="absolute top-6 right-6" />

      {/* Settings Button */}
      <button
        onClick={() => navigate('/admin')}
        className="absolute bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 4px rgba(255, 255, 255, 0.1)'
        }}
        title="Inställningar"
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative z-10 group-hover:rotate-180 transition-transform duration-500 drop-shadow-lg">⚙️</span>
      </button>

      {/* HomeScreen Tip */}
      <HomeScreenTip />

      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-black text-center leading-[0.9] tracking-tighter drop-shadow-[0_6px_0_rgba(0,0,0,0.05)] mb-2">
        <span className="text-[var(--primary-color)]">Lär med</span>
        <br />
        <span className="text-[var(--text-color)]">Nadira</span>
      </h1>
      <div className="h-2 w-24 bg-[var(--accent-color)] rounded-full mb-6" />

      {/* Illustration */}
      <LearningIllustration className="w-64 h-64 md:w-80 md:h-80 mb-6" />

      {/* Speech bubble */}
      <div
        className="backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.06)] relative max-w-sm w-full mb-8"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', borderWidth: '1px', borderStyle: 'solid' }}
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45" style={{ backgroundColor: 'var(--card-bg)', borderLeft: '1px solid var(--card-border)', borderTop: '1px solid var(--card-border)' }} />
        <SpeakableText
          text={hasProfiles ? "Hej! Välkommen tillbaka! Välj din profil nedan!" : "Hej! Välkommen till Lär med Nadira! Tryck på knappen för att börja!"}
          className="text-xl md:text-2xl font-black leading-tight text-center"
        />
      </div>

      {/* BÖRJA button — only when no profiles exist */}
      {!hasProfiles && (
        <Button
          size="xl"
          variant="primary"
          onClick={handleStart}
          className="text-3xl md:text-4xl py-6 md:py-8 px-14 md:px-20 hover:translate-y-[-4px] active:translate-y-[2px] active:shadow-none transition-all"
        >
          BÖRJA! ▶️
        </Button>
      )}

      {/* Profile Quick Select — enlarged when BÖRJA is hidden */}
      {hasProfiles && (
        <div className="mt-4 space-y-4 w-full max-w-md">
          <p className="text-lg font-black opacity-50 uppercase tracking-[0.15em] text-center">Välj din profil</p>
          <div className="relative">
            {/* Scroll hint - left */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-0 transition-opacity profile-scroll-hint-left">
              <div className="w-8 h-16 bg-gradient-to-r from-black/20 to-transparent flex items-center justify-start pl-1">
                <span className="text-2xl animate-pulse">‹</span>
              </div>
            </div>
            
            {/* Scroll hint - right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-0 transition-opacity profile-scroll-hint-right">
              <div className="w-8 h-16 bg-gradient-to-l from-black/20 to-transparent flex items-center justify-end pr-1">
                <span className="text-2xl animate-pulse">›</span>
              </div>
            </div>

            <div
              className="overflow-x-auto no-scrollbar rounded-[2rem] border border-white/10 profile-scroll-container"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
            >
              <div className="flex justify-center gap-6 py-6 px-6 min-w-max">
                {profiles.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      selectProfile(p.id);
                      navigate('/dashboard');
                    }}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div
                      className="w-24 h-24 rounded-3xl border-4 shadow-xl flex items-center justify-center text-6xl group-hover:scale-110 group-hover:-rotate-6 active:translate-y-1 active:shadow-none transition-all"
                      style={{ 
                        backgroundColor: 'var(--card-bg)', 
                        backdropFilter: 'blur(10px)',
                        borderColor: 'var(--primary-color)'
                      }}
                    >
                      {p.avatar}
                    </div>
                    <span className="text-sm font-black opacity-70 uppercase tracking-wider">{p.name}</span>
                  </button>
                ))}
                <button
                  onClick={() => navigate('/profil/ny')}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="w-24 h-24 rounded-3xl border-4 border-dashed flex items-center justify-center group-hover:scale-110 transition-all backdrop-blur-sm"
                    style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)', opacity: 0.6 }}
                  >
                    <span className="text-5xl font-black">+</span>
                  </div>
                  <span className="text-sm font-black uppercase tracking-wider" style={{ color: 'var(--text-color)', opacity: 0.5 }}>Ny</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}
      </style>
    </div>
  );
};

export default WelcomePage;

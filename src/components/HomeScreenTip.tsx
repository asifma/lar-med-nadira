
import React, { useState, useEffect } from 'react';

const HomeScreenTip: React.FC = () => {
    const [show, setShow] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Don't show if already dismissed
        if (localStorage.getItem('lmn_homescreen_tip_dismissed')) return;

        // Don't show if already in standalone/PWA mode
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches
            || (navigator as any).standalone === true;
        if (isStandalone) return;

        // Only show on mobile/tablet
        const ua = navigator.userAgent;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
        const isIPad = /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1;

        if (isMobile || isIPad) {
            setIsIOS(/iPhone|iPad|iPod/i.test(ua) || isIPad);
            setShow(true);
        }
    }, []);

    const dismiss = () => {
        localStorage.setItem('lmn_homescreen_tip_dismissed', 'true');
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] animate-slideDown">
            <div
                className="mx-4 mt-4 p-4 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-xl flex items-start gap-3"
                style={{ backgroundColor: 'var(--card-bg)' }}
            >
                <span className="text-3xl shrink-0">📲</span>
                <div className="flex-1 min-w-0">
                    <p className="font-black text-sm mb-1" style={{ color: 'var(--primary-color)' }}>
                        Installera appen!
                    </p>
                    <p className="text-xs opacity-70 leading-relaxed">
                        {isIOS
                            ? 'Tryck på ⬆️ Dela-knappen → "Lägg till på hemskärmen" för att installera appen.'
                            : 'Tryck på ⋮ menyn → "Lägg till på hemskärmen" för att installera appen.'}
                    </p>
                </div>
                <button
                    onClick={dismiss}
                    className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg opacity-60 hover:opacity-100 transition-opacity"
                >
                    ✕
                </button>
            </div>

            <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
      `}</style>
        </div>
    );
};

export default HomeScreenTip;

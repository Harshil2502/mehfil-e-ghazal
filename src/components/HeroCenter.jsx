import React, { useState, useEffect } from 'react';
import { Copy, Sparkles, Music, BookOpen, Share2 } from 'lucide-react';
import { COUPLETS_DATABASE } from '../data/couplets';

export default function HeroCenter({
  onToggleRain,
  isRainActive,
  onOpenPlaylist,
  onOpenLyrics,
  playlistCount,
  onShowToast,
  currentTrack
}) {
  const [sherIndex, setSherIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const activeSher = COUPLETS_DATABASE[sherIndex % COUPLETS_DATABASE.length];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSher();
    }, 26000);
    return () => clearInterval(timer);
  }, [sherIndex]);

  const handleNextSher = () => {
    setIsFading(true);
    setTimeout(() => {
      setSherIndex((prev) => (prev + 1) % COUPLETS_DATABASE.length);
      setIsFading(false);
    }, 250);
  };

  const handleCopySher = () => {
    const textToCopy = `${activeSher.urdu}\n\n"${activeSher.hindi.replace('\n', ' • ')}"\n\n${activeSher.english}\n— ${activeSher.poet}\n\nVia Mehfil (https://deluxsalon.in/)`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      onShowToast('Couplet copied to clipboard!', '📋');
    }).catch(() => {
      onShowToast('Couplet copied!');
    });
  };

  const handleShareWhatsApp = () => {
    const msg = encodeURIComponent(
      `*غزلوں کی محفل میں کچھ پَل بِتائیے ✨*\n\n` +
      `Listening to *"${currentTrack?.title || 'Woh Kagaz Ki Kashti'}"* by ${currentTrack?.artist || 'Jagjit Singh'} on *Mehfil*.\n` +
      `Subtle ambient candlelight & timeless poetry for midnight peace.\n\n` +
      `👉 ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  return (
    <main className="relative z-20 min-h-[100svh] flex flex-col items-center justify-between pt-20 sm:pt-24 pb-28 px-4 max-w-4xl mx-auto w-full pointer-events-none">
      <div />

      <div className="pointer-events-auto text-center flex flex-col items-center gap-3 sm:gap-4 my-auto w-full">

        <div className="relative select-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]">
         
          <div className="font-display text-xs xs:text-sm sm:text-base tracking-[0.35em] uppercase text-amber-400 font-semibold mt-0">
            MEHFIL-E-GHAZAL
          </div>
          <div className="text-[11px] sm:text-xs text-amber-200/60 tracking-wider font-light italic mt-0.5">
            Soulful Ghazals & Ambient Candlelight
          </div>
        </div>

       
        <div className="flex items-center justify-center gap-2 flex-wrap mt-1">

          <button
            type="button"
            onClick={onToggleRain}
            className={`glass-pill text-xs ${isRainActive ? 'active border-sky-400/80 text-sky-200' : ''}`}
          >
            <span>🌧️</span>
            <span>{isRainActive ? 'Baarish ON' : 'Baarish?'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenPlaylist}
            className="glass-pill text-xs"
          >
            <Music className="w-3.5 h-3.5 text-amber-400" />
            <span>Ghazal Fihrist</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-300 text-[10px] font-mono">
              {playlistCount}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenLyrics}
            className="glass-pill text-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Lyrics</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="glass-pill text-xs hover:text-emerald-300 hover:border-emerald-500/40"
          >
            <Share2 className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Share</span>
          </button>

        </div>

      </div>

      <div />
    </main>
  );
}

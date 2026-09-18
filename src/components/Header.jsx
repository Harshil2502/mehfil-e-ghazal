import React, { useState, useEffect } from 'react';
import { Lightbulb, CloudRain, Moon, Sun, Timer } from 'lucide-react';

export default function Header({
  activeScene,
  onSceneChange,
  onOpenAmbient,
  onOpenSoundscapes,
  onOpenSleepTimer,
  isDimmed,
  onToggleDimmer,
  sleepMinsRemaining
}) {
  const [onlineCount, setOnlineCount] = useState(1842);

  // Organic fluctuation of live listeners counter (Deluxe Saloon style)
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(1800 + Math.floor(Math.random() * 85));
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-40 px-3 sm:px-6 max-w-7xl mx-auto w-full pointer-events-auto">
      <div className="flex items-center justify-between gap-1.5 xs:gap-2 sm:gap-3 w-full">

        {/* 1. Live Mehfil Listeners Counter */}
        <div className="glass-pill text-amber-400 gap-1.5 shrink-0 select-none">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0 shadow-[0_0_10px_rgba(251,191,36,0.9)]" />
          <span className="text-white/95 font-mono font-bold tracking-tight text-xs">
            {onlineCount.toLocaleString()}
          </span>
          <span className="text-amber-200/60 text-[10px] font-normal hidden sm:inline">
            in Mehfil
          </span>
        </div>

        {/* 2. Scene Selector Dropdown Pill */}
        <div className="relative shrink-0 flex-1 sm:flex-initial sm:w-52">
          <select
            value={activeScene}
            onChange={(e) => onSceneChange(e.target.value)}
            aria-label="Choose atmospheric scene"
            className="glass-pill w-full text-center appearance-none cursor-pointer pr-7 text-xs text-amber-100"
          >
            <option value="chiraag" className="bg-[#1c0c08] text-white">🪔 Mehfil-e-Chiraag</option>
            <option value="baarish" className="bg-[#1c0c08] text-white">🌧️ Baarish Ki Khidki</option>
            <option value="mahtaab" className="bg-[#1c0c08] text-white">🌙 Mahtaabi Raat</option>
            <option value="haveli" className="bg-[#1c0c08] text-white">📻 Puraani Haveli</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-amber-400 text-xs">
            ▼
          </span>
        </div>

        {/* 3. Right Action Controls */}
        <nav aria-label="Controls" className="flex items-center gap-1.5 xs:gap-2 shrink-0">
          {/* Ambient Light Tuner */}
          <button
            type="button"
            onClick={onOpenAmbient}
            aria-label="Ambient Lighting Settings"
            className="glass-pill px-2.5 sm:px-3 text-amber-300 hover:text-amber-100"
            title="Adjust Ambient Lighting"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11.5px]">Ambient</span>
          </button>

          {/* Soundscapes Mixer */}
          <button
            type="button"
            onClick={onOpenSoundscapes}
            aria-label="Ambient Soundscapes"
            className="glass-pill px-2.5 sm:px-3 text-amber-300 hover:text-amber-100"
            title="Rain, Crackle, Crickets & Tanpura"
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11.5px]">Ambiance</span>
          </button>

          {/* Eye Care Dimmer */}
          <button
            type="button"
            onClick={onToggleDimmer}
            aria-label="Toggle Night Dimmer"
            className={`glass-pill px-2.5 sm:px-3 ${isDimmed ? 'active text-amber-200' : 'text-amber-300 hover:text-amber-100'}`}
            title={isDimmed ? 'Turn Off Eye Dimmer' : 'Ultra Eye-Care Dimmer for Night'}
          >
            {isDimmed ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Sleep Timer */}
          <button
            type="button"
            onClick={onOpenSleepTimer}
            aria-label="Set Sleep Timer"
            className={`glass-pill px-2.5 sm:px-3 ${sleepMinsRemaining ? 'active text-amber-200' : 'text-amber-300 hover:text-amber-100'}`}
            title="Sleep Timer"
          >
            <Timer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">
              {sleepMinsRemaining ? `${sleepMinsRemaining}m` : 'Timer'}
            </span>
          </button>
        </nav>

      </div>
    </header>
  );
}

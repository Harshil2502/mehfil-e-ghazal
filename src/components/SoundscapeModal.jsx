import React from 'react';
import { X, CloudRain, Flame, Volume2, Music2, Disc } from 'lucide-react';

export default function SoundscapeModal({
  isOpen,
  onClose,
  volumes,
  onVolumeChange,
  onApplyPreset,
  onMuteAll
}) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="app-modal open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="soundscapeTitle"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-card"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <CloudRain className="w-5 h-5 text-sky-400" />
            <h2 id="soundscapeTitle" className="text-white font-bold text-base sm:text-lg font-display">
              Atmospheric Soundscapes
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center text-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-white/70 text-xs mb-5">
          Delicate procedural natural ambiance synthesized directly in real time via Web Audio API.
        </p>

        {/* Channels */}
        <div className="space-y-3.5">
          {/* 1. Rain */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌧️</span>
              <div>
                <div className="text-white text-xs sm:text-sm font-semibold">Baarish (Monsoon Rain)</div>
                <div className="text-white/40 text-[11px]">Gentle rain droplets on glass</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={volumes.rain}
                onChange={(e) => onVolumeChange('rain', parseInt(e.target.value, 10))}
                className="w-20 sm:w-28 accent-amber-400 cursor-pointer"
              />
              <span className="font-mono text-[10px] text-amber-300 w-8 text-right">
                {volumes.rain}%
              </span>
            </div>
          </div>

          {/* 2. Fire/Candle */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🕯️</span>
              <div>
                <div className="text-white text-xs sm:text-sm font-semibold">Chiraag (Candle Crackle)</div>
                <div className="text-white/40 text-[11px]">Warm soothing wood fire embers</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={volumes.fire}
                onChange={(e) => onVolumeChange('fire', parseInt(e.target.value, 10))}
                className="w-20 sm:w-28 accent-amber-400 cursor-pointer"
              />
              <span className="font-mono text-[10px] text-amber-300 w-8 text-right">
                {volumes.fire}%
              </span>
            </div>
          </div>

          {/* 3. Crickets */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🦗</span>
              <div>
                <div className="text-white text-xs sm:text-sm font-semibold">Raat Ki Khamoshi (Crickets)</div>
                <div className="text-white/40 text-[11px]">Peaceful night courtyard breeze</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={volumes.crickets}
                onChange={(e) => onVolumeChange('crickets', parseInt(e.target.value, 10))}
                className="w-20 sm:w-28 accent-amber-400 cursor-pointer"
              />
              <span className="font-mono text-[10px] text-amber-300 w-8 text-right">
                {volumes.crickets}%
              </span>
            </div>
          </div>

          {/* 4. Vinyl Needle Hiss */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📻</span>
              <div>
                <div className="text-white text-xs sm:text-sm font-semibold">Gramophone Needle Hiss</div>
                <div className="text-white/40 text-[11px]">Nostalgic analog turntable warmth</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={volumes.vinyl}
                onChange={(e) => onVolumeChange('vinyl', parseInt(e.target.value, 10))}
                className="w-20 sm:w-28 accent-amber-400 cursor-pointer"
              />
              <span className="font-mono text-[10px] text-amber-300 w-8 text-right">
                {volumes.vinyl}%
              </span>
            </div>
          </div>

          {/* 5. Tanpura Drone */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🪕</span>
              <div>
                <div className="text-white text-xs sm:text-sm font-semibold">Tanpura Drone (Sa-Pa)</div>
                <div className="text-white/40 text-[11px]">Classical Indian meditative resonance</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="100"
                value={volumes.tanpura}
                onChange={(e) => onVolumeChange('tanpura', parseInt(e.target.value, 10))}
                className="w-20 sm:w-28 accent-amber-400 cursor-pointer"
              />
              <span className="font-mono text-[10px] text-amber-300 w-8 text-right">
                {volumes.tanpura}%
              </span>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center justify-between gap-2 mt-5 pt-3 border-t border-white/10 text-xs">
          <button
            type="button"
            onClick={() => onApplyPreset('rain')}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 transition-colors"
          >
            🌧️ Monsoon Mood
          </button>
          <button
            type="button"
            onClick={() => onApplyPreset('night')}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 transition-colors"
          >
            🕯️ Midnight Candle
          </button>
          <button
            type="button"
            onClick={onMuteAll}
            className="px-3 py-1.5 rounded-xl bg-red-950/40 text-red-300 hover:bg-red-900/50 transition-colors"
          >
            Mute All
          </button>
        </div>

      </div>
    </div>
  );
}

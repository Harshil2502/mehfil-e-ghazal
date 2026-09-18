import React from 'react';
import { X, Lightbulb } from 'lucide-react';

export default function AmbientLightingModal({
  isOpen,
  onClose,
  colorPreset,
  onColorChange,
  intensity,
  onIntensityChange,
  isCandleBreathe,
  onToggleCandleBreathe,
  isParticlesEnabled,
  onToggleParticles
}) {
  if (!isOpen) return null;

  const presets = [
    { id: 'amber', name: 'Chiraag (Amber)', bg: 'bg-amber-500', shadow: 'shadow-[0_0_12px_#f59e0b]' },
    { id: 'rose', name: 'Gulab (Rose)', bg: 'bg-rose-500', shadow: 'shadow-[0_0_12px_#f43f5e]' },
    { id: 'moon', name: 'Mahtaab (Moon)', bg: 'bg-sky-400', shadow: 'shadow-[0_0_12px_#38bdf8]' },
    { id: 'emerald', name: 'Zamarrud (Sage)', bg: 'bg-emerald-500', shadow: 'shadow-[0_0_12px_#10b981]' }
  ];

  return (
    <div
      onClick={onClose}
      className="app-modal open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ambientTitle"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-card"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h2 id="ambientTitle" className="text-white font-bold text-base sm:text-lg font-display">
              Ambient Lighting Tuner
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

        <p className="text-white/70 text-xs mb-4">
          Calibrated with non-glare, eye-soothing illumination so you can listen all night without eye fatigue.
        </p>

        {/* Glow Color Presets */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-amber-300 mb-2">
            Ambient Aura Tone:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onColorChange(preset.id)}
                className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                  colorPreset === preset.id
                    ? 'border-amber-500/80 bg-amber-500/20 shadow-[0_0_16px_rgba(245,158,11,0.2)]'
                    : 'border-white/15 bg-white/5 hover:border-white/30'
                }`}
              >
                <span className={`w-5 h-5 rounded-full ${preset.bg} ${preset.shadow}`} />
                <span className="text-[11px] font-semibold text-white mt-1">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Intensity Slider */}
        <div className="mb-5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-white font-semibold">Ambient Glow Intensity</span>
            <span className="font-mono text-amber-300">{intensity}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="150"
            value={intensity}
            onChange={(e) => onIntensityChange(parseInt(e.target.value, 10))}
            className="w-full accent-amber-400 cursor-pointer"
          />
        </div>

        {/* Toggles */}
        <div className="space-y-3">
          {/* Organic Candle Breathe */}
          <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
            <div>
              <div className="text-white text-xs font-semibold">Candlelight Breathing Pulse</div>
              <div className="text-white/40 text-[10.5px]">Gentle, organic illumination rhythm (6 breaths/min)</div>
            </div>
            <input
              type="checkbox"
              checked={isCandleBreathe}
              onChange={(e) => onToggleCandleBreathe(e.target.checked)}
              className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
            />
          </label>

          {/* Floating Fireflies */}
          <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
            <div>
              <div className="text-white text-xs font-semibold">Floating Dust & Fireflies</div>
              <div className="text-white/40 text-[10.5px]">Warm golden embers drifting peacefully</div>
            </div>
            <input
              type="checkbox"
              checked={isParticlesEnabled}
              onChange={(e) => onToggleParticles(e.target.checked)}
              className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
            />
          </label>
        </div>

      </div>
    </div>
  );
}

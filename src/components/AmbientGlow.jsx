import React from 'react';

export default function AmbientGlow({
  colorPreset,
  intensity,
  isCandleBreathe,
  isDimmed
}) {
  const presets = {
    amber: {
      c1: 'rgba(245, 158, 11, 0.22)',
      c2: 'rgba(217, 119, 6, 0.1)',
      glow: '#f59e0b'
    },
    rose: {
      c1: 'rgba(244, 63, 94, 0.22)',
      c2: 'rgba(190, 18, 60, 0.1)',
      glow: '#f43f5e'
    },
    moon: {
      c1: 'rgba(56, 189, 248, 0.22)',
      c2: 'rgba(14, 165, 233, 0.1)',
      glow: '#38bdf8'
    },
    emerald: {
      c1: 'rgba(16, 185, 129, 0.22)',
      c2: 'rgba(5, 150, 105, 0.1)',
      glow: '#10b981'
    }
  };

  const current = presets[colorPreset] || presets.amber;
  const netIntensity = (intensity / 100) * (isDimmed ? 0.45 : 1);

  return (
    <>
      {/* Ambient Radial Halo Diffuser */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          opacity: netIntensity,
          transition: 'opacity 0.8s ease, background 1s ease',
          background: `radial-gradient(circle at 50% 65%, ${current.c1} 0%, ${current.c2} 42%, transparent 76%)`
        }}
        className={isCandleBreathe ? 'animate-candle-breathe' : ''}
      />

      {/* Optional Dimmer Overlay for Pitch-Dark Rooms */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(8, 4, 3, 0.45)',
          pointerEvents: 'none',
          zIndex: 25,
          opacity: isDimmed ? 1 : 0,
          transition: 'opacity 0.5s ease'
        }}
      />
    </>
  );
}

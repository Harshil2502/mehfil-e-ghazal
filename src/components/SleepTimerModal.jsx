import React from 'react';
import { X, Timer } from 'lucide-react';

export default function SleepTimerModal({
  isOpen,
  onClose,
  onSetTimer,
  onCancelTimer,
  activeMinutes
}) {
  if (!isOpen) return null;

  const options = [15, 30, 45, 60];

  return (
    <div
      onClick={onClose}
      className="app-modal open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sleepTitle"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-card max-w-sm text-center"
      >
        <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto mb-3 text-2xl text-amber-400">
          <Timer className="w-6 h-6" />
        </div>
        <h2 id="sleepTitle" className="text-white font-bold text-lg mb-1">
          Sukoon Sleep Timer
        </h2>
        <p className="text-white/60 text-xs mb-5">
          The player will gently fade out when the timer ends, letting you drift to sleep peacefully.
        </p>

        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {options.map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => {
                onSetTimer(mins);
                onClose();
              }}
              className={`p-3 rounded-xl text-xs font-semibold transition-all ${
                activeMinutes === mins
                  ? 'bg-amber-500 text-black shadow-lg'
                  : 'bg-white/10 hover:bg-amber-500/30 text-white'
              }`}
            >
              {mins} Minutes
            </button>
          ))}
        </div>

        {activeMinutes && (
          <button
            type="button"
            onClick={() => {
              onCancelTimer();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs transition-colors"
          >
            Turn Off Timer
          </button>
        )}
      </div>
    </div>
  );
}

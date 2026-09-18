import React from 'react';
import { X, BookOpen } from 'lucide-react';

export default function LyricsModal({ isOpen, onClose, track }) {
  if (!isOpen || !track) return null;

  return (
    <div
      onClick={onClose}
      className="app-modal open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lyricsTitle"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-card"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <h2 id="lyricsTitle" className="text-white font-bold text-base sm:text-lg">
                {track.title}
              </h2>
              <p className="text-amber-300 text-xs font-mono">
                {track.artist} • Poet: {track.poet}
              </p>
            </div>
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

        {/* Content */}
        <div className="space-y-4 text-center max-h-[58vh] overflow-y-auto px-2">
          {/* Raag Badge */}
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
            Raag: {track.raag} • Mood: {track.mood}
          </div>

          {/* Full Lyrics Body */}
          <div className="font-poetic text-base sm:text-lg text-amber-100/90 leading-relaxed whitespace-pre-line py-2">
            {track.lyrics}
          </div>

          {/* Context & Meaning */}
          <div className="pt-4 border-t border-white/10 text-left">
            <h3 className="text-amber-400 font-semibold text-xs tracking-wider uppercase mb-1">
              Poetic Context & Meaning:
            </h3>
            <p className="text-white/70 text-xs leading-relaxed font-light">
              {track.meaning}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

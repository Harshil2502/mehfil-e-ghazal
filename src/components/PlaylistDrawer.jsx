import React, { useState } from 'react';
import { Search, X, Play, Music } from 'lucide-react';

export default function PlaylistDrawer({
  isOpen,
  onClose,
  playlist,
  currentIndex,
  onSelectTrack
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Sabhi (All)' },
    { id: 'jagjit', label: 'Jagjit Singh' },
    { id: 'mehdi', label: 'Mehdi Hassan' },
    { id: 'ghulam', label: 'Ghulam Ali' },
    { id: 'farida', label: 'Farida & Begum' },
    { id: 'sufi', label: 'Sufiana' }
  ];

  const filtered = playlist.filter((track) => {
    const matchCategory = (activeCategory === 'all' || track.category === activeCategory);
    const query = searchTerm.toLowerCase().trim();
    const matchSearch =
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.poet.toLowerCase().includes(query) ||
      track.raag.toLowerCase().includes(query) ||
      track.mood.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });

  return (
    <div
      onClick={onClose}
      className="app-modal open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="playlistTitle"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-card"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-amber-400" />
            <h2 id="playlistTitle" className="text-white font-bold text-base sm:text-lg font-display">
              Ghazal Fihrist
            </h2>
            <span className="text-white/40 text-xs font-mono">({playlist.length} tracks)</span>
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

        {/* Search & Category Filter Buttons */}
        <div className="space-y-3 mb-4">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ghazal title, singer, shayar, or raag..."
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400/80 transition-colors"
            />
            <Search className="w-3.5 h-3.5 absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tracks List */}
        <div className="space-y-1.5 max-h-[52vh] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-white/40 text-xs">
              No ghazals found matching "{searchTerm}"
            </div>
          ) : (
            filtered.map((track) => {
              const originalIndex = playlist.findIndex((t) => t.id === track.id);
              const isCurrent = (originalIndex === currentIndex);

              return (
                <div
                  key={track.id}
                  onClick={() => {
                    onSelectTrack(originalIndex);
                    onClose();
                  }}
                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all hover:border-amber-400/60 ${
                    isCurrent
                      ? 'bg-amber-500/20 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <div className="text-white text-xs sm:text-sm font-semibold truncate flex items-center gap-1.5">
                        <span>{track.title}</span>
                        <span className="text-[11.5px] text-amber-300/80 font-urdu">{track.titleUrdu}</span>
                      </div>
                      <div className="text-[11px] text-white/60 truncate">
                        {track.artist} <span className="text-amber-400/70">• {track.poet}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] text-white/50">
                    <span>{track.duration}</span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isCurrent ? 'bg-amber-500 text-black' : 'bg-amber-500/20 text-amber-300'}`}>
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}

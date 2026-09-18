import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Volume2, VolumeX } from 'lucide-react';

export default function PlayerDock({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  isShuffle,
  onToggleShuffle,
  currentTime,
  duration,
  onSeek,
  volume,
  onVolumeChange
}) {
  const [showVolumePopover, setShowVolumePopover] = useState(false);
  const progressBarRef = useRef(null);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e) => {
    if (!progressBarRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(pct * duration);
  };

  // Close volume popover on outside click
  useEffect(() => {
    const handleOutside = () => setShowVolumePopover(false);
    if (showVolumePopover) {
      window.addEventListener('click', handleOutside);
    }
    return () => window.removeEventListener('click', handleOutside);
  }, [showVolumePopover]);

  return (
    <div className="fixed bottom-3 sm:bottom-6 left-0 right-0 z-50 px-3 sm:px-6 flex flex-col items-center pointer-events-none">
      <section className="music-player pointer-events-auto" aria-label="Ghazal Music Player">

        {/* 1. Vintage Spinning Vinyl Disc */}
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label="Toggle playback from vinyl disc"
          title="Click to play / pause"
          className="vinyl-frame group"
        >
          <div className={`vinyl-grooves ${isPlaying ? 'vinyl-spin' : ''}`}>
            <div
              className="vinyl-center-art"
              style={{
                backgroundImage: `url('${currentTrack?.cover || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=120&q=80"}')`
              }}
            >
              <span className="vinyl-hole" />
            </div>
          </div>
        </button>

        {/* 2. Track Information & Progress Bar */}
        <div className="flex-1 min-w-0 flex flex-col gap-1">

          {/* Title, Artist & Equalizer */}
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-white font-bold text-xs sm:text-sm truncate flex items-center gap-1.5">
                <span>{currentTrack?.title || 'Woh Kagaz Ki Kashti'}</span>
                <span className="text-amber-300/80 font-urdu text-[11.5px] hidden xs:inline">
                  {currentTrack?.titleUrdu}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10.5px] text-amber-200/70 truncate">
                <span className="font-medium text-amber-300/90">{currentTrack?.artist || 'Jagjit Singh'}</span>
                <span className="text-white/30">•</span>
                <span className="truncate">Poet: {currentTrack?.poet || 'Sudarshan Faakir'}</span>
              </div>
            </div>

            {/* Equalizer Visualizer Bars */}
            <div className={`flex items-end gap-0.5 h-5 shrink-0 px-1 ${isPlaying ? 'playing' : ''}`} title="Ghazal audio active">
              <span className="eq-bar" />
              <span className="eq-bar" />
              <span className="eq-bar" />
              <span className="eq-bar" />
            </div>
          </div>

          {/* Seekbar */}
          <div className="flex items-center gap-2 font-mono text-[10px] text-white/50 select-none mt-0.5">
            <span>{formatTime(currentTime)}</span>
            <div
              ref={progressBarRef}
              onClick={handleProgressClick}
              className="progress-track"
              role="slider"
              aria-label="Seek track"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={Math.round(progressPercent)}
              tabIndex="0"
            >
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span>{formatTime(duration) !== '0:00' ? formatTime(duration) : (currentTrack?.duration || '4:05')}</span>
          </div>

        </div>

        {/* 3. Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

          {/* Previous Track */}
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous track"
            title="Previous Track"
            className="icon-btn"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          {/* Play / Pause with glowing golden button */}
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Pause ghazal" : "Play ghazal"}
            title={isPlaying ? "Pause" : "Play"}
            className="play-btn"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Next Track */}
          <button
            type="button"
            onClick={onNext}
            aria-label="Next track"
            title="Next Track"
            className="icon-btn"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Shuffle Toggle */}
          <button
            type="button"
            onClick={onToggleShuffle}
            aria-label="Toggle shuffle"
            title="Shuffle"
            className={`icon-btn hidden xs:flex ${isShuffle ? 'active text-amber-300' : ''}`}
          >
            <Shuffle className="w-3 h-3" />
          </button>

          {/* Volume Button & Popover */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowVolumePopover(!showVolumePopover);
              }}
              aria-label="Adjust volume"
              title="Volume"
              className="icon-btn"
            >
              {volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Popover Slider */}
            {showVolumePopover && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-full right-0 mb-3 p-3 rounded-2xl bg-[#1c0c08] border border-amber-500/40 shadow-2xl z-50 flex items-center gap-2.5 backdrop-blur-xl"
              >
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => onVolumeChange(parseInt(e.target.value, 10))}
                  aria-label="Volume level"
                  className="w-24 accent-amber-400 cursor-pointer"
                />
                <span className="font-mono text-[10px] text-amber-200 w-7 text-right">
                  {volume}%
                </span>
              </div>
            )}
          </div>

        </div>

      </section>
    </div>
  );
}

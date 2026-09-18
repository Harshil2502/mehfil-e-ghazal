import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import BackgroundScenes from './components/BackgroundScenes';
import AmbientGlow from './components/AmbientGlow';
import RainCanvas from './components/RainCanvas';
import ParticleCanvas from './components/ParticleCanvas';
import HeroCenter from './components/HeroCenter';
import PlayerDock from './components/PlayerDock';
import PlaylistDrawer from './components/PlaylistDrawer';
import LyricsModal from './components/LyricsModal';
import SoundscapeModal from './components/SoundscapeModal';
import AmbientLightingModal from './components/AmbientLightingModal';
import SleepTimerModal from './components/SleepTimerModal';

import { GHAZAL_PLAYLIST } from './data/ghazals';
import { soundscapes } from './services/soundscapes';
import { ytManager } from './services/youtubePlayer';

export default function App() {
  // 1. Atmosphere & Visual States
  const [activeScene, setActiveScene] = useState('chiraag');
  const [ambientColor, setAmbientColor] = useState('amber');
  const [ambientIntensity, setAmbientIntensity] = useState(100);
  const [isCandleBreathe, setIsCandleBreathe] = useState(true);
  const [isDimmed, setIsDimmed] = useState(false);
  const [isParticlesEnabled, setIsParticlesEnabled] = useState(true);
  const [isRainActive, setIsRainActive] = useState(false);

  // 2. Player States
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isShuffle, setIsShuffle] = useState(false);

  // Refs to avoid stale closures in event listeners
  const trackIndexRef = useRef(0);
  const isShuffleRef = useRef(false);
  const isPlayingRef = useRef(false);
  const handleNextRef = useRef(null);
  const handlePrevRef = useRef(null);

  useEffect(() => {
    trackIndexRef.current = currentTrackIndex;
  }, [currentTrackIndex]);

  useEffect(() => {
    isShuffleRef.current = isShuffle;
  }, [isShuffle]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // 3. Soundscape Volumes State
  const [soundscapeVolumes, setSoundscapeVolumes] = useState({
    rain: 0,
    fire: 0,
    crickets: 0,
    vinyl: 0,
    tanpura: 0
  });

  // 4. Sleep Timer State
  const [sleepMinsRemaining, setSleepMinsRemaining] = useState(null);
  const sleepTimerRef = useRef(null);

  // 5. Modals State
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [isSoundscapesOpen, setIsSoundscapesOpen] = useState(false);
  const [isAmbientOpen, setIsAmbientOpen] = useState(false);
  const [isSleepTimerOpen, setIsSleepTimerOpen] = useState(false);

  // 6. Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', icon: '✨' });

  const showToast = (message, icon = '✨') => {
    setToast({ show: true, message, icon });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2800);
  };

  const parseDurationToSeconds = (durStr) => {
    if (!durStr || typeof durStr !== 'string') return 240;
    const parts = durStr.split(':').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return parts[0] * 60 + parts[1];
    }
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 240;
  };

  const currentTrack = GHAZAL_PLAYLIST[currentTrackIndex];

  // Playback Control Handlers
  const handleTogglePlay = () => {
    soundscapes.getContext(); // User gesture unlocks audio context
    if (isPlaying) {
      ytManager.pause();
      setIsPlaying(false);
    } else {
      ytManager.play();
      setIsPlaying(true);
    }
  };

  const handlePlayTrack = (index) => {
    soundscapes.getContext();
    if (index < 0) index = GHAZAL_PLAYLIST.length - 1;
    if (index >= GHAZAL_PLAYLIST.length) index = 0;

    trackIndexRef.current = index;
    setCurrentTrackIndex(index);

    const track = GHAZAL_PLAYLIST[index];
    const initialDur = parseDurationToSeconds(track.duration);
    setCurrentTime(0);
    setDuration(initialDur);
    ytManager.setSimulatedTime(0, initialDur);
    setIsPlaying(true);

    ytManager.loadVideo(track.youtubeId);
    showToast(`Now Playing: ${track.title}`, '🎵');
  };

  const handleNext = () => {
    if (isShuffleRef.current) {
      let nextIndex = Math.floor(Math.random() * GHAZAL_PLAYLIST.length);
      if (nextIndex === trackIndexRef.current && GHAZAL_PLAYLIST.length > 1) {
        nextIndex = (nextIndex + 1) % GHAZAL_PLAYLIST.length;
      }
      handlePlayTrack(nextIndex);
    } else {
      const nextIndex = (trackIndexRef.current + 1) % GHAZAL_PLAYLIST.length;
      handlePlayTrack(nextIndex);
    }
  };

  const handlePrev = () => {
    if (currentTime > 3) {
      handleSeek(0);
      showToast('Replaying track', '⏮️');
      return;
    }
    const prevIndex = (trackIndexRef.current - 1 + GHAZAL_PLAYLIST.length) % GHAZAL_PLAYLIST.length;
    handlePlayTrack(prevIndex);
  };

  // Keep refs updated
  handleNextRef.current = handleNext;
  handlePrevRef.current = handlePrev;

  const handleSeek = (seconds) => {
    setCurrentTime(seconds);
    ytManager.seekTo(seconds);
  };

  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    ytManager.setVolume(newVol);
  };

  const errorCountRef = useRef(0);

  // Initialize YouTube API & player bridge
  useEffect(() => {
    const firstTrack = GHAZAL_PLAYLIST[0];
    if (firstTrack) {
      setDuration(parseDurationToSeconds(firstTrack.duration));
    }

    ytManager.init('youtubeBridge', GHAZAL_PLAYLIST[0].youtubeId, {
      onReady: () => {
        // Player ready
      },
      onStateChange: (event) => {
        if (window.YT && event.data === window.YT.PlayerState.PLAYING) {
          errorCountRef.current = 0;
          setIsPlaying(true);
        } else if (window.YT && event.data === window.YT.PlayerState.PAUSED) {
          setIsPlaying(false);
        } else if (window.YT && event.data === window.YT.PlayerState.ENDED) {
          if (handleNextRef.current) handleNextRef.current();
        }
      },
      onError: (e) => {
        console.warn('YouTube playback error:', e);
        errorCountRef.current += 1;
        if (errorCountRef.current <= 2) {
          showToast('Skipping unavailable track...', '⚠️');
          setTimeout(() => {
            if (handleNextRef.current) handleNextRef.current();
          }, 1200);
        } else {
          setIsPlaying(false);
          showToast('Audio paused. Please choose another track.', '⚠️');
          errorCountRef.current = 0;
        }
      }
    });
  }, []);

  // Poll progress while playing
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        const cur = ytManager.getCurrentTime();
        const dur = ytManager.getDuration() || parseDurationToSeconds(currentTrack?.duration);

        if (typeof cur === 'number' && !isNaN(cur) && cur > 0) {
          setCurrentTime(cur);
        } else {
          // Smoothly advance time bar so it never freezes
          setCurrentTime((prev) => {
            const next = prev + 0.35;
            ytManager.setSimulatedTime(next, dur);
            if (dur > 0 && next >= dur) {
              if (handleNextRef.current) handleNextRef.current();
              return 0;
            }
            return next;
          });
        }

        if (typeof dur === 'number' && !isNaN(dur) && dur > 0) {
          setDuration(dur);
        }
      }, 350);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTrackIndex, currentTrack]);

  // MediaSession API Integration for Lock Screen Controls
  useEffect(() => {
    if ('mediaSession' in navigator && currentTrack) {
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: currentTrack.title,
          artist: `${currentTrack.artist} (Poet: ${currentTrack.poet})`,
          album: 'Mehfil-e-Ghazal',
          artwork: [
            { src: currentTrack.cover, sizes: '512x512', type: 'image/jpeg' }
          ]
        });

        navigator.mediaSession.setActionHandler('play', () => handleTogglePlay());
        navigator.mediaSession.setActionHandler('pause', () => handleTogglePlay());
        navigator.mediaSession.setActionHandler('previoustrack', () => handlePrevRef.current?.());
        navigator.mediaSession.setActionHandler('nexttrack', () => handleNextRef.current?.());
      } catch (e) {}
    }
  }, [currentTrack]);

  // Keyboard Shortcuts (Space: Play/Pause, Arrows: Next/Prev)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === 'ArrowRight' && !e.shiftKey) {
        e.preventDefault();
        handleNextRef.current?.();
      } else if (e.code === 'ArrowLeft' && !e.shiftKey) {
        e.preventDefault();
        handlePrevRef.current?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // Baarish Quick Toggle
  const handleToggleRain = () => {
    const nextState = !isRainActive;
    setIsRainActive(nextState);

    const rainVol = nextState ? 35 : 0;
    setSoundscapeVolumes((prev) => ({ ...prev, rain: rainVol }));
    soundscapes.setVolume('rain', rainVol);

    if (nextState) {
      showToast('Baarish started. Soothing rainfall active.', '🌧️');
    } else {
      showToast('Baarish stopped.');
    }
  };

  // Soundscape volume adjustment
  const handleSoundscapeVolumeChange = (type, val) => {
    setSoundscapeVolumes((prev) => ({ ...prev, [type]: val }));
    soundscapes.setVolume(type, val);
    if (type === 'rain') {
      setIsRainActive(val > 0);
    }
  };

  const handleApplySoundscapePreset = (preset) => {
    if (preset === 'rain') {
      setIsRainActive(true);
      const newVols = { rain: 40, fire: 20, crickets: 0, vinyl: 15, tanpura: 0 };
      setSoundscapeVolumes(newVols);
      Object.entries(newVols).forEach(([k, v]) => soundscapes.setVolume(k, v));
      showToast('Preset: Monsoon Mood activated', '🌧️');
    } else if (preset === 'night') {
      setIsRainActive(false);
      const newVols = { rain: 0, fire: 30, crickets: 25, vinyl: 10, tanpura: 20 };
      setSoundscapeVolumes(newVols);
      Object.entries(newVols).forEach(([k, v]) => soundscapes.setVolume(k, v));
      showToast('Preset: Midnight Candle activated', '🕯️');
    }
  };

  const handleMuteAllSoundscapes = () => {
    setIsRainActive(false);
    const zeroVols = { rain: 0, fire: 0, crickets: 0, vinyl: 0, tanpura: 0 };
    setSoundscapeVolumes(zeroVols);
    soundscapes.muteAll();
    showToast('All soundscapes muted');
  };

  // Sleep Timer Handlers
  const handleSetSleepTimer = (minutes) => {
    if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
    setSleepMinsRemaining(minutes);
    showToast(`Sleep timer set for ${minutes} minutes`, '⏱️');

    sleepTimerRef.current = setTimeout(() => {
      let currentVol = volume;
      const fadeInterval = setInterval(() => {
        currentVol -= 10;
        if (currentVol <= 0) {
          clearInterval(fadeInterval);
          ytManager.pause();
          setIsPlaying(false);
          soundscapes.muteAll();
          showToast('Sleep timer reached: Mehfil paused. Shubh Raatri 🌙');
        } else {
          ytManager.setVolume(currentVol);
        }
      }, 400);
      setSleepMinsRemaining(null);
    }, minutes * 60 * 1000);
  };

  const handleCancelSleepTimer = () => {
    if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
    sleepTimerRef.current = null;
    setSleepMinsRemaining(null);
    showToast('Sleep timer turned off');
  };

  return (
    <div className="min-h-screen text-white relative selection:bg-amber-500/30 selection:text-amber-100">

      {/* Toast Notification */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[#2a140f]/95 border border-amber-500/50 text-amber-200 text-xs font-semibold shadow-2xl flex items-center gap-2 backdrop-blur-md z-[100] transition-all duration-300 pointer-events-none ${
          toast.show ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
        }`}
      >
        <span>{toast.icon}</span>
        <span>{toast.message}</span>
      </div>

      {/* Ambient Lighting Diffuser (Zero Eye Strain) */}
      <AmbientGlow
        colorPreset={ambientColor}
        intensity={ambientIntensity}
        isCandleBreathe={isCandleBreathe}
        isDimmed={isDimmed}
      />

      {/* Atmospheric Background Scenes */}
      <BackgroundScenes activeScene={activeScene} />

      {/* Realistic Monsoon Rain Overlay */}
      <RainCanvas isActive={isRainActive} />

      {/* Floating Fireflies & Dust Particles */}
      <ParticleCanvas isEnabled={isParticlesEnabled} />

      {/* Top Header (Glassmorphism Equal Height Pills) */}
      <Header
        activeScene={activeScene}
        onSceneChange={setActiveScene}
        onOpenAmbient={() => setIsAmbientOpen(true)}
        onOpenSoundscapes={() => setIsSoundscapesOpen(true)}
        onOpenSleepTimer={() => setIsSleepTimerOpen(true)}
        isDimmed={isDimmed}
        onToggleDimmer={() => setIsDimmed(!isDimmed)}
        sleepMinsRemaining={sleepMinsRemaining}
      />

      {/* Main Center Stage: Calligraphy, Sher-e-Khaas, Quick Action Strip */}
      <HeroCenter
        onToggleRain={handleToggleRain}
        isRainActive={isRainActive}
        onOpenPlaylist={() => setIsPlaylistOpen(true)}
        onOpenLyrics={() => setIsLyricsOpen(true)}
        playlistCount={GHAZAL_PLAYLIST.length}
        onShowToast={showToast}
        currentTrack={currentTrack}
      />

      {/* Floating Deluxe Vintage Ghazal Player (Bottom Dock) */}
      <PlayerDock
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
        isShuffle={isShuffle}
        onToggleShuffle={() => setIsShuffle(!isShuffle)}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        volume={volume}
        onVolumeChange={handleVolumeChange}
      />

      {/* Modals & Drawers */}
      <PlaylistDrawer
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
        playlist={GHAZAL_PLAYLIST}
        currentIndex={currentTrackIndex}
        isPlaying={isPlaying}
        onSelectTrack={handlePlayTrack}
        onTogglePlay={handleTogglePlay}
      />

      <LyricsModal
        isOpen={isLyricsOpen}
        onClose={() => setIsLyricsOpen(false)}
        track={currentTrack}
      />

      <SoundscapeModal
        isOpen={isSoundscapesOpen}
        onClose={() => setIsSoundscapesOpen(false)}
        volumes={soundscapeVolumes}
        onVolumeChange={handleSoundscapeVolumeChange}
        onApplyPreset={handleApplySoundscapePreset}
        onMuteAll={handleMuteAllSoundscapes}
      />

      <AmbientLightingModal
        isOpen={isAmbientOpen}
        onClose={() => setIsAmbientOpen(false)}
        colorPreset={ambientColor}
        onColorChange={setAmbientColor}
        intensity={ambientIntensity}
        onIntensityChange={setAmbientIntensity}
        isCandleBreathe={isCandleBreathe}
        onToggleCandleBreathe={setIsCandleBreathe}
        isParticlesEnabled={isParticlesEnabled}
        onToggleParticles={setIsParticlesEnabled}
      />

      <SleepTimerModal
        isOpen={isSleepTimerOpen}
        onClose={() => setIsSleepTimerOpen(false)}
        onSetTimer={handleSetSleepTimer}
        onCancelTimer={handleCancelSleepTimer}
        activeMinutes={sleepMinsRemaining}
      />

    </div>
  );
}

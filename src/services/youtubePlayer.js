class YouTubePlayerManager {
  constructor() {
    this.player = null;
    this.isReady = false;
    this.isInitializing = false;
    this.currentVideoId = null;
    this.pendingVideoId = null;
    this.pendingPlay = false;
    this.volume = 100;
    this.simulatedTime = 0;
    this.simulatedDuration = 245;
    this.callbacks = {
      onReady: null,
      onStateChange: null,
      onError: null
    };
  }

  init(containerId = 'youtubeBridge', videoId, callbacks = {}) {
    this.callbacks = { ...this.callbacks, ...callbacks };
    this.currentVideoId = videoId;

    // If player instance already exists or is creating, keep it intact
    if (this.player || this.isInitializing) {
      if (this.isReady && videoId && videoId !== this.currentVideoId) {
        this.loadVideo(videoId);
      }
      return;
    }

    this.isInitializing = true;

    const createInstance = () => {
      let target = document.getElementById(containerId);
      if (!target) {
        const container = document.getElementById('youtubeBridgeContainer');
        if (container) {
          container.innerHTML = `<div id="${containerId}"></div>`;
          target = document.getElementById(containerId);
        }
      }

      if (!target) {
        this.isInitializing = false;
        return;
      }

      if (this.player) {
        this.isInitializing = false;
        return;
      }

      if (window.YT && window.YT.Player) {
        try {
          const playerVars = {
            autoplay: 0,
            controls: 0,
            enablejsapi: 1,
            playsinline: 1,
            rel: 0,
            modestbranding: 1
          };

          if (window.location && window.location.protocol.startsWith('http')) {
            playerVars.origin = window.location.origin;
          }

          this.player = new window.YT.Player(containerId, {
            height: '200',
            width: '200',
            videoId: this.pendingVideoId || this.currentVideoId || videoId,
            playerVars,
            events: {
              onReady: (e) => {
                this.isReady = true;
                this.isInitializing = false;

                try {
                  e.target.setVolume(this.volume);
                } catch (err) {}

                if (this.pendingVideoId) {
                  const targetVid = this.pendingVideoId;
                  this.pendingVideoId = null;
                  this.loadVideo(targetVid);
                } else if (this.pendingPlay) {
                  this.pendingPlay = false;
                  this.play();
                }

                if (this.callbacks.onReady) this.callbacks.onReady(e);
              },
              onStateChange: (e) => {
                if (this.callbacks.onStateChange) this.callbacks.onStateChange(e);
              },
              onError: (e) => {
                console.warn('YouTube playback error:', e && e.data);
                if (this.callbacks.onError) this.callbacks.onError(e);
              }
            }
          });
        } catch (e) {
          console.warn('YT Player initialization exception:', e);
          this.isInitializing = false;
        }
      }
    };

    if (window.YT && typeof window.YT.ready === 'function') {
      window.YT.ready(createInstance);
    } else if (window.YT && window.YT.Player) {
      createInstance();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === 'function') prev();
        createInstance();
      };

      let attempts = 0;
      const poll = setInterval(() => {
        attempts++;
        if (window.YT && window.YT.Player) {
          clearInterval(poll);
          if (!this.player) createInstance();
        } else if (attempts > 60) {
          clearInterval(poll);
          this.isInitializing = false;
        }
      }, 100);
    }
  }

  loadVideo(videoId) {
    this.currentVideoId = videoId;
    this.simulatedTime = 0;

    if (!this.player || !this.isReady) {
      this.pendingVideoId = videoId;
      this.pendingPlay = true;
      return;
    }

    try {
      if (typeof this.player.loadVideoById === 'function') {
        this.player.loadVideoById(videoId, 0);
      } else if (typeof this.player.cueVideoById === 'function') {
        this.player.cueVideoById(videoId, 0);
        this.player.playVideo();
      }
    } catch (e) {
      try {
        this.player.loadVideoById({ videoId: videoId, startSeconds: 0 });
      } catch (err) {}
    }

    try {
      if (typeof this.player.playVideo === 'function') {
        this.player.playVideo();
      }
    } catch (e) {}
  }

  play() {
    this.pendingPlay = true;

    if (this.player && this.isReady) {
      try {
        const state = (typeof this.player.getPlayerState === 'function') ? this.player.getPlayerState() : -1;

        // If unstarted (-1) or cued (5), force stream loading with loadVideoById
        if ((state === -1 || state === 5) && this.currentVideoId) {
          this.player.loadVideoById(this.currentVideoId, this.simulatedTime || 0);
        }

        if (typeof this.player.playVideo === 'function') {
          this.player.playVideo();
        }
      } catch (e) {
        console.warn('Play error:', e);
      }
    }
  }

  pause() {
    this.pendingPlay = false;
    if (this.player && this.isReady && typeof this.player.pauseVideo === 'function') {
      try {
        this.player.pauseVideo();
      } catch (e) {
        console.warn('Pause error:', e);
      }
    }
  }

  seekTo(seconds) {
    this.simulatedTime = seconds;
    if (this.player && this.isReady && typeof this.player.seekTo === 'function') {
      try {
        this.player.seekTo(seconds, true);
      } catch (e) {}
    }
  }

  setVolume(volume) {
    this.volume = volume;
    if (this.player && this.isReady && typeof this.player.setVolume === 'function') {
      try {
        this.player.setVolume(volume);
      } catch (e) {}
    }
  }

  getCurrentTime() {
    if (this.player && this.isReady && typeof this.player.getCurrentTime === 'function') {
      try {
        const time = this.player.getCurrentTime();
        if (typeof time === 'number' && !isNaN(time) && time >= 0) {
          this.simulatedTime = time;
          return time;
        }
      } catch (e) {}
    }
    return this.simulatedTime || 0;
  }

  getDuration() {
    if (this.player && this.isReady && typeof this.player.getDuration === 'function') {
      try {
        const dur = this.player.getDuration();
        if (typeof dur === 'number' && !isNaN(dur) && dur > 0) {
          this.simulatedDuration = dur;
          return dur;
        }
      } catch (e) {}
    }
    return this.simulatedDuration || 0;
  }

  setSimulatedTime(time, dur = 245) {
    this.simulatedTime = time;
    if (dur > 0) this.simulatedDuration = dur;
  }
}

export const ytManager = new YouTubePlayerManager();

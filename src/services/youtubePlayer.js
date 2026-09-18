class YouTubePlayerManager {
  constructor() {
    this.player = null;
    this.isReady = false;
    this.currentVideoId = null;
    this.simulatedTime = 0;
    this.simulatedDuration = 245;
    this.callbacks = {
      onReady: null,
      onStateChange: null,
      onError: null
    };
  }

  init(containerId, videoId, callbacks = {}) {
    this.callbacks = { ...this.callbacks, ...callbacks };
    this.currentVideoId = videoId;

    const createInstance = () => {
      const container = document.getElementById(containerId);
      if (!container) return;

      if (window.YT && window.YT.Player) {
        try {
          if (this.player && typeof this.player.destroy === 'function') {
            try { this.player.destroy(); } catch (err) {}
          }

          this.player = new window.YT.Player(containerId, {
            height: '200',
            width: '200',
            videoId: this.currentVideoId || videoId,
            playerVars: {
              autoplay: 0,
              controls: 0,
              enablejsapi: 1,
              playsinline: 1,
              rel: 0,
              origin: window.location.origin
            },
            events: {
              onReady: (e) => {
                this.isReady = true;
                try { e.target.setVolume(100); } catch (err) {}
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
        }
      }
    };

    // Robust check for window.YT
    if (window.YT && window.YT.Player) {
      createInstance();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === 'function') prevCallback();
        createInstance();
      };

      // Fallback poll in case onYouTubeIframeAPIReady already fired
      let attempts = 0;
      const poll = setInterval(() => {
        attempts++;
        if (window.YT && window.YT.Player) {
          clearInterval(poll);
          if (!this.player) createInstance();
        } else if (attempts > 40) {
          clearInterval(poll);
        }
      }, 150);
    }
  }

  loadVideo(videoId) {
    this.currentVideoId = videoId;
    this.simulatedTime = 0;

    let loaded = false;

    // 1. Try standard YouTube API loadVideoById
    if (this.player && this.isReady) {
      try {
        if (typeof this.player.loadVideoById === 'function') {
          this.player.loadVideoById({ videoId: videoId, startSeconds: 0 });
          loaded = true;
        }
      } catch (e) {
        console.warn('loadVideoById failed, trying string argument:', e);
        try {
          this.player.loadVideoById(videoId, 0);
          loaded = true;
        } catch (err) {}
      }
    }

    // 2. Direct iframe update fallback (100% reliable DOM fallback)
    if (!loaded) {
      try {
        const iframe = document.querySelector('#youtubeBridge') || document.querySelector('iframe[id*="youtubeBridge"]');
        if (iframe && iframe.tagName === 'IFRAME') {
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`;
          loaded = true;
        }
      } catch (e) {
        console.warn('Direct iframe update fallback notice:', e);
      }
    }

    // 3. If player not ready yet, re-init
    if (!this.player) {
      this.init('youtubeBridge', videoId, this.callbacks);
    }
  }

  play() {
    if (this.player && typeof this.player.playVideo === 'function') {
      try {
        this.player.playVideo();
      } catch (e) {
        console.warn('Play error:', e);
      }
    }
  }

  pause() {
    if (this.player && typeof this.player.pauseVideo === 'function') {
      try {
        this.player.pauseVideo();
      } catch (e) {
        console.warn('Pause error:', e);
      }
    }
  }

  seekTo(seconds) {
    this.simulatedTime = seconds;
    if (this.player && typeof this.player.seekTo === 'function') {
      try {
        this.player.seekTo(seconds, true);
      } catch (e) {}
    }
  }

  setVolume(volume) {
    if (this.player && typeof this.player.setVolume === 'function') {
      try {
        this.player.setVolume(volume);
      } catch (e) {}
    }
  }

  getCurrentTime() {
    if (this.player && typeof this.player.getCurrentTime === 'function') {
      try {
        const time = this.player.getCurrentTime();
        if (typeof time === 'number' && !isNaN(time) && time > 0) {
          this.simulatedTime = time;
          return time;
        }
      } catch (e) {}
    }
    return this.simulatedTime || 0;
  }

  getDuration() {
    if (this.player && typeof this.player.getDuration === 'function') {
      try {
        const dur = this.player.getDuration();
        if (typeof dur === 'number' && !isNaN(dur) && dur > 0) {
          this.simulatedDuration = dur;
          return dur;
        }
      } catch (e) {}
    }
    return this.simulatedDuration || 245;
  }

  setSimulatedTime(time, dur = 245) {
    this.simulatedTime = time;
    if (dur > 0) this.simulatedDuration = dur;
  }
}

export const ytManager = new YouTubePlayerManager();

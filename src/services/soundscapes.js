class SoundscapeEngine {
  constructor() {
    this.ctx = null;
    this.nodes = {
      rain: { source: null, gain: null, volume: 0 },
      fire: { source: null, gain: null, volume: 0 },
      crickets: { source: null, gain: null, volume: 0 },
      vinyl: { source: null, gain: null, volume: 0 },
      tanpura: { osc1: null, osc2: null, gain: null, volume: 0 }
    };
  }

  getContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  initRain() {
    const ctx = this.getContext();
    if (!ctx || this.nodes.rain.gain) return;

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 2.8;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1100;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(0);

    this.nodes.rain.source = source;
    this.nodes.rain.gain = gain;
  }

  initFire() {
    const ctx = this.getContext();
    if (!ctx || this.nodes.fire.gain) return;

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() < 0.0035) ? (Math.random() * 2 - 1) * 0.95 : (Math.random() * 0.03 - 0.015);
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2300;
    filter.Q.value = 1.1;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(0);

    this.nodes.fire.source = source;
    this.nodes.fire.gain = gain;
  }

  initCrickets() {
    const ctx = this.getContext();
    if (!ctx || this.nodes.crickets.gain) return;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 4600;

    const mod = ctx.createOscillator();
    mod.frequency.value = 14;

    const modGain = ctx.createGain();
    modGain.gain.value = 0.5;
    mod.connect(modGain.gain);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(0);
    mod.start(0);

    this.nodes.crickets.source = osc;
    this.nodes.crickets.gain = gain;
  }

  initVinyl() {
    const ctx = this.getContext();
    if (!ctx || this.nodes.vinyl.gain) return;

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const hiss = (Math.random() * 2 - 1) * 0.04;
      const pop = (Math.random() < 0.0007) ? (Math.random() * 2 - 1) * 0.85 : 0;
      data[i] = hiss + pop;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);

    source.connect(gain);
    gain.connect(ctx.destination);
    source.start(0);

    this.nodes.vinyl.source = source;
    this.nodes.vinyl.gain = gain;
  }

  initTanpura() {
    const ctx = this.getContext();
    if (!ctx || this.nodes.tanpura.gain) return;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);

    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.value = 138.59; // C#3 Sa

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 207.65; // G#3 Pa

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 750;

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(0);
    osc2.start(0);

    this.nodes.tanpura.osc1 = osc1;
    this.nodes.tanpura.osc2 = osc2;
    this.nodes.tanpura.gain = gain;
  }

  setVolume(type, percent) {
    percent = Math.max(0, Math.min(100, percent));
    this.nodes[type].volume = percent;

    if (percent > 0) {
      if (type === 'rain') this.initRain();
      else if (type === 'fire') this.initFire();
      else if (type === 'crickets') this.initCrickets();
      else if (type === 'vinyl') this.initVinyl();
      else if (type === 'tanpura') this.initTanpura();
    }

    const node = this.nodes[type];
    if (node.gain && this.ctx) {
      const targetGain = (percent / 100) * 0.6;
      node.gain.gain.setValueAtTime(targetGain, this.ctx.currentTime);
    }
  }

  muteAll() {
    Object.keys(this.nodes).forEach(key => this.setVolume(key, 0));
  }
}

export const soundscapes = new SoundscapeEngine();

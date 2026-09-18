# Mehfil (محفل) — The Midnight Ghazal Radio & Ambient Sanctuary

A sanctuary for timeless South Asian Ghazals, inspired by the intimate, retro ambiance of [deluxsalon.in](https://deluxsalon.in/). Crafted specifically for night listening with zero eye fatigue, ambient lighting, soothing soundscapes, and iconic poetry.

Built with **React 18**, **Vite**, **Tailwind CSS**, **Lucide Icons**, and the **Web Audio API**.

---

## ✨ Features

### 1. 🕯️ Eye-Comfort Ambient Lighting Engine
- **Non-Glare Illumination**: Specially tuned color temperatures (warm candlelight ~1900K, moonlight silver, velvet rose, royal emerald) that filter out harsh blue light.
- **Organic Candle Breathing Pulse**: An ambient glow that gently pulses at 6 breaths per minute—a cadence scientifically proven to soothe the nervous system.
- **Eye-Care Dimmer**: One-click night dimmer for pitch-dark bedrooms.
- **Floating Fireflies**: Warm golden embers and dust motes that float lazily across the screen.

### 2. 🌌 4 Atmospheric Background Scenes
1. **Mehfil-e-Chiraag (Courtyard & Lanterns)**: Mughal Jharokha silhouette, swaying antique brass lanterns (*fanoos*), oil lamps (*diyas*), and twinkling stars.
2. **Baarish Ki Khidki (Rain on Glass)**: Steamy monsoon window looking out over warm amber streetlights with running water droplets.
3. **Mahtaabi Raat (Moonlit Royal Terrace)**: Radiant full moon, deep royal sapphire indigo waters, and ripples of moonlight.
4. **Puraani Haveli (Vintage Study)**: Warm mahogany bookshelves, antique gramophone, and glowing fireplace hearth.

### 3. 📻 Deluxe Saloon-Style Vintage Vinyl Player
- **Spinning Vinyl Record**: Custom grooved record with gold foil center label and authentic center spindle hole. Spins smoothly during playback.
- **Full Player Controls**: Play / Pause, Previous, Next, Shuffle, Volume popover slider, and real-time seekable progress bar.
- **Animated Equalizer**: Subtle bouncing golden visualizer bars.
- **MediaSession API**: Shows current Ghazal title, poet, and artwork on your phone's lock screen and keyboard media controls.

### 4. 📜 Curated Ghazal Masterpieces & Lyrics
- **Timeless Legends**: Jagjit Singh, Mehdi Hassan, Ghulam Ali, Farida Khanum, Begum Akhtar, and Nusrat Fateh Ali Khan.
- **"Sher-e-Khaas" Stage**: Rotating couplets from Mirza Ghalib, Ahmad Faraz, Faiz Ahmad Faiz, Mir Taqi Mir, with one-click copy and translations.
- **Lyrics & Meaning Drawer**: View full poetry, raag details (*Shivaranjani*, *Yaman*, *Bhairavi*, *Kafi*), and English explanations.

### 5. 🌧️ Procedural Web Audio Soundscape Mixer
Generate real-time, offline-capable natural soundscapes alongside the music:
- 🌧️ **Baarish (Monsoon Rain)**: Procedural rain synthesized via lowpass-filtered noise + canvas raindrops.
- 🕯️ **Chiraag (Candle Crackle)**: Warm wood fire and candle pops.
- 🦗 **Raat Ki Khamoshi (Night Crickets)**: High-frequency soothing night breeze.
- 📻 **Gramophone Needle Hiss**: Authentic 1960s vinyl turntable warmth.
- 🪕 **Tanpura Drone (Sa-Pa)**: Meditative Indian classical drone in C# / G#.

### 6. ⏱️ Sukoon Sleep Timer
- 15, 30, 45, or 60 minutes countdown with a gentle 15-second audio fade-out so sleep is never disturbed.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
ghazal-dev/
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # Glassmorphic pill controls
│   │   ├── HeroCenter.jsx             # Calligraphy & "Sher-e-Khaas"
│   │   ├── PlayerDock.jsx             # Vintage vinyl player
│   │   ├── BackgroundScenes.jsx       # 4 SVG scenes
│   │   ├── AmbientGlow.jsx            # Ambient diffuser layer
│   │   ├── RainCanvas.jsx             # Realistic rain canvas
│   │   ├── ParticleCanvas.jsx         # Floating fireflies
│   │   ├── PlaylistDrawer.jsx         # Searchable 15+ ghazals list
│   │   ├── LyricsModal.jsx            # Full poetry & meanings
│   │   ├── SoundscapeModal.jsx        # Web Audio ambiance mixer
│   │   ├── AmbientLightingModal.jsx   # Ambient lighting tuner
│   │   └── SleepTimerModal.jsx        # Sleep timer modal
│   ├── data/
│   │   ├── ghazals.js                 # Curated playlist database
│   │   └── couplets.js                # Curated couplets / shers
│   ├── services/
│   │   ├── soundscapes.js             # Web Audio API synthesizers
│   │   └── youtubePlayer.js          # YouTube Iframe API manager
│   ├── App.jsx                        # Root React component
│   ├── main.jsx                       # Entry point
│   └── index.css                      # Custom animations & styles
├── index.html                         # HTML template
├── package.json                       # Dependencies & scripts
├── tailwind.config.js                 # Tailwind setup
└── vite.config.js                     # Vite configuration
```

---

## 🎶 Adding More Ghazals

Open [`src/data/ghazals.js`](src/data/ghazals.js) and append a new track entry:

```javascript
{
  id: 16,
  title: "Ghazal Title",
  titleUrdu: "غزل کا عنوان",
  artist: "Singer / Maestro",
  poet: "Poet Name",
  raag: "Raag Name",
  mood: "Mood / Emotion",
  category: "jagjit", // 'jagjit' | 'mehdi' | 'ghulam' | 'farida' | 'sufi'
  youtubeId: "VIDEO_ID_HERE",
  duration: "5:20",
  cover: "https://image-url",
  lyrics: `First couplet line 1\nLine 2...`,
  meaning: "English explanation of the poetry"
}
```
# mehfil-e-ghazal

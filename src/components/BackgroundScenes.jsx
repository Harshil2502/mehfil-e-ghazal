import React from 'react';

export default function BackgroundScenes({ activeScene }) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#0e0908]">

      {/* SCENE 1: MEHFIL-E-CHIRAAG (Courtyard under Lanterns & Stars) */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          activeScene === 'chiraag' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="skyChiraag" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#090508" />
              <stop offset="45%" stopColor="#190e0c" />
              <stop offset="75%" stopColor="#2d140e" />
              <stop offset="100%" stopColor="#3d180d" />
            </linearGradient>
            <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#d97706" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="moonGlowChiraag" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#fef3c7" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#fde68a" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Night Sky Backdrop */}
          <rect width="1600" height="900" fill="url(#skyChiraag)" />

          {/* Distant Twinkling Stars */}
          <g opacity="0.85">
            <circle cx="210" cy="110" r="1.5" fill="#fef3c7" className="star-twinkle-1" />
            <circle cx="380" cy="70" r="2" fill="#fff" className="star-twinkle-2" />
            <circle cx="560" cy="140" r="1.2" fill="#fed7aa" className="star-twinkle-3" />
            <circle cx="720" cy="90" r="1.8" fill="#fff" className="star-twinkle-1" />
            <circle cx="950" cy="65" r="2.2" fill="#fef3c7" className="star-twinkle-2" />
            <circle cx="1120" cy="130" r="1.4" fill="#fff" className="star-twinkle-3" />
            <circle cx="1340" cy="80" r="1.7" fill="#fed7aa" className="star-twinkle-1" />
            <circle cx="1480" cy="150" r="1.2" fill="#fff" className="star-twinkle-2" />
            <circle cx="840" cy="170" r="1.6" fill="#fef3c7" className="star-twinkle-3" />
            <circle cx="440" cy="200" r="1.3" fill="#fff" className="star-twinkle-1" />
            <circle cx="1260" cy="190" r="1.5" fill="#fed7aa" className="star-twinkle-2" />
          </g>

          {/* Crescent Moon (Hilal) */}
          <g transform="translate(1300, 100)">
            <circle cx="50" cy="50" r="45" fill="url(#moonGlowChiraag)" />
            <path d="M 50,15 A 35,35 0 1,0 85,50 A 42,42 0 1,1 50,15 Z" fill="#fffef5" />
          </g>

          {/* Distant Mughal Domes & Minarets Silhouette */}
          <g opacity="0.55" fill="#140907">
            <path d="M 0,650 L 0,540 Q 60,535 80,510 Q 100,480 100,450 Q 100,480 120,510 Q 140,535 200,540 L 200,650 Z" />
            <rect x="230" y="520" width="18" height="130" />
            <path d="M 230,520 Q 239,490 248,520 Z" />
            <path d="M 320,650 L 320,530 Q 380,520 410,480 Q 440,430 440,380 Q 440,430 470,480 Q 500,520 560,530 L 560,650 Z" />
            <rect x="620" y="500" width="22" height="150" />
            <path d="M 620,500 Q 631,460 642,500 Z" />
            <path d="M 980,650 L 980,540 Q 1030,530 1055,490 Q 1080,440 1080,390 Q 1080,440 1105,490 Q 1130,530 1180,540 L 1180,650 Z" />
            <rect x="1240" y="510" width="20" height="140" />
            <path d="M 1240,510 Q 1250,470 1260,510 Z" />
            <path d="M 1360,650 L 1360,550 Q 1410,540 1430,510 Q 1450,470 1450,440 Q 1450,470 1470,510 Q 1490,540 1540,550 L 1540,650 Z" />
            <rect x="0" y="640" width="1600" height="260" />
          </g>

          {/* Grand Mughal Archway Frame */}
          <g fill="#0c0605">
            <path d="M 0,0 L 260,0 C 260,180 200,320 140,440 C 90,540 60,650 60,900 L 0,900 Z" />
            <path d="M 1600,0 L 1340,0 C 1340,180 1400,320 1460,440 C 1510,540 1540,650 1540,900 L 1600,900 Z" />
            <path d="M 240,0 Q 400,160 550,160 Q 680,160 800,90 Q 920,160 1050,160 Q 1200,160 1360,0 L 1600,0 L 1600,60 L 0,60 L 0,0 Z" />
            <path d="M 220,0 Q 380,180 540,180 Q 680,180 800,110 Q 920,180 1060,180 Q 1220,180 1380,0" stroke="#f59e0b" strokeWidth="2.5" strokeOpacity="0.35" fill="none" />
          </g>

          {/* Hanging Antique Brass Lanterns */}
          <g className="lantern-sway-left" transform="translate(320, 0)">
            <line x1="0" y1="0" x2="0" y2="180" stroke="#92400e" strokeWidth="2.5" />
            <circle cx="0" cy="220" r="110" fill="url(#lanternGlow)" />
            <path d="M -22,180 L 22,180 L 14,195 L -14,195 Z" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
            <path d="M -26,195 L 26,195 L 34,240 L -34,240 Z" fill="none" stroke="#d97706" strokeWidth="2.5" />
            <rect x="-24" y="196" width="48" height="42" fill="#fbbf24" fillOpacity="0.25" rx="4" />
            <ellipse cx="0" cy="216" rx="4" ry="9" fill="#fef08a" />
            <ellipse cx="0" cy="217" rx="2" ry="5" fill="#f59e0b" />
            <path d="M -16,240 L 16,240 L 0,265 Z" fill="#92400e" />
            <circle cx="0" cy="272" r="4" fill="#fbbf24" />
          </g>

          <g className="lantern-sway-right" transform="translate(1280, 0)">
            <line x1="0" y1="0" x2="0" y2="190" stroke="#92400e" strokeWidth="2.5" />
            <circle cx="0" cy="230" r="120" fill="url(#lanternGlow)" />
            <path d="M -24,190 L 24,190 L 16,206 L -16,206 Z" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
            <path d="M -28,206 L 28,206 L 36,254 L -36,254 Z" fill="none" stroke="#d97706" strokeWidth="2.5" />
            <rect x="-26" y="207" width="52" height="45" fill="#fbbf24" fillOpacity="0.25" rx="4" />
            <ellipse cx="0" cy="227" rx="4.5" ry="9.5" fill="#fef08a" />
            <ellipse cx="0" cy="228" rx="2.5" ry="5.5" fill="#f59e0b" />
            <path d="M -18,254 L 18,254 L 0,282 Z" fill="#92400e" />
            <circle cx="0" cy="290" r="4.5" fill="#fbbf24" />
          </g>

          {/* Terrace Balustrade with Glowing Diyas */}
          <g transform="translate(0, 780)">
            <rect x="0" y="40" width="1600" height="80" fill="#080403" />
            <line x1="0" y1="40" x2="1600" y2="40" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.3" />

            <g transform="translate(180, 25)">
              <ellipse cx="0" cy="10" rx="60" ry="30" fill="url(#lanternGlow)" opacity="0.6" />
              <path d="M -16,10 C -16,16 16,16 16,10 C 20,4 0,-4 0,-4 C 0,-4 -20,4 -16,10 Z" fill="#b45309" />
              <ellipse cx="2" cy="0" rx="3" ry="7" fill="#fef08a" />
            </g>
            <g transform="translate(420, 25)">
              <ellipse cx="0" cy="10" rx="60" ry="30" fill="url(#lanternGlow)" opacity="0.6" />
              <path d="M -16,10 C -16,16 16,16 16,10 C 20,4 0,-4 0,-4 C 0,-4 -20,4 -16,10 Z" fill="#b45309" />
              <ellipse cx="2" cy="0" rx="3" ry="7" fill="#fef08a" />
            </g>
            <g transform="translate(1180, 25)">
              <ellipse cx="0" cy="10" rx="60" ry="30" fill="url(#lanternGlow)" opacity="0.6" />
              <path d="M -16,10 C -16,16 16,16 16,10 C 20,4 0,-4 0,-4 C 0,-4 -20,4 -16,10 Z" fill="#b45309" />
              <ellipse cx="2" cy="0" rx="3" ry="7" fill="#fef08a" />
            </g>
            <g transform="translate(1420, 25)">
              <ellipse cx="0" cy="10" rx="60" ry="30" fill="url(#lanternGlow)" opacity="0.6" />
              <path d="M -16,10 C -16,16 16,16 16,10 C 20,4 0,-4 0,-4 C 0,-4 -20,4 -16,10 Z" fill="#b45309" />
              <ellipse cx="2" cy="0" rx="3" ry="7" fill="#fef08a" />
            </g>
          </g>
        </svg>
      </div>

      {/* SCENE 2: BAARISH KI KHIDKI (Rainy Window) */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          activeScene === 'baarish' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="rainSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#080a10" />
              <stop offset="60%" stopColor="#121824" />
              <stop offset="100%" stopColor="#1c1614" />
            </linearGradient>
            <radialGradient id="streetlampGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#d97706" stopOpacity="0.4" />
              <stop offset="80%" stopColor="#92400e" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#rainSkyGrad)" />
          <circle cx="340" cy="460" r="140" fill="url(#streetlampGlow)" opacity="0.65" />
          <circle cx="780" cy="520" r="180" fill="url(#streetlampGlow)" opacity="0.75" />
          <circle cx="1240" cy="480" r="160" fill="url(#streetlampGlow)" opacity="0.6" />
          <circle cx="980" cy="380" r="90" fill="url(#streetlampGlow)" opacity="0.4" />
          <rect x="0" y="0" width="1600" height="900" fill="none" stroke="#080403" strokeWidth="40" />
          <line x1="800" y1="0" x2="800" y2="900" stroke="#080403" strokeWidth="32" />
          <line x1="0" y1="450" x2="1600" y2="450" stroke="#080403" strokeWidth="28" />
          <line x1="800" y1="0" x2="800" y2="900" stroke="#1c0f0a" strokeWidth="6" />
          <line x1="0" y1="450" x2="1600" y2="450" stroke="#1c0f0a" strokeWidth="6" />
        </svg>
      </div>

      {/* SCENE 3: MAHTAABI RAAT (Moonlit Terrace) */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          activeScene === 'mahtaab' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="mahtaabSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#04060d" />
              <stop offset="50%" stopColor="#0d1424" />
              <stop offset="85%" stopColor="#141e33" />
              <stop offset="100%" stopColor="#18233b" />
            </linearGradient>
            <radialGradient id="fullMoonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="15%" stopColor="#f0f9ff" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#bae6fd" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#mahtaabSky)" />
          <g transform="translate(800, 220)">
            <circle cx="0" cy="0" r="180" fill="url(#fullMoonGlow)" />
            <circle cx="0" cy="0" r="62" fill="#f8fafc" />
            <ellipse cx="-15" cy="-10" rx="14" ry="10" fill="#e2e8f0" opacity="0.6" />
            <ellipse cx="18" cy="12" rx="16" ry="12" fill="#e2e8f0" opacity="0.5" />
            <ellipse cx="-4" cy="22" rx="20" ry="14" fill="#e2e8f0" opacity="0.45" />
          </g>
          <rect x="0" y="600" width="1600" height="300" fill="#090f1b" />
          <ellipse cx="800" cy="680" rx="350" ry="15" fill="#38bdf8" opacity="0.15" />
          <ellipse cx="800" cy="730" rx="260" ry="12" fill="#38bdf8" opacity="0.2" />
          <ellipse cx="800" cy="780" rx="180" ry="9" fill="#bae6fd" opacity="0.25" />
        </svg>
      </div>

      {/* SCENE 4: PURAANI HAVELI (Vintage Study) */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          activeScene === 'haveli' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="haveliWall" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#120805" />
              <stop offset="60%" stopColor="#24100a" />
              <stop offset="100%" stopColor="#160805" />
            </linearGradient>
            <radialGradient id="fireplaceGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#b45309" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#haveliWall)" />
          <g fill="#0b0402" opacity="0.8">
            <rect x="80" y="100" width="340" height="650" rx="6" />
            <rect x="1180" y="100" width="340" height="650" rx="6" />
            <line x1="80" y1="240" x2="420" y2="240" stroke="#78350f" strokeWidth="8" />
            <line x1="80" y1="380" x2="420" y2="380" stroke="#78350f" strokeWidth="8" />
            <line x1="80" y1="520" x2="420" y2="520" stroke="#78350f" strokeWidth="8" />
            <line x1="1180" y1="240" x2="1520" y2="240" stroke="#78350f" strokeWidth="8" />
            <line x1="1180" y1="380" x2="1520" y2="380" stroke="#78350f" strokeWidth="8" />
            <line x1="1180" y1="520" x2="1520" y2="520" stroke="#78350f" strokeWidth="8" />
          </g>
          <circle cx="800" cy="620" r="240" fill="url(#fireplaceGlow)" opacity="0.6" />
        </svg>
      </div>

      {/* Gentle Nocturnal Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0908]/90 via-transparent to-[#0e0908]/60 pointer-events-none" />
    </div>
  );
}

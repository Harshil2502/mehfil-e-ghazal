/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          800: '#1a110f',
          900: '#110b09',
          950: '#0a0605'
        },
        amber: {
          350: '#f5a524',
          450: '#e58e0a'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['"Cinzel"', 'serif'],
        urdu: ['"Noto Nastaliq Urdu"', '"Amiri"', 'serif'],
        arabic: ['"Amiri"', 'serif']
      }
    },
  },
  plugins: [],
}

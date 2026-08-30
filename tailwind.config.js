/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#2b2b2b',
          light: '#656565',
          muted: '#a2a2a2',
        },
        cream: {
          DEFAULT: '#f1f1f1',
          light: '#fafafa',
          dark: '#eaeaea',
          darker: '#dedede',
        },
        pink: {
          accent: '#fc4778',
        },
        surface: {
          white: '#fafafa',
          card: '#ffffff',
          dark: '#2b2b2b',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'sans-serif'],
        heading: ['DM Serif Display', 'Georgia', 'serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'monospace'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
      },
      fontSize: {
        '8xl': ['8.5rem', { lineHeight: '0.86', letterSpacing: '-0.05em' }],
        '7xl': ['5.5rem', { lineHeight: '0.86', letterSpacing: '-0.05em' }],
        '6xl': ['5rem', { lineHeight: '0.86', letterSpacing: '-0.05em' }],
      },
      animation: {
        'spin-slow': 'spin 35s linear infinite',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}

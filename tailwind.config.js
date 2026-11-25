/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F4F0E8',
          50: '#FAF7F1',
          100: '#F4F0E8',
          200: '#EDE6D9',
          300: '#E2D8C7',
        },
        ink: {
          DEFAULT: '#1B1917',
          soft: '#443E36',
          muted: '#7E7568',
        },
        accent: {
          DEFAULT: '#A87D60',
          soft: '#C7A98F',
          blush: '#E3CEC1',
        },
        line: '#D9D0C1',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Lora', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.28em',
        label: '0.22em',
      },
      maxWidth: {
        content: '1240px',
      },
      boxShadow: {
        soft: '0 24px 60px -32px rgba(27, 25, 23, 0.35)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
};

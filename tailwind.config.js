/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(var(--primary) / 0.1)',
          100: 'hsl(var(--primary) / 0.2)',
          200: 'hsl(var(--primary) / 0.3)',
          300: 'hsl(var(--primary) / 0.4)',
          400: 'hsl(var(--primary) / 0.6)',
          500: 'hsl(var(--primary))',
          600: 'hsl(var(--primary) / 0.9)',
          700: 'hsl(var(--primary) / 0.8)',
          800: 'hsl(var(--primary) / 0.7)',
          900: 'hsl(var(--primary) / 0.6)',
        },
        brand: {
          green: '#2d7a3a',
          'green-dark': '#1e5a28',
          'green-light': '#4a9f5a',
          'green-bg': '#e8f5e9',
          accent: '#e8491d',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(37, 211, 102, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(37, 211, 102, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
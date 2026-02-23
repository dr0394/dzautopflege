/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E10600',
        'primary-dark': '#B30500',
        'primary-light': '#FF4D42',
        accent: '#BFBFBF',
        'accent-light': '#F5F5F5',
        'accent-dark': '#8C8C8C',
        'brand-black': '#000000',
        'brand-white': '#FFFFFF',
        'brand-gold': '#D4AF37',
        'light-gray': '#F7F7F7',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #E10600 0%, #B30500 100%)',
        'gradient-primary-light': 'linear-gradient(135deg, #FF4D42 0%, #E10600 100%)',
        'gradient-accent': 'linear-gradient(135deg, #BFBFBF 0%, #8C8C8C 100%)',
        'gradient-metallic': 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 25%, #BFBFBF 75%, #8C8C8C 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
        'gradient-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
        'gradient-glow': 'radial-gradient(circle at center, rgba(225,6,0,0.3) 0%, transparent 70%)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(148,163,184,0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(148,163,184,0.8), 0 0 60px rgba(148,163,184,0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'brand': '0 4px 20px rgba(225,6,0,0.3)',
        'brand-lg': '0 10px 40px rgba(225,6,0,0.4)',
        'brand-xl': '0 20px 60px rgba(225,6,0,0.5)',
        'inner-brand': 'inset 0 2px 4px rgba(225,6,0,0.2)',
        'glow-brand': '0 0 30px rgba(225,6,0,0.6)',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
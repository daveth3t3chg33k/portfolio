import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        muted: 'var(--muted)',
        card: 'var(--card)',
        'card-hover': 'var(--card-hover)',
        border: 'var(--border)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-glow': 'pulse 2s infinite',
        'gradient': 'gradientMove 10s ease infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        fadeIn: {
          from: { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          to: { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeInRight: {
          from: { 
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          to: { 
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        fadeInLeft: {
          from: { 
            opacity: '0',
            transform: 'translateX(20px)'
          },
          to: { 
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        fadeInUp: {
          from: { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          to: { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        pulse: {
          '0%': { boxShadow: '0 0 0 0 rgba(100, 255, 218, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(100, 255, 218, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(100, 255, 218, 0)' },
        },
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};

export default config; 
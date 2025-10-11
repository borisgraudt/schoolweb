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
        'neo-dark': '#0a0e27',
        'neo-purple': '#6366f1',
        'neo-pink': '#ec4899',
        'neo-cyan': '#06b6d4',
        'neo-lime': '#84cc16',
        'neo-gray': '#1e293b',
        'neo-light': '#f8fafc',
        'neo-accent': '#8b5cf6',
      },
      fontFamily: {
        'body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'heading': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.02em',
        'tight': '-0.01em',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'base': ['1rem', { lineHeight: '1.7', letterSpacing: '-0.011em' }],
        'lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '-0.014em' }],
        'xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '-0.017em' }],
        '2xl': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.019em' }],
        '3xl': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.021em' }],
        '4xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.022em' }],
        '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.024em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.026em' }],
      },
    },
  },
  plugins: [],
};

export default config; 
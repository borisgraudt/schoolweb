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
        'bauhaus-light': 'var(--bauhaus-light)',
        'bauhaus-blue': 'var(--bauhaus-blue)',
        'bauhaus-red': 'var(--bauhaus-red)',
        'bauhaus-green': 'purple',
      },
    },
  },
  plugins: [],
};

export default config; 
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'apple-bg': '#F5F5F7',
        'apple-text': '#1D1D1F',
        'apple-accent': '#007AFF',
        'apple-light-gray': '#E8E8ED',
        'apple-dark-gray': '#86868B',
        'bauhaus-green': '#4A6B4A',
        'bauhaus-light': '#F5F5DC',
        'bauhaus-red': '#E63946',
        'bauhaus-blue': '#1D3557',
        'bauhaus-white': '#FFFFFF',
        'bauhaus-orange': '#FF6B00',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Impact', 'sans-serif'],
        body: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


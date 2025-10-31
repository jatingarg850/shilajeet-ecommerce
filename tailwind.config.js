/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7e6',
          100: '#fdecc0',
          200: '#fbd886',
          300: '#f9c74f',
          400: '#f8b500',
          500: '#e6a500',
          600: '#cc9400',
          700: '#b38300',
          800: '#997200',
          900: '#806100',
        },
        dark: {
          50: '#f8f8f8',
          100: '#e0e0e0',
          200: '#c0c0c0',
          300: '#a0a0a0',
          400: '#606060',
          500: '#404040',
          600: '#2a2a2a',
          700: '#1f1f1f',
          800: '#141414',
          900: '#0a0a0a',
          950: '#000000',
        },
        jet: {
          50: '#f5f5f5',
          100: '#d4d4d4',
          200: '#a3a3a3',
          300: '#737373',
          400: '#525252',
          500: '#404040',
          600: '#262626',
          700: '#171717',
          800: '#0f0f0f',
          900: '#050505',
          950: '#000000',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
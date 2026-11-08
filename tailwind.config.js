/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // AI Design Signature Medical Teal & Mint
        petTeal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // Colors extracted directly from the PetCare Heart Logo & Clinic Identity
        clinicCyan: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        clinicPurple: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
        },
        clinicMagenta: {
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
        },
        themeYellow: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // warm gold/amber
          600: '#d97706',
          700: '#b45309',
        },
        themeDark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#1a1f2e',
          800: '#111520',
          850: '#0d101a',
          900: '#090c14',
          950: '#05070c', // deep ultra luxury dark
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.35))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(251, 191, 36, 0.65))' },
        },
      },
    },
  },
  plugins: [],
}

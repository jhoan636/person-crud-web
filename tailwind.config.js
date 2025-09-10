/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0b1220',
        'card-dark': '#111827',
        'muted': '#94a3b8',
        'primary': '#1f6feb',
        'primary-600': '#1b60ce',
        'success': '#16a34a',
        'danger': '#ef4444',
      },
      boxShadow: {
        'soft': '0 2px 14px rgba(0,0,0,0.25)'
      },
      borderRadius: {
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
}

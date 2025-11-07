/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        triopia: {
          peach: 'var(--triopia-peach)',
          cream: 'var(--triopia-cream)',
          dark: 'var(--triopia-dark)',
        },
      },
      fontSize: {
        'triopia-sm': 'var(--triopia-font-sm)',
        'triopia-md': 'var(--triopia-font-md)',
        'triopia-lg': 'var(--triopia-font-lg)',
      },
    },
  },
  plugins: [],
}

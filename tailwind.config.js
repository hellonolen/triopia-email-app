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
        border: 'var(--border)',
        muted: 'var(--muted)',
        surface: 'var(--surface)',
      },
      fontSize: {
        'triopia-sm': 'var(--fs-sm)',
        'triopia-md': 'var(--fs-md)',
        'triopia-lg': 'var(--fs-lg)',
        'triopia-xl': 'var(--fs-xl)',
        'triopia-2xl': 'var(--fs-2xl)',
      },
      dropShadow: {
        triopia: 'var(--shadow)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'var(--radius-sm)',
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
      },
    },
  },
  plugins: [],
}

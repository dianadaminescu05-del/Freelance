/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],

  // Preflight is off on purpose: src/styles/global.css already carries the
  // reset, and Tailwind's version would strip the h1–h3 font rules defined
  // there. Utilities still work normally.
  corePlugins: { preflight: false },

  theme: {
    extend: {
      // Mirrors of tokens.css. The *-rgb channel vars are the single source
      // of truth, so `bg-accent/10` and friends resolve alpha correctly.
      colors: {
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        'ink-soft': 'rgb(var(--ink-soft-rgb) / <alpha-value>)',
        paper: 'rgb(var(--paper-rgb) / <alpha-value>)',
        'paper-warm': 'rgb(var(--paper-warm-rgb) / <alpha-value>)',
        mid: 'rgb(var(--mid-rgb) / <alpha-value>)',
        line: 'rgb(var(--light-rgb) / <alpha-value>)',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        'accent-dark': 'rgb(var(--accent-dark-rgb) / <alpha-value>)',
        'accent-darker': 'rgb(var(--accent-darker-rgb) / <alpha-value>)',
        cyan: 'rgb(var(--accent-4-rgb) / <alpha-value>)',
        magenta: 'rgb(var(--accent-2-rgb) / <alpha-value>)',
        yellow: 'rgb(var(--accent-3-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Space Grotesk', 'Arial Black', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: { token: 'var(--radius)' },
      transitionTimingFunction: { brand: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};

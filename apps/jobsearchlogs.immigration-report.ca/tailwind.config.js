/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(100%) skewX(-12deg)'}
        },
        goup: {
          '0%': { transform: 'translateY(100%) scale(0.5)', opacity: 0 },
          '100%': { transform: 'translateY(0%) scale(1)',  opacity: 1 }
        }
      },
      animation: {
        shimmer: 'shimmer 1s forwards',
        goup: 'goup 2s forwards'
      },
      colors: {
        "theme-btn": {
          bg: "rgb(var(--color-theme-btn-bg) / <alpha-value>)",
          text: "rgb(var(--color-theme-btn-text) / <alpha-value>)",
          border: "rgb(var(--color-theme-btn-border) / <alpha-value>)",
          active: {
            bg: "rgb(var(--color-theme-btn-active-bg) / <alpha-value>)",
            text: "rgb(var(--color-theme-btn-active-text) / <alpha-value>)",
            border: "rgb(var(--color-theme-btn-active-border) / <alpha-value>)",
          }
        },
        bkg: "rgb(var(--color-bkg) / <alpha-value>)",
        content: "rgb(var(--color-content) / <alpha-value>)"
      }
    },
  },
  plugins: [],
}

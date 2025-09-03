const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Material 3 color tokens
        primary: {
          DEFAULT: 'var(--md-sys-color-primary)',
          dark: 'var(--md-sys-color-primary)',
        },
        'on-primary': {
          DEFAULT: 'var(--md-sys-color-on-primary)',
          dark: 'var(--md-sys-color-on-primary)',
        },
        'primary-container': {
          DEFAULT: 'var(--md-sys-color-primary-container)',
          dark: 'var(--md-sys-color-primary-container)',
        },
        'on-primary-container': {
          DEFAULT: 'var(--md-sys-color-on-primary-container)',
          dark: 'var(--md-sys-color-on-primary-container)',
        },
        secondary: {
          DEFAULT: 'var(--md-sys-color-secondary)',
          dark: 'var(--md-sys-color-secondary)',
        },
        'on-secondary': {
          DEFAULT: 'var(--md-sys-color-on-secondary)',
          dark: 'var(--md-sys-color-on-secondary)',
        },
        'secondary-container': {
          DEFAULT: 'var(--md-sys-color-secondary-container)',
          dark: 'var(--md-sys-color-secondary-container)',
        },
        'on-secondary-container': {
          DEFAULT: 'var(--md-sys-color-on-secondary-container)',
          dark: 'var(--md-sys-color-on-secondary-container)',
        },
        tertiary: {
          DEFAULT: 'var(--md-sys-color-tertiary)',
          dark: 'var(--md-sys-color-tertiary)',
        },
        'on-tertiary': {
          DEFAULT: 'var(--md-sys-color-on-tertiary)',
          dark: 'var(--md-sys-color-on-tertiary)',
        },
        'tertiary-container': {
          DEFAULT: 'var(--md-sys-color-tertiary-container)',
          dark: 'var(--md-sys-color-tertiary-container)',
        },
        'on-tertiary-container': {
          DEFAULT: 'var(--md-sys-color-on-tertiary-container)',
          dark: 'var(--md-sys-color-on-tertiary-container)',
        },
        error: {
          DEFAULT: 'var(--md-sys-color-error)',
          dark: 'var(--md-sys-color-error)',
        },
        'on-error': {
          DEFAULT: 'var(--md-sys-color-on-error)',
          dark: 'var(--md-sys-color-on-error)',
        },
        'error-container': {
          DEFAULT: 'var(--md-sys-color-error-container)',
          dark: 'var(--md-sys-color-error-container)',
        },
        'on-error-container': {
          DEFAULT: 'var(--md-sys-color-on-error-container)',
          dark: 'var(--md-sys-color-on-error-container)',
        },
        success: {
          DEFAULT: 'var(--md-sys-color-success)',
          dark: 'var(--md-sys-color-success)',
        },
        'on-success': {
          DEFAULT: 'var(--md-sys-color-on-success)',
          dark: 'var(--md-sys-color-on-success)',
        },
        'success-container': {
          DEFAULT: 'var(--md-sys-color-success-container)',
          dark: 'var(--md-sys-color-success-container)',
        },
        'on-success-container': {
          DEFAULT: 'var(--md-sys-color-on-success-container)',
          dark: 'var(--md-sys-color-on-success-container)',
        },
        surface: {
          DEFAULT: 'var(--md-sys-color-surface)',
          dark: 'var(--md-sys-color-surface)',
        },
        'on-surface': {
          DEFAULT: 'var(--md-sys-color-on-surface)',
          dark: 'var(--md-sys-color-on-surface)',
        },
        'surface-container-lowest': {
          DEFAULT: 'var(--md-sys-color-surface-container-lowest)',
          dark: 'var(--md-sys-color-surface-container-lowest)',
        },
        'surface-container-low': {
          DEFAULT: 'var(--md-sys-color-surface-container-low)',
          dark: 'var(--md-sys-color-surface-container-low)',
        },
        'surface-container': {
          DEFAULT: 'var(--md-sys-color-surface-container)',
          dark: 'var(--md-sys-color-surface-container)',
        },
        'surface-container-high': {
          DEFAULT: 'var(--md-sys-color-surface-container-high)',
          dark: 'var(--md-sys-color-surface-container-high)',
        },
        'surface-container-highest': {
          DEFAULT: 'var(--md-sys-color-surface-container-highest)',
          dark: 'var(--md-sys-color-surface-container-highest)',
        },
        'surface-variant': {
          DEFAULT: 'var(--md-sys-color-surface-variant)',
          dark: 'var(--md-sys-color-surface-variant)',
        },
        'on-surface-variant': {
          DEFAULT: 'var(--md-sys-color-on-surface-variant)',
          dark: 'var(--md-sys-color-on-surface-variant)',
        },
        outline: {
          DEFAULT: 'var(--md-sys-color-outline)',
          dark: 'var(--md-sys-color-outline)',
        },
        'outline-variant': {
          DEFAULT: 'var(--md-sys-color-outline-variant)',
          dark: 'var(--md-sys-color-outline-variant)',
        },
      },
      borderRadius: {
        'xl': '1rem',    // md.sys.shape.corner.medium
        '2xl': '1.5rem', // md.sys.shape.corner.large
        '3xl': '2rem',   // md.sys.shape.corner.extra-large
      },
      boxShadow: {
        // Material 3 elevation levels
        'level-1': 'var(--md-shadow-level-1)',
        'level-2': 'var(--md-shadow-level-2)',
        'level-3': 'var(--md-shadow-level-3)',
        'level-4': 'var(--md-shadow-level-4)',
        'level-5': 'var(--md-shadow-level-5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale': 'scale 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scale: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}

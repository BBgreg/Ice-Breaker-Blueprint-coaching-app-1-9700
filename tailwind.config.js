/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-navy': '#0B1F3F',
        'navy-900': '#0B1F3F',
        'navy-800': '#1a2e4a',
        'navy-600': '#2d4a73',
        'navy-100': '#e6eaf2',
        'navy-50': '#f3f5f9',
        'accent-gray': '#5E6A7D',
        'white': '#FFFFFF',
        'light-border': '#E1E5E9',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['56px', '1.2'],
        'heading': ['36px', '1.3'],
        'subheading': ['24px', '1.3'],
        'body': ['16px', '1.6'],
        'small': ['14px', '1.4'],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
      boxShadow: {
        'card': '0 8px 32px rgba(0,0,0,0.1)',
        'card-hover': '0 16px 48px rgba(0,0,0,0.15)',
        'button': '0 10px 25px rgba(255,255,255,0.2)',
      },
      maxWidth: {
        'container': '1140px',
      },
    },
  },
  plugins: [],
}
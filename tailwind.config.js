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
        'navy-700': '#334e68',
        'navy-600': '#486581',
        'navy-500': '#627d98',
        'navy-400': '#829ab1',
        'navy-300': '#9fb3c8',
        'navy-200': '#bcccdc',
        'navy-100': '#d9e2ec',
        'navy-50': '#f3f5f9',
        'accent-gray': '#5E6A7D',
        'white': '#FFFFFF',
        'light-border': '#E1E5E9',
        'gray-50': '#f7f9fc',
        'gray-100': '#ecf1f6',
        'gray-200': '#d9e2ec',
        'gray-300': '#c5d2dc',
        'gray-400': '#9fb3c8',
        'gray-500': '#5E6A7D',
        'gray-600': '#486581',
        'gray-700': '#334e68',
        'gray-800': '#243b53',
        'gray-900': '#102a43',
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

/** @type {import('tailwindcss').Config} */
export default {
 content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

 theme: {
    extend: {
        // यहाँ से जोड़ें
      keyframes: {
        'wipe-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'wipe-down': 'wipe-down 3s ease-in-out infinite',
      },
      // यहाँ तक
      fontFamily: {
        'serif': ['"Cormorant Garamond"', 'serif'],
        'sans': ['"Inter"', 'sans-serif'],
      },
      colors: {
        'brand-gold': '#CDA34F',
        'brand-dark': '#1A1A1A',
      }
    },
  },
  plugins: [],
}
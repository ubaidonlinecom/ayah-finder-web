/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#022c22',
          900: '#064e3b',
          800: '#065f46',
          700: '#047857',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          accent: '#d4af37',
        },
        cream: {
          50: '#fffaf0',
          100: '#fafaf9',
          200: '#f5f5f4',
        },
      },
      fontFamily: {
        arabic: ['"Amiri"', "serif"],
        scheherazade: ['"Scheherazade New"', "serif"],
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(2, 44, 34, 0.05)',
        'luxury': '0 20px 50px -12px rgba(2, 44, 34, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

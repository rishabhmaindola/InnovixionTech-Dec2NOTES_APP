/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    color: {
      'matte': '#28282B',
    },
    extend: {
      backgroundImage: (theme) => ({
        'linear-0': 'linear-gradient(0deg, var(--tw-gradient-stops))',
        'linear-45': 'linear-gradient(45deg, var(--tw-gradient-stops))',
        'linear-135': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'linear-180': 'linear-gradient(180deg, var(--tw-gradient-stops))',
        'linear-225': 'linear-gradient(225deg, var(--tw-gradient-stops))',
        'linear-360': 'linear-gradient(360deg, var(--tw-gradient-stops))',
        'conic-gradient': 'conic-gradient( red, orange, yellow, green, blue, indigo, violet,red)',
      }),
      keyframes: {
        spin: {
          to: {
            transform: 'rotate(360deg)',
          },
        },
        rotate: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "100%": { transform: "rotate(-360deg) scale(1)" },
        },
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
        'rotate': 'rotate 4s linear infinite',
      },
      fontFamily: {
        roboto: ['"Roboto"', 'sans-serif'],
        rethink: ['"Rethink"', 'sans-serif']
      },
      fontWeight: {
        light: 300,
        normal: 400,
        semibold: 500,
        bold: 700,
        heavy: 900,
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '13': '3.1rem',
        '15': '3.75rem',
        '18': '4.8rem',
        '30': '7.4rem',
        '34': '8.25rem',
        '42': '10.5rem',
        '45': '11.1rem',
        '50': '12.75rem',
        '62': '15.8rem',
        '68': '17.25rem',
        '76': '19.5rem',
        '82': '20.1rem',
        '88': '23.6rem',
        '90': '24.4rem',
        '98': '29.8rem',
        '100': '32.6rem',
        '110': '36.1rem',
        '120': '37.1rem',
        '130': '48.6rem',
        '140': '54.9rem',


      },
    },
  },
  plugins: [],
}
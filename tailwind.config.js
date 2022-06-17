/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
        workSans: ['Work Sans'],
      },
      colors: {
        blue1: '#038BF4',
        indigo1: '#474E6D',
        defaultBg: '#F9F9F9',
        cardStroke: '#E8E8E8',
      },
    },
  },
  plugins: [],
}

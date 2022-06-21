/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
        workSans: ['Work Sans'],
        roboto: ['Roboto'],
      },
      colors: {
        blue1: '#038BF4',
        blue2: '#0173CC',
        gray1: '#7B99B6',
        gray2: '#E3ECF4',
        gray3: '#BACBDB',
        indigo1: '#474E6D',
        defaultBg: '#F9F9F9',
        cardStroke: '#E8E8E8',
        vanilla1: '#f5f5f5',
        black1: '#404040',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "ui-perfect": "0px 25px 80px rgba(0, 0, 0, 0.15)",
        "ui-bold": "0px 15px 20px rgba(0, 0, 0, 0.2);",
      },
      screens: {
        'phone': '375px',
        'iphone': '414px',
      },
      gridAutoRows: {
        'min-180-auto': 'minmax(180px, auto)',
      },
      gridAutoColumns: {
        'min-180-auto': 'minmax(180px, auto)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};

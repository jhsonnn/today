/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        todayPink: "#ED7B9C",
        todayPurple: "#847BED",
        todayBlue: "#4E91FC",
        todayNavy: "#3B475A",
        todayOrange: "#FCAA430",
        todayGreen: "#72C18E",
        todayRed: "#F95F5F",
        todayGray: "#79889B",
      },
    },
  },
  plugins: [],
};

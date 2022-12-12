/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {},
      maxWidth: { "4xl": "867px" },

      colors: {
        primary: "#415ADA",
        secondary: "#1D2452",
        grey: {
          100: "#1d245280",
          200: "#DDDEE5",
          300: "#676F8F",
          400: "#1d2452",
        },
        border: {
          100: "rgba(29, 36, 82, 0.1)",
          300: "rgba(29, 36, 82, 0.3)",
        },
        red: {
          100: "#F5455A",
        },
      },
    },
  },
  plugins: [],
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F5BD10",
          100: "#FFEBAE",
        },
        gray: {
          100: "#dedeee",
        },
        dark: {
          DEFAULT: "#010101",
          100: "#5e5e5e",
          200: "#202125",
          300: "#16181d",
          400: "#0f1115",
          500: "#0a0b0e",
        },
      },
    },
  },
  plugins: [],
};


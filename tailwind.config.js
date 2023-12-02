/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        "2xl": "1320px",
      },
    },
    container: {
      center: true,
      padding: "16px",
    },
  },
  plugins: [],
};

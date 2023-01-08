/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
      },
      blur: {
        xs: "2px",
      },
      brightness: {
        25: ".25",
        175: "1.75",
      },
    },
  },
  plugins: [],
};

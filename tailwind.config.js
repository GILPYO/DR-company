/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  screens: {
    mobile: "320px",
    md: "768px",
    pc: "1280",
  },
  theme: {
    extend: {
      colors: {
        main: "#2565AE",
        second: "#10336D",
        mainText: "#121212",
        text1: "#363636",
        text2: "#888888",
        text3: "#E3E3E3",
        text4: "#F5F5F5",
      },
      screens: {
        mobile: { max: "768px" },
        tablet: { min: "769px", max: "1279px" },
        pc: { min: "1280px" },
      },
    },
  },
  plugins: [],
};

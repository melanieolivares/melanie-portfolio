/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0F0F10",
        accent: "#AEC1FF",
        text: "#FAF9F6",
      },
    },
    letterSpacing: {
      tightest: "-.075em",
      tighter: "-.05em",
      tight: "-.025em",
      normal: "0",
      wide: ".025em",
      wider: ".05em",
      widest: ".1em",
      widex1: ".25em",
      widex2: ".5em",
      widex3: ".75em",
    },
  },
  plugins: [],
};

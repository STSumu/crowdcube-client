import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        matteGreen: "#2F4F4F",
        forestMatte: "#3E8E41",
        lightMatte: "#E6F4EA",
        matteBeige: "#C4A484",
      },
    },
  },
  plugins: [daisyui],
};

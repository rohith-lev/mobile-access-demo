import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#F47B20",
          50: "#FFF1DF",
          100: "#FFE4BF",
          500: "#F47B20",
          600: "#D96A10",
          700: "#B85A0A",
        },
        cream: "#FFF1DF",
        brand: {
          orange: "#F47B20",
          cream: "#FFF1DF",
          black: "#171717",
          grey: "#777777",
          bg: "#FAFAFA",
          border: "#EEEEEE",
        },
      },
      fontFamily: {
        heading: ["Plus Jakarta Sans", "sans-serif"],
        righteous: ["Plus Jakarta Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

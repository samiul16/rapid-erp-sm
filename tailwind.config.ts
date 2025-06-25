import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: colors.blue[400],
        brandHover: colors.blue[600],
      },
    },
  },
  plugins: [],
};

export default config;

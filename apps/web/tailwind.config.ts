import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      backgroundColor: {
        DEFAULT: "var(--background)",
      },
      textColor: {
        DEFAULT: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;

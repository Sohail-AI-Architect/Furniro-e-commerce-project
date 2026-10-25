import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#B88E2F",
        "gold-soft": "#E89F71",
        cream: "#FFF3E3",
        "cream-soft": "#FCF8F3",
        mist: "#F4F5F7",
        ink: "#3A3A3A",
        muted: "#898989",
        "muted-dark": "#616161",
        "muted-light": "#9F9F9F",
        line: "#B0B0B0",
        sale: "#E97171",
        new: "#2EC1AC",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 40px -10px rgba(58, 58, 58, 0.15)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;

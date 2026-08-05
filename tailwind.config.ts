import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // هوية الأكاديمية البصرية
        primary: {
          DEFAULT: "#0F6B4B", // أخضر زمردي
          dark: "#0B4F38",
        },
        secondary: {
          DEFAULT: "#D4AF37", // ذهبي
        },
        bg: {
          DEFAULT: "#FAFAF7",
          dark: "#0B1613",
        },
      },
      fontFamily: {
        display: ["Amiri", "serif"],
        body: ["Tajawal", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "spin-slow": "spin 120s linear infinite",
        "spin-slow-reverse": "spin 150s linear infinite reverse",
      },
    },
  },
  plugins: [],
};

export default config;

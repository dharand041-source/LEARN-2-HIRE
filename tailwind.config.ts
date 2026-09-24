import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: {
          DEFAULT: "#0E1626",
          subtle: "#070B14",
          card: "#111B33",
          navy: "#192A56",
          hover: "#1E3368",
          active: "#243E7F",
          border: "rgba(252, 251, 251, 0.08)",
          "border-strong": "rgba(252, 251, 251, 0.16)",
          "border-champagne": "rgba(247, 215, 148, 0.25)",
          "border-rose": "rgba(237, 166, 163, 0.25)",
        },
        navy: {
          950: "#060B17",
          900: "#0B132B",
          850: "#101B3B",
          800: "#192A56",
          700: "#223B77",
          600: "#2F50A0",
          500: "#416BCB",
          400: "#688DE0",
        },
        champagne: {
          DEFAULT: "#F7D794",
          50: "#FDF9F0",
          100: "#FAF1DE",
          200: "#F7D794",
          300: "#EFC876",
          400: "#E3B552",
          500: "#C99A31",
          muted: "rgba(247, 215, 148, 0.15)",
          glow: "rgba(247, 215, 148, 0.08)",
        },
        rose: {
          DEFAULT: "#EDA6A3",
          50: "#FCF3F3",
          100: "#F7E1E0",
          200: "#EDA6A3",
          300: "#DF827E",
          400: "#CE5D59",
          muted: "rgba(237, 166, 163, 0.15)",
        },
        pearl: {
          DEFAULT: "#FCFBFB",
          primary: "#FCFBFB",
          muted: "#94A3B8",
          subtle: "#64748B",
          dark: "#334155",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      backgroundImage: {
        "subtle-grid": "linear-gradient(to right, rgba(252, 251, 251, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(252, 251, 251, 0.03) 1px, transparent 1px)",
        "navy-gradient": "linear-gradient(180deg, #192A56 0%, #0B132B 100%)",
        "surface-gradient": "linear-gradient(180deg, rgba(25, 42, 86, 0.6) 0%, rgba(11, 19, 43, 0.8) 100%)",
        "gold-gradient": "linear-gradient(135deg, #F7D794 0%, #EFC876 100%)",
      },
      boxShadow: {
        "card-subtle": "0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(252, 251, 251, 0.06)",
        "card-hover": "0 8px 30px -4px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(247, 215, 148, 0.25)",
        "card-navy": "0 10px 40px -10px rgba(25, 42, 86, 0.5), 0 0 0 1px rgba(252, 251, 251, 0.08)",
        "gold-btn": "0 2px 14px 0 rgba(247, 215, 148, 0.25)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#000F08",
        night: {
          DEFAULT: "#000F08",
          950: "#000F08",
          900: "#051A10",
          800: "#0A2518",
          700: "#133524",
          600: "#1E4733",
          500: "#2B5C44",
          400: "#3D755A",
          muted: "#52605A",
          light: "#F5F5F5",
        },
        imperial: {
          DEFAULT: "#FB3640",
          50: "#FFF1F2",
          100: "#FFE1E3",
          200: "#FFC7CB",
          300: "#FFA0A6",
          400: "#FF6B74",
          500: "#FB3640",
          600: "#E02933",
          700: "#BC1D26",
          800: "#9C1B22",
          900: "#821B21",
          muted: "rgba(251, 54, 64, 0.12)",
          tint: "rgba(251, 54, 64, 0.05)",
          border: "rgba(251, 54, 64, 0.25)",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          card: "#FFFFFF",
          subtle: "#F5F5F5",
          alt: "#FAFAFA",
          dark: "#000F08",
          border: "#E5E7EB",
          "border-dark": "#000F08",
          "border-imperial": "rgba(251, 54, 64, 0.3)",
        },
        muted: {
          DEFAULT: "#52605A",
          dark: "#000F08",
          light: "#8C9B94",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        "card-subtle": "0 2px 12px rgba(0, 15, 8, 0.04), 0 0 0 1px #E5E7EB",
        "card-hover": "0 8px 30px rgba(0, 15, 8, 0.08), 0 0 0 1px rgba(251, 54, 64, 0.35)",
        "card-dark": "0 10px 40px rgba(0, 15, 8, 0.25)",
        "imperial-btn": "0 2px 10px rgba(251, 54, 64, 0.25)",
        "night-btn": "0 2px 10px rgba(0, 15, 8, 0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.25s ease-out forwards",
        "slide-up": "slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

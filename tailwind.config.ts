import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          main: "#0B4FFF",
          hover: "#113fd9",
          transparent1: "#eff6ff",
          transparent2: "#dbeafe",
        },
        error: {
          main: "#ef4444",
          hover: "#dc2626",
          transparent1: "#fef2f2",
          transparent2: "#fee2e2",
        },
        warning: {
          main: "#f59e0b",
          hover: "#d97706",
          transparent1: "#fffbeb",
          transparent2: "#fef3c7",
        },
        success: {
          main: "#22c55e",
          hover: "#16a34a",
          transparent1: "#f0fdf4",
          transparent2: "#dcfce7",
        },
        info: {
          main: "#0ea5e9",
          hover: "#0284c7",
          transparent1: "#f0f9ff",
          transparent2: "#e0f2fe",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          1000: "#030712",
        },
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          1000: "#020617",
        },
      },
      fontSize: {
        base: "13.5px",
        xs: "11px",
        sm: "12px",
        md: "14.5px",
        lg: "16px",
      },

      screens: {
        xs: "420px",
        // => @media (min-width: 420px) { ... }
        sm2: "500px",
        // => @media (min-width: 500px) { ... }

        md2: "868px",
        // => @media (min-width: 868px) { ... }

        lg2: "1124px",
        // => @media (min-width: 1124px) { ... }
      },
    },
  },
  plugins: [],
};
export default config;

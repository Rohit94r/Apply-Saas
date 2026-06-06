import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(16, 42, 68, 0.1)",
        button: "0 12px 28px rgba(20, 130, 120, 0.28)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "0.9" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "pulse-line": "pulseLine 3.5s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;

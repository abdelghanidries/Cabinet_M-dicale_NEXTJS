import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F9FA",       // Fond global
        foreground: "#1F2937",       // Texte principal

        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1F2937"
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#1F2937"
        },

        primary: {
          DEFAULT: "#3A6EA5",        // Bleu apaisant
          foreground: "#FFFFFF"
        },
        secondary: {
          DEFAULT: "#5DA399",        // Vert calme
          foreground: "#FFFFFF"
        },
        accent: {
          DEFAULT: "#9C89B8",        // Violet élégant
          foreground: "#FFFFFF"
        },
        muted: {
          DEFAULT: "#E5E7EB",        // Texte secondaire
          foreground: "#6B7280"
        },
        destructive: {
          DEFAULT: "#D9534F",        // Erreur
          foreground: "#FFFFFF"
        },
        success: "#3CB371",          // Validation
        warning: "#F0AD4E",          // Alerte

        border: "#D1D5DB",           // Contours
        input: "#E5E7EB",            // Champs
        ring: "#3A6EA5",             // Focus/anneaux

        chart: {
          "1": "#3A6EA5",
          "2": "#5DA399",
          "3": "#9C89B8",
          "4": "#3CB371",
          "5": "#F0AD4E"
        }
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

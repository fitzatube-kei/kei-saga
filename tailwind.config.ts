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
        background: "#393D5E",
        surface: "#2e3150",
        gold: "#d4a017",
        goldLight: "#f0c040",
        accent: "#8b5cf6",
        danger: "#ef4444",
        success: "#22c55e",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-kr)", "sans-serif"],
      },
      boxShadow: {
        "rpg-glow": "0 0 15px rgba(212, 160, 23, 0.3)",
        "rpg-glow-lg": "0 0 30px rgba(212, 160, 23, 0.4)",
        "rpg-accent": "0 0 15px rgba(139, 92, 246, 0.3)",
      },
      backgroundImage: {
        "rpg-gradient": "linear-gradient(135deg, #2e3150 0%, #393D5E 100%)",
        "gold-gradient": "linear-gradient(135deg, #d4a017 0%, #f0c040 100%)",
      },
      borderColor: {
        DEFAULT: "#2a2a3e",
      },
      animation: {
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
      },
      keyframes: {
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(212, 160, 23, 0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(212, 160, 23, 0.5)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

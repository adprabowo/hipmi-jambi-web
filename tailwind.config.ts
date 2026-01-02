import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // PENTING: Kita tambahkan './src' karena folder app dan components sekarang ada di sana
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hipmi: {
          green: "#004225", // Hijau Tua
          gold: "#D4AF37",  // Emas
          neutral: "#1A1A1A", 
          gray: "#6B7280",
          light: "#F3F4F6", 
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
      },
    },
  },
  plugins: [],
};
export default config;
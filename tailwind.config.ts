import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        serif: ["var(--font-playfair)", ...fontFamily.serif],
      },
      // ================= PERUBAHAN WARNA DI SINI =================
      colors: {
        hipmi: {
          // WARNA AKSEN (Hanya untuk Tombol & Link)
          green: {
            DEFAULT: "#1278f8", // Vivid Blue (Tetap)
            dark: "#0b5ed7",    
            light: "#eff6ff",   
          },
          gold: {
            DEFAULT: "#ea0001", // Vivid Red (Tetap)
            dark: "#c40001",    
            light: "#fef2f2",   
          },

          // WARNA TEKS UTAMA (Ubah jadi Hitam Pekat)
          neutral: {
            DEFAULT: "#050505", // Hitam (Sebelumnya abu tua)
            light: "#f3f4f6",   // Abu sangat muda
            dark: "#000000",    // Hitam Absolut
          },
          gray: "#525252", // Abu-abu medium untuk teks paragraf
        },
      },
       // ============================================================
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
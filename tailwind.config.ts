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
          // WARNA PRIMER BARU (VIVID BLUE) - Menggantikan Hijau
          // Digunakan untuk: Header links, Tombol Utama, Footer Background, Teks penting
          green: {
            DEFAULT: "#1278f8", // Biru Vivid Utama
            dark: "#0e5ebf",    // Biru sedikit lebih gelap untuk efek hover
            light: "#eef6ff",   // Biru sangat muda untuk background tipis
          },

          // WARNA SEKUNDER BARU (VIVID RED) - Menggantikan Emas
          // Digunakan untuk: Aksen, Tombol sekunder, Badges, Highlights
          gold: {
            DEFAULT: "#ea0001", // Merah Vivid Utama
            dark: "#c40001",    // Merah sedikit lebih gelap untuk hover
            light: "#fff1f1",   // Merah sangat muda untuk background tipis
          },

          // Warna Netral (Teks Gelap) - Tetap sama agar kontras terjaga
          neutral: {
            DEFAULT: "#1a1a1a",
            light: "#f8f9fa", // Background putih/abu terang (Mayoritas website)
          },
          // Warna abu-abu untuk teks pendukung
          gray: "#666666",
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
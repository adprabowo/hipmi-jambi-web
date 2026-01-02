import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

export const metadata: Metadata = {
  title: "Badan Kajian Strategis BPD HIPMI Jambi",
  description: "Pusat analisis strategis pengembangan kewirausahaan dan prospek ekonomi daerah Provinsi Jambi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* PERBAIKAN: Tambahkan suppressHydrationWarning={true} di sini juga */}
      <body 
        suppressHydrationWarning={true}
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-hipmi-neutral flex flex-col min-h-screen`}
      >
        
        {/* Header (Menu Atas) */}
        <Header />
        
        {/* Konten Utama */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer (Bagian Bawah) */}
        <Footer />
        
      </body>
    </html>
  );
}
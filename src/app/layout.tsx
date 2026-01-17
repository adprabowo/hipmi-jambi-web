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
  title: {
    default: "Bakastra - Badan Kajian Strategis BPD HIPMI Jambi",
    template: "%s | Bakastra HIPMI Jambi",
  },
  description: "Bakastra adalah Badan Kajian Strategis BPD HIPMI Jambi - pusat analisis strategis, riset kebijakan ekonomi, dan pengembangan kewirausahaan di Provinsi Jambi.",
  keywords: [
    "Bakastra",
    "Bakastra HIPMI Jambi",
    "Badan Kajian Strategis",
    "Badan Kajian Strategis HIPMI",
    "Badan Kajian Strategis HIPMI Jambi",
    "BPD HIPMI Jambi",
    "HIPMI Jambi",
    "Pengusaha Muda Jambi",
    "Riset Ekonomi Jambi",
    "Kajian Strategis Jambi",
    "Think Tank Jambi",
    "Kewirausahaan Jambi",
  ],
  authors: [{ name: "Bakastra BPD HIPMI Jambi" }],
  creator: "Badan Kajian Strategis BPD HIPMI Jambi",
  publisher: "HIPMI Jambi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://bakastrahipmijambi.vercel.app",
    siteName: "Bakastra HIPMI Jambi",
    title: "Bakastra - Badan Kajian Strategis BPD HIPMI Jambi",
    description: "Pusat analisis strategis, riset kebijakan ekonomi, dan pengembangan kewirausahaan di Provinsi Jambi.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bakastra - Badan Kajian Strategis BPD HIPMI Jambi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bakastra - Badan Kajian Strategis BPD HIPMI Jambi",
    description: "Pusat analisis strategis, riset kebijakan ekonomi, dan pengembangan kewirausahaan di Provinsi Jambi.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://bakastrahipmijambi.vercel.app",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // Ganti setelah daftar Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Structured Data (JSON-LD) for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Badan Kajian Strategis BPD HIPMI Jambi",
              alternateName: ["Bakastra", "Bakastra HIPMI Jambi", "Bakastra BPD HIPMI Jambi"],
              url: "https://bakastrahipmijambi.vercel.app",
              logo: "https://bakastrahipmijambi.vercel.app/logobakastra.png",
              description: "Badan Kajian Strategis BPD HIPMI Jambi adalah pusat analisis strategis dan riset kebijakan ekonomi untuk pengembangan kewirausahaan di Provinsi Jambi.",
              foundingDate: "2024",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jl. Mayjen Jusuf Singedekane",
                addressLocality: "Telanaipura",
                addressRegion: "Jambi",
                postalCode: "36122",
                addressCountry: "ID",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+62-741-1234-5678",
                contactType: "customer service",
                email: "info@bakastra.hipmijambi.co.id",
              },
              sameAs: [
                "https://instagram.com/bakastrahipmijambi",
                "https://facebook.com/bakastrahipmijambi",
                "https://linkedin.com/company/bakastra-hipmi-jambi",
              ],
            }),
          }}
        />
      </head>
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
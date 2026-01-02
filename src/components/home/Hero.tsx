import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative z-10 bg-hipmi-gold text-white min-h-[600px] flex items-center">
      {/* Background Pattern (Opsional: Overlay gelap agar teks terbaca) */}
      {/* <div className="absolute inset-0 bg-black/20 z-0"></div>*/}
      
      <div className="container mx-auto px-4 relative z-10 py-12">
        <div className="max-w-3xl">
          <div className="inline-block px-4 py-1.5 bg-white/75 text-hipmi-neutral rounded-full text-sm font-semibold mb-6 border border-hipmi-gold/30">
            Pusat Analisis & Kajian Strategis
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Membangun Ekonomi Jambi Melalui <span className="text-white">Data & Kewirausahaan</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
            Menyediakan riset mendalam, analisis kebijakan, dan wawasan strategis untuk pengusaha muda dan pemangku kepentingan di Provinsi Jambi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/publikasi" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-hipmi-green hover:bg-gray-100 transition"
            >
              Baca Riset Terbaru
            </Link>
            <Link 
              href="/tentang-kami" 
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition"
            >
              Tentang Kami <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
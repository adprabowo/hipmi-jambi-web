"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamic import for 3D component (SSR disabled)
const BrainAnimation = dynamic(() => import("./BrainAnimation"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-hipmi-green/30 border-t-hipmi-green rounded-full animate-spin" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative z-10 bg-hipmi-green text-white min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-hipmi-green rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1.5 bg-white/75 text-hipmi-neutral rounded-full text-sm font-semibold mb-6 border border-hipmi-gold/30">
              Pusat Analisis &amp; Kajian Strategis
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
              Membangun Ekonomi Jambi Melalui <span className="text-white">Data &amp; Kewirausahaan</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
              Menyediakan riset mendalam, analisis kebijakan, dan wawasan strategis untuk pengusaha muda dan pemangku kepentingan di Provinsi Jambi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/publikasi"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-hipmi-gold hover:bg-hipmi-gold-dark transition shadow-lg"
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
          </motion.div>

          {/* Right Side - 3D Brain Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:block h-[500px]"
          >
            <BrainAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
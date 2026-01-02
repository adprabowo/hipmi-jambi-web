"use client";

import { useState } from "react";
import Link from "next/link";
// PERUBAHAN: Import Image dari next/image
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";

const navigation = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Kami", href: "/tentang-kami" },
  { name: "Publikasi", href: "/publikasi" },
  { name: "Acara", href: "/acara" },
  { name: "Program", href: "/program" },
  { name: "Kontak", href: "/kontak" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* ================= PENTING: AREA LOGO & JUDUL BARU ================= */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
            
            {/* OPSI 1: Gambar Logo Utama (Gunakan ini jika file logobakastra.png sudah ada di folder public) */}
            <Image 
              src="/logobakastra.png" 
              alt="Logo Badan Kajian Strategis" 
              width={160} 
              height={40} 
              className="h-full w-auto object-contain"
            /> 
            

            {/* OPSI 2: Fallback Placeholder 'H' (Gunakan ini sementara gambar belum diupload) */}
            {/* <div className="h-10 w-10 bg-hipmi-green rounded-full flex items-center justify-center text-white font-bold">
              H 
            </div> *}

            {/* PERUBAHAN TEKS: Posisi ditukar dan styling disesuaikan */}
            {/*<div className="hidden md:block">
              <h1 className="text-lg font-serif font-bold text-hipmi-neutral leading-none">Badan Kajian Strategis</h1>
              <p className="text-sm text-hipmi-gray">BPD HIPMI Jambi</p>
            </div> */}
          </Link>
          {/* ================================================================= */}


          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-hipmi-green transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <button aria-label="Search" className="text-gray-500 hover:text-hipmi-green">
              <Search className="w-5 h-5" />
            </button>
            <Link 
              href="/dukung-kami" 
              className="bg-hipmi-green text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition"
            >
              Dukung Kami
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-hipmi-green hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              href="/dukung-kami"
              className="block w-full text-center mt-4 bg-hipmi-gold text-white px-3 py-3 rounded-md font-bold"
              onClick={() => setIsOpen(false)}
            >
              Dukung Kami
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
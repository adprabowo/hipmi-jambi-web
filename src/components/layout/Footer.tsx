import Link from "next/link";
// PERUBAHAN: Import Image, dan Hapus 'Twitter', tambahkan 'X'
import Image from "next/image";
import { Facebook, Instagram, Linkedin, X, Mail, MapPin, Phone } from "lucide-react";

// SVG Kustom untuk TikTok
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 448 512" 
    className={className}
    fill="currentColor"
  >
    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a90.92,90.92,0,1,0,90.92,90.92V37.93A255.18,255.18,0,0,0,448,209.91Z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-hipmi-gold text-white pt-16 pb-8">
        <div className="absolute inset-0 bg-black/20 z-0"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Kolom 1: Identitas */}
          <div>
            {/* Area Logo & Judul di Footer */}
            <Link href="/" className="flex items-center gap-3 mb-4">
                
                {/* OPSI 1: Gambar Logo (Aktifkan jika file sudah ada di folder public) */}
                <Image 
                  src="/logobakastra.png" 
                  alt="Logo Badan Kajian Strategis" 
                  width={160} 
                  height={40} 
                  className="h-20 w-auto object-contain brightness-0 invert"
                /> 
                

                {/* OPSI 2: Fallback Placeholder 'H' */}
                {/* <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center text-white font-bold border border-white/20">
                  H 
                </div> */}

                {/* Teks Footer */}
                {/* <div>
                    <h3 className="text-lg font-serif font-bold leading-none text-white">Badan Kajian Strategis</h3>
                    <p className="text-sm text-gray-300 mt-0.5">BPD HIPMI Jambi</p>
                </div> */}
            </Link>
            
            <p className="text-white-300 text-sm leading-relaxed mb-6">
              Pusat analisis strategis pengembangan kewirausahaan dan prospek ekonomi daerah Provinsi Jambi.
            </p>
            
            {/* PERUBAHAN: Ikon Media Sosial */}
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white-300 hover:text-hipmi-gold transition" aria-label="Instagram">
                <Instagram className="w-5 h-5"/>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white-300 hover:text-hipmi-gold transition" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5"/>
              </a>
              {/* Mengganti Twitter dengan X */}
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white-300 hover:text-hipmi-gold transition" aria-label="X (Twitter)">
                <X className="w-5 h-5"/>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white-300 hover:text-hipmi-gold transition" aria-label="Facebook">
                <Facebook className="w-5 h-5"/>
              </a>
              {/* Menambahkan TikTok */}
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white-300 hover:text-hipmi-gold transition" aria-label="TikTok">
                <TikTokIcon className="w-5 h-5"/>
              </a>
            </div>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Tautan Cepat</h4>
            <ul className="space-y-3 text-sm text-white-300">
              <li><Link href="/publikasi" className="hover:text-white transition">Publikasi Riset</Link></li>
              <li><Link href="/acara" className="hover:text-white transition">Agenda Kegiatan</Link></li>
              <li><Link href="/program" className="hover:text-white transition">Program & Beasiswa</Link></li>
              <li><Link href="/media-center" className="hover:text-white transition">Media Center</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-white-300">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-white flex-shrink-0" />
                <span>Sekretariat HIPMI Jambi, Jl. Mayjen Jusuf Singedekane, Kota Jambi, 36122</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-white flex-shrink-0" />
                <span>+62 741 1234 5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-white flex-shrink-0" />
                <span>info@bakastra.hipmijambi.co.id</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Berlangganan</h4>
            <p className="text-white-300 text-sm mb-4">Dapatkan ringkasan eksekutif dan info acara terbaru.</p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="px-4 py-2 rounded bg-white/12 border border-white/20 text-hipmi-neutral placeholder-white-400 focus:outline-none focus:border-white"
              />
              <button className="bg-hipmi-green text-white font-bold py-2 px-4 rounded hover:bg-white transition">
                Langganan
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/12 pt-8 text-center text-sm text-white-400">
          <p>&copy; {new Date().getFullYear()} Badan Kajian Strategis BPD HIPMI Jambi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
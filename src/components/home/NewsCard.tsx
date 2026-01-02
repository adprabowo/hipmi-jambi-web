import Link from "next/link";
import { Calendar, ArrowRight, Tag } from "lucide-react";

interface NewsProps {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  slug: string;
  index: number; // Kita butuh index untuk membuat variasi warna background
}

export default function NewsCard({ title, date, category, excerpt, slug, index }: NewsProps) {
  return (
    <div className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
      
      {/* 1. Bagian Visual (Pengganti Gambar) */}
      {/* Kita gunakan gradasi warna bergantian berdasarkan index ganjil/genap */}
      <div className={`h-48 w-full relative overflow-hidden flex items-center justify-center text-white ${
          index % 2 === 0 
            ? 'bg-gradient-to-br from-hipmi-green to-teal-900' 
            : 'bg-gradient-to-br from-hipmi-neutral to-gray-800'
      }`}>
        {/* Efek Hover */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
        
        {/* Tulisan Background Samar */}
        <span className="font-serif font-bold text-4xl opacity-10 transform group-hover:scale-110 transition-transform duration-700 select-none">
            HIPMI
        </span>
        
        {/* Badge Kategori */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-hipmi-green text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-sm">
            <Tag className="w-3 h-3 mr-1" /> {category}
        </div>
      </div>

      {/* 2. Bagian Konten Teks */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-gray-400 text-xs mb-3">
          <Calendar className="w-3 h-3 mr-1.5" />
          {date}
        </div>
        
        <h3 className="text-xl font-serif font-bold text-hipmi-neutral mb-3 line-clamp-2 group-hover:text-hipmi-green transition-colors">
          <Link href={`/berita/${slug}`}>
            {title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
          {excerpt}
        </p>

        {/* Link Baca Selengkapnya */}
        <Link 
            href={`/berita/${slug}`} 
            className="inline-flex items-center text-sm font-semibold text-hipmi-neutral hover:text-hipmi-green transition-colors mt-auto"
        >
            Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
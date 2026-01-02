import Hero from "@/components/home/Hero";
import NewsCard from "@/components/home/NewsCard"; // Import Komponen Baru
import { newsArticles } from "@/lib/dummy-data"; // Import Data Berita Anda
import Link from "next/link";
import { ArrowRight, FileText, Users, BarChart3, Newspaper } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Bagian Hero (Banner Utama) */}
      <Hero />

      {/* 2. Bagian Statistik Singkat */}
      <section className="relative z-10 py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Publikasi Riset", value: "10+" },
              { label: "Mitra Kolaborasi", value: "20" },
              { label: "Rekomendasi Kebijakan", value: "10" },
              { label: "Keterlibatan Ahli", value: "30+" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-serif font-bold text-hipmi-green mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Bagian Fitur / Layanan */}
      <section className="relative z-10 py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-hipmi-neutral mb-4">Fokus Kajian Kami</h2>
            <p className="text-gray-600">
              Kami berfokus pada tiga pilar utama untuk mendorong pertumbuhan ekonomi daerah yang inklusif dan berkelanjutan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: BarChart3, 
                title: "Analisis Ekonomi", 
                desc: "Pemetaan potensi sektor unggulan daerah dan proyeksi pertumbuhan makro ekonomi Jambi." 
              },
              { 
                icon: FileText, 
                title: "Kebijakan Publik", 
                desc: "Advokasi kebijakan pro-bisnis dan kajian dampak regulasi terhadap iklim investasi daerah." 
              },
              { 
                icon: Users, 
                title: "Pengembangan UMKM", 
                desc: "Strategi digitalisasi dan peningkatan kapasitas manajemen untuk pengusaha muda pemula." 
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
                <div className="w-12 h-12 bg-hipmi-green/10 text-hipmi-green rounded-lg flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-hipmi-neutral">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{item.desc}</p>
                <Link href="/program" className="text-hipmi-green font-medium hover:text-hipmi-gold inline-flex items-center">
                  Pelajari Lebih Lanjut <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION BERITA TERBARU (Updated) */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          
          {/* Header Section Berita */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-hipmi-green font-bold uppercase tracking-wider text-sm mb-2">
                    <Newspaper className="w-4 h-4" /> Berita & Kegiatan
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-hipmi-neutral">
                    Kabar Terbaru Bakastra
                </h2>
            </div>
            <Link 
                href="/berita" 
                className="hidden md:flex items-center px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-600 hover:border-hipmi-green hover:text-hipmi-green transition"
            >
                Lihat Semua Berita <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Grid Berita - Menggunakan Data newsArticles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsArticles.map((news, index) => (
              <NewsCard
                key={news.id}
                index={index} // Untuk variasi warna
                title={news.title}
                date={news.date}
                category={news.category}
                excerpt={news.excerpt}
                slug={news.slug}
              />
            ))}
          </div>

          {/* Tombol Mobile (Hanya muncul di HP) */}
          <div className="mt-8 md:hidden text-center">
             <Link 
                href="/berita" 
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-600 hover:border-hipmi-green hover:text-hipmi-green transition"
            >
                Lihat Semua Berita <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
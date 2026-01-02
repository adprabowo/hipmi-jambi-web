import Hero from "@/components/home/Hero";
import Link from "next/link";
import { ArrowRight, FileText, Users, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Bagian Hero (Banner Utama) */}
      <Hero />

      {/* 2. Bagian Statistik Singkat */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Publikasi Riset", value: "45+" },
              { label: "Mitra Kolaborasi", value: "28" },
              { label: "Rekomendasi Kebijakan", value: "12" },
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
      <section className="py-20 bg-hipmi-light/50">
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
    </div>
  );
}
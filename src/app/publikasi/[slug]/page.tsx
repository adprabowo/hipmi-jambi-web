import { publications } from "@/lib/dummy-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Download, Calendar, Users } from "lucide-react";

// 1. Definisikan tipe Params sebagai Promise (Wajib di Next.js 15/16)
interface PageProps {
  params: Promise<{ slug: string }>;
}

// 2. Ubah komponen menjadi 'async'
export default async function PublicationDetailPage(props: PageProps) {
  
  // 3. Lakukan 'await' untuk mendapatkan slug yang sebenarnya
  const params = await props.params;
  const slug = params.slug;

  // Cari data berdasarkan slug
  const pub = publications.find((item) => item.slug === slug);

  // Jika tidak ditemukan, arahkan ke 404
  if (!pub) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Gelap */}
      <div className="bg-neutral-900 text-white py-16">
        <div className="container mx-auto px-4">
            <Link href="/publikasi" className="text-gray-400 hover:text-white flex items-center mb-8 transition">
                <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Perpustakaan
            </Link>
            
            <div className="max-w-4xl">
                <div className="inline-block px-3 py-1 bg-hipmi-green text-white text-xs font-bold rounded mb-4">
                    {pub.category}
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-6">
                    {pub.title}
                </h1>
                
                <div className="flex flex-wrap gap-6 text-gray-300 text-sm">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" /> {pub.date}
                    </div>
                    <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" /> Tim Riset Bakastra
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
            {/* Kolom Kiri: Ringkasan */}
            <div className="lg:w-2/3">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ringkasan Eksekutif</h2>
                <div className="prose text-gray-600 leading-relaxed">
                    <p className="text-lg font-medium text-gray-800 mb-4">{pub.excerpt}</p>
                    <p>
                        Dokumen ini berisi analisis mendalam mengenai judul di atas. 
                        Riset dilakukan dengan metode pengumpulan data primer dan sekunder di wilayah Provinsi Jambi, 
                        bertujuan untuk memberikan rekomendasi kebijakan yang berbasis data (Evidence-based Policy).
                    </p>
                    <p className="mt-4">
                        Untuk mendapatkan akses ke data mentah atau berdiskusi lebih lanjut mengenai temuan ini, 
                        silakan hubungi tim sekretariat kami melalui halaman kontak.
                    </p>
                </div>
            </div>

            {/* Kolom Kanan: Sidebar Download */}
            <div className="lg:w-1/3">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 sticky top-24">
                    <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-4 shadow-sm">
                        <FileText className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">Dokumen Lengkap</h3>
                    <p className="text-sm text-gray-500 mb-6">Format PDF • Bahasa Indonesia</p>
                    
                    <button className="w-full py-3 bg-hipmi-green text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md">
                        <Download className="w-4 h-4" /> Download PDF
                    </button>
                    
                    <p className="text-xs text-gray-400 mt-4 text-center">
                        *Hanya untuk anggota terdaftar
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
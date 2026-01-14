import Link from "next/link";
import { Download, Newspaper, Mail, Phone } from "lucide-react";
import { db } from "@/db";
import { news } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

async function getLatestNews() {
  return await db
    .select()
    .from(news)
    .where(eq(news.published, true))
    .orderBy(desc(news.createdAt))
    .limit(3);
}

export default async function MediaCenterPage() {
  const latestNews = await getLatestNews();

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-neutral-900 text-white py-20 relative overflow-hidden z-0">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Media Center</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Pusat informasi, siaran pers, dan aset brand resmi untuk kebutuhan publikasi media dan mitra kerja.
          </p>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="relative z-10 bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold text-hipmi-neutral mb-8 flex items-center gap-2">
            <Download className="w-6 h-6 text-hipmi-gold" /> Brand Assets
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Asset 1: Logo Utama */}
            <div className="border border-gray-200 rounded-xl p-6 text-center hover:border-hipmi-green transition">
              <div className="h-32 flex items-center justify-center bg-gray-50 rounded-lg mb-4">
                <span className="font-bold text-hipmi-neutral text-xl">LOGO <span className="text-hipmi-green">BAKASTRA</span></span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Logo Utama (Full Color)</h3>
              <p className="text-xs text-gray-500 mb-4">Format: PNG (Transparent), JPG</p>
              <div className="flex justify-center gap-3">
                <a href="/logobakastra.jpg" download className="px-4 py-2 text-xs font-bold bg-hipmi-green text-white rounded hover:bg-blue-700 transition">
                  Download JPG
                </a>
              </div>
            </div>

            {/* Asset 2: Logo Putih */}
            <div className="border border-gray-200 rounded-xl p-6 text-center hover:border-hipmi-green transition">
              <div className="h-32 flex items-center justify-center bg-hipmi-green rounded-lg mb-4">
                <span className="font-bold text-white text-xl">LOGO <span className="text-white/80">PUTIH</span></span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Logo Sekunder (White)</h3>
              <p className="text-xs text-gray-500 mb-4">Format: PNG (Transparent)</p>
              <div className="flex justify-center gap-3">
                <button disabled className="px-4 py-2 text-xs font-bold bg-gray-200 text-gray-400 rounded cursor-not-allowed">
                  Segera Hadir
                </button>
              </div>
            </div>

            {/* Asset 3: Company Profile */}
            <div className="border border-gray-200 rounded-xl p-6 text-center hover:border-hipmi-green transition">
              <div className="h-32 flex items-center justify-center bg-gray-50 rounded-lg mb-4">
                <Newspaper className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Company Profile 2026</h3>
              <p className="text-xs text-gray-500 mb-4">Format: PDF Document</p>
              <div className="flex justify-center gap-3">
                <button disabled className="px-4 py-2 text-xs font-bold bg-gray-200 text-gray-400 rounded cursor-not-allowed">
                  Segera Hadir
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases List */}
      <section className="relative z-10 bg-gray-50 py-20 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold text-hipmi-neutral mb-8">Siaran Pers Terbaru</h2>
          <div className="space-y-4">
            {latestNews.length > 0 ? (
              latestNews.map((newsItem) => (
                <div key={newsItem.id} className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition">
                  <div>
                    <span className="text-xs font-bold text-hipmi-green bg-blue-50 px-2 py-1 rounded mb-2 inline-block">PRESS RELEASE</span>
                    <h3 className="text-lg font-bold text-gray-900">
                      <Link href={`/berita/${newsItem.slug}`} className="hover:text-hipmi-green transition">
                        {newsItem.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500">{newsItem.date}</p>
                  </div>
                  <Link href={`/berita/${newsItem.slug}`} className="flex-shrink-0 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                    Baca Rilis
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                Belum ada siaran pers.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Kontak Media */}
      <section className="relative z-10 bg-white py-20 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif font-bold text-hipmi-neutral mb-4">Kontak Hubungan Media</h2>
          <p className="text-gray-600 mb-8">Untuk wawancara, konfirmasi data, atau undangan liputan.</p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a href="mailto:media@bakastra.hipmijambi.co.id" className="flex items-center justify-center gap-2 px-6 py-3 bg-hipmi-neutral text-white rounded-lg hover:bg-black transition">
              <Mail className="w-4 h-4" /> media@bakastra.hipmijambi.co.id
            </a>
            <a href="tel:+6274112345678" className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              <Phone className="w-4 h-4" /> +62 741 1234 5678 (Humas)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
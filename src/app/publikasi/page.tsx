import { publications } from "@/lib/dummy-data";
import PublicationCard from "@/components/shared/PublicationCard";
import { Search, Filter } from "lucide-react";

// PERBAIKAN: Pastikan menggunakan 'export default function'
export default function PublicationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-serif font-bold text-hipmi-neutral mb-4">Perpustakaan Riset</h1>
            <p className="text-lg text-gray-600 mb-8">
              Akses koleksi lengkap analisis kebijakan, laporan ekonomi, dan jurnal riset kami.
            </p>
            
            {/* Search Bar UI */}
            <div className="flex gap-4">
              <div className="relative flex-grow">
                <input 
                  type="text" 
                  placeholder="Cari judul riset atau topik..." 
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-hipmi-green focus:ring-1 focus:ring-hipmi-green"
                />
                <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              </div>
              <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-5 h-5" /> Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((pub) => (
            <PublicationCard
              key={pub.id}
              title={pub.title}
              category={pub.category}
              date={pub.date}
              excerpt={pub.excerpt}
              slug={pub.slug}
            />
          ))}
        </div>
        
        {/* Pagination Dummy */}
        <div className="mt-16 flex justify-center">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 text-gray-600">Sebelumnya</button>
            <button className="px-4 py-2 bg-hipmi-green text-white border border-hipmi-green">1</button>
            <button className="px-4 py-2 bg-white border-t border-b border-r border-gray-300 hover:bg-gray-50 text-gray-600">2</button>
            <button className="px-4 py-2 bg-white border-t border-b border-r border-gray-300 hover:bg-gray-50 text-gray-600">3</button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 text-gray-600">Selanjutnya</button>
        </div>
      </div>
    </div>
  );
}
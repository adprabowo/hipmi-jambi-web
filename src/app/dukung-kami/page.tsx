import { Handshake, Building2, CreditCard, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="bg-hipmi-gold text-white py-20 relative z-10">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Dukung Riset Kami</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Berkontribusi dalam pembangunan ekonomi Jambi melalui dukungan terhadap riset independen dan pengembangan kapasitas pengusaha muda.
          </p>
        </div>
      </section>

      {/* Pilihan Dukungan */}
      <section className="relative z-10 bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            {/* Opsi 1: Partnership */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 bg-blue-100 text-hipmi-green rounded-xl flex items-center justify-center mb-6">
                <Handshake className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-hipmi-neutral mb-4">Kemitraan Strategis</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Cocok untuk instansi pemerintah, BUMN, atau perusahaan swasta yang ingin berkolaborasi dalam riset kebijakan atau program pengembangan UMKM.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-hipmi-gold"/> Co-Branding Riset & Event</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-hipmi-gold"/> Akses Data Eksklusif</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-hipmi-gold"/> Slot Pembicara Utama</li>
              </ul>
              <Link href="/kontak" className="block w-full text-center py-3 bg-hipmi-green text-white font-bold rounded-lg hover:bg-blue-700 transition">
                Ajukan Kemitraan
              </Link>
            </div>

            {/* Opsi 2: Sponsorship */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 bg-red-100 text-hipmi-gold rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-hipmi-neutral mb-4">Sponsorship Program</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Dukungan pendanaan untuk satu kali kegiatan (seminar, workshop, atau peluncuran buku) dengan benefit eksposur brand yang maksimal.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-hipmi-gold"/> Logo Placement</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-hipmi-gold"/> Booth Pameran</li>
                <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-hipmi-gold"/> Ad-libs & Media Mention</li>
              </ul>
              <Link href="/kontak" className="block w-full text-center py-3 bg-hipmi-gold text-white font-bold rounded-lg hover:bg-red-700 transition">
                Hubungi Tim Sponsor
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Section Rekening (Opsional) */}
      <section className="relative z-10 bg-gray-50 py-20 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-serif font-bold text-hipmi-neutral mb-8">Rekening Resmi Organisasi</h2>
            <div className="inline-flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-gray-600"/>
                </div>
                <div className="text-left">
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">Bank Jambi (BPD Jambi)</p>
                    <p className="text-2xl font-mono font-bold text-hipmi-neutral tracking-wider">123-456-7890</p>
                    <p className="text-sm text-gray-600">a.n. Badan Kajian Strategis HIPMI Jambi</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
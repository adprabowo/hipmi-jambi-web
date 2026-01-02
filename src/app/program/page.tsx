import { programs } from "@/lib/dummy-data";
import { GraduationCap, Briefcase, Database, ArrowRight, CheckCircle2 } from "lucide-react";

// Mapping string icon dari dummy-data ke komponen Lucide
const iconMap: { [key: string]: any } = {
  "GraduationCap": GraduationCap,
  "Briefcase": Briefcase,
  "Database": Database
};

export default function ProgramPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-hipmi-green text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Program Unggulan</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Inisiatif strategis kami untuk mendukung pertumbuhan ekosistem kewirausahaan dan peningkatan kapasitas SDM di Jambi.
          </p>
        </div>
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-hipmi-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </section>

      {/* Program Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const IconComponent = iconMap[program.icon] || Briefcase;
              
              return (
                <div key={program.id} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col relative overflow-hidden group">
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${
                    program.status === 'Buka' || program.status === 'Aktif' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {program.status}
                  </div>

                  <div className="w-14 h-14 bg-hipmi-light rounded-xl flex items-center justify-center text-hipmi-green mb-6 group-hover:bg-hipmi-green group-hover:text-white transition-colors">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold text-hipmi-neutral mb-3">
                    {program.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                    {program.description}
                  </p>

                  <button className="w-full py-3 border border-hipmi-green text-hipmi-green font-semibold rounded-lg hover:bg-hipmi-green hover:text-white transition flex items-center justify-center gap-2">
                    Daftar Sekarang <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="bg-hipmi-neutral rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl font-serif font-bold mb-4">Ingin Berkolaborasi?</h2>
              <p className="text-gray-300 mb-6">
                Kami terbuka untuk kemitraan strategis dalam pengembangan program baru bersama institusi pendidikan dan korporasi.
              </p>
              <ul className="space-y-2 mb-0">
                <li className="flex items-center gap-2"><CheckCircle2 className="text-hipmi-gold w-5 h-5"/> Sponsorship Program</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-hipmi-gold w-5 h-5"/> Tenaga Ahli & Mentor</li>
              </ul>
            </div>
            <div className="relative z-10">
              <a href="/kontak" className="inline-block px-8 py-4 bg-hipmi-gold text-hipmi-neutral font-bold rounded-lg hover:bg-white transition shadow-lg shadow-hipmi-gold/20">
                Hubungi Kami
              </a>
            </div>
            {/* Pattern */}
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/5 to-transparent"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
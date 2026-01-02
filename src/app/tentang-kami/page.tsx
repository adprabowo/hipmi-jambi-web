// PERBAIKAN: Import data baru (bpdHipmiLeaders & bakastraLeaders)
import { organizationInfo, bpdHipmiLeaders, bakastraLeaders } from "@/lib/dummy-data";
import TeamCard from "@/components/shared/TeamCard";
import { Target, Lightbulb, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="relative z-10 bg-hipmi-gold py-20 text-white">
       <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Tentang Kami</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Mengenal lebih dekat visi, misi, dan struktur kepemimpinan di balik BPD HIPMI Jambi dan Badan Kajian Strategis.
          </p>
        </div>
        <div className="absolute inset-0 bg-black/10"></div>
      </section>

      {/* Overview Section */}
      <section className="relative z-10 py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-hipmi-neutral mb-6">
              {organizationInfo.tagline}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {organizationInfo.description}
            </p>
          </div>

          {/* Visi Misi Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-hipmi-light p-8 rounded-xl border border-gray-100">
              <div className="w-12 h-12 bg-hipmi-green text-white rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-hipmi-neutral">Visi Kami</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Menjadi pusat pemikiran terdepan yang mendorong transformasi ekonomi Jambi berbasis data dan inovasi kewirausahaan yang berkelanjutan.
              </p>
            </div>
            <div className="bg-hipmi-light p-8 rounded-xl border border-gray-100">
              <div className="w-12 h-12 bg-hipmi-green text-white rounded-lg flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-hipmi-neutral">Misi Kami</h3>
              <ul className="text-gray-600 text-sm leading-relaxed list-disc list-inside space-y-2">
                <li>Menyediakan riset kebijakan berkualitas tinggi.</li>
                <li>Meningkatkan kapasitas pengusaha muda melalui data.</li>
                <li>Menjembatani kolaborasi pemerintah dan swasta.</li>
              </ul>
            </div>
            <div className="bg-hipmi-light p-8 rounded-xl border border-gray-100">
              <div className="w-12 h-12 bg-hipmi-green text-white rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-hipmi-neutral">Nilai Inti</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Integritas data, kolaborasi inklusif, dan orientasi pada solusi nyata bagi permasalahan ekonomi daerah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: BPD HIPMI JAMBI */}
      <section className="relative z-10 py-20 bg-gray-50 border-t border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-hipmi-neutral mb-4">Pengurus BPD HIPMI Jambi</h2>
            <p className="text-gray-600">Kepemimpinan yang mendorong pertumbuhan pengusaha muda di Jambi.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bpdHipmiLeaders.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: BASNOM BAKASTRA BPD HIPMI JAMBI*/}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-hipmi-neutral mb-4">Basnom Badan Kajian Strategis (BAKASTRA)</h2>
            <p className="text-gray-600">Tim inti di balik riset dan analisis strategis organisasi.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {bakastraLeaders.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
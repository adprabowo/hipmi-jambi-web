import { organizationInfo, faqs } from "@/lib/dummy-data";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="relative z-10 bg-white min-h-screen">
      {/* Header */}
      <section className="bg-hipmi-gold text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Hubungi Kami</h1>
          <p className="text-white">Kami siap mendengar masukan dan pertanyaan Anda.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          
          {/* Kolom Kiri: Info & Form */}
          <div>
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-hipmi-green mb-6">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-hipmi-light rounded-full flex items-center justify-center text-hipmi-green flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Alamat Kantor</h3>
                    <p className="text-gray-600 leading-relaxed">{organizationInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-hipmi-light rounded-full flex items-center justify-center text-hipmi-green flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Email</h3>
                    <p className="text-gray-600">{organizationInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-hipmi-light rounded-full flex items-center justify-center text-hipmi-green flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Telepon/WhatsApp</h3>
                    <p className="text-gray-600">{organizationInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-hipmi-light rounded-full flex items-center justify-center text-hipmi-green flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Jam Operasional</h3>
                    <p className="text-gray-600">Senin - Jumat: 08:00 - 17:00 WIB</p>
                    <p className="text-gray-600">Sabtu - Minggu: Tutup</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-64 lg:h-80 relative bg-gray-100">
               {/* Menggunakan Embed Iframe Google Maps untuk BPD HIPMI JAMBI */}
               <iframe 
                src="https://maps.google.com/maps?q=BPD+HIPMI+JAMBI+Kota+Jambi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi HIPMI Jambi"
              ></iframe>
            </div>
          </div>

          {/* Kolom Kanan: Form Pesan */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
            <h2 className="text-2xl font-serif font-bold text-hipmi-neutral mb-2">Kirim Pesan</h2>
            <p className="text-gray-500 mb-8 text-sm">Silakan isi formulir di bawah ini, tim kami akan membalas secepatnya.</p>
            
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Nama Lengkap</label>
                  <input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hipmi-green focus:border-transparent outline-none transition" placeholder="Nama Anda" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hipmi-green focus:border-transparent outline-none transition" placeholder="email@contoh.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subjek</label>
                <select id="subject" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hipmi-green focus:border-transparent outline-none transition bg-white">
                  <option>Pertanyaan Umum</option>
                  <option>Kemitraan & Kerjasama</option>
                  <option>Media & Pers</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Pesan</label>
                <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hipmi-green focus:border-transparent outline-none transition" placeholder="Tulis pesan Anda di sini..."></textarea>
              </div>

              <button type="submit" className="w-full bg-hipmi-green text-white font-bold py-4 rounded-lg hover:bg-hipmi-green/90 transition shadow-md flex items-center justify-center gap-2">
                <Send className="w-5 h-5" /> Kirim Pesan
              </button>
            </form>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto border-t border-gray-100 pt-16">
          <h2 className="text-2xl font-serif font-bold text-center mb-10 text-hipmi-neutral">Pertanyaan yang Sering Diajukan (FAQ)</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-hipmi-light/50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-hipmi-neutral flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-hipmi-gold flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 mt-3 ml-8 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
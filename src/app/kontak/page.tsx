"use client"; // PENTING: Wajib ada agar tombol bisa diklik

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";

export default function ContactPage() {
  // 1. STATE: Menyimpan data yang diketik pengguna
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Pertanyaan Umum", // Default value
    message: ""
  });
  
  const [isSending, setIsSending] = useState(false);

  // 2. LOGIKA: Menangani perubahan input
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. LOGIKA: Saat tombol "Kirim Pesan" diklik
  const handleSubmit = (e: any) => {
    e.preventDefault(); // Mencegah reload halaman
    setIsSending(true);

    // Simulasi loading sebentar agar terlihat keren
    setTimeout(() => {
        // A. Format Pesan WhatsApp
        const text = `
*Halo Admin Bakastra HIPMI Jambi,*
Saya ingin mengirim pesan melalui website:

👤 *Nama:* ${formData.name}
📧 *Email:* ${formData.email}
📝 *Subjek:* ${formData.subject}

*Isi Pesan:*
"${formData.message}"
        `.trim();

        // B. Buat Link WhatsApp (Ganti nomor ini dengan nomor admin asli)
        // Format: 628xxxxxxxx (Tanpa + atau 0 di depan)
        const adminNumber = "6285377347995"; 
        const waLink = `https://wa.me/${adminNumber}?text=${encodeURIComponent(text)}`;

        // C. Buka WhatsApp di tab baru
        window.open(waLink, '_blank');
        
        setIsSending(false);
        // Reset form (opsional)
        setFormData({ name: "", email: "", subject: "Pertanyaan Umum", message: "" });
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-hipmi-gold text-white py-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Hubungi Kami</h1>
          <p className="text-white max-w-2xl mx-auto">
            Punya pertanyaan seputar riset, kerjasama, atau keanggotaan? 
            Tim kami siap membantu Anda.
          </p>
        </div>
      </section>

      {/* Konten Utama */}
      <section className="relative z-10 bg-white py-20 -mt-10 rounded-t-3xl md:mt-0 md:rounded-none">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            
            {/* KOLOM KIRI: Informasi Kontak */}
            <div className="lg:w-1/3 space-y-8">
              <div>
                <h3 className="text-xl font-serif font-bold text-hipmi-neutral mb-6">Informasi Kantor</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-hipmi-green rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Sekretariat HIPMI Jambi</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Jl. Mayjen Jusuf Singedekane, <br /> 
                        Telanaipura, Kota Jambi, 36122 <br/>
                        Provinsi Jambi, Indonesia
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-hipmi-green rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Email Resmi</p>
                      <a href="mailto:info@bks.hipmijambi.org" className="text-sm text-gray-600 hover:text-hipmi-green">
                        info@bakastra.hipmijambi.co.id
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-hipmi-green rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Telepon / WhatsApp</p>
                      <p className="text-sm text-gray-600">+62 741 1234 5678</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-hipmi-green rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Jam Operasional</p>
                      <p className="text-sm text-gray-600">Senin - Jumat: 08.00 - 17.00 WIB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* KOLOM KANAN: Formulir (Sekarang Berfungsi) */}
            <div className="lg:w-2/3 bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-serif font-bold text-hipmi-neutral mb-6">Kirim Pesan</h3>
              <p className="text-gray-600 mb-8">
                Silakan isi formulir di bawah ini, pesan akan langsung terhubung ke WhatsApp tim kami.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Nama Lengkap</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Nama Anda"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hipmi-green focus:border-hipmi-green outline-none transition bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="email@contoh.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hipmi-green focus:border-hipmi-green outline-none transition bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Subjek</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hipmi-green focus:border-hipmi-green outline-none transition bg-white"
                  >
                    <option>Pertanyaan Umum</option>
                    <option>Kemitraan & Kerjasama</option>
                    <option>Permintaan Data Riset</option>
                    <option>Media & Pers</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Pesan</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tulis pesan Anda di sini..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-hipmi-green focus:border-hipmi-green outline-none transition bg-white resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSending}
                  className="w-full py-4 bg-hipmi-green text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Kirim Pesan via WhatsApp
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
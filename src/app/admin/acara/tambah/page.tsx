"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function TambahAcaraPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        time: "",
        location: "",
        type: "",
        description: "",
        registrationLink: "",
        published: true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/acara");
                router.refresh();
            } else {
                alert("Gagal menyimpan acara");
            }
        } catch (error) {
            console.error("Submit error:", error);
            alert("Terjadi kesalahan");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/acara" className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tambah Acara</h1>
                    <p className="text-gray-600 mt-1">Buat acara baru</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Judul Acara</label>
                        <input type="text" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                            <input type="text" value={formData.date} onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent" placeholder="15 Februari 2026" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Waktu</label>
                            <input type="text" value={formData.time} onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent" placeholder="09:00 - 16:00 WIB" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
                            <input type="text" value={formData.location} onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tipe</label>
                            <select value={formData.type} onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent">
                                <option value="">Pilih Tipe</option>
                                <option value="Konferensi">Konferensi</option>
                                <option value="Focus Group Discussion">Focus Group Discussion</option>
                                <option value="Pelatihan">Pelatihan</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Workshop">Workshop</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                        <textarea value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Link Registrasi</label>
                        <input type="text" value={formData.registrationLink} onChange={(e) => setFormData((prev) => ({ ...prev, registrationLink: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent" placeholder="https://" />
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <Link href="/admin/acara" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Batal</Link>
                    <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2 bg-hipmi-green text-white rounded-lg hover:bg-hipmi-green/90 transition-colors disabled:opacity-50">
                        <Save className="w-5 h-5" />
                        {isSubmitting ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function TambahPublikasiPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: "",
        date: "",
        author: "",
        excerpt: "",
        content: "",
        image: "",
        downloadLink: "",
        tags: "",
        published: true
    });

    const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/publications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean)
                })
            });
            if (res.ok) {
                router.push("/admin/publikasi");
                router.refresh();
            } else {
                alert("Gagal menyimpan");
            }
        } catch (e) {
            console.error(e);
            alert("Terjadi kesalahan");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/publikasi" className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tambah Publikasi</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Judul</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value, slug: generateSlug(e.target.value) }))}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Pilih</option>
                                <option value="Laporan Tahunan">Laporan Tahunan</option>
                                <option value="Policy Brief">Policy Brief</option>
                                <option value="Jurnal Riset">Jurnal Riset</option>
                                <option value="Artikel Analisis">Artikel Analisis</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                            <input
                                type="text"
                                value={formData.date}
                                onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="10 Januari 2026"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Penulis</label>
                        <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData((p) => ({ ...p, author: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ringkasan</label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData((p) => ({ ...p, excerpt: e.target.value }))}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Ringkasan singkat publikasi..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Konten Lengkap</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData((p) => ({ ...p, content: e.target.value }))}
                            rows={10}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Isi lengkap publikasi..."
                        />
                        <p className="text-sm text-gray-500 mt-1">Tulis isi lengkap publikasi di sini</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar</label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData((p) => ({ ...p, image: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Link Download</label>
                            <input
                                type="text"
                                value={formData.downloadLink}
                                onChange={(e) => setFormData((p) => ({ ...p, downloadLink: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tags (pisahkan dengan koma)</label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData((p) => ({ ...p, tags: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Ekonomi, Riset, Kebijakan"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <Link href="/admin/publikasi" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-2 bg-hipmi-green text-white rounded-lg disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {isSubmitting ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
}

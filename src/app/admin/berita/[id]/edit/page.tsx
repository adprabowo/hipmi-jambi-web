"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function EditBeritaPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        date: "",
        category: "",
        excerpt: "",
        content: "",
        image: "",
        published: true,
    });

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch(`/api/news/${resolvedParams.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        title: data.title || "",
                        slug: data.slug || "",
                        date: data.date || "",
                        category: data.category || "",
                        excerpt: data.excerpt || "",
                        content: data.content || "",
                        image: data.image || "",
                        published: data.published ?? true,
                    });
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, [resolvedParams.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/news/${resolvedParams.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/berita");
                router.refresh();
            } else {
                alert("Gagal menyimpan berita");
            }
        } catch (error) {
            console.error("Submit error:", error);
            alert("Terjadi kesalahan");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Memuat data...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/berita"
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Berita</h1>
                    <p className="text-gray-600 mt-1">Ubah informasi berita</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Judul</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Slug URL</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent bg-gray-50"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent"
                            >
                                <option value="">Pilih Kategori</option>
                                <option value="Kegiatan">Kegiatan</option>
                                <option value="Kerjasama">Kerjasama</option>
                                <option value="Internal">Internal</option>
                                <option value="Pengumuman">Pengumuman</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                            <input
                                type="text"
                                value={formData.date}
                                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ringkasan</label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                            required
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Konten</label>
                        <RichTextEditor
                            content={formData.content}
                            onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
                            placeholder="Isi lengkap berita..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar</label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hipmi-green focus:border-transparent"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="published"
                            checked={formData.published}
                            onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                            className="w-4 h-4 text-hipmi-green border-gray-300 rounded focus:ring-hipmi-green"
                        />
                        <label htmlFor="published" className="text-sm text-gray-700">Publish berita ini</label>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <Link
                        href="/admin/berita"
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-2 bg-hipmi-green text-white rounded-lg hover:bg-hipmi-green/90 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {isSubmitting ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
}

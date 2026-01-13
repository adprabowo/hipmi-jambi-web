"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function EditTimPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({ name: "", role: "", bio: "", image: "", category: "", sortOrder: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/team/${resolvedParams.id}`);
                if (res.ok) { const data = await res.json(); setFormData({ name: data.name || "", role: data.role || "", bio: data.bio || "", image: data.image || "", category: data.category || "", sortOrder: data.sortOrder || 0 }); }
            } catch (e) { console.error(e); }
            finally { setIsLoading(false); }
        };
        fetchData();
    }, [resolvedParams.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/team/${resolvedParams.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
            if (res.ok) { router.push("/admin/tim"); router.refresh(); }
            else { alert("Gagal menyimpan"); }
        } catch (e) { console.error(e); alert("Terjadi kesalahan"); }
        finally { setIsSubmitting(false); }
    };

    if (isLoading) return <div className="flex items-center justify-center h-64"><p className="text-gray-500">Memuat...</p></div>;

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/tim" className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></Link>
                <div><h1 className="text-2xl font-bold text-gray-900">Edit Anggota Tim</h1></div>
            </div>
            <form onSubmit={handleSubmit} className="max-w-3xl">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Nama</label><input type="text" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Jabatan</label><input type="text" value={formData.role} onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Bio</label><textarea value={formData.bio} onChange={(e) => setFormData((p) => ({ ...p, bio: e.target.value }))} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label><select value={formData.category} onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))} required className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option value="">Pilih</option><option value="bpd">BPD HIPMI</option><option value="bakastra">Bakastra</option></select></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Urutan</label><input type="number" value={formData.sortOrder} onChange={(e) => setFormData((p) => ({ ...p, sortOrder: parseInt(e.target.value) || 0 }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    </div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">URL Foto</label><input type="text" value={formData.image} onChange={(e) => setFormData((p) => ({ ...p, image: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <Link href="/admin/tim" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</Link>
                    <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2 bg-hipmi-green text-white rounded-lg disabled:opacity-50"><Save className="w-5 h-5" />{isSubmitting ? "Menyimpan..." : "Simpan"}</button>
                </div>
            </form>
        </div>
    );
}

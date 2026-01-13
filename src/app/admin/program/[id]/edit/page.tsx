"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function EditProgramPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({ title: "", description: "", status: "", icon: "", published: true });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/programs/${resolvedParams.id}`);
                if (res.ok) { const data = await res.json(); setFormData({ title: data.title || "", description: data.description || "", status: data.status || "", icon: data.icon || "", published: data.published ?? true }); }
            } catch (e) { console.error(e); }
            finally { setIsLoading(false); }
        };
        fetchData();
    }, [resolvedParams.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/programs/${resolvedParams.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
            if (res.ok) { router.push("/admin/program"); router.refresh(); }
            else { alert("Gagal menyimpan"); }
        } catch (e) { console.error(e); alert("Terjadi kesalahan"); }
        finally { setIsSubmitting(false); }
    };

    if (isLoading) return <div className="flex items-center justify-center h-64"><p className="text-gray-500">Memuat...</p></div>;

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/program" className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></Link>
                <div><h1 className="text-2xl font-bold text-gray-900">Edit Program</h1></div>
            </div>
            <form onSubmit={handleSubmit} className="max-w-3xl">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Judul</label><input type="text" value={formData.title} onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label><textarea value={formData.description} onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Status</label><select value={formData.status} onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option value="">Pilih</option><option value="Buka">Buka</option><option value="Aktif">Aktif</option><option value="Dalam Pengembangan">Dalam Pengembangan</option><option value="Selesai">Selesai</option></select></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-2">Icon</label><select value={formData.icon} onChange={(e) => setFormData((p) => ({ ...p, icon: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option value="">Pilih</option><option value="GraduationCap">GraduationCap</option><option value="Briefcase">Briefcase</option><option value="Database">Database</option><option value="Users">Users</option><option value="FileText">FileText</option></select></div>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <Link href="/admin/program" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</Link>
                    <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2 bg-hipmi-green text-white rounded-lg disabled:opacity-50"><Save className="w-5 h-5" />{isSubmitting ? "Menyimpan..." : "Simpan"}</button>
                </div>
            </form>
        </div>
    );
}

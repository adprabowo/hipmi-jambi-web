import { db } from "@/db";
import { publications } from "@/db/schema";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { desc } from "drizzle-orm";
import DeleteButton from "../berita/DeleteButton";

async function getPublications() {
    return await db.select().from(publications).orderBy(desc(publications.createdAt));
}

export default async function PublikasiPage() {
    const allPublications = await getPublications();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Publikasi</h1>
                    <p className="text-gray-600 mt-1">Tambah, edit, atau hapus publikasi</p>
                </div>
                <Link href="/admin/publikasi/tambah" className="flex items-center gap-2 px-4 py-2 bg-hipmi-green text-white rounded-lg hover:bg-hipmi-green/90 transition-colors">
                    <Plus className="w-5 h-5" />Tambah Publikasi
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Judul</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Kategori</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Tanggal</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Penulis</th>
                            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {allPublications.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">Belum ada publikasi.</td></tr>
                        ) : (
                            allPublications.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4"><p className="font-medium text-gray-900 line-clamp-1">{item.title}</p></td>
                                    <td className="px-6 py-4"><span className="inline-flex px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">{item.category}</span></td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.author}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/publikasi/${item.id}/edit`} className="p-2 text-gray-600 hover:text-hipmi-green hover:bg-gray-100 rounded-lg"><Pencil className="w-4 h-4" /></Link>
                                            <DeleteButton id={item.id} type="publications" />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

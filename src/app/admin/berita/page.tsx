import { db } from "@/db";
import { news } from "@/db/schema";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { desc } from "drizzle-orm";
import DeleteButton from "./DeleteButton";

async function getNews() {
    return await db.select().from(news).orderBy(desc(news.createdAt));
}

export default async function BeritaPage() {
    const allNews = await getNews();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Berita</h1>
                    <p className="text-gray-600 mt-1">Tambah, edit, atau hapus berita</p>
                </div>
                <Link
                    href="/admin/berita/tambah"
                    className="flex items-center gap-2 px-4 py-2 bg-hipmi-green text-white rounded-lg hover:bg-hipmi-green/90 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Tambah Berita
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Judul</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Kategori</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Tanggal</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {allNews.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    Belum ada berita. Klik &quot;Tambah Berita&quot; untuk memulai.
                                </td>
                            </tr>
                        ) : (
                            allNews.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900 line-clamp-1">{item.title}</p>
                                        <p className="text-sm text-gray-500 line-clamp-1">{item.excerpt}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${item.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {item.published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/berita/${item.id}/edit`}
                                                className="p-2 text-gray-600 hover:text-hipmi-green hover:bg-gray-100 rounded-lg transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                            <DeleteButton id={item.id} type="news" />
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

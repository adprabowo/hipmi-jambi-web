import { db } from "@/db";
import { teamMembers } from "@/db/schema";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { asc } from "drizzle-orm";
import DeleteButton from "../berita/DeleteButton";

async function getTeam() {
    return await db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder));
}

export default async function TimPage() {
    const allMembers = await getTeam();
    const bpdMembers = allMembers.filter(m => m.category === 'bpd');
    const bakastraMembers = allMembers.filter(m => m.category === 'bakastra');

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Tim</h1>
                    <p className="text-gray-600 mt-1">Kelola pengurus BPD HIPMI dan Bakastra</p>
                </div>
                <Link href="/admin/tim/tambah" className="flex items-center gap-2 px-4 py-2 bg-hipmi-green text-white rounded-lg hover:bg-hipmi-green/90 transition-colors">
                    <Plus className="w-5 h-5" />Tambah Anggota
                </Link>
            </div>

            <div className="space-y-8">
                {/* BPD HIPMI */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Pengurus BPD HIPMI Jambi</h2>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Nama</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Jabatan</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Urutan</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {bpdMembers.length === 0 ? (
                                    <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Belum ada anggota.</td></tr>
                                ) : (
                                    bpdMembers.map((m) => (
                                        <tr key={m.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{m.name}</td>
                                            <td className="px-6 py-4 text-gray-600">{m.role}</td>
                                            <td className="px-6 py-4 text-gray-600">{m.sortOrder}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/admin/tim/${m.id}/edit`} className="p-2 text-gray-600 hover:text-hipmi-green hover:bg-gray-100 rounded-lg"><Pencil className="w-4 h-4" /></Link>
                                                    <DeleteButton id={m.id} type="team" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bakastra */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Pengurus Bakastra</h2>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Nama</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Jabatan</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Urutan</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {bakastraMembers.length === 0 ? (
                                    <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Belum ada anggota.</td></tr>
                                ) : (
                                    bakastraMembers.map((m) => (
                                        <tr key={m.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{m.name}</td>
                                            <td className="px-6 py-4 text-gray-600">{m.role}</td>
                                            <td className="px-6 py-4 text-gray-600">{m.sortOrder}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/admin/tim/${m.id}/edit`} className="p-2 text-gray-600 hover:text-hipmi-green hover:bg-gray-100 rounded-lg"><Pencil className="w-4 h-4" /></Link>
                                                    <DeleteButton id={m.id} type="team" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

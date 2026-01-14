import { db } from "@/db";
import { publications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Download, Calendar, Users } from "lucide-react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function PublicationDetailPage(props: PageProps) {
    const params = await props.params;
    const slug = params.slug;

    // Fetch from database
    const result = await db.select().from(publications).where(eq(publications.slug, slug)).limit(1);
    const pub = result[0];

    if (!pub) {
        notFound();
    }

    // Parse tags if exists
    const tags = pub.tags ? JSON.parse(pub.tags) : [];

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header Gelap */}
            <div className="bg-neutral-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <Link href="/publikasi" className="text-gray-400 hover:text-white flex items-center mb-8 transition">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Perpustakaan
                    </Link>

                    <div className="max-w-4xl">
                        <div className="inline-block px-3 py-1 bg-hipmi-green text-white text-xs font-bold rounded mb-4">
                            {pub.category}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-6">
                            {pub.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-gray-300 text-sm">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" /> {pub.date}
                            </div>
                            {pub.author && (
                                <div className="flex items-center">
                                    <Users className="w-4 h-4 mr-2" /> {pub.author}
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {tags.map((tag: string, index: number) => (
                                    <span key={index} className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Konten Utama */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Kolom Kiri: Konten */}
                    <div className="lg:w-2/3">
                        {/* Ringkasan */}
                        {pub.excerpt && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ringkasan</h2>
                                <p className="text-lg font-medium text-gray-700 leading-relaxed">
                                    {pub.excerpt}
                                </p>
                            </div>
                        )}

                        {/* Konten Lengkap */}
                        {pub.content && (
                            <div className="prose prose-lg max-w-none">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Isi Lengkap</h2>
                                <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                    {pub.content}
                                </div>
                            </div>
                        )}

                        {/* Fallback if no content */}
                        {!pub.content && !pub.excerpt && (
                            <div className="text-gray-500 italic">
                                Konten publikasi belum tersedia.
                            </div>
                        )}
                    </div>

                    {/* Kolom Kanan: Sidebar Download */}
                    <div className="lg:w-1/3">
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 sticky top-24">
                            <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-4 shadow-sm">
                                <FileText className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">Dokumen Lengkap</h3>
                            <p className="text-sm text-gray-500 mb-6">Format PDF • Bahasa Indonesia</p>

                            {pub.downloadLink ? (
                                <a
                                    href={pub.downloadLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 bg-hipmi-green text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md"
                                >
                                    <Download className="w-4 h-4" /> Download PDF
                                </a>
                            ) : (
                                <button
                                    disabled
                                    className="w-full py-3 bg-gray-300 text-gray-500 font-bold rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <Download className="w-4 h-4" /> Download Tidak Tersedia
                                </button>
                            )}

                            <p className="text-xs text-gray-400 mt-4 text-center">
                                *Publikasi resmi Bakastra HIPMI Jambi
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
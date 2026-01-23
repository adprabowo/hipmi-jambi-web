import { db } from "@/db";
import { news } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage(props: PageProps) {
    const params = await props.params;
    const slug = params.slug;

    // Fetch news from database
    const result = await db.select().from(news).where(eq(news.slug, slug)).limit(1);
    const newsItem = result[0];

    if (!newsItem) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Tombol Kembali */}
            <div className="container mx-auto px-4 pt-8 mb-6">
                <Link
                    href="/berita"
                    className="inline-flex items-center text-gray-500 hover:text-hipmi-green transition font-medium"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Daftar Berita
                </Link>
            </div>

            <article className="container mx-auto px-4 max-w-4xl">
                {/* Header Artikel */}
                <header className="mb-10 text-center md:text-left">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4 justify-center md:justify-start">
                        <span className="flex items-center text-hipmi-green font-bold bg-blue-50 px-3 py-1 rounded-full">
                            <Tag className="w-3 h-3 mr-2" /> {newsItem.category}
                        </span>
                        <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" /> {newsItem.date}
                        </span>
                        <span className="flex items-center">
                            <User className="w-4 h-4 mr-2" /> Admin Bakastra
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-hipmi-neutral leading-tight mb-6">
                        {newsItem.title}
                    </h1>
                </header>

                {/* Gambar Utama (Jika ada) */}
                {newsItem.image ? (
                    <div className="relative w-full h-[300px] md:h-[500px] mb-10 rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src={newsItem.image}
                            alt={newsItem.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    // Fallback jika tidak ada gambar
                    <div className="w-full h-[300px] mb-10 rounded-2xl bg-gradient-to-r from-hipmi-neutral to-gray-800 flex items-center justify-center">
                        <span className="text-white text-4xl font-serif font-bold opacity-10">HIPMI JAMBI</span>
                    </div>
                )}

                {/* Isi Konten */}
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify">
                    <p className="font-semibold text-xl text-gray-900 mb-6">
                        {newsItem.excerpt}
                    </p>

                    {newsItem.content ? (
                        <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
                    ) : (
                        <>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </>
                    )}
                </div>
            </article>
        </div>
    );
}
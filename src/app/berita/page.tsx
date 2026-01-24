
import NewsCard from "@/components/home/NewsCard";
import { db } from "@/db";
import { news } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Newspaper } from "lucide-react";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Berita & Kegiatan',
    description: 'Berita terbaru, artikel informatif, dan dokumentasi kegiatan organisasi HIPMI Jambi.',
    openGraph: {
        title: 'Berita & Kegiatan | Bakastra HIPMI Jambi',
        description: 'Ikuti perkembangan terbaru, kegiatan organisasi, dan artikel informatif dari Badan Kajian Strategis HIPMI Jambi.',
    },
};

// Disable caching so CMS updates are reflected immediately
export const dynamic = 'force-dynamic';

async function getAllNews() {
    return await db
        .select()
        .from(news)
        .where(eq(news.published, true))
        .orderBy(desc(news.createdAt));
}

export default async function NewsPage() {
    const newsItems = await getAllNews();

    return (
        <div className="min-h-screen bg-white pt-10 pb-20">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 text-hipmi-green font-bold uppercase tracking-wider text-sm mb-3">
                        <Newspaper className="w-5 h-5" /> Berita & Kegiatan
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-hipmi-neutral mb-6">
                        Kabar Terbaru & Informasi Kegiatan
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Ikuti perkembangan terbaru, kegiatan organisasi, dan artikel informatif dari Badan Kajian Strategis HIPMI Jambi.
                    </p>
                </div>

                {/* Grid Berita */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {newsItems.length > 0 ? (
                        newsItems.map((item, index) => (
                            <NewsCard
                                key={item.id}
                                index={index}
                                title={item.title}
                                date={item.date}
                                category={item.category}
                                excerpt={item.excerpt}
                                slug={item.slug}
                                image={item.image}
                            />
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
                            <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">Belum ada berita yang diterbitkan.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

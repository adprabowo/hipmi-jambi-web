import { MetadataRoute } from 'next'
import { db } from "@/db";
import { news, publications } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://bakastrahipmijambi.vercel.app'

    // Fetch all published news
    const allNews = await db
        .select({
            slug: news.slug,
            updatedAt: news.updatedAt,
            createdAt: news.createdAt,
        })
        .from(news)
        .where(eq(news.published, true));

    const newsUrls = allNews.map((item) => ({
        url: `${baseUrl}/berita/${item.slug}`,
        lastModified: item.updatedAt || item.createdAt || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Fetch all published publications
    const allPublications = await db
        .select({
            slug: publications.slug,
            updatedAt: publications.updatedAt,
            createdAt: publications.createdAt,
        })
        .from(publications)
        .where(eq(publications.published, true));

    const publicationUrls = allPublications.map((item) => ({
        url: `${baseUrl}/publikasi/${item.slug}`,
        lastModified: item.updatedAt || item.createdAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/tentang-kami`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/publikasi`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/acara`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/program`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/berita`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/kontak`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/media-center`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/dukung-kami`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.5,
        },
    ]

    return [...staticRoutes, ...newsUrls, ...publicationUrls]
}

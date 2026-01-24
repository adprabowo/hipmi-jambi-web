import { db } from "@/db";
import { publications } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import PublicationsClient from "./PublicationsClient";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perpustakaan Riset',
  description: 'Koleksi lengkap analisis kebijakan, laporan ekonomi, dan jurnal riset dari Bakastra HIPMI Jambi.',
  openGraph: {
    title: 'Perpustakaan Riset | Bakastra HIPMI Jambi',
    description: 'Akses koleksi lengkap analisis kebijakan, laporan ekonomi, dan jurnal riset kami.',
  },
};

// Disable caching so updates are reflected immediately
export const dynamic = 'force-dynamic';

async function getPublications() {
  return await db
    .select()
    .from(publications)
    .where(eq(publications.published, true))
    .orderBy(desc(publications.createdAt));
}

export default async function PublicationsPage() {
  const allPublications = await getPublications();

  // Parse tags from JSON string
  const publicationsWithParsedTags = allPublications.map(pub => ({
    ...pub,
    tags: pub.tags ? JSON.parse(pub.tags) : []
  }));

  return <PublicationsClient publications={publicationsWithParsedTags} />;
}
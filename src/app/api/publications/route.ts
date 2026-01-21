import { db } from "@/db";
import { publications } from "@/db/schema";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { notifyGoogleIndexing } from "@/lib/google-indexing";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://bakastrahipmijambi.vercel.app';

// GET /api/publications - List all publications
export async function GET() {
    try {
        const allPublications = await db.select().from(publications).orderBy(publications.createdAt);
        return NextResponse.json(allPublications);
    } catch (error) {
        console.error("Error fetching publications:", error);
        return NextResponse.json({ error: "Failed to fetch publications" }, { status: 500 });
    }
}

// POST /api/publications - Create new publication
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const newPublication = await db.insert(publications).values({
            id: nanoid(),
            slug: body.slug,
            title: body.title,
            category: body.category,
            date: body.date,
            author: body.author,
            excerpt: body.excerpt,
            content: body.content,
            image: body.image,
            downloadLink: body.downloadLink,
            tags: JSON.stringify(body.tags || []),
            published: body.published ?? true,
        }).returning();

        const publication = newPublication[0];

        // Notify Google Indexing API if publication is published
        if (publication.published && process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
            const publicationUrl = `${BASE_URL}/publikasi/${publication.slug}`;

            // Fire and forget - don't block response
            notifyGoogleIndexing(publicationUrl, 'URL_UPDATED')
                .then(result => {
                    if (result.success) {
                        console.log(`[Google Indexing] Notified for new publication: ${publicationUrl}`);
                    } else {
                        console.error(`[Google Indexing] Failed for: ${publicationUrl}`, result.error);
                    }
                })
                .catch(err => console.error('[Google Indexing] Error:', err));
        }

        return NextResponse.json(publication, { status: 201 });
    } catch (error) {
        console.error("Error creating publication:", error);
        return NextResponse.json({ error: "Failed to create publication" }, { status: 500 });
    }
}

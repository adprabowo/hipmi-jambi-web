import { db } from "@/db";
import { publications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { notifyGoogleIndexing } from "@/lib/google-indexing";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://bakastrahipmijambi.vercel.app';

// GET /api/publications/:id
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const result = await db.select().from(publications).where(eq(publications.id, id));

        if (result.length === 0) {
            return NextResponse.json({ error: "Publication not found" }, { status: 404 });
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Error fetching publication:", error);
        return NextResponse.json({ error: "Failed to fetch publication" }, { status: 500 });
    }
}

// PUT /api/publications/:id
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const updated = await db.update(publications)
            .set({
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
                published: body.published,
                updatedAt: new Date(),
            })
            .where(eq(publications.id, id))
            .returning();

        if (updated.length === 0) {
            return NextResponse.json({ error: "Publication not found" }, { status: 404 });
        }

        const publication = updated[0];

        // Notify Google Indexing API if publication is published
        if (publication.published && process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
            const publicationUrl = `${BASE_URL}/publikasi/${publication.slug}`;

            // Fire and forget - don't block response
            notifyGoogleIndexing(publicationUrl, 'URL_UPDATED')
                .then(result => {
                    if (result.success) {
                        console.log(`[Google Indexing] Notified for updated publication: ${publicationUrl}`);
                    } else {
                        console.error(`[Google Indexing] Failed for: ${publicationUrl}`, result.error);
                    }
                })
                .catch(err => console.error('[Google Indexing] Error:', err));
        }

        return NextResponse.json(publication);
    } catch (error) {
        console.error("Error updating publication:", error);
        return NextResponse.json({ error: "Failed to update publication" }, { status: 500 });
    }
}

// DELETE /api/publications/:id
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Get the publication first to get the slug for Google notification
        const existing = await db.select().from(publications).where(eq(publications.id, id));

        if (existing.length === 0) {
            return NextResponse.json({ error: "Publication not found" }, { status: 404 });
        }

        const publication = existing[0];

        // Delete from database
        await db.delete(publications).where(eq(publications.id, id));

        // Notify Google Indexing API about deletion
        if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
            const publicationUrl = `${BASE_URL}/publikasi/${publication.slug}`;

            // Fire and forget
            notifyGoogleIndexing(publicationUrl, 'URL_DELETED')
                .then(result => {
                    if (result.success) {
                        console.log(`[Google Indexing] Notified deletion: ${publicationUrl}`);
                    } else {
                        console.error(`[Google Indexing] Failed deletion for: ${publicationUrl}`, result.error);
                    }
                })
                .catch(err => console.error('[Google Indexing] Error:', err));
        }

        return NextResponse.json({ message: "Publication deleted successfully" });
    } catch (error) {
        console.error("Error deleting publication:", error);
        return NextResponse.json({ error: "Failed to delete publication" }, { status: 500 });
    }
}

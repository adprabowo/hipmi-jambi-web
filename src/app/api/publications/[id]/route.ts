import { db } from "@/db";
import { publications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

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

        return NextResponse.json(updated[0]);
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
        const deleted = await db.delete(publications).where(eq(publications.id, id)).returning();

        if (deleted.length === 0) {
            return NextResponse.json({ error: "Publication not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Publication deleted successfully" });
    } catch (error) {
        console.error("Error deleting publication:", error);
        return NextResponse.json({ error: "Failed to delete publication" }, { status: 500 });
    }
}

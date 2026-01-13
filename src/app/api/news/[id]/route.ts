import { db } from "@/db";
import { news } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET /api/news/:id - Get single news
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const result = await db.select().from(news).where(eq(news.id, id));

        if (result.length === 0) {
            return NextResponse.json({ error: "News not found" }, { status: 404 });
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Error fetching news:", error);
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}

// PUT /api/news/:id - Update news
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const updated = await db.update(news)
            .set({
                slug: body.slug,
                title: body.title,
                date: body.date,
                category: body.category,
                excerpt: body.excerpt,
                content: body.content,
                image: body.image,
                published: body.published,
                updatedAt: new Date(),
            })
            .where(eq(news.id, id))
            .returning();

        if (updated.length === 0) {
            return NextResponse.json({ error: "News not found" }, { status: 404 });
        }

        return NextResponse.json(updated[0]);
    } catch (error) {
        console.error("Error updating news:", error);
        return NextResponse.json({ error: "Failed to update news" }, { status: 500 });
    }
}

// DELETE /api/news/:id - Delete news
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const deleted = await db.delete(news).where(eq(news.id, id)).returning();

        if (deleted.length === 0) {
            return NextResponse.json({ error: "News not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "News deleted successfully" });
    } catch (error) {
        console.error("Error deleting news:", error);
        return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
    }
}

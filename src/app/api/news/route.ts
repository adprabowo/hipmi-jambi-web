import { db } from "@/db";
import { news } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

// GET /api/news - List all news
export async function GET() {
    try {
        const allNews = await db.select().from(news).orderBy(news.createdAt);
        return NextResponse.json(allNews);
    } catch (error) {
        console.error("Error fetching news:", error);
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}

// POST /api/news - Create new news
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const newNews = await db.insert(news).values({
            id: nanoid(),
            slug: body.slug,
            title: body.title,
            date: body.date,
            category: body.category,
            excerpt: body.excerpt,
            content: body.content,
            image: body.image,
            published: body.published ?? true,
        }).returning();

        return NextResponse.json(newNews[0], { status: 201 });
    } catch (error) {
        console.error("Error creating news:", error);
        return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
    }
}

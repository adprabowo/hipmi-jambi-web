import { db } from "@/db";
import { publications } from "@/db/schema";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

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
            image: body.image,
            downloadLink: body.downloadLink,
            tags: JSON.stringify(body.tags || []),
            published: body.published ?? true,
        }).returning();

        return NextResponse.json(newPublication[0], { status: 201 });
    } catch (error) {
        console.error("Error creating publication:", error);
        return NextResponse.json({ error: "Failed to create publication" }, { status: 500 });
    }
}

import { db } from "@/db";
import { programs } from "@/db/schema";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

// GET /api/programs - List all programs
export async function GET() {
    try {
        const allPrograms = await db.select().from(programs).orderBy(programs.createdAt);
        return NextResponse.json(allPrograms);
    } catch (error) {
        console.error("Error fetching programs:", error);
        return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
    }
}

// POST /api/programs - Create new program
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const newProgram = await db.insert(programs).values({
            id: nanoid(),
            title: body.title,
            description: body.description,
            status: body.status,
            icon: body.icon,
            published: body.published ?? true,
        }).returning();

        return NextResponse.json(newProgram[0], { status: 201 });
    } catch (error) {
        console.error("Error creating program:", error);
        return NextResponse.json({ error: "Failed to create program" }, { status: 500 });
    }
}

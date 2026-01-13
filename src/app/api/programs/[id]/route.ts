import { db } from "@/db";
import { programs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET /api/programs/:id
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const result = await db.select().from(programs).where(eq(programs.id, id));

        if (result.length === 0) {
            return NextResponse.json({ error: "Program not found" }, { status: 404 });
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Error fetching program:", error);
        return NextResponse.json({ error: "Failed to fetch program" }, { status: 500 });
    }
}

// PUT /api/programs/:id
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const updated = await db.update(programs)
            .set({
                title: body.title,
                description: body.description,
                status: body.status,
                icon: body.icon,
                published: body.published,
                updatedAt: new Date(),
            })
            .where(eq(programs.id, id))
            .returning();

        if (updated.length === 0) {
            return NextResponse.json({ error: "Program not found" }, { status: 404 });
        }

        return NextResponse.json(updated[0]);
    } catch (error) {
        console.error("Error updating program:", error);
        return NextResponse.json({ error: "Failed to update program" }, { status: 500 });
    }
}

// DELETE /api/programs/:id
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const deleted = await db.delete(programs).where(eq(programs.id, id)).returning();

        if (deleted.length === 0) {
            return NextResponse.json({ error: "Program not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Program deleted successfully" });
    } catch (error) {
        console.error("Error deleting program:", error);
        return NextResponse.json({ error: "Failed to delete program" }, { status: 500 });
    }
}

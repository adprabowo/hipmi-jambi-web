import { db } from "@/db";
import { teamMembers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET /api/team/:id
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const result = await db.select().from(teamMembers).where(eq(teamMembers.id, id));

        if (result.length === 0) {
            return NextResponse.json({ error: "Team member not found" }, { status: 404 });
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Error fetching team member:", error);
        return NextResponse.json({ error: "Failed to fetch team member" }, { status: 500 });
    }
}

// PUT /api/team/:id
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const updated = await db.update(teamMembers)
            .set({
                name: body.name,
                role: body.role,
                bio: body.bio,
                image: body.image,
                category: body.category,
                sortOrder: body.sortOrder,
                updatedAt: new Date(),
            })
            .where(eq(teamMembers.id, id))
            .returning();

        if (updated.length === 0) {
            return NextResponse.json({ error: "Team member not found" }, { status: 404 });
        }

        return NextResponse.json(updated[0]);
    } catch (error) {
        console.error("Error updating team member:", error);
        return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
    }
}

// DELETE /api/team/:id
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const deleted = await db.delete(teamMembers).where(eq(teamMembers.id, id)).returning();

        if (deleted.length === 0) {
            return NextResponse.json({ error: "Team member not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Team member deleted successfully" });
    } catch (error) {
        console.error("Error deleting team member:", error);
        return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
    }
}

import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET /api/events/:id
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const result = await db.select().from(events).where(eq(events.id, id));

        if (result.length === 0) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Error fetching event:", error);
        return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
    }
}

// PUT /api/events/:id
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const updated = await db.update(events)
            .set({
                title: body.title,
                date: body.date,
                time: body.time,
                location: body.location,
                type: body.type,
                description: body.description,
                registrationLink: body.registrationLink,
                published: body.published,
                updatedAt: new Date(),
            })
            .where(eq(events.id, id))
            .returning();

        if (updated.length === 0) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        return NextResponse.json(updated[0]);
    } catch (error) {
        console.error("Error updating event:", error);
        return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
    }
}

// DELETE /api/events/:id
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const deleted = await db.delete(events).where(eq(events.id, id)).returning();

        if (deleted.length === 0) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Error deleting event:", error);
        return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
    }
}

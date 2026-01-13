import { db } from "@/db";
import { events } from "@/db/schema";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

// GET /api/events - List all events
export async function GET() {
    try {
        const allEvents = await db.select().from(events).orderBy(events.createdAt);
        return NextResponse.json(allEvents);
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
    }
}

// POST /api/events - Create new event
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const newEvent = await db.insert(events).values({
            id: nanoid(),
            title: body.title,
            date: body.date,
            time: body.time,
            location: body.location,
            type: body.type,
            description: body.description,
            registrationLink: body.registrationLink,
            published: body.published ?? true,
        }).returning();

        return NextResponse.json(newEvent[0], { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
    }
}

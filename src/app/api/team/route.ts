import { db } from "@/db";
import { teamMembers } from "@/db/schema";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

// GET /api/team - List all team members
export async function GET() {
    try {
        const allMembers = await db.select().from(teamMembers).orderBy(teamMembers.sortOrder);
        return NextResponse.json(allMembers);
    } catch (error) {
        console.error("Error fetching team members:", error);
        return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
    }
}

// POST /api/team - Create new team member
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const newMember = await db.insert(teamMembers).values({
            id: nanoid(),
            name: body.name,
            role: body.role,
            bio: body.bio,
            image: body.image,
            socialLink: body.socialLink,
            category: body.category,
            sortOrder: body.sortOrder ?? 0,
        }).returning();

        return NextResponse.json(newMember[0], { status: 201 });
    } catch (error) {
        console.error("Error creating team member:", error);
        return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
    }
}

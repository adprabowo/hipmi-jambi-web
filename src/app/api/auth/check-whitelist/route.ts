import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        const adminEmails = process.env.ADMIN_EMAILS?.split(",").map(e => e.trim().toLowerCase()) || [];
        const isAllowed = adminEmails.includes(email.toLowerCase());

        return NextResponse.json({ allowed: isAllowed });
    } catch (error) {
        return NextResponse.json({ allowed: false }, { status: 400 });
    }
}

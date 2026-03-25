import { db } from "@/db";
import { contactInfo } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Default contact data (used when no row exists in DB yet)
const defaultContact = {
    id: "default",
    officeName: "Sekretariat HIPMI Jambi",
    address: "Jl. Mayjen Jusuf Singedekane, Telanaipura, Kota Jambi, 36122, Provinsi Jambi, Indonesia",
    email: "info@bakastra.hipmijambi.co.id",
    phone: "+62 741 1234 5678",
    whatsappNumber: "6285377347995",
    operationalHours: "Senin - Jumat: 08.00 - 17.00 WIB",
    updatedAt: new Date(),
};

// GET /api/contact - Get contact info
export async function GET() {
    try {
        const result = await db.select().from(contactInfo).where(eq(contactInfo.id, "default"));

        if (result.length === 0) {
            return NextResponse.json(defaultContact);
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Error fetching contact info:", error);
        return NextResponse.json(defaultContact);
    }
}

// PUT /api/contact - Update contact info (upsert)
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        // Check if row exists
        const existing = await db.select().from(contactInfo).where(eq(contactInfo.id, "default"));

        let result;
        if (existing.length === 0) {
            // Insert new row
            result = await db.insert(contactInfo).values({
                id: "default",
                officeName: body.officeName,
                address: body.address,
                email: body.email,
                phone: body.phone,
                whatsappNumber: body.whatsappNumber,
                operationalHours: body.operationalHours,
                updatedAt: new Date(),
            }).returning();
        } else {
            // Update existing row
            result = await db.update(contactInfo)
                .set({
                    officeName: body.officeName,
                    address: body.address,
                    email: body.email,
                    phone: body.phone,
                    whatsappNumber: body.whatsappNumber,
                    operationalHours: body.operationalHours,
                    updatedAt: new Date(),
                })
                .where(eq(contactInfo.id, "default"))
                .returning();
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Error updating contact info:", error);
        return NextResponse.json({ error: "Failed to update contact info" }, { status: 500 });
    }
}

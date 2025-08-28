import type { RSVP } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const body: Partial<RSVP> = await request.json();

        // Validate required fields
        if (
            !body.side ||
            !body.attendance ||
            body.meal === undefined ||
            !body.party_size
        ) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        // Insert into Supabase
        const { data, error } = await supabase
            .from("rsvps")
            .insert([
                {
                    side: body.side,
                    attendance: body.attendance,
                    meal: body.meal,
                    party_size: body.party_size,
                    message: body.message || null,
                    phone: body.phone || null,
                },
            ])
            .select();

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json(
                { error: "Failed to save RSVP" },
                { status: 500 },
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}

export async function GET() {
    try {
        // Fetch all RSVPs from Supabase
        const { data, error } = await supabase
            .from("rsvps")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json(
                { error: "Failed to fetch RSVPs" },
                { status: 500 },
            );
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}

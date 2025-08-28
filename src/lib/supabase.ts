import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type RSVP = {
    id?: string;
    name?: string;
    side?: "신랑측" | "신부측";
    attendance: "참석" | "불참";
    meal: boolean;
    party_size: number;
    message?: string;
    phone?: string;
    created_at?: string;
};

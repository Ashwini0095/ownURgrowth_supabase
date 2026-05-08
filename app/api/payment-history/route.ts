import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const { userId, userEmail } = await req.json();

    if (!userId && !userEmail) {
      return NextResponse.json({ payments: [] }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);

      if (authError || !user || (userId && user.id !== userId)) {
        console.error("Payment-history auth failed:", authError?.message);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let { data: payments, error } = await supabase
      .from("payments")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error querying payments by user_id:", error);
    }

    if ((!payments || payments.length === 0) && userEmail) {
      const result = await supabase
        .from("payments")
        .select("*")
        .eq("user_email", userEmail)
        .order("created_at", { ascending: false });

      payments = result.data;
      if (result.error) console.error("Error querying payments by email:", result.error);
    }

    return NextResponse.json({ payments: payments || [] });
  } catch (error) {
    console.error("Payment-history API error:", error);
    return NextResponse.json({ payments: [] }, { status: 500 });
  }
}

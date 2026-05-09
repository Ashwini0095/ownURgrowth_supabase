import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");

    const supabase = getSupabaseAdmin();

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error("Payment-history auth failed:", authError?.message);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: payments, error } = await supabase
      .from("payments")
      .select("course_name, plan_name, amount, razorpay_payment_id, status, upgrade_to, is_upgrade, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error querying payments by user_id:", error);
      return NextResponse.json({ payments: [] }, { status: 500 });
    }

    if ((!payments || payments.length === 0) && user.email) {
      const result = await supabase
        .from("payments")
        .select("course_name, plan_name, amount, razorpay_payment_id, status, upgrade_to, is_upgrade, created_at")
        .eq("user_email", user.email)
        .order("created_at", { ascending: false });

      if (result.error) {
        console.error("Error querying payments by email:", result.error);
        return NextResponse.json({ payments: [] }, { status: 500 });
      }

      return NextResponse.json({ payments: result.data || [] });
    }

    return NextResponse.json({ payments: payments || [] });
  } catch (error) {
    console.error("Payment-history API error:", error);
    return NextResponse.json({ payments: [] }, { status: 500 });
  }
}

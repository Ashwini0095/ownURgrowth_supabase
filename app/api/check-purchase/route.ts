import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseClient";

type Plan = "basic" | "plus" | "pro";

const PLAN_NAME_TO_ID: Record<string, Plan> = {
  "Basic Crash Course": "basic",
  "Pro Program": "plus",
  "Master Program": "pro",
};

const PLAN_PRIORITY: Record<Plan, number> = { basic: 1, plus: 2, pro: 3 };

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, userEmail } = body;

    if (!userId && !userEmail) {
      return NextResponse.json({ plan: null }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Try by userId first
    let { data: payments, error } = await supabase
      .from("payments")
      .select("plan_name, status, upgrade_to")
      .eq("user_id", userId);

    if (error) {
      console.error("Error querying payments by userId:", error);
    }

    // Fallback to email if no results
    if ((!payments || payments.length === 0) && userEmail) {
      const result = await supabase
        .from("payments")
        .select("plan_name, status, upgrade_to")
        .eq("user_email", userEmail);

      payments = result.data;
      if (result.error) console.error("Error querying payments by email:", result.error);
    }

    if (!payments || payments.length === 0) {
      return NextResponse.json({ plan: null });
    }

    let highestPlan: Plan | null = null;

    for (const row of payments) {
      if (row.status !== "completed") continue;

      // Primary: planName
      let plan: Plan | null = PLAN_NAME_TO_ID[row.plan_name] ?? null;

      // Secondary: upgradeTo field
      if (!plan && row.upgrade_to) {
        const upgradeId = row.upgrade_to as string;
        if (upgradeId in PLAN_PRIORITY) {
          plan = upgradeId as Plan;
        }
      }

      if (plan && (!highestPlan || PLAN_PRIORITY[plan] > PLAN_PRIORITY[highestPlan])) {
        highestPlan = plan;
      }
    }

    return NextResponse.json({ plan: highestPlan });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ plan: null }, { status: 500 });
  }
}

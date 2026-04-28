import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

type Plan = "basic" | "plus" | "pro";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, userEmail } = body;

    if (!userId && !userEmail) {
      return NextResponse.json({ plan: null }, { status: 400 });
    }

    const paymentsRef = collection(db, "payments");

    let q = query(paymentsRef, where("userId", "==", userId));
    let snapshot = await getDocs(q);

    if (snapshot.empty && userEmail) {
      q = query(paymentsRef, where("userEmail", "==", userEmail));
      snapshot = await getDocs(q);
    }

    if (snapshot.empty) {
      return NextResponse.json({ plan: null });
    }

    const nameToId: Record<string, Plan> = {
      "Basic Crash Course": "basic",
      "Pro Program": "plus",
      "Master Program": "pro",
    };

    let highestPlan: Plan | null = null;
    const priority: Record<Plan, number> = { basic: 1, plus: 2, pro: 3 };

    snapshot.forEach((doc) => {
      const data = doc.data();

      if (data.status !== "completed") return;

      // Detect plan from planName first, then fall back to amount
      let plan: Plan | null = nameToId[data.planName] || null;
      if (!plan) {
        if (data.amount >= 999) plan = "pro";
        else if (data.amount >= 799) plan = "plus";
        else if (data.amount >= 499) plan = "basic";
      }

      if (plan && (!highestPlan || priority[plan] > priority[highestPlan])) {
        highestPlan = plan;
      }
    });

    return NextResponse.json({ plan: highestPlan });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ plan: null }, { status: 500 });
  }
}

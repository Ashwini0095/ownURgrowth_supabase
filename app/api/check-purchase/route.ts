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

    let highestPlan: Plan | null = null;

    snapshot.forEach((doc) => {
      const data = doc.data();

      if (data.status !== "completed") return;

      if (data.amount >= 999) highestPlan = "pro";
      else if (data.amount >= 799 && highestPlan !== "pro")
        highestPlan = "plus";
      else if (!highestPlan) highestPlan = "basic";
    });

    return NextResponse.json({ plan: highestPlan });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ plan: null }, { status: 500 });
  }
}

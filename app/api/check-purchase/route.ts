import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseClient";
import {
  createLinkedInGrowthPaymentLookup,
  getLinkedInGrowthPlanForUser,
  type LinkedInGrowthPlan,
} from "@/lib/linkedinGrowthAccess";

// ── Simple in-memory cache to reduce DB hits ───────────────────────────
const cache = new Map<string, { plan: LinkedInGrowthPlan | null; expiresAt: number }>();
const CACHE_TTL_MS = 30_000; // 30 seconds

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization');
    const body = await req.json();
    const { userId, userEmail, bypassCache } = body;

    const supabase = getSupabaseAdmin();

    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    // Strict check: token must be valid and userId must match token owner
    if (authError || !user || (userId && user.id !== userId)) {
      console.error('Check-purchase auth failed:', authError?.message);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const lookupUserId = user.id;
    const lookupUserEmail = user.email || userEmail;

    // Check cache first
    const cacheKey = lookupUserId;
    const cached = cache.get(cacheKey);
    if (!bypassCache && cached && cached.expiresAt > Date.now()) {
      return NextResponse.json({ plan: cached.plan });
    }

    const highestPlan = await getLinkedInGrowthPlanForUser(
      createLinkedInGrowthPaymentLookup(supabase),
      lookupUserId,
      lookupUserEmail,
    );

    // Cache purchased plans only. A cached null right before payment can bounce
    // just-paid users away from the access page until the TTL expires.
    if (highestPlan) {
      cache.set(cacheKey, { plan: highestPlan, expiresAt: Date.now() + CACHE_TTL_MS });
    } else {
      cache.delete(cacheKey);
    }

    return NextResponse.json({ plan: highestPlan });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ plan: null }, { status: 500 });
  }
}

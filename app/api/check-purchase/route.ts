import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseClient";
import { rateLimit } from "@/lib/rateLimit";
import {
  createLinkedInGrowthPaymentLookup,
  getLinkedInGrowthPlanForUser,
  type LinkedInGrowthPlan,
} from "@/lib/linkedinGrowthAccess";

// ── Simple in-memory cache to reduce DB hits ───────────────────────────
// NOTE: Per-process. On serverless multi-instance deployments each cold start
// gets its own cache. Acceptable here because the TTL is short and the worst
// case is a redundant DB read.
const cache = new Map<string, { plan: LinkedInGrowthPlan | null; expiresAt: number }>();
const CACHE_TTL_MS = 30_000; // 30 seconds

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rl = rateLimit(`check-purchase:${ip}`, 30, 60_000);
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const authHeader = req.headers.get('Authorization');
    const body = await req.json().catch(() => ({}));
    const { bypassCache } = body as { bypassCache?: boolean };

    const supabase = getSupabaseAdmin();

    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error('Check-purchase auth failed:', authError?.message);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Identity is taken exclusively from the verified token. Never trust a
    // client-supplied user id or email — that would let an authenticated user
    // probe another account's purchase status.
    const lookupUserId = user.id;
    const lookupUserEmail = user.email ?? null;

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

import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { rateLimit } from '@/lib/rateLimit';
import { getSupabaseAdmin } from '@/lib/supabaseClient';
import {
  createLinkedInGrowthPaymentLookup,
  getLinkedInGrowthPlanForUser,
  type LinkedInGrowthPlan,
} from '@/lib/linkedinGrowthAccess';

let _razorpay: Razorpay | null = null;

function getRazorpay() {
  if (!_razorpay) {
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('Missing Razorpay configuration');
    }
    _razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return _razorpay;
}

// ── Server-side pricing table ──────────────────────────────────────────
const PRICING: Record<string, number> = {
  "linkedin-growth:Basic Crash Course": 499,
  "linkedin-growth:Pro Program": 799,
  "linkedin-growth:Master Program": 999,
};

const UPGRADE_PRICING: Record<string, number> = {
  "basic-to-plus": 300,
  "basic-to-pro": 500,
  "plus-to-pro": 200,
};

const PLAN_PRIORITY: Record<LinkedInGrowthPlan, number> = {
  basic: 1,
  plus: 2,
  pro: 3,
};

const UPGRADE_COURSE_NAME_TO_PLAN: Record<string, LinkedInGrowthPlan> = {
  "Upgrade to Course + Notes": "plus",
  "Upgrade to Course + Notes + Live Q&A": "pro",
};

const UPGRADE_PLAN_TO_COURSE_NAME: Record<LinkedInGrowthPlan, string | null> = {
  basic: null,
  plus: "Upgrade to Course + Notes",
  pro: "Upgrade to Course + Notes + Live Q&A",
};

const isPlanId = (value: unknown): value is LinkedInGrowthPlan => {
  return value === "basic" || value === "plus" || value === "pro";
};

const getUpgradeTargetPlan = (toPlan: unknown, courseName: unknown): LinkedInGrowthPlan | null => {
  if (isPlanId(toPlan) && toPlan !== "basic") return toPlan;
  if (typeof courseName === "string") return UPGRADE_COURSE_NAME_TO_PLAN[courseName] ?? null;
  return null;
};

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 checkout requests per minute per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rl = rateLimit(`create-checkout-session:${ip}`, 10, 60_000);
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    if (body === null) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    const { courseId, courseName, fromPlan, toPlan } = body;

    const token = authHeader.split(' ')[1];
    const supabase = getSupabaseAdmin();
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let serverPrice: number | null = null;
    let serverCourseName = courseName;
    let verifiedFromPlan: LinkedInGrowthPlan | null = null;
    let verifiedToPlan: LinkedInGrowthPlan | null = null;

    if (courseId === 'linkedin-growth-upgrade' || fromPlan || toPlan) {
      const currentPlan = await getLinkedInGrowthPlanForUser(
        createLinkedInGrowthPaymentLookup(supabase),
        user.id,
        user.email,
      );
      const targetPlan = getUpgradeTargetPlan(toPlan, courseName);

      if (!currentPlan) {
        return NextResponse.json({ error: 'Purchase the course before upgrading' }, { status: 403 });
      }

      if (!targetPlan || PLAN_PRIORITY[targetPlan] <= PLAN_PRIORITY[currentPlan]) {
        return NextResponse.json({ error: 'Invalid upgrade target' }, { status: 400 });
      }

      const upgradeKey = `${currentPlan}-to-${targetPlan}`;
      if (UPGRADE_PRICING[upgradeKey] !== undefined) {
        const upgradeCourseName = UPGRADE_PLAN_TO_COURSE_NAME[targetPlan];
        if (!upgradeCourseName) {
          return NextResponse.json({ error: 'Invalid upgrade target' }, { status: 400 });
        }

        serverPrice = UPGRADE_PRICING[upgradeKey];
        verifiedFromPlan = currentPlan;
        verifiedToPlan = targetPlan;
        serverCourseName = upgradeCourseName;
      }
    }

    if (courseId === 'linkedin-growth-upgrade' && serverPrice === null) {
      return NextResponse.json({ error: 'Invalid upgrade path' }, { status: 400 });
    }

    // Exact lookup by courseId + courseName for first-time purchases.
    if (serverPrice === null) {
      const lookupKey = `${courseId}:${courseName}`;
      if (PRICING[lookupKey] !== undefined) {
        serverPrice = PRICING[lookupKey];
      }
    }

    if (serverPrice === null) {
      return NextResponse.json({ error: 'Invalid course or plan' }, { status: 400 });
    }

    const razorpay = getRazorpay();
    if (process.env.NODE_ENV !== 'production') {
      console.log('[checkout] creating order', {
        courseId,
        courseName: serverCourseName,
        fromPlan: verifiedFromPlan ?? fromPlan,
        toPlan: verifiedToPlan ?? toPlan,
        serverPrice,
      });
    }
    const order = await razorpay.orders.create({
      amount: serverPrice * 100,
      currency: 'INR',
      receipt: `order_${Date.now()}`.substring(0, 40),
      notes: {
        courseId,
        courseName: serverCourseName,
        serverPrice: serverPrice.toString(),
        ...(verifiedFromPlan ? { fromPlan: verifiedFromPlan } : {}),
        ...(verifiedToPlan ? { toPlan: verifiedToPlan } : {}),
      },
    });

    return NextResponse.json({ 
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Error creating payment order' }, { status: 500 });
  }
}

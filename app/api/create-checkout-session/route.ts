import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { rateLimit } from '@/lib/rateLimit';
import { getSupabaseAdmin } from '@/lib/supabaseClient';

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
  "linkedin-growth-upgrade:Upgrade to Course + Notes": 300,
  "linkedin-growth-upgrade:Upgrade to Course + Notes + Live Q&A": 500,
};

const UPGRADE_PRICING: Record<string, number> = {
  "basic-to-plus": 300,
  "basic-to-pro": 500,
  "plus-to-pro": 200,
};

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 checkout requests per minute per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rl = rateLimit(ip, 10, 60_000);
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const authHeader = request.headers.get('Authorization');
    const { courseId, courseName, price, fromPlan, toPlan } = await request.json();

    // Verification: user must be logged in to create a checkout session
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const supabase = getSupabaseAdmin();
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      
      if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    } else {
      console.warn('Checkout session created without auth token');
    }

    let serverPrice: number | null = null;

    // 1) Upgrade lookup by fromPlan + toPlan
    if (fromPlan && toPlan) {
      const upgradeKey = `${fromPlan}-to-${toPlan}`;
      if (UPGRADE_PRICING[upgradeKey] !== undefined) {
        serverPrice = UPGRADE_PRICING[upgradeKey];
      }
    }

    // 2) Exact lookup by courseId + courseName
    if (serverPrice === null) {
      const lookupKey = `${courseId}:${courseName}`;
      if (PRICING[lookupKey] !== undefined) {
        serverPrice = PRICING[lookupKey];
      }
    }

    // 3) Fallback for upgrade page legacy mode
    if (serverPrice === null && courseId === 'linkedin-growth-upgrade' && price) {
      const validUpgradePrices = [200, 300, 500];
      if (validUpgradePrices.includes(price)) {
        serverPrice = price;
      }
    }

    if (serverPrice === null) {
      return NextResponse.json({ error: 'Invalid course or plan' }, { status: 400 });
    }

    const razorpay = getRazorpay();
    console.log('[checkout] creating order', {
      keyIdPrefix: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.slice(0, 16),
      courseId,
      courseName,
      fromPlan,
      toPlan,
      clientPrice: price,
      serverPrice,
      amountPaise: serverPrice * 100,
    });
    const order = await razorpay.orders.create({
      amount: serverPrice * 100,
      currency: 'INR',
      receipt: `order_${Date.now()}`.substring(0, 40),
      notes: {
        courseId,
        courseName,
        serverPrice: serverPrice.toString(),
      },
    });
    console.log('[checkout] order created', { orderId: order.id, amount: order.amount });

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

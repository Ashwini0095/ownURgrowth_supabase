import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { getSupabaseAdmin } from '@/lib/supabaseClient';
import { rateLimit } from '@/lib/rateLimit';
import { getUserDisplayName, normalizeDisplayName } from '@/lib/userDisplayName';

const PLAN_NAME_TO_ID: Record<string, string> = {
  "Basic Crash Course": "basic",
  "Pro Program": "plus",
  "Master Program": "pro",
};

const UPGRADE_NAME_TO_PLAN_NAME: Record<string, string> = {
  "Upgrade to Course + Notes": "Pro Program",
  "Upgrade to Course + Notes + Live Q&A": "Master Program",
};

type RazorpayOrderNotes = {
  courseId?: string;
  courseName?: string;
  serverPrice?: string;
};

type PaymentRecord = {
  user_id: string;
  user_email?: string;
  user_name?: string;
  course_name: string;
  plan_name: string;
  amount: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  status: "completed";
  upgrade_to?: string;
  is_upgrade?: boolean;
};

function resolveActivatedPlanName(notes: RazorpayOrderNotes, requestedPlan: unknown) {
  if (notes.courseId === "linkedin-growth" && notes.courseName && PLAN_NAME_TO_ID[notes.courseName]) {
    if (requestedPlan && requestedPlan !== notes.courseName) {
      console.warn("Payment verification plan mismatch:", {
        requestedPlan,
        orderPlan: notes.courseName,
      });
    }
    return notes.courseName;
  }

  if (notes.courseId === "linkedin-growth-upgrade" && notes.courseName) {
    return UPGRADE_NAME_TO_PLAN_NAME[notes.courseName] ?? null;
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 verification attempts per minute per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rl = rateLimit(`verify-payment:${ip}`, 5, 60_000);
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });
    }

    // ── 1. Cryptographic Auth Verification ──────────────────────────
    // Ensure the person claiming the purchase is the one who is logged in.
    // The header-shape check runs BEFORE body parsing so unauthenticated callers
    // sending malformed JSON get 401 (not 500), and can't probe payload schema.
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const reqBody = await request.json().catch(() => null);
    if (reqBody === null) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userName,
      plan,
    } = reqBody;

    const supabase = getSupabaseAdmin();
    const token = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error('Verification auth failed:', authError?.message);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!user.email) {
      // The receipt + access lookup both pivot on email; refuse early so we
      // don't burn a Razorpay API round-trip and DB writes on a record we
      // can't fully complete.
      console.error('Verification failed: authenticated user has no email');
      return NextResponse.json({ error: 'User email required to record payment' }, { status: 400 });
    }

    // ── 2. Signature Validation ─────────────────────────────────────────
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_secret) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // ── 3. Double-Check Amount with Razorpay API ────────────────────────
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: key_secret,
    });

    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    if (payment.status !== 'captured') {
      return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
    }

    const verifiedAmountPaise = payment.amount as number;
    const verifiedAmountRupees = verifiedAmountPaise / 100;
    const order = await razorpay.orders.fetch(razorpay_order_id) as {
      amount?: number;
      notes?: RazorpayOrderNotes;
    };
    const notes = order.notes ?? {};
    const orderAmountPaise = Number(order.amount);

    if (orderAmountPaise !== verifiedAmountPaise) {
      return NextResponse.json({ error: 'Payment amount mismatch' }, { status: 400 });
    }

    if (notes.serverPrice && Math.round(Number(notes.serverPrice) * 100) !== verifiedAmountPaise) {
      return NextResponse.json({ error: 'Payment price mismatch' }, { status: 400 });
    }

    const activatedPlanName = resolveActivatedPlanName(notes, plan);
    const activatedPlanId = activatedPlanName ? PLAN_NAME_TO_ID[activatedPlanName] : null;
    if (!activatedPlanName || !activatedPlanId) {
      return NextResponse.json({ error: 'Invalid course or plan' }, { status: 400 });
    }

    const isUpgradePayment = notes.courseId === "linkedin-growth-upgrade";
    const storedCourseName = "Grow on LinkedIn";
    let receiptName = getUserDisplayName(user.user_metadata, userName);
    if (!receiptName) {
      const { data: profile } = await supabase
        .from('users')
        .select('display_name')
        .eq('auth_id', user.id)
        .maybeSingle();

      receiptName = normalizeDisplayName(profile?.display_name);
    }

    // ── 4. Store payment record in Supabase (Idempotent) ─────────────────
    // `ignoreDuplicates: true` + `.select()` lets us detect whether this was a
    // fresh insert or a replay of the same Razorpay payment. We only send the
    // receipt email on a fresh insert so retries don't spam the user.
    let isFreshPayment = false;
    try {
      const paymentRecord: PaymentRecord = {
        user_id: user.id,
        user_email: user.email,
        user_name: receiptName ?? undefined,
        course_name: storedCourseName,
        plan_name: activatedPlanName,
        amount: verifiedAmountRupees,
        razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        status: 'completed',
      };

      if (isUpgradePayment) {
        paymentRecord.upgrade_to = activatedPlanId;
        paymentRecord.is_upgrade = true;
      }

      const { data: insertedRows, error } = await supabase
        .from('payments')
        .upsert(paymentRecord, {
          onConflict: 'razorpay_payment_id',
          ignoreDuplicates: true,
        })
        .select('razorpay_payment_id');

      if (error) {
        console.error('Failed to store payment record:', error);
        return NextResponse.json({ error: 'Payment captured, but course access could not be activated. Please contact support.' }, { status: 500 });
      }

      isFreshPayment = Array.isArray(insertedRows) && insertedRows.length > 0;
    } catch (error) {
      console.error('Database error during verification:', error);
      return NextResponse.json({ error: 'Payment captured, but course access could not be activated. Please contact support.' }, { status: 500 });
    }

    // ── 5. Trigger Receipt Email (fire-and-forget; only on fresh insert) ──
    if (isFreshPayment) {
      const internalSecret = process.env.INTERNAL_API_SECRET;
      if (internalSecret) {
        void fetch(new URL('/api/send-receipt', request.url), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-internal-api-secret': internalSecret,
          },
          body: JSON.stringify({
            email: user.email,
            name: receiptName,
            courseName: storedCourseName,
            plan: activatedPlanName,
            amount: verifiedAmountRupees,
            paymentId: razorpay_payment_id,
            isUpgrade: isUpgradePayment,
          }),
        }).catch((e) => {
          console.error('Failed to trigger receipt email:', e);
        });
      } else {
        console.error('Missing INTERNAL_API_SECRET; receipt email not sent');
      }
    }

    return NextResponse.json({ success: true, plan: activatedPlanId });
  } catch (error) {
    console.error('Payment verification failed:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { getSupabaseAdmin } from '@/lib/supabaseClient';
import { rateLimit } from '@/lib/rateLimit';

const PLAN_NAME_TO_ID: Record<string, string> = {
  "Basic Crash Course": "basic",
  "Pro Program": "plus",
  "Master Program": "pro",
};

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 verification attempts per minute per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rl = rateLimit(ip, 5, 60_000);
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });
    }

    const authHeader = request.headers.get('Authorization');
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userEmail,
      userName,
      courseName,
      plan,
      userId,
      isUpgrade
    } = await request.json();

    const supabase = getSupabaseAdmin();

    // ── 1. Cryptographic Auth Verification ──────────────────────────
    // Ensure the person claiming the purchase is the one who is logged in
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      
      if (authError || !user || (userId && user.id !== userId)) {
        console.error('Verification auth failed:', authError?.message);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    } else {
      console.warn('Payment verification requested without auth token');
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
    if (payment.status !== 'captured' && payment.status !== 'authorized') {
      return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
    }

    const verifiedAmountPaise = payment.amount as number;
    const verifiedAmountRupees = verifiedAmountPaise / 100;

    // ── 4. Store payment record in Supabase (Idempotent) ─────────────────
    try {
      const paymentRecord: Record<string, any> = {
        user_id: userId,
        user_email: userEmail,
        user_name: userName,
        course_name: courseName,
        plan_name: plan,
        amount: verifiedAmountRupees,
        razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        status: 'completed',
      };

      if (isUpgrade && PLAN_NAME_TO_ID[plan]) {
        paymentRecord.upgrade_to = PLAN_NAME_TO_ID[plan];
        paymentRecord.is_upgrade = true;
      }

      const { error } = await supabase
        .from('payments')
        .upsert(paymentRecord, { 
          onConflict: 'razorpay_payment_id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Failed to store payment record:', error);
      }
    } catch (error) {
      console.error('Database error during verification:', error);
    }

    // ── 5. Trigger Receipt Email (fire-and-forget so the client isn't blocked) ──
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-receipt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        name: userName,
        courseName: courseName,
        plan: plan,
        amount: verifiedAmountRupees,
        paymentId: razorpay_payment_id,
        isUpgrade: !!isUpgrade,
      }),
    }).catch((e) => {
      console.error('Failed to trigger receipt email:', e);
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment verification failed:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userEmail,
      userName,
      courseName,
      plan,
      amount,
      userId,
      isUpgrade,
    } = await request.json();

    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      );
    }

    // Store payment record in Supabase
    try {
      const supabase = getSupabaseAdmin();

      const planNameToId: Record<string, string> = {
        "Basic Crash Course": "basic",
        "Pro Program": "plus",
        "Master Program": "pro",
      };

      const paymentRecord: Record<string, any> = {
        user_id: userId,
        user_email: userEmail,
        user_name: userName,
        course_name: courseName,
        plan_name: plan,
        amount: amount / 100, // Convert from paise to rupees
        razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        status: 'completed',
      };

      // If this is an upgrade, store the target plan ID
      if (isUpgrade && planNameToId[plan]) {
        paymentRecord.upgrade_to = planNameToId[plan];
        paymentRecord.is_upgrade = true;
      }

      const { error } = await supabase.from('payments').insert(paymentRecord);
      if (error) {
        console.error('Failed to store payment record:', error);
      }
    } catch (error) {
      console.error('Failed to store payment record:', error);
      // Continue with email sending even if storage fails
    }

    // Send receipt email
    const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-receipt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        name: userName,
        courseName,
        plan,
        paymentId: razorpay_payment_id,
        amount: amount / 100,
      }),
    });

    if (!emailResponse.ok) {
      console.error('Failed to send receipt email');
    }

    return NextResponse.json({
      success: true,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const { courseId, courseName, price } = await request.json();
    
    console.log('Payment request:', { courseId, courseName, price });
    console.log('Amount in paise:', price * 100);
    console.log('Razorpay key_id:', process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
    console.log('Razorpay key_secret exists:', !!process.env.RAZORPAY_KEY_SECRET);

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Missing Razorpay credentials');
      return NextResponse.json(
        { error: 'Missing payment configuration' },
        { status: 500 }
      );
    }

    const order = await razorpay.orders.create({
      amount: price * 100, // Convert to paise
      currency: 'INR',
      receipt: `upgrade_${Date.now()}`.substring(0, 40), // Ensure max 40 chars
      notes: {
        courseId,
        courseName,
      },
    });

    console.log('Razorpay order created:', order);

    return NextResponse.json({ 
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Send key to frontend
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Error creating payment order' },
      { status: 500 }
    );
  }
}

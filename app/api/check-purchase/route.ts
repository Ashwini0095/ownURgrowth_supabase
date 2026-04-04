import { NextRequest, NextResponse } from 'next/server';
import { getUserPaymentHistory } from '../../../lib/payments';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');

    if (!userId || !courseId) {
      return NextResponse.json({ error: 'Missing userId or courseId' }, { status: 400 });
    }

    // Get user's payment history
    const payments = await getUserPaymentHistory(userId);
    
    // Check if user has purchased this course
    const coursePurchase = payments.find(payment => 
      payment.course.toLowerCase().includes('linkedin') && 
      payment.status === 'completed'
    );

    if (coursePurchase) {
      // Determine plan based on amount or plan name
      let planId = 'basic';
      if (coursePurchase.amount >= 999 || coursePurchase.plan.toLowerCase().includes('master')) {
        planId = 'pro';
      } else if (coursePurchase.amount >= 799 || coursePurchase.plan.toLowerCase().includes('pro')) {
        planId = 'plus';
      }

      return NextResponse.json({
        purchased: true,
        planId: planId,
        purchaseDate: coursePurchase.date,
        amount: coursePurchase.amount
      });
    }

    return NextResponse.json({ purchased: false });
  } catch (error) {
    console.error('Error checking purchase:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export interface PaymentRecord {
  id: string;
  date: string;
  course: string;
  plan: string;
  amount: number;
  status: string;
  razorpayPaymentId?: string;
}

const mapRow = (row: any): PaymentRecord => ({
  id: row.id,
  date: row.created_at || '',
  course: row.course_name || 'Unknown Course',
  plan: row.plan_name || 'Unknown Plan',
  amount: row.amount || 0,
  status: row.status || 'completed',
  razorpayPaymentId: row.razorpay_payment_id,
});

export async function getUserPaymentHistory(
  userId: string,
  userEmail: string | null | undefined,
  accessToken: string | null | undefined,
): Promise<PaymentRecord[]> {
  if (!accessToken) return [];

  try {
    const res = await fetch('/api/payment-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ userId, userEmail }),
    });

    if (!res.ok) {
      console.error('Payment history fetch failed:', res.status);
      return [];
    }

    const { payments } = await res.json();
    return (payments || []).map(mapRow);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    return [];
  }
}

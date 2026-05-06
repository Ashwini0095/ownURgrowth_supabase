import { supabase } from './supabaseClient';

export interface PaymentRecord {
  id: string;
  date: string;
  course: string;
  plan: string;
  amount: number;
  status: string;
  razorpayPaymentId?: string;
}

export async function getUserPaymentHistory(userId: string): Promise<PaymentRecord[]> {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching payment history:', error);
      return [];
    }

    return (data || []).map((row) => ({
      id: row.id,
      date: row.created_at?.split('T')[0] || 'Unknown',
      course: row.course_name || 'Unknown Course',
      plan: row.plan_name || 'Unknown Plan',
      amount: row.amount || 0,
      status: row.status || 'completed',
      razorpayPaymentId: row.razorpay_payment_id,
    }));
  } catch (error) {
    console.error('Error fetching payment history:', error);
    return [];
  }
}

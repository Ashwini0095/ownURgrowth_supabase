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

const mapRow = (row: any): PaymentRecord => ({
  id: row.id,
  date: row.created_at?.split('T')[0] || 'Unknown',
  course: row.course_name || 'Unknown Course',
  plan: row.plan_name || 'Unknown Plan',
  amount: row.amount || 0,
  status: row.status || 'completed',
  razorpayPaymentId: row.razorpay_payment_id,
});

/**
 * Returns the user's payment history.
 * Looks up by user_id first; if no rows match (e.g. the auth user was deleted
 * and recreated, leaving old payment rows tied to the previous user_id), falls
 * back to user_email so the user still sees their original purchases.
 */
export async function getUserPaymentHistory(
  userId: string,
  userEmail?: string | null
): Promise<PaymentRecord[]> {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching payment history by user_id:', error);
    }

    if (data && data.length > 0) {
      return data.map(mapRow);
    }

    if (!userEmail) return [];

    const { data: byEmail, error: emailErr } = await supabase
      .from('payments')
      .select('*')
      .eq('user_email', userEmail)
      .order('created_at', { ascending: false });

    if (emailErr) {
      console.error('Error fetching payment history by user_email:', emailErr);
      return [];
    }

    return (byEmail || []).map(mapRow);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    return [];
  }
}

import { supabase } from './supabaseClient';

export async function recordPurchase(userId: string, courseId: string, paymentId: string) {
  const { error } = await supabase.from('purchases').insert({
    user_id: userId,
    course_id: courseId,
    payment_id: paymentId,
    purchased_at: new Date().toISOString(),
  });
  if (error) console.error('Error recording purchase:', error);
}

export async function getUserPurchases(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('purchases')
    .select('course_id')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching purchases:', error);
    return [];
  }
  return (data || []).map((d) => d.course_id);
}

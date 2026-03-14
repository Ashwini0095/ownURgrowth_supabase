import { db } from './firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

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
    const paymentsRef = collection(db, 'payments');
    const q = query(
      paymentsRef, 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const payments: PaymentRecord[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      payments.push({
        id: doc.id,
        date: data.createdAt?.toDate?.()?.toISOString?.()?.split('T')[0] || data.date || 'Unknown',
        course: data.courseName || 'Unknown Course',
        plan: data.planName || 'Unknown Plan',
        amount: data.amount || 0,
        status: data.status || 'completed',
        razorpayPaymentId: data.razorpayPaymentId
      });
    });
    
    return payments;
  } catch (error) {
    console.error('Error fetching payment history:', error);
    return [];
  }
}

import { db } from './firebase';
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';

export async function recordPurchase(userId: string, courseId: string, paymentId: string) {
  await setDoc(doc(db, 'purchases', `${userId}_${courseId}`), {
    userId,
    courseId,
    paymentId,
    purchasedAt: new Date().toISOString(),
  });
}

export async function getUserPurchases(userId: string): Promise<string[]> {
  const q = query(collection(db, 'purchases'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => d.data().courseId);
}

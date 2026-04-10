'use client';

import { useAuth } from '../../lib/AuthContext';

export default function FixPurchase() {
  const { user } = useAuth();

  const addPurchaseRecord = async () => {
    if (!user) {
      alert('Please login first');
      return;
    }

    try {
      const { collection, addDoc } = await import('firebase/firestore');
      const { db } = await import('../../lib/firebase');
      
      const purchaseData = {
        userId: user.uid,
        userEmail: user.email,
        courseName: 'LinkedIn Growth Course',
        planName: 'Master Program', // Change this to the plan you purchased
        amount: 999, // Change this to the amount you paid
        status: 'completed',
        createdAt: new Date(),
        razorpayPaymentId: 'manual_fix_' + Date.now()
      };

      await addDoc(collection(db, 'purchases'), purchaseData);
      
      alert('Purchase record added! Now refresh the course page.');
      
    } catch (error) {
      console.error('Error adding purchase:', error);
      alert('Error adding purchase record');
    }
  };

  if (!user) {
    return <div className="p-8">Please login first</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Fix Purchase Record</h1>
      <p className="mb-4">User: {user.email}</p>
      <p className="mb-4">This will manually add a purchase record to your database.</p>
      
      <button 
        onClick={addPurchaseRecord}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        Add Purchase Record
      </button>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>This will add a record for the Master Program (₹999). </p>
        <p>Change the planName and amount in the code if you purchased a different plan.</p>
      </div>
    </div>
  );
}

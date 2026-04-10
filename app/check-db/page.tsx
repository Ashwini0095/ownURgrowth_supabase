'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../lib/AuthContext';

export default function CheckDB() {
  const { user } = useAuth();
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const checkDB = async () => {
      try {
        const { collection, query, where, getDocs } = await import('firebase/firestore');
        const { db } = await import('../../lib/firebase');
        
        const allRecords: any[] = [];
        const collections = ['payments', 'purchases'];
        
        for (const collectionName of collections) {
          const collectionRef = collection(db, collectionName);
          const q = query(collectionRef, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          
          querySnapshot.forEach((doc) => {
            allRecords.push({
              collection: collectionName,
              id: doc.id,
              ...doc.data()
            });
          });
        }
        
        setRecords(allRecords);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkDB();
  }, [user]);

  if (!user) return <div>Please login first</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Database Records for User: {user.uid}</h1>
      <p className="mb-4">Found {records.length} records</p>
      
      {records.length === 0 ? (
        <div className="bg-red-100 p-4 rounded">
          <p className="text-red-700">No payment records found in database!</p>
          <p className="text-sm mt-2">This means the payment was not saved to the database.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((record, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded">
              <h3 className="font-bold">Collection: {record.collection}</h3>
              <p><strong>ID:</strong> {record.id}</p>
              <pre className="mt-2 text-sm bg-white p-2 rounded overflow-auto">
                {JSON.stringify(record, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
